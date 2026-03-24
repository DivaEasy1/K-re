import type { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  return <main className="page-fade-in flex-1">{children}</main>
}
