import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Obřad & Oslava', href: '#info' },
  { label: 'Dresscode', href: '#dresscode' },
  { label: 'Foto', href: '#foto' },
  { label: 'Účast', href: '#rsvp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/90 backdrop-blur-sm shadow-soft border-b border-cream-200'
            : 'bg-transparent'
        }`}
      >
        <a
          href="#hero"
          className="font-display text-2xl text-brown-900 flex-1"
          onClick={handleNavClick}
        >
          M&S
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-label uppercase tracking-[0.12em] text-brown-900 hover:text-pistachio-600 transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Zavřít menu' : 'Otevřít menu'}
        >
          <span
            className={`block w-6 h-0.5 bg-brown-900 transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brown-900 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-brown-900 transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-cream-50 flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="font-serif text-h3 text-brown-900 font-light italic hover:text-pistachio-600 transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
