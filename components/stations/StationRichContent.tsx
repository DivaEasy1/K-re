'use client'

import { sanitizeHtml } from '@/lib/sanitizeHtml'

interface StationRichContentProps {
  content?: string | null
}

/**
 * Display sanitized HTML rich content for station details
 * Applies Tailwind styling to make it visually consistent with the site
 */
export function StationRichContent({ content }: StationRichContentProps) {
  if (!content) return null

  const sanitized = sanitizeHtml(content)
  if (!sanitized) return null

  return (
    <article 
      className="rich-content mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
