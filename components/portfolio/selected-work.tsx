import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

type Project = {
  title: string
  category: string
  year: string
  description: string
  image: string
  stack: string[]
  color: string
  result: string
}

const projects: Project[] = [
  {
    title: 'Quill AI',
    category: 'AI integration',
    year: '2026',
    description: 'A writing copilot that suggests edits in context, summarizes docs, and learns your tone.',
    image: '/images/project-ai.png',
    stack: ['Next.js', 'AI SDK', 'Postgres'],
    color: 'bg-mint',
    result: '12k weekly users',
  },
  {
    title: 'Hop Hero',
    category: 'Browser game',
    year: '2025',
    description: 'A bouncy platformer with 40 hand-built levels, leaderboards, and buttery 60fps on mobile.',
    image: '/images/project-game.png',
    stack: ['Phaser', 'TypeScript', 'Supabase'],
    color: 'bg-coral',
    result: '180k plays',
  },
  {
    title: 'Atlas Trips',
    category: 'Mobile app',
    year: '2025',
    description: 'Collaborative trip planner with live maps, shared itineraries, and offline mode.',
    image: '/images/project-atlas.png',
    stack: ['React Native', 'Mapbox', 'Node'],
    color: 'bg-sky',
    result: '4.8 App Store rating',
  },
  {
    title: 'Verde Studio',
    category: 'Responsive website',
    year: '2024',
    description: 'E-commerce site for a plant shop — mobile-first, lightning fast, and a joy to browse.',
    image: '/images/project-verde.png',
    stack: ['Next.js', 'Shopify', 'Tailwind'],
    color: 'bg-sun',
    result: '+62% conversions',
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
          title={
            <>
              Things {"I've"} <span className="text-coral">shipped</span> lately.
            </>
          }
          description="A handful of favorite projects — each one a mix of solid engineering, thoughtful design, and a dash of fun."
        />

        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.title} className={cn(i % 2 === 1 && 'md:mt-16')}>
              <article className="group flex flex-col gap-5">
                <a
                  href="#contact"
                  className={cn(
                    'relative block overflow-hidden rounded-3xl border-2 p-4 shadow-pop transition-transform group-hover:-translate-y-1',
                    project.color,
                  )}
                >
                  <span className="sr-only">{`Ask about ${project.title}`}</span>
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`Screenshot of ${project.title}`}
                    width={1200}
                    height={750}
                    className="aspect-[16/10] w-full rounded-2xl border-2 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute top-7 right-7 rotate-3 rounded-full border-2 bg-card px-3 py-1 text-xs font-bold shadow-pop-sm">
                    {project.result}
                  </span>
                </a>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {project.category} · {project.year}
                    </p>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">{project.title}</h3>
                    <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">{project.description}</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${project.title} stack`}>
                      {project.stack.map((tech) => (
                        <li key={tech} className="rounded-full border-2 px-3 py-0.5 text-xs font-bold">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-sun transition-transform group-hover:rotate-45"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
