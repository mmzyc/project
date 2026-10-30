<script setup>
// ============================================================
//  App.vue —— 主页卡片墙
//  数据来自 src/data/pages.js，按分类分组渲染。
//  DOM 结构和 class 与旧版完全一致，css/main.css 原样适用。
// ============================================================
import { pages } from './data/pages.js'

// 按分类分组（保持出现顺序）
const groups = {}
pages.forEach(p => {
    const cat = p.category || '未分类'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(p)
})
</script>

<template>
    <div class="container">
        <div class="header">
            <h1>页面存放处</h1>
            <p>一些独立的小页面 · 点卡片进去看看</p>
        </div>

        <!-- 空状态：pages 数组没数据时显示 -->
        <div class="grid" v-if="pages.length === 0">
            <div class="empty-state">
                <span class="big-icon">📂</span>
                <p>还没有添加页面<br>在 <code>src/data/pages.js</code> 里加几条数据吧</p>
            </div>
        </div>

        <div class="category-section" v-for="(items, category) in groups" :key="category">
            <h2 class="category-title">{{ category }}</h2>
            <div class="card-grid">
                <a v-for="p in items" :key="p.url" :href="p.url" class="card" target="_blank">
                    <img class="thumb" :src="p.img" :alt="p.title" loading="lazy" />
                    <div class="info">
                        <div class="title">{{ p.title }}</div>
                        <div class="desc">{{ p.desc || '' }}</div>
                        <div class="tag" v-if="p.tags">
                            <span class="tag" v-for="t in p.tags" :key="t"># {{ t }}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
