// components/sections/Hero.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin, FiPhone } from 'react-icons/fi'
import Image from 'next/image'
import { useActiveSection } from '@/hooks/useActiveSection'

// ── Roles Rotator ────────────────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'Software Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
]

function useRoleRotator(interval = 3000) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval])

  return roles[index]
}

// ── Floating Particles (Subtle) ─────────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-electric-blue/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Stats Counter ────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * value))

      if (progress < 1) requestAnimationFrame(animate)
    }

    const timeout = setTimeout(animate, 1500)
    return () => clearTimeout(timeout)
  }, [value])

  return (
    <span className="font-display font-bold text-2xl md:text-3xl text-text-primary">
      {count}{suffix}
    </span>
  )
}

// ── Hero Component ───────────────────────────────────────────
export function Hero() {
  const { scrollToSection } = useActiveSection()
  const containerRef = useRef<HTMLDivElement>(null)
  const currentRole = useRoleRotator(3000)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background Layers ─────────────────────────────── */}
      <div className="absolute inset-0 bg-deep-black" />
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />
      <FloatingParticles />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-green/8 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      {/* ── Main Content ──────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20"
        style={{ y, opacity, scale }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Text Content ────────────────────────── */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Greeting badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full border border-electric-blue/20 bg-electric-blue/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
              </span>
              <span className="text-electric-blue text-sm font-mono">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-text-secondary text-lg md:text-xl mb-2 font-light">
                Hi, I'm
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.05]">
                <span className="text-text-primary">Nicholus</span>
                <br />
                <span className="gradient-text">Nkonge</span>
              </h1>
            </motion.div>

            {/* Rotating role */}
            <motion.div
              className="mb-6 h-10 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-text-muted font-mono text-sm mr-2">{'>'}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  className="text-electric-blue font-mono text-lg"
                  initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4 }}
                >
                  {currentRole}
                </motion.span>
              </AnimatePresence>
              <span className="typing-cursor ml-1" aria-hidden="true" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
               Specializing in React, Next.js, and modern web technologies, I’m passionate
  about creating exceptional digital experiences that solve real-world problems.
            </motion.p>


<div className="flex items-center gap-4 mt-6 text-text-muted text-sm mb-10 flex-wrap">
  <div className="flex items-center gap-2">
    <FiMapPin size={14} className="text-neon-green" />
    <span>Nairobi, Kenya — Open to Remote</span>
  </div>

  <div className="flex items-center gap-2">
    <FiPhone size={14} className="text-neon-green" />
    <a href="tel:+254757964069" className="hover:text-white transition">
      +254 757 964 069
    </a>
  </div>
</div>
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-electric-blue text-deep-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-blue-glow hover:scale-[1.03] active:scale-[0.98]"
                data-cursor-hover
              >
                <span className="relative z-10">View My Work</span>
                <FiArrowRight
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <motion.a
                href="/Nicholus Nkonge.pdf"
                download
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-electric-blue/30 text-electric-blue font-medium rounded-xl hover:bg-electric-blue/10 hover:border-electric-blue/60 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-cursor-hover
              >
                <FiDownload size={18} />
                Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span className="text-text-muted text-xs font-mono uppercase tracking-wider mr-2">
                Find me
              </span>
              <div className="h-px w-8 bg-charcoal-border" />
              {[
                { icon: FiGithub,   href: 'https://github.com/mnairobi',     label: 'GitHub' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/nicholusnkonge', label: 'LinkedIn' },
                { icon: FiMail,     href: 'mailto:nicholuskiriinya7@gmail.com',        label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2.5 rounded-lg border border-charcoal-border bg-charcoal/50 text-text-muted hover:text-electric-blue hover:border-electric-blue/40 hover:bg-electric-blue/5 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor-hover
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Image + Decoration ─────────────────── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-blue/20 to-neon-green/10 blur-3xl scale-150" />

              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-electric-blue/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-electric-blue" />
              </motion.div>

              {/* Second ring */}
              <motion.div
                className="absolute -inset-10 rounded-full border border-dashed border-neon-green/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-neon-green/60" />
              </motion.div>

              {/* Image container */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-electric-blue/30 shadow-2xl">
                <Image
                  src="/images/klaus1.png"
                  alt="Nicholus Nkonge"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating tech badges */}
              <motion.div
                className="absolute -right-4 top-12 px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-xs font-mono text-electric-blue shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                {'<Next.js />'}
              </motion.div>

              <motion.div
                className="absolute -left-6 top-1/2 px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-xs font-mono text-neon-green shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                {'TypeScript'}
              </motion.div>

              <motion.div
                className="absolute -right-2 bottom-16 px-3 py-1.5 rounded-lg bg-charcoal border border-charcoal-border text-xs font-mono text-purple-400 shadow-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                {'Node.js'}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats Bar ───────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-charcoal-border/50"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
        >
          {[
            { value: 3, suffix: '+', label: 'Years Experience' },
            { value: 10, suffix: '+', label: 'Projects Completed' },
            { value: 15, suffix: '+', label: 'Technologies' },
            { value: 100, suffix: '%', label: 'Passion for Code' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-text-muted text-xs font-mono mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Scroll Indicator ────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span className="text-text-muted text-xs font-mono uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-electric-blue/30 flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-electric-blue"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}