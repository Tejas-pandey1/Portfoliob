import { SectionHeading } from './section-heading'

const steps = [
  { title: 'Discover', text: 'We chat about goals, users, and what success looks like. I come back with a clear plan and quote.', color: 'bg-sun' },
  { title: 'Design', text: 'Wireframes and clickable prototypes so you can see and feel it before a line of code ships.', color: 'bg-coral' },
  { title: 'Build', text: 'Weekly demos, a live preview link, and steady progress you can track from day one.', color: 'bg-mint' },
  { title: 'Launch & grow', text: 'Deploy, measure, iterate. I stick around to tune, fix, and add the next big thing.', color: 'bg-sky' },
]

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y-2 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="[&_p]:text-background/70">
          <SectionHeading
            id="process-title"
            eyebrow="How it works"
            tagClassName="bg-sun text-foreground border-background"
            title={
              <>
                From idea to launch in <span className="text-sun">four steps.</span>
              </>
            }
            description="No black boxes. You always know what's happening, what's next, and what it costs."
          />
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-4 rounded-3xl border-2 border-background/20 bg-background/5 p-6 transition-colors hover:bg-background/10"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-full border-2 border-background font-display text-xl font-extrabold text-foreground ${step.color}`}
              >
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-extrabold">{step.title}</h3>
              <p className="leading-relaxed text-background/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
