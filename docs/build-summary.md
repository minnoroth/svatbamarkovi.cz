# Build Summary — Michal & Simona Wedding Website

*Sestaveno 27. března 2026*

---

## Co bylo postaveno

Kompletní jednostránkový svatební web pro Michala a Simonu (29. 8. 2026). Web obsahuje 8 sekcí:

| Sekce | Komponenta | Popis |
|---|---|---|
| Navigace | `Navbar.tsx` | Fixní navbar, průhledný → bílý při scrollu, hamburger menu pro mobil |
| Hero | `Hero.tsx` | Fullscreen s fotkou na pozadí, gradient overlay, florální ornamenty, animovaný vstup |
| Odpočet | `Countdown.tsx` | Živý odpočet do 29. 8. 2026 11:00, 4 karty (dny/hodiny/minuty/sekundy) |
| Harmonogram | `Schedule.tsx` | Vertikální timeline svatebního dne (14 položek, ikony, poznámky), seskupená podle míst (Lomec / Statek) s odkazy na mapu |
| Informace | `GuestInfo.tsx` | Karty s praktickými informacemi pro hosty — mapa a parkování, dary, ubytování, páteční pomocníci, počasí |
| Dresscode | `Dresscode.tsx` | 8 barevných swatchů, popis stylu, seznam barev k vyhnout |
| Fotogalerie | `PhotoCarousel.tsx` | Carousel s šipkami, dots, klávesnicí (←→) a swipe gestem |
| Kontakty | `Contacts.tsx` | Kontakty na svědky pro svatební den — klikatelná `tel:` tlačítka (nahradilo RSVP po uzávěrce) |
| Footer | `Footer.tsx` | Tmavý, zlatý script font, navigační linky |

---

## Proč takto

### Tech Stack
- **Vite 8 + React 19 + TypeScript 5** — nejrychlejší DX, strict mode pro typovou bezpečnost
- **Tailwind CSS v3** — utility-first, vlastní design tokeny (pistachio, blush, cream, gold)
- **Žádné external UI knihovny** — vše psáno ručně, zero bundle bloat

### Architektura
- `src/data/weddingData.ts` — veškerý obsah na jednom místě (harmonogram, místa, informace pro hosty, kontakty, navigace, fotky, barvy swatchů)
- `src/components/icons.tsx` — sdílené inline SVG ikony (harmonogram, informace, telefon, mapa)
- `src/types/index.ts` — sdílené TypeScript typy
- `src/hooks/useCountdown.ts` — standalone hook pro countdown
- `src/hooks/useReveal.ts` — IntersectionObserver pro scroll animace

### Design systém
Implementováno přesně podle `docs/design-system.md` (v1.0):
- Fonty: Cormorant Garamond (serif nadpisy), Pinyon Script (display), Lato (body)
- Paleta: pistachio-{50–800}, blush-{50–600}, cream-{50–200}, brown-900, gold-{300,500}
- Všechny Tailwind tokeny přidány v `tailwind.config.js`

---

## Jak spustit

```bash
# Vývojový server (port 3000)
npm run dev

# Produkční build
npm run build

# Náhled buildu
npm run preview
```

Vývojový server: `http://localhost:3000`

---

## Jak doplnit reálné fotografie

1. Nahraj fotky do `src/assets/` (např. `foto1.jpg`, `foto2.jpg`, ...)
2. Otevři `src/data/weddingData.ts`
3. Uprav pole `PHOTOS`:

```typescript
import foto1 from '../assets/foto1.jpg'
import foto2 from '../assets/foto2.jpg'

export const PHOTOS: Photo[] = [
  { src: foto1, alt: 'Popis fotky', caption: 'Titulek' },
  { src: foto2, alt: 'Popis fotky', caption: 'Titulek' },
  // ...
]
```

4. Hero fotka: v `src/components/Hero.tsx` nahraď `src` atribut `<img>` za importovaný obrázek:
```typescript
import heroBg from '../assets/hero.jpg'
// <img src={heroBg} ... />
```

---

## Jak upravit harmonogram, informace a kontakty

Vše je v `src/data/weddingData.ts`:

- `SCHEDULE` — položky harmonogramu (`time`, `title`, `icon`, `venue`, volitelně `note`). Ikony jsou klíče typu `ScheduleIconName` (`src/types/index.ts`), definované v `src/components/icons.tsx`.
- `VENUES` — dvě místa (Lomec / Libějovice) s adresou a odkazem na mapu; harmonogram se podle nich seskupuje.
- `GUEST_INFO` — karty v sekci Informace (`icon`, `title`, `text`, volitelně `link`).
- `WITNESSES` — kontakty na svědky; telefon v E.164 formátu (`+420…`), zobrazení se formátuje automaticky.
- `NAV_LINKS` — položky navigace sdílené Navbarem i Footerem.

---

## Jak doplnit adresu statku

V `src/data/weddingData.ts` aktualizuj `RECEPTION.address`:

```typescript
export const RECEPTION: EventInfo = {
  // ...
  address: 'Skutečná adresa statku, PSČ Město',
  time: '14:00', // přesný čas oslavy
}
```

---

## Budoucí rozšíření

- **SEO**: doplnit Open Graph meta tagy do `index.html`
- **Mapa**: vložit Google Maps embed do `WeddingInfo.tsx`
- **Animace**: hero fotka jako parallax (IntersectionObserver + translateY)
- **Favicon**: nahradit výchozí Vite favicon za vlastní SVG monogram M&S
- **Analytika**: přidat Umami nebo Plausible (privacy-friendly)
