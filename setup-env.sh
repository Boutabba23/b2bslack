#!/bin/bash

echo "🔧 Setting up Slack B2B environment..."
echo "===================================="
echo ""

# Create .env.local with proper setup
cat > .env.local << 'EOF'
# Convex URL - Set this to your Convex deployment URL
# Get it from: https://dashboard.convex.dev
NEXT_PUBLIC_CONVEX_URL=https://your-project-id.convex.cloud

# Clerk Keys - Set these to your Clerk API keys
# Get them from: https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_1234567890abcdef
CLERK_SECRET_KEY=sk_test_1234567890abcdef
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
EOF

echo "✅ .env.local created with templates"
echo ""
echo "⚠️  IMPORTANT: You MUST update the values above with your actual credentials:"
echo ""
echo "For Convex:"
echo "  1. Go to https://dashboard.convex.dev"
echo "  2. Create a new project"
echo "  3. Copy the deployment URL (starts with https://)"
echo "  4. Update NEXT_PUBLIC_CONVEX_URL in .env.local"
echo ""
echo "For Clerk:"
echo "  1. Go to https://dashboard.clerk.com"
echo "  2. Create a new application"
echo "  3. Copy your Publishable Key and Secret Key"
echo "  4. Update the corresponding values in .env.local"
echo ""
echo "🔧 After updating .env.local, run: pnpm dev"