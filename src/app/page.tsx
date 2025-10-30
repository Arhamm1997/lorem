"use client";

import * as React from "react";
import { FileClock, LayoutGrid, Settings, BookOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { AppHeader } from "@/components/layout/header";

import type { CrawlResult, CrawlWebsiteInput, CrawlConfig } from "@/lib/types";
import { crawlWebsite } from "@/ai/flows/crawler";
import { useToast } from "@/hooks/use-toast";

import CrawlForm from "@/components/dashboard/crawl-form";
import CrawlProgress from "@/components/dashboard/crawl-progress";
import DashboardContent from "@/components/dashboard/dashboard-content";
import CrawlHistory from "@/components/dashboard/crawl-history";
import CrawlHistoryCard from "@/components/dashboard/crawl-history-card";
import SettingsPage from "@/components/dashboard/settings-page";
import HowToUsePage from "@/components/dashboard/how-to-use-page";

type AppState = "idle" | "crawling" | "results" | "history" | "settings" | "how-to-use";

export default function DashboardPage() {
  const [appState, setAppState] = React.useState<AppState>("idle");
  const [crawlResult, setCrawlResult] = React.useState<CrawlResult | null>(null);
  const [crawlHistory, setCrawlHistory] = React.useState<CrawlResult[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [pagesScanned, setPagesScanned] = React.useState(0);
  const [loremPagesFound, setLoremPagesFound] = React.useState(0);
  const { toast } = useToast();

  // Load history from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('loremSleuthHistory');
    if (saved) {
      try {
        setCrawlHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  React.useEffect(() => {
    if (crawlHistory.length > 0) {
      localStorage.setItem('loremSleuthHistory', JSON.stringify(crawlHistory));
    }
  }, [crawlHistory]);

  const handleCrawlStart = async (config: Omit<CrawlConfig, 'scope' | 'exclusions'> & { scope: "single" | "domain" | "subdomains" | "all", exclusions: string }) => {
    setAppState("crawling");
    setProgress(0);
    setPagesScanned(0);
    setLoremPagesFound(0);
    setCrawlResult(null);

    const maxPages = config.maxPages;
    let pagesCount = 0;
    
    // Simulate realistic page-by-page crawling with varying speeds
    const crawlSimulation = setInterval(() => {
      // Random crawl speed: sometimes fast, sometimes slow
      const shouldIncrement = Math.random() > 0.3; // 70% chance to crawl a page
      
      if (shouldIncrement && pagesCount < maxPages) {
        pagesCount++;
        setPagesScanned(pagesCount);
        
        // Simulate finding pages with lorem ipsum (30% chance)
        if (Math.random() < 0.3) {
          setLoremPagesFound(prev => prev + 1);
        }
        
        // Update progress based on pages crawled
        const progressPercent = Math.min((pagesCount / maxPages) * 90, 90);
        setProgress(progressPercent);
      }
    }, 200); // Check every 200ms

    try {
      const crawlInput: CrawlWebsiteInput = {
        url: config.url,
        scope: config.scope,
        maxPages: config.maxPages,
        maxDepth: config.maxDepth,
        exclusions: config.exclusions.split('\n').filter(Boolean),
        aiQuery: config.aiQuery,
      };

      const result = await crawlWebsite(crawlInput);
      
      clearInterval(crawlSimulation);
      setProgress(100);
      setPagesScanned(result.summary.totalPages);
      setLoremPagesFound(result.summary.loremPages);
      setCrawlResult(result);
      setAppState("results");
      setCrawlHistory(prev => [result, ...prev]);
    } catch (error) {
        clearInterval(crawlSimulation);
        console.error("Crawl failed:", error);
        toast({
            variant: "destructive",
            title: "Crawl Failed",
            description: "Something went wrong during the crawl. Please try again.",
        });
        setAppState("idle");
    }
  };
  
  const handleNewCrawl = () => {
    setAppState("idle");
    setCrawlResult(null);
    setProgress(0);
    setPagesScanned(0);
    setLoremPagesFound(0);
  };

  const handleHistorySelect = (result: CrawlResult) => {
    setCrawlResult(result);
    setAppState("results");
  }

  const handleHistoryDelete = (id: string) => {
    setCrawlHistory(prev => prev.filter(item => item.id !== id));
    if (crawlResult?.id === id) {
      handleNewCrawl();
    }
  }

  const renderContent = () => {
    switch (appState) {
      case "crawling":
        return <CrawlProgress progress={progress} pagesScanned={pagesScanned} loremPagesFound={loremPagesFound} />;
      case "results":
        return crawlResult ? <DashboardContent crawlResult={crawlResult} /> : null;
      case "history":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Crawl History</h1>
            {crawlHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileClock className="mb-4 size-16 text-muted-foreground" />
                <p className="text-xl font-medium text-muted-foreground">No crawl history yet</p>
                <p className="mt-2 text-sm text-muted-foreground">Start a new crawl to see your history here</p>
                <Button onClick={() => setAppState("idle")} className="mt-6">
                  Start New Crawl
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {crawlHistory.map((item) => (
                  <CrawlHistoryCard
                    key={item.id}
                    crawlResult={item}
                    onView={() => handleHistorySelect(item)}
                    onRerun={() => handleCrawlStart(item.config)}
                    onDelete={() => handleHistoryDelete(item.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case "settings":
        return <SettingsPage />;
      case "how-to-use":
        return <HowToUsePage />;
      case "idle":
      default:
        return <CrawlForm onCrawlStart={handleCrawlStart} />;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" variant="sidebar">
        <SidebarHeader>
          <div className="flex w-full items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <Logo className="size-7 shrink-0" />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              Lorem Sleuth By ARHAM
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={appState !== 'history' && appState !== 'settings' && appState !== 'how-to-use'}
                onClick={() => setAppState('idle')}
                tooltip={{ children: "Dashboard" }}
              >
                <LayoutGrid />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={appState === 'how-to-use'}
                onClick={() => setAppState('how-to-use')}
                tooltip={{ children: "How to Use" }}
              >
                <BookOpen />
                <span>How to Use</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={appState === 'history'}
                onClick={() => setAppState('history')}
                tooltip={{ children: "Crawl History" }}
              >
                <FileClock />
                <span>History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive={appState === 'settings'}
                onClick={() => setAppState('settings')}
                tooltip={{ children: "Settings" }}
              >
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <CrawlHistory 
            history={crawlHistory}
            onSelect={handleHistorySelect}
            onRerun={handleCrawlStart}
            onDelete={handleHistoryDelete}
          />

        </SidebarContent>
        <SidebarFooter>
           <div className="flex items-center gap-2 p-2">
            <Avatar className="size-8">
              <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium">Guest User</span>
              <span className="text-xs text-muted-foreground">guest@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader onNewCrawl={handleNewCrawl} crawlResult={crawlResult} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
