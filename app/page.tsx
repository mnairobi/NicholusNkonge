import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TechStack } from '@/components/sections/TechStack'
import { Projects } from '@/components/sections/Projects'
// import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <TechStack />
        <Projects />
        {/* <About /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}