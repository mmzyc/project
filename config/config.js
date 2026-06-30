// js/config.js
// 配置文件

// ════════════════════════════════════════════
//  ★★★ 在这里添加你的页面 ★★★
// ════════════════════════════════════════════

// 配置示例

    // {
    //     title: "待办清单",
    //     desc: "一个轻量级的 TODO 小工具",
    //     img: "img/todo.jpg",
    //     url: "todo.html",
    //     tag: "工具",
    //     category: "工具"
    // },

const pages = [
    {
        title: "心理调查问卷",
        desc: "来自github项目",
        img: "img/config_img/微信占位封面.png",
        url: "https://ghost-alpha-wine.vercel.app/",
        tags: ["趣味", "问卷"],
        category: "别人的项目"
    },
    {
        title: "心理测试问卷",
        desc: "我自己做的",
        img: "img/config_img/微信占位封面.png",
        url: "project/psycheck",
        tags: ["趣味", "问卷"],
        category: "我的项目"
    }
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
    // 按分类分组
    const groups = {};
    pages.forEach(p => {
        const cat = p.category || "未分类";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(p);
    });

    let html = "";
    for (const [category, items] of Object.entries(groups)) {
        html += `
            <div class="category-section">
                <h2 class="category-title">${category}</h2>
                <div class="card-grid">
                    ${items.map(p => `
                        <a href="${p.url}" class="card" target="_blank">
                            <img class="thumb" src="${p.img}" alt="${p.title}" loading="lazy" />
                            <div class="info">
                                <div class="title">${p.title}</div>
                                <div class="desc">${p.desc || ""}</div>
                                ${p.tags ? `<div class="tag">${p.tags.map(t => `<span class="tag"># ${t}</span>`).join('')}</div>` : ""}
                            </div>
                        </a>
                    `).join("")}
                </div>
            </div>
        `;
    }
    grid.innerHTML = html;
}