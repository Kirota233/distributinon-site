# 软件分发镜像站 (Cloudflare Pages + R2 极简版)

> 遵循 **瑞士国际主义平面设计风格** 的极简软件分发镜像站。  
> 原生兼容 **Cloudflare Pages (Git 直连一键构建)** 与 **Cloudflare Workers**。

---

## 🚀 方式一：直接在 Cloudflare Pages 绑定 Git 仓库构建（最推荐）

您把当前项目推送到 GitHub 仓库后，可以直接在 Cloudflare Pages 面板一键托管！

### 1. Cloudflare Pages 构建设置
在 Cloudflare 控制台 -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**，选择您的仓库：
- **Framework preset (框架预设)**: `None`
- **Build command (构建命令)**: 留空（无需任何编译命令）
- **Build output directory (构建输出目录)**: `public`
- 点击 **Save and Deploy** 即可完成首次上线。

---

## 🛠️ 如何配置让「上传新版本」功能生效？（只需 2 步）

前端的「上传新版本程序包」按钮直通 **Cloudflare R2 对象存储**，要使上传生效，只需在 Cloudflare 控制台做以下两项配置：

### 第一步：创建 R2 存储桶
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2. 进入左侧导航栏的 **R2** -> 点击 **创建存储桶 (Create bucket)**。
3. 输入存储桶名称（例如：`xiaoma-releases`），其他选项保持默认，点击创建。

### 第二步：在 Pages 中绑定 R2 存储桶与设置密钥
1. 回到 Cloudflare 控制台 -> 进入 **Workers & Pages** -> 点击刚才创建的 Pages 项目。
2. 点击上方的 **设置 (Settings)** 选项卡：
   - **绑定 R2 存储桶**：
     - 点击左侧 **Functions (函数)**。
     - 找到 **R2 bucket bindings (R2 存储桶绑定)** 区域，点击 **Add binding (添加绑定)**。
     - **Variable name (变量名)**：填写 `RELEASES_BUCKET` *(必须全大写且一致)*。
     - **R2 bucket (存储桶)**：下拉选择您刚才创建的 `xiaoma-releases`。
     - 点击保存。
   - **设置开发者上传密钥 (密码)**：
     - 点击左侧 **Environment variables (环境变量)**。
     - 点击 **Add variable (添加变量)**。
     - **Variable name (变量名)**：填写 `ADMIN_TOKEN`。
     - **Value (值)**：输入您自定义的密码（例如：`xiaoma888`）。
     - 点击保存。
3. **重新部署一次使其生效**：
   - 点击上方的 **Deployments (部署)** 选项卡。
   - 在最新的部署记录右侧点击 `...` -> 选择 **Retry deployment (重试部署)**。

---

## 🎉 测试上传与分发

1. 打开 Cloudflare Pages 分配的域名（例如 `https://xxx.pages.dev`）。
2. 在第 3 个项目「小马做的重命名工具」旁点击 **`↑ 上传新版本程序包`**。
3. 拖入或选择您的安装包（如 `.zip`、`.exe`），填入版本号（如 `v1.2.1`）以及您刚才设置的 `ADMIN_TOKEN` 密码。
4. 点击上传，文件将通过 Cloudflare 全球网络流式存入 R2，上传完成后页面会自动更新为最新版本，用户点击 **`↓ 下载最新分发版`** 即可直接下载！

---

## 💻 本地预览
```bash
node dev-server.js
```
浏览器打开 `http://localhost:8787` 即可在本地测试。本地内置的默认演示测试密钥为 `xiaoma123456`。
