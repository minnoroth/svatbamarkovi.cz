interface FloralCornerProps {
  flip?: boolean
  className?: string
}

export default function FloralCorner({ flip = false, className = '' }: FloralCornerProps) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M10 110 Q30 60 80 20" stroke="#C8DCC0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M80 20 Q95 10 85 30 Q70 25 80 20Z" fill="#C8DCC0" opacity="0.6" />
      <path d="M55 55 Q70 40 65 65 Q50 60 55 55Z" fill="#C8DCC0" opacity="0.5" />
      <path d="M35 78 Q48 65 45 85 Q32 82 35 78Z" fill="#C8DCC0" opacity="0.4" />
    </svg>
  )
}
