/**
 * Client-side HTML sanitization for rich content display
 * Prevents XSS attacks by removing dangerous tags and attributes
 */

export function sanitizeHtml(html: string | null | undefined): string | null {
  if (!html) return null

  // Allowed tags and their allowed attributes
  const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote']
  const allowedAttributes: Record<string, string[]> = {
    a: ['href', 'title', 'target', 'rel']
  }

  // Remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    .replace(/<object[^>]*>.*?<\/object>/gi, '')

  // Parse and filter tags
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi
  sanitized = sanitized.replace(tagRegex, (match, tag, attrs) => {
    const tagLower = tag.toLowerCase()
    
    if (!allowedTags.includes(tagLower)) {
      return ''
    }

    // For closing tags, just return them
    if (match.startsWith('</')) {
      return match
    }

    // For opening tags, clean attributes
    if (tagLower === 'a') {
      const hrefMatch = attrs.match(/href=["']([^"']*?)["']/i)
      let href = hrefMatch ? hrefMatch[1] : '#'
      
      // Only allow safe URLs
      if (
        !href.startsWith('http://') &&
        !href.startsWith('https://') &&
        !href.startsWith('/') &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:')
      ) {
        href = '#'
      }

      const titleMatch = attrs.match(/title=["']([^"']*?)["']/i)
      const title = titleMatch ? ` title="${escapeAttrValue(titleMatch[1])}"` : ''
      
      return `<a href="${escapeAttrValue(href)}"${title} rel="noopener noreferrer">`
    }

    // Return allowed tags without attributes
    return `<${tagLower}>`
  })

  // Remove any remaining event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')

  return sanitized.trim() || null
}

/**
 * Escape HTML attribute values to prevent injection
 */
function escapeAttrValue(value: string): string {
  const map: Record<string, string> = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return value.replace(/["'&<>]/g, char => map[char])
}

/**
 * Escape HTML entities for safe display as text
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, char => map[char])
}
