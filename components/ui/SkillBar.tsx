'use client'

import { motion } from 'framer-motion'
import { Skill } from '@/types'

interface SkillBarProps {
  skill: Skill
  delay: number
  isInView: boolean
  color?: 'blue' | 'neon'
}

export function SkillBar({ skill, delay, isInView, color = 'blue' }: SkillBarProps) {
  const barColor = color === 'neon' ? 'bg-neon-green' : 'bg-electric-blue'
  const glowColor = color === 'neon'
    ? 'shadow-[0_0_8px_rgba(0,255,153,0.6)]'
    : 'shadow-[0_0_8px_rgba(0,240,255,0.6)]'

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-text-secondary">{skill.name}</span>
        <span className="text-sm font-mono text-text-muted">{skill.percentage}%</span>
      </div>
      <div className="h-1.5 bg-charcoal-light rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor} ${glowColor}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          aria-label={`${skill.name}: ${skill.percentage}%`}
          role="progressbar"
          aria-valuenow={skill.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}