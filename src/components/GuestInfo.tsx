import { GUEST_INFO } from '../data/weddingData'
import type { InfoItem } from '../types'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'
import { InfoIcon } from './icons'

interface InfoCardProps {
  item: InfoItem
  index: number
}

function InfoCard({ item, index }: InfoCardProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="reveal bg-white rounded-2xl p-7 sm:p-8 shadow-soft border border-cream-200 flex gap-5"
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-blush-100 flex items-center justify-center text-blush-600">
        <InfoIcon name={item.icon} />
      </div>
      <div className="min-w-0">
        <h3 className="font-serif text-[1.375rem] text-brown-900 font-light italic leading-tight">
          {item.title}
        </h3>
        <p className="font-sans text-body text-taupe-600 font-light mt-3">{item.text}</p>
        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-caption uppercase tracking-[0.12em] text-pistachio-600 hover:text-pistachio-800 transition-colors duration-150 mt-4"
          >
            {item.link.label}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function GuestInfo() {
  const headingRef = useReveal<HTMLDivElement>()

  return (
    <section id="informace" className="bg-blush-50 py-24 px-4">
      <div ref={headingRef} className="reveal text-center mb-16">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-blush-600 mb-3">
          Praktické informace
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">Co se hodí vědět</h2>
        <OrnamentalDivider className="mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {GUEST_INFO.map((item, index) => (
          <InfoCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
