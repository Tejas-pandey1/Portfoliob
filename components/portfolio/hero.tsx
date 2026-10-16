import { ArrowDown, ArrowDownRight, Code2, Gamepad2, Sparkles, Terminal } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-dots">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 pt-16 pb-24 md:pt-24 lg:flex-row lg:gap-12">
        <div className="flex flex-1 flex-col gap-8">
          <p className="flex w-fit items-center gap-2 rounded-full border-2 bg-card px-4 py-1.5 text-sm font-semibold shadow-pop-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint" />
              <span className="relative inline-flex size-2.5 rounded-full border border-foreground bg-mint" />
            </span>
            Independent developer · Open to interesting projects
          </p>

          <h1 id="hero-title" className="font-display text-5xl leading-[0.98] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            I make useful things for the{' '}
            <span className="inline-block -rotate-2 rounded-xl border-2 bg-mint px-3 shadow-pop-sm">web</span>
            {' '}and beyond.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Hey, I’m <strong className="font-semibold text-foreground">Shadow</strong>. I like taking a rough idea, poking at it until it makes sense, then building something real out of it. Mostly web projects, practical tools, and the occasional game-shaped detour.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full border-2 bg-grape px-6 py-3 font-bold text-primary-foreground shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">
              Have a look around
              <ArrowDownRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-6 py-3 font-bold shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">
              Let’s talk
            </a>
          </div>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-grape" aria-hidden="true" />
            Small details matter. So does making the thing actually work.
          </p>
        </div>

        <div className="relative w-full max-w-md flex-1 lg:max-w-lg">
          <div aria-hidden="true" className="absolute -top-7 right-5 size-24 animate-spin-slow rounded-full border-2 border-dashed bg-sky/40" />
          <div className="relative rotate-2 rounded-[2rem] border-2 bg-sun p-4 shadow-pop">
            <div className="flex items-center justify-between rounded-2xl border-2 bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-coral" />
                <span className="size-3 rounded-full bg-sun" />
                <span className="size-3 rounded-full bg-mint" />
              </div>
              <span className="text-xs font-bold text-muted-foreground">a little bit of everything</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-3 sm:p-4">
              <div className="flex min-h-36 flex-col justify-between rounded-2xl border-2 bg-mint p-4">
                <Code2 className="size-7" aria-hidden="true" />
                <div><p className="font-display text-xl font-extrabold">Web stuff</p><p className="text-sm text-foreground/70">Make it useful.</p></div>
              </div>
              <div className="mt-7 flex min-h-36 flex-col justify-between rounded-2xl border-2 bg-sky p-4">
                <Terminal className="size-7" aria-hidden="true" />
                <div><p className="font-display text-xl font-extrabold">Tiny tools</p><p className="text-sm text-foreground/70">Less busywork.</p></div>
              </div>
              <div className="-mt-4 flex min-h-36 flex-col justify-between rounded-2xl border-2 bg-coral p-4">
                <Gamepad2 className="size-7" aria-hidden="true" />
                <div><p className="font-display text-xl font-extrabold">Game bits</p><p className="text-sm text-foreground/70">Just one more try.</p></div>
              </div>
              <div className="flex min-h-36 flex-col justify-between rounded-2xl border-2 bg-card p-4">
                <Sparkles className="size-7" aria-hidden="true" />
                <div><p className="font-display text-xl font-extrabold">Good details</p><p className="text-sm text-foreground/70">The little things.</p></div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border-2 bg-grape px-4 py-3 text-primary-foreground">
              <span className="text-sm font-semibold">Idea in. Something real out.</span>
              <ArrowDown className="size-5" aria-hidden="true" />
            </div>
          </div>
          <div className="absolute -bottom-5 -left-4 -rotate-3 rounded-2xl border-2 bg-card px-4 py-3 font-bold shadow-pop-sm">Currently building ✦</div>
          <div className="absolute top-14 -right-3 rotate-3 rounded-2xl border-2 bg-coral px-4 py-3 font-bold shadow-pop-sm">Curiosity included</div>
        </div>
      </div>
    </section>
  )
}
