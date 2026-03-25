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
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches
    if (isTouchDevice) {
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
    const hasAnimatedTargets = Boolean(
      document.querySelector('.gsap-reveal, .gsap-stagger, [data-hero-media], [data-gsap-parallax], [data-gsap-hover]')
    )
    if (!hasAnimatedTargets) {
      return
    }

    const initAnimations = () => {
      ctx = gsap.context(() => {
        const revealElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal')

        revealElements.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              y: isMobile ? 28 : 42,
              scale: isMobile ? 0.992 : 0.985,
            },
            {
              y: 0,
              scale: 1,
              duration: isMobile ? 0.56 : 0.78,
              delay: index * 0.02,
              ease: 'power2.out',
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
            rotateX: isMobile ? 0 : 6,
            transformOrigin: '50% 100%',
            duration: isMobile ? 0.5 : 0.72,
            ease: 'power2.out',
            stagger: isMobile ? 0.05 : 0.09,
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: isMobile ? 'top 90%' : 'top 84%',
              once: true,
            },
          })
        })

        const heroMedia = document.querySelector<HTMLElement>('[data-hero-media]')
        if (heroMedia && !isTouchDevice) {
          gsap.to(heroMedia, {
            yPercent: 7,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
              trigger: heroMedia,
              start: 'top top',
              end: 'bottom top',
              scrub: isMobile ? 0.3 : 0.45,
            },
          })
        }

        const heroContent = document.querySelector<HTMLElement>('[data-hero-content]')
        if (heroContent && !isTouchDevice) {
          gsap.to(heroContent, {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: heroContent,
              start: 'top top',
              end: 'bottom top',
              scrub: isMobile ? 0.22 : 0.34,
            },
          })
        }

        if (!isTouchDevice) {
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
                  scrub: isMobile ? 0.24 : 0.38,
                },
              }
            )
          })

          const hoverPanels = gsap.utils.toArray<HTMLElement>('[data-gsap-hover]')
          hoverPanels.forEach((panel) => {
            const onEnter = () => {
              gsap.to(panel, {
                y: -3,
                boxShadow: '0 20px 46px -34px rgba(10,22,40,0.5)',
                duration: isMobile ? 0.2 : 0.26,
                ease: 'power2.out',
              })
            }

            const onLeave = () => {
              gsap.to(panel, {
                y: 0,
                boxShadow: '0 0 0 0 rgba(10,22,40,0)',
                duration: isMobile ? 0.22 : 0.32,
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
        }
      })

      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180)
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
