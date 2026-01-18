# @bondery/types

Shared TypeScript types for the Bondery monorepo.

## Installation

This package is automatically available in all workspace packages.

## Usage

```typescript
import { Contact, UserSettings, ApiErrorResponse } from "@bondery/types";
import { Database, Tables } from "@bondery/types/database";
```

## Contents

### Domain Types

- **Contact** - Person/contact entity with all fields
- **UserSettings** - User preferences and settings
- **AuthUser** - Authenticated user information

### API Types

- **ApiErrorResponse** - Standard error response format
- **ApiSuccessResponse** - Standard success response format
- **PhotoUploadResponse** - Photo upload endpoint response
- **RedirectRequest/Response** - Browser extension integration types

### Database Types

- **Database** - Full Supabase database schema
- **Tables** - Type helper for table rows
- **TablesInsert** - Type helper for insert operations
- **TablesUpdate** - Type helper for update operations

### Configuration Types

- **InputMaxLengths** - Form field validation config
- **AvatarUploadConfig** - File upload configuration
- **IntegrationProvider** - OAuth provider config
- **SocialMediaPlatform** - Social platform enum
