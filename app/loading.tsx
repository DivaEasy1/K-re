import LoadingState from '@/components/ui/loading-state'

export default function Loading() {
  return (
    <main className="relative flex min-h-[60vh] flex-1 items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,144,255,0.14),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(255,165,0,0.12),transparent_34%)]" />
      <LoadingState
        className="relative max-w-md"
        title="Préparation de votre expérience K-Ré"
        description="Nous chargeons la page pour vous."
      />
    </main>
  )
}
