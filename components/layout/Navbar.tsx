'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Home', href: 'hero' },
  { label: 'Stack', href: 'tech' },
  { label: 'Projects', href: 'projects' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { activeSection, scrollToSection } = useActiveSection()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-deep-black/90 backdrop-blur-md border-b border-charcoal-border/50'
          : 'bg-transparent'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection('hero')}
          className="font-mono text-electric-blue text-lg font-bold tracking-tight hover:text-electric-blue transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go to top"
        >
          <span className="text-text-muted">&lt;</span>
          M'Nairobi
          <span className="text-text-muted"> /&gt;</span>
        </motion.button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-200',
                  activeSection === item.href
                    ? 'text-electric-blue'
                    : 'text-text-secondary hover:text-text-primary'
                )}
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-electric-blue"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 py-2 text-sm font-medium text-electric-blue border border-electric-blue/30 rounded-lg hover:bg-electric-blue/10 hover:border-electric-blue/60 hover:shadow-blue-glow-sm transition-all duration-300"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-electric-blue transition-colors"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px bg-current"
                animate={{
                  rotate: isMobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: isMobileOpen ? (i === 0 ? 10 : i === 2 ? -10 : 0) : 0,
                  opacity: isMobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="md:hidden bg-deep-charcoal/95 backdrop-blur-md border-b border-charcoal-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="px-6 py-4 flex flex-col gap-4" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => {
                      scrollToSection(item.href)
                      setIsMobileOpen(false)
                    }}
                    className={cn(
                      'w-full text-left text-base font-medium py-2 transition-colors',
                      activeSection === item.href
                        ? 'text-electric-blue'
                        : 'text-text-secondary'
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}