'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, MessageCircle, BriefcaseBusiness, Globe, Github, Instagram, Mail, MessageSquare, Link2 } from 'lucide-react'

type ContactButton = { id: string; label: string; detail?: string; href: string; icon: string; color: string; enabled: boolean }
const defaults: ContactButton[] = [
  { id: 'discord', label: 'Contact me on Discord', detail: 'Message me about a project', href: 'https://discord.gg/uVVfQFE9Cm', icon: 'MessageCircle', color: 'sky', enabled: true },
  { id: 'fiverr', label: 'Hire me on Fiverr', detail: 'For freelance projects', href: 'https://www.fiverr.com/shadowknightrpg?public_mode=true', icon: 'BriefcaseBusiness', color: 'mint', enabled: true },
]
const colors: Record<string, string> = { sky: 'bg-sky', mint: 'bg-mint', coral: 'bg-coral', sun: 'bg-sun', grape: 'bg-grape text-white', card: 'bg-card text-foreground' }
function ContactIcon({ name }: { name: string }) {
  const props = { className: 'size-5 shrink-0', 'aria-hidden': true as const }
  switch (name) {
    case 'MessageCircle': return <MessageCircle {...props} />
    case 'BriefcaseBusiness': return <BriefcaseBusiness {...props} />
    case 'Globe': return <Globe {...props} />
    case 'Github': return <Github {...props} />
    case 'Instagram': return <Instagram {...props} />
    case 'Mail': return <Mail {...props} />
    case 'MessageSquare': return <MessageSquare {...props} />
    default: return <Link2 {...props} />
  }
}
export function Contact() {
  const [links, setLinks] = useState<ContactButton[]>(defaults)
  useEffect(() => {
    fetch('/api/admin/settings?section=contact', { cache: 'no-store' }).then(response => response.ok ? response.json() : Promise.reject())
      .then(data => { if (Array.isArray(data.contactButtons)) setLinks(data.contactButtons) }).catch(() => {})
  }, [])
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
            {links.filter(link => link.enabled && link.label.trim() && link.href.trim()).map(link => (
              <a key={link.id} href={link.href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-3 font-bold text-foreground shadow-pop transition-transform hover:-translate-y-0.5 ${colors[link.color] ?? 'bg-card'}`}>
                <ContactIcon name={link.icon} /> {link.label} <ArrowUpRight className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
