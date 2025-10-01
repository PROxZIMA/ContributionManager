import { NextApiRequest } from 'next';

/**
 * Extracts the Firebase ID token from the Authorization header
 */
export function getAuthToken(req: NextApiRequest): string | null {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

/**
 * Basic validation of Firebase ID token format
 * For production, you should verify the token with Firebase Admin SDK
 */
export function validateAuthToken(token: string): boolean {
  // Basic JWT format check
  const parts = token.split('.');
  return parts.length === 3;
}

/**
 * Extracts user ID from request (assuming it's passed in the token or body)
 * In a real implementation, you'd decode the Firebase JWT token
 */
export function getUserIdFromRequest(req: NextApiRequest): string | null {
  // For now, expect userId in the request body
  // In production, extract this from the verified Firebase token
  return req.body?.userId || null;
}