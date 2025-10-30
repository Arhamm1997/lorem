'use client';

import { Button } from "@/components/ui/button";
import type { CrawlResult, CrawlConfig } from "@/lib/types";
import { Play, MoreHorizontal, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { formatDistanceToNow } from 'date-fns';

interface CrawlHistoryProps {
    history: CrawlResult[];
    onSelect: (item: CrawlResult) => void;
    onRerun: (config: Omit<CrawlConfig, 'scope' | 'exclusions'> & { scope: "single" | "domain" | "subdomains" | "all", exclusions: string }) => void;
    onDelete: (id: string) => void;
}

export default function CrawlHistory({ history, onSelect, onRerun, onDelete }: CrawlHistoryProps) {
  if (history.length === 0) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Recent Crawls</SidebarGroupLabel>
            <SidebarGroupContent>
                <p className="p-2 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">No crawls yet.</p>
            </SidebarGroupContent>
        </SidebarGroup>
    );
  }
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recent Crawls</SidebarGroupLabel>
      <SidebarGroupContent>
        <ul className="space-y-1">
          {history.map((item) => (
            <li key={item.id} className="group flex items-center justify-between rounded-md p-2 text-sm hover:bg-sidebar-accent">
                <div className="truncate cursor-pointer" onClick={() => onSelect(item)}>
                    <p className="font-medium truncate">{new URL(item.config.url).hostname}</p>
                    <p className="text-xs text-muted-foreground truncate">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </p>
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onSelect(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRerun(item.config)}>
                          <Play className="mr-2 h-4 w-4" />
                          Re-run
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </li>
          ))}
        </ul>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
