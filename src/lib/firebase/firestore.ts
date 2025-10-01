import { doc, getDoc, setDoc, updateDoc, FieldValue, deleteField } from 'firebase/firestore';
import { db } from './config';
import type { AzureFormValues, GitHubFormValues } from '@/lib/schemas';
import { 
  storeUserTokens, 
  getUserToken, 
  deleteUserToken, 
  getUserTokens 
} from './secret-manager-client';

// Types for credentials without PAT tokens (stored in Firestore)
export type AzureCredentialsData = Omit<AzureFormValues, 'pat'>;
export type GitHubCredentialsData = Omit<GitHubFormValues, 'pat'>;

type TCredentials = {
  azure?: AzureCredentialsData;
  github?: GitHubCredentialsData;
};

// Types for complete credentials including PAT tokens (for client use)
export type TCompleteCredentials = {
  azure?: AzureFormValues;
  github?: GitHubFormValues;
};

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

    // Reconstruct Azure credentials with PAT token
    if (credentials.azure) {
      completeCredentials.azure = {
        ...credentials.azure,
        pat: tokens.azure || ''
      };
    }

    // Reconstruct GitHub credentials with PAT token
    if (credentials.github) {
      completeCredentials.github = {
        ...credentials.github,
        pat: tokens.github || ''
      };
    }

    return completeCredentials;
  } catch (error) {
    console.error('Error getting complete credentials:', error);
    return null;
  }
}

export async function setAzureCredentials(
  userId: string,
  data: AzureFormValues
) {
  try {
    // Extract PAT token
    const { pat, ...credentialsData } = data;
    
    // Store PAT token in Secret Manager
    if (pat) {
      await storeUserTokens(userId, 'azure', pat);
    }
    
    // Store credentials (without PAT) in Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await setDoc(docRef, { azure: credentialsData }, { merge: true });
  } catch (error) {
    console.error('Error setting Azure credentials:', error);
    throw error;
  }
}

export async function setGithubCredentials(
  userId: string,
  data: GitHubFormValues
) {
  try {
    // Extract PAT token
    const { pat, ...credentialsData } = data;
    
    // Store PAT token in Secret Manager
    if (pat) {
      await storeUserTokens(userId, 'github', pat);
    }
    
    // Store credentials (without PAT) in Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await setDoc(docRef, { github: credentialsData }, { merge: true });
  } catch (error) {
    console.error('Error setting GitHub credentials:', error);
    throw error;
  }
}

export async function deleteAzureCredentials(userId: string) {
  try {
    // Delete PAT token from Secret Manager
    await deleteUserToken(userId, 'azure');
    
    // Delete credentials from Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await updateDoc(docRef, {
      azure: deleteField()
    });
  } catch (error) {
    console.error('Error deleting Azure credentials:', error);
    throw error;
  }
}

export async function deleteGithubCredentials(userId: string) {
  try {
    // Delete PAT token from Secret Manager
    await deleteUserToken(userId, 'github');
    
    // Delete credentials from Firestore
    const docRef = doc(db, credentialsCollection, userId);
    await updateDoc(docRef, {
      github: deleteField()
    });
  } catch (error) {
    console.error('Error deleting GitHub credentials:', error);
    throw error;
  }
}

/**
 * Utility function to get a specific provider's PAT token
 */
export async function getProviderToken(
  userId: string, 
  provider: 'azure' | 'github'
): Promise<string | null> {
  return await getUserToken(userId, provider);
}
