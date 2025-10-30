# Lorem Sleuth By ARHAM

A sophisticated web crawler application that detects lorem ipsum placeholder text across entire websites. Built with Next.js, Google Genkit AI, and modern React components.

## 🚀 Features

### Comprehensive Web Crawling
- **Multiple Crawl Scopes**: Single page, same domain, include subdomains, or all domains
- **Configurable Parameters**: Set max pages, depth, and URL exclusion patterns
- **Intelligent AI Prioritization**: Use AI to prioritize URLs based on queries (e.g., "product pages", "blog articles")

### Lorem Ipsum Detection
- **Advanced Detection**: Identifies all variations of lorem ipsum text
- **Context Snippets**: Shows surrounding context for each occurrence
- **Line Number Tracking**: Pinpoints exact location of lorem text
- **Comprehensive Statistics**: Counts instances per page and across the entire site

### Dashboard & Analytics
- **Real-time Progress**: Live progress tracking during crawls
- **Visual Charts**: Pie charts and bar graphs to visualize results
- **Statistics Cards**: Key metrics including total pages, lorem pages, clean pages, and scan time
- **Interactive Results Table**: Sortable, filterable table with detailed page information

### History & Settings
- **Crawl History**: Automatically saves all crawl results to local storage
- **Quick Actions**: View, re-run, or delete previous crawls
- **Settings Page**: Customize default crawl parameters and performance settings
- **Dark Mode**: Beautiful dark theme with glassmorphism effects

### Export & Share
- **JSON Export**: Download complete crawl results
- **CSV Export**: Export results in CSV format for spreadsheets
- **Share Functionality**: Share results summary via native share or clipboard

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe code
- **Google Genkit AI** - AI-powered URL prioritization
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Recharts** - Beautiful charts and visualizations
- **Zod** - Schema validation
- **date-fns** - Date formatting

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your Google AI API key
GOOGLE_GENAI_API_KEY=your_api_key_here

# Run development server
npm run dev

# Open browser at http://localhost:9002
```

## 🎯 Usage

1. **Start a New Crawl**
   - Enter a website URL
   - Configure crawl scope (single page, domain, subdomains, or all)
   - Set maximum pages and depth
   - Add URL exclusion patterns (optional)
   - Add AI query for intelligent prioritization (optional)
   - Click "Start Sleuthing"

2. **View Results**
   - See statistics on total pages, lorem pages, clean pages, and instances
   - Explore interactive charts showing crawl analysis
   - Filter and sort results in the table
   - Click "View" to see detailed snippets of lorem text

3. **Export & Share**
   - Export results as JSON or CSV
   - Share results summary via clipboard or native share

4. **Manage History**
   - View all previous crawls in the History page
   - Re-run any previous crawl configuration
   - Delete unwanted crawl results

5. **Configure Settings**
   - Set default crawl parameters
   - Adjust performance settings
   - Clear all history

## 🧰 Development Scripts

```bash
# Run development server
npm run dev

# Run Genkit development UI
npm run genkit:dev

# Run Genkit with watch mode
npm run genkit:watch

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run typecheck

# Run linter
npm run lint
```

## 🎨 Design Philosophy

Lorem Sleuth follows a modern, professional design with:
- **Deep Blue Primary** (#2979FF) - Professionalism and trust
- **Light Gray Background** (#F5F7FA) - Clean and modern
- **Vibrant Orange Accent** (#FF6B6B) - CTAs and lorem highlights
- **Inter Font** - Clean, modern typography
- **Glassmorphism Effects** - Beautiful card designs with backdrop blur
- **Smooth Animations** - Fluid user experience

## 📝 License

This project is built for demonstration and educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Built with ❤️ by ARHAM using Next.js and Google Genkit AI
