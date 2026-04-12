import { CEREMONY, RECEPTION, LUNCH } from '../data/weddingData'
import type { EventInfo } from '../types'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'

function ChurchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v4M10 4h4" />
      <path d="M3 22V10l9-6 9 6v12H3z" />
      <path d="M9 22v-6h6v6" />
    </svg>
  )
}

function BarnIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 22V9l9-7 9 7v13H3z" />
      <path d="M9 22v-7h6v7" />
      <path d="M3 9h18" />
    </svg>
  )
}

function DiningIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

interface EventCardProps {
  event: EventInfo
  icon: 'church' | 'barn' | 'dining'
  delay: string
}

function EventCard({ event, icon, delay }: EventCardProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal bg-white rounded-2xl p-8 shadow-soft border border-cream-200 flex flex-col gap-5 ${delay}`}
    >
      <div className="w-12 h-12 rounded-full bg-pistachio-100 flex items-center justify-center text-pistachio-600">
        {icon === 'church' ? <ChurchIcon /> : icon === 'dining' ? <DiningIcon /> : <BarnIcon />}
      </div>
      <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600">
        {event.label}
      </p>
      <h3 className="font-serif text-h3 text-brown-900 font-light italic">{event.title}</h3>
      <div className="flex items-center gap-3 text-taupe-600">
        <ClockIcon />
        <span className="font-sans text-body">{event.time}</span>
      </div>
      <div className="flex items-start gap-3 text-taupe-600">
        <span className="mt-0.5">
          <MapPinIcon />
        </span>
        <span className="font-sans text-body">
          {event.mapUrl ? (
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-pistachio-600 transition-colors"
            >
              {event.address}
            </a>
          ) : (
            event.address
          )}
        </span>
      </div>
      <p className="font-sans text-caption text-taupe-400 border-t border-cream-200 pt-4 mt-1">
        {event.note}
      </p>
    </div>
  )
}

export default function WeddingInfo() {
  const headingRef = useReveal<HTMLDivElement>()

  return (
    <section id="info" className="bg-pistachio-50 py-24 px-4">
      <div ref={headingRef} className="reveal text-center mb-16">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Plán dne
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">Jak to bude probíhat</h2>
        <OrnamentalDivider className="mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <EventCard event={CEREMONY} icon="church" delay="" />
        <EventCard event={LUNCH} icon="dining" delay="delay-100" />
        <EventCard event={RECEPTION} icon="barn" delay="delay-200" />
      </div>
    </section>
  )
}
