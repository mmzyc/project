// 虽然不知道为什么要专门创建一个新文件来写这么少一段代码，可能是为了好看一点吧
// favicon（顾名思义）

// 直接加在 common.js 里，所有页面自动生效
(function() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = '/project/img/favicon.png';  // 或者 /favicon.ico
    document.head.appendChild(link);
})();