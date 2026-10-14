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
    videoHint: "此处为【JianYing-AI-Pro 演示视频】预留区域。\n您可在代码中将此处替换为 <video src=\"...\"> 或 Bilibili/YouTube iframe 嵌入代码。",
    steps: [
      {
        num: "01",
        title: "确认网络环境并启动工具",
        desc: "确认能访问外网（请勿使用香港 IP/节点），然后打开工具。",
        img: "tutorial/1/01_main_window_ready.png"
      },
      {
        num: "02",
        title: "输入 API Key 并配置模型",
        desc: "输入 API Key 并保存；选择一个模型（推荐使用新模型，如果报错可换成 3.5flash 等模型重试）。",
        img: "tutorial/1/02_settings_api_model.png"
      },
      {
        num: "03",
        title: "视频批量导出",
        desc: "① 第一次使用点击「引导录制 F8」，并按操作录制坐标，待显示「坐标已就绪」；\n② 打开剪映并将其窗口最大化，点击「AI 扫描首页草稿」；\n③ 识别到草稿后点击识别出的草稿名，点击「从选中项开始导出」。",
        images: [
          { label: "1. 引导录制坐标 (pic3)", src: "tutorial/1/03_guide_record_button.png" },
          { label: "2. 点击「AI 扫描首页草稿」 (pic4)", src: "tutorial/1/04_ai_scan_drafts_button.png" },
          { label: "3. 选中草稿并从选中项导出 (pic5)", src: "tutorial/1/05_select_and_export_draft.png" }
        ]
      },
      {
        num: "04",
        title: "字幕提取功能",
        desc: "① 首先从剪映云空间下载你需要导出的草稿（下载后请勿打开）；\n② 选择你需要导出的剪映草稿路径（注意：程序会处理该路径下的所有草稿！）；\n③ 点击「提取字幕 & 删除轨道 -> 桌面/srt」，程序将自动剔除草稿原字幕轨道，并将提取出的 SRT 字幕文件保存到桌面。",
        img: "tutorial/1/06_subtitle_extract.png"
      },
      {
        num: "05",
        title: "批量重命名",
        desc: "① 拖放或点击「选择文件」添加需要导出的文件（支持所有格式，包括字幕、视频、音频、图片等）；\n② 参考命名格式，填入需要修改的名称规则（例如：短剧名称_第X集）；\n③ 点击「AI 预览重命名」，在下方表格核对原文件名与新文件名无误后，点击「执行重命名」即可一键完成。",
        img: "tutorial/1/07_batch_rename.png"
      }
    ]
  },
  "jianying-period-keeper": {
    title: "JianYing-Period-Keeper 使用说明",
    category: "02 // PERIOD-KEEPER",
    videoHint: "此处为【剪映句读控制器 演示视频】预留区域。\n演示开启句号守卫到剪映字幕生成并保留标点的全过程。",
    steps: [
      {
        num: "01",
        title: "一键启用句号守护",
        desc: "打开 JianyingPeriodKeeper.exe，点击界面开关切换至 [ ON ] 守护状态。",
        placeholder: "【图片预留位 01】展示极简拨动开关 [ ON ] 状态"
      },
      {
        num: "02",
        title: "在剪映中正常识别字幕",
        desc: "切回剪映专业版，点击「文本 -> 智能字幕 -> 文稿匹配 / 语音识别」。",
        placeholder: "【图片预留位 02】展示剪映智能字幕识别面板"
      },
      {
        num: "03",
        title: "自动保留标点",
        desc: "识别完成后，原版被剥离的句号「。」与逗号「，」将被完整保留。",
        placeholder: "【图片预留位 03】展示字幕轨道保留句号对比截图"
      }
    ]
  },
  "xiaoma-renamer": {
    title: "重命名工具 使用说明",
    category: "03 // RENAMER",
    videoHint: "此处为【重命名工具 演示视频】预留区域。\n演示批量拖入文件、正则替换与一键重命名的操作流程。",
    steps: [
      {
        num: "01",
        title: "拖拽文件或文件夹",
        desc: "直接将待改名的多个文件或文件夹拖入程序主窗口。",
        placeholder: "【图片预留位 01】展示拖拽文件后的列表视图"
      },
      {
        num: "02",
        title: "配置重命名规则",
        desc: "支持选择：按序号重排、字符替换、前后缀插入、正则表达式提取等，右侧实时预览效果。",
        placeholder: "【图片预留位 02】展示规则设置与改名后效果实时对比"
      },
      {
        num: "03",
        title: "一键执行或撤销",
        desc: "核对预览无误后点击执行改名。如果不慎改错，支持一键撤销恢复原名。",
        placeholder: "【图片预留位 03】展示改名成功与撤销防错功能"
      }
    ]
  }
};

const state = {
  projects: JSON.parse(JSON.stringify(DEFAULT_METADATA)),
  activeMirrors: {
    "jianying-ai-pro": "ghfast",
    "jianying-period-keeper": "ghfast"
  }
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
  fetchXiaoMaLatest();
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

async function fetchXiaoMaLatest() {
  try {
    const res = await fetch("/api/xiaoma/latest").catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.version) {
        state.projects["xiaoma-renamer"].version = data.version;
        state.projects["xiaoma-renamer"].updatedAt = data.updatedAt;
        state.projects["xiaoma-renamer"].downloadUrl = data.downloadUrl;
        state.projects["xiaoma-renamer"].fileName = data.fileName;
        updateCardDOM("xiaoma-renamer");
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

  // 开发者上传按钮
  const uploadBtn = document.getElementById("btn-trigger-upload");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", openUploadModal);
  }

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
  document.getElementById("guide-video-hint").innerText = guide.videoHint;

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
    } else {
      mediaHtml = `
        <div class="step-img-placeholder">
          <span>${s.placeholder || "【图片预留位】"}</span>
        </div>`;
    }

    return `
      <div class="step-card">
        <div class="step-number">STEP ${s.num}</div>
        <div class="step-title">${s.title}</div>
        <p class="step-text">${s.desc}</p>
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

function openUploadModal() {
  const modal = document.getElementById("upload-modal");
  const form = document.getElementById("upload-release-form");
  if (form) form.reset();

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

  form.addEventListener("submit", (e) => {
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", version);
    formData.append("notes", notes);

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

        state.projects["xiaoma-renamer"].version = version;
        state.projects["xiaoma-renamer"].fileName = file.name;
        state.projects["xiaoma-renamer"].updatedAt = new Date().toISOString();
        state.projects["xiaoma-renamer"].downloadUrl = resp.downloadUrl || `/download/xiaoma/${encodeURIComponent(file.name)}`;
        updateCardDOM("xiaoma-renamer");

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
