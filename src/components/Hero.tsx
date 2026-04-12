import OrnamentalDivider from './OrnamentalDivider'
import FloralCorner from './FloralCorner'
import heroImage from '../assets/hero.jpg'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover object-[35%_top] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(44,32,24,0.5)] via-[rgba(44,32,24,0.3)] to-[rgba(44,32,24,0.55)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />
      </div>

      {/* Corner ornaments */}
      <FloralCorner className="absolute top-20 left-4 opacity-60 hidden md:block" />
      <FloralCorner flip className="absolute top-20 right-4 opacity-60 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-cream-200 mb-4 animate-fade-in [animation-delay:300ms]">
          Milí přátelé, zveme vás na náš velký den
        </p>

        <h1 className="font-display text-[3rem] sm:text-display text-white drop-shadow-lg leading-[1.1] mb-6 animate-fade-in [animation-delay:300ms]">
          Michal &amp; Simona
        </h1>

        <p className="font-serif text-[1.25rem] sm:text-h3 italic text-cream-50 font-light mb-6 animate-fade-up [animation-delay:500ms]">
          29. srpna 2026
        </p>

        <OrnamentalDivider className="mb-6 animate-fade-up [animation-delay:500ms]" />

        <p className="font-serif text-body-lg text-cream-200 font-light animate-fade-up [animation-delay:700ms]">
          Kostel Panny Marie Bolestné, Lomec u Vodňan
        </p>

        <a
          href="#countdown"
          aria-label="Přejít dolů"
          className="mt-12 text-gold-300 animate-bounce animate-fade-in [animation-delay:900ms]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream-50 pointer-events-none" />
    </section>
  )
}
