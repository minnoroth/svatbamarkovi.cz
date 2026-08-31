import type { ReactNode } from 'react'
import type { InfoIconName, ScheduleIconName } from '../types'

interface IconProps {
  size?: number
  className?: string
}

function IconBase({ size = 24, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

const SCHEDULE_ICONS: Record<ScheduleIconName, ReactNode> = {
  rings: (
    <>
      <circle cx="9" cy="13.5" r="5.5" />
      <circle cx="15" cy="13.5" r="5.5" />
      <path d="M15 4.5l1.8 1.8L15 8l-1.8-1.7z" />
    </>
  ),
  church: (
    <>
      <path d="M12 2v4M10 4h4" />
      <path d="M3 22V10l9-6 9 6v12H3z" />
      <path d="M9 22v-6h6v6" />
    </>
  ),
  toast: (
    <>
      <path d="M6 3h5l-.7 7a1.8 1.8 0 0 1-1.8 1.6A1.8 1.8 0 0 1 6.7 10L6 3z" />
      <path d="M8.5 11.6V20M6 20h5" />
      <path d="M13 3h5l-.7 7a1.8 1.8 0 0 1-1.8 1.6A1.8 1.8 0 0 1 13.7 10L13 3z" />
      <path d="M15.5 11.6V20M13 20h5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3.2l1.6-2.5h6.4L16.8 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 9h12v5.5A4.5 4.5 0 0 1 11.5 19h-3A4.5 4.5 0 0 1 4 14.5V9z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7.5 6c0-1 1-1.2 1-2.5M10.5 6c0-1 1-1.2 1-2.5M13.5 6c0-1 1-1.2 1-2.5" />
      <path d="M3 21.5h15" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3.5" width="16" height="14" rx="2.5" />
      <path d="M4 10.5h16M12 3.5v7" />
      <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
      <path d="M7 17.5v3M17 17.5v3" />
    </>
  ),
  dinner: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3.5 5v14" />
      <path d="M3.5 5c1.2.4 1.8 2 1.8 3.5V11H3.5" />
      <path d="M19 5v3.5a1.5 1.5 0 0 0 3 0V5" />
      <path d="M20.5 10v9" />
    </>
  ),
  barn: (
    <>
      <path d="M3 22V9l9-7 9 7v13H3z" />
      <path d="M9 22v-7h6v7" />
      <path d="M3 9h18" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20h16v-5.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 14.5V20z" />
      <path d="M4 16.5h16" />
      <path d="M12 12V8.5" />
      <path d="M12 3.5c-1 1.2 1 2 0 3.2" />
    </>
  ),
  buffet: (
    <>
      <path d="M4.5 15.5a7.5 7.5 0 0 1 15 0" />
      <path d="M3 15.5h18" />
      <path d="M12 8V6.5" />
      <circle cx="12" cy="5.5" r="1" />
      <path d="M5 19h14" />
    </>
  ),
  party: (
    <>
      <path d="M4 20l4-11 7 7L4 20z" />
      <path d="M8 9l7 7" />
      <path d="M14 4l1.5-1.5M16.5 8.5l2-.5M12.5 2.5v2M19.5 5l1-1" />
      <circle cx="18.5" cy="12" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  sparkler: (
    <>
      <path d="M12 12L4 20" />
      <path d="M14 10V4M14 10l4.2-4.2M14 10h6M14 10l4.2 4.2M14 10L9.8 5.8" />
      <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
    </>
  ),
}

const INFO_ICONS: Record<InfoIconName, ReactNode> = {
  map: (
    <>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4.5" rx="1" />
      <path d="M5 12.5V20h14v-7.5M12 8v12" />
      <path d="M12 8c-1.5-3.5-6-3.5-6-1s3.5 1 6 1zM12 8c1.5-3.5 6-3.5 6-1s-3.5 1-6 1z" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-9M21 19v-9M3 14h18" />
      <path d="M5 10V6.5h14V10" />
      <path d="M8 10V8h3v2M13 10V8h3v2" />
    </>
  ),
  tent: (
    <>
      <path d="M2 20L12 4l10 16H2z" />
      <path d="M9 20l3-6 3 6" />
      <path d="M12 4v3" />
    </>
  ),
  grill: (
    <>
      <path d="M4 9h16a8 8 0 0 1-16 0z" />
      <path d="M12 17v4M8 21h8" />
      <path d="M7.5 16.5L5 21M16.5 16.5L19 21" />
      <path d="M9 6c0-1 1-1.2 1-2.5M12 6c0-1 1-1.2 1-2.5M15 6c0-1 1-1.2 1-2.5" />
    </>
  ),
  umbrella: (
    <>
      <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
      <path d="M12 12v6.5a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </>
  ),
}

export function ScheduleIcon({ name, ...props }: IconProps & { name: ScheduleIconName }) {
  return <IconBase {...props}>{SCHEDULE_ICONS[name]}</IconBase>
}

export function InfoIcon({ name, ...props }: IconProps & { name: InfoIconName }) {
  return <IconBase {...props}>{INFO_ICONS[name]}</IconBase>
}

export function MapPinIcon(props: IconProps) {
  return <IconBase {...props}>{INFO_ICONS.map}</IconBase>
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 3.5h3.5l2 5-2.5 1.5a10.5 10.5 0 0 0 6 6l1.5-2.5 5 2V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" />
    </IconBase>
  )
}
