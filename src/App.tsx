import { lazy, Suspense } from 'react'
import { usePresentation } from './store/usePresentation'
import { useKeyboardNav } from './hooks/useKeyboardNav'
import { useSwipeNav } from './hooks/useSwipeNav'
import { SlideLayout } from './layouts/SlideLayout'
import { TransitionWrapper } from './layouts/TransitionWrapper'

import { ForestScene } from './components/background/ForestScene'
import { SLIDES } from './data/slideConfig'

const slideComponents = [
  lazy(() => import('./components/slides/S01_Title')),
  lazy(() => import('./components/slides/S02_ClassificationProblem')),
  lazy(() => import('./components/slides/S03_DecisionTreeBrief')),
  lazy(() => import('./components/slides/S04_SingleModelFragility')),
  lazy(() => import('./components/slides/S05_WisdomOfCrowds')),
  lazy(() => import('./components/slides/S06_WhatIsRF')),
  lazy(() => import('./components/slides/S07_BootstrapSampling')),
  lazy(() => import('./components/slides/S08_FeatureRandomness')),
  lazy(() => import('./components/slides/S09_GrowingTheForest')),
  lazy(() => import('./components/slides/S10_VotingAggregation')),
  lazy(() => import('./components/slides/S11_OOBError')),
  lazy(() => import('./components/slides/S12_FeatureImportance')),
  lazy(() => import('./components/slides/S13_WorkedExampleSetup')),
  lazy(() => import('./components/slides/S14_StepByStep')),
  lazy(() => import('./components/slides/S15_HyperparameterTuning')),
  lazy(() => import('./components/slides/S16_RealWorldApps')),
  lazy(() => import('./components/slides/S17_StrengthsLimitations')),
  lazy(() => import('./components/slides/S18_KeyTakeaways')),
  lazy(() => import('./components/slides/S20_QA')),
]

function App() {
  useKeyboardNav()
  useSwipeNav()
  const currentSlide = usePresentation(s => s.currentSlide)

  const SlideComponent = slideComponents[currentSlide]
  const slideConfig = SLIDES[currentSlide]

  const no3d = new URLSearchParams(window.location.search).has('no3d')

  return (
    <SlideLayout>
      {!no3d && <ForestScene />}
      <TransitionWrapper slideKey={slideConfig.id}>
        <Suspense fallback={null}>
          {SlideComponent && <SlideComponent />}
        </Suspense>
      </TransitionWrapper>
    </SlideLayout>
  )
}

export default App
