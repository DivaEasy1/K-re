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
      className="flex items-center gap-2 text-sm text-slate-600"
      aria-label="Chemin de navigation"
    >
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden />
          )}
          {index === items.length - 1 ? (
            <span className="font-semibold text-brand-dark">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-slate-600 hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-1"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
