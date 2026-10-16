import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: React.ReactNode
  description?: string
  tagClassName?: string
}

export function SectionHeading({ id, eyebrow, title, description, tagClassName }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-4">
        <span
          className={cn(
            'w-fit -rotate-2 rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-pop-sm',
            tagClassName ?? 'bg-sun',
          )}
        >
          {eyebrow}
        </span>
        <h2
          id={id}
          className="max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-balance md:text-6xl"
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
