import { useCountdown } from '../hooks/useCountdown'
import { WEDDING_DATE } from '../data/weddingData'
import { useReveal } from '../hooks/useReveal'

interface CountdownCardProps {
  value: number
  unit: string
  delay: string
}

function CountdownCard({ value, unit, delay }: CountdownCardProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal flex flex-col items-center bg-white rounded-xl shadow-card px-3 py-4 md:px-5 md:py-6 border border-cream-200 ${delay}`}
    >
      <span className="font-serif text-[2.5rem] md:text-[3.5rem] leading-none text-pistachio-800 font-light tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans text-label uppercase tracking-[0.12em] text-taupe-400 mt-2">
        {unit}
      </span>
    </div>
  )
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isOver } = useCountdown(WEDDING_DATE)
  const headingRef = useReveal<HTMLHeadingElement>()

  if (isOver) {
    return (
      <section id="countdown" className="bg-cream-50 py-20 px-4">
        <p className="font-display text-[3rem] text-pistachio-600 text-center">
          Dnes je ten den! 🌸
        </p>
      </section>
    )
  }

  return (
    <section id="countdown" className="bg-cream-50 py-20 px-4">
      <h2
        ref={headingRef}
        className="reveal font-serif text-h2 text-brown-900 font-light text-center mb-12"
      >
        Zbývá do svatby
      </h2>

      <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-lg mx-auto">
        <CountdownCard value={days} unit="Dnů" delay="" />
        <CountdownCard value={hours} unit="Hodin" delay="delay-100" />
        <CountdownCard value={minutes} unit="Minut" delay="delay-200" />
        <CountdownCard value={seconds} unit="Sekund" delay="delay-300" />
      </div>
    </section>
  )
}
