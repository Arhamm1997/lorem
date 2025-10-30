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
    
    // Create comprehensive CSV report
    const csvLines: string[] = [];
    
    // Header Section
    csvLines.push('Lorem Sleuth Crawl Report');
    csvLines.push('');
    
    // Summary Section
    csvLines.push('=== CRAWL SUMMARY ===');
    csvLines.push(`Website URL,${crawlResult.config.url}`);
    csvLines.push(`Crawl Scope,${crawlResult.config.scope}`);
    csvLines.push(`Max Pages,${crawlResult.config.maxPages}`);
    csvLines.push(`Max Depth,${crawlResult.config.maxDepth}`);
    csvLines.push(`Scan Date,${new Date(crawlResult.createdAt).toLocaleString()}`);
    csvLines.push(`Scan Time,${crawlResult.summary.scanTime}`);
    csvLines.push('');
    
    // Statistics Section
    csvLines.push('=== STATISTICS ===');
    csvLines.push(`Total Pages Scanned,${crawlResult.summary.totalPages}`);
    csvLines.push(`Pages with Lorem Ipsum,${crawlResult.summary.loremPages}`);
    csvLines.push(`Clean Pages,${crawlResult.summary.cleanPages}`);
    csvLines.push(`Total Lorem Instances,${crawlResult.summary.totalInstances}`);
    const loremPercentage = crawlResult.summary.totalPages > 0 
      ? ((crawlResult.summary.loremPages / crawlResult.summary.totalPages) * 100).toFixed(2) 
      : '0';
    csvLines.push(`Lorem Percentage,${loremPercentage}%`);
    csvLines.push('');
    
    // Detailed Results Section
    csvLines.push('=== DETAILED PAGE RESULTS ===');
    csvLines.push('Page #,URL,Status,Lorem Count,Page Title,Timestamp,Error Message');
    
    crawlResult.pages.forEach((page, index) => {
      const row = [
        (index + 1).toString(),
        `"${page.url}"`,
        page.status,
        page.loremCount.toString(),
        `"${page.title.replace(/"/g, '""')}"`, // Escape quotes
        new Date(page.timestamp).toLocaleString(),
        page.error ? `"${page.error.replace(/"/g, '""')}"` : ''
      ];
      csvLines.push(row.join(','));
    });
    
    // Lorem Snippets Section (for pages with lorem)
    const loremPages = crawlResult.pages.filter(p => p.status === 'lorem' && p.snippets.length > 0);
    if (loremPages.length > 0) {
      csvLines.push('');
      csvLines.push('=== LOREM IPSUM SNIPPETS ===');
      csvLines.push('URL,Line Number,Context Before,Lorem Text,Context After');
      
      loremPages.forEach(page => {
        page.snippets.forEach(snippet => {
          const row = [
            `"${page.url}"`,
            snippet.lineNumber.toString(),
            `"${snippet.contextBefore.substring(0, 50).replace(/"/g, '""')}"`,
            `"${snippet.loremText.replace(/"/g, '""')}"`,
            `"${snippet.contextAfter.substring(0, 50).replace(/"/g, '""')}"`
          ];
          csvLines.push(row.join(','));
        });
      });
    }
    
    // Top Pages Section
    csvLines.push('');
    csvLines.push('=== TOP PAGES WITH MOST LOREM INSTANCES ===');
    csvLines.push('Rank,URL,Lorem Count');
    const topPages = [...crawlResult.pages]
      .filter(p => p.loremCount > 0)
      .sort((a, b) => b.loremCount - a.loremCount)
      .slice(0, 10);
    
    topPages.forEach((page, index) => {
      csvLines.push(`${index + 1},"${page.url}",${page.loremCount}`);
    });
    
    // Create and download CSV
    const csvString = csvLines.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `lorem-sleuth-report-${crawlResult.id}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Comprehensive CSV report has been downloaded.",
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
              CSV Report
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
