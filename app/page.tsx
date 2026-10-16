import { SiteHeader } from '@/components/portfolio/site-header'
import { Hero } from '@/components/portfolio/hero'
import { SkillMarquee } from '@/components/portfolio/skill-marquee'
import { Services } from '@/components/portfolio/services'
import { SelectedWork } from '@/components/portfolio/selected-work'
import { About } from '@/components/portfolio/about'
import { Process } from '@/components/portfolio/process'
import { Contact } from '@/components/portfolio/contact'
import { SiteFooter } from '@/components/portfolio/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <SkillMarquee />
        <Services />
        <SelectedWork />
        <About />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
