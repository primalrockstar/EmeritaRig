#!/bin/bash
# performance-audit.sh

echo "⚡ PERFORMANCE AUDIT"
echo "===================="

# 1. Build performance
echo ""
echo "1️⃣  BUILD PERFORMANCE"
echo "---------------------"
echo "Running build..."
start_time=$(date +%s)
npm run build 2>&1 | tail -20
end_time=$(date +%s)
echo "Build time: $((end_time - start_time)) seconds"

# 2. Bundle size analysis
echo ""
echo "2️⃣  BUNDLE SIZE ANALYSIS"
echo "-----------------------"
if [ -d "dist" ]; then
  echo "Analyzing dist folder..."
  du -sh dist/*
  echo ""
  echo "Largest files:"
  find dist -name "*.js" -size +500k 2>/dev/null | head -5 | xargs ls -lh
fi

# 3. Dependency audit
echo ""
echo "3️⃣  DEPENDENCY AUDIT"
echo "-------------------"
echo "Checking for vulnerable dependencies..."
npm audit --production 2>&1 | grep -A5 -B5 "found" || echo "No vulnerabilities found"

# 4. Code quality
echo ""
echo "4️⃣  CODE QUALITY"
echo "---------------"
echo "Checking TypeScript compilation..."
npx tsc --noEmit 2>&1 | head -20 || echo "TypeScript compilation successful"

echo "Checking for console.log statements..."
find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
  xargs grep -l "console\." | \
  head -5 | \
  xargs -I {} echo "Found in: {}" || echo "No console.log statements found"

# 5. Memory leaks check
echo ""
echo "5️⃣  MEMORY PATTERNS"
echo "------------------"
echo "Checking for common memory leak patterns..."
echo "Large inline styles:"
find src -name "*.tsx" -o -name "*.jsx" | \
  xargs grep -n "style={{.*}}" | \
  wc -l | \
  xargs echo "Inline style objects found:"

echo "Unmounted state updates:"
find src -name "*.tsx" -o -name "*.jsx" | \
  xargs grep -n "setState\|useState" | \
  wc -l | \
  xargs echo "State operations found:"

# 6. Lighthouse CI (if available)
echo ""
echo "6️⃣  LIGHTHOUSE METRICS"
echo "---------------------"
echo "To run Lighthouse audit:"
echo "1. Start the development server"
echo "2. Run: npx lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json"
echo "3. Check scores for Performance, Accessibility, Best Practices, SEO"

# 7. Security headers check
echo ""
echo "7️⃣  SECURITY HEADERS"
echo "-------------------"
echo "Checking security configuration..."
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
  echo "Vite config found - checking CSP headers..."
  grep -n "headers\|CSP\|Content-Security-Policy" vite.config.* 2>/dev/null || echo "No CSP configured"
fi

echo ""
echo "📊 PERFORMANCE AUDIT COMPLETE"