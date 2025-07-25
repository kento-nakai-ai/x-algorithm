/**
 * 共通プレゼンテーション機能
 * スライドナビゲーション、キーボードショートカット、UI更新
 */

class PresentationController {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideCounter = document.getElementById('slideCounter');
        this.progressBar = document.getElementById('progressBar');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // 初期スライドの表示
        this.showSlide(this.currentSlide);
    }

    setupEventListeners() {
        // ナビゲーションボタン
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
        });
    }

    showSlide(index) {
        // 全スライドを非表示
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // 指定スライドを表示
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        // UI更新
        this.updateUI();
    }

    updateUI() {
        // スライドカウンター更新
        if (this.slideCounter) {
            this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
        }

        // プログレスバー更新
        if (this.progressBar) {
            const progressPercentage = ((this.currentSlide + 1) / this.totalSlides) * 100;
            this.progressBar.style.width = `${progressPercentage}%`;
        }

        // ボタンの有効/無効状態
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
        }
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.showSlide(this.currentSlide);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.showSlide(this.currentSlide);
        }
    }

    // 特定のスライドにジャンプ
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.showSlide(this.currentSlide);
        }
    }

    // 現在のスライド番号を取得
    getCurrentSlide() {
        return this.currentSlide;
    }

    // 総スライド数を取得
    getTotalSlides() {
        return this.totalSlides;
    }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // プレゼンテーション要素が存在する場合のみ初期化
    if (document.querySelector('.slide')) {
        window.presentationController = new PresentationController();
    }
});

// ユーティリティ関数
const Utils = {
    // デバウンス機能（パフォーマンス向上）
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // ローディング表示
    showLoading(element, message = 'Loading...') {
        if (element) {
            element.innerHTML = `
                <div class="flex items-center justify-center w-full h-full">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
                    <p class="ml-3 text-slate-500">${message}</p>
                </div>
            `;
        }
    },

    // エラー表示
    showError(element, message = 'エラーが発生しました') {
        if (element) {
            element.innerHTML = `
                <div class="text-red-500 p-4 bg-red-100 rounded-lg">
                    <p class="font-bold">⚠️ ${message}</p>
                </div>
            `;
        }
    }
};

// エクスポート（モジュール環境で使用する場合）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PresentationController, Utils };
} 