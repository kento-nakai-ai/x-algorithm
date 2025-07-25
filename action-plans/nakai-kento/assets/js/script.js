// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initTemplateTabs();
    initScheduleTabs();
    initProgressTrackers();
    initChecklist();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Template tabs functionality
function initTemplateTabs() {
    const templateTabs = document.querySelectorAll('.template-tab');
    const templatePanels = document.querySelectorAll('.template-panel');
    
    // Template data for each tab
    const templateData = {
        morning: [
            {
                title: "パターン1: AIニュース解説",
                content: `🔥 【アンバサダーの目線】最新○○機能をチェック

✅ ポイント1
✅ ポイント2  
✅ ポイント3

実際に触ってみた感想：
[具体的な体験談]

この機能で○○が変わりそう！

#AI #生成AI #Dify #feloAI

[画像: 機能のスクリーンショット]`
            },
            {
                title: "パターン2: トレンド解説",
                content: `📈 今朝のAIトレンド分析

「○○」が話題になってる理由：
①[理由1]
②[理由2]
③[理由3]

エンジニア目線での予測：
[専門的な見解]

皆さんはどう思いますか？🤔

#AI教育 #技術トレンド

[画像: トレンドのグラフ・図解]`
            }
        ],
        noon: [
            {
                title: "パターン1: 実践Tips",
                content: `💡 【Dify実践Tips #○】○○を5分で作る方法

🛠️ 手順：
1. [ステップ1]
2. [ステップ2]
3. [ステップ3]

⚡ ポイント：
「[重要なコツ]」

9月のAI講座でも詳しく解説予定！
AIある毎日を一緒に作りましょう😊

#Dify #AI教育 #ノーコード

[画像: 手順を示すGIF]`
            },
            {
                title: "パターン2: 講座予告",
                content: `🎓 【9月AI講座 スニークピーク】

今日は「○○」について準備中📚

非エンジニアでも
✅ [できること1]
✅ [できること2]
✅ [できること3]

「AIは難しい」→「AIって楽しい！」
そんな体験を届けたい。

詳細はもう少しお待ちを🙏

#AI講座 #AI教育 #初心者歓迎

[画像: 講座準備の様子]`
            }
        ],
        evening: [
            {
                title: "パターン1: 引用投稿",
                content: `これめちゃくちゃ共感👏

@[ユーザー名] さんの○○、本当にその通り！

私の経験だと、さらに
「[追加の価値・体験談]」

みたいなアプローチも効果的でした💪

一緒にAIコミュニティ盛り上げましょう🔥

[引用元の投稿]`
            },
            {
                title: "パターン2: イベント共有",
                content: `🎉 [イベント名] 参加してきました！

特に印象的だったのは：
- [ポイント1]
- [ポイント2]

AIスクール運営の視点から
「[学んだこと・気づき]」

こういう学びを講座にも活かしたい😊

#[イベントハッシュタグ] #AI教育

[画像: イベントの様子]`
            }
        ],
        night1: [
            {
                title: "パターン1: 実装動画",
                content: `🎥 【実装解説】Dify × n8n連携やってみた

今回作ったもの：
「[作成したもの]」

🔧 技術ポイント：
- [ポイント1]
- [ポイント2]

動画で詳しく解説👇
手を動かすのが一番の学習法！

[動画を埋め込み]

#Dify #n8n #AI開発 #実装

質問あればコメントで🙋‍♂️`
            },
            {
                title: "パターン2: 体験談・事例",
                content: `📝 【プロジェクト事例】大手企業でのAI導入

課題：[具体的な課題]
解決策：[実装した解決策]
結果：[得られた成果]

学んだこと：
「[重要な学び]」

こういう実践経験を
9月の講座でも共有します！

#AI導入 #プロジェクト管理 #DX

[画像: プロジェクトの成果グラフ]`
            }
        ],
        night2: [
            {
                title: "パターン1: 質問投稿",
                content: `🤔 皆さんに質問です！

AI導入で一番の壁は何ですか？

A) 技術的な難しさ
B) 社内の理解不足  
C) コスト面
D) その他

私は○○が多いと感じてます。
コメントで理由も教えてください！

みんなで解決策考えましょう💪

#AI導入 #相談 #コミュニティ

[画像: アンケート機能を使用]`
            },
            {
                title: "パターン2: 議論提起",
                content: `🔥 議論したいテーマ

「AIエンジニアに必要なスキル」
技術力 vs コミュニケーション力

私の結論：
「[個人的な見解]」

理由：[理由1、理由2...]

皆さんはどう思いますか？
実体験も教えて🙏

#AIエンジニア #スキル #キャリア

[画像: スキルマップ図解]`
            }
        ]
    };
    
    templateTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            templateTabs.forEach(t => t.classList.remove('active'));
            templatePanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel and populate with data
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                populateTemplatePanel(targetPanel, templateData[targetTab]);
            }
        });
    });
    
    // Populate template panel with data
    function populateTemplatePanel(panel, templates) {
        const grid = panel.querySelector('.template-grid');
        grid.innerHTML = '';
        
        templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.innerHTML = `
                <h4>${template.title}</h4>
                <div class="template-text">
                    <pre>${template.content}</pre>
                </div>
                <button class="copy-btn" onclick="copyTemplate(this)">
                    <i class="fas fa-copy"></i> コピー
                </button>
            `;
            grid.appendChild(card);
        });
    }
}

// Schedule tabs functionality
function initScheduleTabs() {
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleWeeks = document.querySelectorAll('.schedule-week');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetWeek = this.getAttribute('data-week');
            
            // Remove active class from all tabs
            scheduleTabs.forEach(t => t.classList.remove('active'));
            scheduleWeeks.forEach(w => w.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding week
            const targetWeekElement = document.getElementById(targetWeek);
            if (targetWeekElement) {
                targetWeekElement.classList.add('active');
            }
        });
    });
}

// Copy template functionality
function copyTemplate(button) {
    const templateCard = button.closest('.template-card');
    const templateText = templateCard.querySelector('pre').textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(templateText).then(function() {
        // Update button to show success
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> コピー完了';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    });
}

// Progress tracker functionality
function initProgressTrackers() {
    const followersInput = document.getElementById('followers');
    const impressionsInput = document.getElementById('impressions');
    
    if (followersInput) {
        followersInput.addEventListener('input', function() {
            updateProgressBar('followers', this.value, 9000);
        });
    }
    
    if (impressionsInput) {
        impressionsInput.addEventListener('input', function() {
            updateProgressBar('impressions', this.value, 5000000);
        });
    }
    
    // Load saved values from localStorage
    loadProgressValues();
}

function updateProgressBar(type, currentValue, targetValue) {
    const progressItem = document.querySelector(`#${type}`).closest('.progress-item');
    const progressFill = progressItem.querySelector('.progress-fill');
    const progressText = progressItem.querySelector('.progress-text');
    
    const percentage = Math.min((currentValue / targetValue) * 100, 100);
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${formatNumber(currentValue)} / ${formatNumber(targetValue)}`;
    
    // Save to localStorage
    localStorage.setItem(`nakai-${type}`, currentValue);
}

function formatNumber(num) {
    if (num >= 10000) {
        return Math.round(num / 10000) + '万';
    }
    return num.toLocaleString();
}

function loadProgressValues() {
    const savedFollowers = localStorage.getItem('nakai-followers');
    const savedImpressions = localStorage.getItem('nakai-impressions');
    
    if (savedFollowers) {
        const followersInput = document.getElementById('followers');
        if (followersInput) {
            followersInput.value = savedFollowers;
            updateProgressBar('followers', savedFollowers, 9000);
        }
    }
    
    if (savedImpressions) {
        const impressionsInput = document.getElementById('impressions');
        if (impressionsInput) {
            impressionsInput.value = savedImpressions;
            updateProgressBar('impressions', savedImpressions, 5000000);
        }
    }
}

// Checklist functionality
function initChecklist() {
    const checklistInputs = document.querySelectorAll('.checklist-input');
    const today = new Date().toDateString();
    
    // Load saved checklist state
    loadChecklistState();
    
    checklistInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            saveChecklistState();
            
            if (this.checked) {
                // Add celebration animation
                this.closest('.checklist-item').style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.closest('.checklist-item').style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
    
    // Reset checklist daily
    const lastResetDate = localStorage.getItem('nakai-checklist-date');
    if (lastResetDate !== today) {
        resetDailyChecklist();
        localStorage.setItem('nakai-checklist-date', today);
    }
}

function saveChecklistState() {
    const checklistInputs = document.querySelectorAll('.checklist-input');
    const checklistState = Array.from(checklistInputs).map(input => input.checked);
    localStorage.setItem('nakai-checklist', JSON.stringify(checklistState));
}

function loadChecklistState() {
    const savedState = localStorage.getItem('nakai-checklist');
    if (savedState) {
        const checklistState = JSON.parse(savedState);
        const checklistInputs = document.querySelectorAll('.checklist-input');
        
        checklistInputs.forEach((input, index) => {
            if (checklistState[index]) {
                input.checked = true;
            }
        });
    }
}

function resetDailyChecklist() {
    const checklistInputs = document.querySelectorAll('.checklist-input');
    checklistInputs.forEach(input => {
        input.checked = false;
    });
    localStorage.removeItem('nakai-checklist');
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationFillMode = 'both';
            }
        });
    }, observerOptions);
    
    // Observe all cards and important elements
    const animatedElements = document.querySelectorAll('.overview-card, .routine-item, .template-card, .day-card, .kpi-card, .tool-category');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.copyTemplate = copyTemplate; 