'use client';

import * as React from 'react';
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { PageResult } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CrawlChartsProps {
  pages: PageResult[];
}

export default function CrawlCharts({ pages }: CrawlChartsProps) {
  const cleanPages = pages.filter((p) => p.status === 'clean').length;
  const loremPages = pages.filter((p) => p.status === 'lorem').length;

  const pieData = [
    { name: 'Clean Pages', value: cleanPages, fill: 'hsl(var(--chart-1))' },
    { name: 'Lorem Pages', value: loremPages, fill: 'hsl(var(--chart-2))' },
  ];

  const barData = pages
    .filter((p) => p.status === 'lorem' && p.loremCount > 0)
    .map((p) => ({
      name: p.url.substring(p.url.lastIndexOf('/') + 1).substring(0, 20) || 'Homepage',
      count: p.loremCount,
    }))
    .slice(0, 5); // show top 5

  return (
    <div className="space-y-6">
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Crawl Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                </Pie>
                <Tooltip
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                    }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Top Pages with Lorem Ipsum</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" width={80} stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                 <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{
                        background: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                    }}
                 />
                 <Bar dataKey="count" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
