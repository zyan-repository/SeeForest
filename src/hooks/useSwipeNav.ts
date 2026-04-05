import { useEffect, useRef } from 'react'
import { usePresentation } from '../store/usePresentation'

const SWIPE_THRESHOLD = 50
const SWIPE_TIMEOUT = 300

export function useSwipeNav() {
  const { goNext, goPrev } = usePresentation()
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return
      const touch = e.changedTouches[0]
      const dx = touch.clientX - touchStart.current.x
      const dy = touch.clientY - touchStart.current.y
      const dt = Date.now() - touchStart.current.time

      // Only count horizontal swipes that are fast enough and large enough
      if (dt < SWIPE_TIMEOUT && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          goNext()
        } else {
          goPrev()
        }
      }

      touchStart.current = null
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goNext, goPrev])
}
