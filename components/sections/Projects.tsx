'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import { projects, FILTER_TAGS } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Modal } from '@/components/ui/Modal'
import { Project, FilterTag } from '@/types'
import { filterProjects, debounce } from '@/lib/utils'

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState<FilterTag>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounced search state for performance
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value: string) => setDebouncedQuery(value), 200),
    []
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    debouncedSetQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setDebouncedQuery('')
  }

  const filteredProjects = useMemo(
    () => filterProjects(projects, debouncedQuery, activeTag),
    [debouncedQuery, activeTag]
  )

  const openCaseStudy = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <section
      id="projects"
      className="relative py-32 bg-deep-black"
      aria-label="Projects section"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-electric-blue font-mono text-sm uppercase tracking-widest mb-4">
            What I've Built
          </p>
          <h2 className="font-display text-display-md font-bold text-text-primary">
            Featured Projects
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            A selection of real-world applications demonstrating full-stack
            depth, architectural thinking, and user-centric design.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          className="mb-12 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search Input */}
          <div className="relative max-w-lg mx-auto">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search projects by keyword, tech, or topic..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-11 py-3.5 bg-charcoal border border-charcoal-border rounded-xl text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-electric-blue/60 focus:ring-2 focus:ring-electric-blue/20 focus:shadow-blue-glow-sm transition-all duration-300"
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Clear search"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          {/* Filter Tags */}
          <div
            className="flex flex-wrap justify-center gap-3"
            role="group"
            aria-label="Filter projects by technology"
          >
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag as FilterTag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeTag === tag
                    ? 'bg-electric-blue/15 border-electric-blue/60 text-electric-blue shadow-blue-glow-sm'
                    : 'bg-transparent border-charcoal-border text-text-secondary hover:border-electric-blue/30 hover:text-text-primary'
                }`}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-text-muted text-sm" aria-live="polite">
            {filteredProjects.length === projects.length
              ? `Showing all ${projects.length} projects`
              : `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`}
          </p>
        </motion.div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          role="list"
          aria-label="Projects list"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  role="listitem"
                >
                  <ProjectCard
                    project={project}
                    onCaseStudy={() => openCaseStudy(project)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                className="col-span-full text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-text-muted text-lg mb-2">No projects found</p>
                <p className="text-text-muted text-sm">
                  Try a different search term or filter
                </p>
                <button
                  onClick={() => { clearSearch(); setActiveTag('All') }}
                  className="mt-4 text-electric-blue text-sm hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />
    </section>
  )
}