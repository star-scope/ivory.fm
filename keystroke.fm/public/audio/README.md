# Audio files

The player streams from this folder. Each entry in `src/lib/playlist.ts` points at
a file here via its `src` field, e.g.:

```
{ title: 'Alice in Wonderland', artist: 'Nahre Sol', src: '/audio/alice-in-wonderland.mp3' }
```

Drop `alice-in-wonderland.mp3` into this folder and that track plays. Filenames are
the track title lowercased with non-alphanumerics collapsed to hyphens.

Tracks whose file is missing simply fail to start — the console names the file it
looked for. Per-track cover art is optional: set `cover` on the entry to a path
under `public/images`, otherwise `album-art.jpg` is used.

Only add files you have the right to distribute.
