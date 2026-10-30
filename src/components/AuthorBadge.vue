<script setup>
// ============================================================
//  AuthorBadge.vue —— 右下角署名徽标
//  由原 js/modules/author.js + css/author.css 合并而成。
//  显示规则（仅非主页）在 src/boot.js 里控制。
// ============================================================

// ---------- 配置信息（统一管理） ----------
const CONFIG = {
    name: '木锦棉棉',
    link: 'https://mjmm.top/'
}

// 格式化域名：mjmm.top → MJMM.top
function formatDisplayDomain(url) {
    try {
        let fullUrl = url
        if (!/^https?:\/\//i.test(fullUrl)) fullUrl = 'https://' + fullUrl
        const urlObj = new URL(fullUrl)
        let hostname = urlObj.hostname
        if (hostname.startsWith('www.')) hostname = hostname.slice(4)
        const parts = hostname.split('.')
        if (parts.length > 0) parts[0] = parts[0].toUpperCase()
        return parts.join('.')
    } catch {
        return url // 解析失败则原样显示
    }
}
</script>

<template>
    <div class="author">
        <div class="author-text">
            <i>BY {{ CONFIG.name }}<br>
            <a :href="CONFIG.link" target="_blank">{{ formatDisplayDomain(CONFIG.link) }}</a>
            </i>
        </div>
    </div>
</template>

<!-- 无 scoped：沿用原 author.css 的全局类名，样式原样迁入 -->
<style>
/* 作者信息（原 css/author.css） */
.author {
    position: fixed;
    right: 100px;
    bottom: 20px;
    /* z-index: 2147483647; */
}
.author a {
    text-underline-offset: 7px;
    color: gray;
}
.author-text {
    line-height: 0.8;
}
.author-text * {
    font-family: serif;
    font-size: medium;
    color: black;
}
</style>
