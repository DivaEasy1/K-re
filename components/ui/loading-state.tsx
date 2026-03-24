import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LoadingStateProps {
  className?: string
  title?: string
  description?: string
}

export default function LoadingState({
  className,
  title = 'Chargement en cours...',
  description = 'Merci de patienter quelques secondes.',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-sm',
        className
      )}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blue">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
      </span>
      <div>
        <p className="font-heading text-lg font-bold tracking-tight text-brand-dark">
          {title}
        </p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <span className="sr-only">Chargement</span>
    </div>
  )
}
