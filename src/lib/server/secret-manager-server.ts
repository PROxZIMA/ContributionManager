import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// This file should only be used server-side (API routes, getServerSideProps, etc.)
const client = new SecretManagerServiceClient();

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/**
 * Parses a secret string in format "provider:token;provider2:token2" into an object
 */
function parseSecrets(secretString: string): Record<string, string> {
  const secrets: Record<string, string> = {};
  
  if (!secretString) return secrets;
  
  const pairs = secretString.split(';');
  for (const pair of pairs) {
    const [provider, token] = pair.split(':');
    if (provider && token) {
      secrets[provider] = token;
    }
  }
  
  return secrets;
}

/**
 * Serializes an object of secrets into format "provider:token;provider2:token2"
 */
function serializeSecrets(secrets: Record<string, string>): string {
  return Object.entries(secrets)
    .map(([provider, token]) => `${provider}:${token}`)
    .join(';');
}

/**
 * Gets the secret name for a user
 */
function getSecretName(userId: string): string {
  return `user-${userId}-tokens`;
}

/**
 * Gets the full secret path for Google Cloud Secret Manager
 */
function getSecretPath(userId: string): string {
  return `projects/${PROJECT_ID}/secrets/${getSecretName(userId)}`;
}

/**
 * Gets the full secret version path for Google Cloud Secret Manager
 */
function getSecretVersionPath(userId: string, version = 'latest'): string {
  return `${getSecretPath(userId)}/versions/${version}`;
}

/**
 * Creates a new secret in Secret Manager for a user
 */
async function createSecret(userId: string): Promise<void> {
  try {
    await client.createSecret({
      parent: `projects/${PROJECT_ID}`,
      secretId: getSecretName(userId),
      secret: {
        replication: {
          automatic: {},
        },
      },
    });
  } catch (error: any) {
    // If secret already exists, that's fine
    if (!error.message?.includes('already exists')) {
      throw error;
    }
  }
}

/**
 * SERVER-SIDE ONLY: Stores or updates tokens for a user in Secret Manager
 */
export async function storeUserTokensServer(
  userId: string,
  provider: string,
  token: string
): Promise<void> {
  if (!PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }

  try {
    // Get existing secrets
    const existingSecrets = await getUserTokensServer(userId);
    
    // Update with new token
    existingSecrets[provider] = token;
    
    // Serialize the secrets
    const secretData = serializeSecrets(existingSecrets);
    
    // Ensure secret exists
    await createSecret(userId);
    
    // Add new version with updated data
    await client.addSecretVersion({
      parent: getSecretPath(userId),
      payload: {
        data: Buffer.from(secretData, 'utf8'),
      },
    });
    
  } catch (error: any) {
    console.error('Error storing user tokens:', error);
    throw new Error(`Failed to store tokens: ${error.message}`);
  }
}

/**
 * SERVER-SIDE ONLY: Retrieves all tokens for a user from Secret Manager
 */
export async function getUserTokensServer(userId: string): Promise<Record<string, string>> {
  if (!PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }

  try {
    const [version] = await client.accessSecretVersion({
      name: getSecretVersionPath(userId),
    });

    if (!version.payload?.data) {
      return {};
    }

    const secretString = version.payload.data.toString();
    return parseSecrets(secretString);
    
  } catch (error: any) {
    // If secret doesn't exist, return empty object
    if (error.code === 5 || error.message?.includes('not found')) {
      return {};
    }
    
    console.error('Error retrieving user tokens:', error);
    throw new Error(`Failed to retrieve tokens: ${error.message}`);
  }
}

/**
 * SERVER-SIDE ONLY: Gets a specific token for a provider from Secret Manager
 */
export async function getUserTokenServer(userId: string, provider: string): Promise<string | null> {
  const tokens = await getUserTokensServer(userId);
  return tokens[provider] || null;
}

/**
 * SERVER-SIDE ONLY: Deletes a specific provider token for a user
 */
export async function deleteUserTokenServer(userId: string, provider: string): Promise<void> {
  if (!PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }

  try {
    // Get existing secrets
    const existingSecrets = await getUserTokensServer(userId);
    
    // Remove the specified provider
    delete existingSecrets[provider];
    
    // If no tokens left, delete the entire secret
    if (Object.keys(existingSecrets).length === 0) {
      await client.deleteSecret({
        name: getSecretPath(userId),
      });
      return;
    }
    
    // Otherwise, update with remaining tokens
    const secretData = serializeSecrets(existingSecrets);
    
    await client.addSecretVersion({
      parent: getSecretPath(userId),
      payload: {
        data: Buffer.from(secretData, 'utf8'),
      },
    });
    
  } catch (error: any) {
    console.error('Error deleting user token:', error);
    throw new Error(`Failed to delete token: ${error.message}`);
  }
}

/**
 * SERVER-SIDE ONLY: Deletes all tokens for a user (used when user account is deleted)
 */
export async function deleteAllUserTokensServer(userId: string): Promise<void> {
  if (!PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set');
  }

  try {
    await client.deleteSecret({
      name: getSecretPath(userId),
    });
  } catch (error: any) {
    // If secret doesn't exist, that's fine
    if (error.code === 5 || error.message?.includes('not found')) {
      return;
    }
    
    console.error('Error deleting all user tokens:', error);
    throw new Error(`Failed to delete all tokens: ${error.message}`);
  }
}