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

export default function SvgEndpointDocs() {
  return (
    <>
      {/* GET /contributions/svg */}
      <Card>
        <CardHeader>
          <CardTitle>GET /contributions/svg</CardTitle>
          <CardDescription>Generate SVG contribution calendar visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Required Parameters</h4>
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
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>providers</code>
                  <span>string[]</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>all</span>
                  <span>Platform filters (github, azure)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockMargin</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>4</span>
                  <span>Margin between calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockRadius</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>2</span>
                  <span>Border radius of calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockSize</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>12</span>
                  <span>Size of calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>darkMode</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Enable dark mode color scheme</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>fontSize</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>14</span>
                  <span>Font size for text labels in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>maxLevel</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>4</span>
                  <span>Maximum activity level (0-4, where 4 = highest)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>weekStart</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>0</span>
                  <span>First day of week (0=Sunday, 1=Monday, etc.)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideColorLegend</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide the color intensity legend below calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideMonthLabels</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide month labels above the calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideTotalCount</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide total contribution count below calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideWeekdayLabels</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide all weekday labels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>weekdayLabels</code>
                  <span>string</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>null</span>
                  <span>Comma-separated weekdays to show (e.g., "mon,wed,fri")</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>showLoadingAnimation</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Enable loading animation on calendar blocks</span>
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
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate a dark mode SVG calendar with custom styling:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {`GET /contributions/svg?userId=abc123&year=2024&providers=github&providers=azure&darkMode=true&blockSize=14&blockRadius=3&hideColorLegend=false&showLoadingAnimation=true`}
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
                    <p className="text-sm text-muted-foreground mb-3">Returns an SVG image that can be embedded directly in HTML, used as a GitHub README image, or displayed in any application that supports SVG rendering.</p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      {`<svg width="901" height="152" viewBox="0 0 901 152" xmlns="http://www.w3.org/2000/svg" class="contribution-calendar">
...
</svg>`}
                    </pre>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {/* POST /contributions/svg */}
      <Card>
        <CardHeader>
          <CardTitle>POST /contributions/svg</CardTitle>
          <CardDescription>Generate SVG contribution calendar visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Required Parameters</h4>
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
                  <code>year</code>
                  <span>int</span>
                  <Badge variant="destructive" className="w-fit h-fit">Required</Badge>
                  <span>-</span>
                  <span>Year to retrieve data for</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>providers</code>
                  <span>string[]</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>all</span>
                  <span>Platform filters (github, azure)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockMargin</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>4</span>
                  <span>Margin between calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockRadius</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>2</span>
                  <span>Border radius of calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>blockSize</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>12</span>
                  <span>Size of calendar blocks in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>darkMode</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Enable dark mode color scheme</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>fontSize</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>14</span>
                  <span>Font size for text labels in pixels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>maxLevel</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>4</span>
                  <span>Maximum activity level (0-4, where 4 = highest)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>weekStart</code>
                  <span>int</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>0</span>
                  <span>First day of week (0=Sunday, 1=Monday, etc.)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideColorLegend</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide the color intensity legend below calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideMonthLabels</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide month labels above the calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideTotalCount</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide total contribution count below calendar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>hideWeekdayLabels</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Hide all weekday labels</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>weekdayLabels</code>
                  <span>string</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>null</span>
                  <span>Comma-separated weekdays to show (e.g., "mon,wed,fri")</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_2fr] gap-2">
                  <code>showLoadingAnimation</code>
                  <span>bool</span>
                  <Badge variant="secondary" className="w-fit h-fit">Optional</Badge>
                  <span>false</span>
                  <span>Enable loading animation on calendar blocks</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Request Body</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    JSON object containing platform credentials. Include credentials for the platforms you want to query.
                  </p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 text-sm">
                      <div className="font-medium">Platform</div>
                      <div className="font-medium">Required Fields</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 text-sm">
                      <code>azure</code>
                      <div className="space-y-1">
                        <div><code className="text-xs">email</code> - Azure DevOps email</div>
                        <div><code className="text-xs">organization</code> - Azure DevOps organization name</div>
                        <div><code className="text-xs">token</code> - Personal Access Token</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 text-sm">
                      <code>gitHub</code>
                      <div className="space-y-1">
                        <div><code className="text-xs">username</code> - GitHub username</div>
                        <div><code className="text-xs">token</code> - Personal Access Token</div>
                      </div>
                    </div>
                  </div>
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
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate a dark mode SVG calendar with custom styling:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    {`curl -X POST "http://localhost:5298/contributions/svg?year=2024&providers=github&providers=azure&darkMode=true&blockSize=14&blockRadius=3&hideColorLegend=false&showLoadingAnimation=true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "azure": {
        "email": "john.doe@company.com",
        "organization": "CompanyOrg", 
        "token": "{{AZURE_DEVOPS_WORK_PAT}}"
    },
    "gitHub": {
        "username": "johndoe",
        "token": "{{GITHUB_PERSONAL_PAT}}"
    }
}'`}
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
                    <p className="text-sm text-muted-foreground mb-3">Returns an SVG image that can be embedded directly in HTML, used as a GitHub README image, or displayed in any application that supports SVG rendering.</p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      {`<svg width="901" height="152" viewBox="0 0 901 152" xmlns="http://www.w3.org/2000/svg" class="contribution-calendar">
...
</svg>`}
                    </pre>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
