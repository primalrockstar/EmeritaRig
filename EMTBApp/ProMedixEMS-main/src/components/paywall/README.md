# Paywall Implementation Guide

## Quick Start

### 1. Import the Components

```typescript
import LockedFeature from '../components/paywall/LockedFeature';
import { useEntitlement } from '../hooks/useEntitlement';
```

### 2. Wrap Premium Content

```typescript
// Example: Lock advanced flashcards (chapters 5+)
<LockedFeature feature="advanced-flashcards">
  <AdvancedFlashcardsComponent />
</LockedFeature>

// Example: Show preview but require upgrade
<LockedFeature feature="scenarios" showPreview={true}>
  <ScenariosComponent />
</LockedFeature>
```

### 3. Use the Hook for Conditional Rendering

```typescript
const { isPremium, canAccessFeature } = useEntitlement();

// Conditionally render premium UI
{isPremium && <PremiumBadge />}

// Check specific feature access
{canAccessFeature('calculators') ? (
  <CalculatorComponent />
) : (
  <UpgradePrompt />
)}
```

## Free Tier Features

Users without premium can access:
- `chapters-1-4` - First 4 chapters
- `basic-flashcards` - ~200 flashcards
- `basic-calculators` - GCS, APGAR
- `basic-scenarios` - 5 scenarios

## Premium Features (Require Payment)

- All 1,173 flashcards
- All 28 scenarios
- Advanced calculators
- NREMT mock exams
- Full curriculum access

## Example: Gate Flashcards by Chapter

```typescript
const FlashcardsScreen = () => {
  const { canAccessFeature } = useEntitlement();
  const [selectedChapter, setSelectedChapter] = useState(1);

  // Free tier: Chapters 1-4 only
  const isLocked = selectedChapter > 4 && !canAccessFeature('advanced-flashcards');

  if (isLocked) {
    return (
      <LockedFeature feature="advanced-flashcards">
        <FlashcardList chapter={selectedChapter} />
      </LockedFeature>
    );
  }

  return <FlashcardList chapter={selectedChapter} />;
};
```

## Next Steps

1. Add paywall to flashcards (chapters 5+)
2. Add paywall to scenarios (after first 5)
3. Add paywall to advanced calculators
4. Add "Premium" badge to header for paying users
