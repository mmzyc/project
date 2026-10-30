// ============================================================
//  main.js —— 主页入口
//  只负责把 App.vue 挂到 #app 上。
//  共享行为（自定义光标、拖尾、点击特效、favicon、署名）
//  由 vite.config.js 的注入插件自动加载 src/boot.js，与页面代码解耦。
// ============================================================

import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

createApp(App).mount('#app')
