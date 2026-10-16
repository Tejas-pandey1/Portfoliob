import { Code2, Gamepad2, Rocket, Wrench } from 'lucide-react'
import { SectionHeading } from './section-heading'

const facts = [
  { icon: Code2, label: 'Likes the details', text: 'A site should feel thoughtful, not just technically alive.', color: 'bg-sun' },
  { icon: Gamepad2, label: 'Always curious', text: 'Games are a fun excuse to learn how interactive systems fit together.', color: 'bg-coral' },
  { icon: Wrench, label: 'Practical first', text: 'I enjoy building tools that make an annoying task a little less annoying.', color: 'bg-mint' },
  { icon: Rocket, label: 'Learn by building', text: 'Try an idea, find the weird edge cases, improve it, repeat.', color: 'bg-sky' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8">
          <SectionHeading id="about-title" eyebrow="A bit about me" tagClassName="bg-mint" title={<>Part problem-solver, <span className="text-grape">part tinkerer.</span></>} />
          <div className="flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            <p>I’m Shadow, a developer who likes making things and understanding how they work. I move between websites, small apps, Python tools, and game experiments depending on what the idea needs.</p>
            <p>My current toolkit includes HTML, CSS, JavaScript, Python, Flask, and C#. I’m still learning as I go, which mostly means there’s always another thing I want to try and probably too many tabs open.</p>
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
