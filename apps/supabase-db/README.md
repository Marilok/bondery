# Bondery Supabase

Local Supabase development setup for Bondery. This directory contains database migrations, seed data, and edge functions.

## Overview

This app manages:
- **Migrations** - Database schema changes
- **Seed data** - Initial test data
- **Edge Functions** - Serverless functions
- **RLS Policies** - Row-level security configuration

## Getting Started

### Prerequisites
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Docker (required for local Supabase)

### Setup

```bash
# Start local Supabase instance
npm start

# Reset database to initial state
npm run reset

# Generate TypeScript types for database
npm run gen-types
```

### Development

```bash
# Create a new migration
npm run migration:new <migration_name>

# Apply migrations
npm run reset

# Seed database with test data
npm run db:seed
```

## Project Structure

```
migrations/          # Database migration files
functions/          # Supabase Edge Functions
seed.sql            # Seed data for local development
.env.local          # Local environment variables (not committed)
```

## Environment Variables

```bash
# Copy from .env.example and fill in your values
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGc... (from local instance)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (from local instance)
```

## Database Schema

The database schema is managed through migrations in the `migrations/` directory.

## Security

All tables have Row-Level Security (RLS) enabled. Policies are defined in migrations to ensure:
- Users can only access their own data
- Anonymous access is restricted
- Service role has full access for server operations

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Local Development Guide](https://supabase.com/docs/guides/local-development)
