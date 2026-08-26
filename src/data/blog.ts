import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'microsoft-store-publishing',
    slug: 'microsoft-store-publishing-guide',
    title: 'Microsoft Store 自动化上架：MSIX 打包与 Submission API 外链指南',
    excerpt: '围绕 MSIX Packaging Tool、MSIX Toolkit、StoreBroker 和 Microsoft Store Submission API，整理自动化上架的流程边界，并用外链引导读者进入官方文档和工具仓库。',
    date: '2026-07-14',
    tags: ['Microsoft Store', 'MSIX', 'Submission API', '自动化发布'],
    category: 'engineering',
    readingTime: 10,
    published: true,
    sourceUrl: 'https://blog.csdn.net/qq_59002866/article/details/157806835',
    content: [
      {
        type: 'heading',
        text: '先说清楚：不登录后台不等于绕过后台',
      },
      {
        type: 'paragraph',
        text: 'Microsoft Store 的自动化上架，目标是让日常版本发布不再反复打开 Partner Center 页面。它不是绕过开发者账号、商店审核或合规资料，而是在完成一次性配置后，用脚本或 CI 工具创建提交、更新包体和元信息、上传文件、提交审核并轮询状态。',
      },
      {
        type: 'quote',
        text: '最稳的理解是：Partner Center 负责账号、产品和审核规则；自动化工具负责把重复发布动作变成可复用的流水线。',
      },
      {
        type: 'heading',
        text: '工具边界',
      },
      {
        type: 'list',
        items: [
          'MSIX Packaging Tool：Microsoft Store 提供的打包工具，可把现有 MSI、EXE、App-V 或桌面应用重新打包为 MSIX，也支持通过模板和命令行做批量转换。',
          'MSIX Toolkit Scripts：微软开源的脚本集合，适合查找包处理、签名、Publisher 修改、App Installer 等辅助动作，不直接替代商店提交。',
          'Microsoft Store Submission API：负责创建提交、更新提交 JSON、上传包体 ZIP、commit 提交并查询审核状态，是“不登录开发者后台发布更新”的核心。',
          'StoreBroker：微软提供的开源 PowerShell 模块，封装了 Store Submission API，适合不想从零处理接口细节的发布流程。',
          'store-submission GitHub Action：更偏向 MSI/EXE 应用的 GitHub Actions 自动化方案，可作为 CI 发布入口参考。',
        ],
      },
      {
        type: 'heading',
        text: '一次性初始化清单',
      },
      {
        type: 'list',
        items: [
          '1. 在 Partner Center 创建开发者账号并完成组织或个人资料、身份验证、付款资料和税务资料。',
          '2. 在 Partner Center 里保留应用名称，创建产品，并记录 Package Identity、Publisher、Product ID / Application ID、Seller ID 等发布参数。',
          '3. 至少手动完成一次提交和年龄分级问卷。Microsoft Store Submission API 要求目标应用已经存在，并且应用首次提交流程已经建立。',
          '4. 把 Microsoft Entra ID 应用关联到 Partner Center，并授予可管理提交的角色，保存 Tenant ID、Client ID、Client Secret。',
          '5. 准备可复用的商店元信息，包括描述、关键词、截图、隐私政策 URL、支持邮箱、认证备注、价格和可用市场。',
          '6. 在 CI/CD 或发布机中把凭据放进安全变量，不要写进仓库；同时记录密钥过期时间，避免发布当天才发现 token 换不了。',
        ],
      },
      {
        type: 'heading',
        text: 'MSIX 打包自动化',
      },
      {
        type: 'paragraph',
        text: '如果项目本身能直接产出 MSIX、MSIXBundle 或 MSIXUpload，优先使用项目自身构建链路。如果是传统安装包转换，可以先在 MSIX Packaging Tool 图形界面生成 conversion template，再按照官方命令行文档接入发布流水线。正文不贴具体命令，避免参数过期或复制后误用。',
      },
      {
        type: 'links',
        links: [
          {
            label: 'MSIX Packaging Tool（Microsoft Store）',
            url: 'https://apps.microsoft.com/detail/9n5lw3jbcxkf?hl=zh-CN&gl=SG',
            description: '安装官方 MSIX Packaging Tool，用于重新打包和生成转换模板。',
          },
          {
            label: 'MSIX Packaging Tool 概览',
            url: 'https://learn.microsoft.com/en-us/windows/msix/packaging-tool/tool-overview',
            description: '了解工具能处理哪些安装包、适合哪些转换场景。',
          },
          {
            label: 'MSIX Packaging Tool 命令行转换',
            url: 'https://learn.microsoft.com/en-us/windows/msix/packaging-tool/package-conversion-command-line',
            description: '查看命令行模式、参数说明和自动化转换入口。',
          },
          {
            label: '生成命令行转换模板',
            url: 'https://learn.microsoft.com/en-us/windows/msix/packaging-tool/generate-template-file',
            description: '从图形界面流程沉淀 conversion template，供后续自动化复用。',
          },
          {
            label: 'MSIX Toolkit Scripts',
            url: 'https://github.com/microsoft/MSIX-Toolkit/tree/master/Scripts',
            description: '查找微软开源的 MSIX 辅助脚本，包括包处理、签名和分发相关示例。',
          },
        ],
      },
      {
        type: 'heading',
        text: 'Submission API 发布流程',
      },
      {
        type: 'list',
        items: [
          '1. 使用 Tenant ID、Client ID、Client Secret 获取 Microsoft Entra ID access token。',
          '2. 调用创建提交接口，新提交会基于最后一次已发布提交生成草稿，并返回 submissionId 和 fileUploadUrl。',
          '3. 修改提交 JSON，把新包的 fileName、fileStatus、minimumDirectXVersion、minimumSystemRam 等字段更新进去，同时按需更新商店描述、截图或认证备注。',
          '4. 把包体和素材放进 ZIP，文件相对路径要和提交 JSON 中的 fileName 对应，然后上传到 fileUploadUrl 指向的 Azure Blob SAS 地址。',
          '5. 调用 commit 接口提交审核，再轮询 status 接口，直到进入预处理、审核、发布或失败状态。',
          '6. API 创建的提交后续也应继续用 API 修改，不要在 Partner Center 页面中混改同一个 submission，避免提交进入不可继续的错误状态。',
        ],
      },
      {
        type: 'heading',
        text: '自动化发布外链导读',
      },
      {
        type: 'paragraph',
        text: '发布脚本不要从博客里复制模板直接跑。更推荐把官方 API 文档、StoreBroker 和 GitHub Action 作为入口，根据应用类型选择 MSIX/UWP 或 MSI/EXE 的提交方式，再把凭据、包体路径、市场配置和失败处理写进自己的发布系统。',
      },
      {
        type: 'links',
        links: [
          {
            label: 'Create and manage submissions using Microsoft Store services',
            url: 'https://learn.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services',
            description: 'Submission API 总入口，包含前置条件、Entra 应用关联、首次提交要求和 API 使用顺序。',
          },
          {
            label: 'Manage app submissions',
            url: 'https://learn.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions',
            description: '查看应用提交相关接口、提交状态、包更新和发布管理细节。',
          },
          {
            label: 'Microsoft Store submission API for MSI or EXE app',
            url: 'https://learn.microsoft.com/en-us/windows/apps/publish/store-submission-api',
            description: '面向 MSI/EXE 应用的新版提交 API 文档，适合传统桌面安装包发布链路。',
          },
          {
            label: 'StoreBroker PowerShell 模块',
            url: 'https://github.com/microsoft/StoreBroker',
            description: '微软开源的 Store Submission API 封装，可参考其发布流程和错误处理方式。',
          },
          {
            label: 'microsoft/store-submission GitHub Action',
            url: 'https://github.com/microsoft/store-submission',
            description: '在 GitHub Actions 中创建 Microsoft Store 提交的官方 Action，适合 CI/CD 入口参考。',
          },
        ],
      },
      {
        type: 'heading',
        text: 'CI/CD 接入建议',
      },
      {
        type: 'list',
        items: [
          '把版本号生成、安装包构建、MSIX 打包、签名、本地 smoke test、ZIP 归档和提交 API 放在同一条 release pipeline 中。',
          '提交前校验包体文件名、版本号、架构、语言、隐私政策 URL、支持邮箱和认证备注，避免把可预检的问题推给商店审核。',
          '对 access token 和 Client Secret 做最小权限和定期轮换，日志中不要打印完整 token、SAS URL 或密钥。',
          '审核状态轮询要处理 Retry-After、429、5xx 和 CommitFailed，失败时输出 correlation id、statusDetails 和提交 ID，方便后续排查。',
          '如果团队已经使用 GitHub Actions，可以先评估 store-submission Action；如果需要更细粒度控制，则参考 Submission API 或 StoreBroker 组织自己的发布脚本。',
        ],
      },
      {
        type: 'heading',
        text: '上线前检查清单',
      },
      {
        type: 'list',
        items: [
          '版本号已递增，包身份与 Partner Center 保持一致。',
          '应用不包含调试日志、测试域名、未使用资源和过期证书。',
          '隐私政策可公开访问，且说明了数据收集、账号、联网和第三方服务情况。',
          '截图与实际 UI 一致，不使用夸张营销图替代真实界面。',
          '安装、启动、登录、核心功能、退出、卸载和更新路径都已经在干净系统验证。',
          '自动化发布流程已在测试提交或 flight 中验证过，确认不会覆盖错误市场、价格、描述或包体。',
        ],
      },
      {
        type: 'heading',
        text: '常见问题',
      },
      {
        type: 'list',
        items: [
          '审核提示包身份不一致：回到 Partner Center 与 manifest，对照 Name、Publisher、Version 和应用保留名称。',
          '本地能安装但商店预检失败：检查依赖运行库、架构、签名链和包格式，必要时重新生成上传包。',
          '权限或隐私被退回：把功能需要的权限、数据用途和用户可控项写进隐私政策与提交备注。',
          'API 创建提交后后台无法继续改：同一个 API submission 不要再用 Partner Center 页面混改，必要时删除草稿后重新创建。',
          '自动化突然无法发布：检查 Client Secret 是否过期、Entra 应用是否仍关联 Partner Center、账号角色是否有提交权限。',
        ],
      },
      {
        type: 'heading',
        text: '总结',
      },
      {
        type: 'paragraph',
        text: 'Microsoft Store 自动化发布的关键不是在博客里复制一段固定脚本，而是把包身份、打包模板、官方 API、工具仓库、状态轮询和失败排查连成一条稳定链路。前期把一次性后台配置补齐，后续版本就可以沿着官方外链把流程接入自己的 CI/CD。',
      },
    ],
  },
  {
    id: 'steam-publishing',
    slug: 'steam-publishing-guide',
    title: 'Steam 应用上架流程：Steamworks、商店页与 SteamPipe 构建',
    excerpt: '从 Steamworks 账号准备、AppID 创建、商店资料填写到 SteamCMD 上传构建，整理一套适合独立游戏或桌面应用发布的 Steam 上架流程。',
    date: '2026-07-13',
    tags: ['Steamworks', 'SteamPipe', 'SteamCMD', '游戏发布'],
    category: 'engineering',
    readingTime: 10,
    published: true,
    sourceUrl: 'https://blog.csdn.net/qq_59002866/article/details/155980251',
    content: [
      {
        type: 'heading',
        text: 'Steam 上架的整体思路',
      },
      {
        type: 'paragraph',
        text: 'Steam 发布可以分为两条线：一条是面向玩家的商店页，负责展示、定价、地区、素材和审核；另一条是面向客户端的构建线，负责 Depot、Build、Branch 和安装内容。两条线都通过审核后，产品才能正式发布。',
      },
      {
        type: 'heading',
        text: '账号与应用准备',
      },
      {
        type: 'list',
        items: [
          '注册 Steamworks 合作伙伴账号，完成公司/个人资料、税务、银行和身份验证。',
          '为产品支付应用费并创建 AppID，记录 AppID、DepotID 和默认分支信息。',
          '准备应用可执行文件、运行依赖、图标、宣传图、截图、视频、系统需求和版本说明。',
          '确认游戏或应用的安装目录结构，避免把源码、调试文件、缓存和无关工具打进 Depot。',
        ],
      },
      {
        type: 'heading',
        text: '商店页配置步骤',
      },
      {
        type: 'list',
        items: [
          '1. 在 Steamworks 后台创建商店页，填写名称、类型、简短描述、详细描述、标签和支持语言。',
          '2. 上传胶囊图、头图、截图和宣传视频。素材需要按 Steam 要求的尺寸输出，并保持品牌视觉一致。',
          '3. 配置价格、发售地区、发布日期、年龄分级、控制器支持、系统需求和 EULA/隐私链接。',
          '4. 检查页面预览，确认首屏信息、截图顺序、功能点和语言版本没有错漏。',
          '5. 提交商店页审核。商店页通过后并不代表构建通过，两者需要分别完成。',
        ],
      },
      {
        type: 'heading',
        text: '使用 SteamPipe 上传构建',
      },
      {
        type: 'paragraph',
        text: 'SteamPipe 通过 SteamCMD 读取 VDF 配置，把本地目录上传为指定 AppID 的构建。推荐把内容目录、输出目录和构建脚本分开，方便 CI 或人工发布时复用。',
      },
      {
        type: 'code',
        language: 'vdf',
        code: [
          '"appbuild"',
          '{',
          '  "appid" "1234560"',
          '  "desc" "release-1.0.0"',
          '  "buildoutput" "..\\steam-output"',
          '  "contentroot" "..\\release-content"',
          '  "setlive" "default"',
          '  "depots"',
          '  {',
          '    "1234561" "depot_build_1234561.vdf"',
          '  }',
          '}',
        ].join('\n'),
      },
      {
        type: 'list',
        items: [
          '准备 contentroot 目录，只放最终要分发给玩家的文件。',
          '为每个 Depot 编写 depot_build 配置，指定文件映射和排除规则。',
          '用 SteamCMD 登录构建账号执行 app_build，上传完成后在后台把 Build 设置到测试分支。',
          '通过 Steam 客户端安装测试分支，验证首次安装、更新覆盖、卸载残留、存档和运行依赖。',
          '确认无误后再把构建切到 default 或正式分支，并补充发布说明。',
        ],
      },
      {
        type: 'heading',
        text: '审核与发布节奏',
      },
      {
        type: 'list',
        items: [
          '商店页审核重点看页面素材、描述真实性、分级、价格和地区设置。',
          '构建审核重点看能否下载、安装、启动、关闭，是否存在崩溃、恶意行为或缺失运行库。',
          '正式发布前建议至少留出几天缓冲期，用来处理审核反馈、修复构建和检查社区页面。',
          '上线后第一时间检查下载、评论、崩溃反馈、公告、折扣状态和支持邮箱。',
        ],
      },
      {
        type: 'heading',
        text: '常见踩坑',
      },
      {
        type: 'list',
        items: [
          '素材尺寸不符合要求：提前建立导出模板，不要临时手裁。',
          'Depot 文件过大：排查日志、符号文件、源文件、临时缓存和重复资源。',
          '测试分支可运行，正式分支不可运行：检查 Build 是否切换到了正确分支，用户是否拥有对应包。',
          '系统需求写得过低：以真实测试设备为准，避免玩家下载后无法运行。',
        ],
      },
      {
        type: 'heading',
        text: '总结',
      },
      {
        type: 'paragraph',
        text: 'Steam 上架要同时管理内容展示和构建分发。建议把商店素材清单、SteamPipe 脚本、测试分支验证和正式发布记录沉淀下来，这样后续更新、热修和多语言扩展都会更稳。',
      },
    ],
  },
  {
    id: 'seo-optimization',
    slug: 'seo-optimization-guide',
    title: 'SEO 优化实践指南：从页面结构到持续监控',
    excerpt: '围绕搜索意图、标题描述、语义化结构、站点地图、结构化数据、性能和内容更新，整理一套适合个人站与产品官网的 SEO 优化流程。',
    date: '2026-07-12',
    tags: ['SEO', '结构化数据', '站点地图', '性能优化'],
    category: 'frontend',
    readingTime: 8,
    published: true,
    sourceUrl: 'https://blog.csdn.net/qq_59002866/article/details/144697461',
    content: [
      {
        type: 'heading',
        text: 'SEO 优化不是只堆关键词',
      },
      {
        type: 'paragraph',
        text: '搜索引擎希望把最能解决问题的页面推荐给用户。关键词只是入口，真正影响长期表现的是页面能否清楚回答问题、结构是否易抓取、加载是否稳定、内容是否持续维护。',
      },
      {
        type: 'heading',
        text: '第一步：明确搜索意图',
      },
      {
        type: 'list',
        items: [
          '信息型：用户想了解概念或教程，例如“Steam 上架步骤”。页面应提供完整流程、背景和检查清单。',
          '比较型：用户在比较方案，例如“MSIX 和 MSI 区别”。页面应给出适用场景和取舍。',
          '交易型：用户准备行动，例如“下载工具”或“购买服务”。页面应减少跳转，强化信任和行动入口。',
          '品牌型：用户直接搜索品牌或产品名。页面需要保证标题、描述、Logo、社交链接和结构化数据一致。',
        ],
      },
      {
        type: 'heading',
        text: '第二步：优化标题、描述和内容结构',
      },
      {
        type: 'list',
        items: [
          '每个页面只设置一个 H1，标题要包含主题和明确收益，不要写成空泛口号。',
          'meta description 用 120 到 160 字概括页面价值，优先写给人看，再兼顾关键词。',
          'H2/H3 按问题拆分，例如准备工作、操作步骤、常见问题、总结，而不是随意加粗大段文字。',
          '正文第一屏要说明页面解决什么问题，避免用户打开后只看到装饰内容。',
          '图片必须有 alt，截图要能说明真实功能，不使用与内容无关的氛围图。',
        ],
      },
      {
        type: 'heading',
        text: '第三步：让搜索引擎容易抓取',
      },
      {
        type: 'list',
        items: [
          '生成 sitemap.xml，并在 robots.txt 中声明站点地图位置。',
          '为重复或相近页面设置 canonical，避免权重被参数页、分页或镜像页面分散。',
          '重要页面不要只依赖客户端交互出现，至少保证首屏核心内容可直接渲染或被预渲染。',
          '内部链接要自然连接相关主题，例如项目页链接到发布流程博客，博客再链接到项目案例。',
          '404、重定向和旧链接迁移要维护清楚，避免搜索引擎持续抓到无效页面。',
        ],
      },
      {
        type: 'heading',
        text: '第四步：补充结构化数据',
      },
      {
        type: 'paragraph',
        text: '结构化数据可以帮助搜索引擎理解页面类型。博客文章可以使用 Article，产品页可以使用 Product，个人主页可以使用 Person 或 WebSite。内容要真实匹配页面，不要写页面上不存在的信息。',
      },
      {
        type: 'code',
        language: 'html',
        code: [
          '<script type="application/ld+json">',
          '{',
          '  "@context": "https://schema.org",',
          '  "@type": "Article",',
          '  "headline": "SEO 优化实践指南",',
          '  "author": { "@type": "Person", "name": "Zhou Zhenyun" },',
          '  "datePublished": "2026-07-12"',
          '}',
          '</script>',
        ].join('\n'),
      },
      {
        type: 'heading',
        text: '第五步：性能和体验同样影响 SEO',
      },
      {
        type: 'list',
        items: [
          '优化 LCP：首屏大图压缩、设置尺寸、避免被慢脚本阻塞。',
          '优化 CLS：图片、广告位、卡片和字体加载都要有稳定尺寸，避免布局跳动。',
          '优化 INP：减少主线程长任务，交互组件按需加载，避免页面刚打开就执行大量脚本。',
          '移动端必须可读、可点、不卡顿。很多搜索流量来自手机，移动体验不能只当附加项。',
        ],
      },
      {
        type: 'heading',
        text: '第六步：持续监控和迭代',
      },
      {
        type: 'list',
        items: [
          '使用站长工具提交 sitemap，观察收录、抓取错误和搜索词表现。',
          '定期检查页面标题是否重复、描述是否缺失、链接是否失效。',
          '把高曝光低点击页面作为标题和摘要优化重点，把高点击低停留页面作为内容质量优化重点。',
          '每次发布新项目、博客或产品版本后，同步更新内部链接和相关页面。',
        ],
      },
      {
        type: 'heading',
        text: '总结',
      },
      {
        type: 'paragraph',
        text: 'SEO 的底层逻辑是“让正确的页面被正确理解，并持续满足用户需求”。对个人站和产品官网来说，先做好标题、结构、内容完整度、站点地图、结构化数据和性能，再通过数据监控持续调整，效果会比短期堆关键词更稳定。',
      },
    ],
  },
];

export const publishedPosts = blogPosts.filter((post) => post.published);

export const latestPosts = publishedPosts.slice(0, 3);

export const blogCategories = ['ai', 'frontend', 'cpp', 'engineering'] as const;
