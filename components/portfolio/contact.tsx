import { ArrowUpRight, Mail } from 'lucide-react'

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
  { label: 'itch.io', href: 'https://itch.io' },
]

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 bg-grape p-8 text-primary-foreground shadow-pop md:p-16">
        <div aria-hidden="true" className="absolute -top-16 -right-16 size-56 rounded-full border-2 border-foreground bg-sun" />
        <div aria-hidden="true" className="absolute -bottom-20 left-1/3 size-40 rounded-full border-2 border-foreground bg-coral" />
        <div aria-hidden="true" className="absolute right-1/4 bottom-10 size-12 rotate-12 rounded-xl border-2 border-foreground bg-mint" />

        <div className="relative flex flex-col gap-8">
          <span className="w-fit -rotate-2 rounded-full border-2 border-foreground bg-card px-3 py-1 text-xs font-bold tracking-widest text-foreground uppercase shadow-pop-sm">
            {"Let's build"}
          </span>
          <h2
            id="contact-title"
            className="max-w-3xl font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-balance md:text-7xl"
          >
            Got an idea? {"Let's make it real."}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-primary-foreground/80">
            {"Apps, AI features, websites, or a game you've always wanted to make — tell me about it. I reply within 24 hours."}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:hello@alexmorgan.dev"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-sun px-6 py-3 font-bold text-foreground shadow-pop transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pop-sm"
            >
              <Mail className="size-5" aria-hidden="true" />
              hello@alexmorgan.dev
            </a>
          </div>
          <ul className="flex flex-wrap gap-3 pt-4" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border-2 border-primary-foreground/40 px-4 py-2 text-sm font-semibold transition-colors hover:border-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
