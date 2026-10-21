'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import initialProjects from '@/data/projects.json'

type Project = {
  id: string
  title: string
  category: string
  description: string
  image: string
  stack: string[]
  color: string
  href: string
  linkLabel: string
  featured: boolean
  inProgress?: boolean
}

const blankProject: Project = {
  id: '', title: '', category: 'Personal project', description: '', image: '/images/project-ai.png',
  stack: [], color: 'mint', href: '', linkLabel: 'View project', featured: false, inProgress: false,
}

export default function AdminPage() {
  const router = useRouter()
  const [signedIn, setSignedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>(initialProjects as Project[])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function signIn(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true); setError(''); setMessage('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not sign in.')
      const projectsResponse = await fetch('/api/admin/projects', { cache: 'no-store' })
      if (projectsResponse.ok) {
        const savedProjects = await projectsResponse.json()
        if (Array.isArray(savedProjects)) setProjects(savedProjects as Project[])
      }
      setSignedIn(true); setPassword('')
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not sign in.') }
    finally { setBusy(false) }
  }

  function change(index: number, key: keyof Project, value: string | boolean) {
    setProjects((current) => current.map((project, i) => {
      if (i !== index) return project
      if (key === 'stack' && typeof value === 'string') return { ...project, stack: value.split(',').map((x) => x.trim()).filter(Boolean) }
      return { ...project, [key]: value }
    }))
  }

  async function save() {
    setBusy(true); setError(''); setMessage('')
    try {
      const response = await fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projects) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not save projects.')
      setMessage(data.message || 'Saved to Netlify.')
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save projects.') }
    finally { setBusy(false) }
  }

  function setAllInProgress(value: boolean) {
    setProjects((current) => current.map((project) => ({ ...project, inProgress: value })))
  }

  function addProject() {
    setProjects((current) => [{ ...blankProject, id: `project-${Date.now()}`, featured: true }, ...current])
  }

  if (!signedIn) return (
    <main className="min-h-screen bg-background px-4 py-16">
      <form onSubmit={signIn} className="mx-auto flex max-w-md flex-col gap-5 rounded-3xl border-2 bg-card p-8 shadow-pop">
        <a href="/" className="text-sm font-bold text-muted-foreground">← Back to portfolio</a>
        <p className="w-fit rounded-full border-2 bg-mint px-3 py-1 text-xs font-bold">PRIVATE WORKSPACE</p>
        <h1 className="font-display text-4xl font-extrabold">Project control room</h1>
        <p className="text-muted-foreground">Sign in to add projects, update screenshots, edit links, and manage what appears first.</p>
        <label className="flex flex-col gap-2 text-sm font-bold">Admin password
          <input autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="rounded-xl border-2 bg-background px-4 py-3 font-normal" />
        </label>
        {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
        <button disabled={busy} className="rounded-full border-2 bg-grape px-5 py-3 font-bold text-white shadow-pop disabled:opacity-60">{busy ? 'Checking…' : 'Unlock editor'}</button>
      </form>
    </main>
  )

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div><a href="/" className="text-sm font-bold text-muted-foreground">← View portfolio</a><h1 className="mt-2 font-display text-4xl font-extrabold">Project control room</h1><p className="mt-2 text-muted-foreground">Edit project details, tags, screenshots, links, and status labels, then save.</p></div>
          <div className="flex flex-wrap gap-2"><button onClick={() => setAllInProgress(true)} className="rounded-full border-2 px-4 py-2 text-sm font-bold">Mark all In Progress</button><button onClick={() => setAllInProgress(false)} className="rounded-full border-2 px-4 py-2 text-sm font-bold">Clear all labels</button><button onClick={addProject} className="rounded-full border-2 bg-mint px-5 py-3 font-bold shadow-pop">+ Add project</button></div>
        </header>
        {projects.map((project, index) => (
          <section key={project.id || index} className="flex flex-col gap-4 rounded-3xl border-2 bg-card p-5 shadow-pop">
            <div className="flex items-center justify-between gap-3"><h2 className="font-display text-xl font-extrabold">Project {index + 1}</h2><button onClick={() => setProjects((all) => all.filter((_, i) => i !== index))} className="rounded-full border-2 px-3 py-1 text-sm font-bold">Remove</button></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {([
                ['title', 'Title'], ['category', 'Category / type'], ['href', 'Project URL'], ['image', 'Screenshot path or image URL'], ['linkLabel', 'Button label'], ['color', 'Card colour (mint, sky, coral, sun, card)'], ['id', 'Unique ID'],
              ] as [keyof Project, string][]).map(([key, label]) => (
                <label key={key} className="flex flex-col gap-1 text-sm font-bold">{label}<input value={String(project[key] ?? '')} onChange={(e) => change(index, key, e.target.value)} className="rounded-xl border-2 bg-background px-3 py-2 font-normal" /></label>
              ))}
            </div>
            <label className="flex flex-col gap-1 text-sm font-bold">Description<textarea value={project.description} onChange={(e) => change(index, 'description', e.target.value)} rows={3} className="rounded-xl border-2 bg-background px-3 py-2 font-normal" /></label>
            <label className="flex flex-col gap-1 text-sm font-bold">Tags / technologies
              <input value={project.stack.join(', ')} onChange={(e) => change(index, 'stack', e.target.value)} placeholder="Web design, AI integration, Responsive" className="rounded-xl border-2 bg-background px-3 py-2 font-normal" />
              <span className="text-xs font-normal text-muted-foreground">Separate tags with commas. Preview:</span>
              <span className="flex flex-wrap gap-2 pt-1">{project.stack.map((tag) => <span key={tag} className="rounded-full border px-2 py-1 text-xs">{tag}</span>)}</span>
            </label>
            <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={project.featured} onChange={(e) => change(index, 'featured', e.target.checked)} /> Feature this project near the top</label>
            <label className="flex items-center gap-2 rounded-xl border-2 border-dashed p-3 text-sm font-bold"><input type="checkbox" checked={Boolean(project.inProgress)} onChange={(e) => setProjects((current) => current.map((item, i) => i === index ? { ...item, inProgress: e.target.checked } : item))} /> Show diagonal “In Progress” label on thumbnail</label>
          </section>
        ))}
        {error && <p role="alert" className="rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-800">{error}</p>}
        {message && <p role="status" className="rounded-xl bg-mint p-3 text-sm font-semibold">{message}</p>}
        <div className="flex flex-wrap gap-3"><button onClick={save} disabled={busy} className="rounded-full border-2 bg-grape px-6 py-3 font-bold text-white shadow-pop disabled:opacity-60">{busy ? 'Saving…' : 'Save changes'}</button><button onClick={() => router.push('/')} className="rounded-full border-2 bg-card px-6 py-3 font-bold">Done</button></div>
        <p className="pb-10 text-sm text-muted-foreground">Project edits are saved separately from the code, so they survive future deployments. Keep your admin password private.</p>
      </div>
    </main>
  )
}
