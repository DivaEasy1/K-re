'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { ChevronRight, ArrowLeft, Check, AlertCircle, Loader } from 'lucide-react'
import gsap from 'gsap'

import { useCart, useCartHydrated } from '@/lib/cartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BLUR_DATA_URL } from '@/lib/utils'
import { resolveActivityImage } from '@/lib/media'
import settings from '@/data/settings.json'

type CheckoutStep = 'info' | 'review' | 'success'

interface OrderInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  notes: string
}

const INITIAL_ORDER: OrderInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
}

export default function CheckoutClient() {
  const hydrated = useCartHydrated()
  const items = useCart((state) => state.items)
  const clearCart = useCart((state) => state.clearCart)

  const [step, setStep] = useState<CheckoutStep>('info')
  const [orderInfo, setOrderInfo] = useState<OrderInfo>(INITIAL_ORDER)
  const [errors, setErrors] = useState<Partial<OrderInfo>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  // Redirect if no items in cart
  useEffect(() => {
    if (hydrated && items.length === 0) {
      window.location.href = '/activities'
    }
  }, [hydrated, items])

  const validateForm = () => {
    const newErrors: Partial<OrderInfo> = {}

    if (!orderInfo.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!orderInfo.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!orderInfo.email.trim()) {
      newErrors.email = 'Email requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderInfo.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!orderInfo.phone.trim()) newErrors.phone = 'Téléphone requis'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) {
      setStep('review')
    }
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing (replace with real API call)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically:
      // 1. Send order to backend
      // 2. Process payment (Stripe, etc.)
      // 3. Create order confirmation

      // For now, we just clear the cart and show success
      clearCart()
      setStep('success')
    } catch (error) {
      console.error('Order processing error:', error)
      setErrors({ firstName: 'Erreur lors du traitement de la commande' })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!hydrated) {
    return (
      <section className="relative overflow-hidden py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <Loader className="mx-auto h-8 w-8 animate-spin text-brand-blue" />
            <p className="mt-4 text-slate-600">Chargement...</p>
          </div>
        </div>
      </section>
    )
  }

  if (step === 'success') {
    return (
      <section className="relative overflow-hidden py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-brand-success/20 bg-white shadow-lg">
            <CardContent className="flex flex-col items-center justify-center gap-6 py-16 text-center">
              <div className="rounded-full bg-brand-success/10 p-4">
                <Check className="h-12 w-12 text-brand-success" />
              </div>

              <div>
                <h1 className="font-heading text-3xl font-bold text-brand-dark">
                  Commande confirmée !
                </h1>
                <p className="mt-2 text-slate-600">
                  Merci pour votre réservation sur K-Ré.
                </p>
              </div>

              <div className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-left">
                <p className="text-sm font-semibold text-slate-700">Détails de la commande</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nombre d'activités</span>
                    <span className="font-semibold">{totalItems}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between">
                    <span className="font-semibold">Montant total</span>
                    <span className="font-heading text-lg font-bold text-brand-gold">
                      {totalPrice.toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  Un email de confirmation a été envoyé à <span className="font-semibold">{orderInfo.email}</span>
                </p>
                <p>L'équipe K-Ré vous recontactera pour finaliser les détails.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button asChild variant="outline" className="border-slate-300">
                  <Link href="/activities">Découvrir d'autres activités</Link>
                </Button>
                <Button asChild className="bg-brand-blue hover:bg-blue-600">
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,165,0,0.08),transparent_30%),radial-gradient(circle_at_88%_14%,rgba(30,144,255,0.08),transparent_33%)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="p-0">
            <Link href="/activities" className="flex items-center gap-2 text-slate-600 hover:text-brand-dark">
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div className="flex flex-1 items-center gap-3">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${
              step !== 'info' ? 'bg-brand-success text-white' : 'bg-brand-blue text-white'
            }`}>
              {step !== 'info' ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-sm font-semibold text-brand-dark">Vos informations</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />

            <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${
              step === 'success' ? 'bg-brand-success text-white' : step === 'review' ? 'bg-brand-blue text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              {step === 'success' ? <Check className="h-4 w-4" /> : '2'}
            </div>
            <span className={`text-sm font-semibold ${step === 'success' ? 'text-brand-success' : step === 'review' ? 'text-brand-dark' : 'text-slate-400'}`}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'info' && (
              <Card className="border-white/70 bg-white/95 shadow-lg backdrop-blur">
                <CardContent className="pt-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleContinue()
                    }}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Jean"
                          value={orderInfo.firstName}
                          onChange={(e) => {
                            setOrderInfo((prev) => ({ ...prev, firstName: e.target.value }))
                            setErrors((prev) => ({ ...prev, firstName: undefined }))
                          }}
                          className={errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Dupont"
                          value={orderInfo.lastName}
                          onChange={(e) => {
                            setOrderInfo((prev) => ({ ...prev, lastName: e.target.value }))
                            setErrors((prev) => ({ ...prev, lastName: undefined }))
                          }}
                          className={errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jean@example.com"
                        value={orderInfo.email}
                        onChange={(e) => {
                          setOrderInfo((prev) => ({ ...prev, email: e.target.value }))
                          setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={orderInfo.phone}
                        onChange={(e) => {
                          setOrderInfo((prev) => ({ ...prev, phone: e.target.value }))
                          setErrors((prev) => ({ ...prev, phone: undefined }))
                        }}
                        className={errors.phone ? 'border-red-500 focus:ring-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes spéciales</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Remarques ou préférences..."
                        value={orderInfo.notes}
                        onChange={(e) =>
                          setOrderInfo((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        className="resize-none"
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-gold text-brand-dark hover:bg-amber-300 shadow-[0_8px_20px_-8px_rgba(255,165,0,0.4)]"
                      size="lg"
                    >
                      Continuer vers la confirmation
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 'review' && (
              <Card className="border-white/70 bg-white/95 shadow-lg backdrop-blur">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Confirm Info */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                        Vos informations
                      </p>
                      <div className="rounded-lg bg-slate-50 p-4 space-y-2 text-sm">
                        <p>
                          <span className="text-slate-600">Nom:</span>{' '}
                          <span className="font-semibold text-brand-dark">
                            {orderInfo.firstName} {orderInfo.lastName}
                          </span>
                        </p>
                        <p>
                          <span className="text-slate-600">Email:</span>{' '}
                          <span className="font-semibold text-brand-dark">{orderInfo.email}</span>
                        </p>
                        <p>
                          <span className="text-slate-600">Téléphone:</span>{' '}
                          <span className="font-semibold text-brand-dark">{orderInfo.phone}</span>
                        </p>
                        {orderInfo.notes && (
                          <p>
                            <span className="text-slate-600">Notes:</span>{' '}
                            <span className="font-semibold text-brand-dark">{orderInfo.notes}</span>
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => setStep('info')}
                        variant="ghost"
                        size="sm"
                        className="mt-3 text-brand-blue hover:text-brand-dark"
                      >
                        Modifier les informations
                      </Button>
                    </div>

                    {/* Items Summary */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                        Activités commandées
                      </p>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm rounded-lg border border-slate-200 bg-slate-50 p-3">
                            <div>
                              <p className="font-semibold text-brand-dark">{item.title}</p>
                              <p className="text-xs text-slate-600">
                                {item.price.toFixed(2)} € × {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-brand-dark">
                              {(item.price * item.quantity).toFixed(2)} €
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <Button
                        onClick={() => setStep('info')}
                        variant="outline"
                        className="flex-1"
                        disabled={isProcessing}
                      >
                        Retour
                      </Button>
                      <Button
                        onClick={handleConfirmOrder}
                        className="flex-1 bg-brand-success text-white hover:bg-emerald-600 shadow-[0_8px_20px_-8px_rgba(34,197,94,0.4)]"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Traitement...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Confirmer la commande
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div>
            <Card className="border-white/70 bg-white/95 shadow-lg backdrop-blur sticky top-24">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">
                    Résumé de la commande
                  </p>
                  <div className="space-y-2 border-b border-slate-200 pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Articles</span>
                      <span className="font-semibold text-brand-dark">{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Sous-total</span>
                      <span className="font-semibold text-brand-dark">
                        {totalPrice.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-brand-dark">Total</span>
                    <span className="font-heading text-2xl font-bold text-brand-gold">
                      {totalPrice.toFixed(2)} €
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-brand-blue/10 border border-brand-blue/20 p-3">
                  <p className="text-xs text-brand-blue font-semibold mb-1">💡 Info</p>
                  <p className="text-xs text-slate-600">
                    L'équipe K-Ré vous confirmera votre réservation dans les 24 heures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
