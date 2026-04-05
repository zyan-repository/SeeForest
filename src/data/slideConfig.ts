import type { SlideConfig } from '../types'

export const SLIDES: readonly SlideConfig[] = [
  // Person 1: "Why Random Forest" (Slides 0-4)
  { id: 'title', title: { en: 'SeeForest', zh: 'SeeForest' }, presenter: 1, durationHint: 30 },
  { id: 'classification', title: { en: 'The Classification Problem', zh: '分类问题' }, presenter: 1, durationHint: 60 },
  { id: 'decision-tree', title: { en: 'Decision Tree in 30s', zh: '30秒决策树' }, presenter: 1, durationHint: 30 },
  { id: 'fragility', title: { en: 'Single Model Fragility', zh: '单模型脆弱性' }, presenter: 1, durationHint: 60, subSteps: 3 },
  { id: 'wisdom', title: { en: 'Wisdom of Crowds', zh: '群体智慧' }, presenter: 1, durationHint: 90, subSteps: 2 },
  // Person 2: "How It Works" (Slides 5-12)
  { id: 'what-is-rf', title: { en: 'What is Random Forest?', zh: '什么是随机森林？' }, presenter: 2, durationHint: 90, subSteps: 3 },
  { id: 'bootstrap', title: { en: 'Sampling with Replacement', zh: '有放回抽样' }, presenter: 2, durationHint: 120, subSteps: 1 },
  { id: 'feature-random', title: { en: 'Feature Randomness', zh: '特征随机性' }, presenter: 2, durationHint: 90, subSteps: 1 },
  { id: 'growing-forest', title: { en: 'Growing the Forest', zh: '生长森林' }, presenter: 2, durationHint: 120, subSteps: 1 },
  { id: 'voting', title: { en: 'Voting & Aggregation', zh: '投票聚合' }, presenter: 2, durationHint: 90, subSteps: 1 },
  { id: 'oob-error', title: { en: 'OOB Error Estimation', zh: '袋外误差估计' }, presenter: 2, durationHint: 90, subSteps: 1 },
  { id: 'feature-importance', title: { en: 'Feature Importance', zh: '特征重要性' }, presenter: 2, durationHint: 90, subSteps: 5 },

  // Person 3: "Mastering RF" (Slides 12-20, ~8.5 min)
  { id: 'example-setup', title: { en: 'Worked Example', zh: '示例演练' }, presenter: 3, durationHint: 60 },
  { id: 'step-by-step', title: { en: 'Step-by-Step', zh: '逐步演练' }, presenter: 3, durationHint: 180, subSteps: 4 },
  { id: 'hyperparams', title: { en: 'Hyperparameter Tuning', zh: '超参数调优' }, presenter: 3, durationHint: 120 },
  { id: 'applications', title: { en: 'Real-World Applications', zh: '真实应用' }, presenter: 3, durationHint: 90, subSteps: 3 },
  { id: 'strengths', title: { en: 'Strengths & Limitations', zh: '优缺点' }, presenter: 3, durationHint: 60 },
  { id: 'takeaways', title: { en: 'Key Takeaways', zh: '关键要点' }, presenter: 3, durationHint: 30 },
  { id: 'qa', title: { en: 'Questions?', zh: '提问环节' }, presenter: 3, durationHint: 30 },
] as const

export const PRESENTER_NAMES: Record<1 | 2 | 3, { en: string; zh: string }> = {
  1: { en: 'Presenter 1', zh: '演讲者 1' },
  2: { en: 'Presenter 2', zh: '演讲者 2' },
  3: { en: 'Presenter 3', zh: '演讲者 3' },
}

export const TOTAL_SLIDES = SLIDES.length
