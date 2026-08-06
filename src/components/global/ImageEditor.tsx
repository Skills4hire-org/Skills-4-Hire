import { useCallback, useEffect, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { RotateCw } from 'lucide-react'
import { getCroppedImg } from '@/utils/imageCrop'
import { cn } from '@/lib/utils'

type ImageEditorProps = {
  open: boolean
  imageSrc: string
  aspect: number
  outputWidth: number
  outputHeight: number
  fileName?: string
  originalFile?: File | null
  onCancel: () => void
  onConfirm: (file: File) => void
}

export default function ImageEditor({
  open,
  imageSrc,
  aspect,
  outputWidth,
  outputHeight,
  fileName,
  originalFile,
  onCancel,
  onConfirm,
}: ImageEditorProps) {
  const [mode, setMode] = useState<'crop' | 'original'>(
    originalFile ? 'original' : 'crop',
  )
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (open) {
      setMode(originalFile ? 'original' : 'crop')
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setRotation(0)
      setCroppedAreaPixels(null)
      setProcessing(false)
    }
  }, [open, originalFile])

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleApply = async () => {
    if (mode === 'original') {
      if (!originalFile) return
      onConfirm(originalFile)
      return
    }
    if (!croppedAreaPixels) return
    setProcessing(true)
    try {
      const blob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        outputWidth,
        outputHeight,
      )
      const file = new File(
        [blob],
        fileName ?? `cropped-${Date.now()}.jpg`,
        { type: 'image/jpeg' },
      )
      onConfirm(file)
    } catch {
      onCancel()
    } finally {
      setProcessing(false)
      setRotation(0)
      setZoom(1)
      setCrop({ x: 0, y: 0 })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onCancel()}>
      <DialogContent className="sm:max-w-3xl lg:max-w-4xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-base md:text-lg">
            Adjust your image
          </DialogTitle>
        </DialogHeader>

        {originalFile && (
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setMode('crop')}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer',
                mode === 'crop'
                  ? 'bg-[#222BDE] text-white border-[#222BDE]'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50',
              )}
            >
              Crop
            </button>
            <button
              type="button"
              onClick={() => setMode('original')}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer',
                mode === 'original'
                  ? 'bg-[#222BDE] text-white border-[#222BDE]'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50',
              )}
            >
              Use original
            </button>
          </div>
        )}

        {mode === 'crop' ? (
          <>
            <div className="relative h-80 md:h-[32rem] lg:h-[36rem] w-full overflow-hidden rounded-lg bg-neutral-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                Rotate
              </button>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                aria-label="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 cursor-pointer"
              />
            </div>
          </>
        ) : (
          <div className="relative h-80 md:h-[32rem] lg:h-[36rem] w-full overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Original image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={processing}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-green-600"
            disabled={
              processing ||
              (mode === 'crop' && !croppedAreaPixels) ||
              (mode === 'original' && !originalFile)
            }
            onClick={handleApply}
          >
            {processing
              ? 'Applying…'
              : mode === 'original'
                ? 'Use original'
                : 'Crop image'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
