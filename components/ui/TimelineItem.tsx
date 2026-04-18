'use client'

import { motion } from 'framer-motion'
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi'
import { Experience } from '@/types'

interface TimelineItemProps {
  experience: Experience
  index: number
  isInView: boolean
}

export function TimelineItem({ experience, index, isInView }: TimelineItemProps) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
    >
      {/* Dot marker on timeline */}
      <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 z-10">
        <motion.div
          className="w-4 h-4 rounded-full bg-electric-blue border-2 border-deep-black shadow-blue-glow-sm"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
        />
      </div>

      {/* Content Card */}
      <div className={`ml-16 md:ml-0 md:w-5/12 ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
        <div className="p-6 bg-charcoal rounded-2xl glow-border hover:border-electric-blue/30 transition-all duration-300">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-display text-base font-bold text-text-primary">
                {experience.role}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <FiBriefcase size={12} className="text-electric-blue" />
                <span className="text-electric-blue text-sm font-medium">
                  {experience.company}
                </span>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-xs font-mono rounded-full shrink-0 ${
              experience.endDate === 'Present'
                ? 'bg-neon-green/15 text-neon-green border border-neon-green/30'
                : 'bg-charcoal-light text-text-muted border border-charcoal-border'
            }`}>
              {experience.endDate === 'Present' ? 'Current' : experience.endDate}
            </span>
          </div>

          {/* Dates & Location */}
          <p className="text-text-muted text-xs font-mono mb-4">
            {experience.startDate} → {experience.endDate} · {experience.location}
          </p>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {experience.description}
          </p>

          {/* Achievements */}
          <ul className="space-y-1.5">
            {experience.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                <FiCheckCircle size={12} className="text-neon-green/70 shrink-0 mt-0.5" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  )
}