type Bilingual = { readonly en: string; readonly zh: string }

interface SlideNarrative {
  readonly paragraphs: readonly Bilingual[]
  readonly callouts?: readonly Bilingual[]
  readonly transition?: Bilingual
}

export const NARRATIVES: Record<string, SlideNarrative> = {
  title: {
    paragraphs: [
      {
        en: 'Today we explore Random Forest -- one of the most powerful and widely-used algorithms in machine learning.',
        zh: '今天我们探讨随机森林——机器学习中最强大、最广泛使用的算法之一。',
      },
    ],
    callouts: [
      {
        en: 'The name gives it away: a forest of decision trees working together.',
        zh: '名字就暗示了：一片决策树的森林协同工作。',
      },
    ],
  },

  classification: {
    paragraphs: [
      {
        en: 'Let\'s start with a simple question everyone faces: should I go hiking this weekend? We have 14 past trips with weather records and outcomes.',
        zh: '我们从一个简单的问题开始：这周末该不该去远足？我们有14次过去的旅行记录，包含天气信息和结果。',
      },
      {
        en: 'Look at the table -- you\'re probably already making decisions in your head: "If it\'s sunny and not too humid, go!" "If it rains and the wind is strong, stay home." You\'re naturally asking questions step by step to reach a conclusion.',
        zh: '看这张表——你脑中可能已经在做判断了："如果晴天且湿度不高，就去！""如果下雨还刮大风，就别去了。"你在自然地逐步提问来得出结论。',
      },
    ],
    callouts: [
      {
        en: 'What if a computer could learn to ask questions the same way you just did? That\'s exactly what the next tool does.',
        zh: '如果计算机也能像你刚才那样学会提问呢？下一个工具做的就是这件事。',
      },
    ],
  },

  'decision-tree': {
    paragraphs: [
      {
        en: 'A Decision Tree works like a flowchart: starting from the top, it asks one question at each node (e.g. "What\'s the outlook?"), then follows the branch corresponding to the answer, until it reaches a leaf node with the final decision (Yes or No).',
        zh: '决策树的工作方式像一张流程图：从顶部开始，每个节点问一个问题（比如"天气怎样？"），然后沿着答案对应的分支往下走，直到到达叶子节点得出最终结论（Yes 或 No）。',
      },
      {
        en: 'Today we treat the decision tree as a black box: you feed it training data, it automatically learns the rules, and outputs a prediction. No need to understand how it builds the tree internally.',
        zh: '今天我们把决策树当作一个黑盒：输入训练数据，它自动学会规则，输出预测结果。不需要了解它内部是怎么建树的。',
      },
    ],
    callouts: [
      {
        en: 'Right now we treat the decision tree as a ready-made tool: give it data, it learns question rules, and outputs predictions. The key question is -- can we trust a single tree?',
        zh: '现在我们把决策树当作一个现成的工具：给它数据，它学会提问规则，输出预测结果。关键问题是——我们能信任一棵树吗？',
      },
    ],
  },

  fragility: {
    paragraphs: [
      {
        en: 'The tree from the previous page got 100% accuracy -- but can we trust it? Let\'s test: we remove just one sample from the training data, and let the decision tree re-train from scratch on the remaining 13 samples.',
        zh: '上一页的树准确率100%——但我们能信任它吗？来测试一下：我们从训练数据中移除一个样本，让决策树在剩下的13个样本上从头重新训练。',
      },
      {
        en: 'Remember, the decision tree is a black box that automatically decides what questions to ask. With slightly different data, it learned completely different rules -- a different root question, different branches, everything changed!',
        zh: '记住，决策树是一个自动决定提问顺序的黑盒。数据只变了一点点，它就学出了完全不同的规则——根节点换了问题，分支全变了，整棵树都不一样了！',
      },
      {
        en: 'Remove a different sample, re-train again -- yet another tree. The black box is too sensitive: tiny changes in input data lead to completely different outputs. This is called "high variance".',
        zh: '换一个样本移除，再重新训练——又是一棵不同的树。这个黑盒太敏感了：输入数据的微小变化导致完全不同的输出。这就叫"高方差"。',
      },
    ],
    callouts: [
      {
        en: 'One expert is unreliable. But what if we don\'t rely on just one, and instead ask many experts to vote?',
        zh: '一个专家不可靠。但如果我们不只依赖一个，而是让很多专家一起投票呢？',
      },
    ],
  },

  wisdom: {
    paragraphs: [
      {
        en: 'Here\'s a classic experiment: ask 100 people to guess a number. Each guess is wildly off, but the average of all guesses is almost perfectly accurate!',
        zh: '这是一个经典实验：让100个人猜一个数字。每个人猜得都很离谱，但所有人的平均值却几乎完全准确！',
      },
      {
        en: 'This is called the "Wisdom of Crowds" -- individual errors cancel each other out when we combine many independent, diverse opinions.',
        zh: '这就叫"群体智慧"——当我们汇总很多独立、多样的意见时，个体的误差会互相抵消。',
      },
    ],
    callouts: [
      {
        en: 'The same idea applies here: one decision tree is unreliable, but many different trees voting together can be extremely accurate.',
        zh: '同样的道理：一棵决策树不可靠，但很多不同的树一起投票，就能非常准确。',
      },
    ],
  },

  'what-is-rf': {
    paragraphs: [
      {
        en: 'This is EXACTLY what Random Forest does. Four simple steps to a powerful result.',
        zh: '这正是随机森林做的事情。四个简单的步骤，达到强大的效果。',
      },
    ],
    callouts: [
      {
        en: 'But there\'s an important question: HOW do we make the trees different? If they\'re all identical, voting won\'t help.',
        zh: '但有个重要问题：我们怎样让树不同？如果它们都一样，投票没用。',
      },
    ],
  },

  bootstrap: {
    paragraphs: [
      {
        en: 'To make each tree different, we give it a different training set. How? We randomly pick 14 items from our 14 originals, but allow the SAME item to be picked more than once. This is called "sampling with replacement" (the formal name is Bootstrap sampling).',
        zh: '为了让每棵树不同，我们给它不同的训练集。怎么做？从14个原始数据中随机抽取14个，但允许同一个被重复抽到。这叫"有放回抽样"（正式名称叫 Bootstrap 采样）。',
      },
    ],
    callouts: [
      {
        en: 'Notice the dimmed balls? Those are samples this tree never saw during training -- they were left out. We\'ll use them later as a free test set to check accuracy!',
        zh: '注意变暗的球吗？那些是这棵树训练时从未见过的样本——它们被落下了。我们后面会用它们作为免费的测试集来检验准确率！',
      },
    ],
  },

  'feature-random': {
    paragraphs: [
      {
        en: 'Sampling with replacement gave each tree different data. The second trick: at each split, the tree can only look at 2 of our 4 features -- chosen at random.',
        zh: '有放回抽样给了每棵树不同的数据。第二个技巧：每次分裂时，树只能看4个特征中的2个——随机选择。',
      },
      {
        en: 'With different data AND different features, each tree develops its own unique "perspective" on the problem.',
        zh: '有了不同的数据和不同的特征，每棵树发展出自己独特的"视角"。',
      },
    ],
  },

  'growing-forest': {
    paragraphs: [
      {
        en: 'Same algorithm running 5 times, but each tree got different sampled data and sees different features at each split.',
        zh: '同样的算法运行5次，但每棵树得到不同的抽样数据，每次分裂看到不同的特征。',
      },
    ],
    callouts: [
      {
        en: 'Look how the structures are completely different. This diversity is the KEY -- it\'s why the forest is smarter than any single tree.',
        zh: '看看结构完全不同。这种多样性是关键——这就是森林比任何单棵树更聪明的原因。',
      },
    ],
  },

  voting: {
    paragraphs: [
      {
        en: 'A new hiker asks: "Should I go today?" The data point flows through each tree -- like a pinball. Each tree gives its vote.',
        zh: '一个新的远足者问："今天该去吗？"数据点流过每棵树——像弹球。每棵树投票。',
      },
    ],
    callouts: [
      {
        en: '3 say Yes, 2 say No -- majority rules! This is the "wisdom of crowds" in action.',
        zh: '3个说Yes，2个说No——多数规则！这就是"群体智慧"的实际运用。',
      },
    ],
  },

  'oob-error': {
    paragraphs: [
      {
        en: 'The forest voted, but how do we know it\'s actually accurate? Here\'s the beautiful part: remember those dimmed balls from the sampling step?',
        zh: '森林投票了，但我们怎么知道它真的准确？美妙的部分来了：还记得抽样那一步中变暗的那些球吗？',
      },
      {
        en: 'Each tree has samples it NEVER trained on. We test each tree on those "unseen" samples -- it\'s like a free test set!',
        zh: '每棵树都有从未训练过的样本。用那些"没见过的"样本测试——就像免费获得了一个测试集！',
      },
    ],
  },

  'feature-importance': {
    paragraphs: [
      {
        en: 'We know our forest is accurate. But WHICH features matter most?',
        zh: '我们知道森林是准确的。但哪些特征最重要？',
      },
      {
        en: 'Simple idea: take one feature, shuffle its values randomly, and re-test. If accuracy drops a lot -- that feature was important!',
        zh: '简单的想法：取一个特征，随机打乱它的值，重新测试。如果准确率下降很多——那个特征就重要！',
      },
    ],
    callouts: [
      {
        en: 'This tells us what the forest actually learned -- incredibly useful for interpretation.',
        zh: '这告诉我们森林实际上学到了什么——对解释非常有用。',
      },
    ],
  },

  'example-setup': {
    paragraphs: [
      {
        en: 'You now understand HOW Random Forest works. Let\'s put it all together with a complete example.',
        zh: '你现在理解了随机森林是怎么工作的。让我们用一个完整的例子把所有知识串起来。',
      },
      {
        en: 'We\'re going back to our original hiking dataset -- the same 14 trips from the very first slide.',
        zh: '我们回到最初的远足数据集——第一张幻灯片里的14次旅行。',
      },
    ],
    callouts: [
      {
        en: 'We\'ll build a tiny forest: just 3 trees, each split considers 2 of 4 features.',
        zh: '我们建一个小森林：只有3棵树，每次分裂考虑4个特征中的2个。',
      },
    ],
  },

  'step-by-step': {
    paragraphs: [
      {
        en: 'Step 1: Draw our first bootstrap sample. Step 2: Build Tree 1 with random feature subsets. Step 3: Repeat for Trees 2 and 3.',
        zh: '第1步：抽取第一个自助样本。第2步：用随机特征子集构建树1。第3步：对树2和3重复。',
      },
      {
        en: 'Step 4: A new data point arrives. Step 5: Send it through all 3 trees and count votes.',
        zh: '第4步：新数据点到达。第5步：送入所有3棵树并统计投票。',
      },
    ],
    callouts: [
      {
        en: 'Tree 1 says Yes, Tree 2 says Yes, Tree 3 says No -- 2 vs 1, the answer is Yes! Go hiking!',
        zh: '树1说Yes，树2说Yes，树3说No——2比1，答案是Yes！去远足！',
      },
    ],
  },

  hyperparams: {
    paragraphs: [
      {
        en: 'Random Forest has a few key settings you can adjust. On the right is a simulated example (not our hiking data) to show the effect visually.',
        zh: '随机森林有几个关键设置可以调整。右边是一个模拟示例（非远足数据），用来直观展示效果。',
      },
      {
        en: 'Try it: set trees=1 and max_depth=20 -- the boundary becomes extremely wiggly because one deep tree memorizes every training point (overfitting!). Now increase trees to 100 -- the boundary becomes smooth and generalizable.',
        zh: '试一试：把树设为1、最大深度设为20——边界变得极度扭曲，因为一棵深树记住了每个训练点（过拟合！）。再把树增加到100——边界变得平滑，泛化能力强。',
      },
    ],
    callouts: [
      {
        en: 'Good news: Random Forest is hard to break -- even with non-optimal settings, it usually gives reasonable results.',
        zh: '好消息：随机森林很难搞砸——即使设置不是最优的，通常也能给出合理的结果。',
      },
    ],
  },

  applications: {
    paragraphs: [
      {
        en: 'Our hiking example had just 4 features. But Random Forest scales beautifully to thousands.',
        zh: '我们的远足示例只有4个特征。但随机森林能优美地扩展到数千个。',
      },
    ],
  },

  strengths: {
    paragraphs: [
      {
        en: 'Every algorithm has tradeoffs. Random Forest is resistant to overfitting, handles high dimensions easily, and provides feature importance for free.',
        zh: '每个算法都有取舍。随机森林抗过拟合，轻松处理高维数据，并免费提供特征重要性。',
      },
      {
        en: 'But it\'s a "black box" compared to a single tree, slower for predictions, and uses more memory.',
        zh: '但相比单棵树是个"黑盒"，预测更慢，占用更多内存。',
      },
    ],
    callouts: [
      {
        en: 'Overall: one of the best "default" algorithms in machine learning.',
        zh: '总体来说：机器学习中最好的"默认"算法之一。',
      },
    ],
  },

  takeaways: {
    paragraphs: [
      {
        en: 'Three things to remember from today.',
        zh: '今天要记住三件事。',
      },
    ],
  },

  handout: {
    paragraphs: [
      {
        en: 'Here is a summary of the key concepts, formulas, and the worked example we covered today.',
        zh: '这是我们今天讲解的关键概念、公式和实例演练的总结。',
      },
    ],
    callouts: [
      {
        en: 'Take this handout as your reference. The homework questions will help solidify your understanding.',
        zh: '把这份讲义作为参考。作业题会帮助巩固你的理解。',
      },
    ],
  },

  qa: {
    paragraphs: [
      {
        en: 'From one fragile tree to a powerful forest -- the wisdom of crowds applied to machine learning.',
        zh: '从一棵脆弱的树到一片强大的森林——群体智慧在机器学习中的应用。',
      },
    ],
  },
} as const
