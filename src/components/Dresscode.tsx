import { SWATCHES, AVOID_COLORS } from '../data/weddingData'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'

export default function Dresscode() {
  const headingRef = useReveal<HTMLDivElement>()
  const swatchesRef = useReveal<HTMLDivElement>()

  return (
    <section id="dresscode" className="bg-cream-100 py-24 px-4">
      <div ref={headingRef} className="reveal text-center mb-12">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-taupe-400 mb-3">
          Dress code
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">
          Přijďte v barvách louky
        </h2>
        <OrnamentalDivider className="mt-6 mb-6" />
        <p className="font-sans text-body-lg text-taupe-600 font-light max-w-md mx-auto">
          Oceníme zemité a přírodní tóny. Formální, ale ne přísně.
        </p>
      </div>

      <div ref={swatchesRef} className="reveal flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
        {SWATCHES.map((swatch) => (
          <div key={swatch.name} className="flex flex-col items-center gap-2">
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-card"
              style={{ backgroundColor: swatch.hex }}
              title={swatch.name}
            />
            <span className="font-sans text-label uppercase tracking-[0.1em] text-taupe-600 text-center max-w-[5rem] leading-tight">
              {swatch.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3">
        <p className="font-sans text-caption text-taupe-400 uppercase tracking-[0.1em]">
          Prosíme vyhnout se
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {AVOID_COLORS.map((color) => (
            <span
              key={color}
              className="bg-cream-200 text-taupe-600 text-caption rounded-full px-4 py-1.5 font-sans"
            >
              {color}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
