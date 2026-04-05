export const PRESENTER_NOTES: Record<string, { en: string; zh: string }> = {
  title: {
    en: 'Welcome everyone. Today we\'ll explore Random Forest — one of the most powerful algorithms in machine learning. The name gives it away: it\'s literally a forest of decision trees working together. Let\'s see how.',
    zh: '大家好，今天我们探讨随机森林——机器学习中最强大的算法之一。名字就透露了：它就是一片决策树的森林协同工作。让我们看看它是怎么做到的。',
  },
  classification: {
    en: 'Let\'s start with something everyone understands: deciding whether to go hiking. We have 14 past trips with weather data. The question is: can a computer learn the pattern behind these decisions? [Point to table] Notice 4 features: Outlook, Temperature, Humidity, Wind. And the result: Yes or No.',
    zh: '我们从一个大家都懂的问题开始：决定是否去远足。我们有14次过去的旅行记录。问题是：计算机能学到这些决策背后的规律吗？[指向表格] 注意4个特征：天气、温度、湿度、风力。以及结果：Yes或No。',
  },
  'decision-tree': {
    en: 'So here\'s our first attempt: a decision tree. It asks a series of questions — first "What\'s the outlook?", then depending on the answer, "What\'s the humidity?" or "How windy is it?". And it works! It gets all 14 examples right. Looks great... but there\'s a problem we need to see.',
    zh: '这是我们的第一次尝试：决策树。它问一系列问题——先问"天气怎样？"，然后根据答案问"湿度如何？"或"风大吗？"。而且它成功了！14个例子全对。看起来很棒...但有个问题我们需要看到。',
  },
  fragility: {
    en: '[Point to three trees] Look at these three trees. Same algorithm, but each built on slightly different data — just ONE point removed. And they\'re completely different structures! This is the fundamental problem: a single tree is FRAGILE. It memorizes your specific data rather than learning the general rule. This is called "high variance". So how do we fix this?',
    zh: '[指向三棵树] 看这三棵树。同样的算法，但每棵都基于稍微不同的数据——只移除了一个点。结构完全不同！这就是根本问题：单棵树是脆弱的。它记忆了特定数据而不是学习一般规律。这叫"高方差"。那我们怎么解决？',
  },
  wisdom: {
    en: 'Before we solve it, let me show you a surprising insight. [Point to scattered dots] Each blue dot is one person guessing a hidden number. They\'re all over the place — terrible individually. [Click "Reveal the Wisdom"] But watch — when they converge to the number line, look at the AVERAGE. It\'s incredibly close to the true value! Individual error: ~30, but average error: only ~5. THIS is the key idea. [Pause] Now think about this: what if instead of people guessing numbers, we had TREES making predictions? What if we grew many different trees and averaged their votes?',
    zh: '在解决之前，让我展示一个惊人的发现。[指向散布的点] 每个蓝点是一个人猜一个隐藏的数字。它们到处都是——单独来看很糟糕。[点击按钮] 但看——当它们收敛到数轴上时，看平均值。它非常接近真实值！个体误差约30，但平均误差只有约5。这就是核心思想。[停顿] 现在想想：如果不是人猜数字，而是树做预测呢？如果我们种很多不同的树然后平均它们的投票呢？',
  },
  'what-is-rf': {
    en: 'This is EXACTLY what Random Forest does. [Press → to reveal each step] Step 1: give each tree different data. Step 2: each tree only sees random features. Step 3: trees vote independently. Step 4: majority wins. Simple concept, powerful result. But there\'s an important question: HOW do we make the trees different? If they\'re all identical, voting won\'t help. The secret starts with how we create the data for each tree...',
    zh: '这正是随机森林做的事情。[按→逐步展示] 第一步：给每棵树不同的数据。第二步：每棵树只看到随机特征。第三步：树独立投票。第四步：多数获胜。概念简单，效果强大。但有个重要问题：我们怎样让树不同？如果它们都一样，投票没用。秘密从我们如何为每棵树创建数据开始...',
  },
  bootstrap: {
    en: '[Click "Draw Sample"] Watch carefully: we draw 14 items from our 14 originals, but WITH REPLACEMENT. See the duplicates marked with "+"? And see the dimmed ones? Those are items this tree will NEVER see during training — they\'re called Out-of-Bag samples. [Click again for another sample] Different sample each time! [Important] Remember these OOB samples — they\'ll become very useful later. But different data alone isn\'t enough to make truly diverse trees. There\'s a second trick...',
    zh: '[点击"Draw Sample"] 仔细看：我们从14个原始数据中抽取14个，但有放回。看到标"+"的重复项了吗？看到变暗的了吗？那些是这棵树训练时永远不会看到的——叫袋外样本。[再点一次] 每次不同的样本！[重要] 记住这些OOB样本——它们后面会非常有用。但光不同的数据不够，还有第二个技巧...',
  },
  'feature-random': {
    en: '[Hand off to Person 2] So Person 1 showed us the problem — one tree is fragile — and the big idea — use many trees. Now I\'ll show the mechanism. [Point to cycling animation] Bootstrap gave each tree different DATA. The second trick: at each split, the tree can only look at 2 of our 4 features — chosen at random. Watch the highlighted features change every 2 seconds. Different splits see different features. With different data AND different features, each tree develops its own unique "perspective" on the problem.',
    zh: '[交接给第二人] 第一人展示了问题——一棵树脆弱——和大思路——用很多树。现在我来展示机制。[指向循环动画] 自助法给了每棵树不同的数据。第二个技巧：每次分裂时，树只能看4个特征中的2个——随机选择。看高亮的特征每2秒变化。不同的分裂看到不同的特征。有了不同的数据和不同的特征，每棵树发展出自己独特的"视角"。',
  },
  'growing-forest': {
    en: 'Let\'s watch this in action. [Point to 5 tree panels] Same algorithm running 5 times, but each tree got different bootstrap data and sees different features at each split. Look how the structures are completely different — Tree 1 might split on Outlook first, while Tree 3 starts with Wind. This diversity is the KEY. It\'s why the forest is smarter than any single tree.',
    zh: '让我们看看实际效果。[指向5个树面板] 同样的算法运行5次，但每棵树得到不同的自助数据，每次分裂看到不同的特征。看看结构完全不同——树1可能先在天气上分裂，树3从风力开始。这种多样性是关键。这就是森林比任何单棵树更聪明的原因。',
  },
  voting: {
    en: 'Now we use these trees. A new hiker asks: "Should I go today?" [Watch the animation] The data point flows through each tree — like a pinball. Each tree gives its vote based on its own structure. [Point to tally] 3 say Yes, 2 say No — majority rules, we predict Yes! This is the "wisdom of crowds" in action, just like those scattered dots averaging to the truth.',
    zh: '现在我们使用这些树。一个新的远足者问："今天该去吗？"[看动画] 数据点流过每棵树——像弹球。每棵树根据自己的结构投票。[指向计数] 3个说Yes，2个说No——多数规则，预测Yes！这就是"群体智慧"的实际运用，就像那些散布的点平均后收敛到真值。',
  },
  'oob-error': {
    en: 'The forest voted, but how do we know it\'s actually accurate? Here\'s the beautiful part: remember those dimmed balls from bootstrap sampling? Each tree has samples it NEVER trained on. [Point to grid] Green checks = the tree got it right on unseen data. Red X = wrong. Average across all trees: 75% accuracy. We got this for FREE — no separate test set needed!',
    zh: '森林投票了，但我们怎么知道它真的准确？美妙的部分来了：还记得自助采样中变暗的那些球吗？每棵树都有从未训练过的样本。[指向网格] 绿色对号=树在未见数据上答对了。红色叉号=错了。所有树的平均：75%准确率。这是免费的——不需要单独的测试集！',
  },
  'feature-importance': {
    en: 'We know our forest is accurate. But WHICH features matter most? Simple idea: take one feature, shuffle its values randomly, and re-test. If accuracy drops a lot — that feature was important! [Watch bars grow and sort] Outlook drops the most — it\'s the most important for hiking decisions. This is incredibly useful: it tells us what the forest actually learned.',
    zh: '我们知道森林是准确的。但哪些特征最重要？简单的想法：取一个特征，随机打乱它的值，重新测试。如果准确率下降很多——那个特征就重要！[看柱子增长和排序] 天气下降最多——它对远足决策最重要。这非常有用：它告诉我们森林实际上学到了什么。',
  },
  'example-setup': {
    en: '[Hand off to Person 3] You now understand HOW Random Forest works. Let me put it all together with a complete example. [Point to screen] We\'re going back to our original hiking dataset — the same 14 trips from the very first slide. We\'ll build a tiny forest: just 3 trees, and each split considers 2 of 4 features.',
    zh: '[交接给第三人] 你们现在理解了随机森林是怎么工作的。让我用一个完整的例子把所有知识串起来。[指向屏幕] 我们回到最初的远足数据集——第一张幻灯片里的14次旅行。我们建一个小森林：只有3棵树，每次分裂考虑4个特征中的2个。',
  },
  'step-by-step': {
    en: '[Press → for each step] Step 1: Draw our first bootstrap sample — just like we learned. Step 2: Build Tree 1 with random feature subsets at each split. Step 3: Repeat for Trees 2 and 3 — each gets different data and features. Step 4: A new data point arrives. Step 5: Send it through all 3 trees. Tree 1 says Yes, Tree 2 says Yes, Tree 3 says No — 2 vs 1, the answer is Yes! Go hiking!',
    zh: '[按→推进每步] 第1步：抽取第一个自助样本——就像我们学的。第2步：用随机特征子集构建树1。第3步：对树2和3重复——每个都有不同的数据和特征。第4步：新数据点到达。第5步：送入所有3棵树。树1说Yes，树2说Yes，树3说No——2比1，答案是Yes！去远足！',
  },
  hyperparams: {
    en: 'Now the fun part — what happens when we change the settings? [Drag sliders] Try increasing trees from 10 to 100 — watch the boundary get smoother. Now try max_depth=20 — see how the boundary gets too wiggly? That\'s overfitting. Sweet spot is usually: many trees, moderate depth. The beauty of RF is it\'s hard to break — even bad settings usually give reasonable results.',
    zh: '现在是有趣的部分——改变设置会怎样？[拖动滑块] 试试把树从10增加到100——看边界变得更平滑。现在试试max_depth=20——看边界太扭曲了？那是过拟合。最佳点通常是：很多树，适度深度。RF的美妙之处是很难搞砸——即使设置不好通常也能给出合理的结果。',
  },
  applications: {
    en: '[Press → for each application] Our hiking example had just 4 features. But Random Forest scales beautifully. Medical diagnosis: hundreds of patient features, and feature importance tells doctors which factors matter. Fraud detection: millions of transaction features in milliseconds. Ecology: classifying land cover from satellite images — literally seeing the forest! Recommendation systems: ranking content from hundreds of behavior signals.',
    zh: '[按→展示每个应用] 我们的远足示例只有4个特征。但随机森林能优美地扩展。医学诊断：数百个患者特征，特征重要性告诉医生哪些因素重要。欺诈检测：毫秒内处理数百万交易特征。生态学：从卫星图像分类土地覆盖——真正地看到森林！推荐系统：用数百个行为信号排序内容。',
  },
  strengths: {
    en: 'Every algorithm has tradeoffs. Green dots: RF is resistant to overfitting (remember the crowd wisdom?), handles high dimensions easily, provides feature importance for free, and works without data preprocessing. Gray dots: it\'s a "black box" compared to a single tree, slower for predictions, uses more memory, and struggles with very sparse or sequential data. Overall: one of the best "default" algorithms in machine learning.',
    zh: '每个算法都有取舍。绿点：RF抗过拟合（还记得群体智慧吗？），轻松处理高维数据，免费提供特征重要性，无需数据预处理。灰点：相比单棵树是个"黑盒"，预测更慢，占用更多内存，不擅长非常稀疏或序列数据。总体来说：机器学习中最好的"默认"算法之一。',
  },
  takeaways: {
    en: 'Three things to take away today. [Point to each] First: Random Forest = many diverse trees voting together, which reduces variance. Second: the diversity comes from TWO sources — bootstrap sampling gives different data, feature randomness gives different perspectives. Third: it comes with built-in tools — OOB error for free validation, and feature importance to understand what the model learned.',
    zh: '今天带走三件事。[指向每个] 第一：随机森林=多棵多样的树一起投票，降低方差。第二：多样性来自两个来源——自助采样给不同的数据，特征随机性给不同的视角。第三：自带工具——OOB误差免费验证，特征重要性理解模型学到了什么。',
  },
  qa: {
    en: 'That\'s Random Forest! From one fragile tree to a powerful forest — the wisdom of crowds applied to machine learning. Thank you for listening. We\'re happy to answer any questions.',
    zh: '这就是随机森林！从一棵脆弱的树到一片强大的森林——群体智慧在机器学习中的应用。感谢聆听，我们很乐意回答任何问题。',
  },
}
