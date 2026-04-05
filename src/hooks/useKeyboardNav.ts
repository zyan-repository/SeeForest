import { useEffect } from 'react'
import { usePresentation } from '../store/usePresentation'

export function useKeyboardNav() {
  const { goNext, goPrev, goToSlide, toggleTimer, toggleLocale } = usePresentation()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault()
          goPrev()
          break
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault()
            goToSlide(parseInt(e.key) - 1)
          }
          break
        case 'n':
        case 'N':
          e.preventDefault()
          toggleTimer()
          break
        case 'l':
        case 'L':
          e.preventDefault()
          toggleLocale()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, goToSlide, toggleTimer, toggleLocale])
}
