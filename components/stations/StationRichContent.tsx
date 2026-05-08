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
      className="prose prose-sm dark:prose-invert max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}
