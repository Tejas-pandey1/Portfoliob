import { AppWindow, Bot, Gamepad2, Globe, MonitorSmartphone, type LucideIcon } from 'lucide-react'
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
    icon: AppWindow,
    title: 'Apps',
    description: 'Web and mobile apps with clean architecture, real-time data, and interfaces that feel effortless.',
    tags: ['React Native', 'Next.js', 'Supabase'],
    color: 'bg-sun',
    className: 'md:col-span-2',
  },
  {
    icon: Bot,
    title: 'AI integrations',
    description: 'Chatbots, copilots, and smart automations that plug LLMs into your product the right way.',
    tags: ['LLMs', 'RAG', 'Agents'],
    color: 'bg-mint',
  },
  {
    icon: Globe,
    title: 'Websites',
    description: 'Fast, SEO-friendly marketing sites and landing pages that turn visitors into customers.',
    tags: ['SEO', 'CMS', 'Analytics'],
    color: 'bg-sky',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive design',
    description: 'Pixel-tight layouts that look and work beautifully on every screen, from watch to widescreen.',
    tags: ['Mobile-first', 'A11y', 'Performance'],
    color: 'bg-card',
  },
  {
    icon: Gamepad2,
    title: 'Games',
    description: 'Browser and mobile games with juicy game feel, tight controls, and a whole lot of fun.',
    tags: ['Phaser', 'Unity', 'Three.js'],
    color: 'bg-coral',
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <SectionHeading
        id="services-title"
        eyebrow="What I do"
        title={
          <>
            One dev. <span className="text-grape">Five superpowers.</span>
          </>
        }
        description="Whether you need a product, a smart feature, or something just for fun — I design, build, and ship it end to end."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.title}
            className={cn(
              'group flex flex-col gap-6 rounded-3xl border-2 p-7 shadow-pop transition-transform hover:-translate-y-1 hover:-rotate-1',
              service.color,
              service.className,
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex size-14 items-center justify-center rounded-2xl border-2 bg-card transition-transform group-hover:rotate-12">
                <service.icon className="size-7" aria-hidden="true" />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl font-extrabold">{service.title}</h3>
              <p className="leading-relaxed text-pretty text-foreground/75">{service.description}</p>
            </div>
            <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${service.title} tools`}>
              {service.tags.map((tag) => (
                <li key={tag} className="rounded-full border-2 bg-card/70 px-3 py-0.5 text-xs font-bold">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
