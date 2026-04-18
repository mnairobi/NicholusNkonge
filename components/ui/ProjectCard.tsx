'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiFileText } from 'react-icons/fi'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onCaseStudy: () => void
}

export function ProjectCard({ project, onCaseStudy }: ProjectCardProps) {
  return (
    <article
      className="group relative bg-charcoal rounded-2xl overflow-hidden glow-border flex flex-col transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image */}
      <div className="relative h-56 overflow-hidden bg-charcoal-light">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQG/8QAIxAAAQMEAgMBAAAAAAAAAAAAAQIDBAAFESExQRP/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ao+mXrxqXqFUmVdFryCHRkUqSFoUk8A4z3x37qJdbsGMm3w7Xu8hJKCtSXFpwMkYyM8k0UUAG/9k="
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-neon-green/20 border border-neon-green/40 rounded-full text-neon-green text-xs font-mono">
            Featured
          </div>
        )}

        {/* Hover overlay with quick links */}
        <div className="absolute inset-0 bg-deep-black/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-electric-blue/40 text-electric-blue hover:bg-electric-blue/20 hover:shadow-blue-glow-sm transition-all duration-200"
              aria-label={`View live demo of ${project.title}`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-charcoal-border text-text-secondary hover:border-text-primary hover:text-text-primary transition-all duration-200"
              aria-label={`View ${project.title} on GitHub`}
            >
              <FiGithub size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-electric-blue transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
          {project.tagline}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-charcoal-light border border-charcoal-border rounded-md text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2.5 py-1 text-xs font-mono text-text-muted">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-charcoal-border">
          <button
            onClick={onCaseStudy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-electric-blue/10 border border-electric-blue/30 rounded-lg text-electric-blue text-sm font-medium hover:bg-electric-blue/20 hover:border-electric-blue/60 hover:shadow-blue-glow-sm transition-all duration-200"
            data-cursor-hover
          >
            <FiFileText size={14} />
            Case Study
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-charcoal-border rounded-lg text-text-secondary text-sm hover:text-text-primary hover:border-text-muted transition-all duration-200"
              data-cursor-hover
            >
              <FiExternalLink size={14} />
              Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-charcoal-border rounded-lg text-text-secondary text-sm hover:text-text-primary hover:border-text-muted transition-all duration-200"
              data-cursor-hover
            >
              <FiGithub size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}