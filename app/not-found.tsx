import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4.85rem)] flex-col items-center justify-center px-4 py-20">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-4">
            <Search className="h-8 w-8 text-brand-blue" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-brand-dark">404</h1>
          <p className="text-lg text-slate-600">
            La page que vous recherchez n&apos;existe pas.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/stations">Voir les stations</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
