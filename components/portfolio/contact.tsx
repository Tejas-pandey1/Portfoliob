import { ArrowUpRight, MessageCircle, BriefcaseBusiness } from 'lucide-react'

const links = [
  { label: 'Contact me on Discord', detail: 'Message me about a project', href: 'https://discord.com/app', icon: MessageCircle, color: 'bg-sky' },
  { label: 'Hire me on Fiverr', detail: 'For freelance projects', href: 'https://www.fiverr.com/', icon: BriefcaseBusiness, color: 'bg-mint' },
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
            <a href="https://discord.com/app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-sky px-6 py-3 font-bold text-foreground shadow-pop transition-transform hover:-translate-y-0.5"><MessageCircle className="size-5" aria-hidden="true" /> Contact me on Discord <ArrowUpRight className="size-4" /></a>
            <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-mint px-6 py-3 font-bold text-foreground shadow-pop transition-transform hover:-translate-y-0.5"><BriefcaseBusiness className="size-5" aria-hidden="true" /> Hire me on Fiverr <ArrowUpRight className="size-4" /></a>
            <a href="https://github.com/Tejas-pandey1" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/50 px-6 py-3 font-bold transition-colors hover:bg-primary-foreground hover:text-foreground">GitHub <ArrowUpRight className="size-4" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
