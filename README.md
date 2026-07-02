# 北屿营造设计工作室官网原型

这是一个可直接打开预览的独立设计工作室官网原型，面向建筑设计、产品与器物设计、空间研究、3D 模型、360 全景、项目图纸与后期内容维护。

## 如何预览

直接用浏览器打开项目根目录中的 index.html 即可预览。

如果浏览器限制本地文件能力，也可以在任意静态服务器中打开当前目录。本原型不需要真实后端、数据库或构建工具。

## 文件结构

- index.html：单页网站结构，包含前台展示、项目弹窗，以及通过右下角瓦当入口打开的 Admin overlay。
- assets/css/styles.css：全站视觉系统、响应式布局、项目卡片、文字型卡片、弹窗、维护端样式。
- assets/js/app.js：站点数据、mock API、Canvas 动态背景、筛选、弹窗、模型台、全景模拟、Admin 交互。
- README.md：当前说明文件。

## 如何替换项目数据

项目数据集中在 assets/js/app.js 顶部的 projects 数组。每个项目包含：

- id
- titleCN
- titleEN
- category
- year
- location
- status
- material
- scale
- role
- concept
- description
- coverImage
- gallery
- drawings
- model3d
- panorama
- video
- pdf
- tags
- featured
- published

前台渲染会通过 fetchProjects 获取数据。新增、编辑、删除、发布切换由 createProject、updateProject、deleteProject、togglePublishStatus 统一处理。

## 如何替换素材路径

当前 coverImage 使用 abstract:ridge、abstract:plinth、abstract:vessel、abstract:grid、abstract:paper 这类抽象视觉键，便于在没有真实图片时保持设计感。

后期接入真实素材时，可以把字段替换成真实路径，例如：

- coverImage：项目封面图片路径
- gallery：项目图集路径数组
- drawings：图纸 PDF 或图片路径数组
- model3d：GLB 文件路径
- panorama：360 全景图路径
- video：视频路径
- pdf：项目 PDF 路径

如果项目没有 coverImage，前台会自动使用 text-only-card 案卷索引样式，不会出现空白图片框。

## mock API 在哪里

mock API 位于 assets/js/app.js，函数包括：

- fetchSiteSettings()
- updateSiteSettings(data)
- fetchNavigation()
- fetchProjects()
- fetchProjectById(id)
- createProject(data)
- updateProject(id, data)
- deleteProject(id)
- togglePublishStatus(id)
- uploadAsset(file, type, projectId)

这些函数当前使用浏览器内的本地 mock 数据和 Promise 模拟异步请求。项目与站点设置会写入 localStorage，刷新页面后保留 Admin 编辑结果。代码中已标注：后期可将这些 mock API 替换为真实数据库 API 和对象存储上传接口。

## Admin 维护入口

维护端不作为公开页面 section 出现，点击右下角克制的瓦当图标可打开案卷维护台 overlay。维护端已经补齐项目字段：status、material、scale、role、concept、coverImage、gallery、drawings、model3d、panorama、video、pdf。

素材上传区支持选择归属项目和素材类型，mock 上传后会写入对应项目字段；也支持查看当前素材列表、设为封面和删除素材。

数据管理支持：

- 一键重置 mock 数据
- 导出 projects JSON
- 导入 projects JSON
- 导出 siteSettings JSON
- 导入 siteSettings JSON

## 动效与性能

页面保留自然滚动，没有 fullpage 劫持。导航锚点使用自定义阻尼 smooth scroll；section 进入视口时会添加 is-visible / is-entering / is-passed 类，触发轻微 stagger 过渡。

全站新增一个固定 Canvas 的橙色火星系统，作为远处朝霞、余烬和熔光点缀。移动端会降低火星数量；prefers-reduced-motion 时关闭复杂运动，只保留基础视觉。

## 后期接入真实后台

建议保持前台调用函数名不变，只替换 mock API 内部实现：

1. 将 fetchSiteSettings、fetchNavigation、fetchProjects 改为请求真实 CMS 或数据库接口。
2. 将 createProject、updateProject、deleteProject、togglePublishStatus 改为真实管理端接口。
3. 将 uploadAsset(file, type) 改为对象存储上传流程，返回真实 URL。
4. Admin 区域可接入真实登录鉴权，但当前原型不包含真实鉴权逻辑。
5. 3D 模型台可在 loadModelViewer(project.model3d) 中替换为 `<model-viewer>` 或 Three.js。
6. 入此空间模块可在 loadPanoramaViewer(project.panorama) 中替换为 Pannellum 或 Photo Sphere Viewer。

## 设计说明

视觉方向为黑色沉浸数字高台、北方高古建筑气象、现代东方平面、年轻先锋设计工作室。传统元素只以抽象屋脊线、台基线、中轴线、瓦当圆标、朱砂发布印等现代化符号出现，避免古风拼贴和文旅展板感。
