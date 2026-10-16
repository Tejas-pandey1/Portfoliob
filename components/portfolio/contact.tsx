import { ArrowUpRight, MessageCircle, BriefcaseBusiness } from 'lucide-react'

const links = [
  { label: 'Hire me on Fiverr', detail: 'For freelance projects', href: '', icon: BriefcaseBusiness, color: 'bg-mint' },
  { label: 'Join my Discord', detail: 'Hang out and talk projects', href: '', icon: MessageCircle, color: 'bg-sky' },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 bg-grape p-8 text-primary-foreground shadow-pop md:p-16">
        <div aria-hidden="true" className="absolute -top-16 -right-16 size-56 rounded-full border-2 border-foreground bg-sun" />
        <div aria-hidden="true" className="absolute -bottom-20 left-1/3 size-40 rounded-full border-2 border-foreground bg-coral" />
        <div aria-hidden="true" className="absolute right-1/4 bottom-10 size-12 rotate-12 rounded-xl border-2 border-foreground bg-mint" />
        <div className="relative flex flex-col gap-8">
          <span className="w-fit -rotate-2 rounded-full border-2 border-foreground bg-card px-3 py-1 text-xs font-bold tracking-widest text-foreground uppercase shadow-pop-sm">Got a good idea?</span>
          <h2 id="contact-title" className="max-w-3xl font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance md:text-7xl">Let’s make something cool.</h2>
          <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/80">Got a project, a question, or a wonderfully weird idea? Pick your route and say hello. No corporate maze, promise.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-mint px-6 py-3 font-bold text-foreground shadow-pop"><BriefcaseBusiness className="size-5" aria-hidden="true" /> Hire me on Fiverr <span className="text-xs font-medium opacity-70">(profile link needed)</span></span>
            <a href="https://github.com/Tejas-pandey1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/50 px-6 py-3 font-bold transition-colors hover:bg-primary-foreground hover:text-foreground">GitHub <ArrowUpRight className="size-4" /></a>
          </div>
          <ul className="grid gap-3 pt-2 sm:grid-cols-2" aria-label="Contact options">
            {links.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={`flex h-full items-center gap-4 rounded-2xl border-2 border-foreground p-4 text-foreground transition-transform hover:-translate-y-1 ${item.color}`}>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 bg-card"><item.icon className="size-6" aria-hidden="true" /></span>
                    <span className="flex flex-col"><strong>{item.label}</strong><span className="text-sm opacity-70">{item.detail}</span></span>
                    <ArrowUpRight className="ml-auto size-5 shrink-0" />
                  </a>
                ) : (
                  <div className="flex h-full items-center gap-4 rounded-2xl border-2 border-dashed border-primary-foreground/50 p-4 text-primary-foreground/80">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border-2 border-primary-foreground/50"><item.icon className="size-6" aria-hidden="true" /></span>
                    <span className="flex flex-col"><strong>{item.label}</strong><span className="text-sm">Invite link to be added</span></span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
