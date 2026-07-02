# 北屿营造设计工作室静态官网

这是一个可部署到 GitHub Pages 的完整静态网站项目。入口文件保留为 `index.html`，样式位于 `assets/css/styles.css`，交互与 mock 数据位于 `assets/js/app.js`。

## 正式维护方式

本项目采用“GitHub 静态站 + 手动维护素材路径”。

GitHub Pages 不能在线写入仓库，也不连接数据库、服务器或对象存储。图片、GIF、视频、GLB、PDF 等正式素材需要先手动上传到 GitHub 仓库的 `assets` 目录，再进入后台填写相对路径。

后台保存会写入当前浏览器的 `localStorage`，用于本机预览。要让所有访客看到更新，需要导出 JSON，并把更新后的数据和素材文件一起提交到 GitHub 仓库。

## 推荐目录

项目素材：

```text
assets/projects/p001-northern-wind-court/cover.jpg
assets/projects/p001-northern-wind-court/article-01.jpg
assets/projects/p001-northern-wind-court/article-02.gif
assets/projects/p001-northern-wind-court/walkthrough.mp4
assets/projects/p001-northern-wind-court/model.glb
assets/projects/p001-northern-wind-court/panorama.jpg
assets/projects/p001-northern-wind-court/drawings.pdf
```

板块背景：

```text
assets/backgrounds/home-bg.jpg
assets/backgrounds/works-bg.jpg
assets/backgrounds/research-bg.jpg
```

瓦当图标当前代码使用 `assets/images/watang.png`，项目中也兼容放置了 `assets/watang/watang.png`。

## 后台维护

点击右下角瓦当入口打开后台 overlay。

项目素材在“素材路径 / Asset Path Manager”中维护，支持：

- `coverImage`
- `gallery`
- `drawings`
- `model3d`
- `panorama`
- `video`
- `pdf`

多图字段一行一个路径。保存后会立即刷新当前浏览器中的前台展示，并保留在 `localStorage`。

“本地临时预览导入”只保存到当前浏览器 IndexedDB，用于临时看效果；更换设备、清理站点数据或换浏览器后会丢失。正式发布请使用 `assets/...` 相对路径。

## 文章块路径

完整项目文章页继续使用 `articleBlocks`：

```json
[
  { "type": "heading", "text": "设计命题" },
  { "type": "paragraph", "text": "本项目从北方高台建筑的体量感出发……" },
  {
    "type": "image",
    "asset": "assets/projects/p001-northern-wind-court/article-01.jpg",
    "caption": "入口空间效果图"
  },
  {
    "type": "gallery",
    "assets": [
      "assets/projects/p001-northern-wind-court/article-02.jpg",
      "assets/projects/p001-northern-wind-court/article-03.jpg"
    ],
    "caption": "空间序列"
  },
  {
    "type": "video",
    "asset": "assets/projects/p001-northern-wind-court/walkthrough.mp4",
    "caption": "空间漫游视频"
  },
  {
    "type": "pdf",
    "asset": "assets/projects/p001-northern-wind-court/drawings.pdf",
    "label": "查看完整图纸 PDF"
  },
  { "type": "model3d", "asset": "assets/projects/p001-northern-wind-court/model.glb" },
  { "type": "panorama", "asset": "assets/projects/p001-northern-wind-court/panorama.jpg" }
]
```

如果项目没有自定义 `articleBlocks`，前台会根据 `description`、`gallery`、`drawings`、`video`、`pdf`、`model3d`、`panorama` 自动生成默认文章。直接访问 `#project/p001` 可以打开完整项目文章。

## 板块背景

“板块背景 / Section Backgrounds”以路径方式维护，支持 `home` 在内的所有板块。填写路径后，背景图会垫在底层，原设计背景保留，并可调节：

- `imageOpacity`
- `designOpacity`
- `position`
- `blendMode`

没有填写背景路径时，原效果保持不变。

## 导入导出

后台支持：

- 导出 `projects JSON`
- 导出 `siteSettings JSON`
- 导出 `full-site-data JSON`
- 导入 `projects JSON`
- 导入 `siteSettings JSON`
- 导入 `full-site-data JSON`

导出的 JSON 只包含路径和数据，不包含素材文件。正式发布时，请确认素材文件已经提交到 GitHub 仓库。

## GitHub Pages 部署

上传整个项目到仓库根目录后，在 GitHub Pages 中选择对应分支和根目录部署。所有项目内引用都使用相对路径，适配：

```text
https://用户名.github.io/仓库名/
```

## 图片不显示排查

- 路径大小写是否与仓库文件完全一致；
- 文件是否真的提交到了 GitHub；
- 文件名是否包含空格或中文；
- GitHub Pages 是否已经完成部署；
- 是否误用了本机路径，如 `C:\...` 或 `file://...`；
- 是否把素材放在仓库外部；
- 如果页面部署在仓库子路径下，请继续使用 `assets/...` 这种相对路径，不要写 `/assets/...`。
