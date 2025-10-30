# **App Name**: Lorem Sleuth

## Core Features:

- Comprehensive Crawling: Crawl websites based on user-defined parameters including single page, same domain, include subdomains, and all domains, respecting max pages limit and depth.
- Lorem Ipsum Detection: Identify all variations of lorem ipsum text, display snippets with context, highlight occurrences, and provide a word count per page.
- Dashboard Overview: Present key statistics in a dashboard, including total pages scanned, pages with lorem ipsum, clean pages, average scan time, and total lorem ipsum instances. Utilize charts to visualize the data.
- Configurable Crawl History: Save previous crawl configurations so they can be easily run in the future
- Exclusion Rules: Implement support for URL exclusion patterns using regex, enabling users to exclude specific paths or file types during the crawl.
- Reporting Tool: Generate and export reports of the findings in multiple formats such as JSON and CSV. Generate an easily shareable unique URL
- Intelligent Prioritization Tool: Prioritize URLs to crawl with an AI-powered tool. For example, the tool could prefer to examine URLS containing the word 'article' first. It could learn from the user over time

## Style Guidelines:

- Primary color: Deep blue (#2979FF) to convey professionalism and trust.
- Background color: Light gray (#F5F7FA) for a clean and modern look.
- Accent color: Vibrant orange (#FF6B6B) for CTAs and highlighting lorem ipsum text.
- Font: 'Inter', a sans-serif font, for a clean and modern user interface, in headlines and body text.
- Use Lucide React icons for a consistent and clean interface.
- Implement a minimalist dashboard layout with glassmorphism effects and beautiful cards for each scanned page.
- Use smooth animations and transitions with Framer Motion for a fluid user experience.