import { AppWindow, Bot, Gamepad2, Globe, Database, type LucideIcon } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
  color: string
  className?: string
}

const services: Service[] = [
  { icon: Globe, title: 'Websites & frontends', description: 'Responsive websites and interfaces built to be clear, accessible, and usable across screen sizes.', tags: ['HTML', 'CSS', 'JavaScript'], color: 'bg-sun', className: 'md:col-span-2' },
  { icon: AppWindow, title: 'Web applications', description: 'Interactive web apps that connect frontend experiences with APIs and backend functionality.', tags: ['JavaScript', 'REST APIs', 'Next.js'], color: 'bg-mint' },
  { icon: Bot, title: 'AI integrations & tools', description: 'Useful AI-powered utilities and integrations that connect language models to real workflows.', tags: ['Python', 'LLM APIs', 'Groq'], color: 'bg-sky' },
  { icon: Database, title: 'Backend & data', description: 'API integrations, SQL-backed features, and data handling for practical applications.', tags: ['SQL', 'REST APIs', 'Python'], color: 'bg-card' },
  { icon: Gamepad2, title: 'Game development', description: 'Interactive game experiences and gameplay systems built with Unity and C#.', tags: ['Unity', 'C#', 'Gameplay'], color: 'bg-coral' },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading id="services-title" eyebrow="What I do" title={<>Ideas into <span className="text-grape">working projects.</span></>} description="From responsive websites and custom tools to AI integrations and games, I build digital experiences from the ground up." />
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.title} className={cn('group flex flex-col gap-6 rounded-3xl border-2 p-7 shadow-pop transition-transform hover:-translate-y-1 hover:-rotate-1', service.color, service.className)}>
            <div className="flex items-center justify-between"><span className="flex size-14 items-center justify-center rounded-2xl border-2 bg-card transition-transform group-hover:rotate-12"><service.icon className="size-7" aria-hidden="true" /></span></div>
            <div className="flex flex-col gap-2"><h3 className="font-display text-2xl font-extrabold">{service.title}</h3><p className="leading-relaxed text-pretty text-foreground/75">{service.description}</p></div>
            <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${service.title} tools`}>{service.tags.map((tag) => <li key={tag} className="rounded-full border-2 bg-card/70 px-3 py-0.5 text-xs font-bold">{tag}</li>)}</ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
