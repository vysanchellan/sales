# Video assets

The cinematic sections reference two optional clips:

- `walkthrough.mp4` (H.264) and `walkthrough.webm` (VP9/AV1) — the scroll-scrubbed
  hero walkthrough used by `components/sections/CinematicSequence.tsx` and by any
  property with a `heroVideo` field in `lib/data/properties.ts`.

These binaries are **not committed** (kept out of the repo to stay lightweight).
Until you drop real files here, the site degrades gracefully:

- The cinematic section falls back to a scroll-scrubbed layered scene.
- Property galleries show the poster image instead of a video tile.

## Adding real footage

1. Source a slow drone flyover / interior walkthrough clip (16:9 or 21:9).
2. Compress it, e.g. with ffmpeg:
   ```bash
   ffmpeg -i source.mov -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart walkthrough.mp4
   ffmpeg -i source.mov -vf scale=1920:-2 -c:v libvpx-vp9 -crf 34 -b:v 0 -an walkthrough.webm
   ```
   Keep the file under ~8 MB so it doesn't hurt Lighthouse.
3. Drop both files in this folder. The scroll-scrubbing wires up automatically.

`poster.svg` is the generated fallback poster and is safe to keep.
