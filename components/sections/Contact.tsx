'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  FiGithub, FiLinkedin, FiTwitter,
  FiSend, FiMail, FiLoader
} from 'react-icons/fi'
import { contactFormSchema, ContactFormSchema } from '@/lib/validations'
import { Toast } from '@/components/ui/Toast'

const SOCIAL_LINKS = [
  {
    icon: FiGithub,
    href: 'https://github.com/mnairobi',
    label: 'GitHub',
    username: '@mnairobi',
  },
  {
    icon: FiLinkedin,
    href: 'www.linkedin.com/in/nick-software-engineer',
    label: 'LinkedIn',
    username: 'nick-software-engineer',
  },
  {
    icon: FiTwitter,
    href: 'https://x.com/nkongejr',
    label: 'Twitter / X',
    username: '@nkongejr',
  },
  {
    icon: FiMail,
    href: 'mailto:nicholuskiriinya7@gmail.com',
    label: 'Email',
    username: 'nicholuskiriinya7@gmail.com',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      subject: 'Inquiry from Portfolio',
    },
  })

  const showToastMessage = (msg: string, type: 'success' | 'error') => {
    setToastMessage(msg)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const onSubmit = async (data: ContactFormSchema) => {
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'Failed to send')

      setFormState('success')
      reset()
      showToastMessage(
        "Message sent successfully! I'll get back to you within 24 hours. 🚀",
        'success'
      )
    } catch (error) {
      setFormState('error')
      showToastMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again or email directly.',
        'error'
      )
    } finally {
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-charcoal border rounded-xl text-text-primary placeholder:text-text-muted text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20'
        : 'border-charcoal-border focus:border-electric-blue/60 focus:ring-electric-blue/20 focus:shadow-blue-glow-sm'
    }`

  return (
    <section
      id="contact"
      className="relative py-32 bg-deep-black"
      aria-label="Contact section"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-electric-blue font-mono text-sm uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-display-md font-bold text-text-primary mb-4">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span> Together.
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            Have a project in mind? Looking for a technical co-founder? Or just
            want to talk tech? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
              className="space-y-5"
            >
              {/* Name + Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-text-secondary mb-1.5 font-medium"
                  >
                    Full Name <span className="text-electric-blue">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    {...register('name')}
                    className={inputClasses(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-text-secondary mb-1.5 font-medium"
                  >
                    Email Address <span className="text-electric-blue">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    autoComplete="email"
                    {...register('email')}
                    className={inputClasses(!!errors.email)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-text-secondary mb-1.5 font-medium"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Inquiry from Portfolio"
                  {...register('subject')}
                  className={inputClasses(!!errors.subject)}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-text-secondary mb-1.5 font-medium"
                >
                  Message <span className="text-electric-blue">*</span>
                </label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project, timeline, and what you're looking to achieve..."
                  rows={6}
                  {...register('message')}
                  className={`${inputClasses(!!errors.message)} resize-y min-h-[140px]`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={formState === 'loading' || formState === 'success'}
                className="w-full relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-electric-blue text-deep-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-blue-glow hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                {formState === 'loading' ? (
                  <>
                    <FiLoader className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : formState === 'success' ? (
                  <>
                    ✓ Message Sent!
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Send Message
                    {/* Shimmer */}
                    <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity" />
                  </>
                )}
              </motion.button>

              <p className="text-text-muted text-xs text-center">
                I typically respond within 24 hours. For urgent matters, email
                directly at{' '}
                <a
                  href="mailto:hello@alexchen.dev"
                  className="text-electric-blue hover:underline"
                >
                 nicholuskiriinya7@gmail.com
                 
                </a>
              </p>
            </form>
          </motion.div>

          {/* Social Links + Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                  Let's connect
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Whether it's a full-time role, contract work, or an exciting
                  side project—I'd love to hear about it.
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-4 p-4 rounded-xl glow-border bg-charcoal/30 hover:bg-charcoal/60 transition-all duration-300"
                    data-cursor-hover
                  >
                    <div className="p-2.5 rounded-lg bg-charcoal-light group-hover:bg-electric-blue/10 transition-colors duration-300">
                      <link.icon
                        size={20}
                        className="text-text-muted group-hover:text-electric-blue transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-text-primary text-sm font-medium">
                        {link.label}
                      </p>
                      <p className="text-text-muted text-xs font-mono">
                        {link.username}
                      </p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-electric-blue" />
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability indicator */}
              <div className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/20">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
                    <span className="text-neon-green text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                <p className="text-text-muted text-xs mt-2 leading-relaxed">
                  Currently open to full-time senior/lead roles and select
                  consulting engagements. Typical response time: &lt;24hrs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  )
}