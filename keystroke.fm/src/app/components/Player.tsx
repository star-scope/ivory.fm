'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Calligraph } from 'calligraph'
import { AnimatePresence, motion } from 'motion/react'
import { FALLBACK_COVER, PLAYLIST, SPOTIFY_PLAYLIST_URL } from '@/lib/playlist'
import { ICON_HIDDEN, ICON_SHOWN, ICON_TRANSITION } from '@/lib/motion'
import TransportButton from './TransportButton'
import VolumeIcon from './VolumeIcon'

/** Pressing back within this many seconds goes to the previous track. */
const RESTART_WINDOW = 3

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/** Fisher-Yates over playlist indices. Playback is always shuffled. */
function shuffle(length: number) {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/** Ratio of a pointer position along an element, from the left or the bottom. */
function ratioFromPointer(
  el: HTMLElement,
  event: React.PointerEvent,
  axis: 'x' | 'y'
) {
  const rect = el.getBoundingClientRect()
  return axis === 'x'
    ? clamp01((event.clientX - rect.left) / rect.width)
    : clamp01(1 - (event.clientY - rect.top) / rect.height)
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  /** Carries play state across a track change without re-triggering effects. */
  const resumeOnLoad = useRef(false)

  /**
   * Starts as playlist order so the server and first client render agree, then
   * shuffles on mount. Shuffling in the initial state would desync hydration.
   */
  const [order, setOrder] = useState<number[]>(() => PLAYLIST.map((_, i) => i))
  const [cursor, setCursor] = useState(0)
  const [hasShuffled, setHasShuffled] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [muted, setMuted] = useState(false)
  const [volumeOpen, setVolumeOpen] = useState(false)
  /** Which way the title and artist characters travel on a skip. */
  const [trend, setTrend] = useState<1 | -1 | 0>(0)

  const trackIndex = order[cursor] ?? 0
  const track = PLAYLIST[trackIndex]
  const progress = duration > 0 ? currentTime / duration : 0

  // Shuffle once mounted, landing on a random opening track.
  useEffect(() => {
    setOrder(shuffle(PLAYLIST.length))
    setCursor(0)
    setHasShuffled(true)
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
    audioRef.current.muted = muted
  }, [volume, muted])

  // Load the new source, and keep playing if we already were.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(0)
    setDuration(0)
    audio.load()
    if (resumeOnLoad.current) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [trackIndex])

  const goTo = useCallback(
    (nextCursor: number, direction: 1 | -1, forcePlay = false) => {
      // On `ended` the element is already paused, so the caller has to say
      // that playback should continue into the next track.
      resumeOnLoad.current = forcePlay || !audioRef.current?.paused
      setTrend(direction)
      if (nextCursor >= order.length) {
        // End of the shuffle: reshuffle and begin the next pass.
        setOrder(shuffle(PLAYLIST.length))
        setCursor(0)
      } else if (nextCursor < 0) {
        setCursor(order.length - 1)
      } else {
        setCursor(nextCursor)
      }
    },
    [order.length]
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {
        console.warn(`[ivory.fm] Could not play ${track.src} — is the file in public/audio?`)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [track.src])

  const previous = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > RESTART_WINDOW) {
      audio.currentTime = 0
      return
    }
    goTo(cursor - 1, -1)
  }, [goTo, cursor])

  const next = useCallback(() => goTo(cursor + 1, 1), [goTo, cursor])

  /** A finished track always rolls into the next one. */
  const handleEnded = useCallback(() => goTo(cursor + 1, 1, true), [goTo, cursor])

  const toggleMute = useCallback(() => {
    setMuted((wasMuted) => {
      // Unmuting from a zero level would still be silent, so give it a floor.
      if (wasMuted && volume === 0) setVolume(0.5)
      return !wasMuted
    })
  }, [volume])

  const seek = (event: React.PointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration) || audio.duration === 0) return
    audio.currentTime = ratioFromPointer(event.currentTarget, event, 'x') * audio.duration
  }

  const changeVolume = (event: React.PointerEvent<HTMLDivElement>) => {
    const next = ratioFromPointer(event.currentTarget, event, 'y')
    setVolume(next)
    // Dragging the slider up is an unmute.
    if (next > 0) setMuted(false)
  }

  /** Click-drag support: act on move only while this pointer is captured. */
  const dragging =
    (handler: (event: React.PointerEvent<HTMLDivElement>) => void) =>
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) handler(event)
    }

  const start =
    (handler: (event: React.PointerEvent<HTMLDivElement>) => void) =>
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Capture is best-effort: it throws if the pointer is already gone, and
      // that must not stop the click itself from registering.
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        /* no capture; the click still applies below */
      }
      handler(event)
    }

  return (
    <div className={`player${isPlaying ? ' player--playing' : ''}`}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleEnded}
        onError={() => setIsPlaying(false)}
      />

      <div className="player__art">
        <img src={track.cover ?? FALLBACK_COVER} alt="" width={120} height={120} />
      </div>

      <div className="player__body">
        {/* Remounting on the initial shuffle makes that one swap instant, so
            the labels do not animate on page load. */}
        <p className="player__meta">
          <Calligraph key={hasShuffled ? 'live' : 'init'} trend={trend} animation="smooth">
            {track.title}
          </Calligraph>
        </p>
        <p className="player__meta player__artist">
          <Calligraph key={hasShuffled ? 'live' : 'init'} trend={trend} animation="smooth">
            {track.artist}
          </Calligraph>
        </p>

        <div className="player__transport">
          <TransportButton label="Previous track" onClick={previous}>
            <img src="/icons/back.svg" alt="" width={24} height={24} />
          </TransportButton>

          <TransportButton label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
            {/* Both glyphs share the same 24px box so they blur through
                each other rather than shifting the row. */}
            <AnimatePresence initial={false}>
              <motion.img
                key={isPlaying ? 'pause' : 'play'}
                className="iconButton__glyph"
                src={isPlaying ? '/icons/pause.svg' : '/icons/play.svg'}
                alt=""
                width={24}
                height={24}
                initial={ICON_HIDDEN}
                animate={ICON_SHOWN}
                exit={ICON_HIDDEN}
                transition={ICON_TRANSITION}
              />
            </AnimatePresence>
          </TransportButton>

          <TransportButton label="Next track" onClick={next}>
            <img src="/icons/forward.svg" alt="" width={24} height={24} />
          </TransportButton>
        </div>

        {/* Replaces the volume control on tablet and below. */}
        <a
          className="spotify player__spotify"
          href={SPOTIFY_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the ivory.fm playlist on Spotify"
        >
          <img src="/spotify.svg" alt="" width={24} height={24} />
        </a>

        <div className="player__progress" aria-hidden>
          <span className="player__progressFill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div
          className="player__seek"
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={start(seek)}
          onPointerMove={dragging(seek)}
        />
      </div>

      {/* Hovering anywhere across the speaker, the gap, and the slider keeps
          the slider up. The two zones are shaped to clear the seek bar. */}
      <div
        className={`volume${volumeOpen ? ' volume--open' : ''}`}
        onPointerEnter={() => setVolumeOpen(true)}
        onPointerLeave={() => setVolumeOpen(false)}
      >
        <div className="volume__zone volume__zone--speaker" />
        <div className="volume__zone volume__zone--slider" />

        <button
          type="button"
          className="iconButton volume__button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          aria-pressed={muted}
        >
          <VolumeIcon level={volume} muted={muted} />
        </button>

        <div className="volume__slider">
          <div className="volume__track" aria-hidden>
            <span
              className="volume__fill"
              style={{ height: `${(muted ? 0 : volume) * 100}%` }}
            />
          </div>
          <div
            className="volume__hit"
            role="slider"
            tabIndex={volumeOpen ? 0 : -1}
            aria-label="Volume level"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((muted ? 0 : volume) * 100)}
            onPointerDown={start(changeVolume)}
            onPointerMove={dragging(changeVolume)}
          />
        </div>
      </div>
    </div>
  )
}
