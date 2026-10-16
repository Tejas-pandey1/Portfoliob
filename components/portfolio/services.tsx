import { Bot, Database, Gamepad2, Globe, type LucideIcon } from 'lucide-react'
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
  {
    icon: Globe,
    title: 'Web development',
    description: 'Websites and web apps that feel good to use, load properly, and make the point without getting in the way.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Flask'],
    color: 'bg-mint',
    className: 'md:col-span-2',
  },
  {
    icon: Bot,
    title: 'AI integrations',
    description: 'Practical AI features and small tools where they genuinely help — not a chatbot awkwardly glued onto everything.',
    tags: ['Python', 'LLM APIs', 'Automation'],
    color: 'bg-sky',
  },
  {
    icon: Gamepad2,
    title: 'Game development',
    description: 'Playable experiments, gameplay systems, and little interactive worlds with personality.',
    tags: ['C#', 'Unity', 'Game mechanics'],
    color: 'bg-coral',
  },
  {
    icon: Database,
    title: 'Databases',
    description: 'Organising information properly so apps can store, find, and use data when they need it.',
    tags: ['Python', 'Flask', 'APIs', 'SQL'],
    color: 'bg-sun',
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading
        id="services-title"
        eyebrow="What I do"
        title={<>A few ways I can <span className="text-grape">make things work.</span></>}
        description="I like making useful things, figuring out the tricky bits, and giving the finished result enough polish to feel considered."
      />
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.title} className={cn('group flex flex-col gap-6 rounded-3xl border-2 p-7 shadow-pop transition-transform hover:-translate-y-1 hover:-rotate-1', service.color, service.className)}>
            <div className="flex items-center justify-between">
              <span className="flex size-14 items-center justify-center rounded-2xl border-2 bg-card transition-transform group-hover:rotate-12">
                <service.icon className="size-7" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-bold opacity-60">0{services.indexOf(service) + 1}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl font-extrabold">{service.title}</h3>
              <p className="leading-relaxed text-pretty text-foreground/75">{service.description}</p>
            </div>
            <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${service.title} tools`}>
              {service.tags.map((tag) => <li key={tag} className="rounded-full border-2 border-foreground/70 bg-card/70 px-3 py-0.5 text-xs font-bold">{tag}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
