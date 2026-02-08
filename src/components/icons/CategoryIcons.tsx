import type { ReactNode } from 'react'
import type { ImageType } from '../../types/index.ts'

interface CategoryIconProps {
  type: ImageType
  className?: string
}

export default function CategoryIcon({ type, className = 'w-10 h-10' }: CategoryIconProps) {
  const icons: Record<ImageType, ReactNode> = {
    chart: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="4" y="30" width="6" height="14" rx="1" fill="#c9a84c" opacity="0.6" />
        <rect x="14" y="22" width="6" height="22" rx="1" fill="#c9a84c" opacity="0.8" />
        <rect x="24" y="14" width="6" height="30" rx="1" fill="#c9a84c" />
        <rect x="34" y="8" width="6" height="36" rx="1" fill="#1a2744" />
        <path d="M4 28L14 20L24 12L34 6" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="8" y="12" width="14" height="32" rx="1" fill="#1a2744" />
        <rect x="26" y="4" width="14" height="40" rx="1" fill="#c9a84c" />
        <rect x="11" y="16" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="17" y="16" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="11" y="22" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="17" y="22" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="11" y="28" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="17" y="28" width="3" height="3" rx="0.5" fill="#f5e6b8" />
        <rect x="29" y="8" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="35" y="8" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="29" y="14" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="35" y="14" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="29" y="20" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="35" y="20" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="29" y="26" width="3" height="3" rx="0.5" fill="#f8f6f1" />
        <rect x="35" y="26" width="3" height="3" rx="0.5" fill="#f8f6f1" />
      </svg>
    ),
    coins: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <ellipse cx="20" cy="28" rx="14" ry="8" fill="#c9a84c" opacity="0.4" />
        <ellipse cx="20" cy="24" rx="14" ry="8" fill="#c9a84c" opacity="0.6" />
        <ellipse cx="20" cy="20" rx="14" ry="8" fill="#c9a84c" />
        <text x="20" y="23" textAnchor="middle" fontSize="10" fill="#1a2744" fontWeight="bold">&#x20AA;</text>
        <ellipse cx="34" cy="18" rx="10" ry="6" fill="#1a2744" opacity="0.3" />
        <ellipse cx="34" cy="14" rx="10" ry="6" fill="#1a2744" />
        <text x="34" y="17" textAnchor="middle" fontSize="7" fill="#f5e6b8" fontWeight="bold">$</text>
      </svg>
    ),
    document: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="10" y="4" width="28" height="36" rx="2" fill="#1a2744" />
        <rect x="10" y="4" width="28" height="36" rx="2" fill="#1a2744" />
        <rect x="14" y="10" width="20" height="2" rx="1" fill="#f5e6b8" />
        <rect x="14" y="16" width="16" height="2" rx="1" fill="#c9a84c" opacity="0.6" />
        <rect x="14" y="22" width="20" height="2" rx="1" fill="#c9a84c" opacity="0.6" />
        <rect x="14" y="28" width="12" height="2" rx="1" fill="#c9a84c" opacity="0.6" />
        <rect x="30" y="30" width="8" height="8" rx="1" fill="#c9a84c" />
        <path d="M33 33L35 35L37 31" stroke="#1a2744" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    handshake: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <path d="M4 24H12L20 16L28 24L36 20H44" stroke="#1a2744" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 16L24 20L28 16" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="24" r="3" fill="#c9a84c" />
        <circle cx="36" cy="20" r="3" fill="#c9a84c" />
      </svg>
    ),
    calculator: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="10" y="4" width="28" height="40" rx="3" fill="#1a2744" />
        <rect x="14" y="8" width="20" height="8" rx="1" fill="#c9a84c" />
        <rect x="14" y="20" width="5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="21.5" y="20" width="5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="29" y="20" width="5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="14" y="28" width="5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="21.5" y="28" width="5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="29" y="28" width="5" height="5" rx="1" fill="#c9a84c" opacity="0.6" />
        <rect x="14" y="36" width="12.5" height="5" rx="1" fill="#f5e6b8" />
        <rect x="29" y="36" width="5" height="5" rx="1" fill="#c9a84c" opacity="0.6" />
      </svg>
    ),
    piggybank: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <ellipse cx="24" cy="26" rx="16" ry="12" fill="#c9a84c" />
        <ellipse cx="24" cy="26" rx="13" ry="9" fill="#f5e6b8" opacity="0.3" />
        <rect x="20" y="10" width="8" height="4" rx="2" fill="#1a2744" />
        <circle cx="30" cy="22" r="1.5" fill="#1a2744" />
        <path d="M36 22C38 22 40 24 40 26" stroke="#1a2744" strokeWidth="2" strokeLinecap="round" />
        <rect x="16" y="36" width="4" height="4" rx="1" fill="#1a2744" />
        <rect x="28" y="36" width="4" height="4" rx="1" fill="#1a2744" />
        <text x="22" y="30" fontSize="8" fill="#1a2744" fontWeight="bold">&#x20AA;</text>
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 48 48" fill="none" className={className}>
        <rect x="18" y="8" width="12" height="8" rx="2" fill="none" stroke="#1a2744" strokeWidth="2" />
        <rect x="6" y="16" width="36" height="24" rx="3" fill="#1a2744" />
        <rect x="6" y="16" width="36" height="10" fill="#c9a84c" rx="3" />
        <rect x="20" y="22" width="8" height="6" rx="1" fill="#1a2744" />
      </svg>
    ),
  }

  return icons[type] || icons.chart
}
