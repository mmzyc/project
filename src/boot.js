// ============================================================
//  boot.js —— 全站共享层总开关
//  由 vite.config.js 里的 injectSharedLayer 插件自动注入每个页面，
//  页面本身不用写任何引入代码。
//  想给全站增加/删除共享行为，只改这一个文件。
// ============================================================

import { createApp } from 'vue'
import CustomMouse from './components/CustomMouse.vue'
import AuthorBadge from './components/AuthorBadge.vue'

// ---------- 1. favicon（原 js/modules/favicon.js 的职能） ----------
// public/img/favicon.png。运行时注入的标签 Vite 不会自动补 base 前缀，
// 所以用 import.meta.env.BASE_URL（即 vite.config.js 里的 '/project/'）手动拼接
const icon = document.createElement('link')
icon.rel = 'icon'
icon.href = import.meta.env.BASE_URL + 'img/favicon.png'
document.head.appendChild(icon)

// ---------- 2. 自定义光标 + 拖尾 + 点击文字特效 ----------
// 原来的 cursor.css + MouseEffects.js，已合并为 CustomMouse 组件
const mouseHost = document.createElement('div')
document.body.appendChild(mouseHost)
createApp(CustomMouse).mount(mouseHost)

// ---------- 3. 署名徽标（原 js/modules/author.js 的职能） ----------
// 仅非主页显示。主页路径：'/'、'/index.html'，部署后 '/project/'、'/project/index.html'
const path = window.location.pathname
const isHome = path === '/' || path === '/index.html' ||
               path === '/project/' || path === '/project/index.html'
if (!isHome) {
    const badgeHost = document.createElement('div')
    document.body.appendChild(badgeHost)
    createApp(AuthorBadge).mount(badgeHost)
}
