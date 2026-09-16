import { useState } from 'react'
import { Check, Copy, ExternalLink, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shareUrl: string
  shareText?: string
}

export default function ShareDialog({
  open,
  onOpenChange,
  shareUrl,
  shareText,
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Post link copied to clipboard')
      setTimeout(() => setCopied(false), 1500)
    } catch {
      toast.error('Unable to copy the post link')
    }
  }

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: 'Skills4Hire post',
        text: shareText,
        url: shareUrl,
      })
      onOpenChange(false)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share post
          </DialogTitle>
          <DialogDescription>
            Share this post with anyone on the Skills4Hire platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="share-url"
            className="block text-xs md:text-sm font-medium text-gray-700"
          >
            Post link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="share-url"
              type="text"
              readOnly
              value={shareUrl}
              onFocus={(event) => event.target.select()}
              className="flex-1 min-w-0 h-10 rounded-md border border-gray-300 bg-gray-50 px-3 text-xs md:text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs md:text-sm text-primary hover:underline font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open post in a new tab
          </a>
        </div>

        <DialogFooter showCloseButton className="mt-2">
          {canNativeShare && (
            <Button type="button" variant="outline" onClick={handleNativeShare}>
              <Share2 className="w-3.5 h-3.5" />
              Share via...
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}