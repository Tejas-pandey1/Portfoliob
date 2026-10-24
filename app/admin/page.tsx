'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowDown, ArrowUp, Check, ChevronDown, ChevronUp, GripVertical, ImagePlus, Link2,
  MessageCircle, BriefcaseBusiness, Globe, Code2, Camera, Mail, MessageSquare,
  Plus, RotateCcw, Save, Search, Settings2, Trash2, Upload, X,
} from 'lucide-react'
import initialProjects from '@/data/projects.json'

type Project = {
  id: string; title: string; category: string; description: string; image: string; stack: string[]
  color: string; href: string; linkLabel: string; featured: boolean; inProgress?: boolean; order?: number
}
type ContactButton = { id: string; label: string; detail: string; href: string; icon: string; color: string; enabled: boolean }
type Settings = { mascot: string; contactButtons: ContactButton[] }
const blankProject: Project = {
  id: '', title: '', category: 'Personal project', description: '', image: '/images/project-ai.png',
  stack: [], color: 'mint', href: '', linkLabel: 'View project', featured: false, inProgress: false,
}
const defaultButtons: ContactButton[] = [
  { id: 'discord', label: 'Contact me on Discord', detail: 'Message me about a project', href: 'https://discord.gg/uVVfQFE9Cm', icon: 'MessageCircle', color: 'sky', enabled: true },
  { id: 'fiverr', label: 'Hire me on Fiverr', detail: 'For freelance projects', href: 'https://www.fiverr.com/shadowknightrpg?public_mode=true', icon: 'BriefcaseBusiness', color: 'mint', enabled: true },
]
const iconChoices = ['MessageCircle', 'BriefcaseBusiness', 'Globe', 'Github', 'Instagram', 'Mail', 'MessageSquare', 'Link2']
const colorChoices = ['sky', 'mint', 'coral', 'sun', 'grape', 'card']
const colorClass: Record<string, string> = { sky: 'bg-sky', mint: 'bg-mint', coral: 'bg-coral', sun: 'bg-sun', grape: 'bg-grape text-white', card: 'bg-card' }

function normalizeProjects(list: Project[]) {
  return list.map((project, index) => ({ ...project, order: Number.isFinite(Number(project.order)) ? Number(project.order) : index + 1 }))
    .sort((a, b) => Number(a.order) - Number(b.order))
    .map((project, index) => ({ ...project, order: index + 1 }))
}
function safeId(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminPage() {
  const router = useRouter()
  const mascotInput = useRef<HTMLInputElement>(null)
  const [tagDrafts, setTagDrafts] = useState<Record<string, string>>({})
  const [uploadingImages, setUploadingImages] = useState<Record<string, boolean>>({})
  const [signedIn, setSignedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>(normalizeProjects(initialProjects as Project[]))
  const [settings, setSettings] = useState<Settings>({ mascot: '', contactButtons: defaultButtons })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'branding'>('projects')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [orderDrafts, setOrderDrafts] = useState<Record<string, string>>({})
  const [savedSnapshot, setSavedSnapshot] = useState('')

  async function signIn(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Could not sign in.')
      const [projectsResponse, settingsResponse] = await Promise.all([
        fetch('/api/admin/projects', { cache: 'no-store' }),
        fetch('/api/admin/settings', { cache: 'no-store' }),
      ])
      const loadedProjects = projectsResponse.ok ? await projectsResponse.json() : initialProjects
      const loadedSettings = settingsResponse.ok ? await settingsResponse.json() : { mascot: '', contactButtons: defaultButtons }
      const nextProjects = normalizeProjects(Array.isArray(loadedProjects) ? loadedProjects : initialProjects as Project[])
      const nextSettings = { mascot: typeof loadedSettings.mascot === 'string' ? loadedSettings.mascot : '', contactButtons: Array.isArray(loadedSettings.contactButtons) ? loadedSettings.contactButtons : defaultButtons }
      setProjects(nextProjects as Project[]); setSettings(nextSettings); setSavedSnapshot(JSON.stringify({ projects: nextProjects, settings: nextSettings }))
      setSignedIn(true); setPassword('')
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not sign in.') }
    finally { setBusy(false) }
  }

  function updateProject(id: string, key: keyof Project, value: string | boolean | number) {
    setProjects(current => current.map(project => {
      if (project.id !== id) return project
      if (key === 'stack' && typeof value === 'string') return { ...project, stack: value.split(',').map(item => item.trim()).filter(Boolean) }
      return { ...project, [key]: value }
    }))
  }
  function moveProject(id: string, targetIndex: number) {
    setProjects(current => {
      const from = current.findIndex(item => item.id === id)
      if (from < 0 || targetIndex < 0 || targetIndex >= current.length || from === targetIndex) return current
      const next = [...current]; const [picked] = next.splice(from, 1); next.splice(targetIndex, 0, picked)
      return next.map((item, index) => ({ ...item, order: index + 1 }))
    })
  }
  function setProjectOrder(id: string, raw: string) {
    const requested = Number.parseInt(raw, 10)
    if (!Number.isFinite(requested)) return
    setProjects(current => {
      const from = current.findIndex(item => item.id === id)
      if (from < 0) return current
      const target = Math.max(1, Math.min(current.length, requested)) - 1
      const next = [...current]; const [picked] = next.splice(from, 1); next.splice(target, 0, picked)
      return next.map((item, index) => ({ ...item, order: index + 1 }))
    })
  }
  function addProject() {
    const id = `project-${Date.now()}`
    setProjects(current => [...current, { ...blankProject, id, title: 'New project', order: current.length + 1 }])
    setExpandedId(id)
    setSearch('')
  }
  function updateContact(id: string, key: keyof ContactButton, value: string | boolean) {
    setSettings(current => ({ ...current, contactButtons: current.contactButtons.map(button => button.id === id ? { ...button, [key]: value } : button) }))
  }
  function addContact() {
    if (settings.contactButtons.length >= 5) return
    const id = `contact-${Date.now()}`
    setSettings(current => ({ ...current, contactButtons: [...current.contactButtons, { id, label: 'New contact link', detail: 'Choose where to reach me', href: '', icon: 'Link2', color: 'coral', enabled: true }] }))
  }
  async function uploadMascot(file?: File) {
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'].includes(file.type)) { setError('Use a PNG, JPG, WebP, GIF, or SVG image.'); return }
    if (file.size > 1_500_000) { setError('Please choose an image under 1.5 MB.'); return }
    const reader = new FileReader()
    reader.onload = () => { if (typeof reader.result === 'string') setSettings(current => ({ ...current, mascot: reader.result as string })); setError(''); setMessage('Mascot preview updated. Save changes to publish it.') }
    reader.onerror = () => setError('Could not read that image. Try another file.')
    reader.readAsDataURL(file)
  }
  async function uploadProjectImage(projectId: string, file?: File) {
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'].includes(file.type)) {
      setError('Use a PNG, JPG, WebP, GIF, or AVIF image.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Choose an image under 4 MB so Vercel can upload it reliably.')
      return
    }
    setUploadingImages(current => ({ ...current, [projectId]: true }))
    setError('')
    setMessage('')
    try {
      const form = new FormData()
      form.append('file', file)
      const response = await fetch('/api/admin/project-image', { method: 'POST', body: form })
      const data = await response.json()
      if (!response.ok || typeof data.url !== 'string') throw new Error(data.error || 'Image upload failed.')
      updateProject(projectId, 'image', data.url)
      setMessage('Image uploaded to Vercel Blob. Save changes to publish it on your portfolio.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Image upload failed.')
    } finally {
      setUploadingImages(current => ({ ...current, [projectId]: false }))
    }
  }
  function pasteProjectImage(projectId: string, event: React.ClipboardEvent<HTMLDivElement>) {
    const imageItem = Array.from(event.clipboardData.items).find(item => item.type.startsWith('image/'))
    const file = imageItem?.getAsFile()
    if (!file) return
    event.preventDefault()
    void uploadProjectImage(projectId, file)
  }

  function addProjectTag(projectId: string) {
    const tag = (tagDrafts[projectId] || '').trim().replace(/,+$/g, '')
    if (!tag) return
    setProjects(current => current.map(project => {
      if (project.id !== projectId || project.stack.some(item => item.toLowerCase() === tag.toLowerCase())) return project
      return { ...project, stack: [...project.stack, tag].slice(0, 30) }
    }))
    setTagDrafts(current => ({ ...current, [projectId]: '' }))
  }
  function removeProjectTag(projectId: string, tagToRemove: string) {
    setProjects(current => current.map(project => project.id === projectId ? { ...project, stack: project.stack.filter(tag => tag !== tagToRemove) } : project))
  }
  async function save() {
    setBusy(true); setError(''); setMessage('')
    try {
      const ordered = projects.map((project, index) => ({ ...project, order: index + 1, id: project.id.trim() || safeId(project.title) || `project-${index + 1}` }))
      if (ordered.some(project => !project.title.trim())) throw new Error('Every project needs a title before saving.')
      if (new Set(ordered.map(project => project.id)).size !== ordered.length) throw new Error('Each project needs a unique ID. Use the ID field to fix duplicates.')
      const [projectResponse, settingsResponse] = await Promise.all([
        fetch('/api/admin/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ordered) }),
        fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) }),
      ])
      const projectData = await projectResponse.json()
      const settingsData = await settingsResponse.json()
      if (!projectResponse.ok) throw new Error(projectData.error || 'Could not save projects.')
      if (!settingsResponse.ok) throw new Error(settingsData.error || 'Projects saved, but site settings could not be saved. Please save again.')
      setProjects(normalizeProjects(ordered)); setSavedSnapshot(JSON.stringify({ projects: ordered, settings })); setMessage('Saved! Project order, contact links, and branding are updated.')
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save changes.') }
    finally { setBusy(false) }
  }
  function resetUnsaved() {
    if (!savedSnapshot || !window.confirm('Discard your unsaved edits and restore the last saved version?')) return
    const snapshot = JSON.parse(savedSnapshot)
    setProjects(normalizeProjects(snapshot.projects)); setSettings(snapshot.settings); setError(''); setMessage('Unsaved changes discarded.')
  }

  const filteredProjects = useMemo(() => projects.filter(project => [project.title, project.category, project.description, project.id, ...project.stack].join(' ').toLowerCase().includes(search.toLowerCase())), [projects, search])
  const dirty = savedSnapshot !== '' && savedSnapshot !== JSON.stringify({ projects, settings })
  const iconPreview = (name: string) => {
    const props = { className: 'size-5 shrink-0', 'aria-hidden': true as const }
    switch (name) {
      case 'MessageCircle': return <MessageCircle {...props} />
      case 'BriefcaseBusiness': return <BriefcaseBusiness {...props} />
      case 'Globe': return <Globe {...props} />
      case 'Github': return <Code2 {...props} />
      case 'Instagram': return <Camera {...props} />
      case 'Mail': return <Mail {...props} />
      case 'MessageSquare': return <MessageSquare {...props} />
      default: return <Link2 {...props} />
    }
  }

  if (!signedIn) return (
    <main className="min-h-screen bg-dots bg-background px-4 py-12 sm:py-20">
      <form onSubmit={signIn} className="mx-auto flex max-w-md flex-col gap-5 rounded-[2rem] border-2 bg-card p-7 shadow-pop sm:p-9">
        <a href="/" className="text-sm font-bold text-muted-foreground hover:text-foreground">← Back to portfolio</a>
        <span className="w-fit -rotate-2 rounded-full border-2 bg-mint px-3 py-1 text-xs font-extrabold tracking-widest">PRIVATE WORKSPACE</span>
        <div><h1 className="font-display text-4xl font-extrabold tracking-tight">The control room<span className="text-coral">.</span></h1><p className="mt-3 leading-relaxed text-muted-foreground">Projects, links, and the little details that make the portfolio yours.</p></div>
        <label className="flex flex-col gap-2 text-sm font-bold">Admin password<input autoComplete="current-password" type="password" value={password} onChange={event => setPassword(event.target.value)} required className="rounded-xl border-2 bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-grape" /></label>
        {error && <p role="alert" className="rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-800">{error}</p>}
        <button disabled={busy} className="rounded-full border-2 bg-grape px-5 py-3 font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5 disabled:opacity-60">{busy ? 'Opening workspace…' : 'Unlock editor →'}</button>
        <p className="text-xs text-muted-foreground">Your editor session is private and expires automatically.</p>
      </form>
    </main>
  )

  return (
    <main className="min-h-screen bg-background px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-5 rounded-[2rem] border-2 bg-card p-5 shadow-pop sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-2 bg-sun text-xl font-black shadow-pop-sm">{settings.mascot ? <Image src={settings.mascot} alt="" width={56} height={56} unoptimized className="size-full rounded-2xl object-cover" /> : 'S'}</div>
            <div><a href="/" className="text-sm font-bold text-muted-foreground hover:text-foreground">← View portfolio</a><h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">The control room<span className="text-coral">.</span></h1><p className="mt-1 text-sm text-muted-foreground">A tidy little workshop for your online presence.</p></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={resetUnsaved} disabled={!dirty || busy} className="inline-flex items-center gap-2 rounded-full border-2 bg-card px-4 py-2.5 text-sm font-bold disabled:opacity-40"><RotateCcw className="size-4" /> Undo unsaved</button>
            <button onClick={save} disabled={busy || !dirty} className="inline-flex items-center gap-2 rounded-full border-2 bg-grape px-5 py-2.5 text-sm font-bold text-white shadow-pop-sm transition-transform hover:-translate-y-0.5 disabled:opacity-50"><Save className="size-4" /> {busy ? 'Saving…' : dirty ? 'Save changes' : 'All saved'}</button>
          </div>
        </header>
        <nav aria-label="Editor sections" className="grid grid-cols-3 gap-2 rounded-2xl border-2 bg-card p-2">
          {([{id:'projects',label:'Projects',icon:<Settings2 className="size-4" />},{id:'contact',label:'Contact buttons',icon:<Link2 className="size-4" />},{id:'branding',label:'Mascot',icon:<ImagePlus className="size-4" />} ] as const).map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-bold transition-colors sm:px-4 ${activeTab === tab.id ? 'border-2 border-foreground bg-sun shadow-pop-sm' : 'hover:bg-background'}`}>{tab.icon}<span className="hidden sm:inline">{tab.label}</span><span className="sm:hidden">{tab.id === 'contact' ? 'Links' : tab.label}</span></button>)}
        </nav>
        {error && <div role="alert" className="flex items-start gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-sm font-semibold text-red-800"><X className="mt-0.5 size-4 shrink-0" />{error}</div>}
        {message && <div role="status" className="flex items-start gap-3 rounded-2xl border-2 border-foreground/15 bg-mint p-4 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0" />{message}</div>}

        {activeTab === 'projects' && <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-3xl border-2 bg-card p-5 shadow-pop sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-display text-2xl font-extrabold">Project shelf <span className="text-muted-foreground">({projects.length})</span></h2><p className="mt-1 text-sm text-muted-foreground">Drag to sort, use the arrows, or type a position number. All three stay in sync.</p></div>
            <button onClick={addProject} className="inline-flex items-center justify-center gap-2 rounded-full border-2 bg-mint px-5 py-3 font-bold shadow-pop-sm transition-transform hover:-translate-y-0.5"><Plus className="size-4" /> Add project</button>
          </div>
          <label className="flex items-center gap-3 rounded-2xl border-2 bg-card px-4 py-3 shadow-pop-sm"><Search className="size-5 text-muted-foreground" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Find a project by name, category, tag…" className="min-w-0 flex-1 bg-transparent py-1 outline-none" /><kbd className="hidden rounded-md border px-2 py-1 text-xs text-muted-foreground sm:inline">Search</kbd>{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X className="size-4" /></button>}</label>
          {search && <p className="px-1 text-sm text-muted-foreground">Showing {filteredProjects.length} of {projects.length}. Reorder controls apply to the full project list.</p>}
          {filteredProjects.map(project => {
            const index = projects.findIndex(item => item.id === project.id)
            const expanded = expandedId === project.id
            return <article key={project.id} draggable={!search} onDragStart={() => setDraggedId(project.id)} onDragOver={event => { if (!search) event.preventDefault() }} onDrop={event => { event.preventDefault(); if (draggedId && !search) moveProject(draggedId, index); setDraggedId(null) }} onDragEnd={() => setDraggedId(null)} className={`overflow-hidden rounded-3xl border-2 bg-card shadow-pop transition-opacity ${draggedId === project.id ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                <button title="Drag to reorder" aria-label={`Drag ${project.title} to reorder`} className="hidden cursor-grab touch-none rounded-xl border-2 p-2 text-muted-foreground active:cursor-grabbing sm:block"><GripVertical className="size-5" /></button>
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl border-2 font-display text-lg font-black ${colorClass[project.color] || 'bg-card'}`}>{index + 1}</div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-lg font-extrabold">{project.title || 'Untitled project'}</h3>{project.featured && <span className="rounded-full border bg-sun px-2 py-0.5 text-[10px] font-extrabold uppercase">Featured</span>}{project.inProgress && <span className="rounded-full border bg-coral px-2 py-0.5 text-[10px] font-extrabold uppercase">In progress</span>}</div><p className="truncate text-sm text-muted-foreground">{project.category || 'No category'} · {project.href ? 'Link added' : 'No link yet'}</p></div>
                <label className="hidden flex-col gap-1 text-[10px] font-extrabold uppercase text-muted-foreground sm:flex">Order<input aria-label={`Order for ${project.title}`} type="number" min={1} max={projects.length} value={orderDrafts[project.id] ?? String(project.order ?? index + 1)} onChange={event => setOrderDrafts(current => ({ ...current, [project.id]: event.target.value }))} onBlur={() => { const draft = orderDrafts[project.id]; if (draft) setProjectOrder(project.id, draft); setOrderDrafts(current => { const next = { ...current }; delete next[project.id]; return next }) }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur() }} className="w-16 rounded-lg border-2 bg-background px-2 py-1.5 text-center text-sm font-bold text-foreground" /></label>
                <div className="flex flex-col gap-1 sm:flex-row"><button disabled={index === 0} onClick={() => moveProject(project.id, index - 1)} aria-label={`Move ${project.title} up`} className="rounded-lg border p-1.5 disabled:opacity-25"><ChevronUp className="size-4" /></button><button disabled={index === projects.length - 1} onClick={() => moveProject(project.id, index + 1)} aria-label={`Move ${project.title} down`} className="rounded-lg border p-1.5 disabled:opacity-25"><ChevronDown className="size-4" /></button></div>
                <button onClick={() => setExpandedId(expanded ? null : project.id)} className="rounded-xl border-2 bg-background px-3 py-2 text-sm font-bold">{expanded ? 'Close' : 'Edit'}</button>
              </div>
              {expanded && <div className="border-t-2 bg-background/70 p-4 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h4 className="font-display text-xl font-extrabold">Project details</h4><p className="text-sm text-muted-foreground">Keep it clear, specific, and honest.</p></div><button onClick={() => { if (window.confirm(`Remove “${project.title}” from the portfolio? This takes effect after saving.`)) { setProjects(current => current.filter(item => item.id !== project.id).map((item, i) => ({...item, order:i+1}))); setExpandedId(null) } }} className="inline-flex items-center gap-2 rounded-full border-2 border-red-300 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"><Trash2 className="size-4" /> Remove</button></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {([['title','Project title'],['category','Category / type'],['href','Project URL'],['image','Image URL or path'],['linkLabel','Button label'],['color','Card colour'],['id','Unique ID']] as [keyof Project,string][]).map(([key,label]) => <label key={key} className="flex flex-col gap-1.5 text-sm font-bold">{label}{key === 'color' ? <select value={String(project.color)} onChange={event => updateProject(project.id,key,event.target.value)} className="rounded-xl border-2 bg-card px-3 py-2.5 font-normal">{colorChoices.map(color => <option key={color} value={color}>{color}</option>)}</select> : <input value={String(project[key] ?? '')} onChange={event => updateProject(project.id,key,event.target.value)} placeholder={key === 'image' ? 'https://… or /images/your-screenshot.png' : key === 'href' ? 'https://…' : ''} className="min-w-0 rounded-xl border-2 bg-card px-3 py-2.5 font-normal" />}</label>)}
                <div tabIndex={0} onPaste={event => pasteProjectImage(project.id, event)} aria-label={`Paste a copied screenshot for ${project.title}`} className="sm:col-span-2 rounded-2xl border-2 border-dashed bg-card p-4 outline-none focus:ring-2 focus:ring-grape">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex-1"><p className="font-bold">Project screenshot</p><p className="text-xs font-normal text-muted-foreground">Upload a file, or click this screenshot area and press Ctrl+V to paste a copied image. You can also paste a direct image URL above. PNG, JPG, WebP, GIF or AVIF · up to 4 MB.</p></div>
                    <label className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 bg-sun px-4 py-2.5 text-sm font-bold ${uploadingImages[project.id] ? 'pointer-events-none opacity-60' : ''}`}><Upload className="size-4" />{uploadingImages[project.id] ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" className="hidden" disabled={Boolean(uploadingImages[project.id])} onChange={event => { void uploadProjectImage(project.id, event.target.files?.[0]); event.currentTarget.value = '' }} /></label>
                  </div>
                  {project.image && <div className="mt-3 flex items-center gap-3"><img src={project.image} alt={`Preview for ${project.title || 'project'}`} className="h-24 w-40 rounded-xl border-2 bg-background object-contain" /><span className="min-w-0 break-all text-xs font-normal text-muted-foreground">{project.image}</span></div>}
                </div>
                </div>
                <label className="mt-4 flex flex-col gap-1.5 text-sm font-bold">Description<textarea value={project.description} onChange={event => updateProject(project.id,'description',event.target.value)} rows={3} maxLength={2000} className="rounded-xl border-2 bg-card px-3 py-2.5 font-normal" /><span className="text-right text-xs font-normal text-muted-foreground">{project.description.length}/2000</span></label>
                <div className="mt-3 flex flex-col gap-2 text-sm font-bold"><span>Tags / technologies</span><div className="flex gap-2"><input value={tagDrafts[project.id] ?? ''} onChange={event => setTagDrafts(current => ({ ...current, [project.id]: event.target.value }))} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addProjectTag(project.id) } }} placeholder="Type one tag, e.g. React" className="min-w-0 flex-1 rounded-xl border-2 bg-card px-3 py-2.5 font-normal" /><button type="button" onClick={() => addProjectTag(project.id)} className="rounded-xl border-2 bg-mint px-4 py-2 font-bold">Add tag</button></div><span className="text-xs font-normal text-muted-foreground">Add each tag separately with Enter or Add tag. No commas needed.</span><span className="flex flex-wrap gap-2 pt-1">{project.stack.map(tag => <span key={tag} className="inline-flex items-center gap-1 rounded-full border-2 bg-card py-1 pl-2.5 pr-1 text-xs">{tag}<button type="button" onClick={() => removeProjectTag(project.id, tag)} aria-label={`Remove ${tag} tag`} className="rounded-full p-1 hover:bg-red-100 hover:text-red-700"><X className="size-3" /></button></span>)}</span></div>
                <div className="mt-4 flex flex-wrap gap-3"><label className="flex items-center gap-2 rounded-xl border-2 bg-card px-3 py-2 text-sm font-semibold"><input type="checkbox" checked={project.featured} onChange={event => updateProject(project.id,'featured',event.target.checked)} /> Featured badge</label><label className="flex items-center gap-2 rounded-xl border-2 bg-card px-3 py-2 text-sm font-semibold"><input type="checkbox" checked={Boolean(project.inProgress)} onChange={event => updateProject(project.id,'inProgress',event.target.checked)} /> Diagonal “In Progress” ribbon</label></div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-dashed bg-card p-3 text-sm"><span className="rounded-lg border bg-sun px-3 py-2 font-bold">#{index + 1}</span><span className="flex-1 text-muted-foreground">Display position</span><input type="number" min={1} max={projects.length} value={orderDrafts[project.id] ?? String(index + 1)} onChange={event => setOrderDrafts(current => ({ ...current, [project.id]: event.target.value }))} onBlur={() => { const draft = orderDrafts[project.id]; if (draft) setProjectOrder(project.id,draft); setOrderDrafts(current => { const next = { ...current }; delete next[project.id]; return next }) }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur() }} className="w-20 rounded-lg border-2 bg-background px-2 py-2 text-center font-bold" /></div>
              </div>}
            </article>
          })}
          {filteredProjects.length === 0 && <div className="rounded-3xl border-2 border-dashed bg-card p-10 text-center"><Search className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-3 font-display text-xl font-extrabold">No matching projects</h3><p className="mt-1 text-sm text-muted-foreground">Try another title or tag, or clear your search.</p></div>}
          <div className="flex flex-wrap gap-3 rounded-2xl border-2 bg-card p-4"><button onClick={() => setProjects(current => current.map((item,index) => ({...item, inProgress:true, order:index+1})))} className="rounded-full border-2 px-4 py-2 text-sm font-bold">Mark all in progress</button><button onClick={() => setProjects(current => current.map((item,index) => ({...item, inProgress:false, order:index+1})))} className="rounded-full border-2 px-4 py-2 text-sm font-bold">Clear progress labels</button></div>
        </section>}

        {activeTab === 'contact' && <section className="flex flex-col gap-5">
          <div className="rounded-3xl border-2 bg-card p-5 shadow-pop sm:p-7"><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-2xl font-extrabold">Say hello, your way</h2><p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">Discord keeps its blue look, Fiverr keeps its mint look. Change the words and links, or add up to three more routes.</p></div><span className="rounded-full border-2 bg-sun px-3 py-1 text-xs font-extrabold">{settings.contactButtons.length}/5</span></div><div className="mt-5 rounded-2xl border-2 bg-grape p-5 text-white"><span className="inline-block -rotate-2 rounded-full border-2 border-foreground bg-card px-3 py-1 text-xs font-black text-foreground">Got a good idea?</span><h3 className="mt-3 font-display text-3xl font-extrabold">Let’s make something cool.</h3><p className="mt-2 text-sm text-white/80">Preview of your enabled contact buttons:</p><div className="mt-4 flex flex-wrap gap-3">{settings.contactButtons.filter(button => button.enabled).map(button => <span key={button.id} className={`inline-flex items-center gap-2 rounded-full border-2 border-foreground px-4 py-2.5 font-bold text-foreground shadow-pop-sm ${colorClass[button.color] || 'bg-card'}`}>{iconPreview(button.icon)}{button.label || 'Untitled link'} ↗</span>)}</div></div></div>
          {settings.contactButtons.map((button,index) => <article key={button.id} className="rounded-3xl border-2 bg-card p-5 shadow-pop sm:p-6"><div className="flex items-center gap-3"><div className={`flex size-12 items-center justify-center rounded-xl border-2 ${colorClass[button.color] || 'bg-card'}`}>{iconPreview(button.icon)}</div><div className="min-w-0 flex-1"><h3 className="font-display text-lg font-extrabold">{button.label || `Contact button ${index+1}`}</h3><p className="truncate text-sm text-muted-foreground">{button.href || 'Add a destination URL'}</p></div><label className="flex items-center gap-2 text-xs font-bold"><input type="checkbox" checked={button.enabled} onChange={event => updateContact(button.id,'enabled',event.target.checked)} /> Show</label>{index > 1 && <button aria-label="Remove contact button" onClick={() => setSettings(current => ({...current,contactButtons:current.contactButtons.filter(item => item.id !== button.id)}))} className="rounded-lg border-2 p-2 text-red-700"><Trash2 className="size-4" /></button>}</div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-1.5 text-sm font-bold">Button label<input value={button.label} maxLength={90} onChange={event => updateContact(button.id,'label',event.target.value)} className="rounded-xl border-2 bg-background px-3 py-2.5 font-normal" /></label><label className="flex flex-col gap-1.5 text-sm font-bold">Small helper text<input value={button.detail} maxLength={140} onChange={event => updateContact(button.id,'detail',event.target.value)} className="rounded-xl border-2 bg-background px-3 py-2.5 font-normal" /></label><label className="flex flex-col gap-1.5 text-sm font-bold sm:col-span-2">Destination URL<input type="url" value={button.href} onChange={event => updateContact(button.id,'href',event.target.value)} placeholder="https://…" className="rounded-xl border-2 bg-background px-3 py-2.5 font-normal" /></label><label className="flex flex-col gap-1.5 text-sm font-bold">Icon<select value={button.icon} onChange={event => updateContact(button.id,'icon',event.target.value)} className="rounded-xl border-2 bg-background px-3 py-2.5 font-normal">{iconChoices.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select></label><label className="flex flex-col gap-1.5 text-sm font-bold">Button colour<select value={button.color} onChange={event => updateContact(button.id,'color',event.target.value)} className="rounded-xl border-2 bg-background px-3 py-2.5 font-normal">{colorChoices.map(color => <option key={color} value={color}>{color}</option>)}</select></label></div></article>)}
          <button disabled={settings.contactButtons.length >= 5} onClick={addContact} className="inline-flex items-center justify-center gap-2 rounded-full border-2 bg-mint px-5 py-3 font-bold shadow-pop-sm disabled:opacity-40"><Plus className="size-4" /> Add another contact button {settings.contactButtons.length >= 5 ? '(limit reached)' : ''}</button>
        </section>}

        {activeTab === 'branding' && <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border-2 bg-card p-5 shadow-pop sm:p-7"><h2 className="font-display text-2xl font-extrabold">Your tiny mascot</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">This replaces the circular “S” mark in the top-left navbar. It will not add a picture to the About section.</p><div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed bg-background p-7"><div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-2 bg-coral text-3xl font-black shadow-pop">{settings.mascot ? <Image src={settings.mascot} alt="Mascot preview" width={96} height={96} unoptimized className="size-full object-cover" /> : 'S'}</div><p className="text-center text-sm text-muted-foreground">{settings.mascot ? 'Mascot ready to publish' : 'Your mascot will appear here'}</p><input ref={mascotInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" className="hidden" onChange={event => uploadMascot(event.target.files?.[0])} /><div className="flex flex-wrap justify-center gap-2"><button onClick={() => mascotInput.current?.click()} className="inline-flex items-center gap-2 rounded-full border-2 bg-sun px-4 py-2.5 font-bold"><Upload className="size-4" /> {settings.mascot ? 'Choose another image' : 'Upload mascot'}</button>{settings.mascot && <button onClick={() => setSettings(current => ({...current,mascot:''}))} className="rounded-full border-2 px-4 py-2.5 font-bold">Restore S logo</button>}</div><p className="text-center text-xs text-muted-foreground">PNG, JPG, WebP, GIF or SVG · up to 1.5 MB</p></div></div>
          <div className="rounded-3xl border-2 bg-card p-5 shadow-pop sm:p-7"><h2 className="font-display text-2xl font-extrabold">Navbar preview</h2><p className="mt-2 text-sm text-muted-foreground">A quick look at how the mascot fits into the existing header.</p><div className="mt-6 rounded-full border-2 bg-background p-2 shadow-pop-sm"><div className="flex items-center justify-between gap-2 rounded-full px-2 py-1"><span className="flex min-w-0 items-center gap-2 font-display text-lg font-extrabold"><span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-coral text-xs">{settings.mascot ? <Image src={settings.mascot} alt="" width={28} height={28} unoptimized className="size-full object-cover" /> : 'S'}</span><span className="truncate">shadow.dev</span></span><span className="rounded-full border-2 bg-grape px-4 py-2 text-xs font-bold text-white">Let’s talk</span></div></div><div className="mt-5 rounded-2xl bg-sun/60 p-4 text-sm leading-relaxed"><strong>Tip:</strong> A square image with the mascot centered usually looks best in the small circular navbar slot. Transparent PNGs work great.</div></div>
        </section>}
        <footer className="flex flex-col gap-3 rounded-2xl border-2 bg-card p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>{dirty ? 'You have unsaved changes.' : 'Everything is saved.'} Save before leaving so your edits reach the live portfolio.</p><div className="flex gap-2"><button onClick={resetUnsaved} disabled={!dirty || busy} className="rounded-full border-2 px-4 py-2 font-bold disabled:opacity-40">Discard</button><button onClick={save} disabled={busy || !dirty} className="rounded-full border-2 bg-grape px-5 py-2 font-bold text-white disabled:opacity-50"><Save className="mr-2 inline size-4" />Save changes</button></div></footer>
      </div>
    </main>
  )
}
