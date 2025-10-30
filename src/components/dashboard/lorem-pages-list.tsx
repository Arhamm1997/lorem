'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, AlertCircle } from "lucide-react";
import type { PageResult } from "@/lib/types";

interface LoremPagesListProps {
  pages: PageResult[];
}

export default function LoremPagesList({ pages }: LoremPagesListProps) {
  const loremPages = pages.filter(p => p.status === 'lorem');

  if (loremPages.length === 0) {
    return (
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-green-500" />
            Pages with Lorem Ipsum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-lg font-medium text-green-500">🎉 No lorem ipsum found!</p>
            <p className="text-sm text-muted-foreground mt-2">All pages are clean</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-accent" />
          Pages with Lorem Ipsum ({loremPages.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {loremPages.map((page) => (
              <div
                key={page.id}
                className="rounded-lg border border-accent/20 bg-accent/5 p-4 hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive" className="shrink-0">
                        {page.loremCount} {page.loremCount === 1 ? 'instance' : 'instances'}
                      </Badge>
                      <h3 className="font-medium text-sm truncate">{page.title}</h3>
                    </div>
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 break-all"
                    >
                      {page.url}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    {page.snippets.length > 0 && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        First occurrence at line {page.snippets[0].lineNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
