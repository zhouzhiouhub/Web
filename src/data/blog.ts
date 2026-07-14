import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'microsoft-store-publishing',
    slug: 'microsoft-store-publishing-guide',
    title: 'Microsoft Store 上架完整流程：从安装包到商店审核',
    excerpt: '梳理 Windows 应用从 EXE/MSIX 打包、包身份配置、签名测试到 Partner Center 提交审核的完整步骤，适合作为桌面软件上架前的发布清单。',
    date: '2026-07-14',
    tags: ['Microsoft Store', 'MSIX', 'Partner Center', '应用上架'],
    category: 'engineering',
    readingTime: 9,
    published: true,
    sourceUrl: 'https://blog.csdn.net/qq_59002866/article/details/157806835',
    content: [
      {
        type: 'heading',
        text: '为什么要先把发布流程标准化',
      },
      {
        type: 'paragraph',
        text: 'Microsoft Store 上架不只是把安装包上传到后台。真正容易出问题的地方，通常是包身份、签名、版本号、权限声明、隐私链接和商店素材之间没有提前对齐。发布前把流程整理成清单，可以减少审核失败和返工。',
      },
      {
        type: 'heading',
        text: '发布前准备',
      },
      {
        type: 'list',
        items: [
          'Microsoft Partner Center 开发者账号，并完成基础资料、付款资料和身份验证。',
          '可稳定运行的 Windows 桌面应用安装包，建议先完成本地回归测试和干净环境安装测试。',
          '应用名称、包名、发布者、版本号、图标、截图、商店描述、隐私政策链接和支持邮箱。',
          'MSIX Packaging Tool、Advanced Installer 或项目自身构建工具，用于把传统 EXE/MSI 转换或输出为 MSIX / MSIXBundle。',
          '确认应用需要的权限、文件访问范围、后台行为和联网能力，避免审核时因为声明不清被退回。',
        ],
      },
      {
        type: 'heading',
        text: '从 EXE 到 MSIX 的推荐流程',
      },
      {
        type: 'list',
        items: [
          '1. 在 Partner Center 中创建新应用并保留应用名称，记录包身份信息，尤其是 Package/Identity/Name 与 Publisher。',
          '2. 使用 MSIX Packaging Tool 或打包工具创建 MSIX 包，安装过程尽量选择干净系统或虚拟机，减少无关注册表和临时文件被捕获。',
          '3. 在包信息中填入与 Partner Center 一致的 Name、Publisher、Version 和 DisplayName。版本号需要递增，不能低于线上版本。',
          '4. 完成安装捕获后，启动应用做一次基本操作，让快捷方式、运行依赖和必要资源被正确写入包。',
          '5. 生成 MSIX / MSIXBundle 后进行本地签名和安装测试，确认开始菜单、卸载、更新、权限弹窗和主流程都正常。',
          '6. 如果需要上传到商店，优先使用面向商店提交的上传包格式，并保留构建日志和产物版本记录。',
        ],
      },
      {
        type: 'quote',
        text: '包身份一致性是上架中最值得提前检查的点。应用名称可以调整文案，但包的 Name、Publisher 和版本链路不能随意漂移。',
      },
      {
        type: 'heading',
        text: 'Partner Center 提交步骤',
      },
      {
        type: 'list',
        items: [
          '选择产品类型并创建提交，先配置价格、可用市场、分发方式和年龄分级。',
          '填写商店列表信息，包括一句话介绍、详细描述、关键词、截图、图标、隐私政策、支持联系和版权信息。',
          '上传包体后查看系统预检结果，重点关注包身份、架构、依赖、支持系统版本和安装行为。',
          '补充认证说明。如果应用登录后才能使用、需要测试账号或有特殊硬件依赖，应在备注里写清楚。',
          '提交审核后持续跟进状态。若被退回，先定位失败项，再重新打包或补充商店资料，不要只改描述就重复提交。',
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
          '上传后找不到入口：确认提交是否处于草稿、审核、发布中或仅限特定市场。',
        ],
      },
      {
        type: 'heading',
        text: '总结',
      },
      {
        type: 'paragraph',
        text: 'Microsoft Store 发布的关键不是某一个按钮，而是构建产物、商店元信息和审核说明三者一致。把打包、预检、截图、隐私、备注和回归验证固定为 SOP，后续每次版本发布都会轻很多。',
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
