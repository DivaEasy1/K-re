import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70"
      aria-label="Chemin de navigation"
    >
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 shrink-0 text-white/45" aria-hidden />
          )}
          {index === items.length - 1 ? (
            <span className="font-semibold text-white">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="rounded px-1 text-white/72 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
