# Bondery Website

Public marketing website for Bondery - the personal relationship manager.

## Overview

This is the landing page and marketing site that runs at **usebondery.com**.

## Features

- Landing page with hero, features, pricing, and CTA sections
- Contact/team page
- SEO optimized with proper meta tags
- Internationalization support (EN/CS)
- Links to webapp at app.usebondery.com

## Development

```bash
# Run development server on port 3002
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```bash
# URL of the webapp (for login/app links)
NEXT_PUBLIC_WEBAPP_URL=https://app.usebondery.com
```

## Routes

- `/` - Home page (landing)
- `/contact` - Team/contact page
- `/status` - Redirects to status page
- `/login` - Redirects to webapp login
- `/app/*` - Redirects to webapp
