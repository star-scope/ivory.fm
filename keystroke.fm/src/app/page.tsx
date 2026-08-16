import React from 'react'
import Player from './components/Player'
import HoverRule from './components/HoverRule'
import { SPOTIFY_PLAYLIST_URL } from '@/lib/playlist'

/**
 * Soft ellipses grounding the piano. Positioned by centre point as a
 * percentage of the piano box so they scale with it.
 */
const SHADOWS = [
  { src: '/images/shadow-1.svg', left: '17.96%', top: '76.42%', width: '35.26%', height: '5.73%', rot: '-7.88deg' },
  { src: '/images/shadow-2.svg', left: '74.23%', top: '67.28%', width: '13.89%', height: '2.83%', rot: '18.34deg' },
  { src: '/images/shadow-3.svg', left: '66.65%', top: '92.83%', width: '29.26%', height: '5.73%', rot: '-3.56deg' },
  { src: '/images/shadow-4.svg', left: '40.44%', top: '82.59%', width: '29.26%', height: '8.19%', rot: '22.78deg' },
]

export default function Page() {
  return (
    <main className="stage">
      <div className="backgroundGrain" aria-hidden />

      <header>
        <h1 className="start">
          <HoverRule>ivory.fm</HoverRule>
        </h1>
        <img className="mark" src="/images/cybrlite-logo.svg" alt="cybrlite" width={15} height={20} />
        <h1 className="end">
          <HoverRule>by cybrlite</HoverRule>
        </h1>
      </header>

      <div className="piano">
        {SHADOWS.map((shadow) => (
          <img
            key={shadow.src}
            className="piano__shadow"
            src={shadow.src}
            alt=""
            aria-hidden
            style={{
              left: shadow.left,
              top: shadow.top,
              width: shadow.width,
              height: shadow.height,
              ['--rot' as string]: shadow.rot,
            }}
          />
        ))}
        <img className="piano__body" src="/images/piano.png" alt="A grand piano" />
      </div>

      <footer>
        <Player />
        <a
          className="spotify spotify--corner"
          href={SPOTIFY_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the ivory.fm playlist on Spotify"
        >
          <img src="/spotify.svg" alt="" width={30} height={30} />
        </a>
      </footer>
    </main>
  )
}
