import type {
  Contact,
  InfoItem,
  NavLink,
  Photo,
  ScheduleItem,
  Swatch,
  Venue,
  VenueId,
} from '../types'

export const WEDDING_DATE = new Date('2026-08-29T11:00:00')

export const MAP_URL = 'https://mapy.com/s/konategono'

export const NAV_LINKS: NavLink[] = [
  { label: 'Harmonogram', href: '#harmonogram' },
  { label: 'Informace', href: '#informace' },
  { label: 'Dresscode', href: '#dresscode' },
  { label: 'Foto', href: '#foto' },
  { label: 'Kontakty', href: '#kontakty' },
]

export const VENUES: Record<VenueId, Venue> = {
  lomec: {
    id: 'lomec',
    name: 'Kostel Jména Panny Marie',
    address: 'Lomec u Vodňan',
    mapUrl: 'https://maps.app.goo.gl/wAHmzi3r4byQiYGP8',
  },
  libejovice: {
    id: 'libejovice',
    name: 'Statek Libějovice',
    address: 'Libějovice',
    mapUrl: 'https://maps.app.goo.gl/r721LgLKoTzZrKvP8',
  },
}

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '10:00',
    title: 'Příjezd hostů',
    icon: 'rings',
    venue: 'lomec',
    note:
      'Dorazte prosím nejpozději mezi 10:00 a 10:30. Parkujte na vyznačeném parkovišti — poutní místo Lomec chceme nechat bez aut.',
  },
  {
    time: '11:00',
    title: 'Svatební obřad',
    icon: 'church',
    venue: 'lomec',
    note: 'Vše zaznamená náš fotograf, prosíme proto zbytečně nekroužit s foťáky kolem novomanželů.',
  },
  { time: '11:40', title: 'Gratulace', icon: 'toast', venue: 'lomec' },
  { time: '12:00', title: 'Společné focení', icon: 'camera', venue: 'lomec' },
  {
    time: '12:30',
    title: 'Coffee break',
    icon: 'coffee',
    venue: 'lomec',
    note: 'Krátké pozastavení na kávu a občerstvení.',
  },
  {
    time: '13:15',
    title: 'Přesun do Libějovic',
    icon: 'bus',
    venue: 'libejovice',
    note:
      'Ubytovaní na Lomci: naskládejte se prosím do co nejmenšího počtu aut, parkoviště v Libějovicích není nafukovací. Odvoz zpět na Lomec máme zajištěný.',
  },
  {
    time: '13:45',
    title: 'Oběd',
    icon: 'dinner',
    venue: 'libejovice',
    note: 'Pro rodinu a nejbližší s kartičkou ve svatebním oznámení. Ostatní prosíme o oběd po vlastní ose.',
  },
  {
    time: '15:00',
    title: 'Příjezd ostatních hostů',
    icon: 'barn',
    venue: 'libejovice',
    note: 'Začíná společný program, odpolední raut, hudba, tanec a zábava.',
  },
  { time: '16:00', title: 'Krájení dortu', icon: 'cake', venue: 'libejovice' },
  { time: '17:30', title: 'Večerní raut', icon: 'buffet', venue: 'libejovice' },
  { time: '18:30', title: 'Společná hra', icon: 'party', venue: 'libejovice' },
  { time: '19:30', title: 'Focení – warmup na kapelu', icon: 'camera', venue: 'libejovice' },
  { time: '20:00', title: 'Kapela – začátek', icon: 'music', venue: 'libejovice' },
  { time: '20:15', title: 'První tanec s prskavkami', icon: 'sparkler', venue: 'libejovice' },
]

export const GUEST_INFO: InfoItem[] = [
  {
    icon: 'map',
    title: 'Mapa a parkování',
    text: 'Všechna důležitá místa najdete na jedné mapě. Na Lomci parkujte prosím jen na vyznačeném parkovišti — poutní místo chceme nechat bez aut. Dopravu z Libějovic zpět na Lomec pro ubytované zajistíme.',
    link: { label: 'Otevřít mapu', href: MAP_URL },
  },
  {
    icon: 'gift',
    title: 'Dary',
    text: 'Největším darem je pro nás vaše přítomnost. Pokud nás chcete obdarovat i něčím dalším, nejvíc nás potěší dar, který se vejde do obálky. Místo pro dary bude připravené na Statku Libějovice.',
  },
  {
    icon: 'bed',
    title: 'Ubytování na Lomci',
    text: 'Kdo vyplnil dotazník pro ubytování na Lomci, dorazí přímo tam. Zazvoňte na zvonek u branky k farnímu domu a budete odvedeni na pokoj.',
  },
  {
    icon: 'tent',
    title: 'Spaní na Statku',
    text: 'Vezměte si pro jistotu vlastní spacák a karimatku. Místa je dost, postelí omezeně — může vyjít gauč nebo karimatka. Spát můžete i ve stanu na označených místech na zahradě, pod pergolou nebo ve svém autě či karavanu.',
  },
  {
    icon: 'grill',
    title: 'Páteční pomocníci',
    text: 'Kdo přijede pomáhat už v pátek, má k večeři připravený gril i jídlo na něj. Pokud chcete něco speciálního, vezměte si to s sebou.',
  },
  {
    icon: 'umbrella',
    title: 'Počasí',
    text: 'Sledujte prosím předpověď. Pokud by se nevydařilo, buďte připraveni a vezměte si s sebou deštníky.',
  },
]

export const WITNESSES: Contact[] = [
  { name: 'Matěj Vilímek', role: 'Svědek', phone: '+420730570565' },
  { name: 'Majda Neuberová', role: 'Svědkyně', phone: '+420739101283' },
]

export const PHOTOS: Photo[] = [
  {
    src: '/photos/lavicka.JPG',
    alt: 'V rajské zahradě',
    caption: 'V rajské zahradě',
  },
  {
    src: '/photos/cernobila.JPG',
    alt: 'Jedna svatební..',
    caption: 'Jedna svatební..',
  },
  {
    src: '/photos/zasnuby.jpeg',
    alt: 'První máj',
    caption: 'První máj',
  },
  {
    src: '/photos/duo.jpeg',
    alt: 'Jdeme si pro byt',
    caption: 'Jdeme si pro byt',
  },
  {
    src: '/photos/krumlov.jpeg',
    alt: 'Cyklistická',
    caption: 'Cyklistická',
  },
  {
    src: '/photos/rim.JPG',
    alt: 'Prázdniny v Římě',
    caption: 'Prázdniny v Římě',
  },
  {
    src: '/photos/arco.jpeg',
    alt: 'Castello di Arco',
    caption: 'Castello di Arco',
  },
]

export const SWATCHES: Swatch[] = [
  { name: 'Pistáciová', hex: '#8DB87E' },
  { name: 'Šalvěj', hex: '#A8C4A0' },
  { name: 'Levandule', hex: '#B8A5D4' },
  { name: 'Kosatec', hex: '#6B5BA8' },
  { name: 'Pomněnka', hex: '#A8BFDC' },
  { name: 'Pudrová růžová', hex: '#F2CCBF' },
  { name: 'Starorůžová', hex: '#E5967E' },
  { name: 'Měsíček', hex: '#C97A4A' },
  { name: 'Pampeliška', hex: '#D4B85A' },
  { name: 'Krémová', hex: '#EDE5D4' },
  { name: 'Teplá béžová', hex: '#C8B89A' },
]

export const AVOID_COLORS = ['Bílá', 'Černá', 'Výrazné vzory']
