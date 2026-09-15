const CLOUDINARY_SEGMENT = '/image/upload/'

const hasExistingTransform = (url: string): boolean => {
  const after = url.split(CLOUDINARY_SEGMENT)[1] ?? ''
  const nextSlash = after.indexOf('/')
  const firstSegment = nextSlash === -1 ? after : after.slice(0, nextSlash)
  // v<version> is not a transformation; anything else (w_, q_, f_, c_, a_…)
  // means a transformation is already present on the URL.
  return (
    firstSegment.includes(',') ||
    /(^|[,_])(w_|q_|f_|c_|e_|d_|a_|g_|r_|fl_)/.test(firstSegment)
  )
}

export const compressCloudinaryUrl = (url?: string, width = 500): string => {
  if (!url) return url ?? ''

  const index = url.indexOf(CLOUDINARY_SEGMENT)
  if (index === -1) return url
  if (hasExistingTransform(url)) return url

  const insertAt = index + CLOUDINARY_SEGMENT.length
  return `${url.slice(0, insertAt)}w_${width},f_auto,q_auto/${url.slice(
    insertAt,
  )}`
}