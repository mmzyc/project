// ============================================================
//  common.js —— 所有页面的唯一入口
//  在这里加载所有需要的 CSS 和 JS 模块
// ============================================================

(function() {
    // ---------- CSS 文件列表 ----------
    const styles = [
        'css/cursor.css',
        // 以后新增的 CSS 在这里加一行
    ];

    // ---------- JS 文件列表 ----------
    const modules = [
        // 第三方库
        // 'https://cdn.jsdelivr.net/npm/xxx@1.0.0/dist/xxx.min.js',
        
        // 自己的模块
        'js/modules/MouseEffects.js',
        'js/modules/favicon.js',
        // 以后新增的 JS，模块 在这里加一行
    ];

    // ---------- 加载 CSS ----------
    styles.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });

    // ---------- 顺序加载 JS ----------
    function loadScripts(index) {
        if (index >= modules.length) return;
        const script = document.createElement('script');
        script.src = modules[index];
        script.async = false;
        document.head.appendChild(script);
        script.onload = () => loadScripts(index + 1);
        script.onerror = () => loadScripts(index + 1);
    }

    loadScripts(0);
})();