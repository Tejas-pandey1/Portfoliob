import { ArrowDownRight, Code2, Gamepad2, Sparkles, Terminal, WandSparkles } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-dots">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 pt-16 pb-24 md:pt-24 lg:flex-row lg:gap-10">
        <div className="flex flex-1 flex-col gap-8">
          <p className="flex w-fit items-center gap-2 rounded-full border-2 bg-card px-4 py-1.5 text-sm font-semibold shadow-pop-sm">
            <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-mint" /><span className="relative inline-flex size-2.5 rounded-full border border-foreground bg-mint" /></span>
            Independent builder · Currently making things
          </p>
          <h1 id="hero-title" className="font-display text-5xl leading-[0.98] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Curious ideas.<br />{" "}
            <span className="inline-block -rotate-2 rounded-xl border-2 bg-mint px-3 shadow-pop-sm">Useful builds.</span><br />
            A little bit of <span className="text-grape">chaos.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Hey, I’m <strong className="font-semibold text-foreground">Shadow</strong>. I like pulling ideas apart, learning how the pieces work, and turning them into websites, tools, and interactive things you can actually use. If there’s a tricky bit, that’s usually where it gets interesting.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full border-2 bg-grape px-6 py-3 font-bold text-primary-foreground shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">Take a look <ArrowDownRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" /></a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-6 py-3 font-bold shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">Got an idea?</a>
          </div>
          <div className="flex flex-wrap gap-3 pt-1 text-sm font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-3 py-2"><Code2 className="size-4 text-grape" /> Web</span>
            <span className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-3 py-2"><WandSparkles className="size-4 text-grape" /> Curious experiments</span>
            <span className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-3 py-2"><Gamepad2 className="size-4 text-grape" /> Games</span>
          </div>
        </div>
        <div className="relative w-full max-w-sm flex-1 lg:max-w-md">
          <div aria-hidden="true" className="absolute -top-6 -left-6 size-28 animate-spin-slow rounded-full border-2 border-dashed bg-sky/40" />
          <div className="relative rotate-2 rounded-[2rem] border-2 bg-sun p-4 shadow-pop">
            <div className="overflow-hidden rounded-2xl border-2 bg-card">
              <div className="flex items-center justify-between border-b-2 px-4 py-3"><span className="font-display font-extrabold">The idea machine</span><Sparkles className="size-5" aria-hidden="true" /></div>
              <div className="flex min-h-[300px] flex-col gap-4 p-5 sm:p-7">
                <div className="flex rotate-1 items-center gap-3 rounded-2xl border-2 bg-mint p-4 shadow-pop-sm"><span className="flex size-11 items-center justify-center rounded-xl border-2 bg-card"><Code2 className="size-5" /></span><span><strong className="block">Start with a thought</strong><span className="text-sm opacity-70">“What if this worked?”</span></span></div>
                <div className="ml-8 flex -rotate-2 items-center gap-3 rounded-2xl border-2 bg-sky p-4 shadow-pop-sm"><span className="flex size-11 items-center justify-center rounded-xl border-2 bg-card"><Terminal className="size-5" /></span><span><strong className="block">Tinker with it</strong><span className="text-sm opacity-70">Break it. Learn. Fix it.</span></span></div>
                <div className="mr-5 flex rotate-1 items-center gap-3 rounded-2xl border-2 bg-coral p-4 shadow-pop-sm"><span className="flex size-11 items-center justify-center rounded-xl border-2 bg-card"><WandSparkles className="size-5" /></span><span><strong className="block">Make it real</strong><span className="text-sm opacity-70">One more tiny improvement.</span></span></div>
                <p className="mt-auto text-right font-mono text-xs text-muted-foreground">repeat() · with snacks</p>
              </div>
            </div>
          </div>
          <div style={{ '--tilt': '-6deg' } as React.CSSProperties} className="absolute -bottom-5 -left-4 flex animate-float items-center gap-2 rounded-2xl border-2 bg-coral px-4 py-3 font-bold shadow-pop-sm"><Gamepad2 className="size-5" aria-hidden="true" /> Playful by design</div>
          <div style={{ '--tilt': '5deg', animationDelay: '1.5s' } as React.CSSProperties} className="absolute top-10 -right-4 flex animate-float items-center gap-2 rounded-2xl border-2 bg-mint px-4 py-3 font-bold shadow-pop-sm"><Sparkles className="size-5" aria-hidden="true" /> Always curious</div>
        </div>
      </div>
    </section>
  )
}
