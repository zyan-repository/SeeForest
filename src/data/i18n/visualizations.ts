export const VIZ_TEXT = {
  tree: {
    yes: { en: 'Yes', zh: '是' },
    no: { en: 'No', zh: '否' },
    gini: { en: 'Gini', zh: '基尼' },
    samples: { en: 'samples', zh: '样本' },
  },
  dataset: {
    outlook: { en: 'Outlook', zh: '天气' },
    temperature: { en: 'Temperature', zh: '温度' },
    humidity: { en: 'Humidity', zh: '湿度' },
    wind: { en: 'Wind', zh: '风力' },
    hiking: { en: 'Go Hiking?', zh: '去远足？' },
    yes: { en: 'Yes', zh: '是' },
    no: { en: 'No', zh: '否' },
  },
  voting: {
    tree: { en: 'Tree', zh: '树' },
    vote: { en: 'Vote', zh: '投票' },
    result: { en: 'Result', zh: '结果' },
    majority: { en: 'Majority Vote', zh: '多数投票' },
  },
  importance: {
    original: { en: 'Original accuracy', zh: '原始准确率' },
    permuted: { en: 'After permuting', zh: '置换后' },
    drop: { en: 'Accuracy drop', zh: '准确率下降' },
  },
} as const
