'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorPosition {
  x: number
  y: number
}

interface TrailDot {
  id: number
  x: number
  y: number
}

export function useCustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<TrailDot[]>([])
  const trailIdRef = useRef(0)
  const positionRef = useRef<CursorPosition>({ x: -100, y: -100 })

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let animationFrameId: number
    let lastTrailTime = 0

    const onMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }

      // Throttle trail generation
      const now = Date.now()
      if (now - lastTrailTime > 50) {
        lastTrailTime = now
        const id = trailIdRef.current++
        setTrail((prev) => [
          ...prev.slice(-8), // Keep last 8 dots
          { id, x: e.clientX, y: e.clientY },
        ])
        // Remove dot after animation
        setTimeout(() => {
          setTrail((prev) => prev.filter((dot) => dot.id !== id))
        }, 800)
      }
    }

    const smoothUpdate = () => {
      setPosition((prev) => {
        const dx = positionRef.current.x - prev.x
        const dy = positionRef.current.y - prev.y
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      animationFrameId = requestAnimationFrame(smoothUpdate)
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    animationFrameId = requestAnimationFrame(smoothUpdate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return { position, isHovering, isClicking, trail }
}