import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ContributionsResponse, Contribution } from '@/lib/schemas';

// Sample data for demonstration
const sampleContributions: Contribution[] = [
  { date: '2024-01-01', count: 0, level: 0 },
  { date: '2024-01-02', count: 3, level: 1 },
  { date: '2024-01-03', count: 8, level: 2 },
  { date: '2024-01-04', count: 12, level: 3 },
  { date: '2024-01-05', count: 18, level: 4 },
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

export default function GetEndpointDocs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GET /contributions</CardTitle>
        <CardDescription>Retrieve contribution data for users with stored credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Query Parameters</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <div className="font-medium">Parameter</div>
                <div className="font-medium">Type</div>
                <div className="font-medium">Required</div>
                <div className="font-medium">Default</div>
                <div className="font-medium">Description</div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <code>userId</code>
                <span>string</span>
                <Badge variant="destructive" className="w-fit h-fit">Required</Badge>
                <span>-</span>
                <span>Firebase User ID (obtained after login via dashboard)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <code>year</code>
                <span>int</span>
                <Badge variant="destructive" className="w-fit h-fit">Required</Badge>
                <span>-</span>
                <span>Year to retrieve data for</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <code>providers</code>
                <span>string[]</span>
                <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                <span>all</span>
                <span>Platform filters (github, azure)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <code>includeActivity</code>
                <span>bool</span>
                <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                <span>false</span>
                <span>Include activity breakdown per day</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2 text-sm">
                <code>includeBreakdown</code>
                <span>bool</span>
                <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                <span>false</span>
                <span>Include total breakdown by activity type</span>
              </div>
            </div>
          </div>

          {/* Example Request as Collapsible */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                <span className="font-semibold">Example Request</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="border rounded-lg p-4 bg-muted/20">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {`GET /Contributions?userId=abc123&year=2024&providers=github&providers=azure&includeBreakdown=false&includeActivity=false`}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Response Format as Collapsible */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                <span className="font-semibold">Response Format</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">JSON structure returned by the API:</p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {JSON.stringify(sampleResponse, null, 2)}
                  </pre>
                </div>

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
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
}
