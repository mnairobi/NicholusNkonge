// components/sections/TechStack.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiGraphql,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiJest,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiVercel,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { techStack, categoryLabels } from '@/data/techStack'
import { Technology } from '@/types'

// ✅ No SiAmazonwebservices - use FaAws instead
const ICON_MAP: Record<string, React.ElementType> = {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiGraphql,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiJest,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiVercel,
  FaAws,
  // Aliases so existing data keys still resolve
  SiAmazonwebservices: FaAws,
  SiAmazonaws: FaAws,
}

const PROFICIENCY_COLOR: Record<Technology['proficiency'], string> = {
  Expert: '#00FF99',
  Advanced: '#00F0FF',
  Intermediate: '#A0A0B8',
  Learning: '#606078',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

function TechIcon({ tech }: { tech: Technology }) {
  const IconComponent = ICON_MAP[tech.icon]

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl glow-border bg-charcoal/50 backdrop-blur-sm cursor-default"
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      data-cursor-hover
    >
      <div className="relative">
        {IconComponent ? (
          <IconComponent
            size={36}
            className="text-text-muted group-hover:text-electric-blue transition-colors duration-300"
            aria-hidden="true"
          />
        ) : (
          <span className="w-9 h-9 flex items-center justify-center text-text-muted font-mono text-xs border border-charcoal-border rounded">
            {tech.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div className="absolute inset-0 rounded-full bg-electric-blue/0 group-hover:bg-electric-blue/10 blur-xl transition-all duration-300" />
      </div>

      <span className="text-xs font-mono text-text-secondary group-hover:text-text-primary transition-colors text-center leading-tight">
        {tech.name}
      </span>

      <div
        role="tooltip"
        className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-1 pointer-events-none"
      >
        <div className="bg-charcoal-light border border-charcoal-border rounded-lg px-3 py-2 whitespace-nowrap text-xs">
          <span className="text-text-primary font-medium">{tech.name}</span>
          <span className="mx-2 text-text-muted">—</span>
          <span style={{ color: PROFICIENCY_COLOR[tech.proficiency] }}>
            {tech.proficiency}
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-charcoal-border" />
        </div>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const categories = ['frontend', 'backend', 'database', 'devops', 'cloud'] as const

  return (
    <section
      id="tech"
      className="relative py-32 bg-deep-charcoal"
      aria-label="Technology stack"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-electric-blue font-mono text-sm uppercase tracking-widest mb-4">
            Tools of the Trade
          </p>
          <h2 className="font-display text-display-md font-bold text-text-primary">
            My Tech Stack
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            A curated set of battle-tested technologies I use to build
            performant, scalable systems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category) => {
            const techs = techStack.filter((t) => t.category === category)
            if (techs.length === 0) return null

            return (
              <div key={category}>
                <motion.h3
                  className="text-text-muted text-xs font-mono uppercase tracking-widest mb-6 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <span className="flex-1 h-px bg-charcoal-border" />
                  {categoryLabels[category]}
                  <span className="flex-1 h-px bg-charcoal-border" />
                </motion.h3>
                <motion.div
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  {techs.map((tech) => (
                    <TechIcon key={tech.id} tech={tech} />
                  ))}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent" />
    </section>
  )
}