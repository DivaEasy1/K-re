'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Sliders, X } from 'lucide-react'
import type { Activity } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type FilterKey = 'all' | 'leisure' | 'nature' | 'gastronomy' | 'sport'
type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard'
type PriceFilter = 'all' | 'under20' | '20to40' | 'over50'

const categoryLabels: Record<FilterKey, string> = {
  all: 'Toutes',
  leisure: 'Loisir',
  nature: 'Nature',
  gastronomy: 'Gastronomie',
  sport: 'Sport',
}

const difficultyLabels: Record<DifficultyFilter, string> = {
  all: 'Tous les niveaux',
  easy: 'Facile',
  medium: 'Moyen',
  hard: 'Difficile',
}

const priceLabels: Record<PriceFilter, string> = {
  all: 'Tous les prix',
  'under20': 'Moins de 20€',
  '20to40': '20€ - 40€',
  'over50': 'Plus de 50€',
}

interface ActivitiesFilterProps {
  activities: Activity[]
  onFiltersChange: (filtered: Activity[]) => void
}

export default function ActivitiesFilter({ activities, onFiltersChange }: ActivitiesFilterProps) {
  const [categoryFilter, setCategoryFilter] = useState<FilterKey>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)
  const mobileFilterRef = useRef<HTMLDivElement>(null)

  // Apply filters
  useEffect(() => {
    let filtered = activities

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((a) => a.category === categoryFilter)
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((a) => a.difficulty === difficultyFilter)
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter((activity) => {
        const price = parseFloat(activity.price.replace(/[^\d.-]/g, '') || '0')

        if (priceFilter === 'under20') return price < 20
        if (priceFilter === '20to40') return price >= 20 && price <= 40
        if (priceFilter === 'over50') return price > 50

        return true
      })
    }

    onFiltersChange(filtered)
  }, [categoryFilter, difficultyFilter, priceFilter, activities, onFiltersChange])

  // Animate filter entrance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chips = filterRef.current?.querySelectorAll<HTMLElement>('[data-filter-chip]')
    if (!chips?.length) return

    gsap.fromTo(
      chips,
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'all',
      }
    )
  }, [])

  // Mobile filter slide
  useEffect(() => {
    if (!mobileFilterRef.current) return

    if (showMobileFilters) {
      gsap.to(mobileFilterRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(mobileFilterRef.current, {
        autoAlpha: 0,
        y: 8,
        duration: 0.2,
        ease: 'power2.in',
      })
    }
  }, [showMobileFilters])

  const hasActiveFilters =
    categoryFilter !== 'all' || difficultyFilter !== 'all' || priceFilter !== 'all'

  const resetFilters = () => {
    setCategoryFilter('all')
    setDifficultyFilter('all')
    setPriceFilter('all')
  }

  return (
    <div ref={filterRef} className="space-y-4">
      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap gap-3 items-start">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2" data-filter-chip>
          {(Object.keys(categoryLabels) as FilterKey[]).map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
                categoryFilter === category
                  ? 'bg-brand-blue text-white border-brand-blue shadow-[0_8px_16px_-6px_rgba(30,144,255,0.5)]'
                  : 'border-slate-200 text-brand-dark bg-white hover:border-brand-blue hover:bg-blue-50'
              )}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2" data-filter-chip>
          {(Object.keys(difficultyLabels) as DifficultyFilter[]).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setDifficultyFilter(difficulty)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
                difficultyFilter === difficulty
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-[0_8px_16px_-6px_rgba(255,165,0,0.5)]'
                  : 'border-slate-200 text-brand-dark bg-white hover:border-brand-gold hover:bg-amber-50'
              )}
            >
              {difficultyLabels[difficulty]}
            </button>
          ))}
        </div>

        {/* Price Filter */}
        <div className="flex flex-wrap gap-2" data-filter-chip>
          {(Object.keys(priceLabels) as PriceFilter[]).map((price) => (
            <button
              key={price}
              onClick={() => setPriceFilter(price)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
                priceFilter === price
                  ? 'bg-brand-success text-white border-brand-success shadow-[0_8px_16px_-6px_rgba(34,197,94,0.5)]'
                  : 'border-slate-200 text-brand-dark bg-white hover:border-brand-success hover:bg-emerald-50'
              )}
            >
              {priceLabels[price]}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            onClick={resetFilters}
            variant="ghost"
            size="sm"
            className="border border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden">
        <Button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={cn(
            'w-full transition-all duration-200',
            showMobileFilters
              ? 'bg-brand-blue text-white'
              : 'border border-slate-300 bg-white text-brand-dark hover:border-brand-blue'
          )}
        >
          <Sliders className="h-4 w-4 mr-2" />
          {showMobileFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          {hasActiveFilters && (
            <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-bold text-white">
              {[categoryFilter !== 'all', difficultyFilter !== 'all', priceFilter !== 'all'].filter(
                Boolean
              ).length}
            </span>
          )}
        </Button>

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div ref={mobileFilterRef} className="mt-3 space-y-3 opacity-0">
            {/* Categories */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Catégorie
              </p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(categoryLabels) as FilterKey[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border',
                      categoryFilter === category
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'border-slate-200 text-brand-dark bg-white'
                    )}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Niveau</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(difficultyLabels) as DifficultyFilter[]).map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setDifficultyFilter(difficulty)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border',
                      difficultyFilter === difficulty
                        ? 'bg-brand-gold text-brand-dark border-brand-gold'
                        : 'border-slate-200 text-brand-dark bg-white'
                    )}
                  >
                    {difficultyLabels[difficulty]}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Prix</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(priceLabels) as PriceFilter[]).map((price) => (
                  <button
                    key={price}
                    onClick={() => setPriceFilter(price)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border',
                      priceFilter === price
                        ? 'bg-brand-success text-white border-brand-success'
                        : 'border-slate-200 text-brand-dark bg-white'
                    )}
                  >
                    {priceLabels[price]}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <Button
                onClick={() => {
                  resetFilters()
                  setShowMobileFilters(false)
                }}
                variant="ghost"
                size="sm"
                className="w-full border border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Réinitialiser
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
          <p className="font-semibold">Filtres actifs:</p>
          <div className="mt-1 space-y-1">
            {categoryFilter !== 'all' && <p>• Catégorie: {categoryLabels[categoryFilter]}</p>}
            {difficultyFilter !== 'all' && <p>• Niveau: {difficultyLabels[difficultyFilter]}</p>}
            {priceFilter !== 'all' && <p>• Prix: {priceLabels[priceFilter]}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
