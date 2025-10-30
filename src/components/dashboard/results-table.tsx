'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import type { PageResult } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

interface ResultsTableProps {
  pages: PageResult[];
}

type SortKey = keyof PageResult | '';

export default function ResultsTable({ pages }: ResultsTableProps) {
  const [filter, setFilter] = React.useState('');
  const [sortKey, setSortKey] = React.useState<SortKey>('loremCount');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedPages = React.useMemo(() => {
    const filtered = pages.filter((page) =>
      page.url.toLowerCase().includes(filter.toLowerCase())
    );

    if (!sortKey) return filtered;
    
    return filtered.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  }, [pages, filter, sortKey, sortOrder]);
  
  const getStatusVariant = (status: PageResult['status']) => {
    switch (status) {
      case 'lorem':
        return 'destructive';
      case 'clean':
        return 'default';
      case 'error':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="w-full space-y-4">
      <Input
        placeholder="Filter URLs..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <ScrollArea className="h-[430px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('url')} className="cursor-pointer">
                  URL {renderSortIcon('url')}
                </TableHead>
                <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                  Status {renderSortIcon('status')}
                </TableHead>
                <TableHead onClick={() => handleSort('loremCount')} className="cursor-pointer text-right">
                  Lorem Count {renderSortIcon('loremCount')}
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="max-w-[200px] truncate font-medium">
                    {page.url}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(page.status)}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{page.loremCount}</TableCell>
                  <TableCell className="text-right">
                    {page.status === 'lorem' ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                Details for {page.title}
                                <a href={page.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 text-primary" />
                                </a>
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[60vh]">
                            <div className="space-y-4 pr-4">
                                {page.snippets.map((snippet, index) => (
                                    <div key={index} className="rounded-md border p-4 text-sm">
                                        <p className="text-muted-foreground">
                                            {snippet.contextBefore}
                                            <span className="bg-accent/30 text-accent-foreground px-1 rounded">
                                                {snippet.loremText}
                                            </span>
                                            {snippet.contextAfter}
                                        </p>
                                        <p className="mt-2 text-xs font-semibold text-primary">Line: {snippet.lineNumber}</p>
                                    </div>
                                ))}
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      page.status === "error" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Error</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Error Details</DialogTitle>
                            </DialogHeader>
                            <p>{page.error}</p>
                          </DialogContent>
                        </Dialog>
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
