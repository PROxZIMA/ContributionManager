'use client';

import { useState, useEffect } from 'react';
import { Github, Key, Users, Clock, Database, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import ActivityCalendar from 'react-activity-calendar';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/header';
import { ContributionsResponse, Contribution } from '@/lib/schemas';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipArrow, TooltipPortal } from '@radix-ui/react-tooltip';

// Sample data for demonstration
const sampleContributions: Contribution[] = [
  { date: '2024-01-01', count: 3, level: 1 },
  { date: '2024-01-02', count: 8, level: 2 },
  { date: '2024-01-03', count: 15, level: 3 },
  { date: '2024-01-04', count: 25, level: 4 },
  { date: '2024-01-05', count: 2, level: 1 },
];

const sampleResponse: ContributionsResponse = {
  total: {
    year: 2024
  },
  contributions: sampleContributions,
  breakdown: {
    commits: 180,
    pullRequests: 32,
    issues: 13
  },
  meta: {
    scannedProjects: 15,
    scannedRepos: 8,
    elapsedMs: 1250,
    cachedProjects: true,
    errors: []
  }
};

const defaultLabels = {
  totalCount: `{{count}} contributions in {{year}}`,
}

export default function HomePage() {
  const [userId, setUserId] = useState('m71t0rTNx4ba7zEXfOopoeCApkK2');
  const [year, setYear] = useState('2024');
  const [providers, setProviders] = useState('github,azure');
  const [includeActivity, setIncludeActivity] = useState(false);
  const [includeBreakdown, setIncludeBreakdown] = useState(true);

  // API state management
  const [apiData, setApiData] = useState<ContributionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const buildApiUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_CONTRIBUTION_API_URL || 'https://localhost:5298';
    const params = new URLSearchParams({
      userId,
      year,
      includeActivity: includeActivity.toString(),
      includeBreakdown: includeBreakdown.toString()
    });

    if (providers) {
      providers.split(',').forEach(provider => {
        if (provider.trim())
          params.append('providers', provider.trim());
      });
    }

    return `${baseUrl}/Contributions?${params.toString()}`;
  };

  const fetchContributionData = async () => {
    if (!userId.trim()) {
      setError('Please enter a Firebase User ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = buildApiUrl();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: ContributionsResponse = await response.json();
      setApiData(data);
    } catch (err) {
      console.error('API call failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch contribution data');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch when demo tab is selected
  useEffect(() => {
    if (activeTab === 'demo' && !apiData && !isLoading && userId.trim()) {
      fetchContributionData();
    }
  }, [activeTab, userId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Contribution Token Manager API
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Aggregate and visualize your contributions across multiple version control platforms
            with our powerful API service.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                <Key className="mr-2 h-4 w-4" />
                Set Up Credentials
              </Button>
            </Link>
            <Button variant="outline" size="lg" asChild>
              <a href="#demo" className="scroll-smooth">
                View Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Multi-Platform</CardTitle>
              <CardDescription>
                Supports GitHub, Azure DevOps, and more platforms
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Real-Time Data</CardTitle>
              <CardDescription>
                Get up-to-date contribution metrics with caching for performance
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Rich Analytics</CardTitle>
              <CardDescription>
                Detailed breakdowns by activity type and time periods
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* API Documentation */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoint">API Endpoint</TabsTrigger>
            <TabsTrigger value="response">Response Format</TabsTrigger>
            <TabsTrigger value="demo" id="demo">Live Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
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
          </TabsContent>

          <TabsContent value="endpoint" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>GET /Contributions</CardTitle>
                <CardDescription>Retrieve contribution data for a user</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Query Parameters</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <div className="font-medium">Parameter</div>
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Required</div>
                        <div className="font-medium">Description</div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <code>userId</code>
                        <span>string</span>
                        <Badge variant="destructive" className="w-fit h-fit">Required</Badge>
                        <span>Firebase User ID (obtained after login via dashboard)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <code>year</code>
                        <span>int</span>
                        <Badge variant="destructive" className="w-fit h-fit">Required</Badge>
                        <span>Year to retrieve data for</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <code>providers</code>
                        <span>string[]</span>
                        <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                        <span>Platform filters (github, azure)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <code>includeActivity</code>
                        <span>bool</span>
                        <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                        <span>Include activity breakdown per day</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <code>includeBreakdown</code>
                        <span>bool</span>
                        <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                        <span>Include total breakdown by activity type</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Format</CardTitle>
                <CardDescription>JSON structure returned by the API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(sampleResponse, null, 2)}
                  </pre>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Response Fields</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>total:</strong> Contribution counts per year</div>
                      <div><strong>contributions:</strong> Daily contribution data with levels (0-4)</div>
                      <div><strong>breakdown:</strong> Activity breakdown by type (commits, PRs, issues)</div>
                      <div><strong>meta:</strong> Metadata about the request (performance, errors)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API URL Builder</CardTitle>
                  <CardDescription>
                    Build and test API requests with different parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userId">Firebase User ID</Label>
                      <Input
                        id="userId"
                        placeholder="Enter Firebase User ID (get from dashboard after login)"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        placeholder="2024"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="providers">Providers (comma-separated)</Label>
                      <Input
                        id="providers"
                        placeholder="github,azure"
                        value={providers}
                        onChange={(e) => setProviders(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeActivity"
                          checked={includeActivity}
                          onChange={(e) => setIncludeActivity(e.target.checked)}
                        />
                        <Label htmlFor="includeActivity">Include Activity</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeBreakdown"
                          checked={includeBreakdown}
                          onChange={(e) => setIncludeBreakdown(e.target.checked)}
                        />
                        <Label htmlFor="includeBreakdown">Include Breakdown</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Generated API URL:</Label>
                    <div className="mt-2 p-3 bg-muted rounded-lg break-all text-sm">
                      {buildApiUrl()}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={fetchContributionData}
                      disabled={isLoading || !userId.trim()}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          Fetch Data
                        </>
                      )}
                    </Button>
                    {apiData && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setApiData(null);
                          setError(null);
                        }}
                      >
                        Clear Data
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live API Data Visualization</CardTitle>
                  <CardDescription>
                    {apiData ? 'Real contribution data from your API' : 'Fetch data to see your contribution visualization'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Error:</strong> {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                      <p className="text-muted-foreground">Fetching your contribution data...</p>
                    </div>
                  )}

                  {!isLoading && !apiData && !error && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Database className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-2">No data loaded yet</p>
                      <p className="text-sm text-muted-foreground">
                        Enter your Firebase User ID above and click "Fetch Data" to see your contributions
                      </p>
                    </div>
                  )}

                  {!isLoading && apiData && (
                    <div className="space-y-4">
                      <ActivityCalendar
                        data={apiData.contributions}
                        labels={defaultLabels}
                        totalCount={apiData.total[year]}
                        theme={{
                          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                        }}
                        loading={isLoading}
                        colorScheme='light'
                        renderBlock={(block, activity) => (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {block}
                              </TooltipTrigger>
                              <TooltipPortal>
                                <TooltipContent>
                                  {`${activity.count} activities on ${activity.date}`}
                                </TooltipContent>
                              </TooltipPortal>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        renderColorLegend={(block, level) => (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {block}
                              </TooltipTrigger>
                              <TooltipPortal>
                                <TooltipContent>
                                  {`Level: ${level}`}
                                </TooltipContent>
                              </TooltipPortal>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        showWeekdayLabels
                      />

                      {/* Statistics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {Object.values(apiData.total).reduce((sum, count) => sum + count, 0)}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Contributions</div>
                        </div>
                        {apiData.breakdown && (
                          <>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {apiData.breakdown.commits || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">Commits</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {apiData.breakdown.pullrequests || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">Pull Requests</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {apiData.breakdown.issues || 0}
                              </div>
                              <div className="text-sm text-muted-foreground">Issues</div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* API Metadata */}
                      {apiData.meta && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold mb-2">API Response Metadata</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Projects: </span>
                              <span className="font-mono">{apiData.meta.scannedProjects}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Repos: </span>
                              <span className="font-mono">{apiData.meta.scannedRepos}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Time: </span>
                              <span className="font-mono">{apiData.meta.elapsedMs}ms</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Cached: </span>
                              <span className="font-mono">{apiData.meta.cachedProjects ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                          {apiData.meta.errors && apiData.meta.errors.length > 0 && (
                            <div className="mt-2">
                              <span className="text-muted-foreground">Errors: </span>
                              <div className="mt-1 text-xs text-destructive">
                                {apiData.meta.errors.map((error, index) => (
                                  <div key={index}>{error}</div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Follow these steps to start using the Contribution Token Manager API
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
      </main>
    </div>
  );
}