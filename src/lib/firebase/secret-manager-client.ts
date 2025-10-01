import { auth } from './config';

/**
 * Gets the current user's ID token for API authentication
 */
async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
}

/**
 * Client-side function to store user tokens via API
 */
export async function storeUserTokens(
  userId: string,
  provider: string,
  token: string
): Promise<void> {
  const authToken = await getAuthToken();
  
  const response = await fetch('/api/tokens/store', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ userId, provider, pat: token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to store token');
  }
}

/**
 * Client-side function to retrieve user tokens via API
 */
export async function getUserTokens(userId: string): Promise<Record<string, string>> {
  const authToken = await getAuthToken();
  
  const response = await fetch(`/api/tokens/retrieve?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to retrieve tokens');
  }

  const data = await response.json();
  return data.tokens || {};
}

/**
 * Client-side function to get a specific provider token via API
 */
export async function getUserToken(userId: string, provider: string): Promise<string | null> {
  const tokens = await getUserTokens(userId);
  return tokens[provider] || null;
}

/**
 * Client-side function to delete a user token via API
 */
export async function deleteUserToken(userId: string, provider: string): Promise<void> {
  const authToken = await getAuthToken();
  
  const response = await fetch('/api/tokens/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ userId, provider }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete token');
  }
}