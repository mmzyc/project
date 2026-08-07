// author.js —— 作者信息注入（含样式加载）

(function() {
    // ---------- ① 路径过滤：仅非主页生效 ----------
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path === '') {
        // 主页直接返回，不加载 CSS，不注入 HTML
        return;
    }

    // ---------- ② 加载作者专属 CSS（防重复） ----------
    function loadAuthorCSS() {
        // 检查是否已存在 author.css 的 link 标签（通过 href 包含特征字符串）
        const existingLink = document.querySelector('link[href*="author.css"]');
        if (existingLink) return; // 已经加载过，跳过

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/project/css/author.css'; // 请根据你的实际路径调整
        document.head.appendChild(link);
    }
    loadAuthorCSS();

    // ---------- ③ 配置信息（统一管理） ----------
    const CONFIG = {
        name: '木锦棉棉',
        link: 'https://mjmm.top/'
    };

    // 格式化域名：mjmm.top → MJMM.top
    function formatDisplayDomain(url) {
        try {
            let fullUrl = url;
            if (!/^https?:\/\//i.test(fullUrl)) fullUrl = 'https://' + fullUrl;
            const urlObj = new URL(fullUrl);
            let hostname = urlObj.hostname;
            if (hostname.startsWith('www.')) hostname = hostname.slice(4);
            const parts = hostname.split('.');
            if (parts.length > 0) parts[0] = parts[0].toUpperCase();
            return parts.join('.');
        } catch {
            return url; // 解析失败则原样显示
        }
    }

    // ---------- ④ 防重复注入 ----------
    if (document.querySelector('.author')) return;

    // ---------- ⑤ 注入 HTML 结构 ----------
    const html = `
        <div class="author">
            <div class="author-text">
                <i>BY ${CONFIG.name}<br>
                <a href="${CONFIG.link}" target="_blank">${formatDisplayDomain(CONFIG.link)}</a>
                </i>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
})();