import { z } from 'zod';

export const CrawlWebsiteInputSchema = z.object({
  url: z.string().url().describe('The starting URL for the crawl.'),
  scope: z
    .enum(['single', 'domain', 'subdomains', 'all'])
    .default('domain')
    .describe('The scope of the crawl.'),
  maxPages: z.number().int().positive().default(100).describe('Maximum number of pages to crawl.'),
  maxDepth: z.number().int().positive().default(3).describe('Maximum depth of links to follow.'),
  exclusions: z.array(z.string()).default([]).describe('URL patterns to exclude.'),
  aiQuery: z.string().optional().describe('AI query for prioritizing URLs.'),
});
export type CrawlWebsiteInput = z.infer<typeof CrawlWebsiteInputSchema>;


export type CrawlScope = z.infer<typeof CrawlWebsiteInputSchema.shape.scope>;

export const CrawlConfigSchema = CrawlWebsiteInputSchema.pick({
    url: true,
    scope: true,
    maxPages: true,
    maxDepth: true,
    aiQuery: true,
  }).extend({ exclusions: z.string() });
export type CrawlConfig = z.infer<typeof CrawlConfigSchema>;


export const LoremSnippetSchema = z.object({
  contextBefore: z.string(),
  loremText: z.string(),
  contextAfter: z.string(),
  lineNumber: z.number(),
});
export type LoremSnippet = z.infer<typeof LoremSnippetSchema>;


export const PageResultSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  status: z.enum(['clean', 'lorem', 'error']),
  loremCount: z.number().int(),
  snippets: z.array(LoremSnippetSchema),
  timestamp: z.string().datetime(),
  title: z.string(),
  error: z.string().optional(),
});
export type PageResult = z.infer<typeof PageResultSchema>;


export const CrawlResultSchema = z.object({
  id: z.string(),
  config: CrawlConfigSchema,
  summary: z.object({
    totalPages: z.number().int(),
    loremPages: z.number().int(),
    cleanPages: z.number().int(),
    totalInstances: z.number().int(),
    scanTime: z.string(),
  }),
  pages: z.array(PageResultSchema),
  createdAt: z.string().datetime(),
});
export type CrawlResult = z.infer<typeof CrawlResultSchema>;


export const CrawlHistoryItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    config: CrawlWebsiteInputSchema.pick({
        url: true,
        scope: true,
        maxPages: true,
        maxDepth: true,
    }).extend({ exclusions: z.string() }),
    lastRun: z.string(),
});
export type CrawlHistoryItem = z.infer<typeof CrawlHistoryItemSchema>;
