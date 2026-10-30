<script setup>
// ============================================================
//  CustomMouse.vue —— 鼠标三合一组件
//  ① 自定义指针样式（原 css/cursor.css）
//  ② 彩虹拖尾（原 js/modules/MouseEffects.js 的 drawTrail）
//  ③ 点击弹出文字（原 js/modules/MouseEffects.js 的 initClickEffect）
//  改动鼠标相关的任何效果，只改这一个文件，全站生效。
// ============================================================
import { onMounted, onUnmounted } from 'vue'

let canvas, ctx
let points = []            // 拖尾轨迹点
let lastMoveTime = 0       // 上次鼠标移动时间
let hue = 0                // 色相值（0-360）
let rafId = null           // 动画帧句柄（用于卸载时停止）
const CLICK_TEXTS = ['点赞', '投币', '赞赏', '三连']   // 点击时弹出的文字，可改成任何文字或 emoji
const CLICK_COLORS = ['#ff4d4f', '#40a9ff', '#ffc53d', '#73d13d', '#9254de', '#ff85c0']

// ---------- ③ 点击文字特效 ----------
function onClick(e) {
    const text = document.createElement('span')
    text.innerText = CLICK_TEXTS[Math.floor(Math.random() * CLICK_TEXTS.length)]
    text.style.cssText = `
        position: absolute; z-index: 2147483647; pointer-events: none; user-select: none;
        left: ${e.pageX - 25}px; top: ${e.pageY - 25}px;
        font-weight: bold; font-size: 18px;
        color: ${CLICK_COLORS[Math.floor(Math.random() * CLICK_COLORS.length)]};
        transition: transform 1s ease-out, opacity 1s ease-out;
    `
    document.body.appendChild(text)
    // 动画：上升 + 缩小 + 透明
    setTimeout(() => {
        text.style.transform = 'translateY(-60px) scale(0.7)'
        text.style.opacity = 0
    }, 10)
    setTimeout(() => text.remove(), 1000)
}

// ---------- ② 拖尾 ----------
function onMouseMove(e) {
    points.push({ x: e.clientX, y: e.clientY })
    if (points.length > 50) points.splice(0, 10)
    lastMoveTime = Date.now()
}

function drawTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 鼠标停止移动时，轨迹逐帧消退
    if (Date.now() - lastMoveTime > 0 && points.length > 0) {
        points.splice(0, 1)
    }

    // 色相随时间流动（当前固定为 195 浅蓝色系，可改回 hue 做彩虹流动）
    hue = (hue + 2) % 360
    const fixedHue = 195   // 320 粉色 / 195 浅蓝色

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]
        const alpha = (i / points.length) * 0.8 + 0.2   // 透明度渐变
        const lineWidth = 2 + 4 * (i / points.length)   // 线宽渐变
        ctx.strokeStyle = `hsla(${fixedHue}, 100%, 70%, ${alpha})`
        ctx.lineWidth = lineWidth
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    rafId = requestAnimationFrame(drawTrail)
}

function onResize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// ---------- 挂载：初始化一切 ----------
onMounted(() => {
    canvas = document.getElementById('lineTrail')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.addEventListener('click', onClick)
    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)
    drawTrail()
})

// ---------- 卸载：清理干净（旧版做不到的：不会堆积僵尸监听器） ----------
onUnmounted(() => {
    document.removeEventListener('click', onClick)
    document.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
    <canvas id="lineTrail"></canvas>
</template>

<!-- 无 scoped：指针样式要作用于全站元素（html/a/button），canvas 样式随组件 -->
<style>
/* ---------- ① 自定义指针（原 css/cursor.css，路径交给 Vite 处理 base 前缀） ---------- */
html {
    cursor: url(/img/cursor/liying_ico/Arrow_64x64.ico), auto;
}

a {
    cursor: url(/img/cursor/liying_ico/Hand_64x64.ico) 0 26, auto !important;
}

button {
    cursor: url(/img/cursor/liying_ico/Arrow_64x64.ico), auto !important;
}

/* ---------- 拖尾画布 ---------- */
#lineTrail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2147483647;
    pointer-events: none;
}
</style>
