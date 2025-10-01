import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserTokensServer } from '@/lib/server/secret-manager-server';
import { getAuthToken, validateAuthToken, getUserIdFromRequest } from '@/lib/server/auth-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate authentication
    const token = getAuthToken(req);
    if (!token || !validateAuthToken(token)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user ID from query or body
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const tokens = await getUserTokensServer(userId);

    res.status(200).json({ tokens });
  } catch (error: any) {
    console.error('Error retrieving tokens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}