import { Technology } from '@/types'

export const techStack: Technology[] = [
  // Frontend
  { id: 'react', name: 'React', icon: 'SiReact', category: 'frontend', proficiency: 'Expert', color: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', icon: 'SiTypescript', category: 'frontend', proficiency: 'Expert', color: '#3178C6' },
  { id: 'nextjs', name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend', proficiency: 'Expert' },
  { id: 'graphql', name: 'GraphQL', icon: 'SiGraphql', category: 'frontend', proficiency: 'Advanced', color: '#E10098' },
  // Backend
  { id: 'nodejs', name: 'Node.js', icon: 'SiNodedotjs', category: 'backend', proficiency: 'Expert', color: '#339933' },
  { id: 'python', name: 'Python', icon: 'SiPython', category: 'backend', proficiency: 'Advanced', color: '#3776AB' },
  { id: 'fastapi', name: 'FastAPI', icon: 'SiFastapi', category: 'backend', proficiency: 'Advanced', color: '#009688' },
  { id: 'jest', name: 'Jest', icon: 'SiJest', category: 'backend', proficiency: 'Advanced', color: '#C21325' },
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', icon: 'SiPostgresql', category: 'database', proficiency: 'Expert', color: '#336791' },
  { id: 'redis', name: 'Redis', icon: 'SiRedis', category: 'database', proficiency: 'Advanced', color: '#DC382D' },
  { id: 'mongodb', name: 'MongoDB', icon: 'SiMongodb', category: 'database', proficiency: 'Intermediate', color: '#47A248' },
  // DevOps
  { id: 'docker', name: 'Docker', icon: 'SiDocker', category: 'devops', proficiency: 'Advanced', color: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', icon: 'SiKubernetes', category: 'devops', proficiency: 'Intermediate', color: '#326CE5' },
  { id: 'github-actions', name: 'GitHub Actions', icon: 'SiGithubactions', category: 'devops', proficiency: 'Advanced' },
  // Cloud
  { id: 'aws', name: 'AWS', icon: 'SiAmazonaws', category: 'cloud', proficiency: 'Advanced' },
  { id: 'vercel', name: 'Vercel', icon: 'SiVercel', category: 'cloud', proficiency: 'Expert' },
]

export const categoryLabels: Record<Technology['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  devops: 'DevOps',
  cloud: 'Cloud & Deployment',
}