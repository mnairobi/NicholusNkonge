'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { FiDownload, FiMapPin } from 'react-icons/fi'
import { experiences, skills } from '@/data/experience'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { SkillBar } from '@/components/ui/SkillBar'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const technicalSkills = skills.filter((s) => s.category === 'technical')
  const softSkills = skills.filter((s) => s.category === 'soft')

  return (
    <section
      id="about"
      className="relative py-32 bg-deep-charcoal"
      aria-label="About me section"
      ref={ref}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-electric-blue font-mono text-sm uppercase tracking-widest mb-4">
            The Person Behind the Code
          </p>
          <h2 className="font-display text-display-md font-bold text-text-primary">
            About Me
          </h2>
        </motion.div>

        {/* Bio + Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
            Software Engineer & Frontend Developer
Specializing in React, Next.js and modern web technologies. Passionate about creating exceptional digital experiences that solve real-world problems..
              </p>
            </div>

            <div className="flex items-center gap-2 mt-6 text-text-muted text-sm">
              <FiMapPin size={14} className="text-neon-green" />
              <span>San Francisco, CA — Open to Remote</span>
            </div>

            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-electric-blue/10 border border-electric-blue/30 rounded-xl text-electric-blue font-medium hover:bg-electric-blue/20 hover:border-electric-blue/60 hover:shadow-blue-glow-sm transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
            >
              <FiDownload size={16} />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-electric-blue/10 blur-3xl scale-125" />
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-electric-blue/30 shadow-blue-glow">
                <Image
                  src="/images/klaus.jpeg"
                  alt="Nicholus Nkonge — Full-Stack Engineer"
                  fill
                  className="object-cover"
                  sizes="256px"
                  priority
                />
              </div>
              {/* Decorative orbiting dots */}
              {[0, 120, 240].map((deg) => (
                <motion.div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full bg-electric-blue border border-deep-black"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                  }}
                  animate={{ rotate: [deg, deg + 360] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-8">
              Technical Expertise
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  delay={i * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display text-xl font-bold text-text-primary mb-8">
              Soft Skills
            </h3>
            <div className="space-y-5">
              {softSkills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  delay={i * 0.1 + 0.2}
                  isInView={isInView}
                  color="neon"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display text-2xl font-bold text-text-primary mb-12 text-center">
            Experience Timeline
          </h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/40 via-electric-blue/20 to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <TimelineItem
                  key={exp.id}
                  experience={exp}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent" />
    </section>
  )
}