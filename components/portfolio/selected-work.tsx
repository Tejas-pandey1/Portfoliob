import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

type Project = {
  title: string
  category: string
  description: string
  image: string
  stack: string[]
  color: string
  href: string
  linkLabel: string
}

const projects: Project[] = [
  {
    title: 'AI Web Scraper',
    category: 'Developer tool · Personal project',
    description: 'A fast AI-assisted web scraping utility built with Streamlit and Groq. It removes heavy, irrelevant DOM elements and turns page content into clean JSON data.',
    image: '/images/project-ai.png',
    stack: ['Python', 'Streamlit', 'Groq API', 'JSON'],
    color: 'bg-mint',
    href: 'https://github.com/Tejas-pandey1/ai-web-scraper',
    linkLabel: 'View source',
  },
  {
    title: 'Indie Game Development',
    category: 'Game development',
    description: 'I’ve independently shipped an indie game and enjoy building interactive experiences, gameplay systems, and polished player-facing details.',
    image: '/images/project-game.png',
    stack: ['Unity', 'C#', 'Game design'],
    color: 'bg-coral',
    href: 'https://github.com/Tejas-pandey1',
    linkLabel: 'Explore GitHub',
  },
  {
    title: 'Concept Websites',
    category: 'Self-initiated concepts · Demo work',
    description: 'Fictional business website concepts created to demonstrate web design and development skills. These are concept projects, not client commissions.',
    image: '/images/project-verde.png',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    color: 'bg-sun',
    href: 'https://github.com/Tejas-pandey1',
    linkLabel: 'Explore projects',
  },
  {
    title: 'Custom Web & AI Tools',
    category: 'Full-stack development',
    description: 'I build practical web experiences and integrations, connecting clear interfaces with APIs, data, and AI/LLM services where they add value.',
    image: '/images/project-ledger.png',
    stack: ['JavaScript', 'REST APIs', 'SQL', 'AI/LLM APIs'],
    color: 'bg-sky',
    href: 'https://github.com/Tejas-pandey1',
    linkLabel: 'Explore GitHub',
  },
]

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-y-2 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          tagClassName="bg-coral"
          title={<>Projects built with <span className="text-coral">curiosity.</span></>}
          description="A mix of personal tools, game development, and clearly labelled concept work. No made-up client names or performance numbers."
        />
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.title} className={cn(i % 2 === 1 && 'md:mt-16')}>
              <article className="group flex flex-col gap-5">
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`} className={cn('relative block overflow-hidden rounded-3xl border-2 p-4 shadow-pop transition-transform group-hover:-translate-y-1', project.color)}>
                  <Image src={project.image} alt={`Illustrative preview for ${project.title}`} width={1200} height={750} className="aspect-[16/10] w-full rounded-2xl border-2 object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute top-7 right-7 rotate-3 rounded-full border-2 bg-card px-3 py-1 text-xs font-bold shadow-pop-sm">{project.linkLabel} ↗</span>
                </a>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-muted-foreground">{project.category}</p>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">{project.title}</h3>
                    <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">{project.description}</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
                      {project.stack.map((tech) => <li key={tech} className="rounded-full border-2 px-3 py-0.5 text-xs font-bold">{tech}</li>)}
                    </ul>
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`} className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-sun transition-transform hover:rotate-45">
                    <ArrowUpRight className="size-5" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
