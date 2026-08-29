export interface Photo {
  src: string
  alt: string
  caption: string
}

export interface Swatch {
  name: string
  hex: string
}

export interface NavLink {
  label: string
  href: string
  /** Opens in a new tab (external URL). */
  external?: boolean
}

export type VenueId = 'lomec' | 'libejovice'

export interface Venue {
  id: VenueId
  name: string
  address: string
  mapUrl: string
}

export type ScheduleIconName =
  | 'rings'
  | 'church'
  | 'toast'
  | 'camera'
  | 'coffee'
  | 'bus'
  | 'dinner'
  | 'barn'
  | 'cake'
  | 'buffet'
  | 'party'
  | 'music'
  | 'sparkler'

export interface ScheduleItem {
  time: string
  title: string
  icon: ScheduleIconName
  venue: VenueId
  note?: string
}

export type InfoIconName = 'map' | 'gift' | 'bed' | 'tent' | 'grill' | 'umbrella'

export interface InfoItem {
  icon: InfoIconName
  title: string
  text: string
  link?: NavLink
}

export interface Contact {
  name: string
  role: string
  /** E.164 format (+420XXXXXXXXX) — used for the tel: link, formatted for display in the UI. */
  phone: string
}
