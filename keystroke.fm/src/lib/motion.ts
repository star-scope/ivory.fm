/** Shared motion settings so the icon transitions stay consistent. */

/** Press feedback on the transport buttons. */
export const POP_SPRING = {
  type: 'spring',
  stiffness: 520,
  damping: 24,
  mass: 0.5,
} as const

/** Scale component of an icon swap. */
export const ICON_SPRING = {
  type: 'spring',
  stiffness: 500,
  damping: 26,
  mass: 0.5,
} as const

/** Opacity and blur component, kept short so the blur does not trail. */
export const ICON_FADE = { duration: 0.22, ease: [0.22, 1, 0.36, 1] } as const

/** An icon swapping out: blurred, shrunk and gone. */
export const ICON_HIDDEN = { opacity: 0, scale: 0.7, filter: 'blur(5px)' } as const

/** An icon in place. */
export const ICON_SHOWN = { opacity: 1, scale: 1, filter: 'blur(0px)' } as const

export const ICON_TRANSITION = {
  scale: ICON_SPRING,
  opacity: ICON_FADE,
  filter: ICON_FADE,
} as const
