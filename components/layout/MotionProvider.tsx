'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

export default function MotionProvider({ children }: { children: ReactNode }) {
  // Keep framer-motion rendering deterministic between SSR and client hydration.
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>
}
