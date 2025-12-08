import type { Menu } from "./type";

export const menu: Menu[] = [
  {
    name: "top-ai-productivity-tools",
    nameStr: "top",
    isHomeData: true,
    children: [
      {
        name: "doubao-ai-productivity-assistant",
        nameStr: "doubao",
        iframeUrl: "https://www.doubao.com",
        bgImg: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/samantha/logo-icon-white-bg.png",
        description:
          "Doubao is an intelligent AI assistant developed by ByteDance, offering conversational interaction, content creation, problem-solving, and productivity tools tailored for Chinese users.",
        tags: ["doubao", "ai", "productivity", "assistant", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "github-copilot-code-autocomplete",
        nameStr: "github",
        iframeUrl: "https://github.com/features/copilot",
        bgImg: "",
        description:
          "GitHub Copilot is an AI pair programmer from GitHub and OpenAI that autocompletes multi-line code, writes tests, and converts natural language prompts into code across major IDEs.",
        tags: ["github", "copilot", "code", "autocomplete", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "chatgpt-openai-writing-coding",
        nameStr: "chatgpt",
        iframeUrl: "https://openai.com/chatgpt",
        bgImg: "",
        description:
          "ChatGPT is an AI-powered chatbot by OpenAI, generating human-like responses, writing essays, coding, and answering complex questions using advanced GPT language models.",
        tags: ["chatgpt", "openai", "writing", "coding", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "deepseek-open-source-reasoning",
        nameStr: "deepseek",
        iframeUrl: "https://www.deepseek.com",
        bgImg: "",
        description:
          "DeepSeek is a high-performance open-source AI model and assistant specializing in code generation, mathematical reasoning, and multi-language support with enterprise-grade security features.",
        tags: ["deepseek", "open", "source", "reasoning", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "baidu-wenxin-chinese-ai",
        nameStr: "baidu",
        iframeUrl: "https://yiyan.baidu.com",
        bgImg: "",
        description:
          "Baidu Wenxin Yiyan is a generative AI developed by Baidu, integrating large language models with Chinese cultural understanding for content creation, data analysis, and intelligent interaction.",
        tags: ["baidu", "wenxin", "chinese", "ai", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "baidu-ernie-enterprise-assistant",
        nameStr: "baidu-ernie",
        iframeUrl: "https://ernie-bot.chat",
        bgImg: "",
        description:
          "Baidu ERNIE Bot is an enhanced AI assistant based on Baidu's ERNIE large model, providing professional knowledge, creative content generation, and scenario-based intelligent services.",
        tags: ["baidu", "ernie", "enterprise", "assistant", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "claude-anthropic-safe-ai",
        nameStr: "claude",
        iframeUrl: "https://www.anthropic.com/index/claude",
        bgImg: "",
        description:
          "Claude is an AI assistant by Anthropic focused on safety and transparency, handling long documents, generating accurate responses, and integrating seamlessly with business workflows.",
        tags: ["claude", "anthropic", "safe", "ai", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "google-gemini-multimodal-ai",
        nameStr: "google",
        iframeUrl: "https://gemini.google.com",
        bgImg: "",
        description:
          "Google Gemini is a multimodal AI model supporting text, image, audio, and video interactions, designed for seamless integration with Google services and third-party applications.",
        tags: ["google", "gemini", "multimodal", "ai", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "dalle3-openai-image-generator",
        nameStr: "dalle3",
        iframeUrl: "https://openai.com/dall-e-3",
        bgImg:
          "https://images.ctfassets.net/kftzwdyauwt9/5JZsznv2kZBJhcntpSLEL9/fbe72de7edaceb8a44176170312ccf2a/picnic-cherry-tree.jpeg?w=1920&q=90&fm=webp",
        description:
          "DALL·E is an AI image generation tool by OpenAI that transforms natural language prompts into high-quality creative images with style customization and detailed scene generation.",
        tags: ["dalle3", "openai", "image", "generator", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "midjourney-ai-art-generator",
        nameStr: "midjourney",
        iframeUrl: "https://www.midjourney.com",
        bgImg: "",
        description:
          "MidJourney is an AI image generation platform specializing in artistic and creative visuals, generating high-resolution images from text prompts with advanced style controls.",
        tags: ["midjourney", "ai", "art", "generator", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "zhihu-chart-data-assistant",
        nameStr: "zhihu",
        iframeUrl: "https://www.zhihu.com/chart-ai",
        bgImg: "",
        description:
          "Zhihu Chart AI is Zhihu's AI assistant for data visualization and content analysis, helping users create charts, analyze data, and generate insights from complex information.",
        tags: ["zhihu", "chart", "data", "assistant", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "iflytek-speech-nlp-platform",
        nameStr: "iflytek",
        iframeUrl: "https://www.iflytek.com/",
        bgImg: "",
        description:
          "iFlytek AI is a comprehensive platform offering speech recognition, natural language processing, computer vision, and intelligent hardware solutions for enterprise and consumer use.",
        tags: ["iflytek", "speech", "nlp", "platform", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "tongyi-qianwen-enterprise-ai",
        nameStr: "tongyi",
        iframeUrl: "https://tongyi.aliyun.com/",
        bgImg: "",
        description:
          "Alibaba Tongyi Qianwen is a generative AI integrating large language models with e-commerce, cloud services, and enterprise applications, supporting multi-scenario intelligent interaction.",
        tags: ["tongyi", "qianwen", "enterprise", "ai", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "adobe-firefly-creative-suite",
        nameStr: "adobe",
        iframeUrl: "https://www.adobe.com/uk/products/firefly.html",
        bgImg: "",
        description:
          "Adobe Firefly is an AI creative tool designed for ethical content generation, including images, text effects, and vector graphics, seamlessly integrating with Adobe Creative Cloud.",
        tags: ["adobe", "firefly", "creative", "suite", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "bing-ai-search-copilot",
        nameStr: "bing",
        iframeUrl: "https://www.bing.com/new",
        bgImg: "",
        description:
          "Bing AI is Microsoft's AI-powered search assistant combining search capabilities with conversational interaction, content generation, and real-time information updates.",
        tags: ["bing", "ai", "search", "copilot", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "cohere-enterprise-nlp-platform",
        nameStr: "cohere",
        iframeUrl: "https://cohere.com",
        bgImg: "",
        description:
          "Cohere is an AI platform specializing in natural language processing, offering models for text classification, summarization, translation, and chatbots with enterprise-grade scalability.",
        tags: ["cohere", "enterprise", "nlp", "platform", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "perplexity-ai-search-assistant",
        nameStr: "perplexity",
        iframeUrl: "https://www.perplexity.ai",
        bgImg: "",
        description:
          "Perplexity AI is an AI search and knowledge assistant providing accurate, cited answers to complex questions, integrating real-time data and deep research capabilities.",
        tags: ["perplexity", "ai", "search", "assistant", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "notion-ai-workspace-automation",
        nameStr: "notion",
        iframeUrl: "https://www.notion.so/product/ai",
        bgImg: "",
        description:
          "Notion AI is an AI assistant integrated into Notion, enhancing productivity with text generation, summarization, editing, and task automation within the Notion workspace.",
        tags: ["notion", "ai", "workspace", "automation", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "stable-diffusion-image-model",
        nameStr: "stable",
        iframeUrl: "https://stability.ai/stable-diffusion",
        bgImg: "",
        description:
          "Stable Diffusion is an open-source AI image generation model, allowing users to generate custom images from text prompts, with extensive community-driven modifications and tools.",
        tags: ["stable", "diffusion", "image", "model", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "meta-llama-language-model",
        nameStr: "meta",
        iframeUrl: "https://ai.meta.com/llama/",
        bgImg: "",
        description:
          "Meta Llama is an open-source large language model by Meta, designed for research and commercial use, supporting customization, fine-tuning, and deployment across various platforms.",
        tags: ["meta", "llama", "language", "model", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "cursor-ide-ai-editor",
        nameStr: "cursor",
        iframeUrl: "https://cursor.com/cn",
        bgImg: "",
        description:
          "Cursor IDE is an AI-native editor that lets you chat with your repo, refactor entire files, and review diff previews using Claude 3.5 and GPT-4o models.",
        tags: ["cursor", "ide", "ai", "editor", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "amazon-q-developer-copilot",
        nameStr: "amazon",
        iframeUrl: "https://aws.amazon.com/q/developer/",
        bgImg: "",
        description:
          "Amazon Q Developer is AWS’s coding copilot that drafts infrastructure as code, fixes vulnerabilities, and can run commands directly in CloudShell and IDE integrations.",
        tags: ["amazon", "q", "developer", "copilot", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "sourcegraph-cody-code-assistant",
        nameStr: "sourcegraph",
        iframeUrl: "https://sourcegraph.com/cody",
        bgImg: "",
        description:
          "Sourcegraph Cody is a deep-code AI assistant with repository-aware context, structural search, and precise answers grounded in Sourcegraph’s code graph.",
        tags: ["sourcegraph", "cody", "code", "assistant", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "codeium-free-coding-toolkit",
        nameStr: "codeium",
        iframeUrl: "https://codeium.com/",
        bgImg: "",
        description:
          "Codeium is a free-for-dev AI toolkit from Exafunction that offers autocomplete, chat, and refactor actions for 70+ languages across JetBrains, VS Code, and browser editors.",
        tags: ["codeium", "free", "coding", "toolkit", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "gitlab-duo-pair-programmer",
        nameStr: "gitlab",
        iframeUrl: "https://about.gitlab.com/gitlab-duo/",
        bgImg: "",
        description:
          "GitLab Duo is GitLab’s native AI pair programmer that comments on merge requests, generates secure code in the Web IDE, and triages CI issues with context from your repo and pipelines.",
        tags: ["gitlab", "duo", "pair", "programmer", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "replit-ghostwriter-ai-teammate",
        nameStr: "replit",
        iframeUrl: "https://replit.com/site/ghostwriter",
        bgImg: "",
        description:
          "Replit Ghostwriter is an AI teammate inside Replit that completes functions, explains runtime errors, and can edit whole files through conversational prompts tied to your workspace.",
        tags: ["replit", "ghostwriter", "ai", "teammate", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "gemini-code-assist-copilot",
        nameStr: "gemini",
        iframeUrl: "https://cloud.google.com/gemini/docs/code-assist",
        bgImg: "",
        description:
          "Gemini Code Assist is Google Cloud’s Gemini-based coding partner that understands multi-file context, fixes IaC policies, and can run remediation plans across Cloud Workstations and IDE plugins.",
        tags: ["gemini", "code", "assist", "copilot", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "tabnine-secure-code-completion",
        nameStr: "tabnine",
        iframeUrl: "https://www.tabnine.com/",
        bgImg: "",
        description:
          "Tabnine is an enterprise-grade AI completion engine that can run fully on-prem, trains on your private repositories, and plugs into JetBrains, VS Code, Neovim, and fleet editors.",
        tags: ["tabnine", "secure", "code", "completion", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "grok-ai-chatbot",
        nameStr: "grok",
        iframeUrl: "https://x.ai/",
        bgImg: "",
        description:
          "Grok is X.ai’s real-time chatbot built on Grok-2, streaming fresh social data and playful replies for trending news, research, and entertainment prompts.",
        tags: ["grok", "ai", "chatbot", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mistral-large-language-model",
        nameStr: "mistral",
        iframeUrl: "https://mistral.ai/",
        bgImg: "",
        description:
          "Mistral AI ships high-performance large language models like Mixtral and Le Chat, optimized for multilingual reasoning, coding help, and cost-efficient deployment.",
        tags: ["mistral", "large", "language", "model", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "suno-ai-music-generator",
        nameStr: "suno",
        iframeUrl: "https://suno.com/",
        bgImg: "",
        description:
          "Suno AI turns plain text prompts into full songs with vocals, styles, and downloadable stems, making rapid music prototyping accessible to non-musicians.",
        tags: ["suno", "ai", "music", "generator", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "blackbox-ai-code-assistant",
        nameStr: "blackbox",
        iframeUrl: "https://www.blackbox.ai/",
        bgImg: "",
        description:
          "Blackbox AI is a coding copilot for browser and IDE workflows, supporting repo-aware chat, code search, and autocomplete for 200+ languages.",
        tags: ["blackbox", "ai", "code", "assistant", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "phind-ai-coding-search",
        nameStr: "phind",
        iframeUrl: "https://www.phind.com/",
        bgImg: "",
        description:
          "Phind is an AI search engine for developers that pairs fast web answers with Claude and GPT reasoning to debug, explain, and scaffold code.",
        tags: ["phind", "ai", "coding", "search", "tool"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "essential-office-productivity-tools",
    nameStr: "essential",
    isHomeData: true,
    children: [
      {
        name: "microsoft-excel-data-analysis",
        nameStr: "microsoft",
        iframeUrl: "https://www.microsoft.com/zh-cn/microsoft-365/excel",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/440623-Hero-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=770&qlt=100&fmt=png-alpha&fit=constrain",
        description:
          "Microsoft Excel is leading spreadsheet software for organizing data, calculating with formulas, visualizing insights, and enabling real-time collaboration for businesses and individuals.",
        tags: ["microsoft", "excel", "data", "analysis", "tool"],
        updateTime: "2025-10-30",
      },
      {
        name: "microsoft-word-document-editor",
        nameStr: "microsoft-word",
        iframeUrl: "https://www.microsoft.com/zh-cn/microsoft-365/word",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/440250_M365-hero-1680x628-opiton1?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=725&qlt=100&fmt=png-alpha&fit=constrain",
        description:
          "Microsoft Word is the industry-standard word processor for formatting documents, checking grammar, and supporting real-time co-authoring for professional and academic use.",
        tags: ["microsoft", "word", "document", "editor", "tool"],
        updateTime: "2025-10-28",
      },
      {
        name: "microsoft-powerpoint-presentation",
        nameStr: "microsoft-powerpoint",
        iframeUrl: "https://www.microsoft.com/zh-cn/microsoft-365/powerpoint",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/440700-M365-Hero-image?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=750&qlt=100&fmt=png-alpha&fit=constrain",
        description:
          "Microsoft PowerPoint is a professional presentation tool for creating dynamic slides, adding animations, and enabling collaborative design for meetings, lectures, and events.",
        tags: ["microsoft", "powerpoint", "presentation", "tool", "platform"],
        updateTime: "2025-10-25",
      },
      {
        name: "microsoft-outlook-email-calendar",
        nameStr: "microsoft-outlook",
        iframeUrl:
          "https://www.microsoft.com/zh-cn/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/M365_FY26_Evergreen_ProductPage_Outlook_Header_Pedestal_Desktop_1600x632?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=770&qlt=100&fit=constrain",
        description:
          "Microsoft Outlook is an all-in-one email and calendar tool for managing messages, scheduling meetings, and syncing contacts seamlessly across devices.",
        tags: ["microsoft", "outlook", "email", "calendar", "tool"],
        updateTime: "2025-10-22",
      },
      {
        name: "microsoft-onenote-digital-notes",
        nameStr: "microsoft-onenote",
        iframeUrl: "https://www.microsoft.com/zh-cn/microsoft-365/onenote/digital-note-taking-app",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/h1rz79f6-1-hero-photo-568x520?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=1360&hei=765&qlt=100&fit=constrain",
        description:
          "Microsoft OneNote is a digital note-taking tool for organizing ideas, syncing across devices, and supporting collaborative editing for personal and team use.",
        tags: ["microsoft", "onenote", "digital", "notes", "tool"],
        updateTime: "2025-10-18",
      },
      {
        name: "microsoft-project-enterprise-planning",
        nameStr: "microsoft-project",
        iframeUrl:
          "https://www.microsoft.com/zh-cn/microsoft-365/project/project-management-software",
        bgImg:
          "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/433969-microsoft-planner-hero?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=4000&hei=1975&qlt=85&fmt=png-alpha&fit=constrain",
        description:
          "Microsoft Project is a project management tool for planning tasks, tracking progress, and collaborating with team members efficiently for business projects.",
        tags: ["microsoft", "project", "enterprise", "planning", "tool"],
        updateTime: "2025-10-05",
      },
    ],
  },
  {
    name: "kpop-demon-hunters",
    nameStr: "kpop",
    isHomeData: true,
    children: [
      {
        name: "kpop-demon-hunters-wikipedia",
        nameStr: "kpop-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/K-Pop:_Demon_Hunters",
        bgImg: "",
        description:
          "Wikipedia documents the K-Pop: Demon Hunters production timeline, confirmed creative team, voice cast, and plot synopsis straight from Disney Animation announcements.",
        tags: ["kpop", "demon", "hunters", "disney", "wiki"],
        updateTime: "2025-12-08",
      },
      {
        name: "variety-kpop-demon-hunters",
        nameStr: "kpop-variety",
        iframeUrl: "https://variety.com/2021/film/news/k-pop-demon-hunters-1234985118/",
        bgImg: "",
        description:
          "Variety’s Annecy coverage recaps interviews with directors Chris and Jennifer Lee, concept art reveals, and why Disney is leaning on K-pop choreography for the film.",
        tags: ["kpop", "variety", "annecy", "disney", "film"],
        updateTime: "2025-12-08",
      },
      {
        name: "animation-magazine-kpop-demon-hunters",
        nameStr: "kpop-animationmag",
        iframeUrl:
          "https://www.animationmagazine.net/2021/06/disney-announces-k-pop-demon-hunters-and-steam-bentley/",
        bgImg: "",
        description:
          "Animation Magazine’s announcement story highlights the producing team behind K-Pop: Demon Hunters and links to related Disney Animation pipeline updates.",
        tags: ["kpop", "animation", "disney", "announcement", "film"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "grol-license-prep",
    nameStr: "grol",
    isHomeData: true,
    children: [
      {
        name: "fcc-grol-overview",
        nameStr: "fcc-grol",
        iframeUrl: "https://www.fcc.gov/commercial-radio-operator-license-program",
        bgImg: "",
        description:
          "The FCC’s commercial operator portal lists General Radiotelephone Operator License eligibility, Element 1/3/8 requirements, and all application forms you need to file.",
        tags: ["grol", "fcc", "license", "element", "guide"],
        updateTime: "2025-12-08",
      },
      {
        name: "qrz-grol-practice",
        nameStr: "qrz-grol",
        iframeUrl: "https://www.qrz.com/hamtest/grol",
        bgImg: "",
        description:
          "QRZ’s browser-based simulator lets you drill the entire question pool for GROL Elements 1, 3, and 8 with instant grading and answer explanations.",
        tags: ["grol", "practice", "exam", "qrz", "radio"],
        updateTime: "2025-12-08",
      },
      {
        name: "coastguardexams-grol-guide",
        nameStr: "grol-guide",
        iframeUrl: "https://www.coastguardexams.com/grol-license.html",
        bgImg: "",
        description:
          "Coast Guard Exams outlines study schedules, recommended texts, and in-person test center logistics for mariners earning the FCC GROL credential.",
        tags: ["grol", "study", "guide", "maritime", "license"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "nintendo-switch-2",
    nameStr: "switch2",
    isHomeData: true,
    children: [
      {
        name: "tomsguide-nintendo-switch-2",
        nameStr: "tomsguide-switch2",
        iframeUrl: "https://www.tomsguide.com/news/nintendo-switch-2",
        bgImg: "",
        description:
          "Tom’s Guide tracks every Switch 2 leak, from rumored release windows to Nvidia silicon chatter and developer kits spotted in certification filings.",
        tags: ["nintendo", "switch2", "rumors", "tomsguide", "console"],
        updateTime: "2025-12-08",
      },
      {
        name: "vgc-nintendo-switch-2",
        nameStr: "vgc-switch2",
        iframeUrl: "https://www.videogameschronicle.com/features/nintendo-switch-2/",
        bgImg: "",
        description:
          "Video Games Chronicle’s hub aggregates insider reporting on Switch successor specs, backwards compatibility, and partner studios already building launch titles.",
        tags: ["nintendo", "switch2", "vgc", "hardware", "leaks"],
        updateTime: "2025-12-08",
      },
      {
        name: "gamesradar-nintendo-switch-2",
        nameStr: "gamesradar-switch2",
        iframeUrl: "https://www.gamesradar.com/nintendo-switch-2/",
        bgImg: "",
        description:
          "GamesRadar keeps a running FAQ covering Switch 2 design patents, Joy-Con revamps, dev comments, and how it stacks up against Steam Deck and ROG Ally.",
        tags: ["nintendo", "switch2", "gamesradar", "specs", "news"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "wicked-for-good",
    nameStr: "for-good",
    isHomeData: true,
    children: [
      {
        name: "wicked-official-site",
        nameStr: "wicked-site",
        iframeUrl: "https://wickedthemusical.com/",
        bgImg: "",
        description:
          "The official Wicked site posts touring schedules, behind-the-scenes clips, and performance notes for “For Good” ahead of the two-part film release.",
        tags: ["wicked", "for-good", "musical", "broadway", "official"],
        updateTime: "2025-12-08",
      },
      {
        name: "for-good-wikipedia",
        nameStr: "for-good-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/For_Good",
        bgImg: "",
        description:
          "Wikipedia’s “For Good” entry outlines the song’s context in Act II, lyrical themes, and key recordings by Idina Menzel and Kristin Chenoweth.",
        tags: ["wicked", "for-good", "wiki", "lyrics", "history"],
        updateTime: "2025-12-08",
      },
      {
        name: "for-good-genius-lyrics",
        nameStr: "for-good-genius",
        iframeUrl: "https://genius.com/Idina-menzel-and-kristin-chenoweth-for-good-lyrics",
        bgImg: "",
        description:
          "Genius provides annotated “For Good” lyrics with community notes on harmonies, chord progressions, and how the duet has evolved in concerts.",
        tags: ["wicked", "for-good", "lyrics", "genius", "music"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "welcome-to-derry",
    nameStr: "derry",
    isHomeData: true,
    children: [
      {
        name: "welcome-to-derry-wikipedia",
        nameStr: "derry-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/Welcome_to_Derry",
        bgImg: "",
        description:
          "Wikipedia covers the IT prequel’s showrunners, returning cast members, production timeline, and how the Max series ties into Andy Muschietti’s films.",
        tags: ["welcome", "derry", "wiki", "it", "series"],
        updateTime: "2025-12-08",
      },
      {
        name: "hollywood-reporter-welcome-to-derry",
        nameStr: "derry-thr",
        iframeUrl:
          "https://www.hollywoodreporter.com/tv/tv-news/it-prequel-welcome-to-derry-1235436560/",
        bgImg: "",
        description:
          "The Hollywood Reporter’s exclusive dives into HBO’s episode order, Pennywise flashbacks, and quotes from the producing team about practical effects.",
        tags: ["welcome", "derry", "thr", "hbo", "news"],
        updateTime: "2025-12-08",
      },
      {
        name: "stephenking-fandom-welcome-to-derry",
        nameStr: "derry-fandom",
        iframeUrl: "https://stephenking.fandom.com/wiki/Welcome_to_Derry",
        bgImg: "",
        description:
          "The Stephen King Wiki catalogues canon references, known episode titles, and lore connections fans expect the series to cover.",
        tags: ["welcome", "derry", "fandom", "stephen-king", "lore"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "zootopia-2",
    nameStr: "zootopia2",
    isHomeData: true,
    children: [
      {
        name: "zootopia-2-wikipedia",
        nameStr: "zootopia2-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/Zootopia_2",
        bgImg: "",
        description:
          "Wikipedia keeps a running list of Zootopia 2 writers, release plans, and any public comments from Disney Animation or cast members.",
        tags: ["zootopia2", "wiki", "disney", "film", "sequel"],
        updateTime: "2025-12-08",
      },
      {
        name: "whatsondisneyplus-zootopia-2",
        nameStr: "zootopia2-wodp",
        iframeUrl: "https://whatsondisneyplus.com/tag/zootopia-2/",
        bgImg: "",
        description:
          "What’s On Disney Plus aggregates every official mention of Zootopia 2, from investor-day slides to cast interviews and teaser footage.",
        tags: ["zootopia2", "disneyplus", "news", "streaming", "animation"],
        updateTime: "2025-12-08",
      },
      {
        name: "screenrant-zootopia-2",
        nameStr: "zootopia2-screenrant",
        iframeUrl: "https://screenrant.com/tag/zootopia-2/",
        bgImg: "",
        description:
          "Screen Rant’s topic page rounds up speculation on storylines, new districts in Zootopia, and returning voice talent.",
        tags: ["zootopia2", "screenrant", "rumors", "movie", "news"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "stranger-things-season5",
    nameStr: "stranger-things",
    isHomeData: true,
    children: [
      {
        name: "stranger-things-season5-wikipedia",
        nameStr: "st5-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/Stranger_Things_(season_5)",
        bgImg: "",
        description:
          "Wikipedia details the final season’s episode list, filming schedule, and confirmed directors, keeping tabs on production pauses.",
        tags: ["stranger-things", "season5", "wiki", "netflix", "tv"],
        updateTime: "2025-12-08",
      },
      {
        name: "netflix-tudum-stranger-things",
        nameStr: "st5-tudum",
        iframeUrl: "https://www.netflix.com/tudum/articles/stranger-things-season-5-guide",
        bgImg: "",
        description:
          "Netflix Tudum’s guide posts official teasers, table-read photos, and quotes from the Duffer Brothers about how the finale is structured.",
        tags: ["stranger-things", "season5", "netflix", "tudum", "insights"],
        updateTime: "2025-12-08",
      },
      {
        name: "gamesradar-stranger-things-season5",
        nameStr: "st5-gamesradar",
        iframeUrl: "https://www.gamesradar.com/stranger-things-season-5/",
        bgImg: "",
        description:
          "GamesRadar aggregates spoiler-free set reports, casting scoops, and timeline predictions for the Stranger Things finale.",
        tags: ["stranger-things", "season5", "gamesradar", "news", "tv"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "lane-kiffin",
    nameStr: "kiffin",
    isHomeData: true,
    children: [
      {
        name: "lane-kiffin-wikipedia",
        nameStr: "kiffin-wiki",
        iframeUrl: "https://en.wikipedia.org/wiki/Lane_Kiffin",
        bgImg: "",
        description:
          "Lane Kiffin’s Wikipedia profile covers every stop on his coaching tree, head-coaching record, and notable scheme changes.",
        tags: ["lane-kiffin", "wiki", "coach", "college", "football"],
        updateTime: "2025-12-08",
      },
      {
        name: "olemiss-staff-lane-kiffin",
        nameStr: "kiffin-olemiss",
        iframeUrl: "https://olemisssports.com/staff-directory/lane-kiffin/3386",
        bgImg: "",
        description:
          "Ole Miss Athletics lists Kiffin’s current responsibilities, contract milestones, and contact details inside the university directory.",
        tags: ["lane-kiffin", "ole-miss", "staff", "sec", "profile"],
        updateTime: "2025-12-08",
      },
      {
        name: "sports-reference-lane-kiffin",
        nameStr: "kiffin-stats",
        iframeUrl: "https://www.sports-reference.com/cfb/coaches/lane-kiffin-1.html",
        bgImg: "",
        description:
          "Sports Reference breaks down Kiffin’s year-by-year records, bowl appearances, and offensive rankings across his head-coaching tenure.",
        tags: ["lane-kiffin", "stats", "cfb", "records", "history"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "tiempo-de-manana",
    nameStr: "tiempo",
    isHomeData: true,
    children: [
      {
        name: "accuweather-espanol",
        nameStr: "accuweather-es",
        iframeUrl: "https://www.accuweather.com/es",
        bgImg: "",
        description:
          "AccuWeather en Español ofrece pronósticos por hora y alertas de lluvia para mañana con radar interactivo configurable por ciudad.",
        tags: ["tiempo", "manana", "accuweather", "pronostico", "clima"],
        updateTime: "2025-12-08",
      },
      {
        name: "eltiempo-es",
        nameStr: "eltiempo",
        iframeUrl: "https://www.eltiempo.es/",
        bgImg: "",
        description:
          "ElTiempo.es muestra mapas europeos, índices UV y previsiones de mañana con widgets personalizables para cualquier municipio.",
        tags: ["tiempo", "pronostico", "espana", "manana", "clima"],
        updateTime: "2025-12-08",
      },
      {
        name: "meteored-global",
        nameStr: "meteored",
        iframeUrl: "https://www.meteored.com/",
        bgImg: "",
        description:
          "Meteored (Tiempo.com) ofrece radar en tiempo real, modelos ECMWF/GFS y alertas push para planificar el clima de mañana en LATAM y España.",
        tags: ["tiempo", "meteored", "manana", "clima", "alertas"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "tvapp",
    nameStr: "tvapp",
    isHomeData: true,
    children: [
      {
        name: "apple-tv-app",
        nameStr: "apple-tv",
        iframeUrl: "https://tv.apple.com/",
        bgImg: "",
        description:
          "Apple’s TV app centralizes Apple TV+, MLS Season Pass, and channel add-ons with profiles, Up Next queues, and device syncing.",
        tags: ["tvapp", "apple", "streaming", "tv", "app"],
        updateTime: "2025-12-08",
      },
      {
        name: "youtube-tvapp",
        nameStr: "youtube-tv",
        iframeUrl: "https://tv.youtube.com/welcome/",
        bgImg: "",
        description:
          "YouTube TV’s welcome hub outlines channel lineups, multiview, 4K add-ons, and how to run the TV app on smart TVs or Chromecasts.",
        tags: ["tvapp", "youtube", "live-tv", "cloud-dvr", "streaming"],
        updateTime: "2025-12-08",
      },
      {
        name: "plex-tvapp",
        nameStr: "plex-tv",
        iframeUrl: "https://www.plex.tv/watch-free-tv/",
        bgImg: "",
        description:
          "Plex’s TV app streams free ad-supported live channels plus on-demand movies, and it can merge with your personal media server.",
        tags: ["tvapp", "plex", "fast", "streaming", "live-tv"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "ai-detection-tools",
    nameStr: "ai-detector",
    isHomeData: true,
    children: [
      {
        name: "gptzero-ai-detector",
        nameStr: "gptzero",
        iframeUrl: "https://gptzero.me/",
        bgImg: "",
        description:
          "GPTZero analyzes burstiness and perplexity to label AI-generated essays, offering batch uploads and LMS integrations.",
        tags: ["ai-detector", "gptzero", "plagiarism", "education", "tool"],
        updateTime: "2025-12-08",
      },
      {
        name: "zerogpt-ai-checker",
        nameStr: "zerogpt",
        iframeUrl: "https://www.zerogpt.com/",
        bgImg: "",
        description:
          "ZeroGPT supports 50+ languages, highlighting suspicious sentences and exporting reports useful for compliance teams.",
        tags: ["ai-checker", "zerogpt", "content", "compliance", "tool"],
        updateTime: "2025-12-08",
      },
      {
        name: "content-at-scale-ai-detector",
        nameStr: "contentatscale",
        iframeUrl: "https://contentatscale.ai/ai-content-detector/",
        bgImg: "",
        description:
          "Content at Scale’s detector scores text against multiple LLM fingerprints and provides rewrite suggestions to improve human tone.",
        tags: ["ai-detector", "content", "scale", "rewrites", "tool"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "eagles-vs-cowboys",
    nameStr: "eagles-cowboys",
    isHomeData: true,
    children: [
      {
        name: "statmuse-eagles-cowboys-record",
        nameStr: "statmuse-rivalry",
        iframeUrl: "https://www.statmuse.com/nfl/ask?q=eagles+vs+cowboys+record",
        bgImg: "",
        description:
          "Statmuse generates instant head-to-head charts, margins, and season splits for every Eagles vs. Cowboys meeting.",
        tags: ["eagles", "cowboys", "statmuse", "record", "rivalry"],
        updateTime: "2025-12-08",
      },
      {
        name: "pfr-eagles-cowboys-history",
        nameStr: "pfr-rivalry",
        iframeUrl:
          "https://www.pro-football-reference.com/boxscores/game_query.cgi?tm1=dal&tm2=phi&yr=all",
        bgImg: "",
        description:
          "Pro Football Reference lists every box score between Dallas and Philadelphia with filters for playoffs, primetime, or location.",
        tags: ["eagles", "cowboys", "pfr", "history", "stats"],
        updateTime: "2025-12-08",
      },
      {
        name: "nfl-eagles-cowboys-highlights",
        nameStr: "nfl-highlights",
        iframeUrl: "https://www.nfl.com/videos/eagles-vs-cowboys-highlights",
        bgImg: "",
        description:
          "NFL.com’s highlight hub hosts condensed games, Mic’d Up clips, and analysis packages from the rivalry’s most recent matchups.",
        tags: ["eagles", "cowboys", "nfl", "highlights", "video"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "google-doc",
    nameStr: "google-doc",
    isHomeData: true,
    children: [
      {
        name: "google-docs-product",
        nameStr: "docs-product",
        iframeUrl: "https://workspace.google.com/products/docs/",
        bgImg: "",
        description:
          "Google Workspace’s Docs page explains templates, smart chips, and collaboration controls for enterprise rollouts.",
        tags: ["google-docs", "workspace", "product", "collaboration", "suite"],
        updateTime: "2025-12-08",
      },
      {
        name: "google-docs-support",
        nameStr: "docs-support",
        iframeUrl: "https://support.google.com/docs/",
        bgImg: "",
        description:
          "The Docs Help Center provides troubleshooting guides, keyboard shortcuts, and rollout notes for new editor features.",
        tags: ["google-docs", "support", "help", "guides", "faq"],
        updateTime: "2025-12-08",
      },
      {
        name: "google-docs-api",
        nameStr: "docs-api",
        iframeUrl: "https://developers.google.com/docs/api",
        bgImg: "",
        description:
          "Developers.google.com documents REST endpoints for generating, editing, and merging Docs programmatically with OAuth scopes.",
        tags: ["google-docs", "api", "developers", "automation", "cloud"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "notre-dame-football",
    nameStr: "notre-dame",
    isHomeData: true,
    children: [
      {
        name: "fighting-irish-football",
        nameStr: "fightingirish",
        iframeUrl: "https://fightingirish.com/sports/football/",
        bgImg: "",
        description:
          "Notre Dame’s official site posts schedules, Marcus Freeman pressers, depth charts, and NBC broadcast links.",
        tags: ["notre-dame", "football", "official", "schedule", "news"],
        updateTime: "2025-12-08",
      },
      {
        name: "espn-notre-dame-team",
        nameStr: "notre-dame-espn",
        iframeUrl: "https://www.espn.com/college-football/team/_/id/87/notre-dame-fighting-irish",
        bgImg: "",
        description:
          "ESPN’s team hub features statistics, game-by-game recaps, and FPI projections for the Fighting Irish.",
        tags: ["notre-dame", "espn", "stats", "schedule", "cfb"],
        updateTime: "2025-12-08",
      },
      {
        name: "247sports-notre-dame",
        nameStr: "notre-dame-247",
        iframeUrl: "https://247sports.com/college/notre-dame/",
        bgImg: "",
        description:
          "247Sports blends recruiting intel, transfer portal trackers, and premium analysis for Notre Dame football fans.",
        tags: ["notre-dame", "247sports", "recruiting", "analysis", "cfb"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "ohio-state-football",
    nameStr: "ohio-state",
    isHomeData: true,
    children: [
      {
        name: "buckeyes-official-football",
        nameStr: "buckeyes-official",
        iframeUrl: "https://ohiostatebuckeyes.com/sports/m-footbl/",
        bgImg: "",
        description:
          "Ohio State’s athletics site features Ryan Day press conferences, roster bios, and Scarlet & Gray ticket info.",
        tags: ["ohio-state", "football", "official", "schedule", "news"],
        updateTime: "2025-12-08",
      },
      {
        name: "espn-ohio-state-team",
        nameStr: "ohio-state-espn",
        iframeUrl: "https://www.espn.com/college-football/team/_/id/194/ohio-state-buckeyes",
        bgImg: "",
        description:
          "ESPN’s Buckeyes page tracks standings, injury reports, and live win probabilities for every matchup.",
        tags: ["ohio-state", "espn", "stats", "schedule", "cfb"],
        updateTime: "2025-12-08",
      },
      {
        name: "elevenwarriors-ohio-state",
        nameStr: "elevenwarriors",
        iframeUrl: "https://www.elevenwarriors.com/",
        bgImg: "",
        description:
          "Eleven Warriors provides daily Ohio State analysis, film rooms, recruiting scoops, and rapid game reactions.",
        tags: ["ohio-state", "blog", "analysis", "recruiting", "fans"],
        updateTime: "2025-12-08",
      },
    ],
  },
  {
    name: "leading-frontend-frameworks",
    nameStr: "leading",
    isHomeData: true,
    children: [
      {
        name: "vue-progressive-js-framework",
        nameStr: "vue",
        iframeUrl: "https://vuejs.org/",
        bgImg: "",
        description:
          "Vue.js is a progressive framework for building user interfaces with a gentle learning curve, reactive core, and flexible ecosystem for tooling and routing.",
        tags: ["vue", "progressive", "js", "framework", "tool"],
        updateTime: "2025-09-15",
      },
      {
        name: "react-ui-component-library",
        nameStr: "react",
        iframeUrl: "https://react.dev/",
        bgImg: "",
        description:
          "React is Meta’s declarative library for building component-driven UIs with hooks, concurrent rendering, and a vast community ecosystem.",
        tags: ["react", "ui", "component", "library", "tool"],
        updateTime: "2025-09-12",
      },
      {
        name: "angular-typescript-web-framework",
        nameStr: "angular",
        iframeUrl: "https://angular.io/",
        bgImg: "",
        description:
          "Angular is Google’s full-featured framework with TypeScript-first tooling, RxJS-powered reactivity, and enterprise-ready CLI workflows.",
        tags: ["angular", "typescript", "web", "framework", "tool"],
        updateTime: "2025-09-10",
      },
      {
        name: "svelte-compiler-first-framework",
        nameStr: "svelte",
        iframeUrl: "https://svelte.dev/",
        bgImg: "",
        description:
          "Svelte is a compiler-driven framework that turns declarative components into tiny vanilla JS bundles with zero runtime overhead.",
        tags: ["svelte", "compiler", "first", "framework", "tool"],
        updateTime: "2025-09-08",
      },
      {
        name: "nextjs-production-react-framework",
        nameStr: "nextjs",
        iframeUrl: "https://nextjs.org/",
        bgImg: "",
        description:
          "Next.js is a React meta-framework by Vercel that unifies SSR, static generation, app routing, and edge rendering with built-in performance optimizations.",
        tags: ["nextjs", "production", "react", "framework", "tool"],
        updateTime: "2025-09-05",
      },
    ],
  },
  {
    name: "best-backend-api-frameworks",
    nameStr: "best",
    isHomeData: true,
    children: [
      {
        name: "spring-initializr-boot-generator",
        nameStr: "spring",
        iframeUrl: "https://start.spring.io/",
        bgImg: "",
        description:
          "Spring Initializr is the official Spring Boot project generator that scaffolds Maven or Gradle services with the right starters, metadata, and packaging in seconds.",
        tags: ["spring", "initializr", "boot", "generator", "tool"],
        updateTime: "2025-11-30",
      },
      {
        name: "laravel-elegant-php-framework",
        nameStr: "laravel",
        iframeUrl: "https://laravel.com/",
        bgImg: "",
        description:
          "Laravel is an elegant PHP framework featuring Blade, Eloquent, queues, and Octane-ready tooling for modern backend and SaaS workloads.",
        tags: ["laravel", "elegant", "php", "framework", "tool"],
        updateTime: "2025-11-27",
      },
      {
        name: "fastapi-python-api-framework",
        nameStr: "fastapi",
        iframeUrl: "https://fastapi.tiangolo.com/",
        bgImg: "",
        description:
          "FastAPI is an async-first Python framework powered by type hints, automatic OpenAPI docs, and blazing performance on Uvicorn or Hypercorn.",
        tags: ["fastapi", "python", "api", "framework", "tool"],
        updateTime: "2025-11-26",
      },
      {
        name: "nestjs-typescript-backend-framework",
        nameStr: "nestjs",
        iframeUrl: "https://nestjs.com/",
        bgImg: "",
        description:
          "NestJS is a TypeScript-first Node.js framework that combines Angular-style modules with Express or Fastify under the hood for enterprise APIs.",
        tags: ["nestjs", "typescript", "backend", "framework", "tool"],
        updateTime: "2025-11-25",
      },
      {
        name: "expressjs-node-api-framework",
        nameStr: "expressjs",
        iframeUrl: "https://expressjs.com/",
        bgImg: "",
        description:
          "Express.js is a minimalist Node.js framework that powers countless REST APIs with middleware-driven routing, generators, and a massive plugin ecosystem.",
        tags: ["expressjs", "node", "api", "framework", "tool"],
        updateTime: "2025-11-24",
      },
    ],
  },
  {
    name: "top-ev-new-energy-brands",
    nameStr: "top-ev",
    isHomeData: true,
    children: [
      {
        name: "zeekr-premium-electric-vehicles",
        nameStr: "zeekr",
        iframeUrl: "https://www.zeekr.com/",
        bgImg: "",
        description:
          "Zeekr is Geely’s premium EV marque that builds SEA-platform fastbacks and SUVs, shipping OTA software globally from Ningbo.",
        tags: ["zeekr", "premium", "electric", "vehicles", "tool"],
        updateTime: "2025-11-24",
      },
      {
        name: "neta-auto-new-energy-vehicles",
        nameStr: "neta",
        iframeUrl: "https://www.hozonauto.com/",
        bgImg: "",
        description:
          "Neta Auto is Hozon’s EV brand covering A0 to B-class crossovers with in-house chips and assisted driving technology.",
        tags: ["neta", "auto", "new", "energy", "vehicles"],
        updateTime: "2025-11-23",
      },
      {
        name: "voyah-luxury-electric-brand",
        nameStr: "voyah",
        iframeUrl: "https://www.voyah.com/",
        bgImg: "",
        description:
          "VOYAH is Dongfeng’s luxury EV sub-brand delivering the Free SUV and Dreamer MPV with ESSA architecture and battery swap technology.",
        tags: ["voyah", "luxury", "electric", "brand", "tool"],
        updateTime: "2025-11-22",
      },
      {
        name: "gwm-electric-vehicle-lineup",
        nameStr: "gwm",
        iframeUrl: "https://www.gwm.com.cn/",
        bgImg: "",
        description:
          "GWM New Energy is Great Wall Motor’s NEV portfolio spanning ORA city cars to Wey hybrids, backed by Coffee OS and L2+ driving stacks.",
        tags: ["gwm", "electric", "vehicle", "lineup", "tool"],
        updateTime: "2025-11-21",
      },
      {
        name: "seres-auto-huawei-evs",
        nameStr: "seres",
        iframeUrl: "https://www.seres.cn/",
        bgImg: "",
        description:
          "Seres Auto is a Chongqing-based brand building AITO co-branded range extenders with Huawei’s HarmonyOS cockpit and ADS 2.0.",
        tags: ["seres", "auto", "huawei", "evs", "tool"],
        updateTime: "2025-11-20",
      },
    ],
  },
  {
    name: "fortune-global-500-leaders",
    nameStr: "fortune",
    isHomeData: true,
    children: [
      {
        name: "walmart-global-retail-leader",
        nameStr: "walmart",
        iframeUrl: "https://companiesmarketcap.com/walmart/marketcap/",
        bgImg: "",
        description:
          "Walmart is the Fortune #1 retailer with global supply chains, automation pilots, and $600B+ in annual revenue.",
        tags: ["walmart", "global", "retail", "leader", "tool"],
        updateTime: "2025-11-19",
      },
      {
        name: "saudi-aramco-energy-giant",
        nameStr: "saudi",
        iframeUrl: "https://companiesmarketcap.com/saudi-aramco/marketcap/",
        bgImg: "",
        description:
          "Saudi Aramco is an energy giant overseeing upstream and downstream oil, gas, and chemicals with giga-scale capital programs.",
        tags: ["saudi", "aramco", "energy", "giant", "tool"],
        updateTime: "2025-11-18",
      },
      {
        name: "amazon-ecommerce-cloud-powerhouse",
        nameStr: "amazon-ecommerce",
        iframeUrl: "https://companiesmarketcap.com/amazon/marketcap/",
        bgImg: "",
        description:
          "Amazon is an e-commerce and cloud conglomerate spanning AWS, Prime, logistics robotics, and global digital advertising.",
        tags: ["amazon", "ecommerce", "cloud", "powerhouse", "tool"],
        updateTime: "2025-11-16",
      },
      {
        name: "apple-consumer-electronics-leader",
        nameStr: "apple",
        iframeUrl: "https://companiesmarketcap.com/apple/marketcap/",
        bgImg: "",
        description:
          "Apple is a consumer electronics leader whose services, silicon, and devices keep it atop the profitability charts.",
        tags: ["apple", "consumer", "electronics", "leader", "tool"],
        updateTime: "2025-11-15",
      },
      {
        name: "exxonmobil-integrated-energy-major",
        nameStr: "exxonmobil",
        iframeUrl: "https://companiesmarketcap.com/exxon-mobil/marketcap/",
        bgImg: "",
        description:
          "Exxon Mobil is an integrated oil major accelerating low-carbon ventures while running one of the world’s largest downstream networks.",
        tags: ["exxonmobil", "integrated", "energy", "major", "tool"],
        updateTime: "2025-11-14",
      },
    ],
  },
  {
    name: "free-online-file-converters",
    nameStr: "free",
    isHomeData: true,
    children: [
      {
        name: "aconvert-multi-format-converter",
        nameStr: "aconvert",
        iframeUrl: "https://www.aconvert.com/",
        bgImg: "",
        description:
          "Aconvert is a utility hub for converting documents, ebooks, audio, archives, and media with queue-based processing.",
        tags: ["aconvert", "multi", "format", "converter", "tool"],
        updateTime: "2025-11-14",
      },
      {
        name: "freefileconvert-online-converter",
        nameStr: "freefileconvert",
        iframeUrl: "https://www.freefileconvert.com/",
        bgImg: "",
        description:
          "Free File Convert handles 8,000+ format combinations with asynchronous jobs and email reminders for finished tasks.",
        tags: ["freefileconvert", "online", "converter", "tool", "platform"],
        updateTime: "2025-11-13",
      },
      {
        name: "filesconversion-simple-format-tool",
        nameStr: "filesconversion",
        iframeUrl: "https://www.files-conversion.com/",
        bgImg: "",
        description:
          "Files-Conversion is a simple converter that turns videos, audio, images, and documents into popular targets without size-locked paywalls.",
        tags: ["filesconversion", "simple", "format", "tool", "platform"],
        updateTime: "2025-11-12",
      },
      {
        name: "docspal-legacy-modern-converter",
        nameStr: "docspal",
        iframeUrl: "https://www.docspal.com/",
        bgImg: "",
        description:
          "DocsPal is a legacy-friendly converter that keeps old office, ebook, and archive formats alive with preview and share links.",
        tags: ["docspal", "legacy", "modern", "converter", "tool"],
        updateTime: "2025-11-11",
      },
      {
        name: "online-utility-file-toolkit",
        nameStr: "online",
        iframeUrl: "https://www.online-utility.org/file/converter.jsp",
        bgImg: "",
        description:
          "Online Utility is a lightweight toolkit converting office files to PDF/HTML/Text and offering checksum plus compression helpers.",
        tags: ["online", "utility", "file", "toolkit", "tool"],
        updateTime: "2025-11-10",
      },
    ],
  },
  {
    name: "online-image-conversion-tools",
    nameStr: "online-image",
    isHomeData: true,
    children: [
      {
        name: "iloveimg-bulk-image-editor",
        nameStr: "iloveimg",
        iframeUrl: "https://www.iloveimg.com/",
        bgImg: "",
        description:
          "iLoveIMG is a simple online suite for converting, resizing, and compressing images in bulk with queue-based downloads.",
        tags: ["iloveimg", "bulk", "image", "editor", "tool"],
        updateTime: "2025-11-09",
      },
      {
        name: "imagetopdf-image-pdf-converter",
        nameStr: "imagetopdf",
        iframeUrl: "https://imagetopdf.com/",
        bgImg: "",
        description:
          "ImageToPDF is a micro tool that stitches JPG, PNG, and HEIC assets into a PDF with adjustable page margins and orientation.",
        tags: ["imagetopdf", "image", "pdf", "converter", "tool"],
        updateTime: "2025-11-08",
      },
      {
        name: "photopea-browser-image-editor",
        nameStr: "photopea",
        iframeUrl: "https://www.photopea.com/",
        bgImg: "",
        description:
          "Photopea is a browser-based editor that opens PSD, XD, Sketch, and RAW files for quick format conversions or exports.",
        tags: ["photopea", "browser", "image", "editor", "tool"],
        updateTime: "2025-11-07",
      },
      {
        name: "convert-town-png-jpg",
        nameStr: "convert",
        iframeUrl: "https://convert.town/png-to-jpg",
        bgImg: "",
        description:
          "Convert Town is a single-purpose converter that flips PNG transparency to JPG or vice versa with adjustable quality sliders.",
        tags: ["convert", "town", "png", "jpg", "tool"],
        updateTime: "2025-11-06",
      },
      {
        name: "online-image-tool-converter",
        nameStr: "online-image-tool",
        iframeUrl: "https://www.onlineimagetool.com/",
        bgImg: "",
        description:
          "Online Image Tool is a collection of converters for WEBP, AVIF, ICO, and sprite sheets with batch resizing and compression presets.",
        tags: ["online", "image", "tool", "converter", "platform"],
        updateTime: "2025-11-05",
      },
    ],
  },
  {
    name: "fortune-china-500-top50",
    nameStr: "fortune-china",
    isHomeData: true,
    children: [
      {
        name: "sinopec-group-energy-giant",
        nameStr: "sinopec",
        iframeUrl: "https://www.sinopecgroup.com/",
        bgImg: "",
        description:
          "Sinopec is China's largest integrated energy and chemical conglomerate, spanning exploration, refining, fuel retail, and hydrogen projects.",
        tags: ["sinopec", "group", "energy", "giant", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "state-grid-power-backbone",
        nameStr: "state",
        iframeUrl: "https://www.sgcc.com.cn/",
        bgImg: "",
        description:
          "State Grid operates 26 provincial power markets, managing ultra-high-volnameStre transmission and smart distribution networks as China's energy backbone.",
        tags: ["state", "grid", "power", "backbone", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "petrochina-upstream-downstream",
        nameStr: "petrochina",
        iframeUrl: "https://www.petrochina.com.cn/",
        bgImg: "",
        description:
          "PetroChina leverages domestic fields and overseas assets to run an integrated system covering upstream exploration, pipelines, petrochemicals, and new energy.",
        tags: ["petrochina", "upstream", "downstream", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cscec-global-engineering",
        nameStr: "cscec",
        iframeUrl: "https://www.cscec.com/",
        bgImg: "",
        description:
          "China State Construction builds supertall towers, transit systems, and housing worldwide with EPC contracting plus financing capabilities.",
        tags: ["cscec", "global", "engineering", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "icbc-leading-commercial-bank",
        nameStr: "icbc",
        iframeUrl: "https://www.icbc.com.cn/",
        bgImg: "",
        description:
          "ICBC ranks among the world's biggest banks by assets, offering corporate banking, retail banking, markets, and cross-border services.",
        tags: ["icbc", "leading", "commercial", "bank", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "ccb-housing-finance-leader",
        nameStr: "ccb",
        iframeUrl: "https://www.ccb.com/",
        bgImg: "",
        description:
          "China Construction Bank uses fintech and housing finance strengths to serve infrastructure, inclusive finance, and small-business clients.",
        tags: ["ccb", "housing", "finance", "leader", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "abc-rural-finance-anchor",
        nameStr: "abc",
        iframeUrl: "https://www.abchina.com/",
        bgImg: "",
        description:
          "Agricultural Bank of China focuses on rural revitalization, county economies, and urban residents while investing in digital and green finance.",
        tags: ["abc", "rural", "finance", "anchor", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "boc-global-clearing-bank",
        nameStr: "boc",
        iframeUrl: "https://www.boc.cn/",
        bgImg: "",
        description:
          "Bank of China is the country's oldest lender with global branches and multi-currency clearing expertise.",
        tags: ["boc", "global", "clearing", "bank", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "pingan-finance-ecosystem",
        nameStr: "pingan",
        iframeUrl: "https://www.pingan.cn/",
        bgImg: "",
        description:
          "Ping An combines insurance, banking, and health tech to deliver a Financial+Ecosystem model for comprehensive services.",
        tags: ["pingan", "finance", "ecosystem", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "crec-railway-contractor",
        nameStr: "crec",
        iframeUrl: "https://www.crecg.com/",
        bgImg: "",
        description:
          "China Railway Group builds railways, highways, and underground projects with full-chain construction and equipment capabilities.",
        tags: ["crec", "railway", "contractor", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "crcc-infrastructure-builder",
        nameStr: "crcc",
        iframeUrl: "https://www.crcc.cn/",
        bgImg: "",
        description:
          "China Railway Construction Corporation drives engineering, transport investment, and equipment manufacturing across Asia, Africa, and Latin America.",
        tags: ["crcc", "infrastructure", "builder", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cnooc-offshore-energy",
        nameStr: "cnooc",
        iframeUrl: "https://www.cnooc.com.cn/",
        bgImg: "",
        description:
          "CNOOC manages deepwater oil and gas, LNG terminals, and offshore wind assets across multiple energy scenarios.",
        tags: ["cnooc", "offshore", "energy", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-mobile-5g-leader",
        nameStr: "china",
        iframeUrl: "https://www.10086.cn/",
        bgImg: "",
        description:
          "China Mobile leads in 5G, compute-network convergence, and enterprise services while serving the world's largest subscriber base.",
        tags: ["china", "mobile", "leader", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "saicmotor-auto-innovation",
        nameStr: "saicmotor",
        iframeUrl: "https://www.saicmotor.com/",
        bgImg: "",
        description:
          "SAIC Motor runs Roewe, MG, and joint ventures with VW and GM while accelerating new energy and autonomous driving.",
        tags: ["saicmotor", "auto", "innovation", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "baowu-steel-green-transition",
        nameStr: "baowu",
        iframeUrl: "https://www.baowugroup.com/",
        bgImg: "",
        description:
          "China Baowu is the world's largest crude steel producer, advancing low-carbon metallurgy and smart green factories.",
        tags: ["baowu", "steel", "green", "transition", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-life-insurance-network",
        nameStr: "china-life",
        iframeUrl: "https://www.chinalife.com.cn/",
        bgImg: "",
        description:
          "China Life specializes in life, annuity, and health management with a nationwide insurance network.",
        tags: ["china", "life", "insurance", "network", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-resources-diversified",
        nameStr: "china-resources",
        iframeUrl: "https://www.crc.com.hk/",
        bgImg: "",
        description:
          "China Resources spans consumer goods, energy, power, pharma, and urban development as a diversified state-owned platform.",
        tags: ["china", "resources", "diversified", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "jd-supply-chain-technology",
        nameStr: "jd",
        iframeUrl: "https://corporate.jd.com/",
        bgImg: "",
        description:
          "JD.com leverages supply chain technology to deliver retail, logistics, cloud, and industrial digital solutions.",
        tags: ["jd", "supply", "chain", "technology", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "cmb-wealth-management",
        nameStr: "cmb",
        iframeUrl: "https://www.cmbchina.com/",
        bgImg: "",
        description:
          "China Merchants Bank is known for retail finance, wealth management, and fintech, earning the title of the retail banking benchmark.",
        tags: ["cmb", "wealth", "management", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-telecom-cloud-network",
        nameStr: "china-telecom",
        iframeUrl: "https://www.chinatelecom.com.cn/",
        bgImg: "",
        description:
          "China Telecom advances cloud-network convergence and satellite communications to build secure digital infrastructure.",
        tags: ["china", "telecom", "cloud", "network", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "alibaba-digital-commerce",
        nameStr: "alibaba",
        iframeUrl: "https://www.alibabagroup.com/",
        bgImg: "",
        description:
          "Alibaba builds a digital business operating system covering e-commerce, cloud computing, local services, and global ventures.",
        tags: ["alibaba", "digital", "commerce", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-minmetals-resource",
        nameStr: "china-minmetals",
        iframeUrl: "https://www.minmetals.com.cn/",
        bgImg: "",
        description:
          "China Minmetals integrates resource development, metals trading, and new materials manufacturing to secure critical minerals.",
        tags: ["china", "minmetals", "resource", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cccc-transport-infrastructure",
        nameStr: "cccc",
        iframeUrl: "https://www.ccccltd.cn/",
        bgImg: "",
        description:
          "CCCC delivers global transport infrastructure, dredging, and equipment projects with end-to-end capabilities.",
        tags: ["cccc", "transport", "infrastructure", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "citic-diversified-holding",
        nameStr: "citic",
        iframeUrl: "https://www.citic.com/",
        bgImg: "",
        description:
          "CITIC spans finance, advanced manufacturing, resources, and consumption while driving industrial upgrades and synergies.",
        tags: ["citic", "diversified", "holding", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-unicom-digital-infra",
        nameStr: "china-unicom",
        iframeUrl: "https://www.chinaunicom.com/",
        bgImg: "",
        description:
          "China Unicom focuses on digital infrastructure and the industrial internet to deliver an integrated computing-network service.",
        tags: ["china", "unicom", "digital", "infra", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-post-group-services",
        nameStr: "china-post",
        iframeUrl: "https://www.chinapost.com.cn/",
        bgImg: "",
        description:
          "China Post provides nationwide postal, logistics, and financial services, fulfilling universal service and government delivery.",
        tags: ["china", "post", "group", "services", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "cofco-global-grain",
        nameStr: "cofco",
        iframeUrl: "https://www.cofco.com/",
        bgImg: "",
        description:
          "COFCO manages global grain procurement, processing, and food manufacturing to protect national food security.",
        tags: ["cofco", "global", "grain", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "everbright-financial-holding",
        nameStr: "everbright",
        iframeUrl: "https://www.cegroup.com.cn/",
        bgImg: "",
        description:
          "China Everbright builds a Large Wealth, Large Assets, and Large Environment platform linking banking, securities, and trusts.",
        tags: ["everbright", "financial", "holding", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "csg-power-grid",
        nameStr: "csg",
        iframeUrl: "https://www.csg.cn/",
        bgImg: "",
        description:
          "China Southern Power Grid operates electricity markets across five southern provinces, enabling cross-border links and renewable integration.",
        tags: ["csg", "power", "grid", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cnbm-new-materials",
        nameStr: "cnbm",
        iframeUrl: "https://www.cnbm.com.cn/",
        bgImg: "",
        description:
          "CNBM leads in new building materials, engineering services, and aggregates while pushing greener materials.",
        tags: ["cnbm", "new", "materials", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "powerchina-engineering-group",
        nameStr: "powerchina",
        iframeUrl: "https://www.powerchina.cn/",
        bgImg: "",
        description:
          "PowerChina combines power, water, rail, and new energy engineering surveys, design, and construction under one roof.",
        tags: ["powerchina", "engineering", "group", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "ceec-energy-engineering",
        nameStr: "ceec",
        iframeUrl: "https://www.ceec.net.cn/",
        bgImg: "",
        description:
          "Energy China covers energy planning, construction, and operations while developing storage and hydrogen projects.",
        tags: ["ceec", "energy", "engineering", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cnnc-nuclear-industry",
        nameStr: "cnnc",
        iframeUrl: "https://www.cnnc.com.cn/",
        bgImg: "",
        description:
          "CNNC controls the full value chain for nuclear fuel, plant construction, and back-end processing.",
        tags: ["cnnc", "nuclear", "industry", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cgn-clean-energy",
        nameStr: "cgn",
        iframeUrl: "https://www.cgnpc.com.cn/",
        bgImg: "",
        description:
          "CGN expands in nuclear power, fuel, renewable energy, and nuclear technology applications.",
        tags: ["cgn", "clean", "energy", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "avic-aviation-manufacturer",
        nameStr: "avic",
        iframeUrl: "https://www.avic.com/",
        bgImg: "",
        description:
          "AVIC develops and manufactures military and civil aircraft while investing in general aviation services.",
        tags: ["avic", "aviation", "manufacturer", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-eastern-airlines",
        nameStr: "china-eastern",
        iframeUrl: "https://www.ceair.com/",
        bgImg: "",
        description:
          "China Eastern Airlines is one of three state carriers, running a Shanghai hub with a global route network.",
        tags: ["china", "eastern", "airlines", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "china-southern-airlines",
        nameStr: "china-southern",
        iframeUrl: "https://www.csair.com/",
        bgImg: "",
        description:
          "China Southern Airlines fields one of Asia's largest fleets, strengthening the Guangzhou-Shenzhen dual hub and international routes.",
        tags: ["china", "southern", "airlines", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "air-china-flag-carrier",
        nameStr: "air",
        iframeUrl: "https://www.airchina.com.cn/",
        bgImg: "",
        description:
          "Air China operates the national flag carrier, handling state missions and flagship international flights.",
        tags: ["air", "china", "flag", "carrier", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "industrial-bank-green-finance",
        nameStr: "industrial",
        iframeUrl: "https://www.cib.com.cn/",
        bgImg: "",
        description:
          "Industrial Bank excels in green finance, interbank services, and asset management innovation.",
        tags: ["industrial", "bank", "green", "finance", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "bank-of-communications",
        nameStr: "bank",
        iframeUrl: "https://www.bankcomm.com/",
        bgImg: "",
        description:
          "Bank of Communications is one of China's earliest nationwide banks with business across five continents.",
        tags: ["bank", "of", "communications", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "psbc-inclusive-finance",
        nameStr: "psbc",
        iframeUrl: "https://www.psbc.com/",
        bgImg: "",
        description:
          "Postal Savings Bank of China uses postal outlets to serve counties, inclusive finance, and more than 600 million retail customers.",
        tags: ["psbc", "inclusive", "finance", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "cpic-insurance-services",
        nameStr: "cpic",
        iframeUrl: "https://www.cpic.com.cn/",
        bgImg: "",
        description:
          "China Pacific Insurance offers property, life, and health coverage through its signature CPIC Service experience.",
        tags: ["cpic", "insurance", "services", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "xiaomi-smart-ecosystem",
        nameStr: "xiaomi",
        iframeUrl: "https://www.mi.com/",
        bgImg: "",
        description:
          "Xiaomi fuses smartphones, IoT, and smart manufacturing to build a human-car-home ecosystem.",
        tags: ["xiaomi", "smart", "ecosystem", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "byd-new-energy",
        nameStr: "byd",
        iframeUrl: "https://www.byd.com/",
        bgImg: "",
        description:
          "BYD leads in new energy vehicles and batteries, delivering BEVs, plug-in hybrids, and global exports.",
        tags: ["byd", "new", "energy", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "tencent-digital-ecosystem",
        nameStr: "tencent",
        iframeUrl: "https://www.tencent.com/",
        bgImg: "",
        description:
          "Tencent powers digital life and the industrial internet with social platforms, content, fintech, and cloud computing.",
        tags: ["tencent", "digital", "ecosystem", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "midea-smart-manufacturing",
        nameStr: "midea",
        iframeUrl: "https://www.midea.com/",
        bgImg: "",
        description:
          "Midea extends from home appliances into building technologies, robotics, and industrial automation.",
        tags: ["midea", "smart", "manufacturing", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "gree-intelligent-equipment",
        nameStr: "gree",
        iframeUrl: "https://www.gree.com/",
        bgImg: "",
        description:
          "Gree leverages air-conditioning expertise while expanding into smart equipment and new energy.",
        tags: ["gree", "intelligent", "equipment", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "haier-smart-home",
        nameStr: "haier",
        iframeUrl: "https://www.haier.com/",
        bgImg: "",
        description:
          "Haier Smart Home created the Three-Winged Bird scenario brand to deliver a connected global appliance ecosystem.",
        tags: ["haier", "smart", "home", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "shougang-urban-renewal",
        nameStr: "shougang",
        iframeUrl: "https://www.shougang.com.cn/",
        bgImg: "",
        description:
          "Shougang invests in steel, urban services, and industrial parks to upgrade Beijing's industries.",
        tags: ["shougang", "urban", "renewal", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "yili-dairy-leader",
        nameStr: "yili",
        iframeUrl: "https://www.yili.com/",
        bgImg: "",
        description:
          "Yili is Asia's dairy leader, covering liquid milk, ice cream, milk powder, and health foods.",
        tags: ["yili", "dairy", "leader", "tool", "platform"],
        updateTime: "2025-12-05",
      },
    ],
  },
  {
    name: "image-compression-tools",
    nameStr: "image",
    isHomeData: true,
    children: [
      {
        name: "tinypng-smart-image-compression",
        nameStr: "tinypng",
        iframeUrl: "https://tinypng.com/",
        bgImg: "",
        description:
          "TinyPNG compresses PNG and JPG files with smart color quantization so you can shrink transparent assets in bulk while keeping clarity.",
        tags: ["tinypng", "smart", "image", "compression", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "compressjpeg-batch-photo-tool",
        nameStr: "compressjpeg",
        iframeUrl: "https://compressjpeg.com/",
        bgImg: "",
        description:
          "CompressJPEG lets you drop 20 images at a time, auto-detects JPG/PNG/WEBP formats, and exports zipped downloads with adjustable quality levels.",
        tags: ["compressjpeg", "batch", "photo", "tool", "platform"],
        updateTime: "2025-12-05",
      },
      {
        name: "squoosh-google-image-optimizer",
        nameStr: "squoosh",
        iframeUrl: "https://squoosh.app/",
        bgImg: "",
        description:
          "Squoosh is Google’s open-source web app for tweaking AVIF, MozJPEG, and WebP encoders with live side-by-side previews and granular compression sliders.",
        tags: ["squoosh", "google", "image", "optimizer", "tool"],
        updateTime: "2025-12-05",
      },
      {
        name: "kraken-io-lossy-image-optimizer",
        nameStr: "kraken",
        iframeUrl: "https://kraken.io/web-interface",
        bgImg: "",
        description:
          "Kraken.io Web Interface offers high-speed lossy or lossless optimization for JPG, PNG, and animated GIF uploads with instant CDN-ready download links.",
        tags: ["kraken", "io", "lossy", "image", "optimizer"],
        updateTime: "2025-12-05",
      },
      {
        name: "tinywow-image-compressor",
        nameStr: "tinywow",
        iframeUrl: "https://tinywow.com/tool/image-compressor",
        bgImg: "",
        description:
          "TinyWow Image Compressor combines drag-and-drop uploads, clipboard pasting, and cloud cleanup to shrink JPG, PNG, and WEBP files without sign-ups.",
        tags: ["tinywow", "image", "compressor", "tool", "platform"],
        updateTime: "2025-12-05",
      },
    ],
  },
  {
    name: "youtube-growth-tools",
    nameStr: "youtube",
    isHomeData: true,
    children: [
      {
        name: "tubebuddy-youtube-seo",
        nameStr: "tubebuddy",
        iframeUrl: "https://www.tubebuddy.com/",
        bgImg: "",
        description:
          "TubeBuddy is a certified browser extension that streamlines keyword research, A/B tests, and bulk metadata edits for YouTube channels.",
        tags: ["tubebuddy", "youtube", "seo", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "vidiq-channel-analytics",
        nameStr: "vidiq",
        iframeUrl: "https://vidiq.com/",
        bgImg: "",
        description:
          "vidIQ surfaces trending topics, SEO scores, and AI idea prompts so creators can optimize titles, thumbnails, and upload calendars.",
        tags: ["vidiq", "channel", "analytics", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "canva-youtube-thumbnail-maker",
        nameStr: "canva",
        iframeUrl: "https://www.canva.com/create/youtube-thumbnails/",
        bgImg: "",
        description:
          "Canva’s YouTube thumbnail maker ships ready-made layouts, brand kits, and AI image tools for fast, on-brand cover art.",
        tags: ["canva", "youtube", "thumbnail", "maker", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "epidemic-sound-youtube-music",
        nameStr: "epidemic",
        iframeUrl: "https://www.epidemicsound.com/",
        bgImg: "",
        description:
          "Epidemic Sound licenses royalty-free tracks and sound effects cleared for monetized YouTube uploads with direct channel linking.",
        tags: ["epidemic", "sound", "youtube", "music", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "socialblade-youtube-stats",
        nameStr: "socialblade",
        iframeUrl: "https://socialblade.com/youtube",
        bgImg: "",
        description:
          "Social Blade tracks subscriber velocity, estimated earnings, and competitor benchmarks for any public YouTube channel.",
        tags: ["socialblade", "youtube", "stats", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "2025-trend-reports",
    nameStr: "trend",
    isHomeData: true,
    children: [
      {
        name: "gartner-2025-tech-trends",
        nameStr: "gartner",
        iframeUrl: "https://www.gartner.com/en/articles/top-strategic-technology-trends-2025",
        bgImg: "",
        description:
          "Gartner’s 2025 tech trend briefing highlights AI trust, machine customers, and platform engineering priorities for CIO roadmaps.",
        tags: ["gartner", "tech", "trends", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mckinsey-2025-economic-outlook",
        nameStr: "mckinsey",
        iframeUrl: "https://www.mckinsey.com/capabilities/mckinsey-global-institute/our-insights",
        bgImg: "",
        description:
          "McKinsey Global Institute publishes 2025 macroeconomic scenarios covering productivity, energy transitions, and labor shifts.",
        tags: ["mckinsey", "economic", "outlook", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "accenture-2025-tech-vision",
        nameStr: "accenture",
        iframeUrl: "https://www.accenture.com/us-en/insights/technology",
        bgImg: "",
        description:
          "Accenture’s Tech Vision 2025 report explores spatial computing, AI agents, and cloud continuum bets for enterprise leaders.",
        tags: ["accenture", "tech", "vision", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "wef-2025-future-jobs",
        nameStr: "wef",
        iframeUrl: "https://www.weforum.org/reports/",
        bgImg: "",
        description:
          "The World Economic Forum Future of Jobs update details 2025 skill gaps, automation exposure, and green job creation forecasts.",
        tags: ["wef", "future", "jobs", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "statista-2025-market-data",
        nameStr: "statista",
        iframeUrl: "https://www.statista.com/topics/8935/future-of-work/",
        bgImg: "",
        description:
          "Statista aggregates 2025-ready datasets on AI adoption, consumer devices, and digital advertising spends with downloadable charts.",
        tags: ["statista", "market", "data", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "deepseek-updates-resources",
    nameStr: "deepseek-updates",
    isHomeData: true,
    children: [
      {
        name: "deepseek-official-updates",
        nameStr: "deepseek-official",
        iframeUrl: "https://www.deepseek.com/",
        bgImg: "",
        description:
          "DeepSeek’s official site shares release notes, pricing, and access to the Grok-inspired DeepSeek-V3 assistant.",
        tags: ["deepseek", "official", "updates", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "deepseek-github-models",
        nameStr: "deepseek-github",
        iframeUrl: "https://github.com/deepseek-ai",
        bgImg: "",
        description:
          "The DeepSeek GitHub organization hosts Mixtral-based checkpoints, fine-tuning scripts, and inference examples.",
        tags: ["deepseek", "github", "models", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "deepseek-huggingface-hub",
        nameStr: "deepseek-huggingface",
        iframeUrl: "https://huggingface.co/deepseek-ai",
        bgImg: "",
        description:
          "DeepSeek’s Hugging Face hub provides quantized weights, tokenizer files, and evaluation cards for community downloads.",
        tags: ["deepseek", "huggingface", "hub", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "deepseek-research-papers",
        nameStr: "deepseek-research",
        iframeUrl: "https://arxiv.org/abs/2402.03300",
        bgImg: "",
        description:
          "The DeepSeek research paper outlines architecture innovations, training data, and benchmark results for V2 and beyond.",
        tags: ["deepseek", "research", "papers", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "slot-gacor-guides",
    nameStr: "slot",
    isHomeData: true,
    children: [
      {
        name: "slotcatalog-slot-tracker",
        nameStr: "slotcatalog",
        iframeUrl: "https://slotcatalog.com/",
        bgImg: "",
        description:
          "SlotCatalog tracks RTP, volatility, and release calendars so players can compare trending Pragmatic Play and PG Soft titles.",
        tags: ["slotcatalog", "slot", "tracker", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "askgamblers-slot-reviews",
        nameStr: "askgamblers",
        iframeUrl: "https://www.askgamblers.com/online-slots/",
        bgImg: "",
        description:
          "AskGamblers posts audited slot reviews, player ratings, and jackpot updates with responsible gaming reminders.",
        tags: ["askgamblers", "slot", "reviews", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "pragmatic-slot-updates",
        nameStr: "pragmatic",
        iframeUrl: "https://www.pragmaticplay.com/en/games/slots/",
        bgImg: "",
        description:
          "Pragmatic Play’s official slot hub announces new Drop & Wins campaigns, paylines, and demo modes.",
        tags: ["pragmatic", "slot", "updates", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "slottracker-community-stats",
        nameStr: "slottracker",
        iframeUrl: "https://slottracker.com/",
        bgImg: "",
        description:
          "SlotTracker crowdsources live RTP stats from thousands of spins to spotlight daily slot gacor candidates.",
        tags: ["slottracker", "community", "stats", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "gambleaware-safe-play",
        nameStr: "gambleaware",
        iframeUrl: "https://www.begambleaware.org/",
        bgImg: "",
        description:
          "BeGambleAware centralizes helplines, budgeting tips, and exclusion tools to keep slot sessions safe.",
        tags: ["gambleaware", "safe", "play", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "iphone17-latest-leaks",
    nameStr: "iphone17",
    isHomeData: true,
    children: [
      {
        name: "macrumors-iphone17-hub",
        nameStr: "macrumors",
        iframeUrl: "https://www.macrumors.com/roundup/iphone-17/",
        bgImg: "",
        description:
          "MacRumors compiles iPhone 17 CAD leaks, display rumors, and launch timelines with weekly updates.",
        tags: ["macrumors", "iphone17", "hub", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "9to5mac-iphone17-rumors",
        nameStr: "9to5mac",
        iframeUrl: "https://9to5mac.com/nameStr/iphone-17/",
        bgImg: "",
        description:
          "9to5Mac tracks analyst notes on A20 chips, stacked batteries, and camera upgrades expected for iPhone 17.",
        tags: ["iphone17", "rumors", "tool", "platform", "service"],
        updateTime: "2025-12-03",
      },
      {
        name: "techradar-iphone17-preview",
        nameStr: "techradar",
        iframeUrl: "https://www.techradar.com/phones/iphone/iphone-17",
        bgImg: "",
        description:
          "TechRadar aggregates supplier leaks to forecast iPhone 17 design tweaks, price bands, and release windows.",
        tags: ["techradar", "iphone17", "preview", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "gsmarena-iphone17-specs",
        nameStr: "gsmarena",
        iframeUrl: "https://www.gsmarena.com/apple_iphone_17-0.php",
        bgImg: "",
        description:
          "GSMArena maintains a speculative spec sheet covering display sizes, camera sensors, and connectivity for the iPhone 17 line.",
        tags: ["gsmarena", "iphone17", "specs", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "notebookcheck-iphone17-analysis",
        nameStr: "notebookcheck",
        iframeUrl: "https://www.notebookcheck.net/Apple-iPhone-17.861026.0.html",
        bgImg: "",
        description:
          "NotebookCheck dissects supply-chain whispers on BOE panels, periscope zoom, and thermal redesigns for Apple’s 2025 flagship.",
        tags: ["notebookcheck", "iphone17", "analysis", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "gemini-ai",
    nameStr: "gemini-ai",
    isHomeData: true,
    children: [
      {
        name: "gemini-advanced-multimodal",
        nameStr: "gemini-advanced",
        iframeUrl: "https://gemini.google.com/advanced",
        bgImg: "",
        description:
          "Gemini Advanced is Google's premium AI assistant with Ultra 1.5 model, supporting multi-modal inputs (text, image, video, audio) and advanced reasoning capabilities.",
        tags: ["gemini", "advanced", "multimodal", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "gemini-api-developer-platform",
        nameStr: "gemini-api",
        iframeUrl: "https://ai.google.dev/gemini-api",
        bgImg: "",
        description:
          "Google Gemini API provides developers with access to Gemini models for building custom AI applications, including text generation, image analysis, and code assistance.",
        tags: ["gemini", "api", "developer", "platform", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "gemini-app-integrations",
        nameStr: "gemini-app",
        iframeUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.gemini",
        bgImg: "",
        description:
          "Gemini App for Android integrates Google's AI into mobile workflows, offering on-device processing, real-time translation, and context-aware assistance.",
        tags: ["gemini", "app", "integrations", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "gemini-workspace-integration",
        nameStr: "gemini-workspace",
        iframeUrl: "https://workspace.google.com/products/gemini/",
        bgImg: "",
        description:
          "Gemini for Google Workspace enhances Docs, Sheets, Slides, and Meet with AI-powered content creation, data analysis, and meeting summaries.",
        tags: ["gemini", "workspace", "integration", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "gemini-education-tools",
        nameStr: "gemini-education",
        iframeUrl: "https://edu.google.com/products/ai/gemini/",
        bgImg: "",
        description:
          "Gemini Education Suite offers AI-powered tutoring, lesson planning, and student assessment tools tailored for K-12 and higher education institutions.",
        tags: ["gemini", "education", "tools", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "mahjong333",
    nameStr: "mahjong333",
    isHomeData: true,
    children: [
      {
        name: "mahjong333-online-game",
        nameStr: "mahjong333-online",
        iframeUrl: "https://www.mahjong333.com/",
        bgImg: "",
        description:
          "Mahjong333 is a popular online mahjong platform offering classic Chinese mahjong gameplay, multiplayer modes, and real-time tournaments with fair play guarantees.",
        tags: ["mahjong333", "online", "game", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mahjong333-mobile-app",
        nameStr: "mahjong333-mobile",
        iframeUrl: "https://apps.apple.com/us/app/mahjong333/id1628745989",
        bgImg: "",
        description:
          "Mahjong333 Mobile App brings authentic mahjong experience to iOS/Android devices, supporting offline play, custom rules, and social sharing features.",
        tags: ["mahjong333", "mobile", "app", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mahjong333-strategy-guide",
        nameStr: "mahjong333-strategy",
        iframeUrl: "https://www.mahjong333.com/strategy",
        bgImg: "",
        description:
          "Mahjong333 Strategy Guide provides expert tips, winning tactics, and rule explanations for both beginner and advanced mahjong players.",
        tags: ["mahjong333", "strategy", "guide", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mahjong333-tournament-center",
        nameStr: "mahjong333-tournament",
        iframeUrl: "https://www.mahjong333.com/tournaments",
        bgImg: "",
        description:
          "Mahjong333 Tournament Center hosts daily, weekly, and monthly mahjong competitions with cash prizes and leaderboard rankings.",
        tags: ["mahjong333", "tournament", "center", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "mahjong333-vip-membership",
        nameStr: "mahjong333-vip",
        iframeUrl: "https://www.mahjong333.com/vip",
        bgImg: "",
        description:
          "Mahjong333 VIP Membership unlocks exclusive features including ad-free gameplay, custom avatars, and priority access to premium tournaments.",
        tags: ["mahjong333", "vip", "membership", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "black-friday2025",
    nameStr: "black",
    isHomeData: true,
    children: [
      {
        name: "black-friday2025-amazon-deals",
        nameStr: "black-friday2025",
        iframeUrl: "https://www.amazon.com/Black-Friday/b?ie=UTF8&node=16225007011",
        bgImg: "",
        description:
          "Amazon Black Friday 2025 features early access deals on electronics, home goods, and Amazon devices with up to 70% off for Prime members.",
        tags: ["black", "friday2025", "amazon", "deals", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "black-friday2025-bestbuy-deals",
        nameStr: "black-friday2025-bestbuy",
        iframeUrl:
          "https://www.bestbuy.com/site/black-friday/pcmcat344700050001.c?id=pcmcat344700050001",
        description:
          "Best Buy Black Friday 2025 offers massive discounts on TVs, laptops, gaming consoles, and home appliances with price match guarantee.",
        tags: ["black", "friday2025", "bestbuy", "deals", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "black-friday2025-walmart-deals",
        nameStr: "black-friday2025-walmart",
        iframeUrl: "https://www.walmart.com/blackfriday",
        bgImg: "",
        description:
          "Walmart Black Friday 2025 includes rollback prices on toys, clothing, groceries, and electronics with both in-store and online exclusive deals.",
        tags: ["black", "friday2025", "walmart", "deals", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "black-friday2025-target-deals",
        nameStr: "black-friday2025-target",
        iframeUrl: "https://www.target.com/c/black-friday/-/N-5xsxf",
        bgImg: "",
        description:
          "Target Black Friday 2025 features buy-one-get-one-free offers, gift card bonuses, and exclusive deals on home decor and beauty products.",
        tags: ["black", "friday2025", "target", "deals", "tool"],
        updateTime: "2025-12-03",
      },
      {
        name: "black-friday2025-tech-deals-tracker",
        nameStr: "black-friday2025-tech",
        iframeUrl: "https://www.techbargains.com/black-friday",
        bgImg: "",
        description:
          "TechBargains Black Friday 2025 Tracker monitors real-time price drops on smartphones, laptops, smart home devices, and audio equipment.",
        tags: ["black", "friday2025", "tech", "deals", "tracker"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "spotify",
    nameStr: "spotify",
    isHomeData: true,
    children: [
      {
        name: "spotify-premium-subscription",
        nameStr: "spotify-premium",
        iframeUrl: "https://www.spotify.com/us/premium/",
        bgImg: "",
        description:
          "Spotify Premium offers ad-free music streaming, offline downloads, high-quality audio, and unlimited skips across all devices for a monthly fee.",
        tags: ["spotify", "premium", "subscription", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "spotify-for-artists",
        nameStr: "spotify-for",
        iframeUrl: "https://artists.spotify.com/",
        bgImg: "",
        description:
          "Spotify for Artists provides musicians with analytics, audience insights, and tools to promote their music and grow their fan base on the platform.",
        tags: ["spotify", "for", "artists", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "spotify-podcasts-studio",
        nameStr: "spotify-podcasts",
        iframeUrl: "https://podcasters.spotify.com/",
        bgImg: "",
        description:
          "Spotify for Podcasters (Anchor) offers free hosting, distribution, and monetization tools for podcast creators with access to Spotify's global audience.",
        tags: ["spotify", "podcasts", "studio", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "spotify-wrapped-2025",
        nameStr: "spotify-wrapped",
        iframeUrl: "https://spotify.com/wrapped",
        bgImg: "",
        description:
          "Spotify Wrapped 2025 is an annual personalized recap of users' listening habits, including top artists, songs, genres, and total listening time.",
        tags: ["spotify", "wrapped", "tool", "platform", "service"],
        updateTime: "2025-12-03",
      },
      {
        name: "spotify-car-thing",
        nameStr: "spotify-car",
        iframeUrl: "https://www.spotify.com/us/carthing/",
        bgImg: "",
        description:
          "Spotify Car Thing is a voice-controlled smart device for in-car music playback, integrating with Spotify Premium to offer hands-free control of playlists and podcasts.",
        tags: ["spotify", "car", "thing", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "chatgpt",
    nameStr: "chatgpt-hub",
    isHomeData: true,
    children: [
      {
        name: "chatgpt-plus-subscription",
        nameStr: "chatgpt-plus",
        iframeUrl: "https://openai.com/pricing",
        bgImg: "",
        description:
          "ChatGPT Plus ($20/month) unlocks GPT-4o access, faster response times, browsing capabilities, DALL·E 3 integration, and priority support from OpenAI.",
        tags: ["chatgpt", "plus", "subscription", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "chatgpt-enterprise-solution",
        nameStr: "chatgpt-enterprise",
        iframeUrl: "https://openai.com/enterprise",
        bgImg: "",
        description:
          "ChatGPT Enterprise offers enterprise-grade security, unlimited GPT-4 access, advanced data analysis, custom models, and SLA guarantees for businesses.",
        tags: ["chatgpt", "enterprise", "solution", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "chatgpt-api-integration",
        nameStr: "chatgpt-api",
        iframeUrl: "https://platform.openai.com/docs/guides/gpt",
        bgImg: "",
        description:
          "ChatGPT API allows developers to integrate GPT-3.5 Turbo and GPT-4 models into applications, products, and services with flexible pricing and scaling options.",
        tags: ["chatgpt", "api", "integration", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "chatgpt-plugins-marketplace",
        nameStr: "chatgpt-plugins",
        iframeUrl: "https://openai.com/blog/chatgpt-plugins",
        bgImg: "",
        description:
          "ChatGPT Plugins Marketplace offers 1000+ third-party integrations including travel booking, code execution, data analysis, and productivity tools to extend ChatGPT's capabilities.",
        tags: ["chatgpt", "plugins", "marketplace", "tool", "platform"],
        updateTime: "2025-12-03",
      },
      {
        name: "chatgpt-mobile-app",
        nameStr: "chatgpt-mobile",
        iframeUrl: "https://apps.apple.com/us/app/chatgpt/id6448311069",
        bgImg: "",
        description:
          "ChatGPT Mobile App for iOS and Android provides on-the-go access to GPT-4, voice input, offline mode, and sync across all devices with Plus subscription.",
        tags: ["chatgpt", "mobile", "app", "tool", "platform"],
        updateTime: "2025-12-03",
      },
    ],
  },
  {
    name: "global-productivity-essentials",
    nameStr: "productivity",
    isHomeData: true,
    children: [
      {
        name: "todoist-task-planner",
        nameStr: "todoist",
        iframeUrl: "https://todoist.com/",
        bgImg: "",
        description:
          "Todoist is a cross-platform task manager with natural language scheduling, productivity tracking, and shared projects for teams and individuals.",
        tags: ["todoist", "tasks", "planner", "productivity", "webapp"],
        updateTime: "2025-12-07",
      },
      {
        name: "trello-kanban-boards",
        nameStr: "trello",
        iframeUrl: "https://trello.com/",
        bgImg: "",
        description:
          "Trello delivers kanban boards, automation, and Power-Up integrations that keep marketing, product, and ops teams organized in one collaborative space.",
        tags: ["trello", "kanban", "boards", "collaboration", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "asana-work-manager",
        nameStr: "asana",
        iframeUrl: "https://asana.com/",
        bgImg: "",
        description:
          "Asana centralizes work requests, timelines, and goals so distributed teams can plan launches, automate handoffs, and measure progress.",
        tags: ["asana", "work", "management", "automation", "platform"],
        updateTime: "2025-12-07",
      },
      {
        name: "clickup-productivity-platform",
        nameStr: "clickup",
        iframeUrl: "https://clickup.com/",
        bgImg: "",
        description:
          "ClickUp combines docs, tasks, whiteboards, and dashboards in an all-in-one productivity platform with deep customization.",
        tags: ["clickup", "workspace", "tasks", "docs", "platform"],
        updateTime: "2025-12-07",
      },
      {
        name: "monday-work-operating-system",
        nameStr: "monday",
        iframeUrl: "https://monday.com/",
        bgImg: "",
        description:
          "Monday.com Work OS adapts to any workflow with visual boards, automations, dashboards, and 200+ integrations.",
        tags: ["monday", "work", "os", "automation", "boards"],
        updateTime: "2025-12-07",
      },
      {
        name: "airtable-flexible-database",
        nameStr: "airtable",
        iframeUrl: "https://airtable.com/",
        bgImg: "",
        description:
          "Airtable blends spreadsheets with database power, supporting views, automations, and synced data for modern ops teams.",
        tags: ["airtable", "database", "spreadsheet", "automation", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "notion-connected-workspace",
        nameStr: "notion-workspace",
        iframeUrl: "https://www.notion.so/",
        bgImg: "",
        description:
          "Notion is a connected workspace where docs, wikis, tasks, and AI-powered notes live together for fast knowledge sharing.",
        tags: ["notion", "workspace", "docs", "wiki", "productivity"],
        updateTime: "2025-12-07",
      },
      {
        name: "linear-issue-tracker",
        nameStr: "linear",
        iframeUrl: "https://linear.app/",
        bgImg: "",
        description:
          "Linear is a lightning-fast issue tracker for product teams with cycle planning, roadmaps, and Git integrations.",
        tags: ["linear", "issues", "roadmap", "product", "agile"],
        updateTime: "2025-12-07",
      },
      {
        name: "jira-cloud-work-management",
        nameStr: "jira",
        iframeUrl: "https://www.atlassian.com/software/jira",
        bgImg: "",
        description:
          "Jira Cloud powers agile planning, backlog grooming, and release tracking with robust permissions and reporting.",
        tags: ["jira", "agile", "issues", "planning", "software"],
        updateTime: "2025-12-07",
      },
      {
        name: "slack-team-messaging",
        nameStr: "slack",
        iframeUrl: "https://slack.com/",
        bgImg: "",
        description:
          "Slack connects teams with channels, clips, workflows, and app integrations so information stays searchable.",
        tags: ["slack", "chat", "team", "messaging", "collaboration"],
        updateTime: "2025-12-07",
      },
      {
        name: "discord-community-hubs",
        nameStr: "discord",
        iframeUrl: "https://discord.com/",
        bgImg: "",
        description:
          "Discord hosts communities and product user groups with voice, video, forums, and automation bots.",
        tags: ["discord", "community", "chat", "voice", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "zoom-video-meetings",
        nameStr: "zoom",
        iframeUrl: "https://zoom.us/",
        bgImg: "",
        description:
          "Zoom delivers HD meetings, phone, webinars, and Rooms hardware so distributed teams can collaborate in real time.",
        tags: ["zoom", "meetings", "video", "collaboration", "platform"],
        updateTime: "2025-12-07",
      },
      {
        name: "loom-video-messaging",
        nameStr: "loom",
        iframeUrl: "https://www.loom.com/",
        bgImg: "",
        description:
          "Loom records async video messages, screen walkthroughs, and quick demos with transcripts and engagement insights.",
        tags: ["loom", "video", "async", "messaging", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "figma-product-design-platform",
        nameStr: "figma",
        iframeUrl: "https://www.figma.com/",
        bgImg: "",
        description:
          "Figma is a collaborative interface design platform with multiplayer editing, Dev Mode, and extensible plugins.",
        tags: ["figma", "design", "ui", "collaboration", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "miro-collaboration-whiteboard",
        nameStr: "miro",
        iframeUrl: "https://miro.com/",
        bgImg: "",
        description:
          "Miro provides infinite canvases for brainstorming, agile ceremonies, workshops, and diagramming with 500+ templates.",
        tags: ["miro", "whiteboard", "collaboration", "brainstorm", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "whimsical-flowchart-studio",
        nameStr: "whimsical",
        iframeUrl: "https://whimsical.com/",
        bgImg: "",
        description:
          "Whimsical combines flowcharts, wireframes, and mind maps with keyboard-first shortcuts for fast ideation.",
        tags: ["whimsical", "flowchart", "wireframe", "mindmap", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "drawio-diagram-maker",
        nameStr: "drawio",
        iframeUrl: "https://app.diagrams.net/",
        bgImg: "",
        description:
          "draw.io (diagrams.net) is a free diagramming tool with offline support, Atlassian integrations, and custom libraries.",
        tags: ["drawio", "diagrams", "uml", "charts", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "grammarly-writing-assistant",
        nameStr: "grammarly",
        iframeUrl: "https://www.grammarly.com/",
        bgImg: "",
        description:
          "Grammarly improves grammar, tone, and clarity with AI suggestions across email, docs, and browsers.",
        tags: ["grammarly", "writing", "assistant", "ai", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "quillbot-rephrase-suite",
        nameStr: "quillbot",
        iframeUrl: "https://quillbot.com/",
        bgImg: "",
        description:
          "QuillBot paraphrases, summarizes, and cites content with customizable modes for academic and marketing teams.",
        tags: ["quillbot", "paraphrase", "summarize", "writing", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "deepl-language-translation",
        nameStr: "deepl",
        iframeUrl: "https://www.deepl.com/translator",
        bgImg: "",
        description:
          "DeepL Translator offers context-aware translations, glossaries, and document uploads for 30+ languages.",
        tags: ["deepl", "translation", "language", "ai", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "otter-ai-transcription-notes",
        nameStr: "otter",
        iframeUrl: "https://otter.ai/",
        bgImg: "",
        description:
          "Otter.ai transcribes meetings in real time, generates summaries, and pushes action items to calendars.",
        tags: ["otter", "transcription", "meetings", "notes", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "typeform-interactive-forms",
        nameStr: "typeform",
        iframeUrl: "https://www.typeform.com/",
        bgImg: "",
        description:
          "Typeform delivers conversational forms, quizzes, and surveys that feed results directly into CRMs.",
        tags: ["typeform", "forms", "survey", "interactive", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "jotform-form-builder",
        nameStr: "jotform",
        iframeUrl: "https://www.jotform.com/",
        bgImg: "",
        description:
          "Jotform provides drag-and-drop forms, approval flows, and PDF builders with HIPAA and e-sign support.",
        tags: ["jotform", "forms", "builder", "automation", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "surveymonkey-research-platform",
        nameStr: "surveymonkey",
        iframeUrl: "https://www.surveymonkey.com/",
        bgImg: "",
        description:
          "SurveyMonkey powers research with expert templates, logic, benchmarks, and panel respondents.",
        tags: ["surveymonkey", "research", "feedback", "insights", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "mailchimp-email-marketing",
        nameStr: "mailchimp",
        iframeUrl: "https://mailchimp.com/",
        bgImg: "",
        description:
          "Mailchimp is an email and automation suite with journeys, audience CRM, and e-commerce reporting.",
        tags: ["mailchimp", "email", "automation", "marketing", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "convertkit-creator-email",
        nameStr: "convertkit",
        iframeUrl: "https://convertkit.com/",
        bgImg: "",
        description:
          "ConvertKit helps creators grow newsletters with visual automations, commerce, and subscriber tagging.",
        tags: ["convertkit", "newsletter", "automation", "creator", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "beehiiv-newsletter-studio",
        nameStr: "beehiiv",
        iframeUrl: "https://www.beehiiv.com/",
        bgImg: "",
        description:
          "Beehiiv is a newsletter growth stack with referral programs, monetization, and advanced segmentation.",
        tags: ["beehiiv", "newsletter", "growth", "monetization", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "buffer-social-scheduler",
        nameStr: "buffer",
        iframeUrl: "https://buffer.com/",
        bgImg: "",
        description:
          "Buffer schedules content, collaborates on approvals, and shows channel analytics for social teams.",
        tags: ["buffer", "social", "scheduler", "analytics", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "hootsuite-social-dashboard",
        nameStr: "hootsuite",
        iframeUrl: "https://www.hootsuite.com/",
        bgImg: "",
        description:
          "Hootsuite unifies publishing, streams, engagement, and listening for enterprise social media.",
        tags: ["hootsuite", "social", "management", "monitoring", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "later-social-calendar",
        nameStr: "later",
        iframeUrl: "https://later.com/",
        bgImg: "",
        description:
          "Later provides a visual calendar for Instagram, TikTok, and Pinterest scheduling with link-in-bio tools.",
        tags: ["later", "social", "scheduler", "calendar", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "semrush-keyword-platform",
        nameStr: "semrush",
        iframeUrl: "https://www.semrush.com/",
        bgImg: "",
        description:
          "Semrush offers keyword research, site audits, competitor monitoring, and AI writing for SEO teams.",
        tags: ["semrush", "seo", "keywords", "audit", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "ahrefs-site-auditor",
        nameStr: "ahrefs",
        iframeUrl: "https://ahrefs.com/",
        bgImg: "",
        description:
          "Ahrefs provides backlink analysis, keyword tracking, site audits, and content gap insights.",
        tags: ["ahrefs", "backlinks", "seo", "audit", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "moz-pro-seo-suite",
        nameStr: "moz",
        iframeUrl: "https://moz.com/products/pro",
        bgImg: "",
        description:
          "Moz Pro packages rank tracking, keyword explorer, link data, and page optimization guidance.",
        tags: ["moz", "seo", "rank", "links", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "ubersuggest-keyword-tool",
        nameStr: "ubersuggest",
        iframeUrl: "https://neilpatel.com/ubersuggest/",
        bgImg: "",
        description:
          "Ubersuggest uncovers keyword ideas, content suggestions, and domain SEO metrics for marketers.",
        tags: ["ubersuggest", "keywords", "seo", "content", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "answerthepublic-question-miner",
        nameStr: "answerthepublic",
        iframeUrl: "https://answerthepublic.com/",
        bgImg: "",
        description:
          "AnswerThePublic visualizes search questions and comparisons to inspire content briefs.",
        tags: ["answerthepublic", "keywords", "questions", "seo", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "canirank-seo-insights",
        nameStr: "canirank",
        iframeUrl: "https://www.canirank.com/",
        bgImg: "",
        description:
          "CanIRank delivers AI-driven SEO recommendations, opportunity scores, and competitor tracking.",
        tags: ["canirank", "seo", "ai", "insights", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "hotjar-experience-analytics",
        nameStr: "hotjar",
        iframeUrl: "https://www.hotjar.com/",
        bgImg: "",
        description:
          "Hotjar combines heatmaps, recordings, and feedback widgets to visualize product experience.",
        tags: ["hotjar", "heatmap", "analytics", "ux", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "crazyegg-heatmaps",
        nameStr: "crazyegg",
        iframeUrl: "https://www.crazyegg.com/",
        bgImg: "",
        description:
          "Crazy Egg offers scroll maps, snapshots, and A/B testing to optimize landing pages.",
        tags: ["crazyegg", "heatmap", "testing", "ux", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "fullstory-digital-insights",
        nameStr: "fullstory",
        iframeUrl: "https://www.fullstory.com/",
        bgImg: "",
        description:
          "FullStory captures session replays, funnels, and alerts so product teams can spot friction quickly.",
        tags: ["fullstory", "replay", "analytics", "ux", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "pingdom-website-monitoring",
        nameStr: "pingdom",
        iframeUrl: "https://www.pingdom.com/",
        bgImg: "",
        description:
          "Pingdom monitors uptime, page speed, and user experience from 100+ locations worldwide.",
        tags: ["pingdom", "uptime", "monitoring", "performance", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "uptimerobot-status-monitor",
        nameStr: "uptimerobot",
        iframeUrl: "https://uptimerobot.com/",
        bgImg: "",
        description:
          "UptimeRobot offers free and paid monitors for HTTP, ping, keyword, and port checks with instant alerts.",
        tags: ["uptimerobot", "monitor", "status", "alerts", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "statuscake-uptime-checks",
        nameStr: "statuscake",
        iframeUrl: "https://www.statuscake.com/",
        bgImg: "",
        description:
          "StatusCake runs uptime, SSL, and domain monitoring with granular alert policies and reporting.",
        tags: ["statuscake", "uptime", "monitoring", "alerts", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "gtmetrix-performance-tester",
        nameStr: "gtmetrix",
        iframeUrl: "https://gtmetrix.com/",
        bgImg: "",
        description:
          "GTmetrix analyzes Core Web Vitals, waterfalls, and video captures to diagnose performance issues.",
        tags: ["gtmetrix", "performance", "web", "vitals", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "webpagetest-lab-insights",
        nameStr: "webpagetest",
        iframeUrl: "https://www.webpagetest.org/",
        bgImg: "",
        description:
          "WebPageTest reveals real browser performance with filmstrips, scripting, and Lighthouse data.",
        tags: ["webpagetest", "performance", "testing", "web", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "pagespeed-web-vitals",
        nameStr: "pagespeed",
        iframeUrl: "https://pagespeed.web.dev/",
        bgImg: "",
        description:
          "PageSpeed Insights scores mobile and desktop experiences with guidance on improving Core Web Vitals.",
        tags: ["pagespeed", "insights", "core", "web", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "ilovepdf-converter-suite",
        nameStr: "ilovepdf",
        iframeUrl: "https://www.ilovepdf.com/",
        bgImg: "",
        description:
          "iLovePDF merges, splits, compresses, and edits PDFs in the browser with batch processing.",
        tags: ["ilovepdf", "pdf", "converter", "compress", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "smallpdf-online-pdf",
        nameStr: "smallpdf",
        iframeUrl: "https://smallpdf.com/",
        bgImg: "",
        description:
          "Smallpdf offers 20+ PDF tools plus e-sign, OCR, and cloud storage integrations.",
        tags: ["smallpdf", "pdf", "tools", "esign", "utility"],
        updateTime: "2025-12-07",
      },
      {
        name: "pdfcandy-document-toolkit",
        nameStr: "pdfcandy",
        iframeUrl: "https://pdfcandy.com/",
        bgImg: "",
        description:
          "PDF Candy is a browser-based PDF toolkit with conversions, editing, rearranging, and protection options.",
        tags: ["pdfcandy", "pdf", "convert", "edit", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "removebg-background-editor",
        nameStr: "removebg",
        iframeUrl: "https://www.remove.bg/",
        bgImg: "",
        description:
          "Remove.bg deletes image backgrounds with AI, exports transparent PNGs, and offers bulk API access.",
        tags: ["removebg", "image", "background", "ai", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "kapwing-creative-studio",
        nameStr: "kapwing",
        iframeUrl: "https://www.kapwing.com/",
        bgImg: "",
        description:
          "Kapwing is an online creative studio for video editing, meme templates, subtitles, and AI generation.",
        tags: ["kapwing", "video", "editing", "creative", "tool"],
        updateTime: "2025-12-07",
      },
    ],
  },
  {
    name: "ai-creation-suite",
    nameStr: "ai-suite",
    isHomeData: true,
    children: [
      {
        name: "runway-gen2-video-lab",
        nameStr: "runway",
        iframeUrl: "https://runwayml.com/gen-2/",
        bgImg: "",
        description:
          "Runway Gen-2 lets creators generate and edit cinematic video clips from text prompts, reference images, or uploaded footage entirely in the browser.",
        tags: ["runway", "gen2", "video", "generation", "ai"],
        updateTime: "2025-12-07",
      },
      {
        name: "heygen-avatar-studio",
        nameStr: "heygen",
        iframeUrl: "https://www.heygen.com/",
        bgImg: "",
        description:
          "HeyGen produces multilingual talking avatars, voice cloning, and script-to-video explainers with instant previews for marketing, support, and training teams.",
        tags: ["heygen", "avatar", "video", "ai", "studio"],
        updateTime: "2025-12-07",
      },
      {
        name: "pika-labs-video-studio",
        nameStr: "pika",
        iframeUrl: "https://pika.art/",
        bgImg: "",
        description:
          "Pika Labs turns prompts or storyboards into stylized motion graphics and anime-grade clips with frame-by-frame refinement tools.",
        tags: ["pika", "video", "generation", "ai", "animation"],
        updateTime: "2025-12-07",
      },
      {
        name: "synthesia-ai-avatars",
        nameStr: "synthesia",
        iframeUrl: "https://www.synthesia.io/",
        bgImg: "",
        description:
          "Synthesia creates studio-quality presenter videos with lifelike avatars, brand templates, and 120+ languages without cameras or actors.",
        tags: ["synthesia", "avatar", "video", "ai", "presenter"],
        updateTime: "2025-12-07",
      },
      {
        name: "fliki-ai-video-maker",
        nameStr: "fliki",
        iframeUrl: "https://fliki.ai/",
        bgImg: "",
        description:
          "Fliki converts blog posts or scripts into narrated videos using AI voices, subtitles, and stock libraries optimized for shorts and reels.",
        tags: ["fliki", "video", "voice", "ai", "creator"],
        updateTime: "2025-12-07",
      },
      {
        name: "opusclip-video-repurposer",
        nameStr: "opusclip",
        iframeUrl: "https://www.opus.pro/",
        bgImg: "",
        description:
          "OpusClip repurposes long-form podcasts or webinars into viral-ready short clips with AI highlights, captions, and virality scoring.",
        tags: ["opusclip", "video", "repurpose", "shorts", "ai"],
        updateTime: "2025-12-07",
      },
      {
        name: "descript-ai-editor",
        nameStr: "descript",
        iframeUrl: "https://www.descript.com/",
        bgImg: "",
        description:
          "Descript edits podcasts and videos via text transcripts, offering AI-powered filler word removal, overdub, and instant publishing.",
        tags: ["descript", "podcast", "editor", "ai", "video"],
        updateTime: "2025-12-07",
      },
      {
        name: "podcastle-ai-studio",
        nameStr: "podcastle",
        iframeUrl: "https://podcastle.ai/",
        bgImg: "",
        description:
          "Podcastle is a browser studio for remote interviews, AI cleanup, and text-to-speech narration with automated mastering.",
        tags: ["podcastle", "podcast", "studio", "ai", "audio"],
        updateTime: "2025-12-07",
      },
      {
        name: "elevenlabs-voice-ai",
        nameStr: "elevenlabs",
        iframeUrl: "https://elevenlabs.io/",
        bgImg: "",
        description:
          "ElevenLabs clones voices, generates lifelike speech, and offers multilingual dubbing pipelines for games, films, and narrators.",
        tags: ["elevenlabs", "voice", "cloning", "ai", "audio"],
        updateTime: "2025-12-07",
      },
      {
        name: "playht-ai-voice",
        nameStr: "playht",
        iframeUrl: "https://play.ht/",
        bgImg: "",
        description:
          "Play.ht produces ultra-realistic speech, voice avatars, and streaming TTS APIs with commercial usage rights and fine-tuning.",
        tags: ["playht", "tts", "voice", "ai", "audio"],
        updateTime: "2025-12-07",
      },
      {
        name: "leonardo-ai-art-studio",
        nameStr: "leonardo",
        iframeUrl: "https://leonardo.ai/",
        bgImg: "",
        description:
          "Leonardo AI offers fine-tuned diffusion models, texture generators, and asset upscalers for game and concept artists.",
        tags: ["leonardo", "art", "ai", "design", "generator"],
        updateTime: "2025-12-07",
      },
      {
        name: "ideogram-ai-typography",
        nameStr: "ideogram",
        iframeUrl: "https://ideogram.ai/",
        bgImg: "",
        description:
          "Ideogram excels at typography-aware image generation, crafting posters, merch, and social visuals with readable text.",
        tags: ["ideogram", "image", "generator", "typography", "ai"],
        updateTime: "2025-12-07",
      },
      {
        name: "recraft-ai-design-lab",
        nameStr: "recraft",
        iframeUrl: "https://www.recraft.ai/",
        bgImg: "",
        description:
          "Recraft AI outputs vector logos, patterns, and illustrations with reusable styles and brand-safe palettes.",
        tags: ["recraft", "design", "vector", "ai", "illustration"],
        updateTime: "2025-12-07",
      },
      {
        name: "writesonic-ai-writer",
        nameStr: "writesonic",
        iframeUrl: "https://writesonic.com/",
        bgImg: "",
        description:
          "Writesonic drafts blog posts, ads, product descriptions, and localized landing pages with SEO briefs and fact-checking.",
        tags: ["writesonic", "copywriting", "ai", "content", "marketing"],
        updateTime: "2025-12-07",
      },
      {
        name: "jasper-ai-marketing-studio",
        nameStr: "jasper",
        iframeUrl: "https://www.jasper.ai/",
        bgImg: "",
        description:
          "Jasper AI powers brand voice-aligned marketing copy, campaign briefs, and AI workflows for enterprise teams.",
        tags: ["jasper", "marketing", "copy", "ai", "assistant"],
        updateTime: "2025-12-07",
      },
      {
        name: "copyai-marketing-assistant",
        nameStr: "copyai",
        iframeUrl: "https://www.copy.ai/",
        bgImg: "",
        description:
          "Copy.ai automates outreach, product messaging, and sales enablement assets with collaborative workspaces.",
        tags: ["copyai", "copywriting", "automation", "ai", "sales"],
        updateTime: "2025-12-07",
      },
      {
        name: "rytr-ai-writer",
        nameStr: "rytr",
        iframeUrl: "https://rytr.me/",
        bgImg: "",
        description:
          "Rytr creates emails, summaries, and ad copy in 30+ languages with tone controls and plagiarism checks.",
        tags: ["rytr", "writer", "ai", "copy", "tool"],
        updateTime: "2025-12-07",
      },
      {
        name: "anyword-ai-copy",
        nameStr: "anyword",
        iframeUrl: "https://anyword.com/",
        bgImg: "",
        description:
          "Anyword predicts conversion uplift for marketing copy and generates channel-ready variations with scoring.",
        tags: ["anyword", "copywriting", "ai", "optimization", "marketing"],
        updateTime: "2025-12-07",
      },
      {
        name: "tome-ai-presentation-maker",
        nameStr: "tome",
        iframeUrl: "https://tome.app/",
        bgImg: "",
        description:
          "Tome turns prompts into interactive presentations with smart layouts, animations, and embeddable prototypes.",
        tags: ["tome", "presentation", "ai", "slides", "story"],
        updateTime: "2025-12-07",
      },
      {
        name: "gamma-ai-slide-studio",
        nameStr: "gamma",
        iframeUrl: "https://gamma.app/",
        bgImg: "",
        description:
          "Gamma generates decks, documents, and webpages using AI-created outlines, rich layouts, and live analytics.",
        tags: ["gamma", "slides", "ai", "documents", "builder"],
        updateTime: "2025-12-07",
      },
      {
        name: "character-ai-chat-lab",
        nameStr: "character",
        iframeUrl: "https://beta.character.ai/",
        bgImg: "",
        description:
          "Character.AI lets anyone build and converse with custom AI personalities for entertainment, tutoring, and role-play.",
        tags: ["character", "chatbot", "ai", "personas", "assistant"],
        updateTime: "2025-12-07",
      },
      {
        name: "playground-ai-image-lab",
        nameStr: "playground",
        iframeUrl: "https://playground.com/",
        bgImg: "",
        description:
          "Playground AI offers fast image generation, editing masks, and template libraries for mood boards and campaigns.",
        tags: ["playground", "image", "generator", "ai", "creative"],
        updateTime: "2025-12-07",
      },
    ],
  },
];

export const headerMenu: Menu[] = [
  {
    name: "home-top-tool-directory",
    nameStr: "home",
    path: "/",
  },
];

export const footerMenu: Menu[] = [
  {
    name: "privacy-policy-user-rights",
    nameStr: "privacy",
    path: "/privacy",
  },
  {
    name: "contact-team-support",
    nameStr: "contact",
    path: "/contact",
  },
  {
    name: "about-tool-directory",
    nameStr: "about",
    path: "/about",
  },
];
