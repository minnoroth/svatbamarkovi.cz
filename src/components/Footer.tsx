const NAV_LINKS = [
  { label: 'Obřad', href: '#info' },
  { label: 'Oslava', href: '#info' },
  { label: 'Dresscode', href: '#dresscode' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Footer() {
  return (
    <footer className="bg-brown-900 py-16 px-4 text-center">
      <span className="font-display text-[3rem] text-gold-300 block mb-3">Michal &amp; Simona</span>

      <p className="font-serif text-h3 italic text-cream-200 font-light mb-8">29. srpna 2026</p>

      <div className="w-20 border-t border-gold-300 opacity-40 mx-auto mb-8" />

      <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-sans text-label uppercase tracking-[0.12em] text-taupe-400 hover:text-cream-200 transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <p className="font-sans text-caption text-taupe-600">
        S láskou připraveno pro náš velký den ♡
      </p>
    </footer>
  )
}
