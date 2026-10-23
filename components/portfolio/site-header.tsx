'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
]

export function SiteHeader() {
  const [mascot, setMascot] = useState('')
  useEffect(() => {
    fetch('/api/admin/settings?section=mascot', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => { if (typeof data.mascot === 'string') setMascot(data.mascot) })
      .catch(() => {})
  }, [])
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-2 bg-card/90 py-2 pr-2 pl-5 shadow-pop-sm backdrop-blur">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
          <span aria-hidden="true" className="flex size-7 items-center justify-center overflow-hidden rounded-full border-2 bg-coral text-xs">{mascot ? <Image src={mascot} alt="" width={28} height={28} unoptimized className="size-full object-cover" /> : 'S'}</span>
          shadow.dev
        </a>
        <nav aria-label="Primary" className="hidden md:block"><ul className="flex items-center gap-1">{navItems.map((item) => <li key={item.href}><a href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-sun">{item.label}</a></li>)}</ul></nav>
        <a href="#contact" className="rounded-full border-2 bg-grape px-5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Let’s talk</a>
      </div>
    </header>
  )
}
