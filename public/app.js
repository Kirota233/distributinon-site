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
    version: "v1.1.2",
    updatedAt: "2026-10-23T08:49:00Z",
    fileName: "小马剪辑台-1.1.2-Windows-x64-安装包.exe",
    fileSize: "115.9 MB",
    downloadUrl: "/download/xiaoma-editor/%E5%B0%8F%E9%A9%AC%E5%89%AA%E8%BE%91%E5%8F%B0-1.1.2-Windows-x64-%E5%AE%89%E8%A3%85%E5%8C%85.exe",
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
    title: "小马剪辑台 使用说明",
    category: "05 // XIAOMA-EDITOR",
    videoHint: "视频演示正在制作中，敬请期待...",
    steps: [
      {
        num: "01",
        title: "使用教程整理中",
        desc: "该工具的使用教程正在整理与录制中，敬请期待...",
        placeholder: "【教程整理中，暂留空】"
      }
    ]
  }
};

const state = {
  projects: JSON.parse(JSON.stringify(DEFAULT_METADATA)),
  activeMirrors: {
    "jianying-ai-pro": "ghfast",
    "jianying-period-keeper": "ghfast"
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
    if (projectId === "xiaoma-renamer" || projectId === "xiaoma-editor") {
      btnEl.href = data.downloadUrl;
      btnEl.setAttribute("download", data.fileName || "release.exe");
    } else {
      const activeMirror = state.activeMirrors[projectId] || "ghfast";
      btnEl.href = getAcceleratedUrl(data.downloadUrl, activeMirror);
    }
  }
}

async function fetchLatestReleases() {
  fetchGitHubRelease("JianYing-AI-Pro", "jianying-ai-pro");
  fetchGitHubRelease("JianYing-Period-Keeper", "jianying-period-keeper");
  fetchXiaoMaLatest("/api/xiaoma/latest", "xiaoma-renamer");
  fetchXiaoMaLatest("/api/xiaoma-editor/latest", "xiaoma-editor");
}

async function fetchGitHubRelease(repoName, projectId) {
  try {
    let res = await fetch(`/api/releases/github?repo=${encodeURIComponent(repoName)}`).catch(() => null);
    if (!res || !res.ok) {
      res = await fetch(`https://api.github.com/repos/Kirota233/${repoName}/releases/latest`, {
        headers: { Accept: "application/vnd.github.v3+json" }
      }).catch(() => null);
    }
    if (!res || !res.ok) return;

    const data = await res.json();
    if (data && data.tag_name) {
      state.projects[projectId].version = data.tag_name;
      state.projects[projectId].updatedAt = data.published_at || data.created_at;

      if (data.assets && data.assets.length > 0) {
        state.projects[projectId].downloadUrl = data.assets[0].browser_download_url;
        state.projects[projectId].fileName = data.assets[0].name;
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

function setupEventListeners() {
  // 加速节点下拉切换
  ["jianying-ai-pro", "jianying-period-keeper"].forEach(id => {
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
