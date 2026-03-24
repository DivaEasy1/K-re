'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let raf = 0
    let timeoutId = 0
    let idleId: number | undefined
    let started = false
    let lenis: Lenis | undefined

    const prefersMobile = window.matchMedia('(max-width: 767px)').matches

    const startLenis = () => {
      if (started) return
      started = true

      lenis = new Lenis({
        duration: prefersMobile ? 0.9 : 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: prefersMobile ? 0.82 : 0.9,
        touchMultiplier: 1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      })

      const onLenisScroll = () => ScrollTrigger.update()
      lenis.on('scroll', onLenisScroll)

      const loop = (time: number) => {
        lenis?.raf(time)
        raf = window.requestAnimationFrame(loop)
      }

      raf = window.requestAnimationFrame(loop)
      ScrollTrigger.refresh()

      return () => {
        window.cancelAnimationFrame(raf)
        ;(lenis as { off?: (event: string, cb: () => void) => void }).off?.(
          'scroll',
          onLenisScroll
        )
        lenis?.destroy()
      }
    }

    let destroyLenis: (() => void) | undefined
    const safeStart = () => {
      if (destroyLenis) return
      destroyLenis = startLenis()
    }

    const scheduleStart = () => {
      const requestIdle =
        (window as Window & {
          requestIdleCallback?: (
            callback: IdleRequestCallback,
            opts?: IdleRequestOptions
          ) => number
        }).requestIdleCallback

      if (typeof requestIdle === 'function') {
        idleId = requestIdle(safeStart, { timeout: 850 })
      } else {
        timeoutId = window.setTimeout(safeStart, 240)
      }
    }

    if (document.readyState === 'complete') {
      scheduleStart()
    } else {
      window.addEventListener('load', scheduleStart, { once: true })
    }

    return () => {
      window.removeEventListener('load', scheduleStart)
      window.cancelAnimationFrame(raf)
      window.clearTimeout(timeoutId)
      const cancelIdle = (window as Window & { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback
      if (idleId !== undefined && typeof cancelIdle === 'function') {
        cancelIdle(idleId)
      }
      destroyLenis?.()
    }
  }, [])

  return null
}
