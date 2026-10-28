/**
 * 软件分发镜像站 - 前端极简控制器
 */

// 预设默认元数据
const DEFAULT_METADATA = {
  "jianying-ai-pro": {
    repo: "Kirota233/JianYing-AI-Pro",
    version: "v1.5.4",
    updatedAt: "2026-09-28T06:39:06Z",
    fileName: "JianYing-AI-Pro.exe",
    fileSize: "81.9 MB",
    downloadUrl: "https://github.com/Kirota233/JianYing-AI-Pro/releases/download/v1.5.4/JianYing-AI-Pro.exe",
    title: "JianYing-AI-Pro"
  },
  "jianying-period-keeper": {
    repo: "Kirota233/JianYing-Period-Keeper",
    version: "v1.0.5",
    updatedAt: "2026-10-14T01:48:20Z",
    fileName: "JianyingPeriodKeeper.exe",
    fileSize: "12.1 MB",
    downloadUrl: "https://github.com/Kirota233/JianYing-Period-Keeper/releases/download/v1.0.5/JianyingPeriodKeeper.exe",
    title: "JianYing-Period-Keeper"
  },
  "xiaoma-renamer": {
    version: "v1.2.0",
    updatedAt: "2026-10-14T03:30:00Z",
    fileName: "XiaoMa-Batch-Renamer-v1.2.0.zip",
    fileSize: "6.8 MB",
    downloadUrl: "/download/xiaoma/XiaoMa-Batch-Renamer-v1.2.0.zip",
    title: "重命名工具"
  },
  "xiaoma-editor": {
    repo: "KDHRBm/XM-Editing-Studio",
    version: "v1.3.0",
    updatedAt: "2026-10-26T03:17:15Z",
    fileName: "XM-Editing-Studio-1.3.0-Windows-x64-Setup.exe",
    fileSize: "186.1 MB",
    downloadUrl: "https://github.com/KDHRBm/XM-Editing-Studio/releases/download/v1.3.0/XM-Editing-Studio-1.3.0-Windows-x64-Setup.exe",
    title: "小马剪辑台"
  }
};

// 国内下载加速节点
const MIRROR_PROVIDERS = [
  { id: "ghfast", name: "GHFast 高速节点 (推荐)", prefix: "https://ghfast.top/" },
  { id: "ghproxy", name: "GHProxy 备用节点", prefix: "https://ghproxy.net/" },
  { id: "moeyy", name: "Moeyy 极速镜像", prefix: "https://github.moeyy.xyz/" },
  { id: "official", name: "GitHub 官方源", prefix: "" }
];

// 使用说明内容（预留图文与视频占位）
const GUIDE_DATA = {
  "jianying-ai-pro": {
    title: "JianYing-AI-Pro 使用说明",
    category: "01 // JIANYING-AI-PRO",
    videoUrl: null, // 无视频教程
    steps: [
      {
        num: "01",
        title: "确认网络环境并启动工具",
        desc: "确认能访问外网（请勿使用香港 IP/节点），然后打开工具。",
        img: "/media/tutorial/1/01_main_window_ready.png"
      },
      {
        num: "02",
        title: "输入 API Key 并配置模型",
        desc: "输入 API Key 并保存；选择一个模型（推荐使用新模型，如果报错可换成 3.5flash 等模型重试）。",
        img: "/media/tutorial/1/02_settings_api_model.png"
      },
      {
        num: "03",
        title: "视频批量导出",
        desc: "① 第一次使用点击「引导录制 F8」，并按操作录制坐标，待显示「坐标已就绪」；\n② 打开剪映并将其窗口最大化，点击「AI 扫描首页草稿」；\n③ 识别到草稿后点击识别出的草稿名，点击「从选中项开始导出」。",
        images: [
          { label: "1. 引导录制坐标 (pic3)", src: "/media/tutorial/1/03_guide_record_button.png" },
          { label: "2. 点击「AI 扫描首页草稿」 (pic4)", src: "/media/tutorial/1/04_ai_scan_drafts_button.png" },
          { label: "3. 选中草稿并从选中项导出 (pic5)", src: "/media/tutorial/1/05_select_and_export_draft.png" }
        ]
      },
      {
        num: "04",
        title: "字幕提取功能",
        desc: "① 选择你需要导出的剪映草稿路径（注意：程序会处理该路径下的所有草稿！）；\n② 点击「提取字幕 & 删除轨道 -> 桌面/srt」，程序将自动剔除草稿原字幕轨道，并将提取出的 SRT 字幕文件保存到桌面。",
        img: "/media/tutorial/1/06_subtitle_extract.png"
      },
      {
        num: "05",
        title: "批量重命名",
        desc: "① 拖放或点击「选择文件」添加需要导出的文件（支持所有格式，包括字幕、视频、音频、图片等）；\n② 参考命名格式，填入需要修改的名称规则（例如：短剧名称_第X集）；\n③ 点击「AI 预览重命名」，在下方表格核对原文件名与新文件名无误后，点击「执行重命名」即可一键完成。",
        img: "/media/tutorial/1/07_batch_rename.png"
      }
    ]
  },
  "jianying-period-keeper": {
    title: "JianYing-Period-Keeper 使用说明",
    category: "02 // PERIOD-KEEPER",
    videoUrl: "/media/tutorial/2/how_to_use.mp4",
    videoHint: "句读控制器实操视频教程",
    steps: [
      {
        num: "01",
        title: "AI 剧本台词提取提示词",
        desc: "要求用户自行使用 AI（如 ChatGPT、Claude、Gemini 等）提取纯英文台词。请复制下方提取提示词直接发送给 AI，然后再把您的剧本发给 AI 即可获得规范断句的纯净文本：",
        promptText: `你是一个短剧配音/字幕文本提取与格式化工具。后续我会向你发送剧本片段，请按以下规则处理并输出：

1. **提取内容**：仅提取剧本中 [EN] 对应的英文台词内容。

2. **剔除信息**：
   - 去掉所有中文、集数、场口、动作/心理描写（如 △、▲、VO 等）。
   - 去掉角色说话人前缀（如 "JACK:", "MIA:" 等），只保留台词本身。
3. **断句排版**：
   - 保持字幕/配音节奏，将较长句子按照意群或停顿拆分成自然的短行换行展示。
4. **标点与拼写规范**：
   - 使用正常英文字符与标点（单个英文句号.）。
   - 称谓与名字之间不加缩写点（例如输出：Mr Harris、Ms Foster、Ms Wynn，而不是 Mr. Harris）。
5. **输出要求**：
   - 严格直接输出处理后的纯英文文本。
   - 不要包含任何问候语、确认信息、解释说明或前后缀废话。

如果你明白了，请回复“收到，请发送剧本”，不要输出其他多余内容。`
      },
      {
        num: "02",
        title: "剪映文稿匹配与开启守护",
        desc: "① 将 AI 提取处理好的纯英文台词文本复制；\n② 在剪映专业版中点击「文本 -> 智能字幕 -> 文稿匹配」，将台词粘贴至输入框；\n③ 打开 JianyingPeriodKeeper.exe，点击开关开启「GUARD: ON」；\n④ 点击剪映中的「开始匹配」，文稿匹配完成后即可完美保留句号「.」与标点符号！"
      },
      {
        num: "03",
        title: "视频实操教程",
        desc: "请切换至上方「视频演示」选项卡，可直接在线观看完整的视频实操全流程演示。"
      }
    ]
  },
  "xiaoma-renamer": {
    title: "重命名工具 使用说明",
    category: "03 // RENAMER",
    videoHint: "视频演示正在制作中，敬请期待...",
    steps: [
      {
        num: "01",
        title: "使用教程整理中",
        desc: "该工具的使用教程正在整理与录制中，敬请期待...",
        placeholder: "【教程整理中，暂留空】"
      }
    ]
  },
  "xiaoma-editor": {
    title: "小马剪辑台 · 详细功能说明 (v1.1.2)",
    category: "05 // XIAOMA-EDITOR · 更新日期：2026.10.22",
    videoUrl: null,
    steps: [
      {
        num: "01",
        title: "一、软件介绍",
        desc: `小马剪辑台是一款面向短剧剪辑、英文字幕整理和视频配乐制作的 Windows 桌面工作台。软件将模型连接、AI 对话、Suno 音乐创作、剧本处理、本地音乐推荐、剪映标点辅助和样片水印集中到同一套界面中。

日常使用可以从粘贴剧本开始：自动提取英文台词，再由 Gemini 分析完整故事，选择本地音乐或生成 Suno 配乐，最后整理成可用于剪映的素材。

主要适合以下工作：
• 短剧英文字幕与配音文稿整理。
• 为完整剧本选择情绪、场景和风格合适的背景音乐。
• 批量安排多份剧本的 AI 配乐任务。
• 按指定风格与段落结构创作歌曲或纯音乐。
• 管理本地配乐文件，重复使用已有音乐素材。
• 为待审核、待展示的视频批量添加样片水印。`
      },
      {
        num: "02",
        title: "二、五个主要页面",
        desc: `• 【模型与连接】：配置 AI 服务商、接口地址、API 密钥及模型，并测试连接。
• 【对话】：使用已配置的文本模型进行对话，辅助构思、讨论剧情和整理提示词。
• 【音乐】：使用 Suno 等支持音乐生成的接口，定制风格、歌词、结构和人声偏好。
• 【工作空间】：处理剧本、提取英文台词、推荐本地配乐、生成整篇配乐、导出素材及切换主题。
• 【加样片水印】：对一个或多个本地视频添加图片水印并输出样片。`
      },
      {
        num: "03",
        title: "三、模型与连接管理",
        desc: `1. 统一管理服务连接
可添加不同服务商，填写服务名称、Base URL、API 密钥和模型名称，在一个程序中管理文本分析与音乐生成所需的连接。
程序提供多种协议适配，包括 OpenAI 兼容、Gemini Generative、Anthropic、自定义兼容接口及 Suno 异步音乐接口。应按服务方提供的实际协议选择，并填写准确的模型名称。

2. 连接测试与模型选择
配置后可进行连接测试，查看接口是否能正常响应。工作空间可分别选择 Gemini 剧本分析模型和 Suno 音乐模型；音乐页也可单独选择音乐生成模型。
普通聊天模型是否能生成音频，取决于服务商是否提供对应的音乐能力。仅填写一个模型名称不会自动获得音乐生成服务。

3. API 获取与使用条件
• 需要 Suno API，可联系小马获取。
• Gemini 分析、AI 对话及 Suno 音乐生成需要联网，并使用有效的 API 密钥与服务配额。调用费用和可用模型由对应服务商决定。`
      },
      {
        num: "04",
        title: "四、完整剧本与英文台词处理",
        desc: `1. 粘贴完整剧本
在工作空间直接粘贴剧本，无需另填剧本标题。软件会根据内容生成用于记录和导出的名称。每份剧本最多支持 30,000 个字符。原始完整剧本用于 Gemini 剧情分析，英文台词则在本机按规则提取。

2. 仅提取 [EN] 标记的台词
软件识别剧本中的 [EN] 英文台词，去除角色前缀、中文内容以及可识别的场景、动作和心理说明，输出纯英文文本。未标记 [EN] 的英文不会自动混入台词列表。

【输入示例】
第 3 集，庄园门口。
△ JACK 快步走向大门。
[EN] JACK: Mr. Harris, we need to leave now.
[EN] MIA: I am ready.

【提取结果】
Mr Harris, we need to leave now.
I am ready.

3. 断句与格式规范
• 将较长英文台词按意群或停顿分成自然短行。
• 保留台词原意，统一常见英文字符和标点形式。
• 去掉 Mr、Ms 等称谓与名字之间的缩写点，例如 Mr Harris、Ms Foster。
• 提取结果直接逐行显示，不加入问候语、解释或角色标签。
• 整理结果最多支持 1,500 行，超出时需要拆分剧本。

4. 复制、导出与收起
支持一键复制全部英文台词，也可导出为 TXT 文本，方便粘贴到剪映、配音工具或字幕编辑工具。台词框可以独立收起和展开，保留原文及提取结果，减少长文本占用的屏幕空间。`
      },
      {
        num: "05",
        title: "五、多剧本与历史记录",
        desc: `1. 多份剧本切换
最多同时打开 5 份剧本，通过标签切换。每份剧本保留自己的内容、配乐要求和推荐结果，方便连续处理不同集数或不同项目。

2. 最近 5 份历史剧本
历史列表最多保留 5 份记录，可重新打开原文并查看已经保存的音乐推荐。历史推荐中的本地音乐需要仍然可访问。如果原文件夹已断开、文件已移动或电脑已更换，应重新连接对应音乐库。

3. 一键清空当前内容
工作空间顶部提供「清空当前内容」按钮，清空当前剧本、英文台词、配乐要求和推荐结果。该操作保留其他剧本、历史记录、模型设置和已经提交的任务。属于当前剧本的未完成匹配请求会被取消，迟到的结果不会重新填回已清空的内容。`
      },
      {
        num: "06",
        title: "六、Gemini 剧情分析与本地配乐推荐",
        desc: `1. 根据完整故事分析配乐需求
点击「Gemini 识别剧本关键词并匹配」后，软件会将完整剧本、配乐要求及候选音乐标题交给所选 Gemini 服务分析。返回结果包括剧情概述、关键词和音乐推荐理由，帮助判断配乐与故事情绪、场景和节奏的关联。

2. 连接本地音乐文件夹
可连接当前电脑磁盘上的多个音乐文件夹，并扫描其中的子目录。常见可索引格式包括 MP3、WAV、FLAC、M4A、AAC、OGG、OPUS 和 WEBM。以后向这些文件夹加入新音乐，或修改音乐名称后，点击「刷新音乐库」即可更新索引。新增曲目要参与当前剧本的推荐，还需重新分析匹配。断开文件夹只移除软件中的连接，不会删除原音乐文件。

3. 按标题关键词匹配
当前推荐主要依据音乐标题所表达的风格、情绪、场景和乐器信息。程序不会把本地音频上传给 Gemini 进行听辨。建议将文件命名得清楚一些，例如：
• 悬疑追踪_低频鼓点_紧张.mp3
• 温暖重逢_钢琴弦乐_抒情.wav
• 反转揭晓_渐强_电影感.mp3
音乐数量较多时，软件先用中英文关键词筛选候选，再交给 Gemini 评估；超过 80 首时，最多选取 80 首候选参与该轮评估。

4. 查看推荐、试听与选用
推荐列表显示音乐标题、文件相对位置、推荐理由及关联关键词。可直接试听，并点击「选用此音乐」加入素材任务，使用已有配乐。即使还没有连接音乐，也可先用 Gemini 提取剧本关键词，之后连接音乐库再匹配。

5. 分页与独立收起
• 音乐标题索引与推荐列表每页显示 5 首；页码每组最多显示 10 个，支持上一页、下一页及跨页组浏览。
• 本地音乐库提供「收起本地配乐 / 展开本地配乐」按钮；在本地音乐匹配模式下，收起上方剧本配乐区域不会隐藏本地音乐库；各区域独立记住自己的收起状态。`
      },
      {
        num: "07",
        title: "七、剧本到 Suno 配乐的自动流程",
        desc: `1. 一份剧本对应一份整体配乐任务
在工作空间选择「Suno 生成配乐」，配置 Gemini 和 Suno 模型，填写配乐要求后即可加入任务队列。软件按完整剧本策划一份整体配乐方案。目标时长可设置为 15–480 秒，配乐要求最多 1,000 个字符。实际音乐长度和结构由生成模型决定。
配乐要求示例：「前半段突出悬疑感，中段逐渐紧张，结尾转为温暖。以钢琴和弦乐为主，减少密集鼓点，为英文对白留出空间，使用纯音乐。」

2. 自动策划与提交
① 在本机提取 [EN] 英文台词；
② 将完整剧本交给 Gemini 分析并生成配乐方案；
③ 生成音乐标题、风格提示词及段落结构；
④ 将配乐方案提交到所选 Suno 服务；
⑤ 查询生成进度，获得可用音频；
⑥ 在已设置素材文件夹的情况下自动整理导出素材。

3. 批量队列与进度管理
可连续加入多份剧本，按顺序处理。任务区展示等待处理、Gemini 策划中、提示词就绪、提交中、生成中、已完成或需要处理等状态。支持暂停后续提交、查看任务信息、试听配乐、查看策划结果和再次导出素材。切换软件页面不会停止队列；关闭软件后保留任务记录，重新打开后继续查询已提交任务，新任务需点击开始队列。

4. 异常处理与继续编辑
查询暂停后可继续查询原任务。若提交结果不确定，可根据服务商记录填写任务 ID 恢复查询，核对提交情况后再决定是否重新提交。生成完成的配乐方案可导入「音乐」页面，继续修改风格或结构。`
      },
      {
        num: "08",
        title: "八、Suno 音乐自定义创作",
        desc: `1. 两种创作方式
• 「灵感描述」：适合用自然语言描述想要的音乐，描述最多支持 3,000 个字符。
• 「自定义创作」：适合分别设置音乐风格、歌词和段落结构，对作品的编排提出更明确的要求。

2. 风格与声音设置
• 自定义音乐风格最多支持 1,000 个字符，可描述流派、情绪、速度、乐器、音色和演奏方式。
• 内置流行、摇滚、电子、电影、爵士、古典、嘻哈、乡村、R&B、民谣等快捷标签。
• 支持纯音乐和人声歌曲两种声音设定；人声偏好可选择女声、男声、男女对唱、合唱或由模型决定。
• 作品标题最多 80 个字符，留空时自动补全。

3. 音乐结构编排与模板
可添加、删除、上移和下移段落，最多编排 24 个段落（前奏、主歌、预副歌、副歌、桥段、器乐间奏、独奏、渐强、高潮、停顿、尾奏、结束及自定义标签）。提供流行歌曲、电子／舞曲和电影配乐三种结构模板。支持在「段落编排」与「歌词 / 标签」之间切换，歌词与结构标签合计最多 5,000 个字符。

4. 预览、生成与作品管理
提交前可查看标题、风格及完整结构预览，也可复制提示词（支持 Ctrl + Enter 快捷提交）。生成后在「我的作品」中查看任务状态、试听、打开音频及下载歌曲。音乐页在本机保留草稿与最近 100 次创作记录。`
      },
      {
        num: "09",
        title: "九、本地文件夹与剪映素材导出",
        desc: `1. 自定义音乐缓存文件夹
在「音乐 → 本地文件设置」中选择缓存文件夹，将音乐页的草稿与任务记录保存到该目录（此缓存是音乐创作记录，不等同于歌曲文件下载）。

2. 自定义歌曲下载文件夹
可单独设置歌曲下载位置。生成结果有可用音频后，点击「下载歌曲」保存到该目录，并查看保存结果。

3. 自定义剪映素材文件夹
在工作空间选择剪映素材导出目录。每份剧本单独建立素材子文件夹，保存配乐、英文台词、配乐方案或匹配说明，以及素材清单。使用本地音乐时复制所选配乐，不移动原文件。导出失败后可从任务区重试，无需因为文件保存失败而重新生成音乐。导出的台词可用于剪映文稿匹配，音频可导入剪映时间轴。`
      },
      {
        num: "10",
        title: "十、剪映标点保留辅助",
        desc: `工作空间内置「剪映 · 标点保留」，根据 JianYing-Period-Keeper 项目集成，帮助减少剪映文稿处理时句号与逗号丢失的问题。

1. 兼容性检测与开关
可检测剪映是否启动、是否进入草稿编辑页面，以及当前编辑引擎是否存在兼容规则。功能默认关闭，由用户手动开启。
推荐操作：打开剪映草稿 → 检测兼容性 → 开启标点保留 → 查看生效状态 → 使用文稿匹配。
关闭开关或正常退出小马剪辑台时会尝试恢复本次修改；若提示恢复失败，可关闭并重新打开剪映。

2. 保护标点并复制
可将当前英文台词中的相关标点转换为外观相近的保护字符，再复制到剪映。该操作只在点击按钮时执行，不监控剪贴板。普通「复制全部」和 TXT 导出继续使用标准英文标点。`
      },
      {
        num: "11",
        title: "十一、批量添加样片水印",
        desc: `左侧第五项「加样片水印」内嵌了基于 watermarker 项目集成的处理工具。

1. 文件与水印选择
支持拖入或选择一个、多个本地视频。待处理列表可移除单个视频或清空列表。可选择 PNG、JPEG、WebP 水印图片，查看水印预览，也可恢复默认水印。

2. 处理设置
• 默认提供 FFmpeg WASM 兼容模式，并可选择 WebAV 硬件加速。
• 支持高、中、低画质选择，兼顾输出体积与画质。
• FFmpeg 模式下可根据环境选择自动多核或指定线程数。
• 提供音频智能直拷和强制转码为 AAC 的选项，显示处理进度、结果和错误提示。

3. 本地输出
视频在本机处理，无需上传至 AI 服务。输出为 MP4 样片，文件名带「样片」标识，默认保存到系统下载目录，并在页面保留成品下载入口。`
      },
      {
        num: "12",
        title: "十二、11 款全局主题与界面整理",
        desc: `在「工作空间 → 界面与主题」中切换外观，主题会自动保存并应用到全部五个页面与弹窗：
• 曜石信号：深色底，荧光绿点缀
• iOS 柔和：浅色底，天空蓝与圆润控件
• 极光玻璃：蓝紫渐变，通透层次
• 石墨极简：黑白灰，简洁低调
• 深海蓝：海军蓝，青色微光
• 暗红绒夜：酒红深底，玫瑰暖光
• 午夜暗蓝：墨蓝深底，冷色点缀
• 暮色暗紫：烟紫深底，柔和微光
• 松影墨绿：松绿深底，自然低调
• 抹茶花园：奶油白，清新草绿
• 日落蜜桃：暖白底，柔和珊瑚色

剧本配乐、英文台词、本地配乐、标点工具及主题选择区均可按需收起，便于集中处理当前工作。`
      },
      {
        num: "13",
        title: "十三、两条常用操作流程",
        desc: `【流程 A：使用现有音乐】
1. 配置可用的 Gemini 模型。
2. 粘贴完整剧本，检查自动提取的英文台词。
3. 保持「本地音乐匹配」模式，连接音乐文件夹。
4. 填写配乐要求，点击 Gemini 分析匹配。
5. 查看推荐理由并试听，选择合适音乐。
6. 设置素材文件夹，导出配乐与台词。
7. 将素材导入剪映，继续剪辑和时间轴对齐。

【流程 B：生成新的配乐】
1. 配置可用的 Gemini 和 Suno 模型。
2. 粘贴完整剧本，切换「Suno 生成配乐」。
3. 设置目标时长、配乐要求和素材导出目录。
4. 点击「一键生成配乐」，或将多份剧本加入队列后统一开始。
5. 等待分析、提示词生成、Suno 生成及素材导出。
6. 试听结果；需要调整时，将配乐方案导入音乐页继续编辑。
7. 在剪映中使用导出的台词和音频，完成成片后可回到软件批量添加样片水印。`
      },
      {
        num: "14",
        title: "十四、安装、换电脑与数据保留",
        desc: `• 运行环境：软件采用 Windows 64 位安装包，自带运行环境，无需另外安装 Node.js、Python 或 FFmpeg（Windows 11 已完成实机验收，Windows 10 属于运行时支持范围）。
• 换电脑迁移：换电脑时复制安装包并重新安装，再配置模型连接、音乐库和本地文件夹。原电脑的 API 密钥、剧本、历史记录和音乐文件不会随安装包自动迁移。
• 升级与卸载：同一电脑升级时应先退出程序，使用安装包覆盖既有安装目录。程序保留个人配置与历史；卸载保留个人数据和用户额外文件。`
      },
      {
        num: "15",
        title: "十五、当前功能范围",
        desc: `小马剪辑台已串联剧本整理、英文台词提取、AI 配乐策划、本地音乐推荐、Suno 音乐生成和素材导出，并提供剪映标点辅助及样片水印处理。

当前仍需在剪映中完成素材导入、配音或字幕时间轴对齐、镜头编排和成片输出。标题推荐依赖音乐命名信息；音乐生成的时长、结构及音色依赖模型结果。

英文台词提取、音乐库扫描、已有本地素材的处理及样片水印可在本机完成；AI 剧情分析、音乐推荐和新音乐生成需要相应在线服务。

💡 需要 Suno API，可联系小马获取。`
      }
    ]
  }
};

const state = {
  projects: JSON.parse(JSON.stringify(DEFAULT_METADATA)),
  activeMirrors: {
    "jianying-ai-pro": "ghfast",
    "jianying-period-keeper": "ghfast",
    "xiaoma-editor": "ghfast"
  },
  uploadTargetProject: "xiaoma-renamer"
};

document.addEventListener("DOMContentLoaded", () => {
  renderProjectCards();
  fetchLatestReleases();
  setupEventListeners();
});

function formatTime(isoString) {
  if (!isoString) return "--";
  try {
    const d = new Date(isoString);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hr = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}.${m}.${day} ${hr}:${min}`;
  } catch (e) {
    return isoString;
  }
}

function getAcceleratedUrl(rawUrl, mirrorId) {
  if (!rawUrl) return "#";
  const mirror = MIRROR_PROVIDERS.find(m => m.id === mirrorId) || MIRROR_PROVIDERS[0];
  return mirror.prefix + rawUrl;
}

function renderProjectCards() {
  updateCardDOM("jianying-ai-pro");
  updateCardDOM("jianying-period-keeper");
  updateCardDOM("xiaoma-renamer");
  updateCardDOM("xiaoma-editor");
}

function updateCardDOM(projectId) {
  const data = state.projects[projectId];
  if (!data) return;

  const verEl = document.getElementById(`ver-${projectId}`);
  const timeEl = document.getElementById(`time-${projectId}`);
  const btnEl = document.getElementById(`btn-download-${projectId}`);

  if (verEl) verEl.textContent = data.version || "--";
  if (timeEl) timeEl.textContent = formatTime(data.updatedAt);

  if (btnEl) {
    if (projectId === "xiaoma-renamer") {
      btnEl.href = data.downloadUrl;
      btnEl.setAttribute("download", data.fileName || "XiaoMa-Renamer.zip");
    } else {
      const activeMirror = state.activeMirrors[projectId] || "ghfast";
      btnEl.href = getAcceleratedUrl(data.downloadUrl, activeMirror);
    }
  }
}

async function fetchLatestReleases() {
  fetchGitHubRelease("JianYing-AI-Pro", "jianying-ai-pro");
  fetchGitHubRelease("JianYing-Period-Keeper", "jianying-period-keeper");
  fetchGitHubRelease("KDHRBm/XM-Editing-Studio", "xiaoma-editor");
  fetchXiaoMaLatest("/api/xiaoma/latest", "xiaoma-renamer");
}

async function fetchGitHubRelease(repoName, projectId) {
  try {
    const fullRepo = repoName.includes("/") ? repoName : `Kirota233/${repoName}`;
    let res = await fetch(`/api/releases/github?repo=${encodeURIComponent(repoName)}`).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch(`https://api.github.com/repos/${fullRepo}/releases/latest`, {
        headers: { Accept: "application/vnd.github.v3+json" }
      }).catch(() => null);
    }
    if (!res || !res.ok) return;

    const data = await res.json();
    if (data && data.tag_name) {
      state.projects[projectId].version = data.tag_name;
      state.projects[projectId].updatedAt = data.published_at || data.created_at;

      if (data.assets && data.assets.length > 0) {
        // 优先选择 .exe 安装包，其次选择非源码 .zip，最后兜底第一个附件
        const preferredAsset =
          data.assets.find(a => /\.exe$/i.test(a.name)) ||
          data.assets.find(a => /\.(msi|dmg|pkg)$/i.test(a.name)) ||
          data.assets.find(a => /\.zip$/i.test(a.name) && !/source/i.test(a.name)) ||
          data.assets[0];
        state.projects[projectId].downloadUrl = preferredAsset.browser_download_url;
        state.projects[projectId].fileName = preferredAsset.name;
      }
      updateCardDOM(projectId);
    }
  } catch (err) {
    console.warn(`[Auto-fetch fallback] ${projectId}:`, err);
  }
}

async function fetchXiaoMaLatest(apiUrl = "/api/xiaoma/latest", projectId = "xiaoma-renamer") {
  try {
    const res = await fetch(apiUrl).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.version && state.projects[projectId]) {
        state.projects[projectId].version = data.version;
        state.projects[projectId].updatedAt = data.updatedAt;
        state.projects[projectId].downloadUrl = data.downloadUrl;
        state.projects[projectId].fileName = data.fileName;
        updateCardDOM(projectId);
      }
    }
  } catch (err) {}
}

// ----------------------------------------------------------------------------
// Windows 版本环境与 WebView2 提示检测
// ----------------------------------------------------------------------------
const WEBVIEW2_BOOTSTRAPPER_URL = "https://go.microsoft.com/fwlink/p/?LinkId=2124703";
const WV2_DISMISSED_KEY = "taiki_wv2_notice_dismissed";

async function isWindows10Environment() {
  if (typeof navigator === "undefined") return false;

  // 1. 优先使用现代 Client Hints API 获取 Windows 精确内核主版本
  if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === "function") {
    try {
      const hints = await navigator.userAgentData.getHighEntropyValues(["platform", "platformVersion"]);
      if (hints.platform === "Windows") {
        const major = parseInt((hints.platformVersion || "").split(".")[0], 10);
        // Chromium 规范：Windows 11 platformVersion >= 13.0.0 (Build 22000+)
        // Windows 10 platformVersion 为 1-10 范围 (如 10.0.0 或 0.x.x)
        if (!isNaN(major)) {
          return major < 13;
        }
      }
    } catch (_) {}
  }

  // 2. 回退传统 User-Agent 检测
  const ua = navigator.userAgent || "";
  const isWindows = /Windows NT/i.test(ua);
  const isWin10UA = /Windows NT 10\.0/i.test(ua);

  // 传统 UA 中 Win10 与 Win11 均显示 Windows NT 10.0，若未走通 Client Hints 则在 Windows 下偏向防护
  return isWindows && isWin10UA;
}

function showWebView2AlertPanel(cardEl, originalDownloadUrl, originalFileName) {
  if (!cardEl) return;

  // 移除已有提示层避免重复叠加
  const existingOverlay = cardEl.querySelector(".webview2-panel-overlay");
  if (existingOverlay) existingOverlay.remove();

  cardEl.classList.add("webview2-alert-active");

  const overlay = document.createElement("div");
  overlay.className = "webview2-panel-overlay";
  overlay.innerHTML = `
    <div class="wv2-alert-top">
      <span>[SYSTEM COMPATIBILITY]</span>
      <button type="button" class="wv2-alert-close" title="取消">✕</button>
    </div>
    <div class="wv2-alert-body">
      <div class="wv2-alert-title">需要 WebView2 运行时</div>
      <div class="wv2-alert-desc">
        检测到您的系统可能为 <strong>Windows 10</strong>。<br>
        本程序基于现代 UI 构建，若系统未预装 <strong>Microsoft Edge WebView2</strong> 将无法启动。<br>
        建议先安装官方微型运行时（约 2MB，即装即用）。
      </div>
    </div>
    <div class="wv2-alert-actions">
      <a href="${WEBVIEW2_BOOTSTRAPPER_URL}" class="btn-wv2-download" target="_blank" rel="noopener">
        ↓ 1. 下载官方 WebView2 运行时
      </a>
      <button type="button" class="btn-wv2-skip">
        ✓ 2. 我已安装，继续下载本程序
      </button>
    </div>
  `;

  const closeAlert = () => {
    overlay.remove();
    cardEl.classList.remove("webview2-alert-active");
  };

  overlay.querySelector(".wv2-alert-close").addEventListener("click", closeAlert);

  overlay.querySelector(".btn-wv2-download").addEventListener("click", () => {
    try { localStorage.setItem(WV2_DISMISSED_KEY, "true"); } catch (_) {}
    // 用户点击下载 WebView2 之后，延时 1 秒继续触发原程序的下载
    setTimeout(() => {
      triggerDirectDownload(originalDownloadUrl, originalFileName);
      closeAlert();
    }, 1200);
  });

  overlay.querySelector(".btn-wv2-skip").addEventListener("click", () => {
    try { localStorage.setItem(WV2_DISMISSED_KEY, "true"); } catch (_) {}
    triggerDirectDownload(originalDownloadUrl, originalFileName);
    closeAlert();
  });

  cardEl.appendChild(overlay);
}

function triggerDirectDownload(url, fileName) {
  const a = document.createElement("a");
  a.href = url;
  if (fileName) a.setAttribute("download", fileName);
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function bindWindows10DownloadGuard() {
  document.querySelectorAll(".item-card").forEach(card => {
    const btn = card.querySelector(".btn-primary");
    if (!btn) return;

    btn.addEventListener("click", async (e) => {
      // 检查用户是否已经跳过/确认过 WebView2 提示
      let dismissed = false;
      try {
        dismissed = localStorage.getItem(WV2_DISMISSED_KEY) === "true";
      } catch (_) {}

      if (dismissed) return; // 已确认过直接放行正常下载

      const isWin10 = await isWindows10Environment();
      if (isWin10) {
        e.preventDefault();
        e.stopPropagation();
        const currentUrl = btn.href;
        const fileName = btn.getAttribute("download") || "";
        showWebView2AlertPanel(card, currentUrl, fileName);
      }
    });
  });
}

function setupEventListeners() {
  // 加速节点下拉切换
  ["jianying-ai-pro", "jianying-period-keeper", "xiaoma-editor"].forEach(id => {
    const selector = document.getElementById(`mirror-select-${id}`);
    if (selector) {
      selector.addEventListener("change", (e) => {
        state.activeMirrors[id] = e.target.value;
        updateCardDOM(id);
      });
    }
  });

  // 使用说明按钮
  document.querySelectorAll("[data-open-manual]").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-open-manual");
      openGuideModal(projectId);
    });
  });

  // 开发者上传按钮 (支持多个工具卡片)
  document.querySelectorAll("[data-upload-project]").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.getAttribute("data-upload-project") || "xiaoma-renamer";
      openUploadModal(projectId);
    });
  });

  // 关闭弹窗
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });

  // 选项卡切换
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab-target");
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.toggle("active", t === tab));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.toggle("active", p.id === targetId));
    });
  });

  setupUploadHandlers();
  bindWindows10DownloadGuard();
}

function openGuideModal(projectId) {
  const guide = GUIDE_DATA[projectId];
  if (!guide) return;

  const modal = document.getElementById("guide-modal");
  document.getElementById("guide-modal-category").textContent = guide.category;
  document.getElementById("guide-modal-title").textContent = guide.title;

  // 渲染视频播放器；若无视频教程则彻底隐藏「视频演示」选项卡
  const videoTabBtn = document.querySelector(".tab-btn[data-tab-target='tab-guide-video']");
  const videoPane = document.getElementById("tab-guide-video");

  if (guide.videoUrl) {
    if (videoTabBtn) videoTabBtn.style.display = "";
    videoPane.innerHTML = `
      <div class="video-box">
        <video class="video-player" controls preload="metadata">
          <source src="${guide.videoUrl}" type="video/mp4">
          您的浏览器不支持 HTML5 视频播放。
        </video>
      </div>
      <p style="margin-top:0.75rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-light); text-align:center;">
        ${guide.videoHint || "视频教程"}
      </p>
    `;
  } else {
    if (videoTabBtn) videoTabBtn.style.display = "none";
    videoPane.innerHTML = "";
  }

  // 渲染图文步骤
  const stepsContainer = document.getElementById("guide-steps-container");
  stepsContainer.innerHTML = guide.steps.map(s => {
    let mediaHtml = "";
    if (s.img) {
      mediaHtml = `
        <div class="step-img-box">
          <img src="${s.img}" alt="${s.title}" loading="lazy">
        </div>`;
    } else if (s.images && s.images.length > 0) {
      mediaHtml = `
        <div class="subimages-grid">
          ${s.images.map(sub => `
            <div class="subimage-item">
              <span class="subimage-label">${sub.label}</span>
              <img src="${sub.src}" alt="${sub.label}" loading="lazy">
            </div>
          `).join("")}
        </div>`;
    } else if (s.placeholder) {
      mediaHtml = `
        <div class="step-img-placeholder">
          <span>${s.placeholder}</span>
        </div>`;
    }

    let promptHtml = "";
    if (s.promptText) {
      promptHtml = `
        <div class="prompt-box">
          <div class="prompt-header">
            <span>【提取台词 AI 提示词】</span>
            <button type="button" class="btn-copy-prompt" onclick="copyPromptText(this)">📋 一键复制提示词</button>
          </div>
          <pre class="prompt-pre"><code id="prompt-code-block">${s.promptText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        </div>
      `;
    }

    return `
      <div class="step-card">
        <div class="step-number">STEP ${s.num}</div>
        <div class="step-title">${s.title}</div>
        <p class="step-text">${s.desc}</p>
        ${promptHtml}
        ${mediaHtml}
      </div>
    `;
  }).join("");

  // 默认切换到第一张选项卡
  const firstTab = document.querySelector(".tab-btn[data-tab-target='tab-guide-steps']");
  if (firstTab) firstTab.click();

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// 复制提示词辅助函数
window.copyPromptText = function(btn) {
  const codeBlock = document.getElementById("prompt-code-block");
  if (!codeBlock) return;
  const text = codeBlock.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "✓ 已复制到剪贴板！";
    btn.style.background = "var(--accent)";
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
    }, 2000);
  }).catch(() => {
    alert("复制失败，请手动划选文本复制。");
  });
};

function openUploadModal(projectId = "xiaoma-renamer") {
  state.uploadTargetProject = projectId;
  const modal = document.getElementById("upload-modal");
  const form = document.getElementById("upload-release-form");
  if (form) form.reset();

  const badgeEl = document.getElementById("upload-modal-badge");
  const titleEl = document.getElementById("upload-modal-title");
  if (projectId === "xiaoma-editor") {
    if (badgeEl) badgeEl.textContent = "05 // 小马剪辑台 · 开发者分发中心";
    if (titleEl) titleEl.textContent = "上传新版本程序包（小马剪辑台）";
  } else {
    if (badgeEl) badgeEl.textContent = "03 // 重命名工具 · 开发者分发中心";
    if (titleEl) titleEl.textContent = "上传新版本程序包（重命名工具）";
  }

  const fileInfo = document.getElementById("dropzone-file-info");
  const progressBox = document.getElementById("upload-progress-box");
  const progressFill = document.getElementById("upload-progress-fill");
  const submitBtn = document.getElementById("btn-submit-upload");

  if (fileInfo) { fileInfo.style.display = "none"; fileInfo.textContent = ""; }
  if (progressBox) progressBox.style.display = "none";
  if (progressFill) progressFill.style.width = "0%";
  if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "↑ 确认上传并发布新版"; }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  document.body.style.overflow = "";
}

function setupUploadHandlers() {
  const dropzone = document.getElementById("upload-dropzone");
  const fileInput = document.getElementById("upload-file-input");
  const fileInfo = document.getElementById("dropzone-file-info");
  const form = document.getElementById("upload-release-form");

  if (!dropzone || !fileInput || !form) return;

  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--accent)";
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.style.borderColor = "var(--border-dark)";
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--border-dark)";
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      displaySelected(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files.length > 0) {
      displaySelected(fileInput.files[0]);
    }
  });

  function displaySelected(f) {
    fileInfo.style.display = "block";
    fileInfo.textContent = `已选文件: ${f.name} (${(f.size / 1024 / 1024).toFixed(2)} MB)`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    const version = document.getElementById("input-upload-version").value.trim();
    const notes = document.getElementById("input-upload-notes").value.trim();
    const token = "xiaoma2026"; // 内置鉴权密钥，无需手动输入

    if (!file || !version) {
      alert("请填写完整信息（文件与版本号）！");
      return;
    }

    const progressBox = document.getElementById("upload-progress-box");
    const progressFill = document.getElementById("upload-progress-fill");
    const statusMsg = document.getElementById("upload-status-msg");
    const percentText = document.getElementById("upload-percent-text");
    const submitBtn = document.getElementById("btn-submit-upload");

    progressBox.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.textContent = "正在上传中...";

    const targetProject = state.uploadTargetProject || "xiaoma-renamer";
    const apiProjectKey = targetProject === "xiaoma-editor" ? "xiaoma-editor" : "xiaoma";

    // 大文件 (>50MB) 自动采用 R2 分片上传，突破 Cloudflare 100MB 单次请求限制
    const CHUNK_SIZE = 50 * 1024 * 1024;
    if (file.size > CHUNK_SIZE) {
      try {
        statusMsg.textContent = "正在初始化分片传输...";
        const initRes = await fetch("/api/upload?action=mpu-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token
          },
          body: JSON.stringify({
            project: apiProjectKey,
            fileName: file.name,
            contentType: file.type || "application/octet-stream",
            version: version
          })
        });
        if (!initRes.ok) {
          throw new Error(await initRes.text());
        }
        const { uploadId, key } = await initRes.json();

        const totalParts = Math.ceil(file.size / CHUNK_SIZE);
        const parts = [];

        for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
          const start = (partNumber - 1) * CHUNK_SIZE;
          const end = Math.min(start + CHUNK_SIZE, file.size);
          const chunk = file.slice(start, end);

          const partInfo = await new Promise((resolve, reject) => {
            const partXhr = new XMLHttpRequest();
            partXhr.open("POST", `/api/upload?action=mpu-part&uploadId=${encodeURIComponent(uploadId)}&key=${encodeURIComponent(key)}&partNumber=${partNumber}`);
            partXhr.setRequestHeader("x-admin-token", token);
            partXhr.setRequestHeader("Content-Type", "application/octet-stream");

            partXhr.upload.onprogress = (ev) => {
              if (ev.lengthComputable) {
                const totalLoaded = start + ev.loaded;
                const pct = Math.min(99, Math.round((totalLoaded / file.size) * 100));
                progressFill.style.width = pct + "%";
                percentText.textContent = pct + "%";
                statusMsg.textContent = `分片上传中 (${partNumber}/${totalParts}) - ${(totalLoaded / 1024 / 1024).toFixed(1)}MB / ${(file.size / 1024 / 1024).toFixed(1)}MB`;
              }
            };

            partXhr.onload = () => {
              if (partXhr.status >= 200 && partXhr.status < 300) {
                resolve(JSON.parse(partXhr.responseText));
              } else {
                reject(new Error(partXhr.responseText || `分片 ${partNumber} 上传失败`));
              }
            };
            partXhr.onerror = () => reject(new Error(`分片 ${partNumber} 网络中断`));
            partXhr.send(chunk);
          });

          parts.push(partInfo);
        }

        statusMsg.textContent = "正在合并文件并更新记录...";
        const compRes = await fetch("/api/upload?action=mpu-complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token
          },
          body: JSON.stringify({
            uploadId,
            key,
            parts,
            project: apiProjectKey,
            version,
            fileName: file.name,
            fileSize: file.size,
            notes
          })
        });

        if (!compRes.ok) {
          throw new Error(await compRes.text());
        }
        const resp = await compRes.json();

        progressFill.style.width = "100%";
        percentText.textContent = "100%";
        statusMsg.textContent = "✓ 上传成功并已更新分发记录！";

        state.projects[targetProject].version = version;
        state.projects[targetProject].fileName = file.name;
        state.projects[targetProject].updatedAt = new Date().toISOString();
        state.projects[targetProject].downloadUrl = resp.downloadUrl || `/download/${apiProjectKey}/${encodeURIComponent(file.name)}`;
        updateCardDOM(targetProject);

        setTimeout(() => {
          alert(`上传成功！版本 ${version} (${file.name}) 已发布。`);
          closeAllModals();
        }, 600);
      } catch (err) {
        alert("分片上传失败: " + err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = "↑ 重新尝试上传";
      }
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", version);
    formData.append("notes", notes);
    formData.append("project", apiProjectKey);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    xhr.setRequestHeader("x-admin-token", token);

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        const pct = Math.round((ev.loaded / ev.total) * 100);
        progressFill.style.width = pct + "%";
        percentText.textContent = pct + "%";
        statusMsg.textContent = `正在上传 (${(ev.loaded / 1024 / 1024).toFixed(1)}MB / ${(ev.total / 1024 / 1024).toFixed(1)}MB)`;
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let resp = {};
        try { resp = JSON.parse(xhr.responseText); } catch (e) {}

        progressFill.style.width = "100%";
        percentText.textContent = "100%";
        statusMsg.textContent = "✓ 上传成功并已更新分发记录！";

        state.projects[targetProject].version = version;
        state.projects[targetProject].fileName = file.name;
        state.projects[targetProject].updatedAt = new Date().toISOString();
        state.projects[targetProject].downloadUrl = resp.downloadUrl || `/download/${apiProjectKey}/${encodeURIComponent(file.name)}`;
        updateCardDOM(targetProject);

        setTimeout(() => {
          alert(`上传成功！版本 ${version} (${file.name}) 已发布。`);
          closeAllModals();
        }, 600);
      } else {
        let err = xhr.responseText;
        try { err = JSON.parse(xhr.responseText).error || err; } catch (e) {}
        alert("上传失败: " + err);
        submitBtn.disabled = false;
        submitBtn.textContent = "↑ 重新尝试上传";
      }
    };

    xhr.onerror = () => {
      alert("网络传输中断，请确认 Worker 是否在线或密钥是否匹配。");
      submitBtn.disabled = false;
      submitBtn.textContent = "↑ 重新尝试上传";
    };

    xhr.send(formData);
  });
}
