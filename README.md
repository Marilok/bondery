# Bondee Monorepo

A monorepo containing the Bondee application ecosystem, managed with [Turborepo](https://turborepo.com).

## 📦 What's Inside?

This monorepo includes the following packages/apps:

- `apps/web`: A [Next.js](https://nextjs.org/) application for the main Bondee web platform
- `apps/chrome-extension`: A Chrome extension for Instagram integration
- `packages/branding`: Shared branding assets, theme, and styles
- `packages/translations`: Internationalization (i18n) translation files

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 10 or higher (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bondee
```

2. Install dependencies:
```bash
npm install
```

This will install all dependencies for all packages in the monorepo using npm workspaces.

## 🛠️ Development

### Run All Apps in Development Mode

To start all applications in development mode simultaneously:

```bash
npm run dev
```

This will start:
- **Web App**: Running on `http://localhost:3000`

### Run Specific App

To run a specific app only:

```bash
# Run only the web app
npm run dev --filter=web

# Run only the chrome extension (when available)
npm run dev --filter=chrome-extension
```

### Type Checking

Run TypeScript type checking across all packages:

```bash
npm run check-types
```

### Linting

Run ESLint across all packages:

```bash
npm run lint
```

## 🏗️ Build

### Build All Apps

To build all applications for production:

```bash
npm run build
```

This will:
- Build the Next.js web app with optimizations
- Create production bundles for all packages
- Cache the build outputs for faster subsequent builds

### Build Specific App

```bash
# Build only the web app
npm run build --filter=web
```

## 🚢 Production

### Run Production Build

After building, you can start the production server:

```bash
npm run start
```

Or for a specific app:

```bash
npm run start --filter=web
```

## 🔧 Environment Variables

### Web App (`apps/web`)

Create a `.env.local` file in the `apps/web` directory with the following structure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For server-side operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: For production
# NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

### Getting Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to Settings > API
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 📁 Project Structure

```
bondee/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── src/               # Application source code
│   │   ├── public/            # Static assets
│   │   ├── supabase/          # Supabase migrations and config
│   │   ├── types/             # TypeScript type definitions
│   │   └── package.json       # Web app dependencies
│   └── chrome-extension/      # Chrome extension for Instagram
│       ├── src/               # Extension source code
│       ├── public/            # Extension assets
│       └── package.json       # Extension dependencies
├── packages/                  # Shared packages
│   ├── branding/             # Shared theme, styles, and icons
│   │   ├── src/
│   │   │   ├── icon.svg      # Main Bondee icon
│   │   │   ├── theme.ts      # Mantine theme configuration
│   │   │   └── styles.css    # Custom Mantine styles
│   │   └── package.json
│   └── translations/         # i18n translation files
│       ├── src/
│       │   ├── cs.json       # Czech translations
│       │   ├── en.json       # English translations
│       │   └── index.ts      # Translation exports
│       └── package.json
├── turbo.json                # Turborepo configuration
├── package.json              # Root package.json with workspaces
└── README.md                 # This file
```

## 🧹 Cleaning

To clean all build outputs and caches:

```bash
npm run clean
```

This removes:
- `.next` directories
- `.turbo` cache
- `dist` folders
- `node_modules` (run `npm install` after)

## 🎯 Turborepo Features

This monorepo uses Turborepo for:

- **Parallel Execution**: Run tasks across multiple packages simultaneously
- **Smart Caching**: Never rebuild the same thing twice
- **Dependency Awareness**: Build packages in the correct order based on dependencies
- **Incremental Builds**: Only rebuild what changed

### Useful Turbo Commands

```bash
# Run a task for all packages
turbo <task>

# Run a task for specific packages
turbo <task> --filter=web

# Run tasks with verbose output
turbo <task> --verbose

# Clear Turborepo cache
turbo clean
```

### Remote Caching
This monorepo is set up to use Turborepo's remote caching feature. This allows build outputs to be shared across different environments (e.g., CI/CD pipelines), speeding up builds significantly.

```bash
npx turbo login

```

## 📚 Tech Stack

### Web App
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Mantine UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Leaflet + MapLibre GL
- **Charts**: D3.js
- **Internationalization**: next-intl