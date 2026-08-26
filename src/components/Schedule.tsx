import { MAP_URL, SCHEDULE, VENUES } from '../data/weddingData'
import type { ScheduleItem, Venue, VenueId } from '../types'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'
import { MapPinIcon, ScheduleIcon } from './icons'

const VENUE_ORDER: VenueId[] = ['lomec', 'libejovice']

interface VenueHeaderProps {
  venue: Venue
}

function VenueHeader({ venue }: VenueHeaderProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal relative flex items-center gap-4 sm:gap-6 pb-4">
      <div className="relative z-10 w-14 sm:w-16 shrink-0 flex justify-center">
        <span className="w-3.5 h-3.5 rounded-full bg-gold-300 ring-4 ring-pistachio-50" />
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-h3 text-brown-900 font-light italic leading-tight">
          {venue.name}
        </h3>
        <a
          href={venue.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-caption text-taupe-600 hover:text-pistachio-600 transition-colors duration-150 mt-1"
        >
          <MapPinIcon size={14} />
          {venue.address} · mapa
        </a>
      </div>
    </div>
  )
}

interface ScheduleRowProps {
  item: ScheduleItem
  index: number
}

function ScheduleRow({ item, index }: ScheduleRowProps) {
  const ref = useReveal<HTMLLIElement>()
  return (
    <li
      ref={ref}
      className="reveal relative flex gap-4 sm:gap-6 py-3"
      style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}
    >
      <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-white border border-cream-200 shadow-soft flex items-center justify-center text-pistachio-600">
        <ScheduleIcon name={item.icon} size={26} />
      </div>
      <div className="min-w-0 flex-1 pt-2 sm:pt-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5">
          <span className="font-serif text-[1.75rem] sm:text-[2rem] leading-none text-brown-900 font-light tabular-nums">
            {item.time}
          </span>
          <h4 className="font-sans text-caption sm:text-[0.9375rem] uppercase tracking-[0.15em] text-brown-900">
            {item.title}
          </h4>
        </div>
        {item.note && (
          <p className="font-sans text-caption text-taupe-600 mt-2 max-w-md">{item.note}</p>
        )}
      </div>
    </li>
  )
}

export default function Schedule() {
  const headingRef = useReveal<HTMLDivElement>()
  const ctaRef = useReveal<HTMLDivElement>()

  const groups = VENUE_ORDER.map((id) => ({
    venue: VENUES[id],
    items: SCHEDULE.filter((item) => item.venue === id),
  }))

  return (
    <section id="harmonogram" className="bg-pistachio-50 py-24 px-4">
      <div ref={headingRef} className="reveal text-center mb-16">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Svatební den
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">Harmonogram</h2>
        <OrnamentalDivider className="mt-6 mb-6" />
        <p className="font-sans text-body-lg text-taupe-600 font-light max-w-md mx-auto">
          Sobota 29. srpna 2026 — od Lomce až po první tanec.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Timeline line — centred under the icon column */}
        <div
          aria-hidden="true"
          className="absolute left-7 sm:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent"
        />

        {groups.map(({ venue, items }, groupIndex) => (
          <div key={venue.id} className={groupIndex > 0 ? 'mt-10' : undefined}>
            <VenueHeader venue={venue} />
            <ol>
              {items.map((item, index) => (
                <ScheduleRow key={item.time} item={item} index={index} />
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="reveal text-center mt-14">
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-pistachio-600 text-pistachio-800 font-sans text-body font-light tracking-wide px-8 py-3.5 rounded-full hover:bg-pistachio-600 hover:text-white active:scale-[0.98] transition-all duration-200"
        >
          <MapPinIcon size={18} />
          Mapa všech míst
        </a>
        <p className="font-sans text-caption text-taupe-400 mt-4">
          Parkoviště, kostel, statek i ubytování na jedné mapě.
        </p>
      </div>
    </section>
  )
}
