'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'
import projectsData from '@/data/projects.json'

type Project = (typeof projectsData)[number]
const colors: Record<string, string> = {
  mint: 'bg-mint',
  sky: 'bg-sky',
  coral: 'bg-coral',
  sun: 'bg-sun',
  card: 'bg-card',
}

export function SelectedWork() {
  const [showAll, setShowAll] = useState(false)
  const [projects, setProjects] = useState<Project[]>(projectsData as Project[])

  useEffect(() => {
    fetch('/api/admin/projects', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: Project[]) => { if (Array.isArray(data)) setProjects(data) })
      .catch(() => {})
  }, [])

  const sortedProjects = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  const visibleProjects = showAll ? sortedProjects : sortedProjects.slice(0, 4)

  return (
    <section id="work" aria-labelledby="work-title" className="border-y-2 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <SectionHeading
          id="work-title"
          eyebrow="The project shelf"
          tagClassName="bg-coral"
          title={<>Little ideas, <span className="text-coral">real builds.</span></>}
          description="A living collection of things I’ve made, tested, or am exploring. The newest featured projects sit up front; the rest are one click away."
        />
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {visibleProjects.map((project, i) => (
            <li key={project.id} className={cn(i % 2 === 1 && 'md:mt-12')}>
              <article className="group flex flex-col gap-5">
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`} className={cn('relative block overflow-hidden rounded-3xl border-2 p-4 shadow-pop transition-transform group-hover:-translate-y-1', colors[project.color] ?? 'bg-card')}>
                  <Image src={project.image} alt={`Preview for ${project.title}`} width={1200} height={750} unoptimized className="aspect-[16/10] w-full rounded-2xl border-2 object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute top-7 right-7 rotate-2 rounded-full border-2 bg-card px-3 py-1 text-xs font-bold shadow-pop-sm">{project.linkLabel} ↗</span>
                </a>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-muted-foreground">{project.category}</p>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight">{project.title}</h3>
                    <p className="max-w-md leading-relaxed text-pretty text-muted-foreground">{project.description}</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${project.title} tools`}>
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
        {sortedProjects.length > 4 && (
          <div className="mt-14 border-y border-foreground/15">
            <button type="button" onClick={() => setShowAll(!showAll)} className="flex w-full items-center justify-between py-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              <span>{showAll ? 'Show fewer projects' : 'See more projects'}</span>
              <ArrowDown className={cn('size-4 transition-transform', showAll && 'rotate-180')} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
