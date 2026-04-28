/**
 * K-Ré Design System
 * Unified design tokens and component guidelines
 * Premium, modern, scalable
 */

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================

export const typographyScale = {
  // Display - Hero titles
  display: {
    xl: {
      fontSize: '72px',
      lineHeight: '1.1',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      mobileSize: '48px',
    },
    lg: {
      fontSize: '60px',
      lineHeight: '1.15',
      fontWeight: 700,
      letterSpacing: '-0.015em',
      mobileSize: '36px',
    },
  },

  // Heading - Section titles
  heading: {
    h1: {
      fontSize: '48px',
      lineHeight: '1.2',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      mobileSize: '32px',
    },
    h2: {
      fontSize: '36px',
      lineHeight: '1.25',
      fontWeight: 700,
      letterSpacing: '0',
      mobileSize: '28px',
    },
    h3: {
      fontSize: '28px',
      lineHeight: '1.3',
      fontWeight: 600,
      letterSpacing: '0.005em',
      mobileSize: '22px',
    },
    h4: {
      fontSize: '22px',
      lineHeight: '1.35',
      fontWeight: 600,
      letterSpacing: '0.01em',
      mobileSize: '18px',
    },
  },

  // Body - Content
  body: {
    lg: {
      fontSize: '18px',
      lineHeight: '1.6',
      fontWeight: 400,
      mobileSize: '16px',
    },
    base: {
      fontSize: '16px',
      lineHeight: '1.6',
      fontWeight: 400,
      mobileSize: '15px',
    },
    sm: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: 400,
      mobileSize: '13px',
    },
  },

  // Label - UI text
  label: {
    lg: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    base: {
      fontSize: '12px',
      lineHeight: '1.4',
      fontWeight: 600,
      letterSpacing: '0.08em',
    },
    sm: {
      fontSize: '11px',
      lineHeight: '1.4',
      fontWeight: 700,
      letterSpacing: '0.12em',
    },
  },
}

// ============================================================================
// SPACING SYSTEM (8px base unit)
// ============================================================================

export const spacingScale = {
  // Micro spacing
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '80px',
  '6xl': '96px',

  // Padding presets
  padding: {
    compact: '12px 16px',
    default: '16px 24px',
    large: '24px 32px',
    xlarge: '32px 48px',
  },

  // Margin presets
  margin: {
    section: '48px 0',
    sectionLarge: '64px 0',
    sectionXL: '80px 0',
  },
}

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colorPalette = {
  // Brand colors
  primary: {
    blue: '#1E90FF',
    gold: '#FFA500',
    orange: '#FF8C00',
  },

  // Semantic colors
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
  },

  // Neutral scale
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Dark theme
  dark: '#0A1628',
  light: '#F0F8FF',

  // Overlay
  overlay: {
    dark: 'rgba(10, 22, 40, 0.7)',
    light: 'rgba(255, 255, 255, 0.08)',
  },
}

// ============================================================================
// BORDER RADIUS (Modern, consistent)
// ============================================================================

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  full: '9999px',

  // Preset categories
  card: '16px',
  button: '8px',
  input: '8px',
  badge: '9999px',
  hero: '32px',
}

// ============================================================================
// SHADOWS (Premium, multi-layer)
// ============================================================================

export const shadows = {
  // Subtle
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',

  // Medium
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

  // Large (for modals, elevated cards)
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.35)',

  // Ocean theme
  ocean: '0 10px 30px -15px rgba(10, 22, 40, 0.35)',
  oceanLarge: '0 26px 65px -42px rgba(10, 22, 40, 0.7)',

  // Glow effects
  glow: {
    blue: '0 0 20px rgba(30, 144, 255, 0.4)',
    gold: '0 0 20px rgba(255, 165, 0, 0.3)',
    success: '0 0 16px rgba(34, 197, 94, 0.3)',
  },

  // Inset
  inset: '0 1px 2px 0 rgba(0, 0, 0, 0.05) inset',
}

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Easing
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Presets
  standard: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: 'all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  fade: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
}

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

export const buttonVariants = {
  primary: {
    bg: '#1E90FF',
    text: '#FFFFFF',
    hover: 'rgba(30, 144, 255, 0.9)',
    active: 'rgba(30, 144, 255, 0.8)',
    shadow: '0 8px 20px -8px rgba(30, 144, 255, 0.4)',
  },

  secondary: {
    bg: '#FFA500',
    text: '#0A1628',
    hover: 'rgba(255, 165, 0, 0.9)',
    active: 'rgba(255, 165, 0, 0.8)',
    shadow: '0 8px 20px -8px rgba(255, 165, 0, 0.4)',
  },

  ghost: {
    bg: 'transparent',
    text: '#0A1628',
    border: '#D1D5DB',
    hover: 'rgba(0, 0, 0, 0.04)',
    active: 'rgba(0, 0, 0, 0.08)',
  },

  ghostLight: {
    bg: 'transparent',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.3)',
    hover: 'rgba(255, 255, 255, 0.12)',
    active: 'rgba(255, 255, 255, 0.2)',
  },

  danger: {
    bg: '#EF4444',
    text: '#FFFFFF',
    hover: 'rgba(239, 68, 68, 0.9)',
    active: 'rgba(239, 68, 68, 0.8)',
    shadow: '0 8px 20px -8px rgba(239, 68, 68, 0.4)',
  },
}

// ============================================================================
// CARD PRESETS
// ============================================================================

export const cardPresets = {
  premium: {
    bg: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(255, 255, 255, 0.7)',
    shadow: shadows.oceanLarge,
    backdrop: 'blur(12px)',
    radius: borderRadius.xl,
  },

  glass: {
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: 'none',
    backdrop: 'blur(10px)',
    radius: borderRadius.lg,
  },

  elevated: {
    bg: '#FFFFFF',
    border: 'rgba(0, 0, 0, 0.06)',
    shadow: shadows.lg,
    backdrop: 'none',
    radius: borderRadius.lg,
  },

  minimal: {
    bg: 'rgba(243, 244, 246, 0.8)',
    border: 'rgba(209, 213, 219, 0.6)',
    shadow: shadows.xs,
    backdrop: 'blur(4px)',
    radius: borderRadius.base,
  },
}

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================================================
// Z-INDEX SCALE (Consistent stacking)
// ============================================================================

export const zIndex = {
  hide: '-1',
  base: '0',
  docked: '10',
  dropdown: '100',
  sticky: '110',
  fixed: '120',
  modalBackdrop: '130',
  modal: '140',
  popover: '150',
  tooltip: '160',
  notification: '170',
}
