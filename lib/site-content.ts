export type ContentStatus = "live" | "coming-soon" | "development"

export interface ContentItem {
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
  image?: string
  href?: string
  status: ContentStatus
  featured?: boolean
}

export interface ServiceItem {
  title: string
  summary: string
  audience: string
  deliverables: string[]
  status: ContentStatus
}

export const siteConfig = {
  name: "Jason Huang",
  tagline: "AI Builder、内容创作者与开源贡献者",
  description: "Jason Huang 的个人主页，记录 AI 项目、文章、开源共创与持续生长的想法。",
  feishuFormUrl: "",
}

export const navItems = [
  { title: "项目", href: "/#projects" },
  { title: "文章", href: "/#notes" },
  { title: "关于", href: "/about" },
  { title: "联系", href: "/#contact" },
]

export const knowledgeItems: ContentItem[] = [
  {
    slug: "agent-foundations",
    title: "AI Agent 从原理到实践",
    summary: "理解智能体的任务拆解、工具调用、记忆和多智能体协作，并用真实项目完成学习闭环。",
    category: "Agent",
    tags: ["Agent", "Multi-Agent", "Tool Use"],
    href: "https://traehello-agents-aicookbookt5mr.vercel.app",
    status: "live",
    featured: true,
  },
  {
    slug: "rag-practice",
    title: "RAG 应用设计与优化",
    summary: "从文档切分、向量检索到召回优化，建立可以在业务中稳定工作的知识库应用。",
    category: "RAG",
    tags: ["RAG", "Embedding", "知识库"],
    status: "coming-soon",
    featured: true,
  },
  {
    slug: "ai-coding",
    title: "AI 编程工作流",
    summary: "把需求分析、代码生成、调试与交付串成可靠工作流，让 AI 真正参与软件开发。",
    category: "AI 编程",
    tags: ["Codex", "Claude Code", "Workflow"],
    status: "coming-soon",
    featured: true,
  },
  {
    slug: "prompt-skills",
    title: "高阶 Prompt 技巧",
    summary: "系统梳理 CoT、ToT、ReAct、模型参数与提示词安全等实用方法。",
    category: "AI 编程",
    tags: ["Prompt", "ReAct", "技巧"],
    href: "https://juejin.cn/post/7283426137968525312",
    status: "live",
  },
  {
    slug: "content-automation",
    title: "AI 内容自动化",
    summary: "从选题、素材整理到多平台分发，设计可复用、可人工介入的内容生产流程。",
    category: "自动化",
    tags: ["自动化", "AIGC", "工作流"],
    status: "coming-soon",
  },
  {
    slug: "ai-video-music",
    title: "AI 影像与音乐创作",
    summary: "将生成式 AI 用于音乐、短片和视觉创意，兼顾创意表达与制作流程。",
    category: "内容创作",
    tags: ["AI 视频", "AI 音乐", "创意"],
    status: "coming-soon",
  },
  {
    slug: "chatgpt-overview",
    title: "我眼中的 ChatGPT",
    summary: "从模型演进、工作原理到应用想象，建立对生成式 AI 的完整认知。",
    category: "大模型",
    tags: ["ChatGPT", "GPT", "LLM"],
    href: "https://juejin.cn/post/7198426159478669373",
    status: "live",
  },
  {
    slug: "ai-year-2023",
    title: "AI 爆发的一年：2023 总结",
    summary: "回顾文本、图像、音频与视频领域的重要变化，以及 AI 应用实践中的真实观察。",
    category: "行业观察",
    tags: ["AI", "AIGC", "年度总结"],
    href: "https://juejin.cn/post/7317908960756662306",
    status: "live",
  },
]

export const projectItems: ContentItem[] = [
  {
    slug: "hello-agents",
    title: "Hello-Agents",
    summary: "Datawhale 系统性智能体教程，从基础原理到多智能体实践，我作为核心贡献者参与共建。",
    category: "开源项目",
    tags: ["Python", "LLM", "Agent", "Multi-Agent"],
    image: "/hello-agents.png",
    href: "https://github.com/datawhalechina/hello-agents",
    status: "live",
    featured: true,
  },
  {
    slug: "hugging-llm",
    title: "Hugging-LLM 蝴蝶书",
    summary: "面向非算法背景读者的 ChatGPT 原理、使用与应用教程，降低大模型学习门槛。",
    category: "开源项目",
    tags: ["LLM", "OpenAI", "Qwen", "教程"],
    image: "/hugging-llm.jpeg",
    href: "https://github.com/datawhalechina/hugging-llm",
    status: "live",
    featured: true,
  },
  {
    slug: "async-trader",
    title: "AsyncTrader",
    summary: "使用 ChatGPT 自动编写与回测量化交易策略，获得百度大模型应用创新挑战赛最佳创意奖。",
    category: "AI 应用",
    tags: ["Quant", "OpenAI", "LangChain"],
    image: "/AsyncTrader.png",
    href: "https://github.com/HeteroCat/AsyncTrader",
    status: "live",
    featured: true,
  },
  {
    slug: "prompt-market",
    title: "PromptMarket",
    summary: "面向电商、金融和教育场景的提示词发现、分享与创建平台。",
    category: "产品",
    tags: ["Prompt", "Community", "AI"],
    href: "https://prompt.heterocat.com.cn",
    status: "live",
  },
  {
    slug: "muses-system",
    title: "Muses-System",
    summary: "自动构建和优化 AI 内容创作流程，为内容生产提供端到端工作台。",
    category: "产品",
    tags: ["AIGC", "Agent", "Workflow"],
    href: "https://musesos.ai-magic.top",
    status: "live",
  },
  {
    slug: "micro-touch",
    title: "MicroTouch",
    summary: "可插拔的 AI 搜索与分析工具，探索更自主、更可控的研究体验。",
    category: "产品",
    tags: ["AI Search", "Agent", "Research"],
    href: "https://touch.heterocat.com.cn",
    status: "development",
  },
  {
    slug: "ai-news",
    title: "AI News 智能体",
    summary: "追踪全球 AI 动态并筛选高价值资讯，缩短信息收集和整理时间。",
    category: "智能体",
    tags: ["Coze", "AI News", "Automation"],
    image: "/agents/ai-news.png",
    href: "https://www.coze.cn/s/p3_tHTt4UCc/",
    status: "live",
  },
  {
    slug: "ai-data-analysis",
    title: "AI Data Analysis",
    summary: "面向日常分析任务的智能体应用，帮助用户梳理数据并形成可读结论。",
    category: "智能体",
    tags: ["Coze", "Data Analysis", "Agent"],
    image: "/agents/ai-data.jpg",
    href: "https://www.coze.cn/s/-FFDPYw8X8s/",
    status: "live",
  },
  {
    slug: "ai-poster-studio",
    title: "AI Poster Studio",
    summary: "用于快速生成创意海报的 AI 设计工作台，覆盖多种常用视觉需求。",
    category: "智能体",
    tags: ["Coze", "AI Design", "AIGC"],
    image: "/agents/AIhuabu.png",
    href: "https://www.coze.cn/s/OsJ0tbhkZes/",
    status: "live",
  },
]

export const trainingItems: ContentItem[] = [
  {
    slug: "open-workshops",
    title: "AI 实战公开课",
    summary: "用一场课完成一个可运行的小项目，适合希望快速了解 AI 应用方式的学习者。",
    category: "公开课",
    tags: ["入门", "实战", "在线"],
    status: "coming-soon",
  },
  {
    slug: "agent-bootcamp",
    title: "Agent 应用开发体系课",
    summary: "覆盖模型能力、RAG、工具调用、工作流、多智能体与部署，强调独立交付能力。",
    category: "体系课",
    tags: ["Agent", "RAG", "项目制"],
    status: "coming-soon",
  },
  {
    slug: "enterprise-training",
    title: "企业 AI 内训",
    summary: "围绕团队实际岗位和业务流程定制内容，帮助成员建立共同认知并完成场景演练。",
    category: "企业内训",
    tags: ["定制", "团队", "业务场景"],
    status: "coming-soon",
  },
]

export const serviceItems: ServiceItem[] = [
  {
    title: "AI 业务咨询",
    summary: "识别高价值场景，评估数据、流程与组织条件，形成可执行的落地路线。",
    audience: "正在寻找 AI 切入点的团队",
    deliverables: ["场景梳理", "可行性评估", "落地路线图"],
    status: "coming-soon",
  },
  {
    title: "Agent 定制开发",
    summary: "围绕知识检索、内容生产、数据分析等场景，构建可使用的智能体应用。",
    audience: "已有明确业务任务的团队",
    deliverables: ["方案设计", "原型开发", "部署交付"],
    status: "coming-soon",
  },
  {
    title: "工作流自动化",
    summary: "连接现有工具与数据，把重复的信息处理任务变成可追踪的自动化流程。",
    audience: "希望提升运营效率的团队",
    deliverables: ["流程诊断", "自动化搭建", "使用文档"],
    status: "coming-soon",
  },
  {
    title: "企业 AI 内训",
    summary: "结合岗位和业务案例，让团队理解能力边界、掌握工具并形成实践方法。",
    audience: "需要统一 AI 认知的组织",
    deliverables: ["课程定制", "现场教学", "案例演练"],
    status: "coming-soon",
  },
]

export const caseItems: ContentItem[] = [
  {
    ...projectItems[0],
    slug: "case-hello-agents",
    category: "知识产品",
    summary: "参与大型开源智能体教程共建，将分散的 Agent 知识组织为从原理到实践的学习路径。",
  },
  {
    ...projectItems[2],
    slug: "case-async-trader",
    category: "应用创新",
    summary: "把大模型能力嵌入量化策略生成、回测与文档问答流程，验证 AI 与专业工具协同的可能性。",
  },
  {
    ...projectItems[6],
    slug: "case-ai-news",
    category: "流程自动化",
    summary: "将资讯追踪、筛选和摘要组织为智能体流程，展示信息处理类 Agent 的完整应用形态。",
  },
]

export const articleItems = knowledgeItems.filter((item) => item.href)

export const honors = [
  "Datawhale 意向成员、WaytoAGI 超创",
  "百度大模型应用挑战赛最佳创意奖",
  "阿里百炼 AI 智能体作品签约作者",
  "AI 微电影黑客松第二名",
  "稀土掘金社区 AI 人气作者",
  "《ChatGPT 原理与应用开发》共创作者",
  "Hello-Agents 开源项目核心贡献者",
]

export const certificates = Array.from({ length: 9 }, (_, index) => ({
  src: `/certificate/${index + 1}.${index < 4 ? "png" : "jpg"}`,
  alt: `Jason Huang 专业证书 ${index + 1}`,
}))

export const socialLinks = [
  {
    title: "小红书",
    href: "https://www.xiaohongshu.com/user/profile/5f43082c00000000010079c8",
  },
  {
    title: "抖音",
    href: "https://www.douyin.com/user/MS4wLjABAAAAvBkZt534BdaLk_KUZpdWBa3CzGgL-nvlMNZKWHD054U",
  },
  {
    title: "哔哩哔哩",
    href: "https://space.bilibili.com/629561876",
  },
  { title: "GitHub", href: "https://github.com/HeteroCat" },
]
