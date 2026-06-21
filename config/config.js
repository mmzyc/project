// js/config.js
// 配置文件

// ════════════════════════════════════════════
//  ★★★ 在这里添加你的页面 ★★★
// ════════════════════════════════════════════
const pages = [
    {
        title: "待办清单",
        desc: "一个轻量级的 TODO 小工具",
        img: "img/todo.jpg",      // 图片路径，可换成 .png .webp
        url: "todo.html",
        tag: "工具"
    },
    {
        title: "天气查询",
        desc: "查看实时天气信息",
        img: "img/weather.jpg",
        url: "weather.html",
        tag: "工具"
    },
    {
        title: "番茄时钟",
        desc: "专注计时器，番茄工作法",
        img: "img/clock.jpg",
        url: "clock.html",
        tag: "效率"
    },
    {
        title: "计算器",
        desc: "简洁的计算器",
        img: "img/calc.jpg",
        url: "calculator.html",
        tag: "工具"
    },
    // ═══ 继续往下加 ═══
    // {
    //     title: "新项目",
    //     desc: "描述文字",
    //     img: "img/xxx.jpg",
    //     url: "xxx.html",
    //     tag: "分类"
    // },
];
// ════════════════════════════════════════════

// 加载函数

const grid = document.getElementById("cardGrid");

if (!pages || pages.length === 0) {
    grid.innerHTML = `
        <div class="empty-state">
            <span class="big-icon">📂</span>
            <p>还没有添加页面<br>在 <code>pages</code> 数组里加几条数据吧</p>
        </div>
    `;
} else {
    grid.innerHTML = pages
        .map(
            (p) => `
            <a href="${p.url}" class="card" target="_blank">
                <img class="thumb" src="${p.img}" alt="${p.title}" loading="lazy" />
                <div class="info">
                    <div class="title">${p.title}</div>
                    <div class="desc">${p.desc || ""}</div>
                    ${p.tag ? `<div class="tag"># ${p.tag}</div>` : ""}
                </div>
            </a>
        `
        )
        .join("");
}