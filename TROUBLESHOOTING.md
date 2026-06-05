# 🔧 Troubleshooting & Setup Guide

## Issues Encountered & Solutions

### 1. "Module not found: Can't resolve '@/convex/_generated/api'"
**Problem**: The Convex generated API types are missing.

**Solution**: The Convex package needs to be installed in both directories:
```bash
# Root directory
pnpm add convex

# Backend directory
cd slack-b2b-app
pnpm add convex
cd ..
```

### 2. "Export useQueryClient doesn't exist in target module"
**Problem**: The `useQueryClient` function is not available in this version of Convex.

**Solution**: Removed from components. The app now uses direct mutation calls without query client invalidation.

### 3. "the name 'Home' is defined multiple times"
**Problem**: Turbopack caching issue or duplicate function definition.

**Solution**: Run the following to clear cache:
```bash
rm -rf .next
pnpm dev
```

### 4. Authentication/Convex Connection Errors
**Problem**: Missing or incorrect environment variables.

**Solution**: Ensure .env.local has correct values:
```bash
# Create or update .env.local
cp .env.local.example .env.local

# Edit .env.local with your real credentials:
# - NEXT_PUBLIC_CONVEX_URL: https://<project-id>.convex.cloud
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: pk_test_...
# - CLERK_SECRET_KEY: sk_test_...
```

## Complete Setup Steps

### Step 1: Install All Dependencies
```bash
# From the project root
pnpm install

# Also in the backend directory
cd slack-b2b-app
pnpm install
cd ..
```

### Step 2: Configure Environment Variables
```bash
# Copy the template
cp .env.local.example .env.local

# Edit .env.local with your credentials:
```

### Step 3: Start the Application
```bash
pnpm dev
```

## Setting Up Convex

1. Go to https://dashboard.convex.dev
2. Sign up or login
3. Create a new project
4. Deploy the backend:
   ```bash
   cd slack-b2b-app
   npx convex dev
   ```
5. Copy the deployment URL from the terminal (starts with `https://`)
6. Update `.env.local` with this URL:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://<your-project-id>.convex.cloud
   ```

## Setting Up Clerk

1. Go to https://dashboard.clerk.com
2. Sign up or login
3. Create a new application
4. Configure your domain (use localhost for development)
5. Copy your API keys:
   - **Publishable Key**: Copy the public key starting with `pk_test_`
   - **Secret Key**: Copy the secret key starting with `sk_test_`
6. Update `.env.local` with these keys

## Running the Application

Once configured:
```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Quick Fix Script

If you want to fix the setup issues automatically:

```bash
chmod +x setup.sh
./setup.sh
```

## Common Issues and Fixes

### Issue: Convex connection fails
**Fix**: 
- Verify `NEXT_PUBLIC_CONVEX_URL` is set correctly
- Check that Convex deployment is active
- Ensure no firewall blocking the connection

### Issue: Clerk authentication fails  
**Fix**:
- Verify API keys are correct
- Check Clerk dashboard for configuration
- Ensure CORS settings are correct for localhost

### Issue: Build errors
**Fix**:
```bash
# Clear Next.js cache
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Issue: TypeScript errors
**Fix**:
```bash
# Install missing types
pnpm add -D @types/react@^19 @types/react-dom@^19
```

## Current Project Status

✅ **Backend**: Complete Convex schema and functions  
✅ **Frontend**: Complete Next.js components and UI  
⚠️ **Configuration**: Need to add Convex URL and Clerk keys  
✅ **Ready**: After configuration, the app will work  

## Next Steps

1. **Set up Convex backend** (5 minutes)
2. **Set up Clerk authentication** (5 minutes)  
3. **Update .env.local** with your credentials
4. **Run `pnpm dev`** and start using the app

Once configured, you'll have a fully functional Slack B2B application with:
- Team management
- Channel management
- Real-time messaging
- User authentication
- Modern, responsive UI

## Need Help?

If you still encounter issues:

1. Check the Convex documentation: https://docs.convex.dev
2. Check the Clerk documentation: https://clerk.com/docs
3. Check the Next.js documentation: https://nextjs.org/docs
4. Verify your environment variables are set correctly:
   ```bash
   cat .env.local
   ```