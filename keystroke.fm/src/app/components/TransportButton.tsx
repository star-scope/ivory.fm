'use client'

import React from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { POP_SPRING } from '@/lib/motion'

type TransportButtonProps = {
  label: string
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export default function TransportButton({
  label,
  onClick,
  children,
  className = '',
}: TransportButtonProps) {
  const controls = useAnimationControls()

  return (
    <button
      type="button"
      className={`iconButton ${className}`.trim()}
      aria-label={label}
      onClick={() => {
        controls.set({ scale: 0.86 })
        controls.start({ scale: 1 }, POP_SPRING)
        onClick()
      }}
    >
      <motion.span className="iconButton__inner" animate={controls}>
        {children}
      </motion.span>
    </button>
  )
}
