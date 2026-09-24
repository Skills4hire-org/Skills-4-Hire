import { api } from '@/utils/axiosConfig'
import { handleApiError } from '@/api/error'

type UploadSpec = {
  upload_url: string
  method: string
  headers: Record<string, string>
  object_key: string
  public_url: string
  expires_in: number
}

export type UploadedFile = {
  url: string
  public_id: string
}

async function getUploadSpec(file: File): Promise<UploadSpec> {
  try {
    const response = await api.post('/api/v1/media/upload-url/', {
      filename: file.name,
      content_type: file.type || 'application/octet-stream',
      size: file.size,
      folder: 'uploads',
    })
    const spec = response.data as Partial<UploadSpec>
    if (!spec?.upload_url || !spec?.public_url) {
      throw new Error('Could not prepare the upload. Please try again.')
    }
    return spec as UploadSpec
  } catch (error) {
    handleApiError(error)
  }
}

async function uploadFile(file: File): Promise<UploadedFile> {
  const spec = await getUploadSpec(file)

  const MAX_ATTEMPTS = 2
  let lastMessage = 'Upload failed. Please try again.'

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let response: Response
    try {
      response = await fetch(spec.upload_url, {
        method: spec.method,
        headers: spec.headers,
        body: file,
      })
    } catch {
      lastMessage =
        'Network error while uploading. Check your connection and try again.'
      continue
    }

    if (response.ok) {
      return {
        url: spec.public_url,
        public_id: spec.object_key,
      }
    }

    let message = `Upload failed (status ${response.status})`
    const payload = await response.json().catch(() => null)
    if (payload?.message) message = payload.message
    lastMessage = message

    if (response.status !== 429) break
  }

  console.error('Media upload error:', lastMessage)
  throw new Error('Upload failed. Please try again.')
}

export const uploadToR2 = async (files: File[] | null) => {
  if (!files) return null

  const uploadedUrls: UploadedFile[] = []
  for (const file of files) {
    uploadedUrls.push(await uploadFile(file))
  }

  return uploadedUrls
}