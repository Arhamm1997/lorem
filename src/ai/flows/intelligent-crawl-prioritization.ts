'use server';

/**
 * @fileOverview A flow that prioritizes URLs to crawl based on an AI model that learns from user behavior.
 *
 * - prioritizeUrls - A function that takes a list of URLs and returns a prioritized list.
 * - PrioritizeUrlsInput - The input type for the prioritizeUrls function.
 * - PrioritizeUrlsOutput - The return type for the prioritizeUrls function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeUrlsInputSchema = z.object({
  urls: z.array(z.string().url()).describe('A list of URLs to prioritize.'),
  userQuery: z.string().optional().describe('A user query to provide context for prioritization.'),
});
export type PrioritizeUrlsInput = z.infer<typeof PrioritizeUrlsInputSchema>;

const PrioritizeUrlsOutputSchema = z.array(z.string().url()).describe('A list of prioritized URLs.');
export type PrioritizeUrlsOutput = z.infer<typeof PrioritizeUrlsOutputSchema>;

export async function prioritizeUrls(input: PrioritizeUrlsInput): Promise<PrioritizeUrlsOutput> {
  return prioritizeUrlsFlow(input);
}

const prioritizeUrlsPrompt = ai.definePrompt({
  name: 'prioritizeUrlsPrompt',
  input: {schema: PrioritizeUrlsInputSchema},
  output: {schema: PrioritizeUrlsOutputSchema},
  prompt: `You are an AI assistant designed to prioritize a list of URLs for crawling.

  Given the following list of URLs:
  {{#each urls}}
  - {{{this}}}
  {{/each}}

  And the user query:
  {{userQuery}}

  Prioritize the URLs based on their relevance to the user query and their potential to contain valuable information. Return the prioritized list of URLs.
  Ensure that all URLs from the input are present in the output. Do not add or remove URLs.
  Output the list as a JSON array of strings.
  `,
});

const prioritizeUrlsFlow = ai.defineFlow(
  {
    name: 'prioritizeUrlsFlow',
    inputSchema: PrioritizeUrlsInputSchema,
    outputSchema: PrioritizeUrlsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeUrlsPrompt(input);
    return output!;
  }
);
