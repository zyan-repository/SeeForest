import { AnimatePresence, motion } from 'framer-motion'
import { usePresentation } from '../store/usePresentation'

const enterTransition = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 28,
  mass: 0.6,
}

// Exit must be fast so it doesn't block rapid key presses
const exitTransition = {
  duration: 0.15,
  ease: [0.4, 0, 1, 1] as const,
}

interface TransitionWrapperProps {
  children: React.ReactNode
  slideKey: string
}

export function TransitionWrapper({ children, slideKey }: TransitionWrapperProps) {
  const currentSlide = usePresentation(s => s.currentSlide)
  const direction = usePresentation(s => s.direction)
  const resetSubStep = usePresentation(s => s.resetSubStep)

  const xOffset = direction === 'forward' ? 40 : -40
  const rotateY = direction === 'forward' ? 1.5 : -1.5

  return (
    <AnimatePresence mode="wait" onExitComplete={resetSubStep}>
      <motion.div
        key={`${slideKey}-${currentSlide}`}
        initial={{
          opacity: 0,
          x: xOffset,
          scale: 0.98,
          filter: 'blur(4px)',
          rotateY,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotateY: 0,
          transition: enterTransition,
        }}
        exit={{
          opacity: 0,
          x: -xOffset * 0.5,
          scale: 0.97,
          filter: 'blur(3px)',
          transition: exitTransition,
        }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
