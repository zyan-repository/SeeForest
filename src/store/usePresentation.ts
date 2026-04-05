import { create } from 'zustand'
import type { Locale, Presenter } from '../types'
import { SLIDES } from '../data/slideConfig'

// BroadcastChannel for syncing multiple windows
const channel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('seeforest-sync')
  : null

type Direction = 'forward' | 'backward'

interface PresentationState {
  readonly currentSlide: number
  readonly subStep: number
  readonly locale: Locale
  readonly showTimer: boolean
  readonly direction: Direction
  readonly goNext: () => void
  readonly goPrev: () => void
  readonly goToSlide: (index: number) => void
  readonly toggleLocale: () => void
  readonly toggleTimer: () => void
  readonly resetSubStep: () => void
}

// Flag to prevent echo: when we receive a sync message, we don't re-broadcast
let isSyncing = false

function broadcast(slide: number, subStep: number) {
  if (!isSyncing && channel) {
    channel.postMessage({ type: 'nav', slide, subStep })
  }
}

export const usePresentation = create<PresentationState>((set, get) => ({
  currentSlide: 0,
  subStep: 0,
  locale: 'en',
  showTimer: false,
  direction: 'forward',

  goNext: () => {
    const { currentSlide, subStep } = get()
    const slide = SLIDES[currentSlide]
    const maxSub = slide?.subSteps ?? 0

    if (subStep < maxSub) {
      const next = subStep + 1
      set({ subStep: next, direction: 'forward' })
      broadcast(currentSlide, next)
    } else if (currentSlide < SLIDES.length - 1) {
      const next = currentSlide + 1
      // Don't reset subStep here — TransitionWrapper will do it after exit animation
      set({ currentSlide: next, direction: 'forward' })
      broadcast(next, 0)
    }
  },

  goPrev: () => {
    const { currentSlide, subStep } = get()
    if (subStep > 0) {
      const prev = subStep - 1
      set({ subStep: prev, direction: 'backward' })
      broadcast(currentSlide, prev)
    } else if (currentSlide > 0) {
      const prev = currentSlide - 1
      set({ currentSlide: prev, direction: 'backward' })
      broadcast(prev, 0)
    }
  },

  goToSlide: (index: number) => {
    const { currentSlide } = get()
    if (index >= 0 && index < SLIDES.length) {
      set({ currentSlide: index, subStep: 0, direction: index >= currentSlide ? 'forward' : 'backward' })
      broadcast(index, 0)
    }
  },

  toggleLocale: () => {
    set(state => ({ locale: state.locale === 'en' ? 'zh' : 'en' }))
  },

  toggleTimer: () => {
    set(state => ({ showTimer: !state.showTimer }))
  },

  resetSubStep: () => set({ subStep: 0 }),
}))

// Listen for sync messages from other windows
if (channel) {
  channel.onmessage = (e) => {
    if (e.data?.type === 'nav') {
      isSyncing = true
      usePresentation.setState({
        currentSlide: e.data.slide,
        subStep: e.data.subStep,
      })
      isSyncing = false
    }
  }
}

export const getCurrentPresenter = (slideIndex: number): Presenter => {
  return SLIDES[slideIndex]?.presenter ?? 1
}

export const getPresenterColor = (presenter: Presenter): string => {
  const colors: Record<Presenter, string> = {
    1: '#2D6A4F', // deep teal — natural, steady
    2: '#B07D2B', // amber gold — warm, wise
    3: '#8B4513', // saddle brown — earthy, mature
  }
  return colors[presenter]
}
