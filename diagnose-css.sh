#!/bin/bash
# CSS/Styling Issue Diagnostic Script
# Run this to verify CSS fixes

echo "🎨 CSS & Tailwind Diagnostic"
echo "=============================="
echo ""

# Check Node version
echo "📋 Environment:"
node --version
pnpm --version
echo ""

# Check for required files
echo "✅ Checking required files..."
files=(
  "src/app/globals.css"
  "tailwind.config.js"
  "postcss.config.js"
  "next.config.js"
  "src/components/layout.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file missing!"
  fi
done

echo ""
echo "📝 Checking globals.css content..."
if grep -q "@import \"tailwindcss/base\"" src/app/globals.css; then
  echo "✓ Has @import tailwindcss/base"
else
  echo "✗ Missing @import tailwindcss/base"
fi

if grep -q "@import \"tailwindcss/components\"" src/app/globals.css; then
  echo "✓ Has @import tailwindcss/components"
else
  echo "✗ Missing @import tailwindcss/components"
fi

if grep -q "@import \"tailwindcss/utilities\"" src/app/globals.css; then
  echo "✓ Has @import tailwindcss/utilities"
else
  echo "✗ Missing @import tailwindcss/utilities"
fi

echo ""
echo "🔍 Checking next.config.js..."
if grep -q "async rewrites" next.config.js; then
  echo "⚠️ Warning: Rewrite rule still active (should be commented out)"
else
  echo "✓ Rewrite rule disabled"
fi

echo ""
echo "🎯 Checking tailwind.config.js..."
if grep -q "public/" tailwind.config.js; then
  echo "✓ Config includes public/ directory"
else
  echo "⚠️ Warning: public/ missing from content array"
fi

echo ""
echo "🧠 Checking layout wrapper..."
if grep -q "SessionProvider" src/components/layout.tsx; then
  echo "✓ SessionProvider present"
else
  echo "✗ SessionProvider missing"
fi

if grep -q "useEffect" src/components/layout.tsx; then
  echo "✓ CSS recalc effect present"
else
  echo "⚠️ Warning: CSS recalc effect missing"
fi

echo ""
echo "🧹 Cleaning cache..."
rm -rf .next/
echo "✓ .next/ cleared"

echo ""
echo "📦 Checking node_modules..."
if [ ! -d "node_modules" ]; then
  echo "⚠️ node_modules missing, running pnpm install..."
  pnpm install
else
  echo "✓ node_modules present"
fi

echo ""
echo "================================"
echo "✨ Diagnostic complete!"
echo ""
echo "Next steps:"
echo "1. Run: pnpm dev"
echo "2. Visit: http://localhost:3000/login"
echo "3. Navigate between pages"
echo "4. Verify styles load instantly (no flashing)"
echo ""
echo "If issues persist, check CSS_STYLING_FIX.md"
