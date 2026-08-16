/**
 * Client-side calls against the routes in pages/api. Not wired into the UI
 * yet — this is the logic the player will use once playback is switched on.
 */

export type Track = {
  title: string
  artist: string
  coverArtUrl: string
}

export async function fetchCurrentTrack(): Promise<Track> {
  const response = await fetch('/api/current-track')
  return response.json()
}

export async function togglePlay(): Promise<boolean> {
  const response = await fetch('/api/toggle-play', { method: 'POST' })
  const { playing } = await response.json()
  return playing
}

export async function skipForward(): Promise<boolean> {
  const response = await fetch('/api/skip-forward', { method: 'POST' })
  const { success } = await response.json()
  return success
}

export async function skipBackwards(): Promise<boolean> {
  const response = await fetch('/api/skip-backwards', { method: 'POST' })
  const { success } = await response.json()
  return success
}
