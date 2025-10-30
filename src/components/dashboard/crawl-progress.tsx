'use client';

import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface CrawlProgressProps {
  progress: number;
  pagesScanned: number;
  loremPagesFound: number;
}

export default function CrawlProgress({
  progress,
  pagesScanned,
  loremPagesFound,
}: CrawlProgressProps) {
  const loremPercentage = pagesScanned > 0 ? (loremPagesFound / pagesScanned) * 100 : 0;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-lg bg-card/60 backdrop-blur-xl">
        <CardHeader className="items-center text-center">
            <Loader2 className="mb-4 size-12 animate-spin text-primary" />
          <CardTitle className="text-2xl font-bold">Crawling in Progress...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Overall Progress</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-4" />
              <p className="text-center text-sm text-muted-foreground">
                {pagesScanned} Pages Scanned
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-accent">Pages with Lorem Ipsum</span>
                <span className="text-accent">{loremPagesFound}</span>
              </div>
              <Progress value={loremPercentage} className="h-3 [&>div]:bg-accent" />
              <p className="text-center text-xs text-muted-foreground">
                {loremPercentage.toFixed(1)}% of scanned pages contain lorem ipsum
              </p>
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
