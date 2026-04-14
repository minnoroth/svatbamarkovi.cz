import { useEffect, useRef, useState } from 'react'
import { PHOTOS } from '../data/weddingData'
import { useReveal } from '../hooks/useReveal'
import OrnamentalDivider from './OrnamentalDivider'

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const headingRef = useReveal<HTMLDivElement>()

  // cardWidth includes trailing gap, but the last visible card doesn't need one
  const visibleCount = cardWidth > 0 ? Math.floor((containerWidth + 16) / cardWidth) || 1 : 1
  const maxIndex = Math.max(0, PHOTOS.length - visibleCount)

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1))

  // Measure card width and container width
  useEffect(() => {
    const updateWidth = () => {
      const firstCard = trackRef.current?.children[0]
      if (firstCard instanceof HTMLElement) {
        setCardWidth(firstCard.offsetWidth + 16) // card + gap-4
      }
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Clamp index when maxIndex shrinks (e.g. on resize)
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [maxIndex])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (delta > 50) next()
    else if (delta < -50) prev()
  }

  const offset = cardWidth > 0
    ? (index === maxIndex && trackRef.current
      ? trackRef.current.scrollWidth - containerWidth
      : index * cardWidth)
    : 0

  return (
    <section id="foto" className="bg-white py-24 overflow-hidden">
      <div ref={headingRef} className="reveal text-center mb-12 px-4">
        <p className="font-sans text-label uppercase tracking-[0.15em] text-pistachio-600 mb-3">
          Naše foto
        </p>
        <h2 className="font-serif text-h2 text-brown-900 font-light">
          Vzpomínky, které nás přivedly sem
        </h2>
        <OrnamentalDivider className="mt-6" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Track */}
        <div
          ref={containerRef}
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex gap-4"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className="shrink-0 w-[85vw] sm:w-72 md:w-80 rounded-2xl overflow-hidden shadow-card border border-cream-200 group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-white px-5 py-3 border-t border-cream-100">
                  <p className="font-sans text-caption text-taupe-400 italic">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Předchozí"
          className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-3 w-11 h-11 rounded-full bg-white shadow-elevated border border-cream-200 flex items-center justify-center text-brown-900 hover:bg-pistachio-50 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          disabled={index === maxIndex}
          aria-label="Další"
          className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-3 w-11 h-11 rounded-full bg-white shadow-elevated border border-cream-200 flex items-center justify-center text-brown-900 hover:bg-pistachio-50 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Slides">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Foto ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === index
                  ? 'w-6 bg-pistachio-800'
                  : 'w-2 bg-cream-200 hover:bg-pistachio-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
