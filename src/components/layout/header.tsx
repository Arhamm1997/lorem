"use client";

import { Button } from "@/components/ui/button";
import {
  Download,
  Plus,
  Share2,
  FileJson,
  Sheet,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CrawlResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AppHeaderProps {
  onNewCrawl: () => void;
  crawlResult: CrawlResult | null;
}

export function AppHeader({ onNewCrawl, crawlResult }: AppHeaderProps) {
  const { toast } = useToast();

  const handleExportJson = () => {
    if (!crawlResult) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(crawlResult, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `lorem-sleuth-result-${crawlResult.id}.json`;
    link.click();
    
    toast({
      title: "Export Successful",
      description: "JSON file has been downloaded.",
    });
  };

  const handleExportCsv = () => {
    if (!crawlResult) return;
    
    const csvRows = [
      ['URL', 'Status', 'Lorem Count', 'Title', 'Timestamp'],
      ...crawlResult.pages.map(page => [
        page.url,
        page.status,
        page.loremCount.toString(),
        page.title.replace(/,/g, ';'), // Replace commas to avoid CSV issues
        page.timestamp
      ])
    ];
    
    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `lorem-sleuth-result-${crawlResult.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded.",
    });
  };

  const handleExportPdf = () => {
    toast({
      title: "PDF Export",
      description: "PDF export functionality coming soon!",
      variant: "default",
    });
  };

  const handleShare = () => {
    if (!crawlResult) return;
    
    // Create a shareable JSON data URL
    const shareableData = {
      id: crawlResult.id,
      url: crawlResult.config.url,
      summary: crawlResult.summary,
      createdAt: crawlResult.createdAt
    };
    
    const shareText = `Lorem Sleuth Results - ${crawlResult.config.url}\n` +
      `Total Pages: ${crawlResult.summary.totalPages}\n` +
      `Lorem Pages: ${crawlResult.summary.loremPages}\n` +
      `Clean Pages: ${crawlResult.summary.cleanPages}\n` +
      `Total Instances: ${crawlResult.summary.totalInstances}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Lorem Sleuth Results',
        text: shareText,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast({
          title: "Copied to Clipboard",
          description: "Results summary copied to clipboard.",
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Results summary copied to clipboard.",
      });
    }
  };


  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b bg-background/95 px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1" onClick={handleShare} disabled={!crawlResult}>
          <Share2 className="size-3.5" />
          <span>Share</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1" disabled={!crawlResult}>
              <Download className="size-3.5" />
              <span>Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleExportJson}>
              <FileJson className="mr-2 size-4" />
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportCsv}>
              <Sheet className="mr-2 size-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportPdf}>
              <FileText className="mr-2 size-4" />
              PDF (Coming Soon)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-1" onClick={onNewCrawl}>
          <Plus className="size-3.5" />
          <span>New Crawl</span>
        </Button>
      </div>
    </header>
  );
}
