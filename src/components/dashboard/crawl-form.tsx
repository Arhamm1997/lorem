'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Info, ScanLine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CrawlConfig } from '@/lib/types';

interface CrawlFormProps {
  onCrawlStart: (config: Omit<CrawlConfig, 'scope'> & { scope: "single" | "domain" | "subdomains" | "all" }) => void;
}

export default function CrawlForm({ onCrawlStart }: CrawlFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const config = {
      url: formData.get("url") as string,
      scope: formData.get("scope") as "single" | "domain" | "subdomains" | "all",
      maxPages: parseInt(formData.get("maxPages") as string, 10),
      maxDepth: parseInt(formData.get("maxDepth") as string, 10),
      exclusions: formData.get("exclusions") as string,
      aiQuery: formData.get("aiQuery") as string,
    };
    onCrawlStart(config);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="animated-gradient-background rounded-xl p-0.5">
          <Card className="shadow-2xl shadow-primary/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <ScanLine className="size-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Start a New Crawl
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Enter a website URL to begin searching for lorem ipsum text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-lg">Website URL</Label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://example.com"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <Label className="text-lg">Crawl Scope</Label>
                    <RadioGroup name="scope" defaultValue="domain" className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single" className="text-base">Single Page</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="domain" id="domain" />
                        <Label htmlFor="domain" className="text-base">Same Domain</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="subdomains"
                          id="subdomains"
                        />
                        <Label htmlFor="subdomains" className="text-base">Include Subdomains</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all" className="text-base">All Domains</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="maxPages" className="text-lg">Max Pages</Label>
                      <Input
                        id="maxPages"
                        name="maxPages"
                        type="number"
                        defaultValue={100}
                        min={1}
                        max={1000}
                        className="h-12 text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDepth" className="text-lg">Max Depth</Label>
                      <Input
                        id="maxDepth"
                        name="maxDepth"
                        type="number"
                        defaultValue={3}
                        min={1}
                        max={20}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                   <Label htmlFor="exclusions" className="text-lg">URL Exclusion Patterns</Label>
                   <Textarea
                     id="exclusions"
                     name="exclusions"
                     placeholder="e.g., /admin/* or *.pdf (one per line)"
                     rows={3}
                     className="text-base"
                   />
                 </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="text-primary" />
                    <Label htmlFor="aiQuery" className="text-lg">
                      Intelligent Prioritization
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="size-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Use AI to prioritize URLs. E.g., 'product pages' or 'articles about Next.js'.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                   <Input
                     id="aiQuery"
                     name="aiQuery"
                     placeholder="Optional: Enter a query to guide the AI crawler"
                     className="h-12 text-base"
                   />
                 </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-xl font-bold"
                >
                  <ScanLine className="mr-2" />
                  Start Sleuthing
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
