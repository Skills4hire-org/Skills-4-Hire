import type { Area } from 'react-easy-crop'

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  outputWidth: number,
  outputHeight: number,
): Promise<Blob> => {
  const image = await createImage(imageSrc)
  const rotRad = getRadianAngle(rotation)
  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2)) + 1

  const safeCanvas = document.createElement('canvas')
  safeCanvas.width = safeArea
  safeCanvas.height = safeArea
  const safeCtx = safeCanvas.getContext('2d')
  if (!safeCtx) throw new Error('Canvas is not supported')
  safeCtx.translate(safeArea / 2, safeArea / 2)
  safeCtx.rotate(rotRad)
  safeCtx.drawImage(image, -image.width / 2, -image.height / 2)

  const cropCanvas = document.createElement('canvas')
  cropCanvas.width = pixelCrop.width
  cropCanvas.height = pixelCrop.height
  const cropCtx = cropCanvas.getContext('2d')
  if (!cropCtx) throw new Error('Canvas is not supported')
  cropCtx.imageSmoothingQuality = 'high'
  cropCtx.drawImage(
    safeCanvas,
    safeArea / 2 - image.width / 2 + pixelCrop.x,
    safeArea / 2 - image.height / 2 + pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  const outputCanvas = document.createElement('canvas')
  outputCanvas.width = outputWidth
  outputCanvas.height = outputHeight
  const outputCtx = outputCanvas.getContext('2d')
  if (!outputCtx) throw new Error('Canvas is not supported')
  outputCtx.fillStyle = '#fff'
  outputCtx.fillRect(0, 0, outputWidth, outputHeight)
  outputCtx.imageSmoothingEnabled = true
  outputCtx.imageSmoothingQuality = 'high'
  outputCtx.drawImage(
    cropCanvas,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight,
  )

  return new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to crop image'))
        }
      },
      'image/jpeg',
      0.92,
    )
  })
}
