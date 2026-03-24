'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis.'),
  email: z.string().email('Veuillez entrer un email valide.'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Le sujet est requis.'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères.'),
  company: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'success' | 'error'
    message: string
  }>({ status: 'idle', message: '' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      company: '',
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    if (values.company) {
      setSubmitState({
        status: 'success',
        message: 'Message transmis.',
      })
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState({
        status: 'error',
        message:
          "Configuration EmailJS incomplète. Vérifiez les variables d'environnement.",
      })
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: values.name,
          from_email: values.email,
          phone: values.phone || 'Non renseigné',
          subject: values.subject,
          message: values.message,
        },
        publicKey
      )

      setSubmitState({
        status: 'success',
        message: 'Merci, votre message a bien été envoyé.',
      })
      reset()
    } catch {
      setSubmitState({
        status: 'error',
        message: "Échec de l'envoi. Merci de réessayer dans quelques instants.",
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gsap-reveal rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      aria-label="Formulaire de contact"
    >
      <p className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">
        Formulaire
      </p>
      <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
        Écrivez-nous
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Réponse rapide de notre équipe locale K-Ré.
      </p>

      <div className="mt-6 space-y-4">
        <div className="hidden">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            tabIndex={-1}
            autoComplete="off"
            {...register('company')}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nom *</Label>
            <Input id="name" aria-label="Nom" {...register('name')} />
            {errors.name ? (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" aria-label="Email" {...register('email')} />
            {errors.email ? (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Téléphone</Label>
          <Input id="phone" aria-label="Téléphone" {...register('phone')} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject">Sujet *</Label>
          <Input id="subject" aria-label="Sujet" {...register('subject')} />
          {errors.subject ? (
            <p className="text-xs text-red-600">{errors.subject.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            aria-label="Message"
            {...register('message')}
            placeholder="Votre message (20 caractères minimum)"
          />
          {errors.message ? (
            <p className="text-xs text-red-600">{errors.message.message}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-blue hover:bg-sky-600"
          aria-label="Envoyer le message"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Envoi en cours...
            </>
          ) : (
            'Envoyer'
          )}
        </Button>

        {submitState.status !== 'idle' ? (
          <p
            className={
              submitState.status === 'success'
                ? 'text-sm font-medium text-green-600'
                : 'text-sm font-medium text-red-600'
            }
            role="status"
          >
            {submitState.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}
