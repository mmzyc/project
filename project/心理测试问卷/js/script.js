// ============================
// 题库（全部重新编写，共12题）
// ============================

// 备注：题号从0开始，即0号题实则为第一题
// 选项同理

const questions = [
    {
        q: "1. 深夜独处时，你更倾向于？",
        opt: ["A. 享受安静", "B. 有点不安", "C. 开灯或放音乐", "D. 找人聊天"]
    },
    {
        q: "2. 看到镜中的自己，你第一反应是？",
        opt: ["A. 正常打量", "B. 觉得陌生", "C. 回避视线", "D. 做鬼脸"]
    },
    {
        q: "3. 你觉得自己最像哪种颜色？",
        opt: ["A. 红色", "B. 蓝色", "C. 黑色", "D. 白色"]
    },
    {
        q: "4. 有人突然从背后拍你，你会？",
        opt: ["A. 吓一跳但立刻镇定", "B. 非常惊恐", "C. 回头看是谁", "D. 本能闪避"]
    },
    {
        q: "5. 你更喜欢哪种天气？",
        opt: ["A. 晴天", "B. 雨天", "C. 阴天", "D. 雪天"]
    },
    {
        q: "6. 你相信世界上有超自然存在吗？",
        opt: ["A. 完全相信", "B. 半信半疑", "C. 不太信", "D. 完全不信"]
    },
    {
        q: "7. 走夜路时，你通常会？",
        opt: ["A. 快步走不回头", "B. 边走边听音乐", "C. 绕开暗处", "D. 正常走"]
    },
    {
        q: "8. 你做过清醒梦吗？",
        opt: ["A. 经常", "B. 偶尔", "C. 很少", "D. 从没有"]
    },
    {
        q: "9. 你如何看待自己的阴暗面？",
        opt: ["A. 承认并接纳", "B. 刻意压抑", "C. 偶尔发泄", "D. 不觉得自己有"]
    },
    {
        q: "10. 你更喜欢独处还是热闹？",
        opt: ["A. 独处", "B. 热闹", "C. 看心情", "D. 都行"]
    },
    {
        q: "11. 你觉得命运是？",
        opt: ["A. 注定的", "B. 自己掌握的", "C. 随机的", "D. 无所谓的"]
    },
    {
        q: "12. 你愿意为爱付出一切吗？",
        opt: ["A. 愿意", "B. 看情况", "C. 不愿意", "D. 不知道"]
    }
];

// ============================
// 状态变量
// ============================
let current = 0;
let answers = Array(questions.length).fill(null);
const total = questions.length;
let wrongCount = 0;

// 记录哪些题目的特效已经触发过了
const triggeredEffects = {};

// DOM 引用
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const optionsEl = document.getElementById('options');
const boxEl = document.querySelector('.box');
const mainBox = document.getElementById("mainBox");
const diaryWrap = document.getElementById("diaryWrap");
const diaryPage1 = document.getElementById("diaryPage1");
const diaryPage2 = document.getElementById("diaryPage2");
const diaryPage3 = document.getElementById("diaryPage3");
const diaryPage4 = document.getElementById("diaryPage4");

let bgm;

// ============================
// 工具函数
// ============================
function clearAllEffects() {
    document.querySelectorAll('.float-text, .terror-mask, .fullscreen-love, .start-modal, .q16-modal, .submit-modal, .black-screen, .black-full-text, .end-modal')
        .forEach(el => el.remove());
    boxEl.style.opacity = "1";
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}

function resetDiary() {
    diaryPage1.style.display = "block";
    diaryPage2.style.display = "none";
    diaryPage3.style.display = "none";
    diaryPage4.style.display = "none";
    diaryWrap.style.display = "none";
}

function playBgm() {
    if (!bgm) {
        bgm = document.getElementById('bgm');
    }
    bgm.muted = false;
    bgm.volume = 0.5;
    bgm.play().catch(() => {});
}

// ============================
// 核心：渲染题目
// ============================
function renderQuestion() {
    clearAllEffects();
    const q = questions[current];
    document.getElementById("progress").innerText = `第 ${current+1} 题 / 共 ${total} 题`;
    document.getElementById("question").innerText = q.q;
    optionsEl.innerHTML = "";
    boxEl.style.opacity = "1";

    q.opt.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "option";
        if (answers[current] === idx) div.classList.add("selected");
        div.innerText = item;
        div.onclick = () => {
            // 记录答案
            answers[current] = idx;
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            div.classList.add('selected');

            nextBtn.disabled = false;

            // ---- 特殊反馈（可自定义） ----
            // 第3题：选黑色触发特殊效果
            if (current === 2 && idx === 2 && !triggeredEffects[2]) {
                triggerTerror("你选择了黑暗……", current + 1);
                triggeredEffects[2] = true;
                return;
            }
            // 第6题：选"完全相信"触发全屏打字
            if (current === 5 && idx === 0 && !triggeredEffects[5]) {
                startLoveTyping();
                triggeredEffects[5] = true;
                return;
            }
            // 第9题：选"刻意压抑"触发弹窗
            if (current === 8 && idx === 1 && !triggeredEffects[8]) {
                setTimeout(() => openQ16Modal(), 100);
                triggeredEffects[8] = true;
                return;
            }
            // 第五题：选择"雨天"触发效果
            if (current === 4 && idx === 1 && !triggeredEffects[5]) {
                triggeredEffects[5] = true;

                const optEl = div;  // 当前点击的选项元素
                const originalText = optEl.innerText;
                const originalColor = optEl.style.color
                optEl.innerText = "我也喜欢^_^";
                optEl.style.color = "gray";

                // 2秒后恢复
                setTimeout(() => {
                    optEl.innerText = originalText;
                    div.style.color = originalColor || "";
                }, 2000);

                return;
            }

            // 正常跳转下一题
            // if (current < total - 1) {
            //     current++;
            //     renderQuestion();
            // } else {
            //     showFinalModal();
            // }
        };
        optionsEl.appendChild(div);
    });

    prevBtn.disabled = current === 0;
    nextBtn.disabled = answers[current] === null;
    nextBtn.innerText = current === total - 1 ? "提交" : "下一题";
}

// ============================
// 特殊效果函数
// ============================
function triggerTerror(text, nextQ) {
    const mask = document.createElement('div');
    mask.className = 'terror-mask';
    const t = document.createElement('div');
    t.className = 'terror-text';
    mask.appendChild(t);
    document.body.appendChild(mask);
    let idx = 0;
    function ty() {
        if (idx < text.length) {
            t.innerText += text[idx];
            idx++;
            setTimeout(ty, 80);
        } else {
            setTimeout(() => {
                let gt = setInterval(() => {
                    t.innerText = t.innerText.split('').sort(() => Math.random() - 0.5).join('');
                }, 60);
                setTimeout(() => {
                    clearInterval(gt);
                    mask.remove();
                    current = nextQ;
                    renderQuestion();
                }, 600);
            }, 1000);
        }
    }
    ty();
}

function startLoveTyping() {
    boxEl.style.opacity = "0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    const el = document.createElement("div");
    el.className = "fullscreen-love";
    document.body.appendChild(el);
    const str = "你选择了相信……";
    let i = 0;
    let max = 1000;
    let timer = setInterval(() => {
        el.innerText += str[i % str.length];
        i++;
        if (el.innerText.length >= max) {
            clearInterval(timer);
            setTimeout(() => {
                el.remove();
                boxEl.style.opacity = "1";
                prevBtn.disabled = current === 0;
                nextBtn.disabled = false;
                if (current < total - 1) {
                    current++;
                    renderQuestion();
                } else {
                    showFinalModal();
                }
            }, 200);
        }
    }, 5);
}

function openQ16Modal() {
    // 创建透明遮罩
    const overlay = document.createElement("div");
    overlay.className = "q16-overlay";
    document.body.appendChild(overlay);

    const texts = ["你确定要压抑自己吗", "真的吗", "……好吧", "那继续吧"];
    let index = 0;
    const modal = document.createElement("div");
    modal.className = "q16-modal";
    const textEl = document.createElement("div");
    textEl.className = "q16-text";
    textEl.innerText = texts[index];
    const btn = document.createElement("button");
    btn.className = "q16-btn";
    btn.innerText = "继续";
    btn.onclick = () => {
        index++;
        if (index < texts.length) {
            textEl.innerText = texts[index];
            if (index === texts.length - 1) {
                btn.innerText = "关闭";
            }
        } else {
            modal.remove();
            overlay.remove();
        }
    };
    modal.append(textEl, btn);
    document.body.appendChild(modal);
}

function blackPunish() {
    const screen = document.createElement("div");
    screen.className = "black-screen";
    screen.innerText = "不要试图逃避真实";
    document.body.appendChild(screen);
    setTimeout(() => {
        screen.innerText = "再给你一次机会";
        screen.style.color = "#ffffff";
    }, 2000);
    setTimeout(() => {
        screen.remove();
        showInputModal();
    }, 3500);
}

// 没有机会了……
function blackPunishAgain() {
    const screen = document.createElement("div");
    screen.className = "black-screen";
    screen.innerText = "你不再有机会了";
    document.body.appendChild(screen);
    setTimeout(() => {
        screen.innerText = "你没有珍惜我给你的机会";
        screen.style.color = "#ffffff";
    }, 2000);
    setTimeout(() => {
        location.href = "https://mjmm.top/";
    }, 3500);
}

function showInputModal() {
    clearAllEffects();
    const modal = document.createElement("div");
    modal.className = "submit-modal";
    const inner = document.createElement("div");
    inner.className = "submit-modal-inner";
    inner.innerHTML = `
        <div style="margin-bottom: 10px; font-size: 16px; text-align: center;">输入下面的文字解锁</div>
        <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%;">
            <input type="text" id="loveInput" placeholder="请输入：I Love U" style="font-size:16px;padding:10px 14px;border:1px solid #ccc;border-radius:8px;width:100%;max-width:280px;box-sizing:border-box;">
            <button class="submit-btn" id="unlockBtn">继续</button>
        </div>
    `;
    modal.appendChild(inner);
    document.body.appendChild(modal);

    const input = document.getElementById("loveInput");
    const unlockBtn = document.getElementById("unlockBtn");
    unlockBtn.disabled = true;
    unlockBtn.style.background = "#ccc";
    unlockBtn.style.color = "#999";

    input.addEventListener('input', function() {
        const val = input.value.trim();
        if (val === "I Love U" || val === "i love u" || val === "i love you") {
            unlockBtn.disabled = false;
            unlockBtn.style.background = "#333";
            unlockBtn.style.color = "#fff";
        }
    });

    unlockBtn.onclick = function() {
        const val = input.value.trim();
        if (val === "I Love U" || val === "i love u" || val === "i love you") {
            modal.remove();
            mainBox.style.display = "none";
            resetDiary();
            diaryWrap.style.display = "flex";
        } else {
            wrongCount++;
            if (wrongCount === 1) {
                modal.remove();
                blackPunish();
            } else if (wrongCount === 2) {
                modal.remove();
                blackPunishAgain();
            } else {
                unlockBtn.disabled = true;
                unlockBtn.style.background = "#ccc";
                unlockBtn.style.color = "#999";
            }
        }
    };
}

function showFinalModal() {
    clearAllEffects();
    const modal = document.createElement("div");
    modal.className = "submit-modal";
    const inner = document.createElement("div");
    inner.className = "submit-modal-inner";
    inner.innerHTML = `
        <div style="font-size:16px;font-weight:bold;">问卷已完成</div>
        <div style="margin:12px 0;">有一份你的专属结果，要查看吗？</div>
        <button class="submit-btn" id="yesBtn">查看</button>
        <div class="refuse-tip">选"查看"才能继续哦</div>
    `;
    modal.appendChild(inner);
    document.body.appendChild(modal);
    document.getElementById("yesBtn").onclick = function() {
        modal.remove();
        showInputModal();
    };
}

// ============================
// 按钮事件
// ============================
prevBtn.onclick = () => {
    clearAllEffects();
    if (current > 0) {
        current--;
        renderQuestion();
    }
};

nextBtn.onclick = () => {
    clearAllEffects();

    if (current < total - 1) {
        current++;
        renderQuestion();
    } else {
        showFinalModal();
    }
};

// ============================
// 日记翻页
// ============================
document.getElementById("toPage2").onclick = function() {
    diaryPage1.style.display = "none";
    diaryPage2.style.display = "block";
};
document.getElementById("toPage1").onclick = function() {
    diaryPage2.style.display = "none";
    diaryPage1.style.display = "block";
};
document.getElementById("toPage3").onclick = function() {
    diaryPage2.style.display = "none";
    diaryPage3.style.display = "block";
};
document.getElementById("toPage2Back").onclick = function() {
    diaryPage3.style.display = "none";
    diaryPage2.style.display = "block";
};
document.getElementById("toPage4").onclick = function() {
    diaryPage3.style.display = "none";
    diaryPage4.style.display = "block";
};
document.getElementById("agreeBtn").onclick = function() {
    clearAllEffects();
    diaryWrap.style.display = "none";
    const blackFull = document.createElement("div");
    blackFull.className = "black-full-text";
    document.body.appendChild(blackFull);
    blackFull.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
            <div class="text-container" style="height:40px;display:flex;align-items:center;justify-content:center;"></div>
            <button class="red-confirm-btn" style="display:none;">重新开始</button>
        </div>
    `;
    const textDom = blackFull.querySelector('.text-container');
    const confirmBtn = blackFull.querySelector('.red-confirm-btn');
    const textArr = ["你愿意重新面对自己吗", "你准备好了吗", "那么，开始吧"];
    let textIndex = 0;
    function showText() {
        if (textIndex < textArr.length) {
            textDom.innerText = textArr[textIndex];
            textIndex++;
            if (textIndex === textArr.length) {
                setTimeout(() => { confirmBtn.style.display = "block"; }, 1000);
            }
            setTimeout(showText, 1500);
        }
    }
    showText();
    confirmBtn.onclick = function() {
        blackFull.remove();
        const endModal = document.createElement("div");
        endModal.className = "end-modal";
        endModal.innerHTML = `
            <div style="font-size:16px;font-weight:bold;margin-bottom:15px;">✨ 重新开始</div>
            <div style="color:#666;margin-bottom:16px;">你随时可以重新测试</div>
            <button class="start-btn" id="restartBtn">确认</button>
        `;
        document.body.appendChild(endModal);
        document.getElementById("restartBtn").onclick = function() {
            endModal.remove();
            clearAllEffects();
            resetDiary();
            current = 0;
            answers = Array(questions.length).fill(null);
            wrongCount = 0;
            boxEl.style.display = "none";
            openStartModal();
        };
    };
};

// ============================
// 开始流程
// ============================
function openStartModal() {
    clearAllEffects();
    mainBox.style.display = "none";

    const tipTexts = [
        "<b style='font-size:12px;'>欢迎来到心理自测<br>请根据真实感受选择<br>题目含少量特殊互动<br>准备好了就开始吧</br>",
        // "<b style='font-size:16px;'>请根据真实感受选择</b>",
        // "<b style='font-size:16px;'>题目含少量特殊互动</b>",
        // "<b style='font-size:16px;'>准备好了就开始吧</b>"
    ];
    let idx = 0;
    const modal = document.createElement("div");
    modal.className = "start-modal";
    const textDom = document.createElement("div");
    textDom.className = "start-text";
    textDom.innerHTML = tipTexts[idx];
    const redTip = document.createElement("div");
    redTip.className = "tiny-red-tip";
    redTip.innerText = "⚠️ 本问卷含微恐/病娇元素，不适请退出";
    const btnDom = document.createElement("button");
    btnDom.className = "start-btn";
    btnDom.innerText = "继续";
    btnDom.onclick = function() {
        idx++;
        if (idx < tipTexts.length) {
            textDom.innerHTML = tipTexts[idx];
            if (idx === tipTexts.length - 1) {
                btnDom.innerText = "进入";
            }
        } else {
            modal.remove();
            mainBox.style.display = "flex";
            renderQuestion();
        }
    };
    modal.appendChild(textDom);
    modal.appendChild(redTip);
    modal.appendChild(btnDom);
    document.body.appendChild(modal);
}

// ============================
// 玩前须知按钮
// ============================
document.getElementById('noticeBtn').onclick = function() {
    document.getElementById('noticeModal').remove();
    playBgm();
    openStartModal();
};