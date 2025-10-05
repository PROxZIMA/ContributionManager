'use client';

import { useState, useEffect } from 'react';
import { Loader2, RefreshCw, AlertCircle, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface SvgApiBuilderProps {
  initialUserId?: string;
}

export default function SvgApiBuilder({ initialUserId = '' }: SvgApiBuilderProps) {
  const [svgUserId, setSvgUserId] = useState(initialUserId);
  const [svgYear, setSvgYear] = useState('2025');
  const [svgProviders, setSvgProviders] = useState('github,azure');
  const [svgDarkMode, setSvgDarkMode] = useState(false);
  const [svgBlockSize, setSvgBlockSize] = useState('12');
  const [svgBlockRadius, setSvgBlockRadius] = useState('2');
  const [svgBlockMargin, setSvgBlockMargin] = useState('4');
  const [svgFontSize, setSvgFontSize] = useState('14');
  const [svgMaxLevel, setSvgMaxLevel] = useState('4');
  const [svgWeekStart, setSvgWeekStart] = useState('0');
  const [svgHideColorLegend, setSvgHideColorLegend] = useState(false);
  const [svgHideMonthLabels, setSvgHideMonthLabels] = useState(false);
  const [svgHideTotalCount, setSvgHideTotalCount] = useState(false);
  const [svgHideWeekdayLabels, setSvgHideWeekdayLabels] = useState(false);
  const [svgWeekdayLabels, setSvgWeekdayLabels] = useState('');
  const [svgShowLoadingAnimation, setSvgShowLoadingAnimation] = useState(true);
  const [svgData, setSvgData] = useState<string | null>(null);
  const [svgLoading, setSvgLoading] = useState(false);
  const [svgError, setSvgError] = useState<string | null>(null);

  useEffect(() => {
    setSvgUserId(initialUserId);
    fetchSvgData();
  }, [initialUserId]);

  const buildSvgUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_CONTRIBUTION_API_URL || 'https://localhost:5298';
    const params = new URLSearchParams({
      userId: svgUserId,
      year: svgYear,
      darkMode: svgDarkMode.toString(),
      blockSize: svgBlockSize,
      blockRadius: svgBlockRadius,
      blockMargin: svgBlockMargin,
      fontSize: svgFontSize,
      maxLevel: svgMaxLevel,
      weekStart: svgWeekStart,
      hideColorLegend: svgHideColorLegend.toString(),
      hideMonthLabels: svgHideMonthLabels.toString(),
      hideTotalCount: svgHideTotalCount.toString(),
      hideWeekdayLabels: svgHideWeekdayLabels.toString(),
      showLoadingAnimation: svgShowLoadingAnimation.toString()
    });

    if (svgProviders) {
      svgProviders.split(',').forEach(provider => {
        if (provider.trim())
          params.append('providers', provider.trim());
      });
    }

    if (svgWeekdayLabels.trim()) {
      params.append('weekdayLabels', svgWeekdayLabels);
    }

    return `${baseUrl}/contributions/svg?${params.toString()}`;
  };

  const fetchSvgData = async () => {
    if (!svgUserId.trim()) {
      setSvgError('Please enter a Firebase User ID');
      return;
    }

    setSvgLoading(true);
    setSvgError(null);

    try {
      const url = buildSvgUrl();
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`SVG API request failed: ${response.status} ${response.statusText}`);
      }

      const svgText = await response.text();
      setSvgData(svgText);
    } catch (err) {
      console.error('SVG API call failed:', err);
      setSvgError(err instanceof Error ? err.message : 'Failed to fetch SVG data');
    } finally {
      setSvgLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SVG Endpoint Builder</CardTitle>
        <CardDescription>
          Generate and preview SVG contribution calendar with custom styling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="svgUserId">Firebase User ID</Label>
            <Input
              id="svgUserId"
              placeholder="Enter Firebase User ID"
              value={svgUserId}
              onChange={(e) => setSvgUserId(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgYear">Year</Label>
            <Input
              id="svgYear"
              placeholder="2024"
              value={svgYear}
              onChange={(e) => setSvgYear(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgProviders">Providers (comma-separated)</Label>
            <Input
              id="svgProviders"
              placeholder="github,azure"
              value={svgProviders}
              onChange={(e) => setSvgProviders(e.target.value)}
            />
          </div>
          
          {/* Visual Customization */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-sm mb-3 mt-2">Visual Customization</h4>
          </div>
          
          <div>
            <Label htmlFor="svgBlockSize">Block Size (px)</Label>
            <Input
              id="svgBlockSize"
              type="number"
              placeholder="12"
              value={svgBlockSize}
              onChange={(e) => setSvgBlockSize(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgBlockRadius">Block Radius (px)</Label>
            <Input
              id="svgBlockRadius"
              type="number"
              placeholder="2"
              value={svgBlockRadius}
              onChange={(e) => setSvgBlockRadius(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgBlockMargin">Block Margin (px)</Label>
            <Input
              id="svgBlockMargin"
              type="number"
              placeholder="4"
              value={svgBlockMargin}
              onChange={(e) => setSvgBlockMargin(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgFontSize">Font Size (px)</Label>
            <Input
              id="svgFontSize"
              type="number"
              placeholder="14"
              value={svgFontSize}
              onChange={(e) => setSvgFontSize(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgMaxLevel">Max Level (0-4)</Label>
            <Input
              id="svgMaxLevel"
              type="number"
              placeholder="4"
              min="0"
              max="4"
              value={svgMaxLevel}
              onChange={(e) => setSvgMaxLevel(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgWeekStart">Week Start (0=Sun, 1=Mon)</Label>
            <Input
              id="svgWeekStart"
              type="number"
              placeholder="0"
              min="0"
              max="6"
              value={svgWeekStart}
              onChange={(e) => setSvgWeekStart(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="svgWeekdayLabels">Weekday Labels (optional)</Label>
            <Input
              id="svgWeekdayLabels"
              placeholder="mon,wed,fri"
              value={svgWeekdayLabels}
              onChange={(e) => setSvgWeekdayLabels(e.target.value)}
            />
          </div>
          
          {/* Visibility Controls */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-sm mb-3 mt-2">Visibility & Options</h4>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgDarkMode"
                  checked={svgDarkMode}
                  onChange={(e) => setSvgDarkMode(e.target.checked)}
                />
                <Label htmlFor="svgDarkMode">Dark Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgHideColorLegend"
                  checked={svgHideColorLegend}
                  onChange={(e) => setSvgHideColorLegend(e.target.checked)}
                />
                <Label htmlFor="svgHideColorLegend">Hide Color Legend</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgHideMonthLabels"
                  checked={svgHideMonthLabels}
                  onChange={(e) => setSvgHideMonthLabels(e.target.checked)}
                />
                <Label htmlFor="svgHideMonthLabels">Hide Month Labels</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgHideTotalCount"
                  checked={svgHideTotalCount}
                  onChange={(e) => setSvgHideTotalCount(e.target.checked)}
                />
                <Label htmlFor="svgHideTotalCount">Hide Total Count</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgHideWeekdayLabels"
                  checked={svgHideWeekdayLabels}
                  onChange={(e) => setSvgHideWeekdayLabels(e.target.checked)}
                />
                <Label htmlFor="svgHideWeekdayLabels">Hide Weekday Labels</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="svgShowLoadingAnimation"
                  checked={svgShowLoadingAnimation}
                  onChange={(e) => setSvgShowLoadingAnimation(e.target.checked)}
                />
                <Label htmlFor="svgShowLoadingAnimation">Loading Animation</Label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label>Generated SVG URL:</Label>
          <div className="mt-2 p-3 bg-muted rounded-lg break-all text-sm">
            {buildSvgUrl()}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={fetchSvgData}
            disabled={svgLoading || !svgUserId.trim()}
            className="flex items-center gap-2"
          >
            {svgLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generate SVG
              </>
            )}
          </Button>
          {svgData && (
            <Button
              variant="outline"
              onClick={() => {
                setSvgData(null);
                setSvgError(null);
              }}
            >
              Clear SVG
            </Button>
          )}
        </div>

        <Separator className="my-6" />

        {/* SVG Preview Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {svgData ? 'SVG Preview' : 'SVG Calendar Visualization'}
          </h3>

          {svgError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Error:</strong> {svgError}
              </AlertDescription>
            </Alert>
          )}

          {svgLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Generating SVG calendar...</p>
            </div>
          )}

          {!svgLoading && !svgData && !svgError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Database className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No SVG generated yet</p>
              <p className="text-sm text-muted-foreground">
                Enter your Firebase User ID and customize the parameters, then click &quot;Generate SVG&quot;
              </p>
            </div>
          )}

          {!svgLoading && svgData && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/20 overflow-x-auto">
                <div dangerouslySetInnerHTML={{ __html: svgData }} />
              </div>

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
                <p className="font-medium mb-1">Usage:</p>
                <p>You can embed this SVG directly in HTML, use it in GitHub READMEs, or save it as an image file.</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
