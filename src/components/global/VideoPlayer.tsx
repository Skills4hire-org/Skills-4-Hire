import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Loader2,
  Maximize,
  Minimize,
  Pause,
  PictureInPicture2,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

type VideoPlayerProps = {
  src: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  fit?: 'contain' | 'cover'
  className?: string
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  fit = 'contain',
  className,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekBarRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isBuffering, setIsBuffering] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDraggingSeek, setIsDraggingSeek] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const controlsVisible = !controls || isHovering || !isPlaying || isDraggingSeek

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setIsHovering(false)
      }
    }, 3000)
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const handleVolumeChange = useCallback(
    (value: number) => {
      const video = videoRef.current
      if (!video) return
      const nextVolume = Math.min(Math.max(value, 0), 1)
      video.muted = nextVolume === 0
      video.volume = nextVolume
      setVolume(nextVolume)
      setIsMuted(video.muted)
    },
    [],
  )

  const handleSeek = useCallback(
    (clientX: number) => {
      const video = videoRef.current
      const bar = seekBarRef.current
      if (!video || !bar || !duration) return
      const rect = bar.getBoundingClientRect()
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
      video.currentTime = ratio * duration
      setCurrentTime(video.currentTime)
    },
    [duration],
  )

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void container.requestFullscreen()
    }
  }, [])

  const togglePictureInPicture = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else if (document.pictureInPictureEnabled) {
        await video.requestPictureInPicture()
      }
    } catch {
      // Picture-in-Picture is not supported in this browser
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoPlay) return
    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {
        // autoplay was blocked; the user can press play manually
      })
    }
  }, [autoPlay, src])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const playedPercentage =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0
  const bufferedPercentage = Math.min(buffered * 100, 100)

  return (
    <div
      ref={containerRef}
      className={cn(
        'group/player relative w-full overflow-hidden bg-black select-none flex items-center justify-center',
        className,
      )}
      onMouseEnter={() => {
        setIsHovering(true)
        if (controls) scheduleHide()
      }}
      onMouseMove={() => {
        if (controls) scheduleHide()
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        onClick={controls ? togglePlay : undefined}
        onDoubleClick={controls ? toggleFullscreen : undefined}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => {
          const video = e.currentTarget
          setDuration(video.duration || 0)
          setVolume(video.volume || 1)
          setIsMuted(video.muted)
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onProgress={(e) => {
          const video = e.currentTarget
          if (video.buffered.length > 0) {
            setBuffered(
              video.buffered.end(video.buffered.length - 1) /
                (video.duration || 1),
            )
          }
        }}
        className={cn(
          fit === 'cover'
            ? 'w-full h-full object-cover'
            : 'max-w-full max-h-full object-contain',
        )}
      />

      {controls && (
        <>
          {isBuffering && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          )}

          {!isPlaying && !isBuffering && (
            <button
              type="button"
              aria-label="Play"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                <Play className="w-6 h-6 md:w-7 md:h-7 text-gray-900 fill-current translate-x-0.5" />
              </span>
            </button>
          )}

          <div
            className={cn(
              'absolute inset-x-0 bottom-0 px-3 pb-2 pt-12 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-200',
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <div
              ref={seekBarRef}
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(currentTime)}
              className="group/seek relative h-4 flex items-center cursor-pointer"
              onPointerDown={(e) => {
                setIsDraggingSeek(true)
                handleSeek(e.clientX)
                ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
              }}
              onPointerMove={(e) => {
                if (isDraggingSeek) handleSeek(e.clientX)
              }}
              onPointerUp={(e) => {
                setIsDraggingSeek(false)
                handleSeek(e.clientX)
              }}
              onPointerLeave={() => {
                if (isDraggingSeek) setIsDraggingSeek(false)
              }}
            >
              <div className="relative w-full h-1 group-hover/seek:h-1.5 bg-white/30 rounded-full transition-all">
                <div
                  className="absolute inset-y-0 left-0 bg-white/40 rounded-full"
                  style={{ width: `${bufferedPercentage}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-[#0A66C2] rounded-full"
                  style={{ width: `${playedPercentage}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/seek:opacity-100 transition-opacity"
                  style={{ left: `calc(${playedPercentage}% - 6px)` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2 mt-1 text-white">
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                onClick={togglePlay}
                className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                )}
              </button>

              <button
                type="button"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                onClick={toggleMute}
                className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume * 100}
                onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
                aria-label="Volume"
                className="video-volume-slider w-16 md:w-20 accent-white cursor-pointer"
              />

              <span className="text-[11px] md:text-xs tabular-nums text-white/90 ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Playback speed"
                    className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer transition-colors text-[11px] md:text-xs font-semibold tabular-nums"
                  >
                    {playbackRate}x
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuRadioGroup
                    value={String(playbackRate)}
                    onValueChange={(value) => {
                      const video = videoRef.current
                      if (!video) return
                      const rate = Number(value)
                      video.playbackRate = rate
                      setPlaybackRate(rate)
                    }}
                  >
                    {PLAYBACK_SPEEDS.map((speed) => (
                      <DropdownMenuRadioItem key={speed} value={String(speed)}>
                        {speed}x
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                type="button"
                aria-label="Picture in picture"
                onClick={togglePictureInPicture}
                className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer transition-colors hidden sm:flex"
              >
                <PictureInPicture2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                type="button"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                onClick={toggleFullscreen}
                className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Maximize className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
