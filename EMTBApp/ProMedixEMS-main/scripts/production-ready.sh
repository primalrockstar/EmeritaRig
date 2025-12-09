#!/bin/bash
# production-ready.sh

echo "🏁 PRODUCTION READINESS CHECK"
echo "============================="

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✓${NC} $2"
  else
    echo -e "${RED}✗${NC} $2"
  fi
}

echo ""
echo "1️⃣  CODE QUALITY"
echo "---------------"

# TypeScript compilation
echo "Checking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck > /dev/null 2>&1
check $? "TypeScript compiles without errors"

# ESLint
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ]; then
  echo "Running ESLint..."
  npx eslint src --max-warnings=0 > /dev/null 2>&1
  check $? "ESLint passes with no warnings"
fi

# Prettier
if [ -f ".prettierrc" ]; then
  echo "Checking code formatting..."
  npx prettier --check src > /dev/null 2>&1
  check $? "Code is properly formatted"
fi

echo ""
echo "2️⃣  TESTING"
echo "----------"

# Check if tests exist and pass
if [ -f "package.json" ]; then
  if grep -q "\"test\"" package.json; then
    echo "Running tests..."
    npm test -- --passWithNoTests > /dev/null 2>&1
    check $? "Tests pass"
  else
    echo -e "${YELLOW}⚠ No test script found in package.json${NC}"
  fi
fi

echo ""
echo "3️⃣  BUILD & BUNDLE"
echo "-----------------"

# Build the project
echo "Building project..."
npm run build > /dev/null 2>&1
check $? "Project builds successfully"

# Check bundle size
if [ -d "dist" ]; then
  total_size=$(du -sh dist | cut -f1)
  echo -e "${GREEN}✓${NC} Build size: $total_size"

  # Check for large chunks
  large_files=$(find dist -name "*.js" -size +500k 2>/dev/null | wc -l)
  if [ $large_files -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found $large_files JavaScript files >500KB${NC}"
    find dist -name "*.js" -size +500k -exec du -h {} \;
  fi
fi

echo ""
echo "4️⃣  DEPENDENCIES"
echo "---------------"

# Check for vulnerabilities
echo "Checking for vulnerable dependencies..."
npm audit --production --audit-level=high > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓${NC} No high/critical vulnerabilities found"
else
  echo -e "${YELLOW}⚠ Found vulnerabilities. Run 'npm audit' for details${NC}"
fi

# Check for outdated dependencies
echo "Checking for outdated dependencies..."
outdated=$(npm outdated --long 2>/dev/null | wc -l)
if [ $outdated -eq 0 ]; then
  echo -e "${GREEN}✓${NC} All dependencies are up to date"
else
  echo -e "${YELLOW}⚠ $outdated outdated dependencies found${NC}"
fi

echo ""
echo "5️⃣  SECURITY"
echo "-----------"

# Check for exposed secrets
echo "Checking for exposed secrets..."
if grep -r "password\|secret\|key\|token" src --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v "//" | grep -v ".test." | grep -v ".spec." > /dev/null 2>&1; then
  echo -e "${RED}✗${NC} Possible hardcoded secrets found"
else
  echo -e "${GREEN}✓${NC} No hardcoded secrets found"
fi

# Check .env files are gitignored
if [ -f ".gitignore" ]; then
  if grep -q ".env" .gitignore; then
    echo -e "${GREEN}✓${NC} .env files are gitignored"
  else
    echo -e "${RED}✗${NC} .env files not in .gitignore"
  fi
fi

echo ""
echo "6️⃣  CONFIGURATION"
echo "----------------"

# Check for required configuration
required_files=("package.json" "README.md")
missing_files=0
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file exists"
  else
    echo -e "${RED}✗${NC} $file missing"
    missing_files=$((missing_files + 1))
  fi
done

# Check environment configuration
if [ -f ".env.example" ] || [ -f ".env.sample" ]; then
  echo -e "${GREEN}✓${NC} Environment example file exists"
else
  echo -e "${YELLOW}⚠ No environment example file found${NC}"
fi

echo ""
echo "7️⃣  GIT STATUS"
echo "-------------"

if [ -d ".git" ]; then
  # Check for uncommitted changes
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✓${NC} No uncommitted changes"
  else
    echo -e "${YELLOW}⚠ Uncommitted changes detected${NC}"
    git status --short
  fi

  # Check current branch
  current_branch=$(git branch --show-current)
  echo "Current branch: $current_branch"

  if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    echo -e "${YELLOW}⚠ Not on main/master branch${NC}"
  fi
else
  echo -e "${RED}✗${NC} Not a git repository"
fi

echo ""
echo "============================="
echo "🏁 READINESS CHECK COMPLETE"

# Calculate score
total_checks=15  # Adjust based on actual checks
passed_checks=$(grep -c "✓" <(echo "$output"))
score=$((passed_checks * 100 / total_checks))

echo ""
echo "📊 READINESS SCORE: $score%"
if [ $score -ge 90 ]; then
  echo -e "${GREEN}✅ READY FOR PRODUCTION${NC}"
elif [ $score -ge 70 ]; then
  echo -e "${YELLOW}⚠ NEEDS SOME WORK${NC}"
else
  echo -e "${RED}❌ NOT READY${NC}"
fi