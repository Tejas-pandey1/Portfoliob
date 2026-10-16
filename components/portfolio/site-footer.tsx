'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole } from 'lucide-react'

export function SiteFooter() {
  const [taps, setTaps] = useState(0)
  const router = useRouter()

  function tapAdmin() {
    const next = taps + 1
    setTaps(next)
    if (next >= 5) {
      setTaps(0)
      router.push('/admin')
    }
  }

  return (
    <footer className="border-t-2">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm font-medium text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <p>© 2026 Shadow. Built with care and curiosity.</p>
          <button type="button" onClick={tapAdmin} aria-label="Admin access" title=" " className="rounded-full p-1 opacity-25 transition-opacity hover:opacity-60 focus-visible:opacity-100">
            <LockKeyhole className="size-3" aria-hidden="true" />
          </button>
        </div>
        <a href="#top" className="rounded-full border-2 border-foreground bg-sun px-4 py-1.5 font-bold text-foreground">Back to top</a>
      </div>
    </footer>
  )
}
