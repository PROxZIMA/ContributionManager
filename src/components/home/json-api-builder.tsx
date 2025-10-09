'use client';

import { useState, useEffect } from 'react';
import { Loader2, RefreshCw, AlertCircle, Database, ExternalLink } from 'lucide-react';
import ActivityCalendar from 'react-activity-calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { ContributionsResponse, Contribution } from '@/lib/schemas';

// Sample data for demonstration
const sampleContributions: Contribution[] = [
  { date: '2024-01-01', count: 0, level: 0 },
  { date: '2024-01-02', count: 3, level: 1 },
  { date: '2024-01-03', count: 8, level: 2 },
  { date: '2024-01-04', count: 12, level: 3 },
  { date: '2024-01-05', count: 18, level: 4 },
];

const defaultLabels = {
  totalCount: `{{count}} contributions in {{year}}`,
}

interface JsonApiBuilderProps {
  initialUserId?: string;
}

export default function JsonApiBuilder({ initialUserId = '' }: JsonApiBuilderProps) {
  const [userId, setUserId] = useState(initialUserId);
  const [year, setYear] = useState('2025');
  const [providers, setProviders] = useState('github,azure');
  const [includeActivity, setIncludeActivity] = useState(false);
  const [includeBreakdown, setIncludeBreakdown] = useState(true);
  const [apiData, setApiData] = useState<ContributionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserId(initialUserId);
    fetchContributionData();
  }, [initialUserId]);

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

    return `${baseUrl}/contributions?${params.toString()}`;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>JSON API Visualization</CardTitle>
        <CardDescription>
          Build and test API requests, then visualize your contribution data
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

        <Separator className="my-6" />

        {/* Visualization Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {apiData ? 'Your Contribution Data' : 'Contribution Visualization'}
          </h3>

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
                Enter your Firebase User ID above and click &quot;Fetch Data&quot; to see your contributions
              </p>
            </div>
          )}

          {!isLoading && apiData && (
            <div className="space-y-4">
              <ActivityCalendar
                data={apiData.contributions.length > 0 ? apiData.contributions : sampleContributions}
                labels={defaultLabels}
                totalCount={apiData.total[year] ?? 0}
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

              <p className="text-xs text-center text-muted-foreground mt-2">
                Powered by{' '}
                <a
                  href="https://github.com/grubersjoe/react-activity-calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  React Activity Calendar <ExternalLink className="h-3 w-3" />
                </a>
              </p>

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
                        {(apiData.breakdown.issues || 0) + (apiData.breakdown.workitems || 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Work Items/Issues</div>
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
        </div>
      </CardContent>
    </Card>
  );
}
