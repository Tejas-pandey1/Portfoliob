'use client'

import { useEffect } from 'react'

export function ScrollbarReveal() {
  useEffect(() => {
    const root = document.documentElement
    const edgeWidth = 18
    const onPointerMove = (event: MouseEvent) => {
      root.classList.toggle('scrollbar-visible', window.innerWidth - event.clientX <= edgeWidth)
    }
    const onPointerLeave = () => root.classList.remove('scrollbar-visible')
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onPointerLeave)
    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', onPointerLeave)
      root.classList.remove('scrollbar-visible')
    }
  }, [])

  return null
}
