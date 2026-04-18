'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiX, FiExternalLink, FiGithub, FiCheckCircle } from 'react-icons/fi'
import { Project } from '@/types'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

export function Modal({ isOpen, onClose, project }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap and keyboard nav
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', onKeyDown)
        document.body.style.overflow = ''
      }
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-deep-black/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Side Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-2xl bg-deep-charcoal border-l border-charcoal-border shadow-2xl flex flex-col"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={`Case study: ${project.title}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal-border shrink-0">
              <div>
                <p className="text-electric-blue font-mono text-xs uppercase tracking-widest mb-1">
                  Case Study
                </p>
                <h2 className="font-display text-xl font-bold text-text-primary">
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-charcoal-light transition-all duration-200"
                aria-label="Close case study"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto modal-scroll p-6 space-y-8">
              {/* Hero Image */}
              <div className="relative h-52 rounded-xl overflow-hidden bg-charcoal">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="672px"
                />
              </div>

              {/* Tech Tags */}
              <div>
                <h3 className="text-text-muted text-xs font-mono uppercase tracking-widest mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="text-neon-green font-mono text-sm">01.</span>
                  The Problem
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="text-neon-green font-mono text-sm">02.</span>
                  The Solution
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                  {project.caseStudy.solution}
                </p>
              </div>

              {/* Architecture */}
              {project.caseStudy.architecture && (
                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-neon-green font-mono text-sm">03.</span>
                    Architecture
                  </h3>
                  <div className="bg-charcoal border border-charcoal-border rounded-xl p-4">
                    <p className="text-text-secondary text-sm leading-relaxed font-mono text-xs">
                      {project.caseStudy.architecture}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <span className="text-neon-green font-mono text-sm">04.</span>
                  Key Features
                </h3>
                <ul className="space-y-2.5">
                  {project.caseStudy.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <FiCheckCircle
                        className="text-neon-green shrink-0 mt-0.5"
                        size={16}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lessons & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display text-base font-semibold text-text-primary mb-3">
                    Lessons Learned
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.caseStudy.lessonsLearned}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-text-primary mb-3">
                    Impact
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.caseStudy.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 border-t border-charcoal-border shrink-0 flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-electric-blue text-deep-black font-semibold rounded-xl hover:shadow-blue-glow transition-all duration-300 text-sm"
                >
                  <FiExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-charcoal-border text-text-secondary rounded-xl hover:border-text-muted hover:text-text-primary transition-all duration-200 text-sm"
                >
                  <FiGithub size={16} />
                  View Code
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}