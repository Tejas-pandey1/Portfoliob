import { put } from '@vercel/blob'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Please sign in to upload project images.' }, { status: 401 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Choose an image file and try again.' }, { status: 400 })
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Choose an image file to upload.' }, { status: 400 })
  }

  const allowedTypes = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'])
  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: 'Use a PNG, JPG, WebP, GIF, or AVIF image.' }, { status: 400 })
  }
  if (file.size <= 0 || file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: 'Choose an image larger than 0 bytes and under 4 MB.' }, { status: 413 })
  }

  const extensionByType: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^[-.]+|[-.]+$/g, '').slice(0, 70) || 'project-image'
  const filename = `portfolio/project-images/${Date.now()}-${safeName.replace(/\.[^.]+$/, '')}.${extensionByType[file.type]}`

  try {
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
    })
    return NextResponse.json({ url: blob.url }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({
      error: 'Vercel could not upload the image. Check that this project is connected to your PUBLIC Vercel Blob store and has its BLOB_READ_WRITE_TOKEN environment variable, then redeploy.',
    }, { status: 503 })
  }
}
