#!/bin/bash

echo "🚀 Slack B2B Quick Setup"
echo "========================"
echo ""

# 1. Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# 2. Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# 3. Start development server
echo ""
echo "🔧 Starting development server..."
echo ""
echo "📝 IMPORTANT: Make sure you have:"
echo "   1. Set up Convex project and copied the URL to .env.local"
echo "   2. Set up Clerk authentication and copied API keys to .env.local"
echo ""
echo "✨ Server will start when ready..."
echo ""

pnpm dev