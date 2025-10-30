'use server';

/**
 * @fileOverview A web crawler flow that scans a website for lorem ipsum text.
 * - crawlWebsite - The main function to initiate a website crawl.
 * - CrawlWebsiteInput - The input schema for the crawl.
 * - CrawlWebsiteOutput - The output schema for the crawl results.
 */

import { ai } from '@/ai/genkit';
import {
    CrawlResultSchema,
    CrawlWebsiteInputSchema,
    LoremSnippetSchema,
    PageResultSchema,
    type CrawlResult,
    type CrawlWebsiteInput
} from '@/lib/types';
import {
  prioritizeUrls
} from './intelligent-crawl-prioritization';

// Exported wrapper function to be called from the frontend
export async function crawlWebsite(input: CrawlWebsiteInput): Promise<CrawlResult> {
  return crawlWebsiteFlow(input);
}

const crawlWebsiteFlow = ai.defineFlow(
  {
    name: 'crawlWebsiteFlow',
    inputSchema: CrawlWebsiteInputSchema,
    outputSchema: CrawlResultSchema,
  },
  async (input) => {
    const startTime = Date.now();
    const visited = new Set<string>();
    const pages: (typeof PageResultSchema._type)[] = [];
    const queue: { url: string; depth: number }[] = [{ url: input.url, depth: 0 }];
    const startHostname = new URL(input.url).hostname;
    
    // Simple lorem ipsum detection regex
    const loremRegex = /lorem ipsum/gi;

    while (queue.length > 0 && pages.length < input.maxPages) {
      let currentUrls: string[] = queue.map(q => q.url);
      
      if (input.aiQuery && currentUrls.length > 1) {
          try {
            const prioritized = await prioritizeUrls({ urls: currentUrls, userQuery: input.aiQuery });
            queue.sort((a, b) => prioritized.indexOf(a.url) - prioritized.indexOf(b.url));
          } catch (e) {
            console.warn("AI prioritization failed, continuing with normal queue.");
          }
      }

      const item = queue.shift();
      if (!item) continue;
      
      const { url, depth } = item;

      if (visited.has(url) || depth > input.maxDepth) {
        continue;
      }
      visited.add(url);
      
      let pageResult: (typeof PageResultSchema._type);

      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) {
            continue; // Skip non-html pages
        }

        const html = await response.text();
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : 'No Title';
        
        const lines = html.split('\n');
        const snippets: (typeof LoremSnippetSchema._type)[] = [];
        let loremCount = 0;
        
        lines.forEach((line, index) => {
            const matches = line.matchAll(loremRegex);
            for (const match of matches) {
                loremCount++;
                if(match.index !== undefined) {
                  snippets.push({
                      contextBefore: line.substring(0, match.index),
                      loremText: match[0],
                      contextAfter: line.substring(match.index + match[0].length),
                      lineNumber: index + 1,
                  });
                }
            }
        });

        pageResult = {
          id: `page_${pages.length + 1}`,
          url,
          status: loremCount > 0 ? 'lorem' : 'clean',
          loremCount,
          snippets,
          timestamp: new Date().toISOString(),
          title: title,
        };

        // Find new links to crawl
        if (depth < input.maxDepth) {
          const linkRegex = /href="([^"]+)"/g;
          let match;
          while ((match = linkRegex.exec(html)) !== null) {
            let newUrl: URL;
            try {
              newUrl = new URL(match[1], url);
            } catch (e) {
              // Invalid URL, skip
              continue;
            }
            
            const newHostname = newUrl.hostname;

            let inScope = false;
            switch(input.scope) {
                case 'single':
                    inScope = false; // Only the start URL is processed
                    break;
                case 'domain':
                    inScope = newHostname === startHostname;
                    break;
                case 'subdomains':
                    inScope = newHostname.endsWith(startHostname);
                    break;
                case 'all':
                    inScope = true;
                    break;
            }

            if(inScope && !visited.has(newUrl.href) && !input.exclusions.some(p => newUrl.href.match(new RegExp(p)))) {
              queue.push({ url: newUrl.href, depth: depth + 1 });
            }
          }
        }
      } catch (error: any) {
        pageResult = {
          id: `page_${pages.length + 1}`,
          url,
          status: 'error',
          loremCount: 0,
          snippets: [],
          timestamp: new Date().toISOString(),
          title: 'Error Fetching Page',
          error: error.message,
        };
      }
      pages.push(pageResult);
    }
    
    const endTime = Date.now();
    const scanTimeMs = endTime - startTime;
    const scanTime = `${Math.floor(scanTimeMs / 60000)}m ${Math.floor((scanTimeMs % 60000) / 1000)}s`;
    
    const loremPages = pages.filter(p => p.status === 'lorem').length;
    const cleanPages = pages.filter(p => p.status === 'clean').length;
    const totalInstances = pages.reduce((sum, p) => sum + p.loremCount, 0);

    return {
      id: `crawl_${Date.now()}`,
      config: {
        ...input,
        exclusions: input.exclusions.join('\n'),
      },
      summary: {
        totalPages: pages.length,
        loremPages,
        cleanPages,
        totalInstances,
        scanTime,
      },
      pages,
      createdAt: new Date().toISOString(),
    };
  }
);
