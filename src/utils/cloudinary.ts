const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

type UploadedFile = {
  url: string
  public_id: string
}

async function uploadFile(file: File): Promise<UploadedFile> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
  const MAX_ATTEMPTS = 2
  let lastMessage = 'Upload failed. Please try again.'

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let response: Response
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
    } catch {
      lastMessage =
        'Network error while uploading. Check your connection and try again.'
      continue
    }

    if (response.ok) {
      const data = await response.json()
      return {
        url: data.secure_url,
        public_id: data.public_id,
      }
    }

    let message = `Upload failed (status ${response.status})`
    const payload = await response.json().catch(() => null)
    if (payload?.error?.message) message = payload.error.message
    lastMessage = message

    if (response.status !== 429) break
  }

  console.error('Media upload error:', lastMessage)
  throw new Error('Upload failed. Please try again.')
}

export const uploadToCloudinary = async (files: File[] | null) => {
  if (!files) return null

  const uploadedUrls: UploadedFile[] = []
  for (const file of files) {
    uploadedUrls.push(await uploadFile(file))
  }

  return uploadedUrls
}