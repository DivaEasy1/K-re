'use client'

import { useState } from 'react'
import { Check, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('Veuillez entrer un email valide.')
      return
    }

    setStatus('loading')
    try {
      // Replace with your actual newsletter API
      // Example: Mailchimp, Brevo, or custom endpoint
      await new Promise((resolve) => setTimeout(resolve, 800))

      setStatus('success')
      setMessage('Merci ! Verifiez votre email pour confirmer votre inscription.')
      setEmail('')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch {
      setStatus('error')
      setMessage('Une erreur est survenue. Veuillez reessayer.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="h-12 w-full rounded-2xl border border-slate-300/85 bg-white pl-10 pr-4 text-sm text-brand-dark placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={status === 'loading'}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={status === 'loading' || status === 'success'}
          className="min-w-40 bg-brand-dark text-white hover:bg-slate-800"
        >
          {status === 'loading' && 'Envoi...'}
          {status === 'success' && <Check className="h-4 w-4" />}
          {status !== 'loading' && status !== 'success' && "S'abonner"}
        </Button>
      </div>
      {message ? (
        <p
          className={`text-xs font-medium ${
            status === 'success' ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}
