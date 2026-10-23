import { list, put } from '@vercel/blob'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import initialProjects from '@/data/projects.json'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const key = 'portfolio/projects.json'

function expectedSession(secret: string) {
  return createHmac('sha256', secret).update('shadow-portfolio-admin').digest('hex')
}

async function isAdmin() {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return false
  const jar = await cookies()
  const value = jar.get('shadow_portfolio_admin')?.value
  if (!value) return false
  const expected = Buffer.from(expectedSession(secret))
  const supplied = Buffer.from(value)
  return expected.length === supplied.length && timingSafeEqual(expected, supplied)
}

async function readProjects() {
  const { blobs } = await list({ prefix: key, limit: 10 })
  const blob = blobs.find((item) => item.pathname === key)
  if (!blob) return initialProjects
  const response = await fetch(blob.url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Could not read saved projects.')
  const projects: unknown = await response.json()
  return Array.isArray(projects) ? projects : initialProjects
}

export async function GET() {
  try {
    const projects = await readProjects()
    return NextResponse.json(projects, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch {
    // Bundled data keeps the portfolio readable before Vercel Blob is connected.
    return NextResponse.json(initialProjects, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Please sign in to edit projects.' }, { status: 401 })
  }

  const projects = await request.json().catch(() => null)
  if (!Array.isArray(projects) || projects.length > 200) {
    return NextResponse.json({ error: 'Project data must be a list of up to 200 projects.' }, { status: 400 })
  }

  for (const project of projects) {
    if (!project || typeof project.id !== 'string' || typeof project.title !== 'string' ||
      typeof project.category !== 'string' || typeof project.description !== 'string' ||
      typeof project.href !== 'string' || typeof project.image !== 'string' ||
      typeof project.linkLabel !== 'string' || typeof project.color !== 'string' ||
      (project.inProgress !== undefined && typeof project.inProgress !== 'boolean') ||
      !Array.isArray(project.stack) || typeof project.featured !== 'boolean') {
      return NextResponse.json({ error: 'One or more projects are missing required fields.' }, { status: 400 })
    }
    if (project.title.length > 120 || project.description.length > 2000 ||
      project.href.length > 500 || project.image.length > 500 ||
      project.stack.length > 30 || project.stack.some((item: unknown) => typeof item !== 'string' || item.length > 80)) {
      return NextResponse.json({ error: 'A project field is too long.' }, { status: 400 })
    }
  }

  try {
    await put(key, JSON.stringify(projects), {
      access: 'public',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/json; charset=utf-8',
      cacheControlMaxAge: 60,
    })
    return NextResponse.json({
      ok: true,
      message: 'Saved to Vercel Blob. Your updated projects are now available to everyone.',
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({
      error: 'Could not save projects to Vercel. In your Vercel project, open Storage, create a Blob store, and connect it to this project so BLOB_READ_WRITE_TOKEN is added. Then redeploy and save again.',
    }, { status: 503 })
  }
}
