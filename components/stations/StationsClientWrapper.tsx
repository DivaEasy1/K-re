'use client'

import dynamic from 'next/dynamic'

import type { Station } from '@/types'
import LoadingState from '@/components/ui/loading-state'

const StationsClient = dynamic(() => import('./StationsClient'), {
  ssr: false,
  loading: () => (
    <div className="rounded-4xl border border-white/70 bg-white/92 p-4 shadow-[0_20px_55px_-38px_rgba(10,22,40,0.7)] backdrop-blur sm:p-6">
      <div className="h-112 w-full animate-pulse rounded-3xl bg-slate-100/80" />
    </div>
  ),
})

interface StationsClientWrapperProps {
  stations: Station[]
}

export default function StationsClientWrapper({ stations }: StationsClientWrapperProps) {
  return <StationsClient stations={stations} />
}
