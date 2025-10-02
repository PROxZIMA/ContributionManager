import { doc, getDoc, setDoc, updateDoc, FieldValue, deleteField } from 'firebase/firestore';
import { db } from './config';
import type { AzureFormValues, GitHubFormValues } from '@/lib/schemas';
import { 
  storeUserTokens, 
  getUserToken, 
  deleteUserToken, 
  getUserTokens 
} from './secret-manager-client';
import { 
  getAllProviders, 
  getProvider, 
  isValidProviderKey,
  type ProviderKey,
  type ProviderData,
  type ProviderCredentials
} from '@/lib/providers';

// Types for credentials without PAT tokens (stored in Firestore)
export type AzureCredentialsData = Omit<AzureFormValues, 'pat'>;
export type GitHubCredentialsData = Omit<GitHubFormValues, 'pat'>;

type TCredentials = {
  azure?: AzureCredentialsData;
  github?: GitHubCredentialsData;
};

// Types for complete credentials including PAT tokens (for client use)
export type TCompleteCredentials = ProviderData;

const credentialsCollection = 'credentials';

/**
 * Gets credentials from Firestore (without PAT tokens)
 */
async function getCredentials(userId: string): Promise<TCredentials | null> {
  const docRef = doc(db, credentialsCollection, userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TCredentials;
  } else {
    return null;
  }
}

/**
 * Gets complete credentials including PAT tokens from both Firestore and Secret Manager
 */
export async function getCompleteCredentials(userId: string): Promise<TCompleteCredentials | null> {
  try {
    // Get credentials from Firestore
    const credentials = await getCredentials(userId);
    
    if (!credentials) {
      return null;
    }

    // Get tokens from Secret Manager
    const tokens = await getUserTokens(userId);

    const completeCredentials: TCompleteCredentials = {};
    const providers = getAllProviders();

    // Reconstruct credentials with PAT tokens for each provider
    for (const provider of providers) {
      const providerKey = provider.key;
      if (credentials[providerKey as keyof typeof credentials]) {
        (completeCredentials as any)[providerKey] = {
          ...credentials[providerKey as keyof typeof credentials],
          pat: tokens[providerKey as keyof typeof tokens] || ''
        };
      }
    }

    return completeCredentials;
  } catch (error) {
    console.error('Error getting complete credentials:', error);
    return null;
  }
}

/**
 * Generic function to set provider credentials
 */
export async function setProviderCredentials(
  userId: string,
  providerKey: ProviderKey,
  data: ProviderCredentials
) {
  if (!isValidProviderKey(providerKey)) {
    throw new Error(`Invalid provider: ${providerKey}`);
  }

  try {
    // Extract PAT token if it exists
    const { pat, ...credentialsData } = data as any;
    
    // Store PAT token in Secret Manager if provided
    if (pat) {
      await storeUserTokens(userId, providerKey, pat);
    }
    
    // Store credentials (without PAT) in Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await setDoc(docRef, { [providerKey]: credentialsData }, { merge: true });
  } catch (error) {
    console.error(`Error setting ${providerKey} credentials:`, error);
    throw error;
  }
}

/**
 * Generic function to delete provider credentials
 */
export async function deleteProviderCredentials(userId: string, providerKey: ProviderKey) {
  if (!isValidProviderKey(providerKey)) {
    throw new Error(`Invalid provider: ${providerKey}`);
  }

  try {
    // Delete PAT token from Secret Manager
    await deleteUserToken(userId, providerKey);
    
    // Delete credentials from Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await updateDoc(docRef, {
      [providerKey]: deleteField()
    });
  } catch (error) {
    console.error(`Error deleting ${providerKey} credentials:`, error);
    throw error;
  }
}
