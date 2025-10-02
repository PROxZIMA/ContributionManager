import type { NextApiRequest, NextApiResponse } from 'next';
import { storeUserTokensServer } from '@/lib/server/secret-manager-server';
import { getAuthToken, validateAuthToken, getUserIdFromRequest } from '@/lib/server/auth-utils';
import { getProviderKeys, isValidProviderKey } from '@/lib/providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate authentication
    const token = getAuthToken(req);
    if (!token || !validateAuthToken(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user ID from request
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const { provider, pat } = req.body;

    if (!provider || !pat) {
      return res.status(400).json({ error: 'Provider and PAT are required' });
    }

    // Validate provider
    if (!isValidProviderKey(provider)) {
      return res.status(400).json({ 
        error: 'Invalid provider', 
        validProviders: getProviderKeys() 
      });
    }

    await storeUserTokensServer(userId, provider, pat);

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error storing token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}