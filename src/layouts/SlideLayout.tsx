import { useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation, getCurrentPresenter, getPresenterColor } from '../store/usePresentation'
import { SLIDES, PRESENTER_NAMES } from '../data/slideConfig'
import { useT } from '../hooks/useT'

export function SlideLayout({ children }: { children: React.ReactNode }) {
  const { currentSlide, goToSlide, toggleLocale } = usePresentation()
  const t = useT()
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)

  const presenter = getCurrentPresenter(currentSlide)
  const presenterColor = getPresenterColor(presenter)
  const presenterName = PRESENTER_NAMES[presenter]

  const handleProgressBarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Calculate which segment was clicked
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const segmentWidth = rect.width / SLIDES.length
    const clickedIndex = Math.floor(x / segmentWidth)

    if (clickedIndex >= 0 && clickedIndex < SLIDES.length) {
      // Single click navigates to slide
      clickCount.current += 1
      if (clickTimer.current) clearTimeout(clickTimer.current)

      if (clickCount.current >= 3) {
        clickCount.current = 0
        toggleLocale()
      } else {
        clickTimer.current = setTimeout(() => {
          if (clickCount.current === 1) {
            goToSlide(clickedIndex)
          }
          clickCount.current = 0
        }, 250)
      }
    }
  }, [toggleLocale, goToSlide])

  const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const segmentWidth = rect.width / SLIDES.length
    const idx = Math.floor(x / segmentWidth)
    if (idx >= 0 && idx < SLIDES.length) {
      setHoveredSlide(idx)
    }
  }, [])

  const handleProgressMouseLeave = useCallback(() => {
    setHoveredSlide(null)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'var(--bg)' }}>
      {children}

      {/* Presenter name */}
      <motion.div
        key={presenter}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="absolute top-6 right-8 flex items-center gap-2"
        style={{ zIndex: 50 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: presenterColor }}
        />
        <span
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {t(presenterName)}
        </span>
      </motion.div>

      {/* Slide counter with flip animation */}
      <div
        className="absolute top-6 left-8 flex items-baseline"
        style={{
          zIndex: 50,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          letterSpacing: '0.05em',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentSlide}
            initial={{ y: 12, opacity: 0, filter: 'blur(2px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -12, opacity: 0, filter: 'blur(2px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="inline-block tabular-nums"
          >
            {String(currentSlide + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span className="mx-0.5">/</span>
        <span className="tabular-nums">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar with hover tooltips */}
      <div
        className="absolute bottom-0 left-0 right-0 cursor-pointer group"
        style={{ zIndex: 50 }}
        onClick={handleProgressBarClick}
        onMouseMove={handleProgressMouseMove}
        onMouseLeave={handleProgressMouseLeave}
      >
        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredSlide !== null && (
            <motion.div
              key={hoveredSlide}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-5 px-2.5 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
              style={{
                left: `${((hoveredSlide + 0.5) / SLIDES.length) * 100}%`,
                transform: 'translateX(-50%)',
                background: 'rgba(26,46,26,0.92)',
                border: '1px solid rgba(45,106,79,0.3)',
                color: '#E8F5EC',
                fontFamily: 'var(--font-mono)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{ color: getPresenterColor(SLIDES[hoveredSlide].presenter) }}>
                {String(hoveredSlide + 1).padStart(2, '0')}
              </span>
              {' '}
              {t(SLIDES[hoveredSlide].title)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand hit area on hover */}
        <div
          className="w-full flex transition-all duration-200 group-hover:h-2.5 h-1.5"
          style={{ background: 'var(--color-warm-300)' }}
        >
          {SLIDES.map((slide, i) => {
            const color = getPresenterColor(slide.presenter)
            const isActive = i <= currentSlide
            const isCurrent = i === currentSlide
            const isHovered = i === hoveredSlide

            return (
              <div
                key={slide.id}
                className="h-full relative"
                style={{
                  flex: 1,
                  background: isActive ? color : (isHovered ? `${color}` : 'transparent'),
                  opacity: isActive ? (isCurrent ? 1 : 0.3) : (isHovered ? 0.2 : 0),
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="progress-dot"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}, 0 0 16px ${color}40`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
