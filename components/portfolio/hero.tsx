import { ArrowDownRight, Gamepad2, Smartphone, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-dots">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 pt-16 pb-20 md:pt-24 lg:flex-row lg:gap-10">
        <div className="flex flex-1 flex-col gap-8">
          <p className="flex w-fit items-center gap-2 rounded-full border-2 bg-card px-4 py-1.5 text-sm font-semibold shadow-pop-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint" />
              <span className="relative inline-flex size-2.5 rounded-full border border-foreground bg-mint" />
            </span>
            Independent developer · Open to projects
          </p>

          <h1 id="hero-title" className="font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            I build{' '}
            <span className="inline-block -rotate-2 rounded-xl border-2 bg-sun px-3 shadow-pop-sm">websites</span>,{' '}
            <span className="inline-block rotate-1 rounded-xl border-2 bg-mint px-3 shadow-pop-sm">AI tools</span>, apps &amp;{' '}
            <span className="inline-block -rotate-1 rounded-xl border-2 bg-coral px-3 shadow-pop-sm">games</span>.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Hey, I’m <strong className="font-semibold text-foreground">Shadow</strong> — an independent full-stack and game developer. I turn ideas into useful digital products, from responsive websites and custom tools to AI integrations, Android apps, and games.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full border-2 bg-grape px-6 py-3 font-bold text-primary-foreground shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">
              See my work
              <ArrowDownRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-6 py-3 font-bold shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm">
              Start a project
            </a>
          </div>

          <dl className="flex flex-wrap gap-8 pt-2">
            {[
              { value: 'Web', label: 'Full-stack development' },
              { value: 'AI', label: 'Tools & integrations' },
              { value: 'Games', label: 'Unity development' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-display text-3xl font-extrabold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative w-full max-w-sm flex-1 lg:max-w-md">
          <div aria-hidden="true" className="absolute -top-6 -left-6 size-28 animate-spin-slow rounded-full border-2 border-dashed bg-sky/40" />
          <div className="relative rotate-2 overflow-hidden rounded-[2rem] border-2 bg-grape p-4 shadow-pop">
            <div className="overflow-hidden rounded-2xl border-2 border-foreground/20 bg-[#17151f] text-[#f8f4ff]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-3 rounded-full bg-coral" />
                <span className="size-3 rounded-full bg-sun" />
                <span className="size-3 rounded-full bg-mint" />
                <span className="ml-2 text-xs text-white/60">shadow — workspace</span>
              </div>
              <div className="min-h-[340px] p-6 font-mono text-sm leading-7 sm:p-8">
                <p className="text-[#a6e3a1]">// turning ideas into projects</p>
                <p className="mt-5"><span className="text-[#cba6f7]">const</span> developer = {'{'}</p>
                <p className="pl-5">name: <span className="text-[#f9e2af]">'Shadow'</span>,</p>
                <p className="pl-5">focus: [</p>
                <p className="pl-10 text-[#f9e2af]">'Web development',</p>
                <p className="pl-10 text-[#f9e2af]">'AI tools',</p>
                <p className="pl-10 text-[#f9e2af]">'Game development'</p>
                <p className="pl-5">],</p>
                <p className="pl-5">status: <span className="text-[#a6e3a1]">'building'</span></p>
                <p>{'}'}</p>
                <p className="mt-5 text-[#89b4fa]">{"// ship something cool ✦"}</p>
                <p className="mt-3 animate-pulse text-[#a6e3a1]">▌</p>
              </div>
            </div>
          </div>
          <div style={{ '--tilt': '-6deg' } as React.CSSProperties} className="absolute -bottom-6 -left-4 flex animate-float items-center gap-2 rounded-2xl border-2 bg-sun px-4 py-3 font-bold shadow-pop-sm">
            <Gamepad2 className="size-5" aria-hidden="true" /> Game dev
          </div>
          <div style={{ '--tilt': '5deg', animationDelay: '1.5s' } as React.CSSProperties} className="absolute top-10 -right-4 flex animate-float items-center gap-2 rounded-2xl border-2 bg-mint px-4 py-3 font-bold shadow-pop-sm">
            <Sparkles className="size-5" aria-hidden="true" /> AI tools
          </div>
          <div style={{ '--tilt': '-3deg', animationDelay: '3s' } as React.CSSProperties} className="absolute -right-2 bottom-20 flex animate-float items-center gap-2 rounded-2xl border-2 bg-coral px-4 py-3 font-bold shadow-pop-sm">
            <Smartphone className="size-5" aria-hidden="true" /> Android apps
          </div>
        </div>
      </div>
    </section>
  )
}
