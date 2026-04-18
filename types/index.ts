export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  tags: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudy: {
    problem: string
    solution: string
    architecture?: string  // Text description of architecture
    keyFeatures: string[]
    lessonsLearned: string
    impact: string
    images?: string[]
  }
  featured?: boolean
}

export interface Technology {
  id: string
  name: string
  icon: string  // react-icons component name
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'cloud'
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning'
  color?: string
}

export interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string | 'Present'
  location: string
  description: string
  achievements: string[]
  techUsed: string[]
}

export interface Skill {
  name: string
  percentage: number
  category: 'technical' | 'soft'
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export type FilterTag = 'All' | 'React' | 'Node.js' | 'Python' | 'Docker' | 'TypeScript' | 'PostgreSQL'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}