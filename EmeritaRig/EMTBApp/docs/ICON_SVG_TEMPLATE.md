# ProMedix EMS App Icon - SVG Template

This file provides the exact SVG code for the ProMedix EMS app icon that can be used to generate all required sizes.

## Master Icon SVG Code

```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient Definitions -->
  <defs>
    <!-- Main Background Gradient -->
    <radialGradient id="backgroundGradient" cx="0.3" cy="0.3" r="0.8">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </radialGradient>
    
    <!-- Highlight Gradient -->
    <radialGradient id="highlightGradient" cx="0.2" cy="0.2" r="0.4">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:0" />
    </radialGradient>
    
    <!-- Text Shadow Filter -->
    <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>
  
  <!-- Main Background Circle -->
  <circle cx="512" cy="512" r="462" fill="url(#backgroundGradient)" />
  
  <!-- Highlight Overlay -->
  <circle cx="512" cy="512" r="462" fill="url(#highlightGradient)" />
  
  <!-- Star of Life Background -->
  <g transform="translate(512,512)">
    <!-- Six-pointed star path -->
    <path d="M 0,-200 L 58,-100 L 173,-100 L 87,-20 L 115,80 L 0,20 L -115,80 L -87,-20 L -173,-100 L -58,-100 Z" 
          fill="white" 
          stroke="none" 
          opacity="0.95"/>
  </g>
  
  <!-- Rod of Asclepius -->
  <g transform="translate(512,512)">
    <!-- Central Staff -->
    <rect x="-6" y="-160" width="12" height="320" fill="white" rx="6"/>
    
    <!-- Snake Coils -->
    <path d="M -6,-140 Q -40,-120 -6,-100 Q 40,-80 -6,-60 Q -40,-40 -6,-20 Q 40,0 -6,20 Q -40,40 -6,60 Q 40,80 -6,100 Q -40,120 -6,140" 
          stroke="white" 
          stroke-width="8" 
          fill="none" 
          stroke-linecap="round"/>
    
    <!-- Snake Head -->
    <circle cx="-6" cy="-140" r="12" fill="white"/>
    <circle cx="-12" cy="-145" r="2" fill="#1e40af"/>
    <circle cx="0" cy="-145" r="2" fill="#1e40af"/>
  </g>
  
  <!-- Medical Cross Accent -->
  <g transform="translate(650,374)">
    <!-- Cross Background Circle -->
    <circle cx="0" cy="0" r="42" fill="white" opacity="0.9"/>
    
    <!-- Red Cross -->
    <rect x="-30" y="-8" width="60" height="16" fill="#dc2626" rx="8"/>
    <rect x="-8" y="-30" width="16" height="60" fill="#dc2626" rx="8"/>
  </g>
  
  <!-- EMS Text -->
  <text x="512" y="720" 
        font-family="Helvetica, Arial, sans-serif" 
        font-size="120" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="white" 
        filter="url(#textShadow)"
        letter-spacing="2px">EMS</text>
</svg>
```

## Simplified Icon SVG (For Small Sizes)

```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGradient" cx="0.3" cy="0.3" r="0.8">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <circle cx="512" cy="512" r="462" fill="url(#bgGradient)" />
  
  <!-- Simplified Star of Life -->
  <g transform="translate(512,512)">
    <path d="M 0,-180 L 52,-90 L 156,-90 L 78,-18 L 104,72 L 0,18 L -104,72 L -78,-18 L -156,-90 L -52,-90 Z" 
          fill="white" 
          stroke="none"/>
  </g>
  
  <!-- Simple Rod -->
  <g transform="translate(512,512)">
    <rect x="-8" y="-140" width="16" height="280" fill="#1e40af" rx="8"/>
    <path d="M -8,-120 Q -35,-100 -8,-80 Q 35,-60 -8,-40 Q -35,-20 -8,0 Q 35,20 -8,40 Q -35,60 -8,80 Q 35,100 -8,120" 
          stroke="#1e40af" 
          stroke-width="12" 
          fill="none" 
          stroke-linecap="round"/>
  </g>
</svg>
```

## Android Adaptive Icon Components

### Foreground Layer (Safe Zone Content)
```svg
<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <!-- Star of Life for Foreground -->
  <g transform="translate(96,96)">
    <path d="M 0,-48 L 14,-24 L 39,-24 L 21,-5 L 26,18 L 0,5 L -26,18 L -21,-5 L -39,-24 L -14,-24 Z" 
          fill="white" 
          stroke="none"/>
    
    <!-- Simple Rod -->
    <rect x="-2" y="-36" width="4" height="72" fill="#1e40af" rx="2"/>
    <path d="M -2,-30 Q -9,-24 -2,-18 Q 9,-12 -2,-6 Q -9,0 -2,6 Q 9,12 -2,18 Q -9,24 -2,30" 
          stroke="#1e40af" 
          stroke-width="3" 
          fill="none" 
          stroke-linecap="round"/>
  </g>
</svg>
```

### Background Layer (Full Bleed)
```svg
<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="adaptiveBg" cx="0.3" cy="0.3" r="0.8">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </radialGradient>
  </defs>
  
  <!-- Full background for adaptive icon -->
  <rect width="192" height="192" fill="url(#adaptiveBg)" />
  
  <!-- Subtle pattern overlay -->
  <circle cx="96" cy="96" r="80" fill="rgba(255,255,255,0.1)" />
</svg>
```

## Usage Instructions

### 1. Generate All Sizes from Master SVG
```bash
# Using imagemagick or similar tool
convert master-icon.svg -resize 1024x1024 AppIcon-1024.png
convert master-icon.svg -resize 180x180 AppIcon-180.png
convert master-icon.svg -resize 120x120 AppIcon-120.png
# ... continue for all required sizes
```

### 2. Create Simplified Versions for Small Sizes
For icons smaller than 76×76px, use the simplified SVG version:
```bash
convert simplified-icon.svg -resize 58x58 AppIcon-58.png
convert simplified-icon.svg -resize 29x29 AppIcon-29.png
```

### 3. Android Adaptive Icon Setup
Place the foreground and background SVGs in appropriate drawable folders:
```
res/drawable/ic_launcher_foreground.xml
res/drawable/ic_launcher_background.xml
```

## Color Specifications

### Hex Values
```
Medical Blue (Primary): #1e40af
Light Blue (Gradient): #3b82f6
Emergency Red (Accent): #dc2626
Pure White (Symbol): #ffffff
Shadow Black: rgba(0,0,0,0.5)
```

### Design Rationale

**Star of Life**: 
- Official emergency medical services symbol
- Six-pointed star representing emergency medical care
- Internationally recognized by healthcare professionals

**Rod of Asclepius**: 
- Authentic medical symbol (single snake, no wings)
- Represents medicine and healing
- Appropriate for medical education applications

**Color Psychology**:
- Blue: Trust, professionalism, medical reliability
- White: Cleanliness, clarity, medical precision
- Red: Emergency care, medical attention, urgency

**Typography**:
- Bold, clean sans-serif for "EMS"
- High contrast for readability
- Professional medical appearance

This SVG template provides pixel-perfect, scalable icons that maintain medical authenticity and professional appearance across all required sizes for both iOS and Android platforms.