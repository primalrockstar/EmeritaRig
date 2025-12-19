#!/bin/bash
# Run this from your project root: /Users/macbook/Desktop/WEBPLATFORMS

echo "🚀 COMPLETE PLATFORM AUDIT STARTING..."
echo "Timestamp: $(date)"
echo "Project Root: $(pwd)"

echo ""
echo "📁 1. PROJECT STRUCTURE ANALYSIS"
echo "================================="

# Get high-level structure
echo "🔍 Top-level directories:"
ls -la

echo ""
echo "📦 2. PACKAGE.JSON AUDIT"
echo "================================="
if [ -f "package.json" ]; then
  echo "✅ package.json found"
  echo "Package name: $(jq -r '.name' package.json 2>/dev/null || echo 'N/A')"
  echo "Version: $(jq -r '.version' package.json 2>/dev/null || echo 'N/A')"
  echo "Dependencies count: $(jq -r '.dependencies | length' package.json 2>/dev/null || echo '0')"
  echo "DevDependencies count: $(jq -r '.devDependencies | length' package.json 2>/dev/null || echo '0')"
else
  echo "❌ No package.json found"
fi

echo ""
echo "📝 3. SOURCE CODE INVENTORY"
echo "================================="

# Count files by type
echo "🔢 File type breakdown:"
find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v ".git" | wc -l | xargs echo "Total JS/TS files:"
find . -name "*.ts" | grep -v node_modules | wc -l | xargs echo "TypeScript files:"
find . -name "*.tsx" | grep -v node_modules | wc -l | xargs echo "TypeScript React files:"
find . -name "*.js" | grep -v node_modules | wc -l | xargs echo "JavaScript files:"
find . -name "*.jsx" | grep -v node_modules | wc -l | xargs echo "JSX files:"
find . -name "*.css" -o -name "*.scss" -o -name "*.sass" | grep -v node_modules | wc -l | xargs echo "Style files:"
find . -name "*.md" | grep -v node_modules | wc -l | xargs echo "Markdown files:"
find . -name "*.json" | grep -v node_modules | grep -v package-lock.json | wc -l | xargs echo "JSON files:"

echo ""
echo "📊 4. COMPONENT INVENTORY"
echo "================================="

# Count React components
echo "🧩 React Components found:"
find ./src -name "*.tsx" -o -name "*.jsx" | xargs grep -l "export default function\|export default class\|export const.*: React.FC" | wc -l | xargs echo "React components (approx):"

# List major components
echo ""
echo "Major component directories:"
find ./src -type d -name "components" -o -name "features" -o -name "pages" | head -10

echo ""
echo "🔧 5. BUILD CONFIGURATION"
echo "================================="

# Check build tools
for file in "vite.config.ts" "vite.config.js" "webpack.config.js" "next.config.js" "craco.config.js"; do
  if [ -f "$file" ]; then
    echo "✅ Found build config: $file"
  fi
done

echo ""
echo "🌐 6. ROUTING STRUCTURE"
echo "================================="

# Find routing configuration
find ./src -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "react-router\|Router\|Routes\|Route" | head -5

echo ""
echo "📚 7. DATA STRUCTURE"
echo "================================="

# Check for data files
echo "Data directories:"
find ./src -type d -name "data" -o -name "constants" -o -name "types" | head -10

echo ""
echo "📦 8. EXTERNAL DEPENDENCIES"
echo "================================="
if [ -f "package.json" ]; then
  echo "Top 10 dependencies:"
  jq -r '.dependencies | keys[]' package.json 2>/dev/null | head -10
fi

echo ""
echo "🔒 9. SECURITY FILES CHECK"
echo "================================="

# Check for security/config files
for file in ".env" ".env.local" ".env.production" ".gitignore" ".eslintrc" ".prettierrc"; do
  if [ -f "$file" ]; then
    echo "✅ Found: $file"
  fi
done

echo ""
echo "🔄 10. GIT STATUS"
echo "================================="

if [ -d ".git" ]; then
  echo "Git repository detected"
  echo "Current branch: $(git branch --show-current 2>/dev/null || echo 'N/A')"
  echo "Uncommitted changes: $(git status --porcelain | wc -l)"
else
  echo "⚠️  Not a git repository"
fi

echo ""
echo "================================="
echo "📋 AUDIT COMPLETE"