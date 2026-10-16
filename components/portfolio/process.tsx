import { SectionHeading } from './section-heading'

const steps = [
  { title: 'Get the idea straight', text: 'First, figure out what you want to make, who it is for, and what would make it genuinely useful.', color: 'bg-sun' },
  { title: 'Sketch the shape', text: 'Work out the important screens and how the pieces should fit together before getting lost in details.', color: 'bg-coral' },
  { title: 'Build and test', text: 'Turn the plan into a working project, test the awkward bits, and tidy up what feels off.', color: 'bg-mint' },
  { title: 'Ship the thing', text: 'Get it ready to use, sort out the final fixes, and figure out what is worth improving next.', color: 'bg-sky' },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y-2 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="[&_p]:text-background/70">
          <SectionHeading
            id="process-title"
            eyebrow="How I work"
            tagClassName="bg-sun text-foreground border-background"
            title={<>No magic trick. Just <span className="text-sun">good steps.</span></>}
            description="The plan can change as we learn things, but I like keeping the process clear and the progress visible."
          />
        </div>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 rounded-3xl border-2 border-background/20 bg-background/5 p-6 transition-colors hover:bg-background/10">
              <span className={`flex size-12 items-center justify-center rounded-full border-2 border-background font-display text-xl font-extrabold text-foreground ${step.color}`}>{i + 1}</span>
              <h3 className="font-display text-2xl font-extrabold">{step.title}</h3>
              <p className="leading-relaxed text-background/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
