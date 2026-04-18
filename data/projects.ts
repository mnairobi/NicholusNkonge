import { Project } from '@/types'

export const FILTER_TAGS = ['All', 'React', 'Node.js', 'Python', 'Docker', 'TypeScript', 'PostgreSQL'] as const

export const projects: Project[] = [
{
  id: 'sanaa',
  title: 'Sanaa-Ke (ArtMarket Kenya)',
  tagline: 'A digital art marketplace with IPFS-powered certificates of authenticity for Kenyan artists.',
  description: 'A full-stack marketplace enabling Kenyan artists to securely sell and certify original artwork using decentralized verification (IPFS), modern checkout flows, and role-based access control.',

  image: '/images/projects/sanaa.png',
  tags: ['Flask', 'JavaScript', 'Tailwind', 'IPFS', 'Web3'],
  techStack: [
    'Flask',
    'Flask-RESTful',
    'SQLAlchemy',
    'PostgreSQL',
    'IPFS (Pinata)',
    'Web3.py',
    'HTML',
    'Tailwind CSS',
    'JavaScript'
  ],

  liveUrl: 'https://sanaa-ke.vercel.app/',
  githubUrl: 'https://github.com/mnairobi/ArtMarketKenya',
  featured: true,

  caseStudy: {
    problem: 'Kenyan artists face challenges proving authenticity, protecting their work from duplication, and accessing secure digital marketplaces. Traditional systems lack trust, transparency, and verifiable ownership records.',

    solution: 'Developed a full-stack art marketplace with a built-in certificate of authenticity (COA) system using IPFS. Each artwork can be issued a tamper-proof certificate stored on IPFS, with QR-based verification and cryptographic hashing to ensure integrity.',

    architecture: 'Frontend (HTML + Tailwind + JS) → Flask REST API → SQLAlchemy ORM → PostgreSQL/SQLite → IPFS (Pinata) for certificate storage → Web3.py for hashing and verification logic.',

    keyFeatures: [
      'Artwork marketplace with categories and artist portfolios',
      'Shopping cart and checkout flow with shipping logic',
      'Planned mobile payments (M-Pesa, Airtel Money)',
      'IPFS-based certificates of authenticity (COA)',
      'QR code verification system for artwork legitimacy',
      'Role-based access (Buyer, Artist, Admin)',
      'Admin-controlled certificate issuance workflow'
    ],

    lessonsLearned: 'Integrating IPFS introduced new considerations around data persistence, pinning, and retrieval reliability. Learned how to design hybrid systems combining Web2 UX with Web3-style verification. Also improved backend structuring using Flask services and modular architecture.',

    impact: 'Created a trust layer for digital art commerce by introducing verifiable authenticity. The platform demonstrates how local artists can leverage decentralized technologies to reach wider markets while protecting their work.',

    images: [
      '/images/projects/sanaa-1.png',
      // '/images/projects/project-1-detail-2.jpg'
    ],
  },
},
  {
  id: 'uca-campaign-platform',
  title: 'UCA Campaign Platform',
  tagline: 'A modern Next.js campaign platform for student leadership elections.',
  description: 'A fast, responsive campaign website built with Next.js to showcase the United Comrades Alliance (UCA) vision, manifesto, leadership team, and election details for Murang’a University 2026.',
  image: '/images/projects/uca.png',
  tags: ['Next.js', 'React', 'Frontend', 'Campaign'],
  techStack: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Vercel',
  ],
  liveUrl: 'https://uca11thmutsocouncil.co.ke/', // replace with actual deployment
  githubUrl: 'https://github.com/mnairobi/UCA',
  featured: true,

  caseStudy: {
    problem: 'Student election campaigns lacked a centralized, accessible, and modern digital presence. Campaign information was scattered across posters and social media, making it hard for students to fully understand manifestos and leadership structures.',
    
    solution: 'Built a high-performance campaign website using Next.js with a focus on speed, clarity, and mobile-first design. The platform centralizes manifesto content, leadership profiles, and election details into a single intuitive interface.',
    
    architecture: 'Next.js App Router with server-side rendering (SSR) and static site generation (SSG) for optimal performance. Component-based UI with reusable sections (Hero, Manifesto, Delegates, FAQ). Tailwind CSS for styling and Framer Motion for smooth animations. Deployed on Vercel for edge performance.',
    
    keyFeatures: [
      'SEO-optimized pages using Next.js metadata',
      'Election countdown timer with real-time updates',
      'Modular manifesto sections for easy content updates',
      'Leadership profiles with structured role hierarchy',
      'Smooth animations using Framer Motion',
      'Fully responsive design (mobile-first)',
      'Fast load times with static generation',
    ],
    
    lessonsLearned: 'Using Next.js significantly improved performance and SEO compared to a standard React SPA. Structuring content as reusable components made it easier to scale and maintain. Prioritizing mobile UX had the biggest impact on engagement.',
    
    impact: 'Delivered a professional, fast-loading campaign platform that improved student engagement and accessibility to campaign information. Helped present UCA as organized, transparent, and tech-forward during the election period.',
  },
}
]