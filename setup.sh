#!/bin/bash

echo "🚀 Slack B2B Setup Script"
echo "========================"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local with your Convex and Clerk credentials"
    echo "   • Go to https://dashboard.convex.dev for Convex URL"
    echo "   • Go to https://dashboard.clerk.com for Clerk API keys"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Edit .env.local with your Convex URL and Clerk API keys"
echo "2. Set up your Convex backend: cd slack-b2b-app && npx convex dev"
echo "3. Start the frontend: pnpm dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For more information, see README.md and QUICKSTART.md"