#!/bin/bash
# Quick setup script for authentication fixes

echo "🔐 Binexness Authentication Setup"
echo "=================================="

# Check Node version
echo "Node version: $(node --version)"
echo "PNPM version: $(pnpm --version)"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Create .env.local for production config
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local template..."
    cp .env.local.example .env.local
    echo "✅ .env.local created. Please update with production values."
fi

# Generate NEXTAUTH_SECRET if needed
echo ""
echo "🔑 To generate a secure NEXTAUTH_SECRET, run:"
echo "   openssl rand -base64 32"
echo ""

# Show current environment
echo "📋 Current Environment Configuration:"
echo "=================================="
grep "NEXTAUTH" .env || echo "⚠️  NEXTAUTH configuration not found in .env"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📚 For more details, see AUTH_FIX_SUMMARY.md"
