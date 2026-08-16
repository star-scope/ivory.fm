import React from 'react'

/**
 * Wraps a label with an SVG underline that sweeps left-to-right on hover and
 * again on leave. The rule stops short of the text box by `--trail` so it ends
 * at the last glyph rather than the trailing letter-space.
 */
export default function HoverRule({ children }: { children: React.ReactNode }) {
  return (
    <span className="hoverRule">
      {children}
      <svg
        className="hoverRule__svg"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <line x1="0" y1="0.5" x2="100" y2="0.5" />
      </svg>
    </span>
  )
}
