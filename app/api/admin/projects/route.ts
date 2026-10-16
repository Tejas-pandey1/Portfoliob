import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const owner = 'Tejas-pandey1'
const repo = 'Portfoliob'
const path = 'data/projects.json'

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

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Please sign in to edit projects.' }, { status: 401 })
  const token = process.env.GITHUB_TOKEN
  if (!token) return NextResponse.json({ error: 'GITHUB_TOKEN is not configured.' }, { status: 503 })

  const projects = await request.json().catch(() => null)
  if (!Array.isArray(projects) || projects.length > 200) {
    return NextResponse.json({ error: 'Project data must be a list of up to 200 projects.' }, { status: 400 })
  }
  for (const project of projects) {
    if (!project || typeof project.id !== 'string' || typeof project.title !== 'string' ||
      typeof project.description !== 'string' || typeof project.href !== 'string' ||
      typeof project.image !== 'string' || !Array.isArray(project.stack)) {
      return NextResponse.json({ error: 'One or more projects are missing required fields.' }, { status: 400 })
    }
    if (project.title.length > 120 || project.description.length > 2000 || project.href.length > 500 ||
      project.image.length > 500 || project.stack.length > 30) {
      return NextResponse.json({ error: 'A project field is too long.' }, { status: 400 })
    }
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
  const currentResponse = await fetch(apiUrl, { headers, cache: 'no-store' })
  if (!currentResponse.ok) return NextResponse.json({ error: 'Could not read the project file from GitHub.' }, { status: 502 })
  const current = await currentResponse.json()
  const content = Buffer.from(JSON.stringify(projects, null, 2) + '\n').toString('base64')
  const saved = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: 'Update portfolio projects from private admin',
      content,
      sha: current.sha,
      branch: 'main',
    }),
    cache: 'no-store',
  })
  if (!saved.ok) return NextResponse.json({ error: 'GitHub rejected the update. Check that GITHUB_TOKEN can write repository contents.' }, { status: 502 })
  return NextResponse.json({ ok: true, message: 'Saved to GitHub. Your deployment will refresh after the new build finishes.' })
}
