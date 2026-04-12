# Design System — Michal & Simona Wedding Website

> **Style:** Rustic meadow elegance — pistachio green, blush pink, cream, natural linen textures
> **Tone:** Timeless, romantic, understated luxury. No kitsch.
> **Date:** 29. srpna 2026 | Lomec u Vodňan → Statek v okolí

---

## 1. Color Palette

### Primary — Pistachio Green

| Token | Hex | Usage |
|---|---|---|
| `pistachio-50` | `#F4F8F2` | Background tints, very subtle fills |
| `pistachio-100` | `#E4EEDF` | Section backgrounds, cards |
| `pistachio-200` | `#C8DCC0` | Borders, dividers |
| `pistachio-400` | `#8DB87E` | Secondary buttons, accents |
| `pistachio-600` | `#5C8A4A` | Primary CTAs, active states |
| `pistachio-800` | `#34522A` | Dark variant, headings on light bg |

### Secondary — Blush Pink

| Token | Hex | Usage |
|---|---|---|
| `blush-50` | `#FDF6F4` | Alternate section backgrounds |
| `blush-100` | `#F9E8E3` | Card backgrounds, soft fills |
| `blush-200` | `#F2CCBF` | Borders, decorative lines |
| `blush-400` | `#E5967E` | Highlights, hover states |
| `blush-600` | `#C96A52` | Accent text, icon fills |

### Neutral

| Token | Hex | Usage |
|---|---|---|
| `cream-50` | `#FDFBF7` | Page background |
| `cream-100` | `#F7F2EA` | Card surfaces |
| `cream-200` | `#EDE5D4` | Borders, subtle separators |
| `taupe-400` | `#A89880` | Supporting text, labels |
| `taupe-600` | `#7A6A58` | Body text secondary |
| `brown-900` | `#2C2018` | Primary body text, headings |

### Accent — Warm Gold

| Token | Hex | Usage |
|---|---|---|
| `gold-300` | `#E8C97A` | Ornamental lines, SVG decorations |
| `gold-500` | `#C9973A` | Icon accents, inline highlights |

### Functional

| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Hero overlays, cards |
| `overlay` | `rgba(44,32,24,0.45)` | Hero image darken overlay |

---

## 2. Typography

### Font Stack

```
Headings (H1–H2):    Cormorant Garamond — Google Fonts
Script / Display:    Pinyon Script — Google Fonts (names, dates, short phrases)
Subheadings (H3–H4): Cormorant Garamond Italic — same family, italic variant
Body text:           Lato — Google Fonts (Regular 400, Light 300)
Labels / Small caps: Lato — uppercase, tracked
```

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Pinyon+Script&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
```

### Type Scale

| Role | Font | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| `display` | Pinyon Script | 5rem | 80px | 400 | 1.1 | 0.01em |
| `h1` | Cormorant Garamond | 3.5rem | 56px | 300 | 1.15 | 0.03em |
| `h2` | Cormorant Garamond | 2.5rem | 40px | 300 | 1.2 | 0.04em |
| `h3` | Cormorant Garamond Italic | 1.75rem | 28px | 400 | 1.3 | 0.02em |
| `h4` | Lato | 0.75rem | 12px | 700 | 1.5 | 0.15em (uppercase) |
| `body-lg` | Lato Light | 1.125rem | 18px | 300 | 1.7 | 0 |
| `body` | Lato | 1rem | 16px | 400 | 1.7 | 0 |
| `caption` | Lato | 0.8125rem | 13px | 400 | 1.5 | 0.05em |
| `label` | Lato | 0.6875rem | 11px | 700 | 1.4 | 0.12em (uppercase) |

---

## 3. Tailwind Configuration

```typescript
// tailwind.config.ts — extend section
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pistachio: {
          50:  '#F4F8F2',
          100: '#E4EEDF',
          200: '#C8DCC0',
          400: '#8DB87E',
          600: '#5C8A4A',
          800: '#34522A',
        },
        blush: {
          50:  '#FDF6F4',
          100: '#F9E8E3',
          200: '#F2CCBF',
          400: '#E5967E',
          600: '#C96A52',
        },
        cream: {
          50:  '#FDFBF7',
          100: '#F7F2EA',
          200: '#EDE5D4',
        },
        taupe: {
          400: '#A89880',
          600: '#7A6A58',
        },
        brown: {
          900: '#2C2018',
        },
        gold: {
          300: '#E8C97A',
          500: '#C9973A',
        },
      },
      fontFamily: {
        display: ['"Pinyon Script"', 'cursive'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['Lato', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem',    { lineHeight: '1.1',  letterSpacing: '0.01em' }],
        'h1':      ['3.5rem',  { lineHeight: '1.15', letterSpacing: '0.03em' }],
        'h2':      ['2.5rem',  { lineHeight: '1.2',  letterSpacing: '0.04em' }],
        'h3':      ['1.75rem', { lineHeight: '1.3',  letterSpacing: '0.02em' }],
        'body-lg': ['1.125rem',{ lineHeight: '1.7'  }],
        'body':    ['1rem',    { lineHeight: '1.7'  }],
        'caption': ['0.8125rem',{ lineHeight: '1.5', letterSpacing: '0.05em' }],
        'label':   ['0.6875rem',{ lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(44,32,24,0.07)',
        'card': '0 2px 12px rgba(44,32,24,0.05), 0 8px 32px rgba(44,32,24,0.06)',
        'elevated': '0 8px 40px rgba(44,32,24,0.12)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease both',
        'fade-in':    'fadeIn 0.5s ease both',
        'count-flip': 'countFlip 0.4s ease both',
        'slide-left': 'slideLeft 0.4s ease both',
        'slide-right':'slideRight 0.4s ease both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        countFlip: {
          '0%':   { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 4. Section-by-Section Layout Specifications

---

### 4.1 Hero Section

**Layout:** Full viewport height (`min-h-screen`), centered flex column, no scroll visible on load.

**Background:**
- Full-bleed photo of the meadow / flowers (use a portrait or landscape of the venue or flowers)
- Overlay: `bg-gradient-to-b from-[rgba(44,32,24,0.5)] via-[rgba(44,32,24,0.3)] to-[rgba(44,32,24,0.55)]`
- Optional: thin grain texture overlay at 3% opacity via `bg-grain`

**Composition (top → bottom, centered):**
```
[gap: 8px]   Small label: "Milí přátelé, zváme vás na náš velký den"
             font-label text-label uppercase tracking-[0.15em] text-cream-200
[gap: 16px]  Script name: "Michal & Simona"
             font-display text-display text-white drop-shadow-lg
[gap: 24px]  Date line: "29. srpna 2026"
             font-serif text-h3 italic text-cream-50 font-light
[gap: 8px]   Gold ornamental divider (SVG — see section 5)
[gap: 24px]  Location: "Kostel Panny Marie Bolestné, Lomec u Vodňan"
             font-sans text-body-lg text-cream-200 font-light
[gap: 48px]  CTA button — scroll down arrow (chevron-down, 28px, text-gold-300, animate-bounce)
```

**Bottom fade:** `bg-gradient-to-b from-transparent to-cream-50` — 120px tall, absolute bottom.

**Responsive mobile:**
- `text-display` → `text-[3rem]` on `sm:` and below
- `text-h3` → `text-[1.25rem]`
- Padding: `px-6`

---

### 4.2 Countdown Timer

**Purpose:** Creates excitement, shows time remaining.

**Container:** `bg-cream-50 py-20 px-4`

**Header:**
```
"Zbývá do svatby"
font-serif text-h2 text-brown-900 font-light text-center mb-12
```

**Cards grid:** `grid grid-cols-4 gap-4 md:gap-6 max-w-lg mx-auto`

**Single countdown card:**
```html
<div class="flex flex-col items-center bg-white rounded-xl shadow-card
            px-5 py-6 border border-cream-200">
  <span class="font-serif text-[3.5rem] leading-none text-pistachio-800
               font-light tabular-nums animate-count-flip">
    {value}
  </span>
  <span class="font-sans text-label uppercase tracking-[0.12em]
               text-taupe-400 mt-2">
    {unit}
  </span>
</div>
```

Unit labels (Czech): `Dnů` / `Hodin` / `Minut` / `Sekund`

**Separator dots between cards:** `text-brown-900 text-[2rem] font-light self-center pb-4` — show only between Days/Hours/Minutes/Seconds, hide on mobile (`hidden sm:flex`).

**After countdown hits zero:** Replace entire section with `"Dnes je ten den! 🌸"` — `font-display text-[3rem] text-pistachio-600 text-center py-20`

---

### 4.3 Informace (Event Details)

**Purpose:** Ceremony and reception details, side by side.

**Container:** `bg-pistachio-50 py-24 px-4`

**Section label (above heading):**
```
"Plán dne"
font-sans text-label uppercase tracking-[0.15em] text-pistachio-600
text-center mb-3
```

**Section heading:**
```
"Jak to bude probíhat"
font-serif text-h2 text-brown-900 font-light text-center mb-16
```

**Two-column layout:** `grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto`

**Event card:**
```html
<div class="bg-white rounded-2xl p-8 shadow-soft border border-cream-200
            flex flex-col gap-5">
  <!-- Icon container -->
  <div class="w-12 h-12 rounded-full bg-pistachio-100 flex items-center
              justify-center">
    <!-- SVG icon: church (ceremony) or house/barn (reception) — 24px, stroke text-pistachio-600 -->
  </div>
  <!-- Label -->
  <p class="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600">
    Obřad / Oslava
  </p>
  <!-- Title -->
  <h3 class="font-serif text-h3 text-brown-900 font-light italic">
    Kostel Panny Marie Bolestné / Statek v okolí
  </h3>
  <!-- Time row -->
  <div class="flex items-center gap-3 text-taupe-600">
    <svg><!-- clock icon, 16px --></svg>
    <span class="font-sans text-body">11:00 / TBD</span>
  </div>
  <!-- Address row -->
  <div class="flex items-start gap-3 text-taupe-600">
    <svg><!-- map pin icon, 16px --></svg>
    <span class="font-sans text-body">Lomec u Vodňan / Adresa statku</span>
  </div>
  <!-- Optional note -->
  <p class="font-sans text-caption text-taupe-400 border-t border-cream-200
            pt-4 mt-1">
    Volitelná poznámka...
  </p>
</div>
```

**Divider between sections:** SVG meadow ornament (see section 5), centered, `py-6`

---

### 4.4 Dresscode

**Container:** `bg-cream-100 py-24 px-4`

**Header (same pattern as other sections):**
```
Label: "Dress code"  →  font-sans text-label uppercase tracking-[0.15em] text-taupe-400
Heading: "Přijďte v barvách louky"  →  font-serif text-h2 text-brown-900 font-light
Subtext: "Oceníme zemité a přírodní tóny. Formální, ale ne přísně."  →
         font-sans text-body-lg text-taupe-600 max-w-md mx-auto text-center mt-4
```

**Color swatches grid:** `flex flex-wrap justify-center gap-4 mt-12 max-w-2xl mx-auto`

**Individual swatch:**
```html
<div class="flex flex-col items-center gap-2">
  <div class="w-16 h-16 rounded-full border-2 border-white shadow-card"
       style="background-color: {hex};">
  </div>
  <span class="font-sans text-label uppercase tracking-[0.1em] text-taupe-600
               text-center">{name}</span>
</div>
```

**Swatch palette to show (8 swatches):**
| Name | Hex |
|---|---|
| Pistáciová | `#8DB87E` |
| Světlá zelená | `#C8DCC0` |
| Šalvěj | `#A8C4A0` |
| Pudrová růžová | `#F2CCBF` |
| Starorůžová | `#E5967E` |
| Krémová | `#EDE5D4` |
| Teplá béžová | `#C8B89A` |
| Taupe | `#A89880` |

**"Prosíme vyhnout se" (avoid) row:**
```
Bílá / Černá / Výrazné vzory
```
Rendered as pills: `bg-cream-200 text-taupe-600 text-caption rounded-full px-4 py-1.5 font-sans`

---

### 4.5 Foto Carousel (Gallery)

**Container:** `bg-white py-24 overflow-hidden`

**Header:**
```
Label:   "Naše foto"
Heading: "Vzpomínky, které nás přivedly sem"
```

**Carousel structure:**
```html
<div class="relative max-w-5xl mx-auto px-4">
  <!-- Track -->
  <div class="overflow-hidden">
    <div class="flex gap-4 transition-transform duration-500 ease-gentle"
         style="transform: translateX(-{index * slideWidth}px)">
      <!-- Cards -->
    </div>
  </div>

  <!-- Prev / Next buttons -->
  <button class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3
                 w-11 h-11 rounded-full bg-white shadow-elevated border border-cream-200
                 flex items-center justify-center text-brown-900
                 hover:bg-pistachio-50 transition-colors duration-200">
    <!-- chevron-left SVG, 20px -->
  </button>
  <button class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 ...">
    <!-- chevron-right SVG, 20px -->
  </button>

  <!-- Dots -->
  <div class="flex justify-center gap-2 mt-8">
    <button class="w-2 h-2 rounded-full bg-pistachio-600 transition-all duration-200
                   [&.active]:w-6 [&.active]:bg-pistachio-800" />
    <!-- inactive: bg-cream-200 -->
  </div>
</div>
```

**Photo card:**
```html
<div class="shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden shadow-card
            border border-cream-200 group">
  <div class="aspect-[3/4] overflow-hidden">
    <img class="w-full h-full object-cover transition-transform duration-700
                group-hover:scale-105" src="..." alt="..." />
  </div>
  <!-- Optional caption bar -->
  <div class="bg-white px-5 py-3 border-t border-cream-100">
    <p class="font-sans text-caption text-taupe-400 italic">Caption text</p>
  </div>
</div>
```

**Cards visible:** 3 on desktop, 1.2 on mobile (show partial next card to hint scroll).

**Keyboard:** Left/Right arrow keys navigate. Drag/swipe on mobile.

---

### 4.6 RSVP Section

**Container:** `bg-pistachio-100 py-24 px-4`
**Inner:** `max-w-lg mx-auto text-center`

**Decoration:** SVG floral ornament above (see section 5), centered, `mb-8`

**Label:** `font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3`
→ `"Potvrďte účast"`

**Heading:** `font-serif text-h1 text-brown-900 font-light mb-6`
→ `"Přijdete?"`

**Body:** `font-sans text-body-lg text-taupe-600 font-light leading-relaxed mb-10 max-w-sm mx-auto`
→ `"Moc bychom vás tam chtěli mít. Prosíme o potvrzení účasti do 31. května 2026."`

**Primary CTA button:**
```html
<a href="/rsvp"
   class="inline-flex items-center gap-3 bg-pistachio-600 text-white
          font-sans text-body font-light tracking-wide
          px-10 py-4 rounded-full shadow-elevated
          hover:bg-pistachio-800 active:scale-[0.98]
          transition-all duration-200 ease-gentle">
  Potvrdit účast
  <svg><!-- arrow-right, 18px --></svg>
</a>
```

**Secondary note:** `font-sans text-caption text-taupe-400 mt-6`
→ `"Budeme vám brzy posílat podrobnosti na email."`

---

### 4.7 Footer

**Container:** `bg-brown-900 py-16 px-4 text-center`

**Script names:** `font-display text-[3rem] text-gold-300 block mb-3`
→ `"Michal & Simona"`

**Date:** `font-serif text-h3 italic text-cream-200 font-light mb-8`
→ `"29. srpna 2026"`

**Thin gold divider:** 80px wide, `border-t border-gold-300 opacity-40 mx-auto mb-8`

**Links row (optional):** `flex justify-center gap-8 mb-8`
```
font-sans text-label uppercase tracking-[0.12em] text-taupe-400
hover:text-cream-200 transition-colors duration-200
```
Items: `Obřad` | `Oslava` | `Dresscode` | `RSVP`

**Copyright:** `font-sans text-caption text-taupe-600`
→ `"S láskou připraveno pro náš velký den ♡"`

---

## 5. Decorative Elements

### 5.1 Ornamental Divider (SVG)

Thin horizontal line with a central floral/leaf motif. Use between major sections and inside cards.

```svg
<!-- Section divider — gold, 200px wide -->
<svg width="200" height="20" viewBox="0 0 200 20" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="80" y2="10" stroke="#E8C97A" stroke-width="0.75" opacity="0.7"/>
  <circle cx="100" cy="10" r="3" fill="#E8C97A" opacity="0.8"/>
  <circle cx="90" cy="10" r="1.5" fill="#E8C97A" opacity="0.5"/>
  <circle cx="110" cy="10" r="1.5" fill="#E8C97A" opacity="0.5"/>
  <line x1="120" y1="10" x2="200" y2="10" stroke="#E8C97A" stroke-width="0.75" opacity="0.7"/>
</svg>
```

**Usage:** Center horizontally. In hero: below date line. Between info/dresscode sections.

### 5.2 Floral Corner Ornament (SVG)

Simple botanical sprig — a curved stem with 3 leaves. Use in top corners of the Hero and RSVP sections.

```svg
<!-- Top-left corner decoration — pistachio, ~120px -->
<svg width="120" height="120" viewBox="0 0 120 120" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M10 110 Q30 60 80 20" stroke="#C8DCC0" stroke-width="1.5"
        stroke-linecap="round" fill="none"/>
  <!-- Leaf 1 -->
  <path d="M80 20 Q95 10 85 30 Q70 25 80 20Z" fill="#C8DCC0" opacity="0.6"/>
  <!-- Leaf 2 -->
  <path d="M55 55 Q70 40 65 65 Q50 60 55 55Z" fill="#C8DCC0" opacity="0.5"/>
  <!-- Leaf 3 -->
  <path d="M35 78 Q48 65 45 85 Q32 82 35 78Z" fill="#C8DCC0" opacity="0.4"/>
</svg>
```

Mirror horizontally (`transform: scaleX(-1)`) for top-right variant.

### 5.3 Thin Border Ornament

On section heading underlines, use:
```html
<div class="w-16 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent
            mx-auto mt-4 mb-12" />
```

### 5.4 Grain Texture Overlay

On Hero and RSVP sections, add a very subtle noise texture via a pseudo-element or a small tiled SVG PNG. Opacity: 3–5%. This adds the handcrafted linen feel.

```html
<!-- Overlay div inside the section, absolute, pointer-events-none -->
<div class="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />
```

### 5.5 CSS Decorative Quote Marks

For any pull quotes:
```css
.dropcap-serif::before {
  content: '"';
  font-family: 'Cormorant Garamond', serif;
  font-size: 4rem;
  line-height: 0;
  vertical-align: -1.5rem;
  color: #E8C97A;
  margin-right: 0.1em;
}
```

---

## 6. Animations & Transitions

### 6.1 Scroll Reveal

Use `IntersectionObserver` to add class `is-visible` when element enters viewport. CSS:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Staggered children:** Add `transition-delay` in increments of `0.1s` for grid items (countdown cards, swatch grid, info cards).

```html
<div class="reveal" style="transition-delay: 0s">...</div>
<div class="reveal" style="transition-delay: 0.1s">...</div>
<div class="reveal" style="transition-delay: 0.2s">...</div>
```

### 6.2 Hero Entrance

On page load (after fonts ready):
1. Logo/names: `animate-fade-in` with `delay-300`
2. Date line: `animate-fade-up` with `delay-500`
3. Location: `animate-fade-up` with `delay-700`
4. CTA arrow: `animate-fade-in` with `delay-900`

### 6.3 Countdown Timer

Every second, when a value changes:
- Remove class → force reflow → re-add `animate-count-flip`
- Duration: `0.4s`

### 6.4 Carousel

```css
.carousel-track {
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

Arrow buttons: `hover:scale-105 active:scale-95 transition-transform duration-150`

### 6.5 Button Hover States

Primary CTA (RSVP):
```
hover:bg-pistachio-800
hover:shadow-elevated
active:scale-[0.98]
transition-all duration-200
```

Nav links / footer links:
```
hover:text-cream-50
transition-colors duration-150
```

### 6.6 Photo Cards

```
group-hover:scale-105 (on <img> inside card)
transition-transform duration-700 ease-gentle
```

---

## 7. Responsiveness

### Breakpoints (Tailwind defaults, reused as-is)

| Name | Min-width | Usage |
|---|---|---|
| `sm` | 640px | Small phones landscape |
| `md` | 768px | Tablets, large phones |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

### Per-Section Mobile Rules

| Section | Desktop | Mobile |
|---|---|---|
| **Hero** | Text centered, `text-display` 5rem | `text-display` → 3rem, padding `px-6` |
| **Countdown** | 4 cards in a row, `gap-6` | 4 cards in a row, `gap-2`, cards `px-3 py-4`, number `text-[2.5rem]` |
| **Info cards** | Side-by-side 2 cols | Single column, full width |
| **Dresscode swatches** | 4 per row | 4 per row (smaller, `w-12 h-12`) |
| **Carousel** | 3 cards visible | 1.2 cards visible (`w-[85vw]`) |
| **RSVP** | Max-width 32rem centered | Full-width px-6 |
| **Footer** | Centered | Centered, smaller type |

### Navigation

- Desktop: fixed top bar, `bg-transparent` → `bg-white/90 backdrop-blur` on scroll
- Mobile: hamburger menu (`☰`) → full-screen overlay `bg-cream-50`
- Nav links: `font-sans text-label uppercase tracking-[0.12em] text-brown-900 hover:text-pistachio-600`
- Sticky height: `h-16` (64px)

### Images

- Hero photo: `object-cover w-full h-full`; use `srcset` for responsive sizes: 800w, 1200w, 1920w
- Gallery cards: `aspect-[3/4]` portrait on desktop; `aspect-[4/3]` landscape on mobile

---

## 8. Component Spacing Rhythm

All sections use a consistent vertical rhythm:

| Context | Value | Class |
|---|---|---|
| Section vertical padding | 6rem (96px) | `py-24` |
| Heading → content gap | 4rem (64px) | `mb-16` |
| Label → heading gap | 0.75rem | `mb-3` |
| Card internal padding | 2rem (32px) | `p-8` |
| Grid gaps | 1.5rem–2rem | `gap-6 md:gap-8` |
| Max content width | 48rem | `max-w-3xl` |
| Narrow text width | 28rem | `max-w-sm` or `max-w-md` |

---

## 9. Quick Reference — Reusable Class Patterns

```
// Section container
"bg-{color} py-24 px-4"

// Section label
"font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 text-center mb-3"

// Section heading
"font-serif text-h2 text-brown-900 font-light text-center mb-16"

// Body paragraph
"font-sans text-body-lg text-taupe-600 font-light leading-relaxed max-w-md mx-auto text-center"

// Card
"bg-white rounded-2xl shadow-card border border-cream-200 p-8"

// Primary button
"inline-flex items-center gap-3 bg-pistachio-600 text-white font-sans text-body font-light
 px-10 py-4 rounded-full shadow-elevated hover:bg-pistachio-800 active:scale-[0.98]
 transition-all duration-200"

// Gold divider
"w-16 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent mx-auto"

// Script name / display text
"font-display text-display text-brown-900"
```

---

*Design system version 1.0 — připraveno pro implementaci*
*Michal & Simona Wedding — 29. 8. 2026*
