import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { FeatureImportanceChart } from '../visualizations/FeatureImportanceChart'
import { usePresentation } from '../../store/usePresentation'

const STEP_TEXT: Array<{ en: string; zh: string }> = [
  {
    en: 'Our forest has 92% accuracy. But which features matter most? We\'ll test each one: shuffle its values and see how much accuracy drops.',
    zh: '我们的森林有92%准确率。但哪些特征最重要？我们来逐个测试：打乱它的值，看准确率下降多少。',
  },
  {
    en: 'Shuffle Outlook: accuracy drops from 92% to 57.8% -- a huge drop! The model heavily depends on weather outlook to make predictions.',
    zh: '打乱"天气"列：准确率从92%暴跌到57.8%——降幅巨大！模型非常依赖天气来做预测。',
  },
  {
    en: 'Shuffle Humidity: accuracy drops to 65.2%. Still a big drop, so humidity is also quite important.',
    zh: '打乱"湿度"列：准确率降到65.2%。降幅依然明显，说明湿度也很重要。',
  },
  {
    en: 'Shuffle Wind: accuracy drops to 70.5%. Moderate drop -- wind matters, but less than outlook or humidity.',
    zh: '打乱"风力"列：准确率降到70.5%。中等降幅——风力有用，但不如天气和湿度重要。',
  },
  {
    en: 'Shuffle Temperature: accuracy drops to 74.5%. Smallest drop -- temperature is the least important feature for this dataset.',
    zh: '打乱"温度"列：准确率降到74.5%。最小的降幅——温度是这个数据集里最不重要的特征。',
  },
  {
    en: 'Now rank all features by their drop. This ranking IS the feature importance -- not a coincidence, because each feature was tested independently while keeping all others intact.',
    zh: '把所有特征按下降幅度排序。这个排名就是特征重要性——不是碰巧，因为每个特征都是独立测试的，其他特征保持不变。',
  },
]

export default function S12_FeatureImportance() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.featureImportance.heading)}</SlideHeading>
      <TwoColumnSlide>
        <SlideColumn>
          <div style={{ minHeight: 160 }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={subStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NarrativePanel
                variant={subStep === 0 ? 'default' : subStep <= 4 ? 'warning' : 'insight'}
                delay={0}
              >
                {t(STEP_TEXT[Math.min(subStep, STEP_TEXT.length - 1)])}
              </NarrativePanel>
            </motion.div>
          </AnimatePresence>
          </div>
        </SlideColumn>

        <SlideColumn>
          <FeatureImportanceChart step={subStep} />
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.featureImportance.bridge)}</SlideBridge>
    </SlideBase>
  )
}
