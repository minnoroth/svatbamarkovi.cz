import type { EventInfo, Photo, Swatch } from '../types'

export const WEDDING_DATE = new Date('2026-08-29T11:00:00')

export const CEREMONY: EventInfo = {
  label: 'Obřad',
  title: 'Kostel Panny Marie Bolestné',
  time: '11:00',
  address: 'Lomec u Vodňan',
  note: 'Prosíme o příchod nejpozději 30 minut před obřadem.',
  mapUrl: 'https://maps.app.goo.gl/wAHmzi3r4byQiYGP8',
}

export const LUNCH: EventInfo = {
  label: 'Oběd',
  title: 'Svatební hostina',
  time: '13:30',
  address: 'Libějovice',
  note: 'Slavnostní oběd pro rodinu a nejbližší. Ostatní svatebčany prosíme, aby si zařídili oběd po vlastní ose.',
  mapUrl: 'https://maps.app.goo.gl/r721LgLKoTzZrKvP8',
}

export const RECEPTION: EventInfo = {
  label: 'Oslava',
  title: 'Statek Libějovice',
  time: '16:00',
  address: 'Libějovice',
  note: 'Všichni se sejdeme na svatební program, hudbu a raut.',
  mapUrl: 'https://maps.app.goo.gl/r721LgLKoTzZrKvP8',
}

export const PHOTOS: Photo[] = [
  {
    src: 'https://picsum.photos/seed/wedding1/600/800',
    alt: 'Spolu v přírodě',
    caption: 'Naše cestování',
  },
  {
    src: 'https://picsum.photos/seed/wedding2/600/800',
    alt: 'Šťastné chvíle',
    caption: 'Radost ze života',
  },
  {
    src: 'https://picsum.photos/seed/wedding3/600/800',
    alt: 'Procházka v lese',
    caption: 'Naše místo',
  },
  {
    src: 'https://picsum.photos/seed/wedding4/600/800',
    alt: 'Západ slunce',
    caption: 'Zlatá hodinka',
  },
  {
    src: 'https://picsum.photos/seed/wedding5/600/800',
    alt: 'Kvítí na louce',
    caption: 'Naše léto',
  },
]

export const SWATCHES: Swatch[] = [
  { name: 'Pistáciová', hex: '#8DB87E' },
  { name: 'Světlá zelená', hex: '#C8DCC0' },
  { name: 'Šalvěj', hex: '#A8C4A0' },
  { name: 'Pudrová růžová', hex: '#F2CCBF' },
  { name: 'Starorůžová', hex: '#E5967E' },
  { name: 'Krémová', hex: '#EDE5D4' },
  { name: 'Teplá béžová', hex: '#C8B89A' },
  { name: 'Taupe', hex: '#A89880' },
]

export const AVOID_COLORS = ['Bílá', 'Černá', 'Výrazné vzory']
