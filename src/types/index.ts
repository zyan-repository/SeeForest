export type Locale = 'en' | 'zh'

export type Presenter = 1 | 2 | 3

export interface SlideConfig {
  readonly id: string
  readonly title: { en: string; zh: string }
  readonly presenter: Presenter
  readonly durationHint: number // seconds
  readonly subSteps?: number
}

export interface TreeNode {
  readonly feature?: string
  readonly threshold?: number
  readonly label?: string
  readonly left?: TreeNode
  readonly right?: TreeNode
  readonly samples?: number
  readonly gini?: number
}

export interface DataPoint {
  readonly features: Record<string, string | number>
  readonly label: string
}

export interface BootstrapSample {
  readonly indices: readonly number[]
  readonly oobIndices: readonly number[]
}
