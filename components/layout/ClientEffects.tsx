'use client'

import { useEffect, useState } from 'react'

import SmoothScroll from '@/components/layout/SmoothScroll'
import GsapEffects from '@/components/layout/GsapEffects'

export default function ClientEffects() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0)
    return () => window.clearTimeout(id)
  }, [])

  if (!ready) {
    return null
  }

  return (
    <>
      <SmoothScroll />
      <GsapEffects />
    </>
  )
}
