'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ICON_HIDDEN, ICON_SHOWN, ICON_TRANSITION, ICON_SPRING } from '@/lib/motion'

/**
 * The speaker is one shared path across the volume states, and each arc is its
 * own layer, so sliding fades individual arcs in and out instead of swapping
 * whole icons. Muting cross-fades the whole glyph the way play/pause does.
 * Paths are the 24x24 icons from the design.
 */
const SPEAKER =
  'M10.1568 3.46416C11.3026 2.54749 13 3.36329 13 4.83068V19.1694C13 20.6368 11.3026 21.4526 10.1568 20.5359L6.07931 17.274C5.85767 17.0967 5.58228 17.0001 5.29844 17.0001H3.75C2.23122 17.0001 1 15.7688 1 14.2501V9.75005C1 8.23127 2.23122 7.00005 3.75 7.00005H5.29844C5.58228 7.00005 5.85767 6.90345 6.07931 6.72614L10.1568 3.46416Z'

const TICK =
  'M16.114 9.62433C15.9066 9.26578 15.4478 9.14327 15.0893 9.35068C14.7307 9.5581 14.6082 10.0169 14.8156 10.3754C15.0917 10.8527 15.25 11.4067 15.25 11.9999C15.25 12.5932 15.0917 13.1472 14.8156 13.6244C14.6082 13.983 14.7307 14.4418 15.0893 14.6492C15.4478 14.8566 15.9066 14.7341 16.114 14.3756C16.5187 13.6761 16.75 12.8639 16.75 11.9999C16.75 11.136 16.5187 10.3238 16.114 9.62433Z'

const ARC_INNER =
  'M16.4195 7.581C16.1266 7.28811 15.6517 7.28811 15.3588 7.581C15.0659 7.87389 15.0659 8.34876 15.3588 8.64166C16.2192 9.50206 16.7501 10.6885 16.7501 12.0004C16.7501 13.3123 16.2192 14.4988 15.3588 15.3592C15.0659 15.6521 15.0659 16.1269 15.3588 16.4198C15.6517 16.7127 16.1266 16.7127 16.4195 16.4198C17.5497 15.2896 18.2501 13.7261 18.2501 12.0004C18.2501 10.2747 17.5497 8.7112 16.4195 7.581Z'

const ARC_OUTER =
  'M18.7175 4.22162C19.0104 3.92873 19.4852 3.92873 19.7781 4.22162C21.7679 6.21141 23 8.96244 23 11.9998C23 15.0372 21.7679 17.7882 19.7781 19.778C19.4852 20.0709 19.0104 20.0709 18.7175 19.778C18.4246 19.4851 18.4246 19.0102 18.7175 18.7173C20.4375 16.9973 21.5 14.6234 21.5 11.9998C21.5 9.37624 20.4375 7.00227 18.7175 5.28228C18.4246 4.98939 18.4246 4.51452 18.7175 4.22162Z'

const MUTE = [
  'M20.7803 4.28033C21.0732 3.98744 21.0732 3.51256 20.7803 3.21967C20.4874 2.92678 20.0126 2.92678 19.7197 3.21967L17 5.93934V4.83043C17 3.36305 15.3026 2.54724 14.1568 3.46391L10.0793 6.72589C9.85767 6.90321 9.58228 6.99981 9.29844 6.99981H7.75C6.23122 6.99981 5 8.23103 5 9.74981V14.2498C5 15.2501 5.53402 16.1256 6.33252 16.6068L3.21967 19.7197C2.92678 20.0126 2.92678 20.4874 3.21967 20.7803C3.51256 21.0732 3.98744 21.0732 4.28033 20.7803L20.7803 4.28033Z',
  'M10.0793 17.2737C10.0469 17.2478 10.0134 17.2237 9.9789 17.2013L17 10.1802V19.1692C17 20.6366 15.3026 21.4524 14.1568 20.5357L10.0793 17.2737Z',
]

/** Both glyphs scale about the icon centre, not their own bounding boxes. */
const glyphStyle: React.CSSProperties = {
  transformBox: 'view-box',
  transformOrigin: '12px 12px',
}

/** Arcs grow out of the speaker rather than just fading. */
const arcStyle: React.CSSProperties = {
  transformBox: 'fill-box',
  transformOrigin: 'left center',
}

export default function VolumeIcon({ level, muted }: { level: number; muted: boolean }) {
  const silent = muted || level <= 0
  const arc = (on: boolean) => ({ opacity: on ? 1 : 0, scale: on ? 1 : 0.55 })

  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <motion.g
        style={glyphStyle}
        animate={muted ? ICON_HIDDEN : ICON_SHOWN}
        transition={ICON_TRANSITION}
      >
        <path d={SPEAKER} fill="#222222" />
        <motion.path
          d={TICK}
          fill="#222222"
          style={arcStyle}
          animate={arc(!silent && level <= 1 / 3)}
          transition={ICON_SPRING}
        />
        <motion.path
          d={ARC_INNER}
          fill="#222222"
          style={arcStyle}
          animate={arc(!silent && level > 1 / 3)}
          transition={ICON_SPRING}
        />
        <motion.path
          d={ARC_OUTER}
          fill="#222222"
          style={arcStyle}
          animate={arc(!silent && level > 2 / 3)}
          transition={ICON_SPRING}
        />
      </motion.g>

      <motion.g
        style={glyphStyle}
        animate={muted ? ICON_SHOWN : ICON_HIDDEN}
        transition={ICON_TRANSITION}
      >
        {MUTE.map((d) => (
          <path key={d} d={d} fill="#222222" />
        ))}
      </motion.g>
    </svg>
  )
}
