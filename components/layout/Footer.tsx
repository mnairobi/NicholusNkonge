'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'

const SOCIAL = [
  { icon: FiGithub, href: 'https://github.com/mnairobi', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/nick-software-engineer', label: 'LinkedIn' },
  { icon: FiTwitter, href: 'https://twitter.com/nkongejr', label: 'Twitter' },
]

const NAV_LINKS = [
  { label: 'Tech Stack', id: 'tech' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-deep-charcoal border-t border-charcoal-border py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-mono text-electric-blue text-xl font-bold mb-4">
              <span className="text-text-muted">&lt;</span>
              M'Nairobi
              <span className="text-text-muted"> /&gt;</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Full-Stack Engineer crafting digital futures, one elegant
              solution at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-text-muted text-sm hover:text-electric-blue transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-4 uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex gap-4">
              {SOCIAL.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-charcoal border border-charcoal-border text-text-muted hover:text-electric-blue hover:border-electric-blue/30 hover:shadow-blue-glow-sm transition-all duration-200"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-sm">
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <FiHeart size={12} className="text-red-400 inline" aria-hidden="true" />
            {' '}using Next.js, Tailwind CSS & Framer Motion
          </p>
          <p>© {new Date().getFullYear()} M'Nairobi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}