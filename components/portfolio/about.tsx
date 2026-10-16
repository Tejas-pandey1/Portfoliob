import { Coffee, Heart, Rocket, Zap } from 'lucide-react'
import { SectionHeading } from './section-heading'

const facts = [
  { icon: Rocket, label: 'Ships fast', text: 'MVPs in weeks, not months.', color: 'bg-sun' },
  { icon: Heart, label: 'Sweats details', text: 'Micro-interactions matter.', color: 'bg-coral' },
  { icon: Zap, label: 'Performance nerd', text: '95+ Lighthouse by default.', color: 'bg-mint' },
  { icon: Coffee, label: 'Easy to work with', text: 'Clear updates, zero drama.', color: 'bg-sky' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8">
          <SectionHeading
            id="about-title"
            eyebrow="About me"
            tagClassName="bg-mint"
            title={
              <>
                Part engineer, part designer, <span className="text-grape">all builder.</span>
              </>
            }
          />
          <div className="flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>
              {
                "I started making games in my bedroom at 14 and never really stopped building. Today I'm an independent developer helping startups, creators, and small teams turn ideas into products people actually use."
              }
            </p>
            <p>
              {
                "Because I work solo, you get one person who owns the whole thing — design, code, AI, deployment — with no hand-offs and nothing lost in translation. I care about clean code, smooth UX, and building things that last."
              }
            </p>
          </div>
        </div>

        <ul className="grid flex-1 grid-cols-1 gap-5 self-center sm:grid-cols-2">
          {facts.map((fact, i) => (
            <li
              key={fact.label}
              className={`flex flex-col gap-3 rounded-3xl border-2 p-6 shadow-pop ${fact.color} ${
                i % 2 === 0 ? '-rotate-2' : 'rotate-2 sm:translate-y-6'
              }`}
            >
              <span className="flex size-11 items-center justify-center rounded-xl border-2 bg-card">
                <fact.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-extrabold">{fact.label}</h3>
              <p className="text-foreground/75">{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
