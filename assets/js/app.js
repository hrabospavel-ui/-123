(function () {
  "use strict";

  var PUBLIC_SECTIONS = [
    { id: "home", labelCN: "首页", labelEN: "Home" },
    { id: "featured", labelCN: "精选作品", labelEN: "Featured" },
    { id: "works", labelCN: "作品总览", labelEN: "Works" },
    { id: "architecture", labelCN: "建筑", labelEN: "Architecture" },
    { id: "objects", labelCN: "器物", labelEN: "Objects" },
    { id: "research", labelCN: "研究", labelEN: "Research" },
    { id: "studio", labelCN: "营造", labelEN: "Studio" },
    { id: "contact", labelCN: "联系", labelEN: "Contact" }
  ];

  var ASSET_DB_NAME = "NorthernAtelierAssetDB";
  var ASSET_DB_VERSION = 1;
  var ASSET_STORE = "assets";
  var ASSET_ID_PREFIX = "asset_";

  var siteSettings = {
    studioName: "北屿营造",
    studioSeal: "北屿",
    taglineCN: "在黑色天幕中，重构北方高古的空间秩序。",
    taglineEN: "Northern Tectonics Reframed for Contemporary Space and Objects.",
    intro: "以建筑、器物、空间研究和数字模型为方法，把传统营造的秩序转译为当代生活与展示系统。",
    philosophy: "我们关注北方建筑的尺度、风、影、材料和秩序，也关注产品在手中被使用的瞬间。每个项目从线稿、模型、图纸和现场材料同时推进。",
    email: "hello@northern-atelier.example",
    portfolioPdf: "assets/portfolio/northern-atelier-portfolio.pdf",
    accentColor: "#536A63",
    sectionBackgrounds: createDefaultSectionBackgrounds()
  };

  var navigation = [
    { labelCN: "首页", labelEN: "Home", href: "#home" },
    { labelCN: "作品", labelEN: "Works", href: "#works" },
    { labelCN: "建筑", labelEN: "Architecture", href: "#architecture" },
    { labelCN: "器物", labelEN: "Objects", href: "#objects" },
    { labelCN: "研究", labelEN: "Research", href: "#research" },
    { labelCN: "营造", labelEN: "Studio", href: "#studio" },
    { labelCN: "联系", labelEN: "Contact", href: "#contact" },
    { labelCN: "维护", labelEN: "Admin", href: "#admin" }
  ];

  var projects = [
    {
      id: "p001",
      titleCN: "北台风庭",
      titleEN: "Northern Wind Court",
      category: "Architecture",
      year: "2026",
      location: "Hohhot",
      status: "Published",
      material: "brick, dark timber, glass, wind channel",
      scale: "1,850 sqm",
      role: "concept, spatial design, exhibition route",
      concept: "把台基、风廊和中轴线压缩成一座可行走的数字高台。",
      description: "项目从北方高台建筑的体量感出发，用暗色砖石、冷青光线和折线屋脊组织展陈路径，让空间像从黑色地平线中升起。",
      coverImage: "abstract:ridge",
      gallery: ["assets/mock/northern-wind-01.jpg"],
      drawings: ["assets/mock/northern-wind-plan.pdf"],
      model3d: "assets/models/northern-wind-court.glb",
      panorama: "assets/panorama/northern-wind-court.jpg",
      video: "",
      pdf: "assets/pdf/northern-wind-court.pdf",
      tags: ["中轴线", "台基", "展陈", "冷青光"],
      featured: true,
      published: true
    },
    {
      id: "p002",
      titleCN: "器物之山",
      titleEN: "Vessel Mountain Index",
      category: "Objects",
      year: "2026",
      location: "Beijing",
      status: "Prototype",
      material: "aluminum, ash wood, cyan glaze",
      scale: "object series",
      role: "product design, prototype direction",
      concept: "把山墙与瓦当转译成可握持、可陈列的器物比例。",
      description: "一组从山墙折线、瓦灰与青釉中生成的桌面器物，不追求仿古，而用当代加工方式保留北方器物的稳定和锋利。",
      coverImage: "abstract:vessel",
      gallery: ["assets/mock/vessel-mountain-01.jpg"],
      drawings: [],
      model3d: "assets/models/vessel-mountain.glb",
      panorama: "",
      video: "",
      pdf: "assets/pdf/vessel-mountain.pdf",
      tags: ["器物", "青釉", "瓦当", "产品"],
      featured: true,
      published: true
    },
    {
      id: "p003",
      titleCN: "黑穹模型台",
      titleEN: "Obsidian Model Platform",
      category: "Research",
      year: "2025",
      location: "Online Lab",
      status: "Published",
      material: "web canvas, GLB, point light",
      scale: "digital prototype",
      role: "interaction research, viewer prototype",
      concept: "让模型在加载前保持沉默，只在需要时展开。",
      description: "面向未来项目库的 3D 展示模块研究，默认不加载大型模型，点击后再进入模型台，以保证作品集首屏和列表体验轻盈。",
      coverImage: "abstract:grid",
      gallery: [],
      drawings: [],
      model3d: "assets/models/obsidian-platform.glb",
      panorama: "",
      video: "assets/video/model-platform.mp4",
      pdf: "",
      tags: ["3D", "GLB", "交互", "模型台"],
      featured: true,
      published: true
    },
    {
      id: "p004",
      titleCN: "塞上院落更新",
      titleEN: "Frontier Courtyard Renewal",
      category: "Architecture",
      year: "2025",
      location: "Datong",
      status: "Design Development",
      material: "gray brick, rammed earth, recycled wood",
      scale: "620 sqm",
      role: "renovation strategy, facade, interior",
      concept: "旧院落保留风口和阴影，新界面只做必要介入。",
      description: "以灰砖、夯土和木构为材料基础，保留院落的风道和尺度，通过现代平面和模块化构造减少历史符号堆叠。",
      coverImage: "abstract:plinth",
      gallery: ["assets/mock/frontier-courtyard-01.jpg"],
      drawings: ["assets/mock/frontier-courtyard-sections.pdf"],
      model3d: "",
      panorama: "assets/panorama/frontier-courtyard.jpg",
      video: "",
      pdf: "assets/pdf/frontier-courtyard.pdf",
      tags: ["更新", "灰砖", "院落", "360"],
      featured: false,
      published: true
    },
    {
      id: "p005",
      titleCN: "冷青扶手系统",
      titleEN: "Cangqing Rail System",
      category: "Objects",
      year: "2025",
      location: "Shanghai",
      status: "Prototype",
      material: "anodized aluminum, ash wood, leather",
      scale: "modular system",
      role: "industrial design, detail design",
      concept: "从斗拱的支撑逻辑抽出模块嵌套关系。",
      description: "一套面向展厅和住宅的扶手与展架系统，结构关系来自传统支撑系统，但外观保持低调、锋利和可量产。",
      coverImage: "",
      gallery: [],
      drawings: ["assets/mock/cangqing-rail-detail.pdf"],
      model3d: "assets/models/cangqing-rail.glb",
      panorama: "",
      video: "",
      pdf: "assets/pdf/cangqing-rail.pdf",
      tags: ["产品", "模块", "支撑", "金属"],
      featured: false,
      published: true
    },
    {
      id: "p006",
      titleCN: "入此空间：北境展厅",
      titleEN: "Enter Scene: Northern Gallery",
      category: "Space",
      year: "2024",
      location: "Beijing",
      status: "Published",
      material: "panorama, light scan, dark stone",
      scale: "immersive route",
      role: "spatial narrative, panorama prototype",
      concept: "把展厅入口变成一条从暗场进入光幕的路径。",
      description: "以 360 全景为核心的空间展示原型，用户先在暗场看到轴线和光幕，再进入可滑动的全景场景。",
      coverImage: "abstract:ridge",
      gallery: ["assets/mock/northern-gallery-01.jpg"],
      drawings: [],
      model3d: "",
      panorama: "assets/panorama/northern-gallery.jpg",
      video: "assets/video/northern-gallery.mp4",
      pdf: "",
      tags: ["360", "展厅", "光幕", "叙事"],
      featured: false,
      published: true
    },
    {
      id: "p007",
      titleCN: "瓦灰材料谱系",
      titleEN: "Tile Gray Material Atlas",
      category: "Research",
      year: "2024",
      location: "Material Lab",
      status: "Archive",
      material: "tile powder, mineral pigment, paper sample",
      scale: "material atlas",
      role: "material research, visual system",
      concept: "把瓦灰从历史材料转成现代设计色谱。",
      description: "研究瓦灰、木褐、冷青与朱砂在不同材质上的显色关系，输出适用于建筑界面、产品外壳和图册系统的材料索引。",
      coverImage: "abstract:paper",
      gallery: [],
      drawings: ["assets/mock/tile-gray-atlas.pdf"],
      model3d: "",
      panorama: "",
      video: "",
      pdf: "assets/pdf/tile-gray-atlas.pdf",
      tags: ["材料", "色谱", "图册", "瓦灰"],
      featured: false,
      published: true
    },
    {
      id: "p008",
      titleCN: "轴线生成研究",
      titleEN: "Axis Generation Study",
      category: "Research",
      year: "2023",
      location: "Computational Studio",
      status: "Published",
      material: "parametric drawing, SVG, canvas",
      scale: "research notes",
      role: "geometry research, drawing system",
      concept: "不复刻总平面，而提取秩序、方向和节奏。",
      description: "项目以传统建筑中轴线为出发点，生成一套可用于页面布局、展陈路线和项目编号的几何系统。",
      coverImage: "",
      gallery: [],
      drawings: ["assets/mock/axis-study-drawing.pdf"],
      model3d: "",
      panorama: "",
      video: "",
      pdf: "assets/pdf/axis-study.pdf",
      tags: ["参数化", "中轴线", "图纸", "系统"],
      featured: false,
      published: true
    },
    {
      id: "p009",
      titleCN: "木构灯具一号",
      titleEN: "Timber Lamp 01",
      category: "Objects",
      year: "2023",
      location: "Hangzhou",
      status: "Private Draft",
      material: "dark timber, linen, brass line",
      scale: "lighting prototype",
      role: "object design",
      concept: "用极少木构线条支撑一层柔光。",
      description: "未发布草稿项目，用于展示维护端的发布状态切换和前台过滤逻辑。",
      coverImage: "abstract:plinth",
      gallery: [],
      drawings: [],
      model3d: "",
      panorama: "",
      video: "",
      pdf: "",
      tags: ["草稿", "木构", "灯具"],
      featured: false,
      published: false
    }
  ];

  var state = {
    settings: null,
    navigation: [],
    projects: [],
    filter: "All",
    activeProjectId: null,
    lastFocusedElement: null,
    lastScrollY: 0,
    scrollDirection: 1,
    adminOpen: false,
    cursorHover: false,
    cursorDown: false,
    activeSectionBgId: "home",
    activeArticleProjectId: "",
    activeArticleId: "",
    articleReturnHash: "",
    assets: [],
    assetURLs: {},
    assetDb: null,
    assetDbReady: false,
    assetDbError: ""
  };

  var methods = [
    { no: "01", title: "秩序提取", text: "从中轴线、台基、屋脊和院落尺度中提取组织方法，而不是复刻传统符号。" },
    { no: "02", title: "材料转译", text: "把瓦灰、木褐、冷青、朱砂和砖石触感转成当代材料、色彩与界面系统。" },
    { no: "03", title: "数字预演", text: "通过图纸、模型台和全景场景提前测试空间氛围、观看路径和维护方式。" },
    { no: "04", title: "轻量交付", text: "官网内容以后可由数据层维护，项目、素材和发布状态都预留接口位置。" }
  ];

  var STORAGE_KEYS = {
    settings: "northernAtelier.siteSettings.v2",
    projects: "northernAtelier.projects.v2"
  };
  var defaultSiteSettings = clone(siteSettings);
  var defaultProjects = clone(projects);
  var reduceMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function createDefaultSectionBackgrounds() {
    var result = {};
    PUBLIC_SECTIONS.forEach(function (section) {
      result[section.id] = defaultSectionBackground(section.id);
    });
    return result;
  }

  function defaultSectionBackground(id) {
    return {
      image: "",
      imageOpacity: 0,
      designOpacity: 1,
      position: id === "works" ? "center top" : "center",
      blendMode: id === "works" ? "multiply" : "screen"
    };
  }

  function clampUnit(value, fallback) {
    var number = parseFloat(value);
    if (!Number.isFinite(number)) {
      return fallback;
    }
    return Math.max(0, Math.min(1, number));
  }

  function normalizeSectionBackgrounds(input) {
    var source = input || {};
    var normalized = {};
    PUBLIC_SECTIONS.forEach(function (section) {
      var defaults = defaultSectionBackground(section.id);
      var current = Object.assign({}, defaults, source[section.id] || {});
      current.image = String(current.image || "").trim();
      current.imageOpacity = clampUnit(current.imageOpacity, current.image ? 1 : 0);
      current.designOpacity = clampUnit(current.designOpacity, 1);
      current.position = String(current.position || defaults.position).trim() || defaults.position;
      current.blendMode = String(current.blendMode || defaults.blendMode).trim() || defaults.blendMode;
      if (!current.image) {
        current.imageOpacity = 0;
        current.designOpacity = 1;
      }
      normalized[section.id] = current;
    });
    return normalized;
  }

  function normalizeSiteSettings(settings) {
    var incoming = settings || {};
    var merged = Object.assign({}, defaultSiteSettings || siteSettings, incoming);
    merged.sectionBackgrounds = normalizeSectionBackgrounds(incoming.sectionBackgrounds || merged.sectionBackgrounds);
    return merged;
  }

  function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  function padNumber(index) {
    return String(index + 1).padStart(3, "0");
  }

  function parseTags(value) {
    if (Array.isArray(value)) {
      return value;
    }
    return String(value || "").split(/[,，]/).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function parseList(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) { return String(item).trim(); }).filter(Boolean);
    }
    return String(value || "").split(/[,，\n]/).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function normalizeArticleBlocks(blocks) {
    if (!Array.isArray(blocks)) {
      return [];
    }
    return blocks.map(function (block) {
      var current = Object.assign({
        type: "paragraph",
        text: "",
        asset: "",
        assets: [],
        caption: "",
        label: ""
      }, block || {});
      current.type = String(current.type || "paragraph");
      current.text = String(current.text || "");
      current.asset = normalizeAssetReference(current.asset || "");
      current.assets = Array.isArray(current.assets) ? current.assets.map(normalizeAssetReference).filter(Boolean) : parseList(current.assets).map(normalizeAssetReference).filter(Boolean);
      current.caption = String(current.caption || "");
      current.label = String(current.label || "");
      return current;
    });
  }

  function normalizeAssetReference(value) {
    if (!value) {
      return "";
    }
    if (typeof value === "string") {
      return value.trim();
    }
    if (value.id) {
      return String(value.id);
    }
    return String(value || "").trim();
  }

  function normalizeProject(project) {
    var base = {
      id: "p" + Date.now(),
      titleCN: "未命名案卷",
      titleEN: "Untitled Archive",
      category: "Architecture",
      year: new Date().getFullYear().toString(),
      location: "",
      status: "Draft",
      material: "",
      scale: "",
      role: "",
      concept: "",
      description: "",
      coverImage: "",
      gallery: [],
      drawings: [],
      model3d: "",
      panorama: "",
      video: "",
      pdf: "",
      tags: [],
      articleBlocks: [],
      featured: false,
      published: false
    };
    var next = Object.assign({}, base, project || {});
    next.tags = parseTags(next.tags);
    next.gallery = parseList(next.gallery);
    next.drawings = parseList(next.drawings);
    next.articleBlocks = normalizeArticleBlocks(next.articleBlocks);
    next.featured = Boolean(next.featured);
    next.published = Boolean(next.published);
    return next;
  }

  function delay(data) {
    return Promise.resolve(clone(data));
  }

  function readStorage(key, fallback) {
    try {
      if (typeof localStorage === "undefined") {
        return clone(fallback);
      }
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : clone(fallback);
    } catch (error) {
      return clone(fallback);
    }
  }

  function writeStorage() {
    try {
      if (typeof localStorage === "undefined") {
        return;
      }
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(siteSettings));
      localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    } catch (error) {
      console.warn("Mock data could not be persisted.", error);
    }
  }

  function loadStoredData() {
    siteSettings = normalizeSiteSettings(readStorage(STORAGE_KEYS.settings, defaultSiteSettings));
    projects = readStorage(STORAGE_KEYS.projects, defaultProjects).map(normalizeProject);
  }

  function resetMockData() {
    siteSettings = normalizeSiteSettings(defaultSiteSettings);
    projects = clone(defaultProjects).map(normalizeProject);
    writeStorage();
    return delay({ ok: true });
  }

  function exportJSON(filename, data) {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function readJSONFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          resolve(JSON.parse(reader.result));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // 后期可将这些 mock API 替换为真实数据库 API 和对象存储上传接口。
  function fetchSiteSettings() {
    return delay(siteSettings);
  }

  function updateSiteSettings(data) {
    siteSettings = normalizeSiteSettings(Object.assign({}, siteSettings, data));
    writeStorage();
    return delay(siteSettings);
  }

  function fetchNavigation() {
    return delay(navigation);
  }

  function fetchProjects() {
    return delay(projects);
  }

  function fetchProjectById(id) {
    var project = projects.find(function (item) { return item.id === id; });
    return delay(project || null);
  }

  function createProject(data) {
    var next = normalizeProject(Object.assign({}, data, {
      id: data && data.id ? data.id : "p" + Date.now()
    }));
    projects.unshift(next);
    writeStorage();
    return delay(next);
  }

  function updateProject(id, data) {
    var index = projects.findIndex(function (item) { return item.id === id; });
    if (index === -1) {
      return delay(null);
    }
    projects[index] = normalizeProject(Object.assign({}, projects[index], data));
    writeStorage();
    return delay(projects[index]);
  }

  function deleteProject(id) {
    projects = projects.filter(function (item) { return item.id !== id; });
    writeStorage();
    return delay({ ok: true, id: id });
  }

  function togglePublishStatus(id) {
    var project = projects.find(function (item) { return item.id === id; });
    if (project) {
      project.published = !project.published;
      project.status = project.published ? "Published" : "Draft";
      writeStorage();
    }
    return delay(project || null);
  }

  function uploadAsset(file, type, projectId, options) {
    var safeName = file && file.name ? file.name.replace(/\s+/g, "-").toLowerCase() : "mock-asset";
    var uploadOptions = options || {};
    var result = {
      ok: true,
      type: type,
      projectId: projectId,
      targetId: projectId,
      name: safeName,
      url: "assets/uploads/mock-" + type + "-" + Date.now() + "-" + safeName
    };
    if (type === "sectionBackground") {
      applyAssetToSectionBackground(projectId, result, uploadOptions);
      writeStorage();
      return Promise.resolve(result);
    }
    var project = projects.find(function (item) { return item.id === projectId; });
    if (project) {
      applyAssetToProject(project, result, uploadOptions);
      writeStorage();
    }
    return Promise.resolve(result);
  }

  function applyAssetToSectionBackground(sectionId, asset, options) {
    var exists = PUBLIC_SECTIONS.some(function (section) { return section.id === sectionId; });
    if (!exists) {
      return;
    }
    siteSettings.sectionBackgrounds = normalizeSectionBackgrounds(siteSettings.sectionBackgrounds);
    var current = Object.assign({}, defaultSectionBackground(sectionId), siteSettings.sectionBackgrounds[sectionId], {
      image: asset.url,
      imageOpacity: clampUnit(options.imageOpacity, 1),
      designOpacity: clampUnit(options.designOpacity, 0.35),
      position: options.position || (siteSettings.sectionBackgrounds[sectionId] && siteSettings.sectionBackgrounds[sectionId].position) || defaultSectionBackground(sectionId).position,
      blendMode: options.blendMode || (siteSettings.sectionBackgrounds[sectionId] && siteSettings.sectionBackgrounds[sectionId].blendMode) || defaultSectionBackground(sectionId).blendMode
    });
    siteSettings.sectionBackgrounds[sectionId] = normalizeSectionBackgrounds(Object.assign({}, siteSettings.sectionBackgrounds, {
      [sectionId]: current
    }))[sectionId];
  }

  function applyAssetToProject(project, asset, options) {
    var type = asset.type;
    var url = asset.url;
    if (type === "cover") {
      project.coverImage = url;
      return;
    }
    if (type === "drawing") {
      project.drawings = options.replace ? [url] : parseList(project.drawings).concat(url);
      if (options.setCover) {
        project.coverImage = url;
      }
      return;
    }
    if (type === "gallery") {
      project.gallery = options.replace ? [url] : parseList(project.gallery).concat(url);
      if (options.setCover) {
        project.coverImage = url;
      }
      return;
    }
    if (type === "model3d" || type === "panorama" || type === "video" || type === "pdf") {
      project[type] = url;
      if (options.setCover && (type === "panorama" || type === "video")) {
        project.coverImage = url;
      }
    }
  }

  function removeAsset(projectId, type, url) {
    var project = projects.find(function (item) { return item.id === projectId; });
    if (!project) {
      return delay(null);
    }
    if (type === "gallery") {
      project.gallery = parseList(project.gallery).filter(function (item) { return item !== url; });
    } else if (type === "drawing") {
      project.drawings = parseList(project.drawings).filter(function (item) { return item !== url; });
    } else if (type === "cover") {
      project.coverImage = "";
    } else if (type === "model3d" || type === "panorama" || type === "video" || type === "pdf") {
      project[type] = "";
    }
    writeStorage();
    return delay(project);
  }

  window.StudioMockAPI = {
    fetchSiteSettings: fetchSiteSettings,
    updateSiteSettings: updateSiteSettings,
    fetchNavigation: fetchNavigation,
    fetchProjects: fetchProjects,
    fetchProjectById: fetchProjectById,
    createProject: createProject,
    updateProject: updateProject,
    deleteProject: deleteProject,
    togglePublishStatus: togglePublishStatus,
    uploadAsset: uploadAsset,
    removeAsset: removeAsset,
    resetMockData: resetMockData
  };

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    loadStoredData();
    await refreshData();
    renderAll();
    bindGlobalEvents();
    initWatangCursor();
    initHeroCanvas();
    initEmberCanvas();
    initSectionObserver();
  }

  async function refreshData() {
    state.settings = await fetchSiteSettings();
    state.navigation = await fetchNavigation();
    state.projects = await fetchProjects();
  }

  function renderAll() {
    renderSettings();
    renderNavigation();
    renderFeatured();
    renderFilters();
    renderWorks();
    renderCategoryRail("Architecture", "architectureRail");
    renderCategoryRail("Objects", "objectsRail");
    renderResearch();
    renderMethods();
    applySectionBackgrounds();
    renderAdminList();
    renderAssetProjectOptions();
    renderAssetLibrary();
    renderSectionBgControls();
    fillSettingsForm();
  }

  function renderSettings() {
    var settings = state.settings;
    document.title = settings.studioName + " | Independent Design Studio";
    setText("navStudioName", settings.studioName);
    setText("brandSeal", settings.studioSeal.slice(0, 1));
    setText("heroSeal", settings.studioSeal);
    setText("heroTitle", settings.taglineCN);
    setText("heroTitleEN", settings.taglineEN);
    setText("heroIntro", settings.intro);
    setText("studioPhilosophy", settings.philosophy);
    setText("contactEmail", settings.email);
    var emailLink = qs("#emailLink");
    var pdfLink = qs("#pdfLink");
    if (emailLink) {
      emailLink.href = "mailto:" + settings.email;
    }
    if (pdfLink) {
      pdfLink.href = settings.portfolioPdf || "#";
    }
    document.documentElement.style.setProperty("--cangqing", settings.accentColor || "#536A63");
  }

  function applySectionBackgrounds() {
    if (!state.settings) {
      return;
    }
    var backgrounds = normalizeSectionBackgrounds(state.settings.sectionBackgrounds);
    PUBLIC_SECTIONS.forEach(function (sectionInfo) {
      var section = qs("#" + sectionInfo.id);
      if (!section) {
        return;
      }
      ensureSectionBackgroundLayers(section);
      var config = backgrounds[sectionInfo.id] || defaultSectionBackground(sectionInfo.id);
      var hasImage = Boolean(config.image);
      section.classList.toggle("has-section-bg-upload", hasImage);
      section.style.setProperty("--section-upload-bg-image", hasImage ? cssUrl(config.image) : "none");
      section.style.setProperty("--section-upload-bg-opacity", hasImage ? String(config.imageOpacity) : "0");
      section.style.setProperty("--section-upload-bg-position", config.position || "center");
      section.style.setProperty("--section-upload-bg-blend-mode", config.blendMode || "screen");
      section.style.setProperty("--section-design-bg-opacity", hasImage ? String(config.designOpacity) : "1");
    });
  }

  function ensureSectionBackgroundLayers(section) {
    if (!qs(".section-bg-upload", section)) {
      var uploadLayer = document.createElement("div");
      uploadLayer.className = "section-bg-upload";
      uploadLayer.setAttribute("aria-hidden", "true");
      section.insertBefore(uploadLayer, section.firstChild);
    }
    if (!qs(".section-bg-design", section)) {
      var designLayer = document.createElement("div");
      designLayer.className = "section-bg-design";
      designLayer.setAttribute("aria-hidden", "true");
      var upload = qs(".section-bg-upload", section);
      section.insertBefore(designLayer, upload ? upload.nextSibling : section.firstChild);
    }
  }

  function cssUrl(value) {
    return 'url("' + String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\n\r]/g, "") + '")';
  }

  function setText(id, text) {
    var node = qs("#" + id);
    if (node) {
      node.textContent = text || "";
    }
  }

  function renderNavigation() {
    var mainNav = qs("#mainNav");
    var mobilePanel = qs("#mobileNavPanel");
    var mainItems = state.navigation.filter(function (item) { return item.href !== "#admin"; });
    if (mainNav) {
      mainNav.innerHTML = mainItems.map(navLinkHTML).join("");
    }
    if (mobilePanel) {
      mobilePanel.innerHTML = mainItems.map(navLinkHTML).join("");
    }
  }

  function navLinkHTML(item) {
    return '<a href="' + escapeHTML(item.href) + '" data-nav-link title="' + escapeHTML(item.labelEN) + '"><span>' + escapeHTML(item.labelEN) + ' / ' + escapeHTML(item.labelCN) + '</span></a>';
  }

  function renderFeatured() {
    var container = qs("#featuredGrid");
    if (!container) {
      return;
    }
    var featured = state.projects.filter(function (project) { return project.featured && project.published; }).slice(0, 3);
    container.innerHTML = featured.map(function (project, index) {
      return projectCardHTML(project, index, "featured");
    }).join("");
  }

  function renderFilters() {
    var container = qs("#filterBar");
    if (!container) {
      return;
    }
    var categories = ["All"].concat(Array.from(new Set(state.projects.filter(function (item) { return item.published; }).map(function (item) { return item.category; }))));
    container.innerHTML = categories.map(function (category) {
      var active = category === state.filter ? " is-active" : "";
      return '<button type="button" class="' + active + '" data-filter="' + escapeHTML(category) + '">' + escapeHTML(category) + '</button>';
    }).join("");
  }

  function renderWorks() {
    var container = qs("#worksGrid");
    if (!container) {
      return;
    }
    var visible = state.projects.filter(function (project) {
      return project.published && (state.filter === "All" || project.category === state.filter);
    });
    container.innerHTML = visible.map(function (project, index) {
      return projectCardHTML(project, index, "work");
    }).join("");
  }

  function renderCategoryRail(category, id) {
    var container = qs("#" + id);
    if (!container) {
      return;
    }
    var visible = state.projects.filter(function (project) {
      return project.published && project.category === category;
    }).slice(0, 4);
    container.innerHTML = visible.map(function (project, index) {
      return projectCardHTML(project, index, "category");
    }).join("");
  }

  function renderResearch() {
    var container = qs("#researchGrid");
    if (!container) {
      return;
    }
    var research = state.projects.filter(function (project) {
      return project.published && (project.category === "Research" || project.model3d || project.panorama);
    }).slice(0, 4);
    container.innerHTML = research.map(function (project, index) {
      var icon = ["轴", "模", "景", "材"][index % 4];
      return '<article class="research-card" data-project-id="' + escapeHTML(project.id) + '" tabindex="0" role="button">' +
        '<div class="research-icon">' + icon + '</div>' +
        '<div><p class="eyebrow">' + escapeHTML(project.category) + ' / ' + escapeHTML(project.year) + '</p><h3>' + escapeHTML(project.titleCN) + '</h3><p>' + escapeHTML(project.concept || project.description) + '</p></div>' +
        mediaTagsHTML(project) +
      '</article>';
    }).join("");
  }

  function renderMethods() {
    var container = qs("#methodStack");
    if (!container) {
      return;
    }
    container.innerHTML = methods.map(function (item) {
      return '<article class="method-card"><strong>' + item.no + '</strong><div><h3>' + escapeHTML(item.title) + '</h3><p>' + escapeHTML(item.text) + '</p></div></article>';
    }).join("");
  }

  function projectCardHTML(project, index, mode) {
    var textOnly = !project.coverImage;
    var classes = "project-card" + (textOnly ? " text-only-card" : "") + (mode === "featured" ? " featured-card" : "");
    var number = padNumber(index);
    var tags = project.tags.slice(0, 3).map(function (tag) {
      return '<span class="tag">' + escapeHTML(tag) + '</span>';
    }).join("");
    var visual = textOnly ? '<div class="axis-rule"></div>' : visualHTML(project, "card");
    var archiveNumber = textOnly ? '<div class="archive-number">' + number + '</div>' : "";
    var status = project.featured ? '<span class="status-pill">FEATURED</span>' : '<span>' + escapeHTML(project.status) + '</span>';
    return '<article class="' + classes + '" data-project-id="' + escapeHTML(project.id) + '" tabindex="0" role="button" aria-label="查看项目 ' + escapeHTML(project.titleCN) + '">' +
      visual +
      '<span class="ember-dot" aria-hidden="true"></span>' +
      '<div class="card-topline"><span class="card-number">BY-' + number + '</span>' + status + '</div>' +
      '<div class="card-content">' + archiveNumber +
        '<div><p class="eyebrow">' + escapeHTML(project.category) + ' / ' + escapeHTML(project.year) + '</p>' +
        '<h3 class="card-title"><span class="cn">' + escapeHTML(project.titleCN) + '</span><span class="en">' + escapeHTML(project.titleEN) + '</span></h3></div>' +
        '<p class="card-description">' + escapeHTML(project.concept || project.description) + '</p>' +
        '<div class="tags">' + tags + '</div>' + mediaTagsHTML(project) +
      '</div></article>';
  }

  function visualHTML(project, context) {
    if (project.coverImage && !String(project.coverImage).startsWith("abstract:")) {
      return '<div class="project-visual visual-image" aria-hidden="true"><img loading="lazy" src="' + escapeHTML(project.coverImage) + '" alt=""></div>';
    }
    var visualClass = getVisualClass(project.coverImage);
    return '<div class="project-visual ' + visualClass + '" aria-hidden="true"><span class="line-art"></span></div>';
  }

  function getVisualClass(coverImage) {
    var key = String(coverImage || "").replace("abstract:", "");
    var map = {
      ridge: "visual-ridge",
      plinth: "visual-plinth",
      vessel: "visual-vessel",
      grid: "visual-grid",
      paper: "visual-paper"
    };
    return map[key] || "visual-ridge";
  }

  function mediaTagsHTML(project) {
    var items = [];
    if (project.coverImage) { items.push("IMG"); }
    if (project.model3d) { items.push("3D"); }
    if (project.panorama) { items.push("360"); }
    if (project.pdf || project.drawings.length) { items.push("PDF"); }
    if (project.video) { items.push("VIDEO"); }
    return '<div class="media-tags">' + items.map(function (item) {
      return '<span class="media-tag media-' + item.toLowerCase() + '">' + item + '</span>';
    }).join("") + '</div>';
  }

  function bindGlobalEvents() {
    document.addEventListener("click", async function (event) {
      var filterButton = event.target.closest("[data-filter]");
      if (filterButton) {
        state.filter = filterButton.getAttribute("data-filter") || "All";
        renderFilters();
        renderWorks();
        return;
      }

      var card = event.target.closest("[data-project-id]");
      if (card && !event.target.closest(".admin-list-item")) {
        openProjectModal(card.getAttribute("data-project-id"));
        return;
      }

      var navLink = event.target.closest("[data-nav-link]");
      if (navLink) {
        closeMobileNav();
      }

      var anchor = event.target.closest('a[href^="#"]');
      if (anchor) {
        var href = anchor.getAttribute("href");
        if (href === "#admin") {
          event.preventDefault();
          openAdminConsole();
          return;
        }
        var target = href && /^#[A-Za-z][A-Za-z0-9_-]*$/.test(href) ? qs(href) : null;
        if (target) {
          event.preventDefault();
          closeMobileNav();
          smoothScrollTo(target, 560, true);
        }
      }
    });

    document.addEventListener("keydown", function (event) {
      if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-project-id]")) {
        event.preventDefault();
        openProjectModal(event.target.getAttribute("data-project-id"));
      }
      if (event.key === "Escape") {
        closeProjectModal();
        closeAdminConsole();
        closeMobileNav();
      }
    });

    var modal = qs("#projectModal");
    var close = qs("#modalClose");
    if (close) {
      close.addEventListener("click", closeProjectModal);
    }
    if (modal) {
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          closeProjectModal();
        }
      });
    }

    var mobileButton = qs("#mobileMenuButton");
    if (mobileButton) {
      mobileButton.addEventListener("click", toggleMobileNav);
    }

    bindAdminEvents();
    bindAdminTrigger();
    handleAdminHashRoute();
  }

  function getHeaderOffset() {
    var header = qs(".site-header");
    return header ? Math.ceil(header.getBoundingClientRect().height + 34) : 96;
  }

  function smoothScrollTo(target, duration, withThreshold) {
    if (reduceMotionQuery.matches) {
      window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()));
      return;
    }
    var start = window.scrollY || window.pageYOffset;
    var end = target.getBoundingClientRect().top + start - getHeaderOffset();
    var distance = end - start;
    var startTime = 0;
    var wait = withThreshold ? 90 : 0;
    if (withThreshold) {
      startThresholdJump(target);
    }
    document.body.classList.add("is-anchor-scrolling");
    function ease(t) {
      var c4 = (2 * Math.PI) / 3;
      return t === 0 ? 0 : t === 1 ? 1 : t < 0.82
        ? 1 - Math.pow(2, -8 * t) * Math.cos(t * c4)
        : 1 - Math.pow(1 - t, 2) * 0.12;
    }
    function step(now) {
      if (!startTime) {
        startTime = now + wait;
      }
      if (now < startTime) {
        requestAnimationFrame(step);
        return;
      }
      var progress = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, start + distance * ease(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        document.body.classList.remove("is-anchor-scrolling");
        if (withThreshold) {
          finishThresholdJump(target);
        }
        history.replaceState(null, "", "#" + target.id);
      }
    }
    requestAnimationFrame(step);
  }

  function startThresholdJump(target) {
    var layer = qs("#thresholdTransition");
    if (!layer || reduceMotionQuery.matches) {
      return;
    }
    layer.classList.remove("is-active");
    void layer.offsetWidth;
    document.body.classList.add("is-threshold-jumping");
    layer.classList.add("is-active");
    window.dispatchEvent(new CustomEvent("atelier:ember-burst", {
      detail: { x: window.innerWidth * 0.52, y: Math.min(180, window.innerHeight * 0.2), count: window.innerWidth < 700 ? 3 : 5 }
    }));
  }

  function finishThresholdJump(target) {
    target.classList.add("is-threshold-arrived");
    window.setTimeout(function () {
      target.classList.remove("is-threshold-arrived");
      document.body.classList.remove("is-threshold-jumping");
      var layer = qs("#thresholdTransition");
      if (layer) {
        layer.classList.remove("is-active");
      }
    }, 360);
  }

  async function openProjectModal(id) {
    var project = await fetchProjectById(id);
    if (!project) {
      return;
    }
    var modal = qs("#projectModal");
    var content = qs("#modalContent");
    if (!modal || !content) {
      return;
    }
    state.lastFocusedElement = document.activeElement;
    content.innerHTML = modalHTML(project);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    bindModalMedia(project);
    var closeButton = qs("#modalClose");
    if (closeButton) {
      closeButton.focus();
    }
    document.addEventListener("keydown", trapModalFocus);
  }

  function closeProjectModal() {
    var modal = qs("#projectModal");
    if (!modal) {
      return;
    }
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", trapModalFocus);
    if (state.lastFocusedElement && state.lastFocusedElement.focus) {
      state.lastFocusedElement.focus();
    }
  }

  function trapModalFocus(event) {
    if (event.key !== "Tab") {
      return;
    }
    var modal = qs("#projectModal");
    if (!modal || !modal.classList.contains("is-open")) {
      return;
    }
    var focusables = qsa('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
      .filter(function (node) { return node.offsetParent !== null; });
    if (!focusables.length) {
      return;
    }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function modalHTML(project) {
    var tags = project.tags.map(function (tag) {
      return '<span class="tag">' + escapeHTML(tag) + '</span>';
    }).join("");
    var number = projectNumber(project);
    var modelEntry = project.model3d ? '<button class="button button-dark" type="button" data-panel-target="modelPanel"><span>模型台</span><em>Model Platform</em></button>' : "";
    var panoramaEntry = project.panorama ? '<button class="button button-outline" type="button" data-panel-target="panoramaPanel"><span>入此空间</span><em>Enter Scene</em></button>' : "";
    return '<div class="modal-layout">' +
      '<div class="modal-visual">' + visualHTML(project, "modal") + '</div>' +
      '<div class="modal-copy">' +
        '<div><span class="modal-archive-code">BY-' + number + ' / ' + escapeHTML(project.category) + '</span><h2 id="modalTitle">' + escapeHTML(project.titleCN) + '<span>' + escapeHTML(project.titleEN) + '</span></h2></div>' +
        '<div class="project-meta">' + metaItem("No.", "BY-" + number) + metaItem("Category", project.category) + metaItem("Year", project.year) + metaItem("Status", project.status) + metaItem("Location", project.location) + metaItem("Material", project.material) + metaItem("Scale", project.scale) + metaItem("Role", project.role) + '</div>' +
        '<div class="concept-panel"><strong>DESIGN PROPOSITION</strong><p>' + escapeHTML(project.concept || project.description) + '</p></div>' +
        '<p class="modal-description">' + escapeHTML(project.description) + '</p>' +
        '<div class="tags">' + tags + '</div>' +
        modalAssetsHTML(project) +
        '<div class="hero-actions"><a class="button button-primary" href="#project/' + escapeHTML(project.id) + '"><span>查看完整项目</span><em>Full Case</em></a>' + modelEntry + panoramaEntry + '</div>' +
        modalMediaPanels(project) +
      '</div></div>';
  }

  function projectNumber(project) {
    var index = projects.findIndex(function (item) { return item.id === project.id; });
    return String(index + 1 || 1).padStart(3, "0");
  }

  function metaItem(label, value) {
    if (!value) {
      return "";
    }
    return "<div><small>" + escapeHTML(label) + "</small><strong>" + escapeHTML(value) + "</strong></div>";
  }

  function modalAssetsHTML(project) {
    var chips = [];
    parseList(project.gallery).forEach(function (item, index) {
      chips.push(assetChip("IMG " + String(index + 1).padStart(2, "0"), item));
    });
    parseList(project.drawings).forEach(function (item, index) {
      chips.push(assetChip("DRAW " + String(index + 1).padStart(2, "0"), item));
    });
    if (project.pdf) {
      chips.push(assetChip("PDF", project.pdf));
    }
    if (!chips.length) {
      return "";
    }
    return '<div class="modal-assets"><h3>Gallery / Drawings / PDF</h3>' + chips.join("") + '</div>';
  }

  function assetChip(label, value) {
    return '<div class="asset-chip"><small>' + escapeHTML(label) + '</small><code>' + escapeHTML(value) + '</code></div>';
  }

  function modalMediaPanels(project) {
    var html = "";
    if (project.model3d) {
      html += '<section class="media-panel" id="modelPanel"><div class="viewer-stage"><canvas width="760" height="320" data-model-canvas></canvas><div class="model-placeholder" data-model-placeholder><div><p class="eyebrow">GLB READY</p><h3>模型台 / Model Platform</h3><p>点击后模拟加载模型。真实接入时在这里挂载 GLB viewer。</p><button class="button button-primary" type="button" data-load-model><span>载入模型</span><em>Load Model</em></button></div></div></div><div class="viewer-caption"><p>预留路径：' + escapeHTML(project.model3d) + '</p></div></section>';
    }
    if (project.panorama) {
      html += '<section class="media-panel" id="panoramaPanel"><div class="viewer-stage"><div class="panorama-strip" data-panorama-strip></div><div class="panorama-placeholder"><div><p class="eyebrow">360 READY</p><h3>入此空间 / Enter Scene</h3><p>拖动滑块模拟全景视角。真实接入时替换为 360 viewer。</p></div></div></div><div class="viewer-caption"><p>预留路径：' + escapeHTML(project.panorama) + '</p><input type="range" min="0" max="100" value="45" data-panorama-range aria-label="全景视角"></div></section>';
    }
    return html;
  }

  function bindModalMedia(project) {
    qsa("[data-panel-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = qs("#" + button.getAttribute("data-panel-target"));
        if (target) {
          qsa(".media-panel").forEach(function (panel) { panel.classList.remove("is-visible"); });
          target.classList.add("is-visible");
          target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    var loadModelButton = qs("[data-load-model]");
    if (loadModelButton) {
      loadModelButton.addEventListener("click", function () {
        var placeholder = qs("[data-model-placeholder]");
        if (placeholder) {
          placeholder.style.display = "none";
        }
        loadModelViewer(project.model3d);
      });
    }

    var range = qs("[data-panorama-range]");
    var strip = qs("[data-panorama-strip]");
    if (range && strip) {
      var updatePanorama = function () {
        strip.style.backgroundPosition = range.value + "% 50%";
      };
      range.addEventListener("input", updatePanorama);
      updatePanorama();
      range.addEventListener("change", function () {
        loadPanoramaViewer(project.panorama);
      }, { once: true });
    }
  }

  function loadModelViewer(modelPath) {
    var canvas = qs("[data-model-canvas]");
    if (!canvas) {
      return;
    }
    // 后期可将这里替换为 <model-viewer> 或 Three.js GLB viewer，并使用 modelPath 加载真实模型。
    drawMockModel(canvas, modelPath);
  }

  function loadPanoramaViewer(panoramaPath) {
    var strip = qs("[data-panorama-strip]");
    if (!strip) {
      return;
    }
    // 后期可将这里替换为 Pannellum 或 Photo Sphere Viewer，并使用 panoramaPath 加载真实 360 全景图。
    strip.dataset.loadedPanorama = panoramaPath || "";
  }

  function drawMockModel(canvas, modelPath) {
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    var gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#050708");
    gradient.addColorStop(0.5, "#162B28");
    gradient.addColorStop(1, "#0E1110");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(142, 167, 160, 0.62)";
    ctx.lineWidth = 1;
    ctx.save();
    ctx.translate(width / 2, height / 2 + 34);
    for (var i = 0; i < 9; i += 1) {
      var scale = 1 - i * 0.075;
      ctx.beginPath();
      ctx.moveTo(-220 * scale, 80 * scale - i * 7);
      ctx.lineTo(0, -80 * scale - i * 10);
      ctx.lineTo(220 * scale, 80 * scale - i * 7);
      ctx.lineTo(160 * scale, 110 * scale + i * 2);
      ctx.lineTo(-160 * scale, 110 * scale + i * 2);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(176, 138, 84, 0.65)";
    ctx.beginPath();
    ctx.moveTo(-260, 116);
    ctx.lineTo(260, 116);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "rgba(243, 238, 227, 0.82)";
    ctx.font = "12px Space Grotesk, sans-serif";
    ctx.fillText("Mock GLB viewer placeholder", 24, 32);
    ctx.fillText(modelPath || "", 24, 52);
  }

  function toggleMobileNav() {
    var panel = qs("#mobileNavPanel");
    var button = qs("#mobileMenuButton");
    if (!panel || !button) {
      return;
    }
    var open = !panel.classList.contains("is-open");
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeMobileNav() {
    var panel = qs("#mobileNavPanel");
    var button = qs("#mobileMenuButton");
    if (panel) {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    }
    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  }

  function bindAdminEvents() {
    var loginButton = qs("#adminLoginButton");
    if (loginButton) {
      loginButton.addEventListener("click", function () {
        qs("#adminLogin").classList.add("is-hidden");
        qs("#adminConsole").classList.remove("is-hidden");
      });
    }

    qsa("[data-admin-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        var name = button.getAttribute("data-admin-tab");
        qsa("[data-admin-tab]").forEach(function (item) { item.classList.toggle("is-active", item === button); });
        qsa("[data-admin-panel]").forEach(function (panel) { panel.classList.toggle("is-active", panel.getAttribute("data-admin-panel") === name); });
      });
    });

    var projectForm = qs("#projectForm");
    if (projectForm) {
      projectForm.addEventListener("submit", handleProjectFormSubmit);
    }

    var newProjectButton = qs("#newProjectButton");
    if (newProjectButton) {
      newProjectButton.addEventListener("click", function () { fillProjectForm(null); });
    }

    var settingsForm = qs("#settingsForm");
    if (settingsForm) {
      settingsForm.addEventListener("submit", handleSettingsSubmit);
    }

    var uploadButton = qs("#uploadButton");
    if (uploadButton) {
      uploadButton.addEventListener("click", handleUpload);
    }

    var assetProject = qs("#assetProject");
    if (assetProject) {
      assetProject.addEventListener("change", renderAssetLibrary);
    }

    var exportProjectsButton = qs("#exportProjectsButton");
    if (exportProjectsButton) {
      exportProjectsButton.addEventListener("click", function () {
        exportJSON("northern-atelier-projects.json", projects);
      });
    }

    var exportSettingsButton = qs("#exportSettingsButton");
    if (exportSettingsButton) {
      exportSettingsButton.addEventListener("click", function () {
        exportJSON("northern-atelier-site-settings.json", siteSettings);
      });
    }

    var importProjectsInput = qs("#importProjectsInput");
    if (importProjectsInput) {
      importProjectsInput.addEventListener("change", handleProjectsImport);
    }

    var importSettingsInput = qs("#importSettingsInput");
    if (importSettingsInput) {
      importSettingsInput.addEventListener("change", handleSettingsImport);
    }

    var resetButton = qs("#resetMockButton");
    if (resetButton) {
      resetButton.addEventListener("click", async function () {
        await resetMockData();
        await refreshData();
        renderAll();
      });
    }

    bindSectionBackgroundEvents();
  }

  function bindSectionBackgroundEvents() {
    var targetSelect = qs("#sectionBgTarget");
    var saveButton = qs("#saveSectionBgButton");
    var uploadButton = qs("#uploadSectionBgButton");
    var clearButton = qs("#clearSectionBgButton");
    var resetButton = qs("#resetSectionBgButton");
    var imageInput = qs("#sectionBgImage");
    var imageOpacity = qs("#sectionBgImageOpacity");
    var designOpacity = qs("#sectionBgDesignOpacity");
    var positionSelect = qs("#sectionBgPosition");
    var blendSelect = qs("#sectionBgBlendMode");

    if (targetSelect) {
      targetSelect.addEventListener("change", function () {
        state.activeSectionBgId = targetSelect.value || "home";
        fillSectionBgForm(state.activeSectionBgId);
      });
    }

    [imageInput, imageOpacity, designOpacity, positionSelect, blendSelect].forEach(function (control) {
      if (!control) {
        return;
      }
      control.addEventListener("input", updateSectionBgRangeLabels);
      control.addEventListener("change", updateSectionBgRangeLabels);
    });

    if (saveButton) {
      saveButton.addEventListener("click", saveSectionBackgroundFromForm);
    }

    if (uploadButton) {
      uploadButton.addEventListener("click", uploadSectionBackgroundFromForm);
    }

    if (clearButton) {
      clearButton.addEventListener("click", clearCurrentSectionBackground);
    }

    if (resetButton) {
      resetButton.addEventListener("click", resetAllSectionBackgrounds);
    }
  }

  function renderSectionBgControls() {
    var select = qs("#sectionBgTarget");
    if (!select || !state.settings) {
      return;
    }
    var current = state.activeSectionBgId || select.value || "home";
    select.innerHTML = PUBLIC_SECTIONS.map(function (section) {
      return '<option value="' + escapeHTML(section.id) + '">' + escapeHTML(section.labelCN) + ' / ' + escapeHTML(section.labelEN) + '</option>';
    }).join("");
    state.activeSectionBgId = PUBLIC_SECTIONS.some(function (section) { return section.id === current; }) ? current : "home";
    select.value = state.activeSectionBgId;
    fillSectionBgForm(state.activeSectionBgId);
    renderSectionBgPreview();
  }

  function getSectionBackground(sectionId) {
    var backgrounds = normalizeSectionBackgrounds(state.settings && state.settings.sectionBackgrounds);
    return backgrounds[sectionId] || defaultSectionBackground(sectionId);
  }

  function fillSectionBgForm(sectionId) {
    var config = getSectionBackground(sectionId);
    var imageInput = qs("#sectionBgImage");
    var imageOpacity = qs("#sectionBgImageOpacity");
    var designOpacity = qs("#sectionBgDesignOpacity");
    var positionSelect = qs("#sectionBgPosition");
    var blendSelect = qs("#sectionBgBlendMode");
    if (imageInput) {
      imageInput.value = config.image || "";
    }
    if (imageOpacity) {
      imageOpacity.value = String(config.image ? config.imageOpacity : 0);
    }
    if (designOpacity) {
      designOpacity.value = String(config.image ? config.designOpacity : 1);
    }
    if (positionSelect) {
      positionSelect.value = config.position || "center";
    }
    if (blendSelect) {
      blendSelect.value = config.blendMode || "screen";
    }
    updateSectionBgRangeLabels();
  }

  function updateSectionBgRangeLabels() {
    var imageOpacity = qs("#sectionBgImageOpacity");
    var designOpacity = qs("#sectionBgDesignOpacity");
    setText("sectionBgImageOpacityValue", imageOpacity ? Number(imageOpacity.value).toFixed(2) : "0");
    setText("sectionBgDesignOpacityValue", designOpacity ? Number(designOpacity.value).toFixed(2) : "1");
  }

  function sectionBgFromForm(sectionId) {
    var imageInput = qs("#sectionBgImage");
    var imageOpacity = qs("#sectionBgImageOpacity");
    var designOpacity = qs("#sectionBgDesignOpacity");
    var positionSelect = qs("#sectionBgPosition");
    var blendSelect = qs("#sectionBgBlendMode");
    var image = imageInput ? imageInput.value.trim() : "";
    var previous = getSectionBackground(sectionId);
    var firstImage = image && !previous.image;
    var imageOpacityValue = imageOpacity && imageOpacity.value;
    var designOpacityValue = designOpacity && designOpacity.value;
    var config = {
      image: image,
      imageOpacity: firstImage && Number(imageOpacityValue) === 0 ? 1 : clampUnit(imageOpacityValue, image ? 1 : 0),
      designOpacity: firstImage && Number(designOpacityValue) === 1 ? 0.35 : clampUnit(designOpacityValue, image ? 0.35 : 1),
      position: positionSelect ? positionSelect.value : defaultSectionBackground(sectionId).position,
      blendMode: blendSelect ? blendSelect.value : defaultSectionBackground(sectionId).blendMode
    };
    return normalizeSectionBackgrounds(Object.assign({}, state.settings.sectionBackgrounds, {
      [sectionId]: config
    }))[sectionId];
  }

  async function saveSectionBackgroundFromForm() {
    var sectionId = state.activeSectionBgId || "home";
    var backgrounds = normalizeSectionBackgrounds(state.settings.sectionBackgrounds);
    backgrounds[sectionId] = sectionBgFromForm(sectionId);
    await updateSiteSettings({ sectionBackgrounds: backgrounds });
    await refreshData();
    applySectionBackgrounds();
    renderSectionBgControls();
    showAdminStamp("背景已保存");
  }

  async function uploadSectionBackgroundFromForm() {
    var input = qs("#sectionBgFile");
    var file = input && input.files && input.files[0] ? input.files[0] : { name: "section-background.jpg" };
    var sectionId = state.activeSectionBgId || "home";
    var current = sectionBgFromForm(sectionId);
    await uploadAsset(file, "sectionBackground", sectionId, {
      imageOpacity: current.imageOpacity,
      designOpacity: current.designOpacity === 1 && !current.image ? 0.35 : current.designOpacity,
      position: current.position,
      blendMode: current.blendMode
    });
    await refreshData();
    applySectionBackgrounds();
    renderSectionBgControls();
    if (input) {
      input.value = "";
    }
    showAdminStamp("背景已上传");
  }

  async function clearCurrentSectionBackground() {
    var sectionId = state.activeSectionBgId || "home";
    var backgrounds = normalizeSectionBackgrounds(state.settings.sectionBackgrounds);
    backgrounds[sectionId] = defaultSectionBackground(sectionId);
    await updateSiteSettings({ sectionBackgrounds: backgrounds });
    await refreshData();
    applySectionBackgrounds();
    renderSectionBgControls();
    showAdminStamp("背景已清除");
  }

  async function resetAllSectionBackgrounds() {
    await updateSiteSettings({ sectionBackgrounds: createDefaultSectionBackgrounds() });
    await refreshData();
    applySectionBackgrounds();
    renderSectionBgControls();
    showAdminStamp("背景已复位");
  }

  function renderSectionBgPreview() {
    var container = qs("#sectionBgPreview");
    if (!container || !state.settings) {
      return;
    }
    var backgrounds = normalizeSectionBackgrounds(state.settings.sectionBackgrounds);
    container.innerHTML = '<h4>当前板块背景</h4>' + PUBLIC_SECTIONS.map(function (section) {
      var bg = backgrounds[section.id];
      var active = section.id === state.activeSectionBgId ? " is-active" : "";
      return '<button class="section-bg-item' + active + '" type="button" data-section-bg-pick="' + escapeHTML(section.id) + '">' +
        '<span><strong>' + escapeHTML(section.labelCN) + '</strong><small>' + escapeHTML(section.labelEN) + '</small></span>' +
        '<code>' + escapeHTML(bg.image || "默认背景") + '</code>' +
        '<em>IMG ' + Number(bg.imageOpacity).toFixed(2) + ' / DESIGN ' + Number(bg.designOpacity).toFixed(2) + '</em>' +
      '</button>';
    }).join("");
    qsa("[data-section-bg-pick]", container).forEach(function (button) {
      button.addEventListener("click", function () {
        state.activeSectionBgId = button.getAttribute("data-section-bg-pick") || "home";
        var select = qs("#sectionBgTarget");
        if (select) {
          select.value = state.activeSectionBgId;
        }
        fillSectionBgForm(state.activeSectionBgId);
        renderSectionBgPreview();
      });
    });
  }

  function bindAdminTrigger() {
    var trigger = qs("#adminTrigger");
    if (trigger) {
      trigger.addEventListener("click", openAdminConsole);
    }
    qsa("[data-admin-close]").forEach(function (button) {
      button.addEventListener("click", closeAdminConsole);
    });
    window.addEventListener("hashchange", handleAdminHashRoute);
  }

  function handleAdminHashRoute() {
    if (window.location.hash === "#admin") {
      window.setTimeout(openAdminConsole, 0);
    }
  }

  function openAdminConsole() {
    var overlay = qs("#adminOverlay");
    if (!overlay || overlay.classList.contains("is-open")) {
      return;
    }
    state.lastFocusedElement = document.activeElement;
    state.lastScrollY = window.scrollY || window.pageYOffset || 0;
    state.adminOpen = true;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("admin-open");
    document.body.style.top = "-" + state.lastScrollY + "px";
    document.body.style.width = "100%";
    var login = qs("#adminLogin");
    var consolePanel = qs("#adminConsole");
    if (login && consolePanel) {
      login.classList.add("is-hidden");
      consolePanel.classList.remove("is-hidden");
    }
    var close = qs(".admin-close", overlay);
    if (close) {
      close.focus();
    }
  }

  function closeAdminConsole() {
    var overlay = qs("#adminOverlay");
    if (!overlay || !overlay.classList.contains("is-open")) {
      return;
    }
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("admin-open");
    document.body.style.top = "";
    document.body.style.width = "";
    state.adminOpen = false;
    window.scrollTo(0, state.lastScrollY || 0);
    if (window.location.hash === "#admin") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (state.lastFocusedElement && state.lastFocusedElement.focus) {
      state.lastFocusedElement.focus();
    }
  }

  function toggleAdminConsole() {
    var overlay = qs("#adminOverlay");
    if (overlay && overlay.classList.contains("is-open")) {
      closeAdminConsole();
    } else {
      openAdminConsole();
    }
  }

  function showAdminStamp(text) {
    var drawer = qs(".admin-drawer");
    if (!drawer) {
      return;
    }
    var stamp = qs(".admin-stamp-feedback", drawer);
    if (!stamp) {
      stamp = document.createElement("div");
      stamp.className = "admin-stamp-feedback";
      drawer.appendChild(stamp);
    }
    stamp.textContent = text || "已保存";
    stamp.classList.remove("is-visible");
    void stamp.offsetWidth;
    stamp.classList.add("is-visible");
    window.setTimeout(function () {
      stamp.classList.remove("is-visible");
    }, 1200);
  }

  function openAdminOverlay() {
    openAdminConsole();
  }

  function closeAdminOverlay() {
    closeAdminConsole();
  }

  window.openAdminConsole = openAdminConsole;
  window.closeAdminConsole = closeAdminConsole;
  window.toggleAdminConsole = toggleAdminConsole;
  window.handleAdminHashRoute = handleAdminHashRoute;
  window.bindAdminTrigger = bindAdminTrigger;

  function renderAdminList() {
    var list = qs("#adminProjectList");
    if (!list) {
      return;
    }
    list.innerHTML = state.projects.map(function (project) {
      return '<div class="admin-list-item" data-admin-project="' + escapeHTML(project.id) + '"><div><strong>' + escapeHTML(project.titleCN) + '</strong><span>' + escapeHTML(project.category) + ' / ' + escapeHTML(project.year) + ' / ' + (project.published ? "已发布" : "草稿") + '</span></div><div class="admin-item-actions"><button class="icon-button" type="button" title="编辑" data-edit-project="' + escapeHTML(project.id) + '">✎</button><button class="icon-button" type="button" title="切换发布" data-toggle-project="' + escapeHTML(project.id) + '">●</button><button class="icon-button" type="button" title="删除" data-delete-project="' + escapeHTML(project.id) + '">×</button></div></div>';
    }).join("");

    qsa("[data-edit-project]", list).forEach(function (button) {
      button.addEventListener("click", function () {
        var project = state.projects.find(function (item) { return item.id === button.getAttribute("data-edit-project"); });
        fillProjectForm(project);
      });
    });

    qsa("[data-toggle-project]", list).forEach(function (button) {
      button.addEventListener("click", async function () {
        await togglePublishStatus(button.getAttribute("data-toggle-project"));
        await refreshData();
        renderAll();
      });
    });

    qsa("[data-delete-project]", list).forEach(function (button) {
      button.addEventListener("click", async function () {
        await deleteProject(button.getAttribute("data-delete-project"));
        await refreshData();
        renderAll();
      });
    });
  }

  function fillProjectForm(project) {
    var form = qs("#projectForm");
    if (!form) {
      return;
    }
    form.reset();
    form.elements.id.value = project ? project.id : "";
    form.elements.titleCN.value = project ? project.titleCN : "";
    form.elements.titleEN.value = project ? project.titleEN : "";
    form.elements.category.value = project ? project.category : "Architecture";
    form.elements.year.value = project ? project.year : new Date().getFullYear().toString();
    form.elements.location.value = project ? project.location : "";
    form.elements.status.value = project ? project.status : "Draft";
    form.elements.material.value = project ? project.material : "";
    form.elements.scale.value = project ? project.scale : "";
    form.elements.role.value = project ? project.role : "";
    form.elements.coverImage.value = project ? project.coverImage : "";
    form.elements.gallery.value = project ? parseList(project.gallery).join(", ") : "";
    form.elements.drawings.value = project ? parseList(project.drawings).join(", ") : "";
    form.elements.model3d.value = project ? project.model3d : "";
    form.elements.panorama.value = project ? project.panorama : "";
    form.elements.video.value = project ? project.video : "";
    form.elements.pdf.value = project ? project.pdf : "";
    form.elements.tags.value = project ? project.tags.join(", ") : "";
    form.elements.concept.value = project ? project.concept : "";
    form.elements.description.value = project ? project.description : "";
    form.elements.featured.checked = project ? Boolean(project.featured) : false;
    form.elements.published.checked = project ? Boolean(project.published) : true;
  }

  async function handleProjectFormSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var data = {
      titleCN: form.elements.titleCN.value.trim(),
      titleEN: form.elements.titleEN.value.trim(),
      category: form.elements.category.value,
      year: form.elements.year.value.trim(),
      location: form.elements.location.value.trim(),
      status: form.elements.status.value.trim() || (form.elements.published.checked ? "Published" : "Draft"),
      material: form.elements.material.value.trim(),
      scale: form.elements.scale.value.trim(),
      role: form.elements.role.value.trim(),
      coverImage: form.elements.coverImage.value.trim(),
      gallery: parseList(form.elements.gallery.value),
      drawings: parseList(form.elements.drawings.value),
      model3d: form.elements.model3d.value.trim(),
      panorama: form.elements.panorama.value.trim(),
      video: form.elements.video.value.trim(),
      pdf: form.elements.pdf.value.trim(),
      tags: parseTags(form.elements.tags.value),
      description: form.elements.description.value.trim(),
      concept: form.elements.concept.value.trim() || form.elements.description.value.trim().slice(0, 48),
      featured: form.elements.featured.checked,
      published: form.elements.published.checked
    };
    var id = form.elements.id.value;
    if (id) {
      await updateProject(id, data);
    } else {
      await createProject(data);
    }
    await refreshData();
    renderAll();
    fillProjectForm(null);
    showAdminStamp("案卷已保存");
  }

  function fillSettingsForm() {
    var form = qs("#settingsForm");
    if (!form || !state.settings) {
      return;
    }
    form.elements.studioName.value = state.settings.studioName;
    form.elements.studioSeal.value = state.settings.studioSeal;
    form.elements.taglineCN.value = state.settings.taglineCN;
    form.elements.taglineEN.value = state.settings.taglineEN;
    form.elements.intro.value = state.settings.intro;
    form.elements.email.value = state.settings.email;
    form.elements.portfolioPdf.value = state.settings.portfolioPdf;
  }

  async function handleSettingsSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    await updateSiteSettings({
      studioName: form.elements.studioName.value.trim(),
      studioSeal: form.elements.studioSeal.value.trim(),
      taglineCN: form.elements.taglineCN.value.trim(),
      taglineEN: form.elements.taglineEN.value.trim(),
      intro: form.elements.intro.value.trim(),
      email: form.elements.email.value.trim(),
      portfolioPdf: form.elements.portfolioPdf.value.trim()
    });
    await refreshData();
    renderAll();
    showAdminStamp("首页已更新");
  }

  async function handleUpload() {
    var input = qs("#assetInput");
    var type = qs("#assetType").value;
    var projectId = qs("#assetProject").value;
    var setCover = qs("#assetSetCover").checked;
    var log = qs("#uploadLog");
    var progress = qs("#uploadProgress");
    var files = input && input.files.length ? Array.prototype.slice.call(input.files) : [{ name: "placeholder.asset" }];
    var results = [];
    for (var i = 0; i < files.length; i += 1) {
      setUploadProgress(progress, Math.round((i / files.length) * 74));
      results.push(await uploadAsset(files[i], type, projectId, { setCover: setCover }));
    }
    setUploadProgress(progress, 100);
    window.setTimeout(function () { setUploadProgress(progress, 0); }, 900);
    await refreshData();
    renderAll();
    if (log) {
      log.innerHTML = results.map(function (item) {
        return "<p>已模拟上传 <strong>" + escapeHTML(item.type) + "</strong> 到 <strong>" + escapeHTML(item.projectId) + "</strong>：<code>" + escapeHTML(item.url) + "</code></p>";
      }).join("");
    }
    showAdminStamp("素材已入库");
  }

  function setUploadProgress(progress, value) {
    if (!progress) {
      return;
    }
    progress.style.setProperty("--progress", value + "%");
    progress.setAttribute("aria-hidden", value ? "false" : "true");
  }

  function renderAssetProjectOptions() {
    var select = qs("#assetProject");
    if (!select) {
      return;
    }
    var current = select.value || (state.projects[0] && state.projects[0].id);
    select.innerHTML = state.projects.map(function (project) {
      return '<option value="' + escapeHTML(project.id) + '">' + escapeHTML(project.titleCN) + ' / ' + escapeHTML(project.year) + '</option>';
    }).join("");
    if (current) {
      select.value = current;
    }
  }

  function renderAssetLibrary() {
    var container = qs("#assetLibrary");
    var select = qs("#assetProject");
    if (!container || !select) {
      return;
    }
    var project = state.projects.find(function (item) { return item.id === select.value; }) || state.projects[0];
    if (!project) {
      container.innerHTML = "<h4>当前没有项目</h4>";
      return;
    }
    var items = collectProjectAssets(project);
    container.innerHTML = '<h4>当前素材 / ' + escapeHTML(project.titleCN) + '</h4>' + (items.length ? items.map(function (asset) {
      return '<div class="asset-item"><small>' + escapeHTML(asset.type) + '</small><code>' + escapeHTML(asset.url) + '</code><div class="asset-actions">' +
        '<button class="icon-button" type="button" title="设为封面" data-cover-asset="' + escapeHTML(asset.url) + '">□</button>' +
        '<button class="icon-button" type="button" title="删除素材" data-remove-asset="' + escapeHTML(asset.type) + '" data-asset-url="' + escapeHTML(asset.url) + '">×</button>' +
      '</div></div>';
    }).join("") : '<p>还没有绑定素材。</p>');

    qsa("[data-remove-asset]", container).forEach(function (button) {
      button.addEventListener("click", async function () {
        await removeAsset(project.id, button.getAttribute("data-remove-asset"), button.getAttribute("data-asset-url"));
        await refreshData();
        renderAll();
      });
    });

    qsa("[data-cover-asset]", container).forEach(function (button) {
      button.addEventListener("click", async function () {
        await updateProject(project.id, { coverImage: button.getAttribute("data-cover-asset") });
        await refreshData();
        renderAll();
      });
    });
  }

  function collectProjectAssets(project) {
    var items = [];
    if (project.coverImage) { items.push({ type: "cover", url: project.coverImage }); }
    parseList(project.gallery).forEach(function (url) { items.push({ type: "gallery", url: url }); });
    parseList(project.drawings).forEach(function (url) { items.push({ type: "drawing", url: url }); });
    ["model3d", "panorama", "video", "pdf"].forEach(function (type) {
      if (project[type]) {
        items.push({ type: type, url: project[type] });
      }
    });
    return items;
  }

  async function handleProjectsImport(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    projects = (await readJSONFile(file)).map(normalizeProject);
    writeStorage();
    await refreshData();
    renderAll();
    event.target.value = "";
  }

  async function handleSettingsImport(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    siteSettings = normalizeSiteSettings(await readJSONFile(file));
    writeStorage();
    await refreshData();
    renderAll();
    event.target.value = "";
  }

  function initSectionObserver() {
    var links = qsa("[data-nav-link]");
    var sections = qsa(".section-observe");
    if (!("IntersectionObserver" in window)) {
      sections.forEach(function (section) { section.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          entry.target.classList.add("is-entering");
          window.setTimeout(function () {
            entry.target.classList.remove("is-entering");
          }, 900);
          if (document.body.classList.contains("is-threshold-jumping")) {
            triggerSectionEmbers(entry.target);
          }
          links.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        } else if (entry.boundingClientRect.top < 0) {
          entry.target.classList.add("is-passed");
        } else {
          entry.target.classList.remove("is-passed");
        }
      });
    }, { rootMargin: "-36% 0px -42% 0px", threshold: 0.02 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function triggerSectionEmbers(section) {
    if (reduceMotionQuery.matches) {
      return;
    }
    var rect = section.getBoundingClientRect();
    window.dispatchEvent(new CustomEvent("atelier:ember-burst", {
      detail: {
        x: Math.min(window.innerWidth - 80, Math.max(80, rect.left + rect.width * 0.62)),
        y: Math.max(80, Math.min(window.innerHeight - 80, rect.top + 80)),
        count: window.innerWidth < 700 ? 2 : 5
      }
    }));
  }

  function initWatangCursor() {
    var cursor = qs("#watangCursor");
    var dot = qs("#watangCursorDot");
    var pointerQuery = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : { matches: false };
    if (!cursor || !dot) {
      return;
    }

    var watangUrl = new URL("assets/images/watang.png", window.location.href).href;
    var image = new Image();
    image.onload = function () {
      document.documentElement.style.setProperty("--watang-image", 'url("' + watangUrl + '")');
      document.documentElement.classList.add("watang-image-ready");
    };
    image.onerror = function () {
      document.documentElement.classList.add("watang-image-fallback");
    };
    image.src = watangUrl;

    if (!pointerQuery.matches || reduceMotionQuery.matches) {
      document.documentElement.classList.add("watang-cursor-static");
      return;
    }

    document.body.classList.add("watang-cursor-enabled");
    var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var follower = { x: pointer.x, y: pointer.y };
    var raf = 0;
    var lastX = pointer.x;
    var rotation = 0;

    function isFormTarget(target) {
      return Boolean(target && target.closest("input, textarea, select, option, label, .admin-form, .asset-uploader"));
    }

    function isInteractiveTarget(target) {
      return Boolean(target && target.closest("a, button, .project-card, .research-card, .method-card, .contact-panel, .admin-list-item, [role='button']"));
    }

    function requestRender() {
      if (!raf) {
        raf = requestAnimationFrame(render);
      }
    }

    function render() {
      raf = 0;
      follower.x += (pointer.x - follower.x) * 0.18;
      follower.y += (pointer.y - follower.y) * 0.18;
      rotation += Math.max(-5, Math.min(5, (pointer.x - lastX) * 0.08));
      rotation *= 0.86;
      lastX = pointer.x;
      var scale = state.cursorDown ? 0.86 : state.cursorHover ? 1.14 : 1;
      cursor.style.transform = "translate3d(" + follower.x + "px, " + follower.y + "px, 0) translate(-50%, -50%) rotate(" + rotation.toFixed(2) + "deg) scale(" + scale + ")";
      dot.style.transform = "translate3d(" + pointer.x + "px, " + pointer.y + "px, 0) translate(-50%, -50%)";
      if (Math.abs(pointer.x - follower.x) > 0.2 || Math.abs(pointer.y - follower.y) > 0.2 || Math.abs(rotation) > 0.1) {
        requestRender();
      }
    }

    document.addEventListener("pointermove", function (event) {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.body.classList.add("watang-cursor-visible");
      document.body.classList.toggle("watang-cursor-typing", isFormTarget(event.target));
      state.cursorHover = isInteractiveTarget(event.target) && !isFormTarget(event.target);
      document.body.classList.toggle("watang-cursor-hover", state.cursorHover);
      requestRender();
    }, { passive: true });

    document.addEventListener("pointerover", function (event) {
      state.cursorHover = isInteractiveTarget(event.target) && !isFormTarget(event.target);
      document.body.classList.toggle("watang-cursor-hover", state.cursorHover);
      document.body.classList.toggle("watang-cursor-typing", isFormTarget(event.target));
      requestRender();
    }, { passive: true });

    document.addEventListener("pointerdown", function (event) {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }
      state.cursorDown = true;
      document.body.classList.add("watang-cursor-down");
      requestRender();
    }, { passive: true });

    document.addEventListener("pointerup", function () {
      state.cursorDown = false;
      document.body.classList.remove("watang-cursor-down");
      requestRender();
    }, { passive: true });

    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("watang-cursor-visible");
    });
  }

  function initEmberCanvas() {
    if (reduceMotionQuery.matches) {
      return;
    }
    var canvas = document.createElement("canvas");
    canvas.className = "ember-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var size = { width: 0, height: 0, dpr: 1 };
    var embers = [];
    var resizeTimer = 0;
    var lastScrollY = window.scrollY || 0;
    var ambientTimer = 0;

    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        size.dpr = Math.min(window.devicePixelRatio || 1, 2);
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        canvas.width = Math.floor(size.width * size.dpr);
        canvas.height = Math.floor(size.height * size.dpr);
        ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      }, 80);
    }

    function spawn(x, y, count, burst) {
      var mobile = window.innerWidth < 700;
      var finalCount = Math.min(mobile ? 3 : 8, count || 1);
      for (var i = 0; i < finalCount; i += 1) {
        embers.push({
          x: x + (Math.random() - 0.5) * 70,
          y: y + (Math.random() - 0.5) * 24,
          vx: (Math.random() - 0.46) * (burst ? 0.9 : 0.35),
          vy: (burst ? 1.1 : 0.45) + Math.random() * 0.8,
          curve: (Math.random() - 0.5) * 0.012,
          life: 0,
          maxLife: burst ? 90 + Math.random() * 42 : 150 + Math.random() * 80,
          r: burst ? 1.4 + Math.random() * 1.4 : 0.8 + Math.random() * 1.1,
          trail: []
        });
      }
    }

    function draw(time) {
      var currentY = window.scrollY || 0;
      state.scrollDirection = currentY >= lastScrollY ? 1 : -1;
      lastScrollY = currentY;
      ctx.clearRect(0, 0, size.width, size.height);
      ambientTimer += 1;
      if (ambientTimer > (window.innerWidth < 700 ? 150 : 92)) {
        ambientTimer = 0;
        spawn(size.width * (0.48 + Math.random() * 0.18), size.height * 0.72, 1, false);
      }
      embers = embers.filter(function (ember) {
        ember.life += 1;
        ember.vx += ember.curve;
        ember.x += ember.vx + Math.sin((ember.life + time * 0.01) * 0.04) * 0.16;
        ember.y += ember.vy + Math.max(0, state.scrollDirection) * 0.12;
        ember.trail.push({ x: ember.x, y: ember.y });
        if (ember.trail.length > 14) {
          ember.trail.shift();
        }
        var alpha = Math.max(0, 1 - ember.life / ember.maxLife);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        for (var i = 1; i < ember.trail.length; i += 1) {
          var a = (i / ember.trail.length) * alpha * 0.26;
          ctx.strokeStyle = "rgba(242, 140, 56, " + a + ")";
          ctx.lineWidth = ember.r * (i / ember.trail.length);
          ctx.beginPath();
          ctx.moveTo(ember.trail[i - 1].x, ember.trail[i - 1].y);
          ctx.lineTo(ember.trail[i].x, ember.trail[i].y);
          ctx.stroke();
        }
        var glow = ctx.createRadialGradient(ember.x, ember.y, 0, ember.x, ember.y, ember.r * 8);
        glow.addColorStop(0, "rgba(255, 180, 92, " + alpha * 0.72 + ")");
        glow.addColorStop(0.38, "rgba(242, 140, 56, " + alpha * 0.22 + ")");
        glow.addColorStop(1, "rgba(242, 140, 56, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.r * 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return ember.life < ember.maxLife && ember.y < size.height + 80;
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("atelier:ember-burst", function (event) {
      var detail = event.detail || {};
      spawn(detail.x || size.width * 0.62, detail.y || size.height * 0.3, detail.count || 4, true);
    });
    resize();
    requestAnimationFrame(draw);
  }

  function initHeroCanvas() {
    var canvas = qs("#heroCanvas");
    if (!canvas) {
      return;
    }
    var ctx = canvas.getContext("2d");
    var hero = qs("#home");
    var reduceMotion = reduceMotionQuery.matches;
    var size = { width: 0, height: 0, dpr: 1 };
    var stars = [];
    var mouse = { x: 0, y: 0 };
    var resizeTimer = 0;

    function resize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        size.dpr = Math.min(window.devicePixelRatio || 1, 2);
        size.width = canvas.clientWidth;
        size.height = canvas.clientHeight;
        canvas.width = Math.floor(size.width * size.dpr);
        canvas.height = Math.floor(size.height * size.dpr);
        ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
        createStars();
        if (reduceMotion) {
          draw(performance.now());
        }
      }, 70);
    }

    function createStars() {
      var mobile = window.innerWidth < 700;
      var count = reduceMotion ? 34 : mobile ? 62 : 118;
      stars = [];
      for (var i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * size.width,
          y: Math.random() * size.height * 0.68,
          r: Math.random() * 1.25 + 0.25,
          a: Math.random() * 0.5 + 0.16,
          p: Math.random() * Math.PI * 2,
          s: Math.random() * 0.0015 + 0.0004
        });
      }
    }

    function draw(time) {
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      ctx.clearRect(0, 0, size.width, size.height);
      drawSky();
      drawStars(time);
      drawAurora(time);
      drawHorizon(time);
      drawAxis(time);
      drawEaveLine(time);
      if (!reduceMotion) {
        requestAnimationFrame(draw);
      }
    }

    function drawSky() {
      var gradient = ctx.createLinearGradient(0, 0, 0, size.height);
      gradient.addColorStop(0, "#030405");
      gradient.addColorStop(0.42, "#07100e");
      gradient.addColorStop(0.76, "#10201d");
      gradient.addColorStop(1, "#050708");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size.width, size.height);
    }

    function drawStars(time) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      stars.forEach(function (star) {
        var flicker = reduceMotion ? 0.7 : 0.55 + Math.sin(time * star.s + star.p) * 0.35;
        ctx.globalAlpha = star.a * flicker;
        ctx.fillStyle = "#d8eee8";
        ctx.beginPath();
        ctx.arc(star.x + mouse.x * 8, star.y + mouse.y * 5, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    function drawAurora(time) {
      var t = reduceMotion ? 0 : time * 0.00018;
      var centerX = size.width / 2 + mouse.x * 24 + Math.sin(t) * 18;
      var baseY = size.height * 0.96 + mouse.y * 18;
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < 4; i += 1) {
        var alpha = 0.22 - i * 0.034;
        var rx = size.width * (0.42 + i * 0.11);
        var ry = size.height * (0.48 + i * 0.07);
        ctx.beginPath();
        ctx.ellipse(centerX, baseY + i * 10, rx, ry, 0, Math.PI + 0.12, Math.PI * 2 - 0.12);
        ctx.strokeStyle = "rgba(142, 167, 160, " + alpha + ")";
        ctx.lineWidth = 2.4 + i * 1.4;
        ctx.shadowColor = "rgba(83, 106, 99, 0.65)";
        ctx.shadowBlur = 26 + i * 12;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(centerX + Math.sin(t * 1.7) * 35, baseY - 18, size.width * 0.54, size.height * 0.52, 0, Math.PI + 0.04, Math.PI * 1.96);
      ctx.strokeStyle = "rgba(215, 230, 107, 0.035)";
      ctx.lineWidth = 8;
      ctx.shadowBlur = 34;
      ctx.stroke();
      ctx.restore();
    }

    function drawHorizon(time) {
      var y = size.height * 0.72;
      var glow = ctx.createRadialGradient(size.width / 2, y + 40, 20, size.width / 2, y + 40, size.width * 0.52);
      glow.addColorStop(0, "rgba(255, 180, 92, 0.26)");
      glow.addColorStop(0.18, "rgba(242, 140, 56, 0.2)");
      glow.addColorStop(0.34, "rgba(83, 106, 99, 0.18)");
      glow.addColorStop(1, "rgba(5, 7, 8, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, y - 160, size.width, 280);

      ctx.fillStyle = "rgba(5, 7, 8, 0.62)";
      ctx.beginPath();
      ctx.moveTo(0, size.height);
      ctx.lineTo(0, y + 76);
      ctx.lineTo(size.width * 0.12, y + 28);
      ctx.lineTo(size.width * 0.25, y + 54);
      ctx.lineTo(size.width * 0.44, y + 8);
      ctx.lineTo(size.width * 0.58, y + 38);
      ctx.lineTo(size.width * 0.76, y + 10);
      ctx.lineTo(size.width, y + 64);
      ctx.lineTo(size.width, size.height);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(176, 138, 84, 0.34)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(size.width * 0.2, y + 78);
      ctx.lineTo(size.width * 0.8, y + 78);
      ctx.stroke();

      ctx.strokeStyle = "rgba(242, 140, 56, 0.24)";
      ctx.shadowColor = "rgba(242, 140, 56, 0.42)";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(size.width * 0.34, y + 48);
      ctx.bezierCurveTo(size.width * 0.44, y + 35, size.width * 0.58, y + 34, size.width * 0.68, y + 48);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function drawAxis(time) {
      var x = size.width / 2 + mouse.x * 12;
      var y = size.height * 0.72 + mouse.y * 8;
      ctx.save();
      ctx.strokeStyle = "rgba(142, 167, 160, 0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, size.height * 0.16);
      ctx.lineTo(x, size.height * 0.9);
      ctx.stroke();
      for (var i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(size.width * (0.22 + i * 0.08), y + i * 16);
        ctx.lineTo(size.width * (0.78 - i * 0.08), y + i * 16);
        ctx.stroke();
      }
      ctx.restore();
    }

    function drawEaveLine(time) {
      var y = size.height * 0.63 + mouse.y * 6;
      var left = size.width * 0.22;
      var right = size.width * 0.78;
      ctx.save();
      ctx.strokeStyle = "rgba(243, 238, 227, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, y + 26);
      ctx.lineTo(size.width * 0.36, y + 8);
      ctx.lineTo(size.width * 0.5, y - 20);
      ctx.lineTo(size.width * 0.64, y + 8);
      ctx.lineTo(right, y + 26);
      ctx.stroke();
      ctx.strokeStyle = "rgba(163, 58, 46, 0.22)";
      ctx.beginPath();
      ctx.moveTo(size.width * 0.42, y + 36);
      ctx.lineTo(size.width * 0.58, y + 36);
      ctx.stroke();
      ctx.restore();
    }

    window.addEventListener("resize", resize);
    if (hero) {
      hero.addEventListener("mousemove", function (event) {
        var rect = hero.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      });
      hero.addEventListener("mouseleave", function () {
        mouse.x = 0;
        mouse.y = 0;
      });
    }
    resize();
    if (!reduceMotion) {
      requestAnimationFrame(draw);
    }
  }
})();
