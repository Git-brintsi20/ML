export const LEVELS = [
    {
        name: 'AI Fundamentals',
        sub: 'Linear Algebra, Calculus, Probability',
        badge: '⚡',
        badgeClass: 'badge-blue',
        tasks: [
            { id: 't0_0', type: 'concept', label: '3Blue1Brown — Linear Algebra Essentials (YouTube series)', detail: 'Watch series. Intuitive introduction to vectors, matrices, transformations. ~45 min.', domain: 'Foundation' },
            { id: 't0_1', type: 'concept', label: '3Blue1Brown — Essence of Calculus', detail: 'Chain rule, partial derivatives, gradient descent intuition. ~30 min.', domain: 'Foundation' },
            { id: 't0_2', type: 'concept', label: 'Probability & Statistics (Khan Academy or StatQuest)', detail: 'Distributions, sampling, hypothesis testing. Practical for ML.', domain: 'Foundation' },
            { id: 't0_3', type: 'build', label: 'Build: Simple linear regression from scratch (NumPy)', detail: 'No sklearn. Implement normal equation or gradient descent. Understand math.', domain: 'Foundation' },
            { id: 't0_4', type: 'build', label: 'Build: Decision boundary visualization (matplotlib)', detail: 'Logistic regression on 2D synthetic data. Plot decision boundary.', domain: 'Foundation' },
            { id: 't0_5', type: 'read', label: 'Andrew Ng\'s ML Course (Coursera) — Weeks 1-3', detail: 'Supervised learning, linear regression, gradient descent. ~9 hours.', domain: 'Foundation' },
            { id: 't0_6', type: 'yt', label: 'Jeremy Howard — Fast.ai Lesson 1 (top-down intro)', detail: 'Practical, code-first introduction to deep learning. ~2 hours.', domain: 'Foundation' },
        ]
    },
    {
        name: 'Classical ML',
        sub: 'Tree-based, Ensemble, Feature Engineering',
        badge: '🌳',
        badgeClass: 'badge-green',
        tasks: [
            { id: 't1_0', type: 'yt', label: 'StatQuest — Decision Trees & Random Forests', detail: 'Clear intuitive explanations. Understand splits, bagging, boosting.', domain: 'Trees' },
            { id: 't1_1', type: 'concept', label: 'Gradient Boosting intuition (XGBoost, LightGBM)', detail: 'How boosting works, residuals, learning rate, tree depth trade-offs.', domain: 'Trees' },
            { id: 't1_2', type: 'build', label: 'Kaggle competition: Tabular data (Titanic, House Prices)', detail: 'Use sklearn, pandas, feature engineering. Submit to Leaderboard.', domain: 'Kaggle' },
            { id: 't1_3', type: 'build', label: 'Build: Feature engineering pipeline', detail: 'Missing value handling, scaling, encoding, feature selection.', domain: 'Feature Eng' },
            { id: 't1_4', type: 'read', label: 'Fast.ai Lesson 4-5 — Tabular models, embeddings', detail: 'Entity embeddings, neural nets for structured data. ~4 hours.', domain: 'Fast.ai' },
            { id: 't1_5', type: 'concept', label: 'Cross-validation, hyperparameter tuning, overfitting', detail: 'K-fold, GridSearch/RandomSearch, regularization (L1/L2).', domain: 'Validation' },
            { id: 't1_6', type: 'build', label: 'Build: Custom sklearn pipeline with validation', detail: 'Put it all together: data → features → model → eval.', domain: 'Production' },
        ]
    },
    {
        name: 'Deep Learning Basics',
        sub: 'NNs, CNNs, RNNs, Transformers',
        badge: '🧠',
        badgeClass: 'badge-purple',
        tasks: [
            { id: 't2_0', type: 'concept', label: '3Blue1Brown — Neural Networks (YouTube)', detail: 'Backpropagation, forward pass, gradient flow. Clear visuals. ~20 min.', domain: 'Foundation' },
            { id: 't2_1', type: 'yt', label: 'Jeremy Howard — Fast.ai Lesson 6-7 (CNNs)', detail: 'Convolutional networks, image classification, transfer learning.', domain: 'Computer Vision' },
            { id: 't2_2', type: 'build', label: 'Build: MNIST classifier (PyTorch or TensorFlow)', detail: 'Simple CNN, Dataloaders, training loop, evaluation.', domain: 'Deep Learning' },
            { id: 't2_3', type: 'concept', label: 'RNNs, LSTMs, Attention mechanism', detail: 'Sequence models, vanishing gradients, attention intuition.', domain: 'NLP' },
            { id: 't2_4', type: 'build', label: 'Build: Character-level language model (RNN)', detail: 'Generate text character by character. Understand sequence prediction.', domain: 'NLP' },
            { id: 't2_5', type: 'yt', label: 'Attention is All You Need (explained)', detail: 'Transformer architecture from scratch. ~1 hour video explanation.', domain: 'Transformers' },
            { id: 't2_6', type: 'build', label: 'Kaggle: Image classification competition', detail: 'ResNet or Vision Transformer. Submit predictions.', domain: 'Kaggle' },
        ]
    },
    {
        name: 'NLP & Foundation Models',
        sub: 'Embeddings, LLMs, Fine-tuning',
        badge: '📝',
        badgeClass: 'badge-yellow',
        tasks: [
            { id: 't3_0', type: 'yt', label: 'Hugging Face Course — NLP Fundamentals', detail: 'Tokenization, embeddings, pre-trained models. ~2 hours.', domain: 'NLP' },
            { id: 't3_1', type: 'concept', label: 'Word embeddings (Word2Vec, GloVe) vs contextual (BERT)', detail: 'Why BERT is better, subword tokenization, attention visualization.', domain: 'NLP' },
            { id: 't3_2', type: 'build', label: 'Build: Sentiment classification with Transformers', detail: 'Fine-tune BERT on custom dataset. Evaluate accuracy/F1.', domain: 'NLP' },
            { id: 't3_3', type: 'read', label: 'Attention Is All You Need (Vaswani et al. paper)', detail: 'Original Transformer paper. Dense but foundational.', domain: 'Reading' },
            { id: 't3_4', type: 'yt', label: 'LLM Course by Andrej Karpathy (nanoGPT)', detail: 'Build GPT from scratch in PyTorch. Deep understanding. ~4 hours.', domain: 'Foundation' },
            { id: 't3_5', type: 'build', label: 'Build: LLM fine-tuning (LoRA or QLoRA)', detail: 'Fine-tune open LLM (Llama, Mistral) on custom data.', domain: 'LLM' },
            { id: 't3_6', type: 'build', label: 'Build: RAG pipeline (LLM + vector DB)', detail: 'Retrieve docs, pass to LLM, generate answers. Production-ready.', domain: 'Production' },
        ]
    },
    {
        name: 'ML Systems & Deployment',
        sub: 'Production ML, Agentic AI',
        badge: '🚀',
        badgeClass: 'badge-red',
        tasks: [
            { id: 't4_0', type: 'read', label: '"Hidden Technical Debt in ML Systems" (Google paper)', detail: 'Data dependencies, monitoring, testing. Real production concerns.', domain: 'Production' },
            { id: 't4_1', type: 'concept', label: 'MLOps pipeline: Data → Train → Eval → Deploy → Monitor', detail: 'CI/CD for ML, versioning (DVC), versioning (MLflow).', domain: 'Production' },
            { id: 't4_2', type: 'build', label: 'Build: Model serving API (FastAPI)', detail: 'REST endpoint for inference, input validation, async requests.', domain: 'Production' },
            { id: 't4_3', type: 'concept', label: 'Containerization (Docker) and cloud deployment (Heroku, AWS)', detail: 'Package model, scale, manage dependencies.', domain: 'Production' },
            { id: 't4_4', type: 'build', label: 'Build: End-to-end pipeline (data → train → serve)', detail: 'Write to disk, CI trigger, test, deploy. Automate everything.', domain: 'Production' },
            { id: 't4_5', type: 'read', label: 'Anthropic — "Building Effective Agents" (anthropic.com)', detail: 'Short, practical guide. LLM agents with tool calling, planning.', domain: 'Reading' },
            { id: 't4_6', type: 'build', label: 'Build: Multi-agent LLM system', detail: 'Use LangGraph. Agents collaborate on complex tasks. Production-ready.', domain: 'Production' },
        ]
    },
    {
        name: 'Bonus: Reinforcement Learning & Advanced',
        sub: 'Optional deep dives',
        badge: '⭐',
        badgeClass: 'badge-teal',
        tasks: [
            { id: 't5_0', type: 'yt', label: 'Andrew Ng — Agentic AI (DeepLearning.ai free short courses)', detail: '"AI Agents in LangGraph", "Building Agentic RAG". 1-2 hour focused courses, free.', domain: 'Foundation' },
            { id: 't5_1', type: 'yt', label: 'LangChain / LangGraph official YT — multi-agent tutorials', detail: 'Search "LangGraph multi-agent". Code-heavy, direct.', domain: 'Foundation' },
            { id: 't5_2', type: 'build', label: 'Multi-agent: news fetch → sentiment → report writer', detail: 'Agent 1: web search. Agent 2: your Level 4 sentiment model. Agent 3: summary. LangGraph orchestration.', domain: 'Fintech 💰 + Ecommerce 🛒' },
            { id: 't5_3', type: 'build', label: 'Add evals harness to your agent', detail: 'Test whether outputs are accurate/grounded. This separates student project from production ML work.', domain: 'Production' },
            { id: 't5_4', type: 'concept', label: 'Tool calling, ReAct pattern, memory types', detail: 'Short-term (context), long-term (DB), episodic (history). How an LLM takes real actions.', domain: 'Concept' },
            { id: 't5_5', type: 'concept', label: 'Evals: without eval, you don\'t know if your agent works', detail: 'Hardest + most underrated skill in ML. Build eval before you build features.', domain: 'Concept' },
            { id: 't5_6', type: 'read', label: 'Anthropic — "Building Effective Agents" (anthropic.com)', detail: 'Short, practical, from people who build these in production. Required for your internship context.', domain: 'Reading' },
        ]
    }
];
export const HABITS = [
    { id: 'h_yt', name: '📺 Watch YT lesson' },
    { id: 'h_code', name: '⚙ Write / commit code' },
    { id: 'h_read', name: '📖 Read blog / paper' },
    { id: 'h_kaggle', name: '🗃 Kaggle activity' },
    { id: 'h_log', name: '✍ Write Growth Log entry' },
];
