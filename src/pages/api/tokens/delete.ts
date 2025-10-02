import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserTokenServer } from '@/lib/server/secret-manager-server';
import { getAuthToken, validateAuthToken, getUserIdFromRequest } from '@/lib/server/auth-utils';
import { getProviderKeys, isValidProviderKey } from '@/lib/providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
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

    const { provider } = req.body;

    if (!provider) {
      return res.status(400).json({ error: 'Provider is required' });
    }

    // Validate provider
    if (!isValidProviderKey(provider)) {
      return res.status(400).json({ 
        error: 'Invalid provider', 
        validProviders: getProviderKeys() 
      });
    }

    await deleteUserTokenServer(userId, provider);

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error deleting token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}