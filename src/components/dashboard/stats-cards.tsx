import type { CrawlResult } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File, FileCheck, FileText, Clock, FileWarning } from "lucide-react";

interface StatsCardsProps {
  summary: CrawlResult["summary"];
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}) => (
  <Card className="bg-card/60 backdrop-blur-xl">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function StatsCards({ summary }: StatsCardsProps) {
    const loremPercentage = summary.totalPages > 0 ? (summary.loremPages / summary.totalPages) * 100 : 0;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Pages Scanned"
        value={summary.totalPages}
        icon={File}
        color="text-primary"
      />
      <StatCard
        title="Pages with Lorem"
        value={summary.loremPages}
        icon={FileWarning}
        color="text-accent"
      />
      <StatCard
        title="Clean Pages"
        value={summary.cleanPages}
        icon={FileCheck}
        color="text-green-500"
      />
      <StatCard
        title="Lorem Instances"
        value={summary.totalInstances}
        icon={FileText}
        color="text-orange-500"
      />
      <StatCard
        title="Average Scan Time"
        value={summary.scanTime}
        icon={Clock}
        color="text-purple-500"
      />
    </div>
  );
}
