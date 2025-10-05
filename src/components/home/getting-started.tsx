import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GettingStarted() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
        <CardDescription>
          Follow these steps to start using the Contribution Hub API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-primary text-primary-foreground rounded-full min-w-7 max-h-7 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold">Sign In & Set Up Credentials</h4>
              <p className="text-sm text-muted-foreground">
                Sign in to the application and navigate to the <Link href="/dashboard" className="text-primary hover:underline">dashboard</Link> to configure
                your GitHub, Azure DevOps, or other platform credentials. Your Firebase User ID will be displayed on the dashboard.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary text-primary-foreground rounded-full min-w-7 max-h-7 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold">Get Your Firebase User ID</h4>
              <p className="text-sm text-muted-foreground">
                Copy your Firebase User ID from the dashboard. This unique identifier is required for all API requests
                to retrieve your personal contribution data.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary text-primary-foreground rounded-full min-w-7 max-h-7 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold">Make API Requests</h4>
              <p className="text-sm text-muted-foreground">
                Use the API endpoint with your Firebase User ID and desired parameters to fetch contribution data.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary text-primary-foreground rounded-full min-w-7 max-h-7 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold">Visualize Data</h4>
              <p className="text-sm text-muted-foreground">
                Use the returned data with visualization libraries like react-activity-calendar
                to create beautiful contribution graphs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
