'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GsapEffects() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let raf1 = 0
    let raf2 = 0
    let refreshTimer = 0
    let startTimer = 0
    let idleId: number | undefined
    let ctx: gsap.Context | undefined
    const cleanupFns: Array<() => void> = []
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const initAnimations = () => {
      ctx = gsap.context(() => {
        const revealElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal')

        revealElements.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              y: isMobile ? 28 : 42,
              opacity: 0.2,
              scale: isMobile ? 0.992 : 0.985,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: isMobile ? 0.72 : 1,
              delay: index * 0.02,
              ease: isMobile ? 'power2.out' : 'power3.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                start: isMobile ? 'top 92%' : 'top 88%',
                once: true,
              },
            }
          )
        })

        const staggerSections = gsap.utils.toArray<HTMLElement>('.gsap-stagger')
        staggerSections.forEach((section) => {
          const cards = section.querySelectorAll('.gsap-card')
          if (!cards.length) return
          gsap.from(cards, {
            y: isMobile ? 20 : 34,
            opacity: 0.1,
            rotateX: isMobile ? 0 : 6,
            transformOrigin: '50% 100%',
            duration: isMobile ? 0.62 : 0.9,
            ease: 'power2.out',
            stagger: isMobile ? 0.06 : 0.11,
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: isMobile ? 'top 90%' : 'top 84%',
              once: true,
            },
          })
        })

        const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]')
        if (heroMedia) {
          gsap.to(heroMedia, {
            yPercent: 12,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: heroMedia,
              start: 'top top',
              end: 'bottom top',
              scrub: isMobile ? 0.45 : 0.7,
            },
          })
        }

        const heroContent = document.querySelector<HTMLElement>('[data-hero-content]')
        if (heroContent) {
          gsap.to(heroContent, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroContent,
              start: 'top top',
              end: 'bottom top',
              scrub: isMobile ? 0.35 : 0.5,
            },
          })
        }

        const parallaxAccents = gsap.utils.toArray<HTMLElement>('[data-gsap-parallax]')
        parallaxAccents.forEach((el) => {
          const depth = Number(el.dataset.parallaxDepth ?? '14')
          const triggerEl =
            el.closest<HTMLElement>('[data-gsap-parallax-root]') ?? el.parentElement ?? el

          gsap.fromTo(
            el,
            { yPercent: -depth * 0.35 },
            {
              yPercent: depth,
              ease: 'none',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: isMobile ? 0.4 : 0.65,
              },
            }
          )
        })

        const hoverPanels = gsap.utils.toArray<HTMLElement>('[data-gsap-hover]')
        hoverPanels.forEach((panel) => {
          const onEnter = () => {
            gsap.to(panel, {
              y: -4,
              boxShadow: '0 22px 55px -35px rgba(10,22,40,0.52)',
              duration: isMobile ? 0.24 : 0.32,
              ease: 'power2.out',
            })
          }

          const onLeave = () => {
            gsap.to(panel, {
              y: 0,
              boxShadow: '0 0 0 0 rgba(10,22,40,0)',
              duration: isMobile ? 0.28 : 0.38,
              ease: 'power2.out',
            })
          }

          panel.addEventListener('mouseenter', onEnter)
          panel.addEventListener('mouseleave', onLeave)
          cleanupFns.push(() => {
            panel.removeEventListener('mouseenter', onEnter)
            panel.removeEventListener('mouseleave', onLeave)
          })
        })
      })

      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 220)
    }

    // Delay GSAP DOM writes until hydration is fully settled to avoid attribute mismatch warnings.
    const startWhenReady = () => {
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(initAnimations)
      })
    }

    const requestIdle =
      (window as Window & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          opts?: IdleRequestOptions
        ) => number
      }).requestIdleCallback

    if (typeof requestIdle === 'function') {
      idleId = requestIdle(startWhenReady, { timeout: 900 })
    } else {
      startTimer = window.setTimeout(startWhenReady, 260)
    }

    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
      window.clearTimeout(refreshTimer)
      window.clearTimeout(startTimer)
      const cancelIdle = (window as Window & { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback
      if (idleId !== undefined && typeof cancelIdle === 'function') {
        cancelIdle(idleId)
      }
      cleanupFns.forEach((cleanup) => cleanup())
      ctx?.revert()
    }
  }, [pathname])

  return null
}
