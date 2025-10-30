'use client';

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface CrawlProgressProps {
  progress: number;
  pagesScanned: number;
}

export default function CrawlProgress({
  progress,
  pagesScanned,
}: CrawlProgressProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-lg bg-card/60 backdrop-blur-xl">
        <CardHeader className="items-center text-center">
            <Loader2 className="mb-4 size-12 animate-spin text-primary" />
          <CardTitle className="text-2xl font-bold">Crawling in Progress...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progress} className="h-4" />
            <div className="flex justify-between text-lg font-medium">
              <span>{progress.toFixed(0)}%</span>
              <span>
                {pagesScanned} Pages Scanned
              </span>
            </div>
            <p className="text-center text-muted-foreground">
              Please wait while we scan the website. This might take a few minutes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
