import { useCallback, useState } from 'react'
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

type ImageEditorProps = {
  open: boolean
  imageSrc: string
  aspect: number
  outputWidth: number
  outputHeight: number
  fileName?: string
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
  onCancel,
  onConfirm,
}: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [processing, setProcessing] = useState(false)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleApply = async () => {
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
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-base md:text-lg">
            Adjust your image
          </DialogTitle>
        </DialogHeader>

        <div className="relative h-80 md:h-[30rem] w-full overflow-hidden rounded-lg bg-neutral-900">
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
            disabled={processing || !croppedAreaPixels}
            onClick={handleApply}
          >
            {processing ? 'Applying…' : 'Apply'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
