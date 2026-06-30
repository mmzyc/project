// 鼠标点击特效，拖尾

// 创建标签
const canvas = document.createElement('canvas');
canvas.id = 'lineTrail';
canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
`;
// 添加到页面
document.body.appendChild(canvas);

function initClickEffect() {
document.addEventListener('click', function (e) {
const texts = ['点赞','投币','赞赏','三连']; // 你可以改成任何文字或 emoji
const colors = ['#ff4d4f', '#40a9ff', '#ffc53d', '#73d13d', '#9254de', '#ff85c0'];

const text = document.createElement('span');
text.innerText = texts[Math.floor(Math.random() * texts.length)];
text.style.position = 'absolute';
text.style.zIndex = 9999;
text.style.left = (e.pageX-25) + 'px';
text.style.top = (e.pageY-25) + 'px';
text.style.fontWeight = 'bold';
text.style.color = colors[Math.floor(Math.random() * colors.length)];
text.style.fontSize = '18px';
text.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
text.style.userSelect = 'none';
text.style.pointerEvents = 'none';

document.body.appendChild(text);
// 动画：上升 + 缩小 + 透明
setTimeout(() => {
    text.style.transform = 'translateY(-60px) scale(0.7)';
    text.style.opacity = 0;
}, 10);

setTimeout(() => {
    document.body.removeChild(text);
}, 1000);
});
}

function initTrail() {
const canvas = document.getElementById('lineTrail');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let points = [];
let lastMoveTime = Date.now();
let hue = 0;  // 色相值 0-360

document.addEventListener('mousemove', (e) => {
    points.push({ x: e.clientX, y: e.clientY });
    if (points.length > 50) points.splice(0, 10);
    lastMoveTime = Date.now();
});

function drawTrail() {
    ctx.clearRect(0, 0, width, height);

    const idleTime = Date.now() - lastMoveTime;
    if (idleTime > 0 && points.length > 0) {
        points.splice(0, 1);
    }

    // 让色相随时间流动，实现动态彩虹效果
    hue = (hue + 2) % 360;

    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        // 根据位置和索引计算颜色（彩虹渐变）
        const pinkHue = 320;
        const alpha = (i / points.length) * 0.8 + 0.2;  // 透明度渐变
        const lineWidth = 2 + 4 * (i / points.length);

        ctx.strokeStyle = `hsla(${pinkHue}, 100%, 70%, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    requestAnimationFrame(drawTrail);
}

drawTrail();

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});
}

// 第一次加载页面时执行
initClickEffect();
initTrail();

// 监听 PJAX，每次页面切换后重新执行
document.addEventListener('pjax:end', function () {
    initClickEffect();
    initTrail();
});
