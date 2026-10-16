import { Code2, Gamepad2, Rocket, Wrench } from 'lucide-react'
import { SectionHeading } from './section-heading'

const facts = [
  { icon: Code2, label: 'Full-stack thinking', text: 'From interface to APIs and database logic.', color: 'bg-sun' },
  { icon: Gamepad2, label: 'Game development', text: 'Building interactive experiences with Unity and C#.', color: 'bg-coral' },
  { icon: Wrench, label: 'Practical tools', text: 'Custom utilities that solve real workflow problems.', color: 'bg-mint' },
  { icon: Rocket, label: 'End-to-end building', text: 'Taking projects from an initial idea toward a working release.', color: 'bg-sky' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8">
          <SectionHeading id="about-title" eyebrow="About me" tagClassName="bg-mint" title={<>Curious mind. <span className="text-grape">Builder mindset.</span></>} />
          <div className="flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>I’m Shadow, an independent developer working across web development, AI-powered tools, Android apps, and games. I enjoy figuring out how things work and turning a rough idea into something people can actually use.</p>
            <p>My toolkit includes JavaScript, HTML, CSS, Python, SQL, REST APIs, AI/LLM APIs, C#, and Unity. I like solving the whole problem — not just making something look good, but helping it work reliably too.</p>
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
