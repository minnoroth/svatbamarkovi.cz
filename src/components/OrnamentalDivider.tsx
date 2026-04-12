interface OrnamentalDividerProps {
  className?: string
}

export default function OrnamentalDivider({ className = '' }: OrnamentalDividerProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <svg width="200" height="20" viewBox="0 0 200 20" fill="none" aria-hidden="true">
        <line x1="0" y1="10" x2="80" y2="10" stroke="#E8C97A" strokeWidth="0.75" opacity="0.7" />
        <circle cx="100" cy="10" r="3" fill="#E8C97A" opacity="0.8" />
        <circle cx="90" cy="10" r="1.5" fill="#E8C97A" opacity="0.5" />
        <circle cx="110" cy="10" r="1.5" fill="#E8C97A" opacity="0.5" />
        <line x1="120" y1="10" x2="200" y2="10" stroke="#E8C97A" strokeWidth="0.75" opacity="0.7" />
      </svg>
    </div>
  )
}
