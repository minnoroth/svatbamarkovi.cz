import { WITNESSES } from '../data/weddingData'
import type { Contact } from '../types'
import { useReveal } from '../hooks/useReveal'
import FloralCorner from './FloralCorner'
import OrnamentalDivider from './OrnamentalDivider'
import { PhoneIcon } from './icons'

/** Formats an E.164 Czech number (+420XXXXXXXXX) as "XXX XXX XXX" for display. */
function formatPhone(phone: string): string {
  return phone.replace(/^\+420/, '').replace(/(\d{3})(?=\d)/g, '$1 ')
}

interface ContactCardProps {
  contact: Contact
}

function ContactCard({ contact }: ContactCardProps) {
  return (
    <a
      href={`tel:${contact.phone}`}
      className="group flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-card border border-cream-200 text-left hover:shadow-elevated hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200"
    >
      <span className="w-12 h-12 shrink-0 rounded-full bg-pistachio-600 text-white flex items-center justify-center group-hover:bg-pistachio-800 transition-colors duration-200">
        <PhoneIcon size={22} />
      </span>
      <span className="flex flex-col min-w-0">
        <span className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600">
          {contact.role}
        </span>
        <span className="font-serif text-[1.375rem] text-brown-900 font-light leading-tight">
          {contact.name}
        </span>
        <span className="font-sans text-body text-taupe-600 tabular-nums">
          {formatPhone(contact.phone)}
        </span>
      </span>
    </a>
  )
}

export default function Contacts() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="kontakty" className="relative bg-pistachio-100 py-24 px-4 overflow-hidden">
      {/* Corner ornaments */}
      <FloralCorner className="absolute top-4 left-4 opacity-40" />
      <FloralCorner flip className="absolute top-4 right-4 opacity-40" />
      <div className="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />

      <div ref={ref} className="reveal relative max-w-2xl mx-auto text-center">
        <OrnamentalDivider className="mb-8" />

        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Kontakty
        </p>

        <h2 className="font-serif text-[2.5rem] sm:text-h1 text-brown-900 font-light mb-6">
          Potřebujete nás v den D?
        </h2>

        <p className="font-sans text-body-lg text-taupe-600 font-light leading-relaxed mb-10 max-w-md mx-auto">
          Novomanželé budou mít plné ruce práce — obraťte se prosím na naše svědky, rádi vám se
          vším pomohou.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          {WITNESSES.map((contact) => (
            <ContactCard key={contact.phone} contact={contact} />
          ))}
        </div>

        <p className="font-sans text-caption text-taupe-400 mt-8">
          Moc děkujeme a těšíme se na vás!
        </p>
      </div>
    </section>
  )
}
