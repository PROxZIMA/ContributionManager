import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function APIOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Overview</CardTitle>
        <CardDescription>
          The Contributions API aggregates your activity across multiple version control platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Base URL</h4>
          <code className="bg-muted px-2 py-1 rounded text-sm">
            {process.env.NEXT_PUBLIC_CONTRIBUTION_API_URL}/Contributions
          </code>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Authentication</h4>
          <p className="text-sm text-muted-foreground">
            API calls require your Firebase User ID and configured platform credentials.
            Sign in to the application and set up your platform tokens through the dashboard.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Required:</strong> Sign in to get your Firebase User ID and configure
            your credentials for GitHub, Azure DevOps, or other supported platforms in the{' '}
            <Link href="/dashboard" className="text-primary hover:underline">
              dashboard
            </Link>.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
