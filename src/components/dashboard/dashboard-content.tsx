import type { CrawlResult } from "@/lib/types";
import StatsCards from "./stats-cards";
import CrawlCharts from "./crawl-charts";
import ResultsTable from "./results-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardContentProps {
  crawlResult: CrawlResult;
}

export default function DashboardContent({ crawlResult }: DashboardContentProps) {
  return (
    <div className="space-y-6">
      <StatsCards summary={crawlResult.summary} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
            <CrawlCharts pages={crawlResult.pages} />
        </div>
        <div className="lg:col-span-3">
          <Card className="h-full bg-card/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Scanned Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <ResultsTable pages={crawlResult.pages} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
