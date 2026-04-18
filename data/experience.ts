import { Experience, Skill } from '@/types'

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Full-Stack Engineer',
    company: 'TechCorp Inc.',
    startDate: 'Jan 2022',
    endDate: 'Present',
    location: 'San Francisco, CA (Remote)',
    description: 'Lead engineer on the core platform team, owning the customer-facing API and React frontend serving 200K+ users.',
    achievements: [
      'Reduced API p99 latency from 800ms to 120ms by redesigning the caching layer',
      'Led migration from monolith to microservices, completing on time with zero downtime',
      'Mentored 4 junior engineers, establishing code review culture and testing standards',
      'Built internal design system adopted by 3 product teams',
    ],
    techUsed: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
  },
  {
    id: 'exp-2',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    startDate: 'Mar 2020',
    endDate: 'Dec 2021',
    location: 'New York, NY',
    description: 'First engineering hire at a Series A startup. Built the entire product stack from scratch to support rapid growth.',
    achievements: [
      'Built MVP from zero to 10,000 users in 6 months as sole frontend engineer',
      'Implemented Stripe billing infrastructure processing $500K+ monthly',
      'Designed and built real-time notification system using WebSockets',
      'Improved Lighthouse performance score from 45 to 95',
    ],
    techUsed: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
  },
  {
    id: 'exp-3',
    role: 'Software Engineer',
    company: 'Digital Agency Co.',
    startDate: 'Jun 2018',
    endDate: 'Feb 2020',
    location: 'Austin, TX',
    description: 'Delivered custom web applications for 15+ clients across e-commerce, fintech, and healthcare sectors.',
    achievements: [
      'Delivered 12 client projects on time with 100% satisfaction rate',
      'Introduced automated testing pipeline reducing regression bugs by 70%',
      'Built headless CMS integrations for 5 major e-commerce clients',
    ],
    techUsed: ['React', 'Python', 'Django', 'PostgreSQL', 'AWS'],
  },
]

export const skills: Skill[] = [
  // Technical
  { name: 'Full-Stack Architecture', percentage: 95, category: 'technical' },
  { name: 'API Design & Integration', percentage: 92, category: 'technical' },
  { name: 'Database Optimization', percentage: 88, category: 'technical' },
  { name: 'UI/UX Implementation', percentage: 85, category: 'technical' },
  { name: 'DevOps & CI/CD', percentage: 80, category: 'technical' },
  // Soft
  { name: 'Problem Solving', percentage: 97, category: 'soft' },
  { name: 'Team Collaboration', percentage: 93, category: 'soft' },
  { name: 'Technical Leadership', percentage: 88, category: 'soft' },
  { name: 'Communication', percentage: 90, category: 'soft' },
]