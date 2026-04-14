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
    src: '../../public/photos/lavicka.JPG',
    alt: 'V rajské zahradě',
    caption: 'V rajské zahradě',
  },
  {
    src: '../../public/photos/cernobila.JPG',
    alt: 'Jedna svatební..',
    caption: 'Jedna svatební..',
  },
  {
    src: '../../public/photos/zasnuby.jpeg',
    alt: 'První máj',
    caption: 'První máj',
  },
  {
    src: '../../public/photos/duo.jpeg',
    alt: 'Jdeme si pro byt',
    caption: 'Jdeme si pro byt',
  },
  {
    src: '../../public/photos/krumlov.jpeg',
    alt: 'Cyklistická',
    caption: 'Cyklistická',
  },
  {
    src: '../../public/photos/rim.JPG',
    alt: 'Prázdniny v Římě',
    caption: 'Prázdniny v Římě',
  },
  {
    src: '../../public/photos/arco.jpeg',
    alt: 'Castello di Arco',
    caption: 'Castello di Arco',
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
