export interface Photo {
  src: string
  alt: string
  caption: string
}

export interface EventInfo {
  label: string
  title: string
  time: string
  address: string
  note: string
  mapUrl?: string
}

export interface Swatch {
  name: string
  hex: string
}
