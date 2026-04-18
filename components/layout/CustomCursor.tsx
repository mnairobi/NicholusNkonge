'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'
import { motion, AnimatePresence } from 'framer-motion'

export function CustomCursor() {
  const { position, isHovering, isClicking, trail } = useCustomCursor()

  return (
    <>
      {/* Trail dots */}
      <AnimatePresence>
        {trail.map((dot, index) => (
          <motion.div
            key={dot.id}
            className="pointer-events-none fixed z-[9998] rounded-full bg-electric-blue"
            style={{
              left: dot.x,
              top: dot.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0.6, width: 6, height: 6 }}
            animate={{ opacity: 0, width: 2, height: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-electric-blue/50"
        style={{
          left: position.x,
          top: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 20 : 32,
          height: isHovering ? 48 : isClicking ? 20 : 32,
          borderColor: isHovering
            ? 'rgba(0, 240, 255, 0.8)'
            : 'rgba(0, 240, 255, 0.4)',
          boxShadow: isHovering
            ? '0 0 16px rgba(0, 240, 255, 0.4)'
            : '0 0 8px rgba(0, 240, 255, 0.15)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      />

      {/* Inner dot cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-electric-blue"
        style={{
          left: position.x,
          top: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 8 : 4,
          height: isClicking ? 8 : 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </>
  )
}