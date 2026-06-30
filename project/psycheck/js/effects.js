// 特效文件

// ============================
// 工具函数
// ============================

// 随机浮点数函数
function randomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

// ============================
// 特效
// ============================

// 开场弹窗特效
(function() {
    const el = document.querySelector('.notice-content');
    if (!el) return;
    const original = el.innerHTML;
    const flicker = original.replace('请根据真实所感所想作答', '<i style="color: red; font-size: clamp(14px, 3vw, 15px);">不要欺骗我...... ♡♡♡ 我爱你......</i>');
    
    function flashOnce() {
        el.innerHTML = flicker;
        setTimeout(() => {
            el.innerHTML = original;
        }, 300);  // 闪 0.3 秒后恢复
    }

    // // 每隔 2~4 + 1 秒随机闪一次
    // setInterval(() => {
    //     const delay = randomInt(0, 2) * 1000;  // 0~2 秒随机间隔
    //     setTimeout(flashOnce, delay);
    // }, 1000);

    // 这个方案计算有点麻烦，所以我重新写了个

    function scheduleFlash() {
        const delay = randomFloat(0, 2) * 1000;  // 0~2 秒
        setTimeout(() => {
            flashOnce();
            scheduleFlash();
        }, delay);
    }
    scheduleFlash();
})();