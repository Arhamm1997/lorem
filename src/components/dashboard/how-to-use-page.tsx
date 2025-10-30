'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  HelpCircle, 
  Search, 
  Settings2, 
  Play, 
  BarChart3, 
  Download,
  Globe,
  Layers,
  FileWarning,
  BrainCircuit
} from "lucide-react";

export default function HowToUsePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HelpCircle className="h-8 w-8" />
          How to Use Lorem Sleuth
        </h1>
        <p className="text-muted-foreground mt-2">
          Follow these simple steps to detect lorem ipsum text on any website
        </p>
      </div>

      {/* Quick Start Guide */}
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>Get started in 5 easy steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <StepCard
              number={1}
              title="Enter Website URL"
              description="Type or paste the URL of the website you want to scan for lorem ipsum text"
              icon={<Globe className="h-5 w-5 text-primary" />}
              example="https://example.com"
            />
            
            <StepCard
              number={2}
              title="Choose Crawl Scope"
              description="Select how extensively you want to crawl the website"
              icon={<Search className="h-5 w-5 text-primary" />}
              options={[
                "Single Page - Only scan the entered URL",
                "Same Domain - Scan all pages on the same domain",
                "Include Subdomains - Scan domain and all subdomains",
                "All Domains - Follow all links (use with caution)"
              ]}
            />
            
            <StepCard
              number={3}
              title="Configure Settings"
              description="Set maximum pages and depth for the crawl"
              icon={<Settings2 className="h-5 w-5 text-primary" />}
              options={[
                "Max Pages: Limit how many pages to scan (1-1000)",
                "Max Depth: How deep to follow links (1-20 levels)"
              ]}
            />
            
            <StepCard
              number={4}
              title="Optional: AI Prioritization"
              description="Use AI to intelligently prioritize which pages to crawl first"
              icon={<BrainCircuit className="h-5 w-5 text-primary" />}
              example="Example: 'prioritize product pages' or 'focus on blog articles'"
            />
            
            <StepCard
              number={5}
              title="Start Crawling & View Results"
              description="Click 'Start Sleuthing' and watch the progress. View detailed results when complete."
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Understanding Settings */}
      <Card className="bg-card/60 backdrop-blur-xl border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Understanding Max Depth & Max Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Max Depth</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Controls how many "link levels" deep the crawler will go from your starting URL.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Depth 0</Badge>
                      <span>Your starting URL (homepage)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Depth 1</Badge>
                      <span>All pages linked directly from the homepage</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Depth 2</Badge>
                      <span>Pages linked from depth 1 pages</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">Depth 3</Badge>
                      <span>Pages linked from depth 2 pages... and so on</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-background/50 rounded-md">
                    <p className="text-xs font-medium">💡 Recommendation:</p>
                    <p className="text-xs text-muted-foreground">
                      Use <strong>Depth 2-3</strong> for most websites. Higher depths can take much longer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <FileWarning className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Max Pages</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Sets the maximum number of pages to scan before stopping, regardless of depth.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">10-50</Badge>
                      <span>Quick scan for small websites or testing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">100-200</Badge>
                      <span>Standard scan for medium-sized websites</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">500+</Badge>
                      <span>Comprehensive scan for large websites (slower)</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-background/50 rounded-md">
                    <p className="text-xs font-medium">💡 Recommendation:</p>
                    <p className="text-xs text-muted-foreground">
                      Start with <strong>50-100 pages</strong> to get quick results, then increase if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Understanding Results */}
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Understanding Your Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResultItem
            label="Total Pages Scanned"
            description="How many pages were successfully crawled"
          />
          <Separator />
          <ResultItem
            label="Pages with Lorem"
            description="Number of pages containing lorem ipsum text"
          />
          <Separator />
          <ResultItem
            label="Clean Pages"
            description="Pages with no lorem ipsum text found"
          />
          <Separator />
          <ResultItem
            label="Lorem Instances"
            description="Total number of lorem ipsum occurrences across all pages"
          />
          <Separator />
          <ResultItem
            label="View Details"
            description="Click 'View' on any page to see exact locations and snippets of lorem ipsum text"
          />
        </CardContent>
      </Card>

      {/* Export & Share */}
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export & Share Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            After your crawl completes, you can:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Export as JSON:</strong> Download complete results with all details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Export as CSV:</strong> Import into Excel or Google Sheets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span><strong>Share Results:</strong> Copy summary to clipboard or share via native share</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips & Best Practices */}
      <Card className="bg-card/60 backdrop-blur-xl border-accent/20">
        <CardHeader>
          <CardTitle>💡 Tips & Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">Tip</Badge>
              <span>Start with smaller settings (50 pages, depth 2) to test before running large crawls</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">Tip</Badge>
              <span>Use URL exclusion patterns to skip unnecessary pages like /admin/* or *.pdf</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">Tip</Badge>
              <span>The AI prioritization works best with specific queries like "product pages" or "documentation"</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">Tip</Badge>
              <span>All your crawl history is saved automatically and can be accessed from the History page</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function StepCard({ number, title, description, icon, example, options }: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  example?: string;
  options?: string[];
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {example && (
          <div className="mt-2 p-2 bg-muted/50 rounded-md border border-border">
            <p className="text-xs font-mono">{example}</p>
          </div>
        )}
        {options && (
          <ul className="mt-2 space-y-1">
            {options.map((option, idx) => (
              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{option}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ResultItem({ label, description }: { label: string; description: string }) {
  return (
    <div>
      <h4 className="font-medium text-sm mb-1">{label}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
