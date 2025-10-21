import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint for container health monitoring
 */
export async function GET(request: NextRequest) {
  return new NextResponse("Healthy", { status: 200 });
}
