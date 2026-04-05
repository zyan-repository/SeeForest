export const SLIDE_TEXT = {
  title: {
    subtitle: {
      en: 'Can a forest think? Let\'s find out.',
      zh: '一片森林能思考吗？让我们一探究竟。',
    },
    group: {
      en: 'Machine Learning Seminar',
      zh: '机器学习研讨会',
    },
  },
  classification: {
    heading: {
      en: 'Should I go hiking today?',
      zh: '今天该去远足吗？',
    },
    description: {
      en: 'Imagine you\'re planning a hike this weekend. Here are 14 past trips with their weather conditions and outcomes. Can a computer learn the pattern?',
      zh: '想象你计划这周末去远足。这是14次过去的旅行记录，包含天气条件和结果。计算机能学到规律吗？',
    },
    bridge: {
      en: 'Can a computer learn to ask questions like you do?',
      zh: '计算机能学会像你一样提问吗？',
    },
  },
  decisionTree: {
    heading: {
      en: 'Asking Questions, Step by Step',
      zh: '逐步提问，逐步决策',
    },
    context: {
      en: 'How a computer learns to make decisions',
      zh: '计算机如何学会做决策',
    },
    description: {
      en: 'A decision tree asks a series of yes/no questions to reach a decision — like a flowchart. It correctly classifies all 14 training examples!',
      zh: '决策树通过一系列是/否问题来做决策——就像一张流程图。它能正确分类全部14个训练样本！',
    },
    note: {
      en: 'Looks perfect, right? But there\'s a catch...',
      zh: '看起来完美，对吧？但有个问题...',
    },
  },
  fragility: {
    heading: {
      en: 'One Tree Is Not Enough',
      zh: '一棵树远远不够',
    },
    context: {
      en: 'The fatal flaw of a single decision tree',
      zh: '单棵决策树的致命缺陷',
    },
    description: {
      en: 'Remove just ONE data point and rebuild — the tree changes completely! This is called high variance: the tree memorizes specific data instead of learning general patterns.',
      zh: '只移除一个数据点然后重建——树的结构完全改变了！这叫做高方差：树在记忆特定数据，而不是学习一般模式。',
    },
    label: {
      en: 'High Variance',
      zh: '高方差',
    },
    bridge: {
      en: 'One tree is fragile. But what if we ask many people instead of just one?',
      zh: '一棵树是脆弱的。但如果不只问一个人，而是问很多人呢？',
    },
  },
  wisdom: {
    heading: {
      en: 'The Wisdom of Crowds',
      zh: '群体智慧',
    },
    description: {
      en: 'Each blue dot is one person\'s guess at a hidden number. Individually, they\'re way off. But watch what happens when we average them all...',
      zh: '每个蓝点是一个人对隐藏数字的猜测。单独来看，猜得很离谱。但看看当我们取平均值时会发生什么...',
    },
    individual: { en: 'Individual guesses', zh: '个体猜测' },
    average: { en: 'Average', zh: '平均值' },
    truth: { en: 'True value', zh: '真实值' },
    bridge: {
      en: 'The same principle applies to decision trees — many diverse trees voting together.',
      zh: '同样的原理适用于决策树——多棵不同的树一起投票。',
    },
  },
  whatIsRF: {
    heading: {
      en: 'This Is Random Forest',
      zh: '这就是随机森林',
    },
    description: {
      en: 'Grow many different trees, let them vote. Four simple steps:',
      zh: '种很多不同的树，让它们投票。四个简单的步骤：',
    },
    steps: [
      { en: '1. Give each tree different data', zh: '1. 给每棵树不同的数据' },
      { en: '2. Each tree sees random features', zh: '2. 每棵树看到随机特征' },
      { en: '3. Trees vote independently', zh: '3. 树独立投票' },
      { en: '4. Majority wins', zh: '4. 多数获胜' },
    ],
    bridge: {
      en: 'But how do we make each tree different? The secret is in step 1...',
      zh: '但怎样让每棵树不同呢？秘密在第一步...',
    },
  },
  bootstrap: {
    heading: {
      en: 'Give Each Tree Different Data',
      zh: '给每棵树不同的数据',
    },
    description: {
      en: 'We randomly draw N items WITH REPLACEMENT from our N originals. Some items appear twice, some not at all — creating a unique dataset for each tree.',
      zh: '我们从N个原始数据中有放回地随机抽取N个。有些出现两次，有些完全没有——为每棵树创建独特的数据集。',
    },
    unique: { en: '~63.2% unique samples', zh: '~63.2% 唯一样本' },
    oob: { en: 'Out-of-bag (OOB) — remember these!', zh: '袋外样本 (OOB) — 记住它们！' },
    draw: { en: 'Draw Sample', zh: '抽取样本' },
    bridge: {
      en: 'Different data is good, but not enough. There\'s a second trick...',
      zh: '不同的数据很好，但还不够。还有第二个技巧...',
    },
  },
  featureRandom: {
    heading: {
      en: 'Step 2: Each Tree Sees Random Features',
      zh: '第二步：每棵树看到随机特征',
    },
    context: {
      en: 'The second source of diversity',
      zh: '多样性的第二个来源',
    },
    description: {
      en: 'At each split, the tree can only consider a random subset of features — not all of them. Watch how the selection changes at every split:',
      zh: '每次分裂时，树只能考虑随机选择的特征子集——不是全部。看看每次分裂时选择如何变化：',
    },
    formula: { en: 'Typically: sqrt(total features) per split', zh: '通常：每次分裂 sqrt(总特征数)' },
    bridge: {
      en: 'Different data + different features = each tree develops its own unique perspective',
      zh: '不同的数据 + 不同的特征 = 每棵树发展出独特的视角',
    },
  },
  growingForest: {
    heading: {
      en: 'Watch Diversity Emerge',
      zh: '观察多样性的涌现',
    },
    description: {
      en: 'Same algorithm, but each tree sees different data and different features. Watch 5 trees grow simultaneously — they develop completely different structures:',
      zh: '同样的算法，但每棵树看到不同的数据和特征。看5棵树同时生长——它们发展出完全不同的结构：',
    },
    bridge: {
      en: 'Now we have 5 different "experts". How do we use them?',
      zh: '现在我们有了5个不同的"专家"。怎么用它们？',
    },
  },
  voting: {
    heading: {
      en: 'The Forest Makes a Decision',
      zh: '森林做出决策',
    },
    description: {
      en: 'A new hiker asks: "Should I go today?" We send their data through every tree and count the votes:',
      zh: '一个新的远足者问："今天该去吗？"我们把数据送入每棵树并统计投票：',
    },
    bridge: {
      en: 'The forest voted — but is it actually accurate? Remember those OOB samples from earlier?',
      zh: '森林投票了——但它真的准确吗？还记得之前那些OOB样本吗？',
    },
  },
  oob: {
    heading: {
      en: 'Free Accuracy Check',
      zh: '免费的准确率检验',
    },
    context: {
      en: 'Remember those dimmed balls in bootstrap sampling?',
      zh: '还记得自助采样中变暗的那些球吗？',
    },
    description: {
      en: 'Each tree has samples it never saw during training. We test each tree on those "unseen" samples — it\'s like getting a free test set!',
      zh: '每棵树都有训练时从未见过的样本。我们用那些"没见过的"样本测试——就像免费获得了一个测试集！',
    },
    bridge: {
      en: 'We know our accuracy. But which features are driving the decisions?',
      zh: '我们知道了准确率。但哪些特征在驱动决策？',
    },
  },
  featureImportance: {
    heading: {
      en: 'What Did the Forest Learn?',
      zh: '森林学到了什么？',
    },
    description: {
      en: 'Shuffle one feature\'s values and re-test. If accuracy drops a lot, that feature was important. Watch the features rank themselves:',
      zh: '打乱一个特征的值然后重新测试。如果准确率下降很多，那个特征就很重要。看特征自动排名：',
    },
    bridge: {
      en: 'Now you understand the full mechanism. Let\'s put it all together.',
      zh: '现在你理解了完整的机制。让我们把所有知识串起来。',
    },
  },
  exampleSetup: {
    heading: {
      en: 'Back to Our Hiking Question',
      zh: '回到我们的远足问题',
    },
    context: {
      en: 'Let\'s solve it from start to finish',
      zh: '让我们从头到尾解决它',
    },
    description: {
      en: 'We\'ll build a tiny Random Forest with just 3 trees and 2 features per split, using the same hiking dataset from the beginning.',
      zh: '我们将用开头那个远足数据集，构建一个只有3棵树、每次分裂2个特征的小型随机森林。',
    },
    params: {
      en: 'n_estimators=3, max_features=2',
      zh: 'n_estimators=3, max_features=2',
    },
  },
  stepByStep: {
    heading: {
      en: 'Putting It All Together',
      zh: '把所有知识串起来',
    },
    description: {
      en: 'Each step uses what we just learned:',
      zh: '每一步都用到了我们刚学的知识：',
    },
  },
  hyperparams: {
    heading: {
      en: 'What If We Change the Settings?',
      zh: '如果我们改变设置呢？',
    },
    description: {
      en: 'Drag the sliders and watch the decision boundary change. More trees = smoother. Too deep = overfitting.',
      zh: '拖动滑块，观察决策边界的变化。更多树 = 更平滑。太深 = 过拟合。',
    },
    nEstimators: { en: 'Number of trees', zh: '树的数量' },
    maxDepth: { en: 'Max depth', zh: '最大深度' },
    maxFeatures: { en: 'Max features per split', zh: '每次分裂最大特征数' },
  },
  applications: {
    heading: {
      en: 'From 4 Features to 4,000',
      zh: '从4个特征到4000个',
    },
    context: {
      en: 'Our hiking example had just 4 features. Random Forest scales beautifully.',
      zh: '我们的远足示例只有4个特征。随机森林可以优美地扩展。',
    },
    items: [
      {
        title: { en: 'Medical Diagnosis', zh: '医学诊断' },
        desc: { en: 'Predict disease risk from hundreds of patient features — and explain which factors matter most', zh: '从数百个患者特征预测疾病风险——并解释哪些因素最重要' },
      },
      {
        title: { en: 'Fraud Detection', zh: '欺诈检测' },
        desc: { en: 'Flag suspicious transactions in milliseconds across millions of features', zh: '在数百万特征中以毫秒级速度标记可疑交易' },
      },
      {
        title: { en: 'Ecology & Remote Sensing', zh: '生态学与遥感' },
        desc: { en: 'Classify land cover from satellite imagery — literally seeing the forest for the trees', zh: '从卫星图像分类土地覆盖——真正的"见森林知树木"' },
      },
      {
        title: { en: 'Recommendation Systems', zh: '推荐系统' },
        desc: { en: 'Rank content relevance using hundreds of user behavior signals', zh: '使用数百个用户行为信号排序内容相关性' },
      },
    ],
  },
  strengths: {
    heading: {
      en: 'When to Use Random Forest',
      zh: '何时使用随机森林',
    },
    description: {
      en: 'Every tool has its place. Here\'s when RF shines — and when to consider alternatives:',
      zh: '每个工具都有它的位置。RF发光的时候——以及该考虑替代方案的时候：',
    },
    pros: [
      { en: 'Resistant to overfitting — the forest is stronger than any single tree', zh: '抗过拟合——森林比任何单棵树都强' },
      { en: 'Handles high-dimensional data with ease', zh: '轻松处理高维数据' },
      { en: 'Built-in feature importance for interpretation', zh: '内置特征重要性用于解释' },
      { en: 'No feature scaling needed — works out of the box', zh: '无需特征缩放——开箱即用' },
    ],
    cons: [
      { en: 'Less interpretable than a single tree', zh: '不如单棵树可解释' },
      { en: 'Slower prediction than simple models', zh: '预测速度比简单模型慢' },
      { en: 'Memory-heavy for very large forests', zh: '非常大的森林占用内存多' },
      { en: 'Not ideal for very sparse or sequential data', zh: '不适合非常稀疏或序列数据' },
    ],
  },
  takeaways: {
    heading: {
      en: 'Three Things to Remember',
      zh: '三件要记住的事',
    },
    points: [
      { en: 'Random Forest = many diverse trees + majority vote → reduces variance', zh: '随机森林 = 多棵多样化的树 + 多数投票 → 降低方差' },
      { en: 'Diversity comes from two sources: bootstrap sampling + feature randomness', zh: '多样性来自两个来源：自助采样 + 特征随机性' },
      { en: 'Built-in tools: OOB error for free validation, feature importance for interpretation', zh: '内置工具：OOB误差提供免费验证，特征重要性提供解释' },
    ],
  },
  qa: {
    heading: {
      en: 'Questions?',
      zh: '提问环节',
    },
    thanks: {
      en: 'Thank you for listening',
      zh: '感谢聆听',
    },
  },
} as const
