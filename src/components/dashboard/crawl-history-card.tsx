'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Trash2, Calendar, Globe, FileText } from "lucide-react";
import type { CrawlResult } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

interface CrawlHistoryCardProps {
  crawlResult: CrawlResult;
  onView: () => void;
  onRerun: () => void;
  onDelete: () => void;
}

export default function CrawlHistoryCard({ crawlResult, onView, onRerun, onDelete }: CrawlHistoryCardProps) {
  const { config, summary, createdAt } = crawlResult;

  return (
    <Card className="bg-card/60 backdrop-blur-xl hover:bg-card/80 transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              {new URL(config.url).hostname}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{config.url}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onView}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button variant="outline" size="sm" onClick={onRerun}>
              <Play className="mr-2 h-4 w-4" />
              Re-run
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete} className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Pages</p>
            <p className="text-2xl font-bold">{summary.totalPages}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Lorem Pages</p>
            <p className="text-2xl font-bold text-accent">{summary.loremPages}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Clean Pages</p>
            <p className="text-2xl font-bold text-green-500">{summary.cleanPages}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Instances</p>
            <p className="text-2xl font-bold text-orange-500">{summary.totalInstances}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <FileText className="h-3 w-3" />
            Scope: {config.scope}
          </Badge>
          <Badge variant="outline">
            Max Depth: {config.maxDepth}
          </Badge>
          <Badge variant="outline">
            Scan Time: {summary.scanTime}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
