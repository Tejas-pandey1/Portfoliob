const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'SQL',
  'REST APIs',
  'Flask',
  'Tailwind CSS',
  'Git',
  'Next.js',
  'TypeScript',
  'Groq API',
]

const dotColors = ['bg-coral', 'bg-sun', 'bg-mint', 'bg-sky']

export function SkillMarquee() {
  return (
    <section aria-label="Tools and technologies" className="-rotate-1 border-y-2 bg-grape py-4 text-primary-foreground">
      <div className="flex overflow-hidden">
        <ul className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...skills, ...skills].map((skill, i) => (
            <li key={`${skill}-${i}`} aria-hidden={i >= skills.length} className="flex items-center gap-8 font-display text-2xl font-bold whitespace-nowrap md:text-3xl">
              {skill}
              <span aria-hidden="true" className={`size-4 rounded-full border-2 border-foreground ${dotColors[i % dotColors.length]}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
