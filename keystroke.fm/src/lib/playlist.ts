export type Track = {
  title: string
  artist: string
  /** File under public/audio. */
  src: string
  /** Optional cover art under public/images; falls back to the default. */
  cover?: string
}

export const FALLBACK_COVER = '/images/album-art.jpg'

export const SPOTIFY_PLAYLIST_URL =
  'https://open.spotify.com/playlist/5q0vGtMNPhuxTtZ5sb24PW'

/**
 * Generated from the files in public/audio, in playlist order. Playback always
 * shuffles, so this order only sets the pool. Add a track by dropping an mp3
 * into public/audio and adding an entry here.
 */
export const PLAYLIST: Track[] = [
  { title: 'Alice in Wonderland', artist: 'Nahre Sol', src: '/audio/alice-in-wonderland.mp3', cover: '/images/covers/alice-in-wonderland.jpg' },
  { title: 'Salad Music', artist: 'Nahre Sol', src: '/audio/salad-music.mp3', cover: '/images/covers/salad-music.jpg' },
  { title: 'Sideways', artist: 'Nahre Sol', src: '/audio/sideways.mp3', cover: '/images/covers/sideways.jpg' },
  { title: 'Empty Rituals', artist: 'Nahre Sol', src: '/audio/empty-rituals.mp3', cover: '/images/covers/empty-rituals.jpg' },
  { title: 'Anonymous Footsteps', artist: 'Nahre Sol', src: '/audio/anonymous-footsteps.mp3', cover: '/images/covers/anonymous-footsteps.jpg' },
  { title: 'Acquiescence', artist: 'Nahre Sol', src: '/audio/acquiescence.mp3', cover: '/images/covers/acquiescence.jpg' },
  { title: 'Coucou Waltz', artist: 'Nahre Sol', src: '/audio/coucou-waltz.mp3', cover: '/images/covers/coucou-waltz.jpg' },
  { title: 'Zora\'s Domain (Day) [From The Legend of Zelda Breath of the Wild ] [Piano Version]', artist: 'Streaming Music Studios', src: '/audio/zoras-domain-day-from-the-legend-of-zelda-breath-of-the-wild.mp3', cover: '/images/covers/zoras-domain-day-from-the-legend-of-zelda-breath-of-the-wild.jpg' },
  { title: 'Bee', artist: 'RIOPY', src: '/audio/bee.mp3', cover: '/images/covers/bee.jpg' },
  { title: 'High Above', artist: 'Austin Farwell', src: '/audio/high-above.mp3', cover: '/images/covers/high-above.jpg' },
  { title: 'Together', artist: 'Austin Farwell, A N T I T H E S I S', src: '/audio/together.mp3', cover: '/images/covers/together.jpg' },
  { title: 'Take Me Away', artist: 'Austin Farwell', src: '/audio/take-me-away.mp3', cover: '/images/covers/take-me-away.jpg' },
  { title: 'City Lights', artist: 'Austin Farwell', src: '/audio/city-lights.mp3', cover: '/images/covers/city-lights.jpg' },
  { title: 'Evening Sky', artist: 'Austin Farwell', src: '/audio/evening-sky.mp3', cover: '/images/covers/evening-sky.jpg' },
  { title: 'Once Upon a Time', artist: 'Austin Farwell', src: '/audio/once-upon-a-time.mp3', cover: '/images/covers/once-upon-a-time.jpg' },
  { title: 'Smile More', artist: 'Austin Farwell', src: '/audio/smile-more.mp3', cover: '/images/covers/smile-more.jpg' },
  { title: 'Santa Monica', artist: 'Austin Farwell', src: '/audio/santa-monica.mp3', cover: '/images/covers/santa-monica.jpg' },
  { title: 'The Walk We Go', artist: 'Austin Farwell', src: '/audio/the-walk-we-go.mp3', cover: '/images/covers/the-walk-we-go.jpg' },
  { title: 'thoughts', artist: 'LilyPichu', src: '/audio/thoughts.mp3', cover: '/images/covers/thoughts.jpg' },
  { title: 'consolation', artist: 'LilyPichu', src: '/audio/consolation.mp3', cover: '/images/covers/consolation.jpg' },
  { title: 'wilting memories', artist: 'LilyPichu, Jun Sung Ahn', src: '/audio/wilting-memories.mp3', cover: '/images/covers/wilting-memories.jpg' },
  { title: 'walking with you', artist: 'LilyPichu', src: '/audio/walking-with-you.mp3', cover: '/images/covers/walking-with-you.jpg' },
  { title: 'Psyche', artist: 'Daniël Tomàs', src: '/audio/psyche.mp3', cover: '/images/covers/psyche.jpg' },
  { title: 'ACABb', artist: 'Kai Schumacher', src: '/audio/acabb.mp3', cover: '/images/covers/acabb.jpg' },
  { title: 'Hikaru Nara', artist: 'Cat Trumpet', src: '/audio/hikaru-nara.mp3', cover: '/images/covers/hikaru-nara.jpg' },
  { title: 'Shigatsu wa Kimi no Uso (Piano Solo) [From Your Lie in April ]', artist: 'Moisés Nieto', src: '/audio/shigatsu-wa-kimi-no-uso-piano-solo-from-your-lie-in-april.mp3', cover: '/images/covers/shigatsu-wa-kimi-no-uso-piano-solo-from-your-lie-in-april.jpg' },
  { title: 'Zelda\'s Lament (A Legend of Zelda Piano Medley Zelda\'s Lullaby Song of Healing Midna\'s Lament Fi\'s Farewell)', artist: 'Laura Platt', src: '/audio/zeldas-lament-a-legend-of-zelda-piano-medley-zeldas-lullaby.mp3', cover: '/images/covers/zeldas-lament-a-legend-of-zelda-piano-medley-zeldas-lullaby.jpg' },
  { title: 'Song of Storms - Instrumental', artist: 'Super Piano 64', src: '/audio/song-of-storms-instrumental.mp3', cover: '/images/covers/song-of-storms-instrumental.jpg' },
  { title: 'Rito Village (Day) [From Zelda Breath Of The Wild ] [For Piano Solo]', artist: 'daigoro789', src: '/audio/rito-village-day-from-zelda-breath-of-the-wild-for-piano-sol.mp3', cover: '/images/covers/rito-village-day-from-zelda-breath-of-the-wild-for-piano-sol.jpg' },
  { title: 'Riding (Day)', artist: 'User Youth', src: '/audio/riding-day.mp3', cover: '/images/covers/riding-day.jpg' },
  { title: 'End Credits - Instrumental', artist: 'Super Piano 64', src: '/audio/end-credits-instrumental.mp3', cover: '/images/covers/end-credits-instrumental.jpg' },
  { title: 'Poem+', artist: 'Yiruma', src: '/audio/poem.mp3', cover: '/images/covers/poem.jpg' },
  { title: 'River Flows in You', artist: 'Yiruma', src: '/audio/river-flows-in-you.mp3', cover: '/images/covers/river-flows-in-you.jpg' },
  { title: 'Chaconne', artist: 'Yiruma', src: '/audio/chaconne.mp3', cover: '/images/covers/chaconne.jpg' },
  { title: 'Kiss the Rain', artist: 'Yiruma', src: '/audio/kiss-the-rain.mp3', cover: '/images/covers/kiss-the-rain.jpg' },
  { title: 'May Be', artist: 'Yiruma', src: '/audio/may-be.mp3', cover: '/images/covers/may-be.jpg' },
  { title: 'Do You', artist: 'Yiruma', src: '/audio/do-you.mp3', cover: '/images/covers/do-you.jpg' },
  { title: 'Passing By', artist: 'Yiruma', src: '/audio/passing-by.mp3', cover: '/images/covers/passing-by.jpg' },
  { title: 'Fotografia', artist: 'Yiruma', src: '/audio/fotografia.mp3', cover: '/images/covers/fotografia.jpg' },
  { title: 'Scenery', artist: 'Yiruma', src: '/audio/scenery.mp3', cover: '/images/covers/scenery.jpg' },
  { title: 'Loanna', artist: 'Yiruma', src: '/audio/loanna.mp3', cover: '/images/covers/loanna.jpg' },
  { title: 'Sky', artist: 'Yiruma', src: '/audio/sky.mp3', cover: '/images/covers/sky.jpg' },
  { title: 'Wait There', artist: 'Yiruma', src: '/audio/wait-there.mp3', cover: '/images/covers/wait-there.jpg' },
  { title: 'Love Me', artist: 'Yiruma', src: '/audio/love-me.mp3', cover: '/images/covers/love-me.jpg' },
  { title: 'Infinia', artist: 'Yiruma', src: '/audio/infinia.mp3', cover: '/images/covers/infinia.jpg' },
  { title: 'Reminiscent', artist: 'Yiruma', src: '/audio/reminiscent.mp3', cover: '/images/covers/reminiscent.jpg' },
  { title: 'Fairy Tale', artist: 'Yiruma', src: '/audio/fairy-tale.mp3', cover: '/images/covers/fairy-tale.jpg' },
  { title: 'The Name of Life - Piano Solo Version', artist: 'Hikaru Shirosu', src: '/audio/the-name-of-life-piano-solo-version.mp3', cover: '/images/covers/the-name-of-life-piano-solo-version.jpg' },
  { title: 'Dearly Beloved', artist: 'Kyle Landry', src: '/audio/dearly-beloved.mp3', cover: '/images/covers/dearly-beloved.jpg' },
  { title: 'Shigatsu - Otouto Mitai Na Sonzai Piano', artist: 'Kyle Landry', src: '/audio/shigatsu-otouto-mitai-na-sonzai-piano.mp3', cover: '/images/covers/shigatsu-otouto-mitai-na-sonzai-piano.jpg' },
  { title: 'Howl\'s Moving Castle Theme', artist: 'Kyle Landry', src: '/audio/howls-moving-castle-theme.mp3', cover: '/images/covers/howls-moving-castle-theme.jpg' },
  { title: 'Bluebird (Solo Piano Version)', artist: 'Alexis Ffrench', src: '/audio/bluebird-solo-piano-version.mp3', cover: '/images/covers/bluebird-solo-piano-version.jpg' },
  { title: 'Last Song', artist: 'Alexis Ffrench', src: '/audio/last-song.mp3', cover: '/images/covers/last-song.jpg' },
  { title: 'Monstercat (Piano Mix)', artist: 'Evan Duffy', src: '/audio/monstercat-piano-mix.mp3', cover: '/images/covers/monstercat-piano-mix.jpg' },
  { title: 'A Town with an Ocean View (From Kiki\'s Delivery Service ) - Piano Cover', artist: 'Robin Appelqvist, 広橋真紀子', src: '/audio/a-town-with-an-ocean-view-from-kikis-delivery-service-piano.mp3', cover: '/images/covers/a-town-with-an-ocean-view-from-kikis-delivery-service-piano.jpg' },
  { title: 'Outro (feat. Austin Rafuse)', artist: 'Rezonate, Austin Rafuse', src: '/audio/outro-feat-austin-rafuse.mp3', cover: '/images/covers/outro-feat-austin-rafuse.jpg' },
  { title: 'Main Theme (From The Legend of Zelda Breath of the Wild ) [Piano Version]', artist: 'Streaming Music Studios', src: '/audio/main-theme-from-the-legend-of-zelda-breath-of-the-wild-piano.mp3', cover: '/images/covers/main-theme-from-the-legend-of-zelda-breath-of-the-wild-piano.jpg' },
]
