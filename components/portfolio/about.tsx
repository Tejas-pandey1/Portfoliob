import { Code2, Gamepad2, Rocket, Wrench } from 'lucide-react'
import { SectionHeading } from './section-heading'

const facts = [
  { icon: Code2, label: 'Curious by default', text: 'If I don’t know how something works yet, that’s a reason to explore it.', color: 'bg-mint' },
  { icon: Gamepad2, label: 'Play matters', text: 'Interactive projects should feel good to use, not just technically function.', color: 'bg-coral' },
  { icon: Wrench, label: 'Make it useful', text: 'I like turning messy ideas into tools and experiences with a clear purpose.', color: 'bg-sun' },
  { icon: Rocket, label: 'Always iterating', text: 'Build a version, learn from it, improve the next one. That’s the fun part.', color: 'bg-sky' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8">
          <SectionHeading id="about-title" eyebrow="A bit about me" tagClassName="bg-sun" title={<>Part builder. <span className="text-grape">Part professional tinkerer.</span></>} />
          <div className="flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>I’m Shadow, a student and developer who enjoys figuring things out by making things. I’m interested in web development, practical tools, game development, and the satisfying moment when a half-formed idea finally clicks.</p>
            <p>I’m still learning, experimenting, and adding to my toolkit. This portfolio is a work in progress on purpose: I’d rather show real projects as they happen than invent a highlight reel.</p>
          </div>
        </div>
        <ul className="grid flex-1 grid-cols-1 gap-5 self-center sm:grid-cols-2">
          {facts.map((fact, i) => (
            <li key={fact.label} className={`flex flex-col gap-3 rounded-3xl border-2 p-6 shadow-pop ${fact.color} ${i % 2 === 0 ? '-rotate-2' : 'rotate-2 sm:translate-y-6'}`}>
              <span className="flex size-11 items-center justify-center rounded-xl border-2 bg-card"><fact.icon className="size-5" aria-hidden="true" /></span>
              <h3 className="font-display text-xl font-extrabold">{fact.label}</h3>
              <p className="text-foreground/75">{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
