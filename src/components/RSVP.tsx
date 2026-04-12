import { useReveal } from '../hooks/useReveal'
import FloralCorner from './FloralCorner'
import OrnamentalDivider from './OrnamentalDivider'

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function RSVP() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="rsvp" className="relative bg-pistachio-100 py-24 px-4 overflow-hidden">
      {/* Corner ornaments */}
      <FloralCorner className="absolute top-4 left-4 opacity-40" />
      <FloralCorner flip className="absolute top-4 right-4 opacity-40" />
      <div className="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />

      <div ref={ref} className="reveal relative max-w-lg mx-auto text-center">
        <OrnamentalDivider className="mb-8" />

        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Potvrďte účast
        </p>

        <h2 className="font-serif text-h1 text-brown-900 font-light mb-6">Přijdete?</h2>

        <p className="font-sans text-body-lg text-taupe-600 font-light leading-relaxed mb-10 max-w-sm mx-auto">
          Moc bychom vás tam chtěli mít. Prosíme o potvrzení účasti do{' '}
          <strong className="font-normal text-brown-900">31. května 2026</strong>.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-3 bg-pistachio-600 text-white font-sans text-body font-light tracking-wide px-10 py-4 rounded-full shadow-elevated hover:bg-pistachio-800 active:scale-[0.98] transition-all duration-200"
        >
          Potvrdit účast
          <ArrowRightIcon />
        </a>

        <p className="font-sans text-caption text-taupe-400 mt-6">
          Budeme vám případně posílat podrobnosti na email.
        </p>
      </div>
    </section>
  )
}
