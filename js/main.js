/* === Script block 5 (from line ~2947) === */
function toggleHero(el) {
        var detail = el.querySelector('.hero-detail');
        var hint = el.querySelector('.hero-hint');
        if (!detail) return;
        var isOpen = detail.style.maxHeight && detail.style.maxHeight !== '0px';
        if (isOpen) {
            detail.style.maxHeight = '0px';
            if (hint) hint.textContent = '▼ 点击展开';
            el.style.borderColor = '';
        } else {
            document.querySelectorAll('.hero-detail').forEach(function(d) {
                d.style.maxHeight = '0px';
                var h = d.parentElement.querySelector('.hero-hint');
                if (h) h.textContent = '▼ 点击展开';
                d.parentElement.style.borderColor = '';
            });
            detail.style.maxHeight = detail.scrollHeight + 'px';
            if (hint) hint.textContent = '▲ 收起';
            el.style.borderColor = 'rgba(52,211,153,0.25)';
        }
    }

    function openAddHero() {
        document.getElementById('addHeroOverlay').style.display = 'block';
        document.getElementById('addHeroModal').style.display = 'block';
    }
    function closeAddHero() {
        document.getElementById('addHeroOverlay').style.display = 'none';
        document.getElementById('addHeroModal').style.display = 'none';
    }
    function submitHero() {
        var name = document.getElementById('heroName').value.trim();
        var region = document.getElementById('heroRegion').value.trim();
        var story = document.getElementById('heroStory').value.trim();
        var title = document.getElementById('heroTitle').value.trim();
        if (!name || !story) { alert('请填写姓名和故事'); return; }
        var colors = ['#34d399','#06b6d4','#8b5cf6','#ff7043','#fbbf24'];
        var c = colors[Math.floor(Math.random() * colors.length)];
        var emojis = ['🧑','👩','👨','🧓','👷','🧑‍🌾'];
        var emoji = emojis[Math.floor(Math.random() * emojis.length)];
        var card = document.createElement('div');
        card.className = 'hero-card';
        card.setAttribute('onclick', 'toggleHero(this)');
        card.style.cssText = 'background:var(--glass);border:1px solid ' + c + '33;border-radius:16px;padding:1.2rem;cursor:pointer;transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);position:relative;overflow:hidden;animation:popIn 0.4s cubic-bezier(0.34,1.56,0.64,1);';
        card.innerHTML = '<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,' + c + ',' + c + '88);border-radius:16px 16px 0 0;"></div><div style="display:flex;gap:1rem;align-items:flex-start;"><div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,' + c + '33,' + c + '11);border:2px solid ' + c + '33;display:flex;align-items:center;justify-content:center;font-size:1.8rem;flex-shrink:0;">' + emoji + '</div><div style="flex:1;min-width:0;"><h3 style="color:' + c + ';font-size:1.05rem;font-weight:700;margin-bottom:0.1rem;">' + name + '</h3><div style="font-size:0.72rem;color:var(--text2);margin-bottom:0.4rem;">' + (region || '中国') + (title ? ' · "' + title + '"' : '') + '</div><p style="color:rgba(255,255,255,0.5);font-size:0.8rem;line-height:1.6;">' + story + '</p></div></div><div class="hero-detail" style="max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(0.4,0,0.2,1);"><div style="padding-top:0.8rem;border-top:1px solid rgba(255,255,255,0.06);margin-top:0.8rem;"><p style="color:rgba(255,255,255,0.5);font-size:0.8rem;line-height:1.8;">' + story + '</p><div style="display:flex;gap:0.3rem;margin-top:0.5rem;"><span style="padding:0.15rem 0.5rem;background:' + c + '15;border:1px solid ' + c + '33;border-radius:6px;font-size:0.65rem;color:' + c + ';">用户推荐</span></div></div></div><div class="hero-hint" style="text-align:center;margin-top:0.5rem;font-size:0.7rem;color:var(--text2);transition:all 0.3s;">▼ 点击展开</div>';
        var addBtn = document.querySelector('.hero-add');
        addBtn.parentElement.insertBefore(card, addBtn);
        closeAddHero();
        document.getElementById('heroName').value = '';
        document.getElementById('heroRegion').value = '';
        document.getElementById('heroStory').value = '';
        document.getElementById('heroTitle').value = '';
    }

    function openLightbox(src, name, title) {
        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightboxName').textContent = name;
        document.getElementById('lightboxTitle').textContent = title;
        document.getElementById('imgLightbox').style.display = 'flex';
        document.getElementById('imgLightbox').style.alignItems = 'center';
        document.getElementById('imgLightbox').style.justifyContent = 'center';
        document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
        document.getElementById('imgLightbox').style.display = 'none';
        document.body.style.overflow = '';
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            closeAddHero();
        }
    });

/* === Script block 6 (from line ~3203) === */
// ===== 工具函数：节流与防抖 =====
        function throttle(fn, delay) {
            let lastCall = 0;
            let timeoutId = null;
            return function(...args) {
                const now = Date.now();
                const remaining = delay - (now - lastCall);
                if (remaining <= 0) {
                    if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
                    lastCall = now;
                    fn.apply(this, args);
                } else if (!timeoutId) {
                    timeoutId = setTimeout(() => {
                        lastCall = Date.now();
                        timeoutId = null;
                        fn.apply(this, args);
                    }, remaining);
                }
            };
        }
        
        function debounce(fn, delay) {
            let timeoutId = null;
            return function(...args) {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    fn.apply(this, args);
                }, delay);
            };
        }
        
        // ===== 页面可见性优化 =====
        let pageVisible = !document.hidden;
        document.addEventListener('visibilitychange', function() {
            pageVisible = !document.hidden;
            if (!pageVisible) {
                /* page paused for battery saving */
            } else {
                /* page resumed */
            }
        });
        
        function requestAnimFrameIfVisible(callback) {
            if (!pageVisible) {
                return setTimeout(() => {
                    if (pageVisible) callback();
                }, 100);
            }
            return requestAnimationFrame(callback);
        }
        
        // ===== 移动端检测与优化 =====
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.documentElement.style.setProperty('--particle-count', '0.5');
        }
        
        // ===== 产业数据数字动画 =====
        function initJuiceCounters() {
            var nums = document.querySelectorAll('.juice-num[data-target]');
            if (!nums.length) return;
            var obs = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (e.isIntersecting && !e.target._counted) {
                        e.target._counted = true;
                        var target = parseInt(e.target.getAttribute('data-target'));
                        var cur = 0;
                        var step = Math.max(1, Math.floor(target / 40));
                        var timer = setInterval(function() {
                            cur += step;
                            if (cur >= target) { cur = target; clearInterval(timer); }
                            e.target.textContent = cur;
                        }, 30);
                    }
                });
            }, { threshold: 0.5 });
            nums.forEach(function(n) { obs.observe(n); });
        }

        // ===== 移动端触摸优化 =====
        function initTouchOptimizations() {
            // 点击亮纹效果（仅特定卡片）
            document.addEventListener('click', function(e) {
                var card = e.target.closest('.stat-card, .crisis-card, .achievement-card, .hero-card, .sg-card, .message-card, .juice-stat-card');
                if (!card || card.classList.contains('hero-add')) return;
                card.classList.remove('shine-active');
                var old = card.querySelector('.shine-sweep');
                if (old) old.remove();
                var sweep = document.createElement('div');
                sweep.className = 'shine-sweep';
                card.appendChild(sweep);
                void sweep.offsetWidth;
                card.classList.add('shine-active');
                setTimeout(function() { sweep.remove(); card.classList.remove('shine-active'); }, 1000);
            });

            // 为所有可点击元素添加触摸反馈
            const touchElements = document.querySelectorAll('.stat-card, .soil-card, .crisis-card, .achievement-card, .plant-item, .disaster-card, .season-card, .compare-region-card, .plant-btn, .ggstage-btn, .chart-type-btn, .filter-btn');
            touchElements.forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.transition = 'transform 0.1s';
                    this.style.transform = 'scale(0.98)';
                }, { passive: true });
                el.addEventListener('touchend', function() {
                    this.style.transform = '';
                }, { passive: true });
                el.addEventListener('touchcancel', function() {
                    this.style.transform = '';
                }, { passive: true });
            });
            
            // 改进滑动体验：防止滚动时的意外点击
            let touchStartY = 0;
            let isScrolling = false;
            document.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
                isScrolling = false;
            }, { passive: true });
            document.addEventListener('touchmove', function() {
                isScrolling = true;
            }, { passive: true });
            document.addEventListener('touchend', function(e) {
                if (isScrolling) {
                    e.target.style.pointerEvents = 'none';
                    setTimeout(() => { e.target.style.pointerEvents = ''; }, 500);
                }
            }, { passive: true });
        }
        
        // ===== 图片懒加载 =====
        function initLazyImages() {
            const lazyImgs = document.querySelectorAll('img[data-src]');
            if (!lazyImgs.length) return;
            if ('IntersectionObserver' in window) {
                const imgObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                            img.removeAttribute('data-src');
                            img.removeAttribute('data-srcset');
                            imgObserver.unobserve(img);
                        }
                    });
                }, { rootMargin: '200px' });
                lazyImgs.forEach(img => imgObserver.observe(img));
            } else {
                lazyImgs.forEach(img => { img.src = img.dataset.src; });
            }
        }

        // ===== 沙漠前后对比滑块 =====
        function initCompareSlider() {
            const container = document.getElementById('compareContainer');
            const slider = document.getElementById('compareSlider');
            const before = document.getElementById('compareBefore');
            if (!container || !slider || !before) return;
            
            let isDragging = false;
            
            function setPosition(pct) {
                pct = Math.max(5, Math.min(95, pct));
                slider.style.left = pct + '%';
                before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
                const labels = {
                    10: '🏜️ 严重沙漠化',
                    30: '🏜️ 流动沙丘',
                    50: '⚖️ 过渡阶段',
                    70: '🌿 开始绿化',
                    90: '🌿 绿洲化'
                };
                let text = pct + '% 绿洲化';
                for (const [k, v] of Object.entries(labels)) {
                    if (pct <= parseFloat(k)) { text = v + ' ' + Math.round(pct) + '%'; break; }
                }
                const lbl = document.getElementById('compareSliderLabel');
                if (lbl) lbl.textContent = text;
            }
            
            slider.addEventListener('mousedown', e => { isDragging = true; e.preventDefault(); });
            document.addEventListener('mousemove', e => {
                if (!isDragging) return;
                const rect = container.getBoundingClientRect();
                setPosition((e.clientX - rect.left) / rect.width * 100);
            });
            document.addEventListener('mouseup', () => { isDragging = false; });
            slider.addEventListener('touchstart', e => { isDragging = true; }, { passive: true });
            document.addEventListener('touchmove', e => {
                if (!isDragging) return;
                const rect = container.getBoundingClientRect();
                setPosition((e.touches[0].clientX - rect.left) / rect.width * 100);
            }, { passive: true });
            document.addEventListener('touchend', () => { isDragging = false; }, { passive: true });
            
            // Init region card bars
            setTimeout(() => {
                document.querySelectorAll('.compare-region-card').forEach(card => {
                    card.querySelectorAll('.bar-fill').forEach(f => {
                        const w = f.getAttribute('data-w');
                        if (w) f.style.width = w + '%';
                    });
                });
            }, 800);
        }
        
        function setCompare(pct) {
            const slider = document.getElementById('compareSlider');
            const before = document.getElementById('compareBefore');
            if (!slider || !before) return;
            slider.style.left = pct + '%';
            before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
            const lbl = document.getElementById('compareSliderLabel');
            if (lbl) lbl.textContent = '🏜️→🌿 ' + pct + '% 绿化';
        }
        window.setCompare = setCompare;

        // 切换沙漠对比图
        var desertData={
            kubuqi:{before:'images/img_022.jpg',after:'images/img_023.jpg',bt:'🏜️ 库布其2000',bs:'植被指数极低，大面积裸沙',at:'🌿 库布其2019',as:'植被覆盖显著增加，光伏板成片',
                chips:[{icon:'🌲',text:'植被率 1.5%→25%'},{icon:'🏜️',text:'沙化率 98%→35%'},{icon:'🌍',text:'1.86万km²'},{icon:'🌱',text:'固碳620万吨/年'}]},
            tengger:{before:'images/img_024.jpg',after:'images/img_025.jpg',bt:'🌵 腾格里2014',bs:'流动沙丘密布',at:'🌿 腾格里2021',as:'光伏板+植被覆盖',
                chips:[{icon:'🌲',text:'植被率 0.8%→18%'},{icon:'🏜️',text:'沙化率 下降70%'},{icon:'🌍',text:'4.27万km²'},{icon:'🌱',text:'固碳380万吨/年'}]},
            maowusu:{before:'images/img_026.jpg',after:'images/img_027.jpg',bt:'🏜️ 毛乌素2003',bs:'大面积流动沙丘',at:'🌿 毛乌素2019',as:'森林覆盖率33%',
                chips:[{icon:'🌲',text:'森林率 2.5%→33%'},{icon:'🏜️',text:'沙化率 下降73%'},{icon:'🌍',text:'4.22万km²'},{icon:'🌱',text:'固碳850万吨/年'}]}
        };
        window.curDesert='tengger';
        function switchDesert(key){window.curDesert=key;var d=desertData[key];if(!d)return;var imgB=document.getElementById("imgBefore");var imgA=document.getElementById("imgAfter");if(imgB){imgB.src=d.before;}if(imgA){imgA.src=d.after;}var bbt=document.getElementById("beforeBigText");var bst=document.getElementById("beforeSmallText");var abt=document.getElementById("afterBigText");var ast=document.getElementById("afterSmallText");if(bbt)bbt.textContent=d.bt||"";if(bst)bst.textContent=d.bs||"";if(abt)abt.textContent=d.at||"";if(ast)ast.textContent=d.as||"";document.querySelectorAll("#page-2b .ggstage-btn").forEach(function(b){b.classList.remove("active");});var tab=document.getElementById("tab"+key.charAt(0).toUpperCase()+key.slice(1));if(tab)tab.classList.add("active");var ov=document.getElementById("compareDataOverlay");if(ov){ov.innerHTML="";if(d.chips){d.chips.forEach(function(c){var s=document.createElement("span");s.className="compare-data-chip";s.innerHTML="<span class=\"icon\">"+c.icon+"</span> "+c.text;ov.appendChild(s);});}}var cards=document.querySelectorAll(".compare-region-card");var idx={kubuqi:0,tengger:1,maowusu:2}[key]||0;cards.forEach(function(c,i){c.style.borderColor=i===idx?"rgba(52,211,153,0.5)":"";c.style.boxShadow=i===idx?"0 0 30px rgba(52,211,153,0.15)":"";});}window.switchDesert = switchDesert;
        // 图片加载检测
        window.addEventListener('load',function(){
            var img=document.getElementById('imgBefore');
            if(img){
                img.onerror=function(){
                    document.getElementById('imgNotFound').style.display='block';
                    this.style.display='none';
                };
            }
        });
        
        // ===== 时间轴展开 =====
        function toggleTimeline(el) {
            el.classList.toggle('expanded');
        }
        
        // ===== 成就系统增强 =====
        const achDefs = [
            { icon: '🌱', badge: '初次绿化', title: '种下第一棵树', desc: '你开始了治沙之旅！每棵树都是对抗荒漠化的英雄。', min: 1 },
            { icon: '🌿', badge: '小有规模', title: '绿化5棵树木', desc: '5棵树每年可固定约50m²沙地，你正在创造改变！', min: 5 },
            { icon: '🌳', badge: '森林初现', title: '绿化10棵树木', desc: '10棵成年树木每年可固沙100m²，相当于一个小花园！', min: 10 },
            { icon: '🏆', badge: '治沙达人', title: '绿化20棵树木', desc: '20棵树！每年固定200m²沙地，你已是治沙达人！', min: 20 },
            { icon: '🏅', badge: '绿洲使者', title: '绿化50棵树木', desc: '50棵！相当于半个足球场的绿化面积，沙漠在退却！', min: 50 },
        ];
        const achievedAches = new Set();
        
        function checkAchievement(count) {
            achDefs.forEach(ach => {
                if (count >= ach.min && !achievedAches.has(ach.min)) {
                    achievedAches.add(ach.min);
                    setTimeout(() => showAchPopup(ach), 600);
                }
            });
        }
        
        function showAchPopup(ach) {
            const popup = document.getElementById('achPopup');
            if (!popup) return;
            document.getElementById('achIcon').textContent = ach.icon;
            document.getElementById('achBadge').textContent = '🏆 ' + ach.badge;
            document.getElementById('achTitle').textContent = ach.title;
            document.getElementById('achDesc').textContent = ach.desc;
            const pf = document.getElementById('achProgressFill');
            if (pf) pf.style.width = Math.min(100, (ach.min / 50) * 100) + '%';
            popup.classList.add('show');
            spawnAchParticles();
        }
        
        // ===== 留言互动 =====
        document.getElementById('messageInput')?.addEventListener('input', function() {
            document.getElementById('msgCount').textContent = this.value.length;
        });

        function submitMessage() {
            const input = document.getElementById('messageInput');
            const text = input.value.trim();
            if (!text) return;
            const wall = document.getElementById('messageWall');
            const card = document.createElement('div');
            card.className = 'message-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.innerHTML = `
                <div class="msg-text">"${text}"</div>
                <div class="msg-meta"><span>刚刚</span><span class="msg-likes" onclick="likeMsg(this)">❤️ 0</span></div>
            `;
            wall.insertBefore(card, wall.firstChild);
            setTimeout(() => { card.style.transition = 'all 0.5s'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
            input.value = '';
            document.getElementById('msgCount').textContent = '0';
            showNoti('✨ 祝福已送出！');
        }

        function likeMsg(el) {
            if (el.classList.contains('liked')) return;
            el.classList.add('liked');
            const num = parseInt(el.textContent.replace(/[^\d]/g, '')) + 1;
            el.textContent = '❤️ ' + num;
            el.style.transform = 'scale(1.2)';
            setTimeout(() => { el.style.transform = ''; }, 200);
        }

        // ===== 沙棘产业彩蛋 + 专属名片 =====
        (function() {
            var egg = document.getElementById('juiceEasterEgg');
            var overlay = document.getElementById('cardOverlay');
            var modal = document.getElementById('cardModal');
            if (!egg || !modal) return;

            var roleMap = {
                'green-guardian': { emoji: '🌳', label: '绿色守护者', trees: 1, co2: 0.8, area: 10, motto: '让每棵树都有人守护', h: '320px', color: '#34d399' },
                'sand-warrior': { emoji: '🏜️', label: '治沙先锋', trees: 3, co2: 2.4, area: 30, motto: '把沙漠变成绿洲', h: '300px', color: '#fbbf24' },
                'fruit-farmer': { emoji: '🍊', label: '沙棘果农', trees: 2, co2: 1.6, area: 20, motto: '一棵树养活一家人', h: '310px', color: '#ff7043' },
                'solar-pioneer': { emoji: '☀️', label: '光伏拓荒者', trees: 1, co2: 5.2, area: 15, motto: '阳光是最好的治沙人', h: '305px', color: '#fbbf24' },
                'eco-innovator': { emoji: '🧬', label: '生态创新者', trees: 2, co2: 1.2, area: 25, motto: '用科技重新定义荒漠', h: '315px', color: '#8b5cf6' },
                'water-guardian': { emoji: '💧', label: '水源守护者', trees: 1, co2: 0.6, area: 12, motto: '每一滴水都不浪费', h: '295px', color: '#06b6d4' },
                'wild-protector': { emoji: '🦊', label: '野生动物保护员', trees: 2, co2: 1.0, area: 18, motto: '给生命留一条回家的路', h: '320px', color: '#06b6d4' }
            };
            var roleGreetings = {
                'green-guardian': '你好，绿色守护者！',
                'sand-warrior': '沙漠征服者，欢迎！',
                'fruit-farmer': '果农朋友，沙棘在等你！',
                'solar-pioneer': '阳光使者，光芒万丈！',
                'eco-innovator': '创新者，未来由你定义！',
                'water-guardian': '水源卫士，滴水穿石！',
                'wild-protector': '生命守护者，使命必达！'
            };
            var nicknames = [
                { min: 0, name: '种树小白', icon: '🌱' },
                { min: 2, name: '绿芽学徒', icon: '🌿' },
                { min: 5, name: '固沙能手', icon: '🌵' },
                { min: 10, name: '治沙达人', icon: '🌳' },
                { min: 20, name: '荒漠猎人', icon: '🦊' },
                { min: 50, name: '绿色传奇', icon: '🌍' }
            ];
            var plantCount = 0;
            var themeMap = {
                'forest': ['#0a3622','#1a6d3a','#34d399'],
                'desert': ['#3d2b1f','#8B7355','#fbbf24'],
                'sunset': ['#4a1a0a','#c0392b','#ff7043'],
                'ocean': ['#0a1a36','#2980b9','#06b6d4'],
                'aurora': ['#1a0a36','#6c3483','#a78bfa']
            };

            egg.addEventListener('click', function() {
                overlay.style.display = 'block';
                overlay.style.opacity = '0';
                modal.style.display = 'block';
                modal.style.opacity = '0';
                requestAnimationFrame(function() {
                    overlay.style.transition = 'opacity 0.35s ease';
                    overlay.style.opacity = '1';
                    modal.style.opacity = '1';
                });
                document.body.style.overflow = 'hidden';
                setTimeout(function() { initCardBgParticles(); }, 100);

                var savedName = localStorage.getItem('hero_name');
                var savedRole = localStorage.getItem('hero_role');
                var savedMotto = localStorage.getItem('hero_motto');
                if (savedName) document.getElementById('cardName').value = savedName;
                if (savedRole) document.getElementById('cardRole').value = savedRole;
                if (savedMotto) document.getElementById('cardMotto').value = savedMotto;
                updateCardGreeting();
            });

            window.closeCardModal = function() {
                stopCardBgParticles();
                overlay.style.transition = 'opacity 0.3s ease';
                modal.style.transition = 'opacity 0.3s ease';
                overlay.style.opacity = '0';
                modal.style.opacity = '0';
                setTimeout(function() {
                    modal.style.display = 'none';
                    overlay.style.display = 'none';
                    overlay.style.transition = '';
                    modal.style.transition = '';
                    document.body.style.overflow = '';
                }, 320);
            };

            function updateCardGreeting() {
                var role = document.getElementById('cardRole').value;
                var name = document.getElementById('cardName').value.trim();
                var greetEl = document.getElementById('cardGreeting');
                if (!greetEl) return;
                if (name) {
                    greetEl.textContent = roleGreetings[role] || '欢迎加入治沙人联盟！';
                    greetEl.style.color = roleMap[role] ? roleMap[role].color : '#34d399';
                } else {
                    greetEl.textContent = '输入你的名字，生成专属名片';
                    greetEl.style.color = 'var(--text2)';
                }
            }

            document.getElementById('cardRole').addEventListener('change', updateCardGreeting);
            document.getElementById('cardName').addEventListener('input', updateCardGreeting);

            window.generateCard = function() {
                var name = document.getElementById('cardName').value.trim() || '治沙人';
                var role = document.getElementById('cardRole').value;
                var motto = document.getElementById('cardMotto').value.trim() || '';
                var theme = document.getElementById('cardTheme').value;
                var info = roleMap[role];
                var colors = themeMap[theme];
                var now = new Date();
                var dateStr = now.getFullYear() + '.' + String(now.getMonth()+1).padStart(2,'0') + '.' + String(now.getDate()).padStart(2,'0');

                localStorage.setItem('hero_name', name);
                localStorage.setItem('hero_role', role);
                localStorage.setItem('hero_motto', motto);

                plantCount++;
                var nick = nicknames[0];
                for (var i = nicknames.length - 1; i >= 0; i--) {
                    if (plantCount >= nicknames[i].min) { nick = nicknames[i]; break; }
                }

                document.getElementById('cardEmoji').textContent = info.emoji;
                document.getElementById('cardNameDisplay').textContent = name;
                document.getElementById('cardRoleDisplay').textContent = info.label;
                document.getElementById('cardMottoDisplay').textContent = motto || info.motto;
                document.getElementById('cardDate').textContent = dateStr;
                document.getElementById('cardNickname').textContent = nick.icon + ' ' + nick.name;
                document.getElementById('cardGreetingPreview').textContent = roleGreetings[role] || '';
                document.getElementById('cardGreetingPreview').style.color = info.color;
                document.getElementById('cardCanvasWrap').style.background = 'linear-gradient(160deg,' + colors[0] + ' 0%,#0d1a24 40%,' + colors[1] + ' 100%)';
                document.getElementById('cardRoleDisplay').style.color = colors[2];
                document.getElementById('cardCanvasWrap').style.minHeight = info.h;

                spawnCardParticles();

                var content = document.getElementById('cardContent');
                var result = document.getElementById('cardResult');
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
                setTimeout(function() {
                    content.style.display = 'none';
                    result.style.display = 'block';
                    result.style.opacity = '0';
                    result.style.transform = 'translateY(15px)';
                    var els = result.querySelectorAll('#cardEmoji, #cardNameDisplay, #cardRoleDisplay, #cardMottoDisplay');
                    els.forEach(function(el, i) {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(12px)';
                        el.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1) ' + (i * 0.08) + 's';
                    });
                    requestAnimationFrame(function() {
                        result.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
                        result.style.opacity = '1';
                        result.style.transform = 'translateY(0)';
                        els.forEach(function(el) {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });
                }, 250);
            };

            window.regenerateCard = function() {
                var result = document.getElementById('cardResult');
                var content = document.getElementById('cardContent');
                document.getElementById('cardCanvasWrap').style.minHeight = '';
                result.style.opacity = '0';
                result.style.transform = 'translateY(-10px)';
                setTimeout(function() {
                    result.style.display = 'none';
                    content.style.display = 'block';
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(10px)';
                    requestAnimationFrame(function() {
                        content.style.transition = 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)';
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    });
                }, 200);
            };

            function spawnCardParticles() {
                var modal = document.getElementById('cardModal');
                var rect = modal.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var colors = ['#34d399','#fbbf24','#06b6d4','#8b5cf6','#ff7043','#6ee7b7','#fff'];
                var emojis = ['🌱','🌿','🍃','✨','💚','🌳','🍀'];
                for (var i = 0; i < 24; i++) {
                    (function(idx) {
                        setTimeout(function() {
                            var p = document.createElement('div');
                            var isEmoji = Math.random() > 0.5;
                            var size = isEmoji ? (10 + Math.random() * 14) : (3 + Math.random() * 5);
                            var angle = (Math.PI * 2 / 24) * idx + (Math.random() - 0.5) * 0.5;
                            var dist = 60 + Math.random() * 100;
                            var tx = Math.cos(angle) * dist;
                            var ty = Math.sin(angle) * dist;
                            p.style.cssText = 'position:fixed;left:' + cx + 'px;top:' + cy + 'px;font-size:' + size + 'px;pointer-events:none;z-index:9999999;transition:all ' + (0.6 + Math.random() * 0.4) + 's cubic-bezier(0.25,0.46,0.45,0.94);opacity:1;transform:translate(0,0) scale(1);';
                            p.textContent = isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : '';
                            if (!isEmoji) {
                                p.style.width = size + 'px';
                                p.style.height = size + 'px';
                                p.style.borderRadius = '50%';
                                p.style.background = colors[Math.floor(Math.random() * colors.length)];
                            }
                            document.body.appendChild(p);
                            requestAnimationFrame(function() {
                                p.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(0)';
                                p.style.opacity = '0';
                            });
                            setTimeout(function() { p.remove(); }, 1200);
                        }, idx * 25);
                    })(i);
                }
            }

            var cardBgRunning = false;
            function initCardBgParticles() {
                var canvas = document.getElementById('cardBgParticles');
                if (!canvas) return;
                var ctx = canvas.getContext('2d');
                var pts = [];
                function resize() {
                    var modal = document.getElementById('cardModal');
                    if (!modal) return;
                    var rect = modal.getBoundingClientRect();
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                }
                function createPts() {
                    pts = [];
                    var w = canvas.width, h = canvas.height;
                    var colors = ['52,211,153','255,255,255','6,182,212','139,92,246','251,191,36'];
                    for (var i = 0; i < 45; i++) {
                        pts.push({
                            x: Math.random() * w,
                            y: Math.random() * h,
                            vx: (Math.random() - 0.5) * 0.25,
                            vy: (Math.random() - 0.5) * 0.25,
                            r: Math.random() * 2.5 + 0.3,
                            o: Math.random() * 0.3 + 0.05,
                            c: colors[Math.floor(Math.random() * colors.length)]
                        });
                    }
                }
                function draw() {
                    if (!cardBgRunning) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    pts.forEach(function(p) {
                        p.x += p.vx; p.y += p.vy;
                        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(' + p.c + ',' + p.o + ')';
                        ctx.fill();
                    });
                    for (var a = 0; a < pts.length; a++) {
                        for (var b = a + 1; b < pts.length; b++) {
                            var dx = pts[a].x - pts[b].x;
                            var dy = pts[a].y - pts[b].y;
                            var d = Math.sqrt(dx * dx + dy * dy);
                            if (d < 80) {
                                ctx.beginPath();
                                ctx.moveTo(pts[a].x, pts[a].y);
                                ctx.lineTo(pts[b].x, pts[b].y);
                                ctx.strokeStyle = 'rgba(52,211,153,' + (0.06 * (1 - d / 80)) + ')';
                                ctx.lineWidth = 0.5;
                                ctx.stroke();
                            }
                        }
                    }
                    requestAnimationFrame(draw);
                }
                resize();
                createPts();
                cardBgRunning = true;
                draw();
            }
            function stopCardBgParticles() {
                cardBgRunning = false;
            }

            window.downloadCard = function() {
                var role = document.getElementById('cardRole').value;
                var info = roleMap[role];
                var hMap = { 'green-guardian':640, 'sand-warrior':600, 'fruit-farmer':620, 'solar-pioneer':610, 'eco-innovator':630, 'water-guardian':590, 'wild-protector':640 };
                var w = 600, h = hMap[role] || 620;
                var canvas = document.createElement('canvas');
                canvas.width = w; canvas.height = h;
                var ctx = canvas.getContext('2d');

                var theme = document.getElementById('cardTheme').value;
                var colors = themeMap[theme];
                var name = document.getElementById('cardNameDisplay').textContent;
                var motto = document.getElementById('cardMottoDisplay').textContent;
                var nickname = document.getElementById('cardNickname').textContent;

                var grad = ctx.createLinearGradient(0, 0, w, h);
                grad.addColorStop(0, colors[0]);
                grad.addColorStop(0.4, '#0d1a24');
                grad.addColorStop(1, colors[1]);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);

                ctx.fillStyle = 'rgba(255,255,255,0.018)';
                for (var i = 0; i < 100; i++) {
                    ctx.beginPath();
                    ctx.arc(Math.random()*w, Math.random()*h, Math.random()*2+0.3, 0, Math.PI*2);
                    ctx.fill();
                }

                var cSize = { 'green-guardian':[90,130], 'sand-warrior':[70,110], 'fruit-farmer':[80,120], 'solar-pioneer':[100,140], 'eco-innovator':[75,115], 'water-guardian':[65,105], 'wild-protector':[85,125] };
                var cs = cSize[role] || [80,120];
                ctx.strokeStyle = 'rgba(255,255,255,0.04)';
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(w/2, h*0.35, cs[0], 0, Math.PI*2); ctx.stroke();
                ctx.beginPath(); ctx.arc(w/2, h*0.35, cs[1], 0, Math.PI*2); ctx.stroke();

                ctx.strokeStyle = 'rgba(255,255,255,0.03)';
                ctx.beginPath(); ctx.moveTo(-50, h*0.18); ctx.lineTo(w+50, h*0.15); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(-50, h*0.8); ctx.lineTo(w+50, h*0.83); ctx.stroke();

                ctx.strokeStyle = 'rgba(52,211,153,0.25)';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(0, 2); ctx.lineTo(w, 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, h-2); ctx.lineTo(w, h-2); ctx.stroke();

                ctx.textAlign = 'center';
                ctx.font = '52px serif';
                ctx.fillText(info.emoji, w/2, h*0.32);

                ctx.font = '12px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.35)';
                ctx.fillText(nickname, w/2, h*0.36);

                ctx.font = '13px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = info.color || 'rgba(52,211,153,0.6)';
                ctx.fillText(roleGreetings[role] || '', w/2, h*0.41);

                ctx.font = 'bold 42px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = '#fff';
                ctx.fillText(name, w/2, h*0.49);

                ctx.font = '600 16px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = colors[2];
                ctx.fillText(info.label.toUpperCase(), w/2, h*0.52);

                if (motto) {
                    ctx.font = 'italic 13px "Microsoft YaHei", sans-serif';
                    ctx.fillStyle = 'rgba(255,255,255,0.4)';
                    ctx.fillText('「' + motto + '」', w/2, h*0.58);
                }

                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(w*0.2, h*0.65); ctx.lineTo(w*0.8, h*0.65); ctx.stroke();

                ctx.font = '11px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fillText('邀你一起守护绿色家园', w/2, h*0.72);
                ctx.fillText('让荒漠重新焕发生机', w/2, h*0.76);

                ctx.fillStyle = 'rgba(52,211,153,0.1)';
                ctx.beginPath(); ctx.roundRect(w/2-75, h*0.82, 150, 22, 11); ctx.fill();
                ctx.font = '10px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = 'rgba(52,211,153,0.55)';
                ctx.fillText('🌿 邀你加入治沙人联盟', w/2, h*0.82+15);

                var now = new Date();
                ctx.font = '9px "Microsoft YaHei", sans-serif';
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fillText(now.getFullYear() + '.' + String(now.getMonth()+1).padStart(2,'0') + '.' + String(now.getDate()).padStart(2,'0'), w/2, h - 16);

                var link = document.createElement('a');
                link.download = '治沙人名片_' + name + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };

            overlay.addEventListener('click', closeCardModal);
        })();
        
        function closeAchPopup() {
            document.getElementById('achPopup')?.classList.remove('show');
        }
        
        function spawnAchParticles() {
            const colors = ['#34d399', '#fbbf24', '#e74c3c', '#3498db', '#9b59b6', '#fff', '#f39c12'];
            for (let i = 0; i < 80; i++) {
                setTimeout(() => {
                    const cx = window.innerWidth / 2;
                    const cy = window.innerHeight / 2;
                    const p = document.createElement('div');
                    p.className = 'ach-particle';
                    p.style.cssText = 'position:fixed;left:' + cx + 'px;top:' + cy + 'px;width:10px;height:10px;border-radius:50%;background:' + colors[Math.floor(Math.random()*colors.length)] + ';pointer-events:none;z-index:99998;';
                    p.style.setProperty('--tx', (Math.random()-0.5)*600+'px');
                    p.style.setProperty('--ty', (Math.random()-0.5)*600+'px');
                    p.style.animation = 'achParticleFly 1.5s ease-out forwards';
                    document.body.appendChild(p);
                    setTimeout(() => p.remove(), 2000);
                }, i * 20);
            }
        }
        
        // Patch doPlant to add achievement check
        const _origDoPlant = doPlant;
        window.doPlant = function(x, z, type) {
            _origDoPlant(x, z, type);
            setTimeout(() => checkAchievement(plantingTrees.length), 600);
        };
        
        // ===== 数据卡片联动图表 =====
        function initStatCardLinks() {
        }
        


        // ===== 全局变量 =====
        let plantScene, plantCamera, plantRenderer, trees3D = [], selType = null;
        let plantingScene, plantingCamera, plantingRenderer, plantingTrees = [];
        
        // ===== 加载动画 =====
        // 用 DOMContentLoaded 保证即使外部字体/资源加载失败也能初始化
        function safeInitAll() {
            if (window._initAllDone) return;
            try { initAll(); } catch(e) { console.error('initAll error:', e); }
        }
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(safeInitAll, 100);
        });
        window.addEventListener('load', function() {
            setTimeout(safeInitAll, 50);
        });
        // 最终兜底：1秒后无论如何都执行
        setTimeout(safeInitAll, 1000);
        
        // ===== 草方格固沙动画（增强版） =====
        let ggCurrentStage = 0;
        let ggTargetStage = 0;
        let ggTransitionProgress = 1;
        let ggAnimFrame = null;
        let ggSandParticles = [];
        let ggClouds = [];
        let ggBirds = [];
        let ggGrassTufts = [];
        let ggTreeData = [];
        let ggTime = 0;
        let ggRunning = true;
        const gg2Stages = [
            { title: '🌪️ 裸沙状态', desc: '流动沙丘随风移动，表面温度可达70°C，植物无法生长。年均风速3-5m/s，风蚀模数3000-8000吨/km²。', temp: '70°C', wind: '4.5m/s', veg: '0%', sand: '快', humidity: '5%', dayTemp: '70°C', nightTemp: '15°C', progress: 0, color1: '#5C3D1A', color2: '#B8860B', color3: '#DAA520', dayColor: '#DAA520', nightColor: '#1a1a3a' },
            { title: '🧱 草方格铺设', desc: '在沙丘表面铺设1m×1m的麦草方格，露出沙面10-15cm，形成微地形。风速降低40-60%，沙粒开始沉降。', temp: '55°C', wind: '2.8m/s', veg: '0%', sand: '慢', humidity: '12%', dayTemp: '55°C', nightTemp: '18°C', progress: 25, color1: '#4A3520', color2: '#8B7355', color3: '#87CEEB', dayColor: '#87CEEB', nightColor: '#1a2a3a' },
            { title: '🌱 播种植被', desc: '在草方格内播撒梭梭、花棒等固沙植物种子。草方格保水保肥，种子存活率从5%提升至60%以上。', temp: '42°C', wind: '1.5m/s', veg: '15%', sand: '极慢', humidity: '25%', dayTemp: '42°C', nightTemp: '22°C', progress: 50, color1: '#3A5A20', color2: '#6B8E23', color3: '#87CEEB', dayColor: '#87CEEB', nightColor: '#1a2a30' },
            { title: '🌿 植被恢复', desc: '固沙植物扎根生长，根系深入地下2-5米，形成地下固沙网络。植被覆盖率提升至40%，风蚀基本停止。', temp: '32°C', wind: '0.8m/s', veg: '40%', sand: '停滞', humidity: '40%', dayTemp: '32°C', nightTemp: '20°C', progress: 75, color1: '#1A5C2A', color2: '#3CB371', color3: '#87CEEB', dayColor: '#87CEEB', nightColor: '#1a2a2a' },
            { title: '🌳 绿洲形成', desc: '草本→灌木→乔木的演替完成，形成稳定生态群落。土壤有机质从0.3%提升至2%，生物多样性恢复。', temp: '26°C', wind: '0.3m/s', veg: '65%', sand: '无', humidity: '55%', dayTemp: '26°C', nightTemp: '18°C', progress: 100, color1: '#006442', color2: '#2E8B57', color3: '#4A90D9', dayColor: '#4A90D9', nightColor: '#0a1a2a' }
        ];
        window.setGGStage = function(idx) {
            if (ggTransitionProgress < 1) ggCurrentStage = ggTargetStage;
            ggTargetStage = idx;
            ggTransitionProgress = 0;
            const s = gg2Stages[idx];
            document.getElementById('ggStageTitle').textContent = s.title;
            document.getElementById('ggStageDesc').textContent = s.desc;
            document.querySelectorAll('#page-gg .ggstage-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
        };
        function lerp(a, b, t) { return a + (b - a) * t; }
        function lerpColor(c1, c2, t) {
            const p = (c, i) => parseInt(c.slice(1 + i * 2, 3 + i * 2), 16);
            const r = Math.round(lerp(p(c1, 0), p(c2, 0), t));
            const g = Math.round(lerp(p(c1, 1), p(c2, 1), t));
            const b2 = Math.round(lerp(p(c1, 2), p(c2, 2), t));
            return `rgb(${r},${g},${b2})`;
        }
        function initGGStageCanvas() {
            const canvas = document.getElementById('ggStageCanvas');
            if (!canvas) return;
            function setupCanvas() {
                var rect = canvas.getBoundingClientRect();
                var cw = rect.width || canvas.parentElement.clientWidth || 800;
                var ch = rect.height || 450;
                var dpr = window.devicePixelRatio || 1;
                canvas.width = cw * dpr;
                canvas.height = ch * dpr;
                canvas.style.width = cw + 'px';
                canvas.style.height = ch + 'px';
            }
            setupCanvas();
            var ggObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        setupCanvas();
                        renderGGStage();
                    }
                });
            }, { threshold: 0.1 });
            ggObserver.observe(canvas);
            let resizeRAF; window.addEventListener('resize', function() { if (resizeRAF) return; resizeRAF = requestAnimationFrame(function() { setupCanvas(); resizeRAF = null; }); });
            new IntersectionObserver(function(entries) {
                ggRunning = entries[0].isIntersecting;
            }, { threshold: 0 }).observe(canvas);
            var w = canvas.width;
            var h = canvas.height;
            // 沙粒粒子
            ggSandParticles = [];
            for (let i = 0; i < 200; i++) {
                ggSandParticles.push({
                    x: Math.random() * w, y: h * 0.55 + Math.random() * h * 0.4,
                    size: Math.random() * 3.5 + 0.8, speedX: Math.random() * 3 + 0.3,
                    speedY: (Math.random() - 0.5) * 1.2, opacity: Math.random() * 0.5 + 0.2, wobble: Math.random() * 100
                });
            }
            // 云朵
            ggClouds = [];
            for (let i = 0; i < 4; i++) {
                ggClouds.push({ x: Math.random() * w * 1.2 - w * 0.1, y: h * 0.08 + Math.random() * h * 0.15,
                    w: 80 + Math.random() * 180, h: 30 + Math.random() * 40, speed: 0.15 + Math.random() * 0.3, opacity: 0.3 + Math.random() * 0.4 });
            }
            // 飞鸟
            ggBirds = [];
            for (let i = 0; i < 5; i++) {
                ggBirds.push({ x: Math.random() * w, y: h * 0.2 + Math.random() * h * 0.2, size: 4 + Math.random() * 3, speed: 1 + Math.random() * 2, wingPhase: Math.random() * Math.PI * 2 });
            }
            // 树木
            ggTreeData = [];
            for (let i = 0; i < 10; i++) {
                ggTreeData.push({ x: w * 0.12 + (w * 0.76 / 9) * i + (Math.random() - 0.5) * 30, h: 60 + Math.random() * 40, crownR: 18 + Math.random() * 15, shade: 0.7 + Math.random() * 0.3 });
            }
            // 草丛
            ggGrassTufts = [];
            for (let i = 0; i < 80; i++) {
                ggGrassTufts.push({ x: Math.random() * w, y: h * 0.6 + Math.random() * h * 0.35, h: 10 + Math.random() * 20, w: 8 + Math.random() * 12, phase: Math.random() * Math.PI * 2 });
            }
            renderGGStage();
        }
        function renderGGStage(timestamp) {
            const canvas = document.getElementById('ggStageCanvas');
            if (!canvas) return;
            
            // 移动端帧率节流：降低为30fps
            if (!renderGGStage.lastFrameTime) renderGGStage.lastFrameTime = 0;
            const targetInterval = isMobile ? 33 : 16;
            if (timestamp && timestamp - renderGGStage.lastFrameTime < targetInterval) {
                ggAnimFrame = requestAnimationFrame(renderGGStage);
                return;
            }
            renderGGStage.lastFrameTime = timestamp || 0;
            
            // 页面不可见时暂停动画
            if (document.hidden || !pageVisible) {
                ggAnimFrame = requestAnimationFrame(renderGGStage);
                return;
            }
            
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;
            if (w < 10 || h < 10) { ggAnimFrame = requestAnimationFrame(renderGGStage); return; }
            if (!ggRunning) { ggAnimFrame = requestAnimationFrame(renderGGStage); return; }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ggTime += 0.016;
            // 过渡动画
            if (ggTransitionProgress < 1) {
                ggTransitionProgress += 0.04;
                if (ggTransitionProgress >= 1) { ggTransitionProgress = 1; ggCurrentStage = ggTargetStage; }
            }
            const tp = ggTransitionProgress;
            const interpStage = tp < 1 ? ggCurrentStage + (ggTargetStage - ggCurrentStage) * tp : ggTargetStage;
            const stage = Math.round(interpStage);
            const s = gg2Stages[ggTargetStage];
            ctx.clearRect(0, 0, w, h);
            // ===== 天空 =====
            const fromS = gg2Stages[ggCurrentStage];
            const toS = gg2Stages[ggTargetStage];
            const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55);
            if (tp < 1) {
                skyGrad.addColorStop(0, lerpColor(fromS.color1, toS.color1, tp));
                skyGrad.addColorStop(0.4, lerpColor(fromS.color1, toS.color1, tp));
                skyGrad.addColorStop(0.7, lerpColor(fromS.color2, toS.color2, tp));
                skyGrad.addColorStop(1, lerpColor(fromS.color3, toS.color3, tp));
            } else {
                skyGrad.addColorStop(0, toS.color1);
                skyGrad.addColorStop(0.4, toS.color1);
                skyGrad.addColorStop(0.7, toS.color2);
                skyGrad.addColorStop(1, toS.color3);
            }
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, w, h * 0.55);
            // ===== 云朵 =====
            ggClouds.forEach(c => {
                c.x += c.speed;
                if (c.x > w + c.w) c.x = -c.w;
                const vis = stage >= 1 ? c.opacity : c.opacity * 0.3;
                ctx.fillStyle = `rgba(255,255,255,${vis * 0.6})`;
                ctx.beginPath(); ctx.ellipse(c.x, c.y, c.w * 0.3, c.h * 0.4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(c.x - c.w * 0.2, c.y + c.h * 0.1, c.w * 0.25, c.h * 0.35, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(c.x + c.w * 0.22, c.y + c.h * 0.05, c.w * 0.28, c.h * 0.38, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(c.x + c.w * 0.05, c.y - c.h * 0.15, c.w * 0.2, c.h * 0.35, 0, 0, Math.PI * 2); ctx.fill();
            });
            // ===== 太阳 =====
            const sunSize = 28 + interpStage * 10;
            const sunX = w * 0.15, sunY = h * 0.12;
            for (let i = 3; i > 0; i--) { ctx.fillStyle = `rgba(255,220,100,${0.06 / i})`; ctx.beginPath(); ctx.arc(sunX, sunY, sunSize + i * 20, 0, Math.PI * 2); ctx.fill(); }
            const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize);
            const sunBright = stage >= 3 ? 'rgba(255,250,220,1)' : stage >= 1 ? 'rgba(255,230,150,1)' : 'rgba(255,180,60,0.95)';
            sunGrad.addColorStop(0, sunBright);
            sunGrad.addColorStop(0.6, stage >= 3 ? 'rgba(255,220,100,0.6)' : 'rgba(255,180,60,0.5)');
            sunGrad.addColorStop(1, 'rgba(255,150,0,0)');
            ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2); ctx.fill();
            // 阳光射线
            ctx.strokeStyle = `rgba(255,220,150,${stage >= 2 ? 0.08 : 0.15})`; ctx.lineWidth = 1;
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2 + ggTime * 0.1;
                ctx.beginPath(); ctx.moveTo(sunX + Math.cos(angle) * (sunSize + 10), sunY + Math.sin(angle) * (sunSize + 10));
                ctx.lineTo(sunX + Math.cos(angle) * (sunSize + 30 + Math.sin(ggTime * 2 + i) * 10), sunY + Math.sin(angle) * (sunSize + 30 + Math.sin(ggTime * 2 + i) * 10));
                ctx.stroke();
            }
            // ===== 远山 =====
            ctx.beginPath(); ctx.moveTo(0, h * 0.52);
            ctx.quadraticCurveTo(w * 0.15, h * 0.34, w * 0.3, h * 0.45);
            ctx.quadraticCurveTo(w * 0.45, h * 0.32, w * 0.6, h * 0.42);
            ctx.quadraticCurveTo(w * 0.75, h * 0.30, w * 0.85, h * 0.40);
            ctx.quadraticCurveTo(w * 0.92, h * 0.35, w, h * 0.42);
            ctx.lineTo(w, h * 0.55); ctx.lineTo(0, h * 0.55); ctx.closePath();
            ctx.fillStyle = stage >= 3 ? 'rgba(44,130,60,0.4)' : 'rgba(139,119,101,0.45)'; ctx.fill();
            ctx.beginPath(); ctx.moveTo(0, h * 0.52);
            ctx.quadraticCurveTo(w * 0.2, h * 0.40, w * 0.4, h * 0.48);
            ctx.quadraticCurveTo(w * 0.6, h * 0.38, w * 0.8, h * 0.45); ctx.lineTo(w, h * 0.48);
            ctx.lineTo(w, h * 0.55); ctx.lineTo(0, h * 0.55); ctx.closePath();
            ctx.fillStyle = stage >= 3 ? 'rgba(44,120,50,0.35)' : 'rgba(119,99,81,0.25)'; ctx.fill();
            // ===== 飞鸟 =====
            if (stage >= 3) {
                const bOp = stage === 3 ? 0.5 : 1;
                ggBirds.forEach(b => {
                    b.x += b.speed; b.y += Math.sin(ggTime * 0.5 + b.wingPhase) * 0.5;
                    if (b.x > w + 20) { b.x = -20; b.y = h * 0.15 + Math.random() * h * 0.15; }
                    b.wingPhase += 0.08;
                    ctx.strokeStyle = `rgba(0,0,0,${bOp * 0.5})`; ctx.lineWidth = 1.5;
                    const wa = Math.sin(b.wingPhase) * b.size * 0.6;
                    ctx.beginPath(); ctx.moveTo(b.x - b.size, b.y - 1);
                    ctx.quadraticCurveTo(b.x - b.size * 0.3, b.y - wa * 0.7, b.x, b.y);
                    ctx.quadraticCurveTo(b.x + b.size * 0.3, b.y - wa * 0.7, b.x + b.size, b.y - 1); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(b.x - b.size * 0.7, b.y + 1);
                    ctx.quadraticCurveTo(b.x - b.size * 0.2, b.y - wa * 0.3, b.x, b.y);
                    ctx.quadraticCurveTo(b.x + b.size * 0.2, b.y - wa * 0.3, b.x + b.size * 0.7, b.y + 1); ctx.stroke();
                });
            }
            // ===== 地面 =====
            const groundLine = h * 0.55;
            const gg = ctx.createLinearGradient(0, groundLine, 0, h);
            const gcs = [
                ['#D2B48C', '#C19A6B', '#A0785A', '#8B6914'],
                ['#C4A882', '#B8960B', '#8B7355', '#6B5335'],
                ['#8B9A5A', '#6B8E23', '#556B2F', '#3B5A1A'],
                ['#3B7A3B', '#2E8B57', '#1A5C1A', '#0A3A0A'],
                ['#228B22', '#2E8B57', '#006442', '#003D20']
            ];
            const gcFrom = gcs[ggCurrentStage] || gcs[0];
            const gcTo = gcs[ggTargetStage] || gcs[0];
            if (tp < 1) {
                gg.addColorStop(0, lerpColor(gcFrom[0], gcTo[0], tp));
                gg.addColorStop(0.3, lerpColor(gcFrom[1], gcTo[1], tp));
                gg.addColorStop(0.7, lerpColor(gcFrom[2], gcTo[2], tp));
                gg.addColorStop(1, lerpColor(gcFrom[3], gcTo[3], tp));
            } else {
                gg.addColorStop(0, gcTo[0]); gg.addColorStop(0.3, gcTo[1]); gg.addColorStop(0.7, gcTo[2]); gg.addColorStop(1, gcTo[3]);
            }
            ctx.fillStyle = gg; ctx.fillRect(0, groundLine, w, h - groundLine);
            // ===== 沙丘纹理 =====
            if (stage <= 1) {
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath();
                    const y = groundLine + 15 + i * 25 + Math.sin(i * 1.5) * 5; ctx.moveTo(0, y);
                    for (let x = 0; x <= w; x += 30) {
                        ctx.lineTo(x, y + Math.sin(x * 0.015 + i * 0.8 + ggTime * (stage === 0 ? 0.3 : 0.1)) * (8 - i * 0.5));
                    }
                    ctx.strokeStyle = `rgba(160,120,90,${0.25 - i * 0.02})`; ctx.lineWidth = 1; ctx.stroke();
                }
                for (let i = 0; i < 6; i++) {
                    const dx = w * 0.1 + (w * 0.8 / 5) * i;
                    ctx.fillStyle = 'rgba(255,200,140,0.05)'; ctx.beginPath();
                    ctx.ellipse(dx, groundLine + 40 + Math.sin(i * 2) * 20, 60, 15, 0.3, 0, Math.PI * 2); ctx.fill();
                }
            }
            // ===== 草方格 =====
            if (stage >= 1) {
                const gs = 50;
                const gStroke = stage >= 3 ? 'rgba(139,90,43,0.6)' : 'rgba(180,150,60,0.85)';
                for (let gy = Math.ceil((groundLine + 10) / gs) * gs; gy < h; gy += gs) {
                    ctx.strokeStyle = gStroke; ctx.lineWidth = stage >= 3 ? 1.5 : 2.5; ctx.beginPath();
                    ctx.moveTo(0, gy);
                    for (let x = 0; x <= w; x += 20) ctx.lineTo(x, gy + Math.sin(x * 0.008 + gy * 0.01) * (stage >= 3 ? 1 : 2));
                    ctx.stroke();
                }
                for (let gx = gs; gx < w; gx += gs) {
                    ctx.strokeStyle = gStroke; ctx.lineWidth = stage >= 3 ? 1.5 : 2.5; ctx.beginPath();
                    ctx.moveTo(gx, groundLine + 10);
                    for (let y = groundLine + 10; y <= h; y += 20) ctx.lineTo(gx + Math.sin(y * 0.008 + gx * 0.01) * (stage >= 3 ? 1 : 2), y);
                    ctx.stroke();
                }
                if (stage <= 2) {
                    const so = stage === 1 ? 0.7 : 0.4;
                    for (let gx = gs; gx < w; gx += gs) {
                        for (let gy = Math.ceil((groundLine + 15) / gs) * gs; gy < h; gy += gs) {
                            ctx.fillStyle = `rgba(180,150,60,${so})`;
                            for (let s = -1; s <= 1; s += 0.5) {
                                ctx.save(); ctx.translate(gx + s * 3, gy); ctx.rotate(0.3 + s * 0.4); ctx.fillRect(-1, -7, 2, 10); ctx.restore();
                            }
                            ctx.fillStyle = `rgba(160,130,50,${so * 0.6})`;
                            ctx.beginPath(); ctx.arc(gx, gy, 4, 0, Math.PI * 2); ctx.fill();
                        }
                    }
                }
                // 风线
                if (stage <= 2) {
                    ctx.strokeStyle = `rgba(255,255,255,${stage === 1 ? 0.12 : 0.06})`; ctx.lineWidth = 1;
                    for (let i = 0; i < 8; i++) {
                        const fx = (ggTime * 40 + i * w / 8) % (w + 100) - 50;
                        const fy = groundLine + 40 + i * 35 + Math.sin(i * 2) * 10;
                        ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + 25, fy - 5, fx + 50, fy); ctx.stroke();
                    }
                }
            }
            // ===== 草丛 =====
            if (stage >= 2) {
                const count = stage === 2 ? 25 : stage === 3 ? 55 : 80;
                const gh = stage === 2 ? 10 : stage === 3 ? 18 : 25;
                const ga = stage >= 3 ? 0.8 : 0.5;
                for (let i = 0; i < count && i < ggGrassTufts.length; i++) {
                    const g = ggGrassTufts[i];
                    const swing = Math.sin(ggTime * 0.8 + g.phase) * 2;
                    const hh = gh + Math.sin(g.phase) * 5;
                    ctx.strokeStyle = stage >= 4 ? `rgba(34,139,34,${ga})` : `rgba(107,142,35,${ga})`; ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(g.x + swing - 3, g.y);
                    ctx.quadraticCurveTo(g.x + swing - 3, g.y - hh * 0.5, g.x + swing, g.y - hh); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(g.x + swing + 3, g.y);
                    ctx.quadraticCurveTo(g.x + swing + 3, g.y - hh * 0.4, g.x + swing, g.y - hh * 0.8); ctx.stroke();
                }
            }
            // ===== 灌木 =====
            if (stage >= 3) {
                const bc = stage === 3 ? 12 : 20;
                for (let i = 0; i < bc; i++) {
                    const bx = (w / bc) * i + Math.sin(i * 2.1) * 25 + 20;
                    const by = groundLine + 30 + Math.sin(i * 1.7) * 15;
                    const bh = stage === 3 ? 20 + Math.sin(i * 2) * 5 : 30 + Math.sin(i * 2) * 8;
                    const bw = stage === 3 ? 18 + Math.sin(i * 3) * 4 : 25 + Math.sin(i * 3) * 6;
                    const cols = stage >= 4 ? ['#228B22', '#2E8B57', '#32CD32'] : ['#6B8E23', '#556B2F', '#8FBC8F'];
                    ctx.fillStyle = cols[i % 3]; ctx.beginPath(); ctx.ellipse(bx, by - bh * 0.5, bw * 0.5, bh * 0.5, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = cols[(i + 1) % 3]; ctx.beginPath(); ctx.ellipse(bx - bw * 0.3, by - bh * 0.3, bw * 0.35, bh * 0.4, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = cols[(i + 2) % 3]; ctx.beginPath(); ctx.ellipse(bx + bw * 0.3, by - bh * 0.35, bw * 0.3, bh * 0.4, 0, 0, Math.PI * 2); ctx.fill();
                }
            }
            // ===== 树木 =====
            if (stage >= 4) {
                ggTreeData.forEach(t => {
                    const tx = t.x, ty = groundLine + 5;
                    ctx.fillStyle = '#5C3317'; ctx.fillRect(tx - 4, ty - t.h, 8, t.h);
                    ctx.strokeStyle = 'rgba(80,40,10,0.3)'; ctx.lineWidth = 0.5;
                    for (let s = 0; s < 3; s++) { ctx.beginPath(); ctx.moveTo(tx - 3 + s * 3, ty - t.h + s * 12); ctx.lineTo(tx - 4 + s * 3, ty - t.h + s * 12 + 8); ctx.stroke(); }
                    const colors = ['#1B6B1B', '#228B22', '#2E8B57', '#32CD32'];
                    const layers = [{ dx: 0, dy: -t.h - 5, r: t.crownR * 0.9 }, { dx: -t.crownR * 0.4, dy: -t.h + 3, r: t.crownR * 0.7 }, { dx: t.crownR * 0.4, dy: -t.h + 5, r: t.crownR * 0.65 }, { dx: 0, dy: -t.h - 15, r: t.crownR * 0.6 }];
                    layers.forEach((l, li) => {
                        ctx.fillStyle = colors[li % 4]; ctx.beginPath(); ctx.arc(tx + l.dx, ty + l.dy, l.r * t.shade, 0, Math.PI * 2); ctx.fill();
                        ctx.fillStyle = 'rgba(255,255,200,0.08)'; ctx.beginPath(); ctx.arc(tx + l.dx - l.r * 0.2, ty + l.dy - l.r * 0.2, l.r * 0.4, 0, Math.PI * 2); ctx.fill();
                    });
                    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(tx + 4, ty - t.h + 5, 3, t.h - 5);
                });
            }
            // ===== 沙粒粒子 =====
            const spdMul = stage === 0 ? 3.5 : stage === 1 ? 0.6 : stage === 2 ? 0.2 : stage === 3 ? 0.05 : 0;
            const pa = stage === 0 ? 1 : stage === 1 ? 0.35 : stage === 2 ? 0.12 : 0;
            ggSandParticles.forEach(p => {
                p.x += p.speedX * spdMul;
                p.y += p.speedY * spdMul * 0.3 + Math.sin(ggTime * 2 + p.wobble) * 0.2;
                if (p.x > w + 10) { p.x = -10; p.y = groundLine + Math.random() * h * 0.3; }
                if (p.y < groundLine || p.y > h) p.y = groundLine + Math.random() * h * 0.4;
                if (pa > 0) { ctx.globalAlpha = p.opacity * pa; ctx.fillStyle = 'rgba(210,180,140,1)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }
            });
            ctx.globalAlpha = 1;
            // ===== 地面雾 =====
            if (stage >= 3) {
                for (let i = 0; i < 3; i++) {
                    const fx = w * 0.15 + i * w * 0.3, fy = groundLine + 10;
                    const fog = ctx.createRadialGradient(fx, fy, 0, fx, fy, 120 + i * 40);
                    fog.addColorStop(0, `rgba(150,255,180,${stage === 3 ? 0.06 : 0.12})`);
                    fog.addColorStop(1, 'rgba(150,255,180,0)');
                    ctx.fillStyle = fog; ctx.fillRect(0, 0, w, h);
                }
            }
            // ===== 更新指标（平滑过渡）=====
            const currentS = gg2Stages[ggCurrentStage];
            if (ggTransitionProgress < 1) {
                const s1 = gg2Stages[ggCurrentStage];
                const s2 = gg2Stages[ggTargetStage];
                const t = ggTransitionProgress;
                document.getElementById('gg-m-temp').textContent = Math.round(lerp(parseInt(s1.temp), parseInt(s2.temp), t)) + '°C';
                document.getElementById('gg-m-day').textContent = Math.round(lerp(parseInt(s1.dayTemp), parseInt(s2.dayTemp), t)) + '°C';
                document.getElementById('gg-m-night').textContent = Math.round(lerp(parseInt(s1.nightTemp), parseInt(s2.nightTemp), t)) + '°C';
                document.getElementById('gg-m-humid').textContent = Math.round(lerp(parseInt(s1.humidity), parseInt(s2.humidity), t)) + '%';
                document.getElementById('gg-m-wind').textContent = lerp(parseFloat(s1.wind), parseFloat(s2.wind), t).toFixed(1) + 'm/s';
                document.getElementById('gg-m-veg').textContent = Math.round(lerp(parseInt(s1.veg), parseInt(s2.veg), t)) + '%';
                document.getElementById('ggProgressFill').style.width = lerp(s1.progress, s2.progress, t) + '%';
            } else {
                document.getElementById('gg-m-temp').textContent = currentS.temp;
                document.getElementById('gg-m-day').textContent = currentS.dayTemp;
                document.getElementById('gg-m-night').textContent = currentS.nightTemp;
                document.getElementById('gg-m-humid').textContent = currentS.humidity;
                document.getElementById('gg-m-wind').textContent = currentS.wind;
                document.getElementById('gg-m-veg').textContent = currentS.veg;
                document.getElementById('ggProgressFill').style.width = currentS.progress + '%';
            }
            ggAnimFrame = requestAnimationFrame(renderGGStage);
        }

        // ===== 全局错误边界 =====
        window.addEventListener('error', function(e) {
            if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
                console.warn('[资源加载失败]', e.target.src || e.target.href);
                e.preventDefault();
            }
        }, true);
        window.addEventListener('unhandledrejection', function(e) {
            console.warn('[未处理的Promise错误]', e.reason ? (e.reason.message || e.reason) : 'unknown');
            e.preventDefault();
        });

        // ===== 土壤剖面动画 =====
        function initSoilProfileAnim() {
            var canvas = document.getElementById('soilProfileCanvas');
            if (!canvas) return;
            var container = document.getElementById('soilAnimContainer');
            var dpr = window.devicePixelRatio || 1;
            var W = 900, H = 450;
            canvas.width = W * dpr; canvas.height = H * dpr;
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            var ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            var layers = [
                { name: '沙地表层', y: 0, h: 60, color1: '#d4a574', color2: '#c19a6b', moisture: '5%', temp: '55°C', desc: '干燥松散，风蚀严重' },
                { name: '细沙层', y: 60, h: 80, color1: '#c19a6b', color2: '#a0785a', moisture: '8%', temp: '42°C', desc: '保水能力差' },
                { name: '粉砂层', y: 140, h: 70, color1: '#a0785a', color2: '#8B7355', moisture: '15%', temp: '32°C', desc: '开始有少量水分' },
                { name: '粘土层', y: 210, h: 60, color1: '#8B7355', color2: '#6d5a45', moisture: '35%', temp: '25°C', desc: '阻隔水分下渗' },
                { name: '母质层', y: 270, h: 80, color1: '#6d5a45', color2: '#4a3018', moisture: '50%', temp: '20°C', desc: '矿物质丰富' },
                { name: '基岩层', y: 350, h: 100, color1: '#4a3018', color2: '#2a1a0e', moisture: '80%', temp: '16°C', desc: '地下水储层' }
            ];
            var raindrops = [];
            var waterParticles = [];
            var seeping = 0;
            var hovered = -1;
            var time = 0;
            var rainOn = true;
            function spawnRain() {
                if (!rainOn) return;
                for (var i = 0; i < 3; i++) {
                    raindrops.push({ x: 100 + Math.random() * 700, y: -10 - Math.random() * 50, speed: 4 + Math.random() * 3, length: 8 + Math.random() * 12 });
                }
            }
            function spawnWater(x) {
                for (var i = 0; i < 8; i++) {
                    waterParticles.push({ x: x + (Math.random() - 0.5) * 30, y: 0, speed: 0.5 + Math.random() * 1.5, size: 2 + Math.random() * 3, opacity: 0.8 });
                }
            }
            function draw() {
                time += 0.02;
                ctx.clearRect(0, 0, W, H);
                // 天空
                var skyGrad = ctx.createLinearGradient(0, 0, 0, 30);
                skyGrad.addColorStop(0, '#1a3050');
                skyGrad.addColorStop(1, '#2a4060');
                ctx.fillStyle = skyGrad;
                ctx.fillRect(0, 0, W, 30);
                // 云
                ctx.fillStyle = 'rgba(200,220,240,0.4)';
                for (var ci = 0; ci < 3; ci++) {
                    var cx = (200 + ci * 280 + Math.sin(time * 0.3 + ci) * 10) % (W + 100) - 50;
                    ctx.beginPath(); ctx.ellipse(cx, 15, 50, 15, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(cx - 30, 18, 35, 12, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(cx + 35, 16, 40, 13, 0, 0, Math.PI * 2); ctx.fill();
                }
                // 雨滴
                if (Math.random() < 0.4) spawnRain();
                raindrops.forEach(function(r) {
                    r.y += r.speed;
                    ctx.strokeStyle = 'rgba(150,200,255,' + (0.6 - r.y / H * 0.4) + ')';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath(); ctx.moveTo(r.x, r.y); ctx.lineTo(r.x - 1, r.y + r.length); ctx.stroke();
                });
                raindrops = raindrops.filter(function(r) { return r.y < H; });
                // 土壤层
                layers.forEach(function(l, i) {
                    var grad = ctx.createLinearGradient(0, l.y, 0, l.y + l.h);
                    grad.addColorStop(0, l.color1);
                    grad.addColorStop(1, l.color2);
                    ctx.fillStyle = grad;
                    ctx.fillRect(50, l.y + 30, W - 100, l.h);
                    // 悬停提亮
                    if (hovered === i) {
                        ctx.fillStyle = 'rgba(255,255,255,0.12)';
                        ctx.fillRect(50, l.y + 30, W - 100, l.h);
                    }
                    // 水分渗透动画
                    if (seeping > i * 0.15) {
                        var fillPct = Math.min(1, (seeping - i * 0.15) * 2);
                        ctx.fillStyle = 'rgba(80,180,220,' + (0.15 * fillPct * (1 - i * 0.12)) + ')';
                        ctx.fillRect(50, l.y + 30, (W - 100) * fillPct, l.h);
                    }
                    // 层标签
                    ctx.fillStyle = hovered === i ? '#fff' : 'rgba(255,255,255,0.7)';
                    ctx.font = hovered === i ? 'bold 13px sans-serif' : '12px sans-serif';
                    ctx.textAlign = 'left';
                    ctx.fillText(l.name, 65, l.y + 30 + l.h / 2 + 4);
                    // 深度标注
                    ctx.textAlign = 'right';
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.font = '10px sans-serif';
                    ctx.fillText((l.y) + 'cm', W - 65, l.y + 30 + l.h / 2 + 4);
                    // 悬停高亮
                    if (hovered === i) {
                        // 发光边框
                        ctx.shadowColor = 'rgba(52,211,153,0.5)';
                        ctx.shadowBlur = 12;
                        ctx.strokeStyle = 'rgba(52,211,153,0.8)';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(48, l.y + 28, W - 96, l.h + 4);
                        ctx.shadowBlur = 0;
                        // 悬停层半透明覆盖
                        ctx.fillStyle = 'rgba(52,211,153,0.08)';
                        ctx.fillRect(50, l.y + 30, W - 100, l.h);
                        // 层内数据展示
                        var cy = l.y + 30 + l.h / 2;
                        ctx.textAlign = 'center';
                        ctx.font = 'bold 14px sans-serif';
                        // 含水量
                        ctx.fillStyle = 'rgba(80,180,220,0.9)';
                        ctx.fillText('💧 ' + l.moisture, W / 2 - 60, cy - 2);
                        // 温度
                        ctx.fillStyle = 'rgba(255,180,80,0.9)';
                        ctx.fillText('🌡️ ' + l.temp, W / 2 + 60, cy - 2);
                        // 深度
                        ctx.fillStyle = 'rgba(255,255,255,0.5)';
                        ctx.font = '11px sans-serif';
                        ctx.fillText(l.y + 'cm', W / 2, cy + 16);
                    }
                });
                // 水分粒子
                waterParticles.forEach(function(p) {
                    p.y += p.speed;
                    p.opacity -= 0.005;
                    ctx.fillStyle = 'rgba(80,180,220,' + Math.max(0, p.opacity) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });
                waterParticles = waterParticles.filter(function(p) { return p.opacity > 0 && p.y < H; });
                // 地表植物
                var plantPositions = [80, 180, 350, 500, 650, 780];
                plantPositions.forEach(function(px) {
                    ctx.strokeStyle = 'rgba(52,211,153,0.6)';
                    ctx.lineWidth = 1.5;
                    var sway = Math.sin(time * 2 + px * 0.01) * 3;
                    ctx.beginPath(); ctx.moveTo(px, 30); ctx.quadraticCurveTo(px + sway, 10, px + sway * 0.5, -5); ctx.stroke();
                    ctx.fillStyle = 'rgba(52,211,153,0.4)';
                    ctx.beginPath(); ctx.arc(px + sway * 0.5, -8, 5, 0, Math.PI * 2); ctx.fill();
                });
                // 右侧湿度指示条
                for (var li = 0; li < layers.length; li++) {
                    var ly = layers[li].y + 30 + layers[li].h / 2;
                    var mw = parseInt(layers[li].moisture) / 100 * 60;
                    ctx.fillStyle = 'rgba(80,180,220,0.15)';
                    ctx.fillRect(W - 55, ly - 4, 60, 8);
                    ctx.fillStyle = 'rgba(80,180,220,0.5)';
                    ctx.fillRect(W - 55, ly - 4, mw, 8);
                }
                // seep进度
                if (seeping < layers.length * 0.15 + 1) seeping += 0.008;
                requestAnimationFrame(draw);
            }
            canvas.addEventListener('mousemove', function(e) {
                var rect = canvas.getBoundingClientRect();
                var mx = (e.clientX - rect.left) * (W / rect.width);
                var my = (e.clientY - rect.top) * (H / rect.height);
                var prevHovered = hovered;
                hovered = -1;
                for (var i = 0; i < layers.length; i++) {
                    if (my >= layers[i].y + 30 && my < layers[i].y + 30 + layers[i].h && mx >= 50 && mx <= W - 50) {
                        hovered = i;
                        break;
                    }
                }
                document.getElementById('soilLayerName').textContent = hovered >= 0 ? layers[hovered].name + ' — ' + layers[hovered].desc : '移动鼠标查看详情';
                document.getElementById('soilMoisture').textContent = hovered >= 0 ? layers[hovered].moisture : '--';
                document.getElementById('soilTemp').textContent = hovered >= 0 ? layers[hovered].temp : '--';
                document.getElementById('soilDepth').textContent = hovered >= 0 ? layers[hovered].y + 'cm' : '--';
                canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';
            });
            canvas.addEventListener('click', function(e) {
                var rect = canvas.getBoundingClientRect();
                var mx = (e.clientX - rect.left) * (W / rect.width);
                seeping = 0;
                waterParticles = [];
                raindrops = [];
                spawnWater(mx);
            });
            draw();
        }

        // ===== 图表重渲染观察器 =====
        function initChartObserver() {
            var chartsSection = document.getElementById('page-11');
            if (!chartsSection) return;
            var chartsRendered = false;
            new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        if (!chartsRendered) {
                            chartsRendered = true;
                            ensureEcharts(function() { renderCharts(); renderSoilCharts(); });
                        } else {
                            // 重新渲染图表以重启动画
                            chartsSection.querySelectorAll('[id$="Chart"]').forEach(function(el) {
                                if (el._echarts) {
                                    el._echarts.dispose();
                                    el._echarts = null;
                                }
                            });
                            ensureEcharts(function() { renderCharts(); renderSoilCharts(); });
                        }
                    }
                });
            }, { threshold: 0.2 }).observe(chartsSection);
        }

        function initAll() {
            if (window._initAllDone) return;
            window._initAllDone = true;
            var fns = [
                ['initNav', initNav],
                ['initParticles', initParticles],
                ['initScroll', initScroll],
                ['initNumbers', initNumbers],
                ['initCharts', initCharts],
                ['initChartObserver', initChartObserver],
                ['initSuobian', initSuobian],
                ['initPlantDemo', initPlantDemo],
                ['initPlanting3D', initPlanting3D],
                ['initDisasterBars', initDisasterBars],
                ['initCrisisCountUp', initCrisisCountUp],
                ['initCompareSlider', initCompareSlider],
                ['initEnhancedCompareScenes', initEnhancedCompareScenes],
                ['initGlowCards', initGlowCards],
                ['spawnFloatingParticles', spawnFloatingParticles],
                ['initScrollLight', initScrollLight],
                ['initCompareKeyboard', initCompareKeyboard],
                ['initPlantKeyboard', initPlantKeyboard],
                ['initPlantNav', initPlantNav],
                ['initCarouselSwipe', initCarouselSwipe],
                ['initStatCardLinks', initStatCardLinks],
                ['initSoilBars', initSoilBars],
                ['initSoilProfiles', initSoilProfiles],
                ['initRootBars', initRootBars],
                ['initGGStageCanvas', initGGStageCanvas],
                ['initSoilProfileAnim', initSoilProfileAnim],
                ['initV3Features', initV3Features],
                ['initV4Features', initV4Features],
                ['initTouchOptimizations', initTouchOptimizations],
                ['initJuiceCounters', initJuiceCounters]
            ];
            
            fns.forEach(function(pair) {
                try { pair[1](); } catch(e) { console.warn(pair[0] + ' error:', e); }
            });
            
        }

            // ===== 全局键盘无障碍 =====
            document.addEventListener('keydown', function(e) {
                // Escape - 关闭弹窗
                if (e.key === 'Escape') {
                    var popup = document.getElementById('achPopup');
                    if (popup && popup.classList.contains('show')) {
                        popup.classList.add('closing');
                        setTimeout(function() { popup.classList.remove('show', 'closing'); }, 300);
                    }
                    var tooltip = document.getElementById('suobianTooltip');
                    if (tooltip) tooltip.classList.remove('show');
                }
                // ? - 显示快捷键帮助
                if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                    if (document.getElementById('loadingScreen') && document.getElementById('loadingScreen').style.display !== 'none') return;
                    var help = document.getElementById('kbHelp');
                    if (!help) {
                        help = document.createElement('div');
                        help.id = 'kbHelp';
                        help.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(8,12,16,0.97);border:1px solid rgba(52,211,153,0.25);border-radius:16px;padding:1.2rem 1.8rem;z-index:60000;font-size:0.82rem;color:var(--text);backdrop-filter:blur(15px);max-width:320px;line-height:2;';
                        help.innerHTML = '<div style="color:var(--accent);font-weight:700;margin-bottom:0.5rem;font-size:0.9rem;">⌨️ 键盘快捷键</div>' +
                            '<div><span style="color:var(--gold);background:rgba(255,215,64,0.1);padding:0.1rem 0.4rem;border-radius:4px;">?</span> &nbsp;显示此帮助</div>' +
                            '<div><span style="color:var(--gold);background:rgba(255,215,64,0.1);padding:0.1rem 0.4rem;border-radius:4px;">Esc</span> &nbsp;关闭弹窗/提示</div>' +
                            '<div><span style="color:var(--gold);background:rgba(255,215,64,0.1);padding:0.1rem 0.4rem;border-radius:4px;">←→</span> &nbsp;沙漠对比滑块</div>' +
                            '<div><span style="color:var(--gold);background:rgba(255,215,64,0.1);padding:0.1rem 0.4rem;border-radius:4px;">Tab</span> &nbsp;章节导航</div>' +
                            '<div><span style="color:var(--gold);background:rgba(255,215,64,0.1);padding:0.1rem 0.4rem;border-radius:4px;">Enter</span> &nbsp;确认/种植</div>';
                        document.body.appendChild(help);
                        setTimeout(function() { help.style.opacity = '0'; help.style.transition = 'opacity 0.4s'; setTimeout(function() { help.remove(); }, 400); }, 4000);
                    }
                }
                // Arrow keys for page navigation (when focused on nav)
                if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && document.activeElement && document.activeElement.closest && document.activeElement.closest('.page-nav')) {
                    e.preventDefault();
                    var dots = Array.from(document.querySelectorAll('.page-dot'));
                    var idx = dots.indexOf(document.activeElement);
                    if (idx === -1) idx = 0;
                    var next = e.key === 'ArrowDown' ? Math.min(idx + 1, dots.length - 1) : Math.max(idx - 1, 0);
                    dots[next] && dots[next].focus();
                }
            });
        
        // ===== 导航 =====
        const pageIds = ['page-0','page-1','page-2','page-2b','page-3','page-4','page-gg','page-5','page-6','page-7','page-8','page-9','page-juice','page-heroes','page-10','page-11','page-12'];
        const pageLabels = ['首页', '数据总览', '荒漠化危机', '前后对比', '土壤类型', '植物根系', '草方格固沙', '气候影响', '次生灾害', '锁边行动', '3D种植', '绿色成就', '治沙产业', '治沙人物', '治沙历程', '数据图表', '结语'];
        function initNav() {
            const nav = document.getElementById('pageNav');
            pageLabels.forEach((label, i) => {
                const dot = document.createElement('button');
                dot.className = 'page-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-label', label);
                dot.setAttribute('aria-label', '跳转到：' + label);
                dot.setAttribute('title', label);
                dot.setAttribute('tabindex', '0');
                dot.onclick = (e) => { e.preventDefault(); var el = document.getElementById(pageIds[i]); if (el) { var y = el.getBoundingClientRect().top + window.scrollY - 20; window.scrollTo({ top: y, behavior: 'smooth' }); } };
                nav.appendChild(dot);
            });
            
            // 进度条
            let scrollTicking = false;
            window.addEventListener('scroll', () => {
                if (scrollTicking) return;
                scrollTicking = true;
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docH = document.documentElement.scrollHeight - window.innerHeight;
                    document.getElementById('progressBar').style.width = (scrollTop / docH * 100) + '%';
                    
                    // 页码
                    pageIds.forEach((id, i) => {
                        const el = document.getElementById(id);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                                document.querySelectorAll('.page-dot').forEach((d, j) => d.classList.toggle('active', j === i));
                            }
                        }
                    });
                    scrollTicking = false;
                });
            }, { passive: true });
        }
        
        // ===== 粒子 =====
        function initParticles() {
            const canvas = document.getElementById('heroCanvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            let cw = window.innerWidth, ch = window.innerHeight;
            canvas.width = cw; canvas.height = ch;
            const pts = [];
            const count = isMobile ? 50 : (window.innerWidth < 768 ? 90 : 200);
            const colors = ['46,204,113','241,196,15','6,182,212','139,92,246','255,255,255'];
            for (let i = 0; i < count; i++) {
                pts.push({ x: Math.random() * cw, y: Math.random() * ch, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, s: Math.random() * 3 + 0.5, op: Math.random() * 0.4 + 0.1, c: colors[Math.floor(Math.random() * colors.length)] });
            }
            window.heroParticles = pts;
            const gridSize = 150;
            let running = true;
            
            // 移动端帧率节流：降低为30fps
            let lastFrameTime = 0;
            const targetInterval = isMobile ? 33 : 16; // 33ms ≈ 30fps, 16ms ≈ 60fps
            
            function throttledAn(timestamp) {
                // 页面不可见时暂停动画
                if (document.hidden || !pageVisible) {
                    requestAnimationFrame(throttledAn);
                    return;
                }
                
                if (!running) {
                    requestAnimationFrame(throttledAn);
                    return;
                }
                
                // 节流：控制帧率
                if (timestamp - lastFrameTime < targetInterval) {
                    requestAnimationFrame(throttledAn);
                    return;
                }
                lastFrameTime = timestamp;
                
                ctx.clearRect(0, 0, cw, ch);
                const grid = {};
                pts.forEach((p, i) => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.c},${p.op})`;
                    ctx.fill();
                    const gx = Math.floor(p.x / gridSize);
                    const gy = Math.floor(p.y / gridSize);
                    const key = gx + ',' + gy;
                    if (!grid[key]) grid[key] = [];
                    grid[key].push({ p, i });
                });
                const checked = new Set();
                for (const cell of Object.values(grid)) {
                    for (let a = 0; a < cell.length; a++) {
                        for (let b = a + 1; b < cell.length; b++) {
                            const { p: p1, i: i1 } = cell[a];
                            const { p: p2, i: i2 } = cell[b];
                            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                            if (d < 150) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(52,211,153,${0.08 * (1 - d/150)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
                        }
                    }
                    for (let a = 0; a < cell.length; a++) {
                        const { p: p1, i: i1 } = cell[a];
                        const gx = Math.floor(p1.x / gridSize);
                        const gy = Math.floor(p1.y / gridSize);
                        for (let dx = 0; dx <= 1; dx++) {
                            for (let dy = (dx === 0 ? 1 : 0); dy <= 1; dy++) {
                                const nkey = (gx + dx) + ',' + (gy + dy);
                                const ncell = grid[nkey];
                                if (!ncell) continue;
                                for (let b = 0; b < ncell.length; b++) {
                                    const { p: p2, i: i2 } = ncell[b];
                                    const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                            if (d < 180) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(52,211,153,${0.1 * (1 - d/180)})`; ctx.lineWidth = 0.6; ctx.stroke(); }
                                }
                            }
                        }
                    }
                }
                requestAnimationFrame(throttledAn);
            }
            requestAnimationFrame(throttledAn);
            
            // 使用 IntersectionObserver 控制动画运行
            new IntersectionObserver(entries => {
                running = entries[0].isIntersecting;
            }, { threshold: 0 }).observe(document.getElementById('page-0'));
            
            // 页面可见性变化事件
            document.addEventListener('visibilitychange', () => {
                pageVisible = !document.hidden;
            });
        }
        
        // ===== 滚动动画 =====
        function initScroll() {
            const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item');
            function checkVisibility() {
                revealEls.forEach(el => {
                    if (el.classList.contains('visible')) return;
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                        el.classList.add('visible');
                    }
                });
            }
            if ('IntersectionObserver' in window) {
                const obs = new IntersectionObserver(entries => {
                    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
                }, { threshold: 0.05, rootMargin: '50px 0px' });
                revealEls.forEach(el => obs.observe(el));
            }
            window.addEventListener('scroll', checkVisibility, { passive: true });
            checkVisibility();
            setTimeout(checkVisibility, 200);
            setTimeout(checkVisibility, 600);
            setTimeout(checkVisibility, 1200);
        }
        
        // ===== 数字动画 =====
        function initNumbers() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting && !e.target.animated) {
                        e.target.animated = true;
                        const target = parseInt(e.target.getAttribute('data-target'));
                        let cur = 0;
                        const timer = setInterval(() => {
                            cur += target / 50;
                            if (cur >= target) { cur = target; clearInterval(timer); }
                            e.target.textContent = Math.round(cur).toLocaleString();
                        }, 35);
                    }
                });
            }, { threshold: 0.5 });
            document.querySelectorAll('.num[data-target]').forEach(n => obs.observe(n));
        }
        
        // ===== 图表 =====
        let chartsInitialized = false;
        let climateChartsRendered = false;
        let soilChartsRendered = false;
        
        function ensureEcharts(callback) {
            if (typeof echarts !== 'undefined') { callback(); return; }
            // echarts 未加载，动态加载
            var s = document.createElement('script');
            s.src = 'libs/echarts.min.js';
            s.onload = callback;
            s.onerror = function() { console.error('echarts.min.js 加载失败'); };
            document.head.appendChild(s);
        }
        
        function initCharts() {
            // 图表渲染由 libs/charts.js 统一处理（含重试机制）
        }
        function renderSoilCharts() {
            ['soilChart1','soilChart2','soilChart3','soilChart4'].forEach((id, i) => {
                try {
                    var el = document.getElementById(id);
                    if (!el || el._echarts) return;
                    var ch = echarts.init(el);
                    el._echarts = ch;
                    var labels = ['有机质%','渗透率','pH值'];
                    var data = [[12,8,88],[18,55,78],[45,65,58],[78,80,48]];
                    ch.setOption({
                        tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', textStyle: { color: '#fff' } },
                        grid: { left: 50, right: 15, top: 15, bottom: 30 },
                        xAxis: { type: 'category', data: labels, axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888', fontSize: 11 } },
                        yAxis: { type: 'value', max: 100, axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } } },
                        series: [{ type: 'bar', data: data[i], itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#34d399'},{offset:1,color:'#0a3622'}]), borderRadius: [6,6,0,0] }, barWidth: '50%' }]
                    });
                } catch(e) { console.warn('Soil chart error:', e); }
            });
        }
        function renderCharts() {
            function safeRender(fn) { try { fn(); } catch(e) { console.warn('Chart render error:', e); } }
            // 趋势
            safeRender(function() {
                var el = document.getElementById('trendChart');
                if (!el) return;
                var t = echarts.init(el);
                t.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', borderColor: '#34d399', textStyle: { color: '#fff' } },
                    legend: { data: ['荒漠化面积', '治理面积'], textStyle: { color: '#aaa' }, top: 10 },
                    grid: { left: 60, right: 30, top: 60, bottom: 40 },
                    xAxis: { type: 'category', data: ['1980','1990','1995','2000','2005','2010','2015','2020','2025'], axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' } },
                    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
                    series: [
                        { name: '荒漠化面积', type: 'line', data: [280,320,335,340,330,310,285,270,261], smooth: true, lineStyle: { color: '#d4a574', width: 4 }, itemStyle: { color: '#d4a574' }, areaStyle: { color: 'rgba(212,165,116,0.1)' } },
                        { name: '治理面积', type: 'line', data: [50,90,130,180,230,280,320,360,400], smooth: true, lineStyle: { color: '#34d399', width: 4 }, itemStyle: { color: '#34d399' }, areaStyle: { color: 'rgba(52,211,153,0.1)' } }
                    ]
                });
            });
            // 森林覆盖率
            safeRender(function() {
                var el = document.getElementById('forestChart');
                if (!el) return;
                var f = echarts.init(el);
                f.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', borderColor: '#34d399', borderWidth: 1, textStyle: { color: '#fff' } },
                    grid: { left: 70, right: 30, top: 30, bottom: 50 },
                    xAxis: { type: 'category', data: ['新疆','甘肃','青海','宁夏','陕西','内蒙古'], axisLine: { lineStyle: { color: '#444' } }, axisTick: { alignWithLabel: true }, axisLabel: { color: '#aaa', fontSize: 12, fontWeight: 500 } },
                    yAxis: { type: 'value', name: '%', nameTextStyle: { color: '#666' }, axisLine: { show: false }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)', type: 'dashed' } } },
                    series: [{
                        type: 'bar',
                        data: [
                            { value: 4.87, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#7ecf5a'},{offset:0.6,color:'#42b883'},{offset:1,color:'#1a6d3a'}]), borderRadius: [6,6,0,0] } },
                            { value: 11.33, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#6abf4a'},{offset:0.6,color:'#38a86e'},{offset:1,color:'#155d30'}]), borderRadius: [6,6,0,0] } },
                            { value: 7.26, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#72c755'},{offset:0.6,color:'#3db07a'},{offset:1,color:'#176635'}]), borderRadius: [6,6,0,0] } },
                            { value: 15.8, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#5ab840'},{offset:0.6,color:'#2ea062'},{offset:1,color:'#0f5228'}]), borderRadius: [6,6,0,0] } },
                            { value: 46.39, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#34d399'},{offset:0.5,color:'#27ae60'},{offset:1,color:'#0a3622'}]), borderRadius: [6,6,0,0] } },
                            { value: 22.1, itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#4aad3a'},{offset:0.5,color:'#259a55'},{offset:1,color:'#0d4720'}]), borderRadius: [6,6,0,0] } }
                        ],
                        barWidth: '55%',
                        animationDelay: function(idx) { return idx * 150; },
                        label: { show: true, position: 'top', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 600, formatter: function(p) { return p.value + '%'; } }
                    }],
                    animationEasing: 'elasticOut'
                });
            });
            // 饼图
            safeRender(function() {
                var el = document.getElementById('desertPieChart');
                if (!el) return;
                var p = echarts.init(el);
                p.setOption({
                    tooltip: { trigger: 'item', backgroundColor: 'rgba(10,54,34,0.95)', textStyle: { color: '#fff' } },
                    legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#aaa', fontSize: 12 }, itemWidth: 12 },
                    series: [{ type: 'pie', radius: ['35%','70%'], center: ['40%','50%'], data: [
                        { value: 33.76, name: '塔克拉玛干' }, { value: 4.43, name: '巴丹吉林' }, { value: 4.27, name: '腾格里' },
                        { value: 4.22, name: '毛乌素' }, { value: 1.86, name: '库布其' }, { value: 4.88, name: '古尔班通古特' }
                    ], itemStyle: { borderRadius: 8, borderColor: '#0a0a0a', borderWidth: 3 }, label: { show: false } }]
                });
            });
            // 树种效果
            safeRender(function() {
                var el = document.getElementById('treeEffectChart');
                if (!el) return;
                var te = echarts.init(el);
                te.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', borderColor: '#34d399', borderWidth: 1, textStyle: { color: '#fff' } },
                    legend: { data: ['固沙量(m²/株)', '成活率(%)'], textStyle: { color: '#aaa' }, top: 10, icon: 'roundRect' },
                    grid: { left: 70, right: 40, top: 55, bottom: 40 },
                    xAxis: { type: 'category', data: ['梭梭','胡杨','沙棘','柠条','花棒'], axisLine: { lineStyle: { color: '#444' } }, axisTick: { alignWithLabel: true }, axisLabel: { color: '#aaa', fontWeight: 500 } },
                    yAxis: [{
                        type: 'value', name: 'm²', nameTextStyle: { color: '#666' }, axisLine: { show: false },
                        axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)', type: 'dashed' } }
                    }, {
                        type: 'value', max: 100, name: '%', nameTextStyle: { color: '#666' }, axisLine: { show: false },
                        axisLabel: { color: '#888' }, splitLine: { show: false }
                    }],
                    series: [
                        { name: '固沙量(m²/株)', type: 'bar', data: [10,15,6,8,5], barWidth: '40%',
                            itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#34d399'},{offset:1,color:'#1a6d3a'}]), borderRadius: [8,8,0,0] },
                            label: { show: true, position: 'top', color: 'rgba(52,211,153,0.8)', fontSize: 12, fontWeight: 700, formatter: '{c}m²' },
                            animationDelay: function(idx) { return idx * 120; }
                        },
                        { name: '成活率(%)', type: 'line', yAxisIndex: 1, data: [85,78,90,88,75], smooth: true,
                            lineStyle: { color: '#fbbf24', width: 4, shadowBlur: 10, shadowColor: 'rgba(241,196,15,0.3)' },
                            itemStyle: { color: '#fbbf24' },
                            areaStyle: { color: 'rgba(241,196,15,0.08)' },
                            symbol: 'circle', symbolSize: 10,
                            label: { show: true, position: 'bottom', color: 'rgba(241,196,15,0.7)', fontSize: 11, formatter: '{c}%' }
                        }
                    ],
                    animationEasing: 'elasticOut'
                });
            });
            // 降水蒸发
            safeRender(function() {
                var el = document.getElementById('rainChart');
                if (!el) return;
                var r = echarts.init(el);
                r.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, textStyle: { color: '#fff' } },
                    legend: { data: ['降水量', '蒸发量'], textStyle: { color: '#aaa' }, top: 10, icon: 'roundRect' },
                    grid: { left: 70, right: 30, top: 55, bottom: 45 },
                    xAxis: { type: 'category', data: ['塔城','哈密','敦煌','格尔木','中卫','榆林'], axisLine: { lineStyle: { color: '#444' } }, axisTick: { alignWithLabel: true }, axisLabel: { color: '#aaa', fontSize: 11, fontWeight: 500, rotate: 15 } },
                    yAxis: { type: 'value', axisLine: { show: false }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)', type: 'dashed' } } },
                    series: [
                        { name: '降水量', type: 'bar', data: [280,50,40,180,200,400], barWidth: '32%',
                            itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#60b0f4'},{offset:1,color:'#1a6ba0'}]), borderRadius: [6,6,0,0] },
                            label: { show: true, position: 'top', color: 'rgba(52,152,219,0.7)', fontSize: 10, formatter: '{c}mm' },
                            animationDelay: function(idx) { return idx * 100; }
                        },
                        { name: '蒸发量', type: 'bar', data: [1800,3200,2800,2200,2400,1600], barWidth: '32%',
                            itemStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'#f0a04b'},{offset:1,color:'#b85e1a'}]), borderRadius: [6,6,0,0] },
                            label: { show: true, position: 'top', color: 'rgba(230,126,34,0.7)', fontSize: 10, formatter: '{c}mm' },
                            animationDelay: function(idx) { return idx * 100 + 50; }
                        }
                    ],
                    animationEasing: 'elasticOut'
                });
            });
        }
        function initClimateChartsObserver() {
            if (climateChartsRendered) return;
            var el = document.getElementById('page-5');
            if (!el) return;
            new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting && !climateChartsRendered) {
                        climateChartsRendered = true;
                        ensureEcharts(function() { renderClimateCharts(); });
                    }
                });
            }, { threshold: 0.1 }).observe(el);
        }
        function renderClimateCharts() {
            function safeRender(fn) { try { fn(); } catch(e) { console.warn('Climate chart error:', e); } }
            safeRender(function() {
                var el = document.getElementById('climateChart1');
                if (!el) return;
                var c1 = echarts.init(el);
                c1.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', textStyle: { color: '#fff' } },
                    grid: { left: 50, right: 15, top: 15, bottom: 30 },
                    xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888', fontSize: 10, rotate: 30 } },
                    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } } },
                    series: [
                        { name: '降水(mm)', type: 'bar', data: [3,5,8,15,25,35,60,55,30,18,8,3], itemStyle: { color: '#3498db', borderRadius: [4,4,0,0] }, barWidth: '35%' },
                        { name: '蒸发(mm)', type: 'line', data: [20,40,80,150,220,300,350,320,200,120,60,30], smooth: true, lineStyle: { color: '#e67e22', width: 3 }, itemStyle: { color: '#e67e22' } }
                    ]
                });
            });
            safeRender(function() {
                var el = document.getElementById('climateChart2');
                if (!el) return;
                var c2 = echarts.init(el);
                c2.setOption({
                    tooltip: { trigger: 'axis', backgroundColor: 'rgba(10,54,34,0.95)', textStyle: { color: '#fff' } },
                    grid: { left: 50, right: 15, top: 15, bottom: 30 },
                    xAxis: { type: 'category', data: ['2015','2017','2019','2021','2023','2025'], axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' } },
                    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#333' } }, axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } } },
                    series: [{ type: 'line', data: [12,10,9,18,7,5], smooth: true, areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1, [{offset:0,color:'rgba(231,76,60,0.4)'},{offset:1,color:'rgba(231,76,60,0.05)'}]) }, lineStyle: { color: '#e74c3c', width: 4 }, itemStyle: { color: '#e74c3c' }, markPoint: { data: [{name:'黑风暴',value:18,xAxis:3,yAxis:18}], label: { color: '#fff', fontSize: 11 } } }]
                });
            });
        }
        
        
// ===== ENHANCED: 沙漠场景Canvas渲染 (代替纯渐变) =====
function renderDesertScene(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    
    // 天空 - 炙热
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#f5d7a0');
    skyGrad.addColorStop(0.5, '#e8b86d');
    skyGrad.addColorStop(1, '#d4a574');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.5);
    
    // 太阳
    const sunGrad = ctx.createRadialGradient(w * 0.75, h * 0.1, 5, w * 0.75, h * 0.1, 40);
    sunGrad.addColorStop(0, 'rgba(255,200,50,1)');
    sunGrad.addColorStop(0.5, 'rgba(255,180,50,0.6)');
    sunGrad.addColorStop(1, 'rgba(255,180,50,0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(w * 0.75 - 40, h * 0.1 - 40, 80, 80);
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.1, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    
    // 沙丘
    const duneColors = ['#c19a6b', '#d4a574', '#a0785a', '#8B7355', '#b89464'];
    for (let i = 0; i < 8; i++) {
        const dx = Math.random() * w;
        const dw = 80 + Math.random() * 200;
        const dh = 20 + Math.random() * 80;
        const dy = h * 0.45 + Math.random() * 30;
        ctx.beginPath();
        ctx.moveTo(dx - dw/2, dy + dh);
        ctx.quadraticCurveTo(dx, dy - dh, dx + dw/2, dy + dh);
        ctx.fillStyle = duneColors[i % duneColors.length] + '80';
        ctx.fill();
        // 沙丘阴影
        ctx.beginPath();
        ctx.moveTo(dx - dw/4, dy + dh);
        ctx.quadraticCurveTo(dx - dw/8, dy - dh*0.3, dx, dy + dh);
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.fill();
    }
    
    // 沙地
    ctx.fillStyle = '#d4a574';
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
    
    // 沙地纹理
    for (let i = 0; i < 200; i++) {
        const sx = Math.random() * w;
        const sy = h * 0.5 + Math.random() * h * 0.5;
        ctx.fillStyle = ['#c19a6b', '#b89464', '#a0785a', '#8B7355'][Math.floor(Math.random() * 4)] + '30';
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 枯树剪影
    for (let i = 0; i < 3; i++) {
        const tx = 50 + Math.random() * (w - 100);
        const ty = h * 0.35 + Math.random() * h * 0.15;
        ctx.strokeStyle = '#4a3520';
        ctx.lineWidth = 2 + Math.random();
        ctx.beginPath();
        ctx.moveTo(tx, ty + 20);
        ctx.lineTo(tx, ty - 10);
        for (let j = 0; j < 3; j++) {
            ctx.moveTo(tx, ty - 5 + j * 3);
            ctx.lineTo(tx + (Math.random() - 0.5) * 20, ty - 10 - j * 5);
        }
        ctx.stroke();
    }
    
    // 干裂土地纹路
    ctx.strokeStyle = 'rgba(139,115,85,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
        const cx = Math.random() * w;
        const cy = h * 0.6 + Math.random() * h * 0.35;
        for (let j = 0; j < 4; j++) {
            ctx.beginPath();
            ctx.moveTo(cx + j * 8, cy);
            ctx.lineTo(cx + j * 8 + 6, cy + 6);
            ctx.lineTo(cx + j * 8 + 12, cy);
            ctx.stroke();
        }
    }
}

function renderGreenScene(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    
    // 天空 - 清新蓝天
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(0.6, '#87CEEB');
    skyGrad.addColorStop(1, '#B0E0E6');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.45);
    
    // 白云
    for (let i = 0; i < 5; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h * 0.25;
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 30 + Math.random() * 40, 10 + Math.random() * 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 20, cy - 5, 20 + Math.random() * 30, 12 + Math.random() * 6, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 草地
    const grassGrad = ctx.createLinearGradient(0, h * 0.4, 0, h);
    grassGrad.addColorStop(0, '#6B8E23');
    grassGrad.addColorStop(0.3, '#4a7c2e');
    grassGrad.addColorStop(0.6, '#2e6b1a');
    grassGrad.addColorStop(1, '#1a5c0a');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, h * 0.4, w, h * 0.6);
    
    // 草丛纹理
    for (let i = 0; i < 300; i++) {
        const gx = Math.random() * w;
        const gy = h * 0.42 + Math.random() * h * 0.55;
        const gh = 3 + Math.random() * 8;
        ctx.strokeStyle = ['#228B22', '#34d399', '#32CD32', '#006400'][Math.floor(Math.random() * 4)] + '60';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx + (Math.random() - 0.5) * 4, gy - gh);
        ctx.stroke();
    }
    
    // 绿树
    const treeTypes = [
        // 圆形树冠
        (x, y, s) => {
            ctx.fillStyle = '#228B22';
            ctx.beginPath(); ctx.arc(x, y, 12 * s, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#1a6b1a';
            ctx.beginPath(); ctx.arc(x - 3 * s, y + 2 * s, 8 * s, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#654321';
            ctx.fillRect(x - 1.5 * s, y + 8 * s, 3 * s, 15 * s);
        },
        // 尖形树(针叶)
        (x, y, s) => {
            ctx.fillStyle = '#006400';
            ctx.beginPath(); ctx.moveTo(x, y - 20 * s); ctx.lineTo(x - 12 * s, y + 5 * s); ctx.lineTo(x + 12 * s, y + 5 * s); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x, y - 14 * s); ctx.lineTo(x - 10 * s, y + 10 * s); ctx.lineTo(x + 10 * s, y + 10 * s); ctx.fill();
            ctx.fillStyle = '#654321';
            ctx.fillRect(x - 1.5 * s, y + 8 * s, 3 * s, 12 * s);
        },
        // 丛状灌木
        (x, y, s) => {
            for (let j = 0; j < 5; j++) {
                ctx.fillStyle = ['#228B22', '#34d399', '#32CD32'][j % 3];
                ctx.beginPath();
                ctx.arc(x + (Math.random() - 0.5) * 15 * s, y + (Math.random() - 0.5) * 8 * s, 5 * s + Math.random() * 4 * s, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    ];
    
    for (let i = 0; i < 15; i++) {
        const tx = 20 + Math.random() * (w - 40);
        const ty = h * 0.4 + Math.random() * h * 0.35;
        const ts = 0.6 + Math.random() * 1.2;
        treeTypes[Math.floor(Math.random() * treeTypes.length)](tx, ty, ts);
    }
    
    // 小路
    ctx.fillStyle = 'rgba(139,119,90,0.3)';
    ctx.beginPath();
    ctx.moveTo(w * 0.3, h);
    ctx.quadraticCurveTo(w * 0.4, h * 0.7, w * 0.5, h * 0.5);
    ctx.quadraticCurveTo(w * 0.6, h * 0.4, w * 0.7, h * 0.35);
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // 小河流
    ctx.fillStyle = 'rgba(52,152,219,0.25)';
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.6);
    ctx.quadraticCurveTo(w * 0.3, h * 0.55, w * 0.5, h * 0.58);
    ctx.quadraticCurveTo(w * 0.7, h * 0.62, w * 0.9, h * 0.55);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(52,152,219,0.3)';
    ctx.stroke();
}

// ===== ENHANCED: 沙地渲染完调用 =====
function initEnhancedCompareScenes() {
    const beforeBg = document.querySelector('.compare-before-bg');
    const afterBg = document.querySelector('.compare-after-bg');
    if (!beforeBg || !afterBg) return;
    
    // Create canvases for desert/green scenes
    const desertCanvas = document.createElement('canvas');
    desertCanvas.className = 'compare-desert-canvas';
    const greenCanvas = document.createElement('canvas');
    greenCanvas.className = 'compare-green-canvas';
    
    beforeBg.appendChild(desertCanvas);
    afterBg.appendChild(greenCanvas);
    
    function resize() {
        const rect = beforeBg.getBoundingClientRect();
        desertCanvas.width = rect.width || 800;
        desertCanvas.height = rect.height || 500;
        greenCanvas.width = rect.width || 800;
        greenCanvas.height = rect.height || 500;
        renderDesertScene(desertCanvas);
        renderGreenScene(greenCanvas);
    }
    resize();
    window.addEventListener('resize', () => setTimeout(resize, 300));
    
    // 沙粒动画 (desert side)
    spawnSandParticles(document.querySelector('.compare-before'));
    // 飞鸟动画 (green side)
    spawnBirds(document.querySelector('.compare-after'));
    
    // 添加热浪到沙漠
    const shimmer = document.createElement('div');
    shimmer.className = 'heat-shimmer';
    document.querySelector('.compare-before')?.appendChild(shimmer);
    
    // 绿洲光晕
    const glow = document.createElement('div');
    glow.className = 'green-glow';
    document.querySelector('.compare-after')?.appendChild(glow);
}

function spawnSandParticles(container) {
    if (!container) return;
    const layer = document.createElement('div');
    layer.className = 'compare-sand-particles';
    container.appendChild(layer);
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'sand-particle';
        p.style.left = (Math.random() * 100) + '%';
        p.style.top = (Math.random() * 100) + '%';
        p.style.setProperty('--drift', (Math.random() - 0.5) * 30 + 'px');
        p.style.animationDuration = (3 + Math.random() * 4) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        p.style.opacity = 0.3 + Math.random() * 0.5;
        layer.appendChild(p);
    }
}

function spawnBirds(container) {
    if (!container) return;
    const birds = ['🐦', '🕊️', '🐤'];
    for (let i = 0; i < 3; i++) {
        const b = document.createElement('div');
        b.className = 'compare-bird';
        b.textContent = birds[i % birds.length];
        b.style.top = (5 + Math.random() * 15) + '%';
        b.style.animationDelay = (i * 3) + 's';
        b.style.animationDuration = (10 + Math.random() * 6) + 's';
        container.appendChild(b);
    }
}

function darkenColor(hex, amount) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    const r = Math.max(0, parseInt(c.substr(0,2), 16) - amount);
    const g = Math.max(0, parseInt(c.substr(2,2), 16) - amount);
    const b = Math.max(0, parseInt(c.substr(4,2), 16) - amount);
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// ===== ENHANCED: 数据悬浮光效 =====
function initGlowCards() {
    document.querySelectorAll('.glow-card, .stat-card, .achievement-card, .crisis-card, .disaster-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
        // V4: 键盘交互支持
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
                e.preventDefault();
            }
        });
    });
}

// ===== V4: 无障碍焦点管理 =====
function initA11yFocus() {
    // 为所有交互元素添加tabindex（如果尚未设置）
    const interactiveElements = document.querySelectorAll('.plant-item, .soil-card, .timeline-content, .stat-card, .achievement-card, .compare-region-card');
    interactiveElements.forEach((el, idx) => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
        if (!el.hasAttribute('role')) {
            el.setAttribute('role', 'button');
        }
    });
    
    // 为图表容器添加描述性标签
    const charts = document.querySelectorAll('.chart-area');
    charts.forEach(chart => {
        const id = chart.id;
        if (id) {
            const label = document.createElement('span');
            label.className = 'sr-only';
            label.id = id + '-label';
            chart.setAttribute('aria-labelledby', id + '-label');
            chart.insertBefore(label, chart.firstChild);
        }
    });
    
    /* accessibility initialized */
}

// ===== V4: 屏幕阅读器动态内容通知 =====
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('liveRegion');
    if (liveRegion) {
        liveRegion.textContent = '';
        setTimeout(() => { liveRegion.textContent = message; }, 50);
    }
}

// ===== V4: 高对比度模式检测 =====
function initContrastDetection() {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    function handleContrastChange(e) {
        if (e.matches) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }
    mediaQuery.addEventListener('change', handleContrastChange);
    handleContrastChange(mediaQuery);
}

// ===== ENHANCED: 页面的装饰性浮动粒子 =====
function spawnFloatingParticles() {
    document.querySelectorAll('.page').forEach(page => {
        if (page.id === 'page-0' || page.id === 'page-2b') return;
        const count = 8 + Math.floor(Math.random() * 8);
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'float-particle';
            p.style.left = (Math.random() * 100) + '%';
            p.style.bottom = '0';
            p.style.width = (2 + Math.random() * 5) + 'px';
            p.style.height = p.style.width;
            p.style.animationDuration = (8 + Math.random() * 12) + 's';
            p.style.animationDelay = (Math.random() * 8) + 's';
            p.style.opacity = (0.1 + Math.random() * 0.2).toString();
            page.appendChild(p);
        }
    });
}

// ===== ENHANCED: 滚动追踪光效 =====
function initScrollLight() {
    const light = document.createElement('div');
    light.className = 'scroll-light';
    document.body.appendChild(light);
    document.addEventListener('mousemove', e => {
        light.style.setProperty('--lx', e.clientX + 'px');
        light.style.setProperty('--ly', e.clientY + 'px');
    });
}

// ===== ENHANCED: 沙漠对比滑块键盘支持 =====
function initCompareKeyboard() {
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const container = document.getElementById('compareContainer');
            const slider = document.getElementById('compareSlider');
            if (!container || !slider || !container.getBoundingClientRect) return;
            const rect = container.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) return;
            
            let pct = parseFloat(slider.style.left) || 50;
            pct += e.key === 'ArrowLeft' ? -3 : 3;
            pct = Math.max(5, Math.min(95, pct));
            setCompare(pct);
        }
    });
}

// ===== 植物卡片键盘导航 =====
const plantOrder = ['suosuo', 'huyang', 'shaji', 'ningtiao', 'jinsha'];
function initPlantKeyboard() {
    document.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        const section = document.getElementById('page-4');
        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        e.preventDefault();
        const active = document.querySelector('.plant-item.active');
        if (!active) return;
        const type = active.getAttribute('data-plant');
        const idx = plantOrder.indexOf(type);
        let next;
        if (e.key === 'ArrowDown') next = plantOrder[(idx + 1) % plantOrder.length];
        else next = plantOrder[(idx - 1 + plantOrder.length) % plantOrder.length];
        showPlant(next);
        document.querySelector(`[data-plant="${next}"]`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ===== ENHANCED: 对比数据扩展 =====
const regionData = {
    'maowusu': { name: '毛乌素沙地', before: { forest: 2.5, sand: 95, carbon: 0.2 }, after: { forest: 33, sand: 18, carbon: 8.5 }, years: '1959-2024', area: '4.22万km²', co2: '固碳850万吨/年' },
    'kubuqi': { name: '库布其沙漠', before: { forest: 1.5, sand: 98, carbon: 0.1 }, after: { forest: 25, sand: 35, carbon: 6.2 }, years: '1988-2024', area: '0.62万km²', co2: '固碳620万吨/年' },
    'tengger': { name: '腾格里沙漠', before: { forest: 0.8, sand: 99, carbon: 0.05 }, after: { forest: 18, sand: 50, carbon: 3.8 }, years: '1978-2024', area: '4.27万km²', co2: '固碳380万吨/年' }
};

// Enhance setCompare to update data chips
const _origSetCompare = window.setCompare || function(){};
window.setCompare = function(pct) { console.log("setCompare called:", pct, "curDesert:", window.curDesert);
    if (typeof _origSetCompare === 'function') _origSetCompare(pct);
    // Update data overlay chips
    const overlay = document.getElementById('compareDataOverlay');
    if (!overlay) return;
    const region = window.curDesert || 'tengger';
    const data = regionData[region];
    if (!data) return;
    overlay.innerHTML = '';
    const chips = [
        { icon: '🌲', text: '森林率 ' + Math.round(data.before.forest + (data.after.forest - data.before.forest) * pct / 100) + '%' },
        { icon: '🏜️', text: '沙化率 ' + Math.round(data.before.sand - (data.before.sand - data.after.sand) * pct / 100) + '%' },
        { icon: '🌍', text: data.area },
        { icon: '🌱', text: data.co2 }
    ];
    chips.forEach(c => {
        const chip = document.createElement('span');
        chip.className = 'compare-data-chip';
        chip.innerHTML = '<span class="icon">' + c.icon + '</span> ' + c.text;
        overlay.appendChild(chip);
    });
};

// ===== 区域卡片进度条动画 =====
(function(){
    var regionObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            if(e.isIntersecting){
                var bars = e.target.querySelectorAll('.bar-fill[data-w]');
                bars.forEach(function(f){
                    f.style.width = '0%';
                    void f.offsetWidth;
                    f.style.width = f.getAttribute('data-w') + '%';
                });
            }
        });
    }, {threshold: 0.3});
    document.querySelectorAll('.compare-region-card').forEach(function(card){
        regionObs.observe(card);
    });
})();

        // ===== 锁边地图 =====
        function initSuobian() {
            // HTML zones already have onclick="selectZone(this)", no need to add duplicate listeners
        }
        
        function selectZone(el) {
            document.querySelectorAll('.suobian-zone').forEach(z => z.classList.remove('active'));
            el.classList.add('active');
            const info = document.getElementById('suobianInfo');
            info.classList.add('show');
            document.getElementById('zoneName').textContent = '🔒 ' + el.getAttribute('data-name');
            document.getElementById('zoneStats').innerHTML = `
                <div class="suobian-stat"><div class="lbl">锁边长度</div><div class="val">${el.getAttribute('data-length')}</div></div>
                <div class="suobian-stat"><div class="lbl">治理面积</div><div class="val">${el.getAttribute('data-area')}</div></div>
                <div class="suobian-stat"><div class="lbl">累计植树</div><div class="val">${el.getAttribute('data-trees')}</div></div>
                <div class="suobian-stat"><div class="lbl">主要树种</div><div class="val" style="font-size:1rem">${el.getAttribute('data-species')}</div></div>
            `;
            showNoti('🔒 查看' + el.getAttribute('data-name') + '锁边详情');
        }
        
        // ===== 次生灾害条 =====
        function initDisasterBars() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        // 进度条动画
                        e.target.querySelectorAll('.fill[data-width], .bar-fill[data-width]').forEach(f => {
                            f.style.width = f.getAttribute('data-width') + '%';
                        });
                        // 威胁度仪表动画
                        e.target.querySelectorAll('.gauge-fill[data-width]').forEach(f => {
                            f.style.width = f.getAttribute('data-width') + '%';
                        });
                        // 数字递增动画
                        e.target.querySelectorAll('.count-up[data-target]').forEach(el => {
                            el.removeAttribute('data-counted');
                            el.textContent = '0';
                            const target = parseInt(el.dataset.target);
                            if (!target) return;
                            const duration = 2000;
                            const start = performance.now();
                            function tick(now) {
                                const elapsed = now - start;
                                const progress = Math.min(elapsed / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3);
                                el.textContent = Math.round(eased * target);
                                if (progress < 1) requestAnimationFrame(tick);
                            }
                            requestAnimationFrame(tick);
                        });
                        // 成就大数字动画
                        e.target.querySelectorAll('.big-num[data-count-up]').forEach(el => {
                            el.removeAttribute('data-counted');
                            const target = parseInt(el.dataset.countUp);
                            const prefix = el.dataset.prefix || '';
                            const suffix = el.dataset.suffix || '';
                            el.textContent = prefix + '0' + suffix;
                            if (!target) return;
                            const duration = 2000;
                            const start = performance.now();
                            function tick(now) {
                                const elapsed = now - start;
                                const progress = Math.min(elapsed / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3);
                                el.textContent = prefix + Math.round(eased * target) + suffix;
                                if (progress < 1) requestAnimationFrame(tick);
                            }
                            requestAnimationFrame(tick);
                        });
                        // 环形进度条动画
                        e.target.querySelectorAll('.ring-fill').forEach(ring => {
                            ring.removeAttribute('data-animated');
                            ring.style.strokeDashoffset = '314';
                            const gauge = ring.closest('.ring-gauge');
                            const percent = parseInt(gauge.dataset.percent) || 0;
                            const circumference = 314;
                            const offset = circumference - (circumference * percent / 100);
                            setTimeout(() => { ring.style.strokeDashoffset = offset; }, 300);
                        });
                    } else {
                        // 离开视口时重置进度条和仪表
                        e.target.querySelectorAll('.fill[data-width], .bar-fill[data-width], .gauge-fill[data-width]').forEach(f => {
                            f.style.width = '0';
                        });
                        e.target.querySelectorAll('.ring-fill').forEach(ring => {
                            ring.style.strokeDashoffset = '314';
                        });
                    }
                });
            }, { threshold: 0.3 });
            document.querySelectorAll('.disaster-card, .soil-card, .crisis-card, .achievement-card').forEach(el => obs.observe(el));
        }

        function initCrisisCountUp() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.removeAttribute('data-counted');
                        e.target.textContent = '0';
                        const target = parseInt(e.target.dataset.count);
                        if (!target) return;
                        const duration = 2000;
                        const start = performance.now();
                        function tick(now) {
                            const elapsed = now - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            e.target.textContent = Math.round(eased * target);
                            if (progress < 1) requestAnimationFrame(tick);
                        }
                        requestAnimationFrame(tick);
                    }
                });
            }, { threshold: 0.5 });
            document.querySelectorAll('.big-num span[data-count]').forEach(el => obs.observe(el));
        }
        
        // ===== 土壤剖面 =====
        function initSoilProfiles() {
            document.querySelectorAll('.soil-profile').forEach(function(profile) {
                profile.querySelectorAll('.sp-layer').forEach(function(layer) {
                    var desc = layer.style.getPropertyValue('--desc').replace(/'/g, '');
                    var moist = layer.style.getPropertyValue('--moist').replace(/'/g, '');
                    var org = layer.style.getPropertyValue('--org').replace(/'/g, '');
                    var tip = document.createElement('div');
                    tip.className = 'sp-tooltip';
                    tip.innerHTML = desc + '<br>💧含水量: ' + moist + ' &nbsp; 🌿有机质: ' + org;
                    layer.appendChild(tip);
                    layer.addEventListener('mouseenter', function() {
                        this.style.background = this.style.background ? this.style.background : '#444';
                    });
                });
            });
        }
        
        // ===== 土壤条 =====
        function initSoilBars() {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.querySelectorAll('.fill[data-width]').forEach(f => {
                            setTimeout(() => { f.style.width = f.getAttribute('data-width') + '%'; }, 300);
                        });
                    } else {
                        e.target.querySelectorAll('.fill[data-width]').forEach(f => {
                            f.style.width = '0';
                        });
                    }
                });
            }, { threshold: 0.2 });
            document.querySelectorAll('.soil-card').forEach(el => obs.observe(el));
        }
        
        // ===== 根系条（动态生长动画） =====
        function initRootBars() {
            const active = document.querySelector('.plant-item.active');
            if (active) animateRootBar(active);
        }

        function animateRootBar(item) {
            const fill = item.querySelector('.root-fill[data-width]');
            const counter = item.querySelector('.root-val .counter');
            const target = parseInt(item.querySelector('.root-val')?.getAttribute('data-target') || '0');
            if (!fill) return;
            // 重置
            fill.style.transition = 'none';
            fill.style.width = '0%';
            if (counter) counter.textContent = '0';
            // 触发重排后启动动画
            void fill.offsetWidth;
            fill.style.transition = 'width 1.6s cubic-bezier(0.22,0.61,0.36,1)';
            fill.style.width = fill.getAttribute('data-width') + '%';
            // 数字递增动画
            if (counter && target > 0) {
                const duration = 1600;
                const start = performance.now();
                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutCubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }
        }
        
        // ===== 植物3D =====
        const plantInfo = {
            suosuo: { title: '🌱 梭梭 — 沙漠之王', desc: '根系深达15米，1棵成年梭梭可固定10m²沙地。同化枝绿色可光合，年蒸腾仅200mm。种子沙藏数年不坏，遇水即萌发，是荒漠生态基石。', color: 0x228B22 },
            huyang: { title: '🌲 胡杨 — 沙漠英雄树', desc: '根系深达20米穿透干沙层，叶形随龄变化——幼叶如柳、成年似杨。耐盐碱、耐涝，是唯一能在沙漠河岸形成森林的树种，"千年传奇"名不虚传。', color: 0x006400 },
            shaji: { title: '🍊 沙棘 — 维生素之王', desc: '根蘖萌发极强，横向扩展达10米。与放线菌共生固氮，维C含量1200mg/100g(猕猴桃的8倍、橙子的12倍)。耐-40℃至+40℃极端温差。', color: 0x6B8E23 },
            ningtiao: { title: '🌿 柠条 — 平茬复壮之王', desc: '豆科灌木，根系盘结达8米。耐平茬——3-5年刈割一次反促根蘖大量萌发，复壮后可用30年。枝条柔韧可作饲料燃料，生态经济双赢。', color: 0x32CD32 },
            jinsha: { title: '🌾 花棒 — 沙漠姑娘', desc: '又名"沙漠姑娘"，根系水平扩展达12米。最神奇的是耐沙埋——枝干被流沙覆盖后，可从埋入的茎节萌发不定根和新枝，自然更新能力极强。', color: 0x8FBC8F }
        };

        // ===== 右侧植物切换导航 =====
        const plantTypes = ['suosuo', 'huyang', 'shaji', 'ningtiao', 'jinsha'];
        let currentPlantIdx = 0;

        function initPlantNav() {
            const dotsContainer = document.getElementById('plantDots');
            if (!dotsContainer) return;
            plantTypes.forEach((type, i) => {
                const dot = document.createElement('button');
                dot.className = 'plant-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', plantInfo[type].title);
                dot.onclick = () => { currentPlantIdx = i; showPlant(type); updatePlantDots(); };
                dotsContainer.appendChild(dot);
            });
        }

        function updatePlantDots() {
            document.querySelectorAll('.plant-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentPlantIdx);
            });
        }

        function nextPlant() {
            currentPlantIdx = (currentPlantIdx + 1) % plantTypes.length;
            showPlant(plantTypes[currentPlantIdx]);
            updatePlantDots();
        }

        function prevPlant() {
            currentPlantIdx = (currentPlantIdx - 1 + plantTypes.length) % plantTypes.length;
            showPlant(plantTypes[currentPlantIdx]);
            updatePlantDots();
        }

        // ===== 缩放控制 =====
        function zoomIn() {
            targetZoom = Math.min(2.5, targetZoom + 0.2);
            updateZoomDisplay();
        }
        function zoomOut() {
            targetZoom = Math.max(0.35, targetZoom - 0.2);
            updateZoomDisplay();
        }
        function updateZoomDisplay() {
            const el = document.getElementById('zoomLevel');
            if (el) el.textContent = Math.round(targetZoom * 100) + '%';
        }

        // ===== 左侧轮播触摸滑动 =====
        function initCarouselSwipe() {
            const carousel = document.getElementById('plantCarousel');
            if (!carousel) return;
            let startX = 0, startY = 0, swiping = false;
            carousel.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                swiping = true;
            }, { passive: true });
            carousel.addEventListener('touchmove', e => {
                if (!swiping) return;
                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;
                if (Math.abs(dy) > Math.abs(dx)) { swiping = false; return; }
            }, { passive: true });
            carousel.addEventListener('touchend', e => {
                if (!swiping) return;
                swiping = false;
                const dx = e.changedTouches[0].clientX - startX;
                if (Math.abs(dx) > 50) {
                    if (dx < 0) nextPlant();
                    else prevPlant();
                }
            });
        }

        function showPlant(type) {
            const idx = plantTypes.indexOf(type);
            const oldIdx = currentPlantIdx;
            // 左侧轮播切换
            const carousel = document.getElementById('plantCarousel');
            const items = carousel.querySelectorAll('.plant-item');
            const oldItem = carousel.querySelector('.plant-item.active');
            const newItem = carousel.querySelector(`[data-plant="${type}"]`);
            if (oldItem && newItem && oldItem !== newItem) {
                const goingRight = idx > oldIdx || (oldIdx === plantTypes.length - 1 && idx === 0);
                oldItem.classList.remove('active');
                oldItem.classList.add(goingRight ? 'exit-left' : 'exit-right');
                // 新卡片从反方向进入
                newItem.classList.remove('exit-left', 'exit-right');
                newItem.style.transition = 'none';
                newItem.style.transform = goingRight ? 'translateX(40px) scale(0.96)' : 'translateX(-40px) scale(0.96)';
                newItem.style.opacity = '0';
                void newItem.offsetWidth;
                newItem.style.transition = '';
                newItem.style.transform = '';
                newItem.style.opacity = '';
                newItem.classList.add('active');
                // 清理旧卡片 inline 残留
                setTimeout(() => {
                    oldItem.classList.remove('exit-left', 'exit-right');
                    oldItem.style.transform = '';
                    oldItem.style.opacity = '';
                }, 500);
                animateRootBar(newItem);
            }
            // 右侧 3D + 覆盖层
            const overlay = document.querySelector('.plant-info-overlay');
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(10px)';
            setTimeout(() => {
                document.getElementById('plantInfoTitle').textContent = plantInfo[type].title;
                document.getElementById('plantInfoDesc').textContent = plantInfo[type].desc;
                renderPlantDemo(type);
                currentPlantIdx = idx;
                updatePlantDots();
                document.getElementById('plantListIdx').textContent = idx + 1;
                overlay.style.transition = 'opacity 0.4s, transform 0.4s';
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }, 150);
        }
        
        function initPlantDemo() {
            if (!document.getElementById('plantCanvas')) return;
            const canvas = document.getElementById('plantCanvas');
            const cw = canvas.parentElement.clientWidth || 500;
            const ch = canvas.parentElement.clientHeight || 450;
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x87CEEB);
            scene.fog = new THREE.FogExp2(0x87CEEB, 0.001);
            const camera = new THREE.PerspectiveCamera(50, cw / ch, 0.1, 1000);
            camera.position.set(0, 30, 80);
            camera.lookAt(0, 10, 0);
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
            renderer.setSize(cw, ch);
            renderer.shadowMap.enabled = true;
            scene.add(new THREE.AmbientLight(0xffffff, 0.7));
            const dir = new THREE.DirectionalLight(0xffffff, 1.2);
            dir.position.set(30, 60, 30);
            dir.castShadow = true;
            scene.add(dir);
            scene.add(new THREE.HemisphereLight(0x87ceeb, 0xdeb887, 0.5));

            // 天空渐变穹顶（丰富色彩：地平线暖橙→中层蓝→顶部深蓝紫）
            const skyGeo = new THREE.SphereGeometry(180, 32, 16);
            const skyVerts = skyGeo.attributes.position;
            const skyColors = new Float32Array(skyVerts.count * 3);
            for (let i = 0; i < skyVerts.count; i++) {
                const y = skyVerts.getY(i);
                const t = (y + 180) / 360; // 0=底部 1=顶部
                let r, g, b;
                if (t < 0.25) {
                    // 地平线：暖橙渐变
                    const h = t / 0.25;
                    r = 0.95 - h * 0.4; g = 0.65 - h * 0.05; b = 0.4 + h * 0.25;
                } else if (t < 0.6) {
                    // 中层：天蓝
                    const h = (t - 0.25) / 0.35;
                    r = 0.55 - h * 0.15; g = 0.6 + h * 0.15; b = 0.65 + h * 0.2;
                } else {
                    // 顶部：深蓝偏紫
                    const h = (t - 0.6) / 0.4;
                    r = 0.4 - h * 0.1; g = 0.75 - h * 0.15; b = 0.85 + h * 0.1;
                }
                skyColors[i * 3] = r; skyColors[i * 3 + 1] = g; skyColors[i * 3 + 2] = b;
            }
            skyGeo.setAttribute('color', new THREE.BufferAttribute(skyColors, 3));
            const sky = new THREE.Mesh(skyGeo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide }));
            scene.add(sky);

            // 太阳（暖金色调）
            const sunGroup = new THREE.Group();
            const sunCore = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xFFFDE7 }));
            sunGroup.add(sunCore);
            const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(5.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xFFB74D, transparent: true, opacity: 0.3 }));
            sunGroup.add(sunGlow);
            const sunOuter = new THREE.Mesh(new THREE.SphereGeometry(9, 16, 16), new THREE.MeshBasicMaterial({ color: 0xFFCC80, transparent: true, opacity: 0.1 }));
            sunGroup.add(sunOuter);
            sunGroup.position.set(35, 55, -60);
            scene.add(sunGroup);
            const sunLight = new THREE.PointLight(0xFFE0B2, 0.8, 250);
            sunLight.position.copy(sunGroup.position);
            scene.add(sunLight);

            // 阳光射线（暖金色，更宽更明显）
            const rayGroup = new THREE.Group();
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const rayGeo = new THREE.PlaneGeometry(0.5 + Math.random() * 0.3, 28 + Math.random() * 10);
                const rayMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0xFFE082 : 0xFFF176, transparent: true, opacity: 0.05 + Math.random() * 0.03, side: THREE.DoubleSide });
                const ray = new THREE.Mesh(rayGeo, rayMat);
                ray.position.set(Math.cos(angle) * 5, Math.sin(angle) * 5, 0);
                ray.rotation.z = angle;
                rayGroup.add(ray);
            }
            sunGroup.add(rayGroup);

            // 沙地地面（带凹凸感 + 顶点色彩变化）
            const groundGeo = new THREE.PlaneGeometry(200, 200, 60, 60);
            const posArr = groundGeo.attributes.position.array;
            const gndColors = new Float32Array(posArr.length);
            for (let i = 0; i < posArr.length; i += 3) {
                const x = posArr[i], y = posArr[i + 1];
                posArr[i + 2] = Math.sin(x * 0.05) * Math.cos(y * 0.04) * 0.8 + Math.sin(x * 0.12 + y * 0.08) * 0.3;
                // 沙色变化：暖黄、红棕、浅褐交替
                const n = Math.sin(x * 0.03 + y * 0.02) * 0.5 + 0.5;
                const n2 = Math.cos(x * 0.07 - y * 0.05) * 0.5 + 0.5;
                gndColors[i]     = 0.78 + n * 0.08 + n2 * 0.05;  // R
                gndColors[i + 1] = 0.62 + n * 0.06 - n2 * 0.03;  // G
                gndColors[i + 2] = 0.38 + n * 0.04 + n2 * 0.06;  // B
            }
            groundGeo.setAttribute('color', new THREE.BufferAttribute(gndColors, 3));
            groundGeo.computeVertexNormals();
            const ground = new THREE.Mesh(groundGeo, new THREE.MeshLambertMaterial({ vertexColors: true }));
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            scene.add(ground);

            // 远处沙丘（不同色调）
            const duneColors = [0xc9a96e, 0xb8935a, 0xd4b87a, 0xa88548];
            function makeDune(x, z, w, h, d, ci) {
                const dg = new THREE.Mesh(
                    new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
                    new THREE.MeshLambertMaterial({ color: duneColors[ci % duneColors.length] })
                );
                dg.scale.set(w, h, d);
                dg.position.set(x, 0, z);
                dg.receiveShadow = true;
                scene.add(dg);
            }
            makeDune(-40, -35, 18, 5, 10, 0);
            makeDune(30, -45, 22, 6, 12, 1);
            makeDune(-15, -55, 15, 4, 8, 2);
            makeDune(50, -30, 12, 3, 7, 3);

            // 稀疏植被 + 野花点缀
            const grassColors = [0x8B7D3C, 0x9B8B4A, 0x7A6E30, 0xA09050];
            for (let i = 0; i < 50; i++) {
                const gx = (Math.random() - 0.5) * 80;
                const gz = (Math.random() - 0.5) * 40 - 10;
                const gh = 0.3 + Math.random() * 0.7;
                const gc = grassColors[Math.floor(Math.random() * grassColors.length)];
                const grass = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, gh, 4), new THREE.MeshLambertMaterial({ color: gc }));
                grass.position.set(gx, gh / 2, gz);
                scene.add(grass);
            }
            // 彩色小野花
            const flowerColors = [0xE91E63, 0xFF9800, 0xFFEB3B, 0x9C27B0, 0x03A9F4, 0xFF5722];
            for (let i = 0; i < 20; i++) {
                const fx = (Math.random() - 0.5) * 60;
                const fz = (Math.random() - 0.5) * 30 - 5;
                const fc = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.4, 4), new THREE.MeshLambertMaterial({ color: 0x558B2F }));
                stem.position.set(fx, 0.2, fz);
                scene.add(stem);
                const petal = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshLambertMaterial({ color: fc }));
                petal.position.set(fx, 0.45, fz);
                scene.add(petal);
            }
            // 散落小石块
            const rockColors = [0x8B7355, 0x6B5B45, 0x9E8E78, 0x7A6A52];
            for (let i = 0; i < 15; i++) {
                const rx = (Math.random() - 0.5) * 70;
                const rz = (Math.random() - 0.5) * 35 - 8;
                const rs = 0.15 + Math.random() * 0.3;
                const rc = rockColors[Math.floor(Math.random() * rockColors.length)];
                const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(rs, 0), new THREE.MeshLambertMaterial({ color: rc }));
                rock.position.set(rx, rs * 0.3, rz);
                rock.rotation.set(Math.random(), Math.random(), Math.random());
                rock.castShadow = true;
                scene.add(rock);
            }

            // 白云（蓬松自然 + 太阳侧暖色）
            const sunPos = sunGroup.position;
            function makeCloud(x, y, z, s) {
                const cg = new THREE.Group();
                const puffs = [
                    { dx: 0, dy: 0, dz: 0, r: 3.0 },
                    { dx: -2.5, dy: -0.4, dz: 0.5, r: 2.2 },
                    { dx: 2.8, dy: -0.3, dz: -0.3, r: 2.5 },
                    { dx: 1.2, dy: 0.8, dz: -0.4, r: 2.0 },
                    { dx: -1.3, dy: 0.6, dz: 0.5, r: 1.8 },
                    { dx: 3.5, dy: 0.1, dz: 0.2, r: 1.5 },
                    { dx: -3.2, dy: 0.2, dz: -0.2, r: 1.6 }
                ];
                puffs.forEach(p => {
                    // 靠近太阳的一侧偏暖
                    const dx = (x + p.dx * s) - sunPos.x;
                    const sunDist = Math.sqrt(dx * dx + (y + p.dy * s - sunPos.y) ** 2);
                    const warmth = Math.max(0, 1 - sunDist / 100);
                    const cr = 1, cg2 = 0.97 - warmth * 0.1, cb = 0.95 - warmth * 0.2;
                    const m = new THREE.Mesh(new THREE.SphereGeometry(p.r, 8, 8), new THREE.MeshLambertMaterial({ color: new THREE.Color(cr, cg2, cb), transparent: true, opacity: 0.8 }));
                    m.position.set(p.dx, p.dy, p.dz);
                    m.scale.y = 0.6;
                    cg.add(m);
                });
                cg.position.set(x, y, z);
                cg.scale.setScalar(s);
                scene.add(cg);
                return cg;
            }
            const clouds = [
                makeCloud(-30, 48, -35, 1.3),
                makeCloud(22, 53, -45, 1.0),
                makeCloud(-8, 58, -55, 1.1),
                makeCloud(40, 44, -28, 0.8),
                makeCloud(-45, 50, -50, 0.7),
                makeCloud(10, 46, -40, 0.6)
            ];

            // 地下剖面（渐变土层 + 石子纹理 + 水分标记）
            const soilDefs = [
                { y: -0.5, color: 0xc9a96e, name: '表层沙土', moist: '5%', org: '0.1%' },
                { y: -2.5, color: 0xb08850, name: '风沙土', moist: '8%', org: '0.2%' },
                { y: -4.5, color: 0x967540, name: '棕钙土', moist: '12%', org: '0.4%' },
                { y: -6.5, color: 0x7a5e35, name: '暗棕钙土', moist: '18%', org: '0.8%' },
                { y: -9.5, color: 0x5a4020, name: '地下水层', moist: '35%', org: '1.2%' }
            ];
            soilDefs.forEach((l, i) => {
                // 土层本体
                const layer = new THREE.Mesh(
                    new THREE.PlaneGeometry(200, 200),
                    new THREE.MeshLambertMaterial({ color: l.color, transparent: true, opacity: 0.65 })
                );
                layer.rotation.x = -Math.PI / 2;
                layer.position.y = l.y;
                scene.add(layer);
                // 层间分界线
                if (i > 0) {
                    const lineGeo = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(-50, l.y + 0.05, 0), new THREE.Vector3(50, l.y + 0.05, 0)
                    ]);
                    scene.add(new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })));
                }
            });
            // 散布小石子
            const stoneColors = [0x8B7355, 0x6B5B45, 0x9E8E78, 0x7A6A52, 0xA09070];
            for (let i = 0; i < 30; i++) {
                const sx = (Math.random() - 0.5) * 60;
                const sz = (Math.random() - 0.5) * 60;
                const sy = -(Math.random() * 9 + 1);
                const sc = stoneColors[Math.floor(Math.random() * stoneColors.length)];
                const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15 + Math.random() * 0.2, 0), new THREE.MeshLambertMaterial({ color: sc }));
                stone.position.set(sx, sy, sz);
                stone.rotation.set(Math.random(), Math.random(), Math.random());
                scene.add(stone);
            }
            // 地下细根丝（可见根系）
            const rootThreadMat = new THREE.MeshLambertMaterial({ color: 0x8B6914, transparent: true, opacity: 0.35 });
            for (let i = 0; i < 25; i++) {
                const rx = (Math.random() - 0.5) * 20;
                const rz = (Math.random() - 0.5) * 20;
                const rh = 1 + Math.random() * 4;
                const rootThread = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, rh, 4), rootThreadMat);
                rootThread.position.set(rx, -rh / 2 - 0.5, rz);
                rootThread.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
                scene.add(rootThread);
            }

            function disposeThreeObject(obj) {
                if (!obj) return;
                if (obj.geometry) { obj.geometry.dispose(); obj.geometry = undefined; }
                if (obj.material) {
                    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                    else obj.material.dispose();
                    obj.material = undefined;
                }
                if (obj.children && obj.children.length) {
                    while (obj.children.length) { disposeThreeObject(obj.children[0]); obj.remove(obj.children[0]); }
                }
            }

            // 沙尘粒子
            const particleCount = 60;
            const particleGeo = new THREE.BufferGeometry();
            const particlePos = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                particlePos[i * 3] = (Math.random() - 0.5) * 80;
                particlePos[i * 3 + 1] = Math.random() * 30;
                particlePos[i * 3 + 2] = (Math.random() - 0.5) * 80;
            }
            particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
            const particleMat = new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.5, transparent: true, opacity: 0.25 });
            const particles = new THREE.Points(particleGeo, particleMat);
            scene.add(particles);

            // 深度标尺线
            const depthMarkers = [
                { y: -5, label: '5m' }, { y: -10, label: '10m' }, { y: -15, label: '15m' }, { y: -20, label: '20m' }
            ];
            depthMarkers.forEach(dm => {
                const lineGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(-35, dm.y, 0), new THREE.Vector3(35, dm.y, 0)
                ]);
                const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06 }));
                scene.add(line);
            });

            // 地下水位线
            const waterLine = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ color: 0x3498db, transparent: true, opacity: 0.15 }));
            waterLine.rotation.x = -Math.PI / 2;
            waterLine.position.y = -10;
            scene.add(waterLine);

            // ===== 鼠标拖拽旋转 + 滚轮缩放 =====
            let isDragging = false;
            let prevMouse = { x: 0, y: 0 };
            let cameraAngleX = 0;
            let cameraAngleY = 0;
            let targetAngleX = 0;
            let targetAngleY = 0;
            const baseCameraPos = { x: 0, z: 80 };
            let cameraZoom = 1.0;
            let targetZoom = 1.0;
            const zoomMin = 0.35, zoomMax = 2.5;

            canvas.addEventListener('mousedown', e => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY }; });
            canvas.addEventListener('mousemove', e => {
                if (!isDragging) return;
                const dx = e.clientX - prevMouse.x;
                const dy = e.clientY - prevMouse.y;
                targetAngleX += dx * 0.005;
                targetAngleY = Math.max(-0.3, Math.min(0.5, targetAngleY + dy * 0.003));
                prevMouse = { x: e.clientX, y: e.clientY };
            });
            canvas.addEventListener('mouseup', () => { isDragging = false; });
            canvas.addEventListener('mouseleave', () => { isDragging = false; });
            // 滚轮缩放
            canvas.addEventListener('wheel', e => {
                e.preventDefault();
                targetZoom = Math.max(zoomMin, Math.min(zoomMax, targetZoom - e.deltaY * 0.001));
                updateZoomDisplay();
            }, { passive: false });
            // 触摸支持（单指旋转 + 双指缩放）
            let touchStartDist = 0;
            let touchStartZoom = 1;
            canvas.addEventListener('touchstart', e => {
                if (e.touches.length === 2) {
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    touchStartDist = Math.sqrt(dx * dx + dy * dy);
                    touchStartZoom = targetZoom;
                } else if (e.touches.length === 1) {
                    isDragging = true;
                    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
            }, { passive: true });
            canvas.addEventListener('touchmove', e => {
                if (e.touches.length === 2) {
                    const dx = e.touches[0].clientX - e.touches[1].clientX;
                    const dy = e.touches[0].clientY - e.touches[1].clientY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    targetZoom = Math.max(zoomMin, Math.min(zoomMax, touchStartZoom * (dist / touchStartDist)));
                } else if (e.touches.length === 1 && isDragging) {
                    const dx = e.touches[0].clientX - prevMouse.x;
                    const dy = e.touches[0].clientY - prevMouse.y;
                    targetAngleX += dx * 0.005;
                    targetAngleY = Math.max(-0.3, Math.min(0.5, targetAngleY + dy * 0.003));
                    prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
            }, { passive: true });
            canvas.addEventListener('touchend', e => { if (e.touches.length < 2) isDragging = false; });
            // 双击重置视角
            canvas.addEventListener('dblclick', () => {
                targetAngleX = 0; targetAngleY = 0;
                targetZoom = 1.0;
                updateZoomDisplay();
            });

            let currentPlant = null;
            let targetCameraY = 30;
            let targetLookY = 10;
            let currentLookY = 10;
            // 根系生长动画状态
            let rootGrowProgress = 0;
            let rootGrowTarget = 1;
            let rootGrowSpeed = 0.025;

            window.renderPlantDemo = function(type) {
                if (currentPlant) { scene.remove(currentPlant); disposeThreeObject(currentPlant); }
                currentPlant = createPlantMesh(type);
                // 初始缩放为0（根系从无到有生长）
                currentPlant.scale.set(1, 0.01, 1);
                scene.add(currentPlant);
                // 重置根系生长动画
                rootGrowProgress = 0;
                rootGrowTarget = 1;
                rootGrowSpeed = 0.025;
                // 相机跟随
                const depthMap = { suosuo: 15, huyang: 20, shaji: 6, ningtiao: 8, jinsha: 3 };
                const d = depthMap[type] || 10;
                targetCameraY = 10 + d * 0.6;
                targetLookY = d * 0.2;
            };

            let plantDemoVisible = true;
            let lastTime = 0;
            const targetFPS = 30;
            const frameInterval = 1000 / targetFPS;

            function animate(currentTime) {
                requestAnimationFrame(animate);
                if (!plantDemoVisible) return;
                if (currentTime - lastTime < frameInterval) return;
                lastTime = currentTime;

                // 平滑相机过渡
                camera.position.y += (targetCameraY - camera.position.y) * 0.04;
                currentLookY += (targetLookY - currentLookY) * 0.04;

                // 鼠标拖拽旋转平滑过渡
                cameraAngleX += (targetAngleX - cameraAngleX) * 0.08;
                cameraAngleY += (targetAngleY - cameraAngleY) * 0.08;
                cameraZoom += (targetZoom - cameraZoom) * 0.08;
                const zoomEl = document.getElementById('zoomLevel');
                if (zoomEl) zoomEl.textContent = Math.round(cameraZoom * 100) + '%';
                const camDist = baseCameraPos.z * cameraZoom;
                camera.position.x = Math.sin(cameraAngleX) * camDist;
                camera.position.z = Math.cos(cameraAngleX) * camDist;
                camera.position.y += cameraAngleY * 20;
                camera.lookAt(0, currentLookY, 0);

                // 根系生长动画（easeOutQuart）
                if (currentPlant && rootGrowProgress < rootGrowTarget) {
                    rootGrowProgress = Math.min(rootGrowProgress + rootGrowSpeed, rootGrowTarget);
                    const eased = 1 - Math.pow(1 - rootGrowProgress, 4);
                    currentPlant.scale.y = Math.max(0.01, eased);
                }

                // 植物微风摇摆
                if (currentPlant) {
                    const t = Date.now() * 0.001;
                    currentPlant.rotation.z = Math.sin(t * 1.2) * 0.02 + Math.sin(t * 0.7) * 0.01;
                    currentPlant.rotation.x = Math.cos(t * 0.9) * 0.01;
                }

                // 白云漂移
                const ct = Date.now() * 0.0003;
                clouds.forEach((c, i) => {
                    c.position.x += 0.008 + i * 0.003;
                    c.position.y += Math.sin(ct + i * 1.5) * 0.01;
                    if (c.position.x > 55) c.position.x = -55;
                });

                // 太阳光芒旋转 + 脉冲
                rayGroup.rotation.z += 0.001;
                const sunPulse = 0.2 + Math.sin(Date.now() * 0.001) * 0.08;
                sunGlow.material.opacity = sunPulse;
                sunOuter.material.opacity = sunPulse * 0.3;

                // 沙尘粒子漂移
                const pos = particleGeo.attributes.position.array;
                for (let i = 0; i < particleCount; i++) {
                    pos[i * 3] += 0.03 + Math.random() * 0.02;
                    pos[i * 3 + 1] += Math.sin(currentTime * 0.001 + i) * 0.01;
                    if (pos[i * 3] > 40) { pos[i * 3] = -40; pos[i * 3 + 1] = Math.random() * 30; }
                }
                particleGeo.attributes.position.needsUpdate = true;

                renderer.render(scene, camera);
            }
            animate(0);
            new IntersectionObserver(function(entries) {
                plantDemoVisible = entries[0].isIntersecting;
            }, { threshold: 0 }).observe(document.getElementById('page-4'));

            window._plantScene = scene;
            renderPlantDemo('suosuo');
        }

        function createPlantMesh(type) {
            const g = new THREE.Group();
            const depths = { suosuo: 15, huyang: 20, shaji: 5, ningtiao: 8, jinsha: 3 };
            const depth = depths[type] || 10;
            const colors = { suosuo: 0x228B22, huyang: 0x006400, shaji: 0x6B8E23, ningtiao: 0x32CD32, jinsha: 0x8FBC8F };
            const c = colors[type] || 0x228B22;

            // 根系（每种植物独特根型）
            const rootColor = 0x8B6914;
            const rootMat = new THREE.MeshLambertMaterial({ color: rootColor });
            if (type === 'suosuo') {
                // 梭梭：深主根 + 发达侧根
                const mainRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.35, depth, 8), new THREE.MeshLambertMaterial({ color: 0x6d5a45 }));
                mainRoot.position.y = -depth / 2; g.add(mainRoot);
                for (let i = 0; i < 8; i++) {
                    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, depth * 0.4, 5), rootMat);
                    r.position.set((Math.random() - 0.5) * 6, -depth * 0.3, (Math.random() - 0.5) * 6);
                    r.rotation.set(Math.random() * 0.4 - 0.2, Math.random() * Math.PI, Math.random() * 0.8 - 0.4);
                    g.add(r);
                }
            } else if (type === 'huyang') {
                // 胡杨：极深主根 + 水平根
                const mainRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.5, depth, 10), new THREE.MeshLambertMaterial({ color: 0x5a3a1a }));
                mainRoot.position.y = -depth / 2; g.add(mainRoot);
                for (let i = 0; i < 6; i++) {
                    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.15, depth * 0.3, 6), rootMat);
                    r.position.set((Math.random() - 0.5) * 5, -depth * 0.25, (Math.random() - 0.5) * 5);
                    r.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.6 - 0.3);
                    g.add(r);
                }
            } else if (type === 'shaji') {
                // 沙棘：横向扩展根（水平为主）
                const mainRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, depth * 0.6, 6), rootMat);
                mainRoot.position.y = -depth * 0.3; g.add(mainRoot);
                for (let i = 0; i < 10; i++) {
                    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, depth * 0.5, 4), new THREE.MeshLambertMaterial({ color: 0x9B7B3C }));
                    r.position.set((Math.random() - 0.5) * 10, -(Math.random() * depth * 0.6), (Math.random() - 0.5) * 10);
                    r.rotation.set(Math.random() * 0.8 - 0.4, Math.random() * Math.PI, Math.random() * 1.0 - 0.5);
                    g.add(r);
                }
            } else if (type === 'ningtiao') {
                // 柠条：盘结根系
                const mainRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, depth, 7), rootMat);
                mainRoot.position.y = -depth / 2; g.add(mainRoot);
                for (let i = 0; i < 9; i++) {
                    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.09, depth * 0.35, 5), new THREE.MeshLambertMaterial({ color: 0x7A6A30 }));
                    r.position.set((Math.random() - 0.5) * 7, -depth * 0.2 - Math.random() * depth * 0.3, (Math.random() - 0.5) * 7);
                    r.rotation.set(Math.random() * 0.6 - 0.3, Math.random() * Math.PI, Math.random() * 0.8 - 0.4);
                    g.add(r);
                }
            } else {
                // 花棒：水平扩展根（12m）
                const mainRoot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.18, depth, 5), rootMat);
                mainRoot.position.y = -depth / 2; g.add(mainRoot);
                for (let i = 0; i < 7; i++) {
                    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, depth * 0.6, 4), new THREE.MeshLambertMaterial({ color: 0x8B7D5A }));
                    r.position.set((Math.random() - 0.5) * 12, -(Math.random() * depth * 0.5 + 0.5), (Math.random() - 0.5) * 8);
                    r.rotation.set(Math.random() * 0.7 - 0.35, Math.random() * Math.PI, Math.random() * 1.0 - 0.5);
                    g.add(r);
                }
            }

            // 深度刻度标尺（带刻度线）
            for (let d = 2; d <= depth; d += Math.max(2, Math.floor(depth / 5))) {
                const dot = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), new THREE.MeshLambertMaterial({ color: 0xFFD54F, transparent: true, opacity: 0.7 }));
                dot.position.set(1.5, -d, 0);
                g.add(dot);
                // 刻度横线
                const tickGeo = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(0.8, -d, 0), new THREE.Vector3(1.2, -d, 0)
                ]);
                g.add(new THREE.Line(tickGeo, new THREE.LineBasicMaterial({ color: 0xFFD54F, transparent: true, opacity: 0.4 })));
            }

            // 地下水位标注（蓝色波纹）
            const waterLabel = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshLambertMaterial({ color: 0x2196F3, transparent: true, opacity: 0.7 }));
            waterLabel.position.set(5, -10, 0);
            g.add(waterLabel);
            const waterGlow = new THREE.Mesh(new THREE.SphereGeometry(0.6, 8, 8), new THREE.MeshLambertMaterial({ color: 0x64B5F6, transparent: true, opacity: 0.2 }));
            waterGlow.position.set(5, -10, 0);
            g.add(waterGlow);

            // 地面
            const groundLine = new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 20), new THREE.MeshLambertMaterial({ color: 0xd4a574 }));
            groundLine.position.y = 0;
            g.add(groundLine);

            // 地上部分（每种植物独特造型）
            if (type === 'suosuo') {
                // 梭梭：多主干灌木状，绿色同化枝
                for (let i = 0; i < 3; i++) {
                    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.35, 7 + Math.random() * 2, 7), new THREE.MeshLambertMaterial({ color: 0x8B5A2B }));
                    t.position.set((Math.random() - 0.5) * 2.5, 3.5 + Math.random(), (Math.random() - 0.5) * 2.5);
                    t.rotation.set((Math.random() - 0.5) * 0.15, 0, (Math.random() - 0.5) * 0.15);
                    t.castShadow = true; g.add(t);
                }
                for (let i = 0; i < 18; i++) {
                    const l = new THREE.Mesh(new THREE.SphereGeometry(1.0 + Math.random() * 0.6, 7, 7), new THREE.MeshLambertMaterial({ color: i % 3 === 0 ? 0x2E8B57 : c }));
                    l.position.set((Math.random() - 0.5) * 5, 5 + Math.random() * 4, (Math.random() - 0.5) * 5);
                    l.castShadow = true; g.add(l);
                }
            } else if (type === 'huyang') {
                // 胡杨：粗壮主干 + 秋色叶冠
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.2, 16, 10), new THREE.MeshLambertMaterial({ color: 0x5C4033 }));
                trunk.position.y = 8; trunk.castShadow = true; g.add(trunk);
                // 树干分叉
                for (let i = 0; i < 2; i++) {
                    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.5, 6, 6), new THREE.MeshLambertMaterial({ color: 0x6B4226 }));
                    branch.position.set((i === 0 ? -2 : 2.5), 13, (Math.random() - 0.5) * 2);
                    branch.rotation.z = (i === 0 ? 0.4 : -0.35);
                    branch.castShadow = true; g.add(branch);
                }
                // 树冠（绿+黄混合，模拟秋色）
                const crownColors = [0x228B22, 0x2E8B57, 0xDAA520, 0xB8860B];
                for (let i = 0; i < 10; i++) {
                    const cc = crownColors[Math.floor(Math.random() * crownColors.length)];
                    const l = new THREE.Mesh(new THREE.SphereGeometry(2.5 + Math.random() * 1.5, 8, 8), new THREE.MeshLambertMaterial({ color: cc }));
                    l.position.set((Math.random() - 0.5) * 8, 16 + Math.random() * 5, (Math.random() - 0.5) * 6);
                    l.castShadow = true; g.add(l);
                }
            } else if (type === 'shaji') {
                // 沙棘：多干灌木 + 橙色果实
                for (let i = 0; i < 6; i++) {
                    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 3.5 + Math.random() * 1.5, 5), new THREE.MeshLambertMaterial({ color: 0x6B4226 }));
                    t.position.set((Math.random() - 0.5) * 3.5, 1.8 + Math.random() * 0.5, (Math.random() - 0.5) * 3.5);
                    t.castShadow = true; g.add(t);
                }
                for (let i = 0; i < 14; i++) {
                    const l = new THREE.Mesh(new THREE.SphereGeometry(0.9 + Math.random() * 0.4, 7, 7), new THREE.MeshLambertMaterial({ color: i % 4 === 0 ? 0x6B8E23 : c }));
                    l.position.set((Math.random() - 0.5) * 5, 3 + Math.random() * 3, (Math.random() - 0.5) * 5);
                    l.castShadow = true; g.add(l);
                }
                for (let i = 0; i < 20; i++) {
                    const f = new THREE.Mesh(new THREE.SphereGeometry(0.18 + Math.random() * 0.08, 5, 5), new THREE.MeshLambertMaterial({ color: i % 3 === 0 ? 0xFF6F00 : 0xFFA000 }));
                    f.position.set((Math.random() - 0.5) * 4, 2 + Math.random() * 3.5, (Math.random() - 0.5) * 4);
                    g.add(f);
                }
            } else if (type === 'ningtiao') {
                // 柠条：密集丛生枝 + 黄色小花
                for (let i = 0; i < 9; i++) {
                    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.25, 4 + Math.random() * 1.5, 6), new THREE.MeshLambertMaterial({ color: 0x8B7355 }));
                    t.position.set((Math.random() - 0.5) * 4, 2 + Math.random() * 0.5, (Math.random() - 0.5) * 4);
                    t.castShadow = true; g.add(t);
                }
                const crown = new THREE.Mesh(new THREE.SphereGeometry(3.2, 10, 10), new THREE.MeshLambertMaterial({ color: c }));
                crown.position.y = 5; crown.castShadow = true; g.add(crown);
                for (let i = 0; i < 12; i++) {
                    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 5, 5), new THREE.MeshLambertMaterial({ color: 0xFFD700 }));
                    fl.position.set((Math.random() - 0.5) * 4, 4 + Math.random() * 2.5, (Math.random() - 0.5) * 4);
                    g.add(fl);
                }
            } else {
                // 花棒：细干 + 紫粉色花
                for (let i = 0; i < 5; i++) {
                    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.18, 3.5 + Math.random(), 5), new THREE.MeshLambertMaterial({ color: 0x8B7D6B }));
                    t.position.set((Math.random() - 0.5) * 3, 1.8 + Math.random() * 0.3, (Math.random() - 0.5) * 3);
                    t.castShadow = true; g.add(t);
                }
                for (let i = 0; i < 12; i++) {
                    const l = new THREE.Mesh(new THREE.SphereGeometry(0.8 + Math.random() * 0.4, 6, 6), new THREE.MeshLambertMaterial({ color: c }));
                    l.position.set((Math.random() - 0.5) * 4, 2.5 + Math.random() * 2.5, (Math.random() - 0.5) * 4);
                    l.castShadow = true; g.add(l);
                }
                for (let i = 0; i < 18; i++) {
                    const fc = i % 3 === 0 ? 0xBA68C8 : (i % 3 === 1 ? 0xCE93D8 : 0xE1BEE7);
                    const fl = new THREE.Mesh(new THREE.SphereGeometry(0.1 + Math.random() * 0.06, 5, 5), new THREE.MeshLambertMaterial({ color: fc }));
                    fl.position.set((Math.random() - 0.5) * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 4);
                    g.add(fl);
                }
            }
            return g;
        }
        
        // ===== 3D种植场景 =====
        function initPlanting3D() {
            const container = document.getElementById('plantingCanvas');
            if (!container) return;
            const pw = container.parentElement.clientWidth || 1100;
            const ph = container.parentElement.clientHeight || 450;
            plantingScene = new THREE.Scene();
            plantingScene.background = new THREE.Color(0x030303);
            plantingScene.fog = new THREE.FogExp2(0x030303, 0.001);
            plantingCamera = new THREE.PerspectiveCamera(60, pw / ph, 0.1, 1000);
            plantingCamera.position.set(0, 65, 130);
            plantingCamera.lookAt(0, 0, 0);
            plantingRenderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
            plantingRenderer.setSize(pw, ph);
            plantingRenderer.shadowMap.enabled = true;
            plantingScene.add(new THREE.AmbientLight(0xffffff, 0.4));
            const dir = new THREE.DirectionalLight(0xffffff, 1.3);
            dir.position.set(50, 100, 50);
            dir.castShadow = true;
            plantingScene.add(dir);
            plantingScene.add(new THREE.HemisphereLight(0x87ceeb, 0xdeb887, 0.5));
            const ground = new THREE.Mesh(new THREE.PlaneGeometry(450, 450, 100, 100), new THREE.MeshLambertMaterial({ color: 0xd4a574 }));
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            plantingScene.add(ground);
            const verts = ground.geometry.attributes.position.array;
            for (let i = 2; i < verts.length; i += 3) verts[i] += (Math.random() - 0.5) * 5;
            ground.geometry.attributes.position.needsUpdate = true;
            ground.geometry.computeVertexNormals();
            for (let i = 0; i < 60; i++) {
                const dune = new THREE.Mesh(new THREE.ConeGeometry(Math.random() * 12 + 4, Math.random() * 8 + 3, 10), new THREE.MeshLambertMaterial({ color: Math.random() > 0.5 ? 0xdeb887 : 0xc9a66b }));
                dune.position.set((Math.random() - 0.5) * 350, Math.random() * 2, (Math.random() - 0.5) * 350);
                dune.rotation.y = Math.random() * Math.PI;
                dune.castShadow = true;
                dune.receiveShadow = true;
                plantingScene.add(dune);
            }
            for (let i = 0; i < 30; i++) {
                const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(Math.random() * 2.5 + 0.8, 0), new THREE.MeshLambertMaterial({ color: 0x8B7355 }));
                rock.position.set((Math.random() - 0.5) * 300, Math.random() * 1.5, (Math.random() - 0.5) * 300);
                rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                rock.castShadow = true;
                plantingScene.add(rock);
            }
            container.addEventListener('click', onPlantingClick);
            animatePlanting();
            new IntersectionObserver(function(entries) {
                plantingVisible = entries[0].isIntersecting;
            }, { threshold: 0 }).observe(document.getElementById('page-8'));
        }
        function onPlantingClick(e) {
            if (!selType) { showNoti('⚠️ 请先选择树种！'); return; }
            const rect = e.target.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            const ray = new THREE.Raycaster();
            ray.setFromCamera({ x, y }, plantingCamera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
            const pt = new THREE.Vector3();
            ray.ray.intersectPlane(plane, pt);
            if (pt) window.doPlant(pt.x, pt.z, selType);
        }
        function createPlantMesh3D(type) {
            const g = new THREE.Group();
            const colors = { suosuo: 0x228B22, huyang: 0x006400, ningtiao: 0x32CD32, shaji: 0x6B8E23, jinsha: 0x8FBC8F };
            const c = colors[type] || 0x228B22;
            if (type === 'suosuo') {
                const t = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 5, 9), new THREE.MeshLambertMaterial({ color: 0x8B4513 }));
                t.position.y = 2.5; t.castShadow = true; g.add(t);
                for (let i = 0; i < 10; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(1.6, 8, 8), new THREE.MeshLambertMaterial({ color: c })); l.position.set((Math.random()-0.5)*4, 3.5+Math.random()*3, (Math.random()-0.5)*4); l.castShadow = true; g.add(l); }
            } else if (type === 'huyang') {
                const t = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.6, 16, 12), new THREE.MeshLambertMaterial({ color: 0x654321 }));
                t.position.y = 8; t.castShadow = true; g.add(t);
                const crown = new THREE.Mesh(new THREE.SphereGeometry(7, 16, 16), new THREE.MeshLambertMaterial({ color: c }));
                crown.position.y = 17; crown.scale.y = 0.65; crown.castShadow = true; g.add(crown);
            } else if (type === 'ningtiao') {
                for (let i = 0; i < 6; i++) { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 4, 7), new THREE.MeshLambertMaterial({ color: 0x8B7355 })); t.position.set((Math.random()-0.5)*4, 2, (Math.random()-0.5)*4); t.castShadow = true; g.add(t); }
                const crown = new THREE.Mesh(new THREE.SphereGeometry(3.2, 12, 12), new THREE.MeshLambertMaterial({ color: c })); crown.position.y = 4.5; crown.castShadow = true; g.add(crown);
            } else if (type === 'shaji') {
                for (let i = 0; i < 5; i++) { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 3.5, 6), new THREE.MeshLambertMaterial({ color: 0x696969 })); t.position.set((Math.random()-0.5)*3.5, 1.75, (Math.random()-0.5)*3.5); t.castShadow = true; g.add(t); }
                for (let i = 0; i < 18; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.9, 7, 7), new THREE.MeshLambertMaterial({ color: c })); l.position.set((Math.random()-0.5)*3.5, 2.5+Math.random()*3, (Math.random()-0.5)*3.5); l.castShadow = true; g.add(l); }
                for (let i = 0; i < 15; i++) { const f = new THREE.Mesh(new THREE.SphereGeometry(0.38, 6, 6), new THREE.MeshLambertMaterial({ color: 0xFF8C00 })); f.position.set((Math.random()-0.5)*2.5, 2+Math.random()*3.5, (Math.random()-0.5)*2.5); g.add(f); }
            } else {
                for (let i = 0; i < 5; i++) { const t = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 3.5, 6), new THREE.MeshLambertMaterial({ color: 0x9B8B7A })); t.position.set((Math.random()-0.5)*3, 1.75, (Math.random()-0.5)*3); t.castShadow = true; g.add(t); }
                for (let i = 0; i < 15; i++) { const l = new THREE.Mesh(new THREE.SphereGeometry(1.1, 7, 7), new THREE.MeshLambertMaterial({ color: c })); l.position.set((Math.random()-0.5)*3.5, 3+Math.random()*2.5, (Math.random()-0.5)*3.5); l.castShadow = true; g.add(l); }
            }
            return g;
        }
        function doPlant(x, z, type) {
            const tree = createPlantMesh3D(type);
            tree.position.set(x, 0, z);
            tree.userData = { type, health: 85, growth: 0 };
            plantingScene.add(tree);
            plantingTrees.push(tree);
            document.getElementById('pTreeCount').textContent = plantingTrees.length + ' 棵';
            updatePInfo(tree.userData);
            growTree(tree);
            const names = { suosuo: '梭梭', huyang: '胡杨', ningtiao: '柠条', shaji: '沙棘', jinsha: '花棒' };
            const sands = { suosuo: '10m²', huyang: '15m²', ningtiao: '8m²', shaji: '6m²', jinsha: '5m²' };
            showNoti('🌱 成功种植' + names[type] + '！可固沙' + sands[type]);
        }
        function growTree(tree) {
            const g = () => {
                if (tree.userData.growth < 100) {
                    tree.userData.growth += 0.8;
                    tree.scale.y = 0.4 + tree.userData.growth / 150;
                    tree.userData.stage = tree.userData.growth < 30 ? '🌱 幼苗' : tree.userData.growth < 70 ? '🌿 成长期' : '🌳 成熟期';
                    updatePInfo(tree.userData);
                    setTimeout(g, 80);
                } else { showNoti('🎉 树木成熟！'); }
            };
            g();
        }
        function updatePInfo(data) {
            const names = { suosuo: '梭梭', huyang: '胡杨', ningtiao: '柠条', shaji: '沙棘', jinsha: '花棒' };
            const sands = { suosuo: '10m²', huyang: '15m²', ningtiao: '8m²', shaji: '6m²', jinsha: '5m²' };
            document.getElementById('pTreeType').textContent = names[data.type] || '未选择';
            document.getElementById('pTreeHealth').textContent = data.health ? Math.round(data.health) + '%' : '-';
            document.getElementById('pTreeStage').textContent = data.stage || '-';
            document.getElementById('pTreeSand').textContent = data.type ? sands[data.type] : '-';
        }
        function selTree(type, evt) {
            selType = type;
            document.querySelectorAll('.plant-btn').forEach(b => b.classList.remove('active'));
            var target = (evt && evt.target) ? evt.target : null;
            if (target) target.classList.add('active');
            const names = { suosuo: '梭梭', huyang: '胡杨', ningtiao: '柠条', shaji: '沙棘', jinsha: '花棒' };
            showNoti('🌳 已选' + names[type] + '，点击场景种植');
        }
        function water() {
            if (!plantingTrees.length) { showNoti('⚠️ 请先种植树木！'); return; }
            plantingTrees.forEach(t => t.userData.health = Math.min(100, t.userData.health + 12));
            updatePInfo(plantingTrees[plantingTrees.length - 1].userData);
            showNoti('💧 浇水成功！');
        }
        function fertilize() {
            if (!plantingTrees.length) { showNoti('⚠️ 请先种植树木！'); return; }
            plantingTrees.forEach(t => t.userData.growth = Math.min(100, t.userData.growth + 6));
            updatePInfo(plantingTrees[plantingTrees.length - 1].userData);
            showNoti('🌿 施肥成功！');
        }
        function resetPlant() {
            plantingTrees.forEach(t => plantingScene.remove(t));
            plantingTrees = [];
            document.getElementById('pTreeCount').textContent = '0 棵';
            updatePInfo({});
            showNoti('🔄 场景已重置');
        }
        let plantingVisible = true;
        let plantingLastTime7 = 0;
        const plantingTargetFPS7 = 30;
        const plantingInterval7 = 1000 / plantingTargetFPS7;
        
        function animatePlanting(currentTime) {
            requestAnimationFrame(animatePlanting);
            if (!plantingVisible) return;
            
            // 帧率控制
            if (currentTime - plantingLastTime7 < plantingInterval7) return;
            plantingLastTime7 = currentTime;
            
            var _t = Date.now() * 0.001;
            plantingTrees.forEach(function(t) {
                t.rotation.z = Math.sin(_t + t.position.x) * 0.02;
                t.rotation.x = Math.cos(_t * 1.2 + t.position.z) * 0.015;
            });
            plantingRenderer.render(plantingScene, plantingCamera);
        }
        let notiCount = 0;
        function showNoti(msg) {
            const n = document.createElement('div');
            n.className = 'noti';
            n.textContent = msg;
            const offset = (notiCount % 3) * 60;
            n.style.top = (90 + offset) + 'px';
            document.body.appendChild(n);
            notiCount++;
            setTimeout(() => { n.style.opacity = '0'; n.style.transform = 'translateX(100px)'; setTimeout(() => n.remove(), 400); }, 3000);
        }
        const backTopBtn = document.getElementById('backTop');
        let backTopVisible = false;
        backTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            backTopBtn.classList.add('show');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        let scrollTick = false;
        window.addEventListener('scroll', () => {
            if (scrollTick) return;
            scrollTick = true;
            requestAnimationFrame(() => {
                if (window.scrollY > 300) { backTopBtn.classList.add('show'); } else { backTopBtn.classList.remove('show'); }
                scrollTick = false;
            });
        }, { passive: true });
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (plantingRenderer) {
                    const c = document.getElementById('plantingCanvas');
                    if (c) {
                        const pw = c.parentElement.clientWidth || 1100;
                        const ph = c.parentElement.clientHeight || 450;
                        plantingCamera.aspect = pw / ph;
                        plantingCamera.updateProjectionMatrix();
                        plantingRenderer.setSize(pw, ph);
                    }
                }
                const hc = document.getElementById('heroCanvas');
                if (hc) { hc.width = window.innerWidth; hc.height = window.innerHeight; }
            }, 200);
        })

// ===== V3 新增功能 =====

// 1. 鼠标跟随视差效果
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const pageTitles = document.querySelectorAll('.page:not(.p-hero) .page-title, .page:not(.p-hero) .content-wrap');
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            if (heroContent) {
                heroContent.style.transform = 'translate(' + (x * 15) + 'px, ' + (y * 10) + 'px)';
            }
            
            if (window.heroParticles) {
                window.heroParticles.forEach(p => {
                    const dx = e.clientX - p.x;
                    const dy = e.clientY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        p.vx += dx * 0.0002;
                        p.vy += dy * 0.0002;
                    }
                });
            }
            
            pageTitles.forEach(bg => {
                bg.style.transform = 'translate(' + (x * 3) + 'px, ' + (y * 2) + 'px)';
            });
            ticking = false;
        });
    });
}

// 2. 卡片3D倾斜hover
function init3DCards() {
    const cards = document.querySelectorAll('.stat-card, .soil-card, .disaster-card, .crisis-card, .plant-item, .achievement-card, .compare-region-card');
    
    cards.forEach(card => {
        card.classList.add('card-3d-tilt');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
            
            // 光泽效果
            const shine = card.querySelector('.card-shine') || document.createElement('div');
            shine.className = 'card-shine';
            if (!card.querySelector('.card-shine')) card.appendChild(shine);
            shine.style.opacity = 0.15 + Math.abs(rotateX + rotateY) * 0.01;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const shine = card.querySelector('.card-shine');
            if (shine) shine.style.opacity = 0;
        });
    });
}

// 3. 涟漪点击效果
function initRipple() {
    const rippleElements = document.querySelectorAll('.cta-btn, .plant-btn, .chart-type-btn, .stat-card, .achievement-card');
    
    rippleElements.forEach(el => {
        el.classList.add('ripple-container');
        el.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 4. 图表类型切换
function initChartSwitch() {
    // 已移除图表类型切换按钮
}

window.chartInstances = {};

function switchChartType(chartId, type) {
    var chart = window.chartInstances[chartId];
    if (!chart) return;
    var opt = chart.getOption();
    if(!opt || !opt.series) return;

    var el = document.getElementById(chartId);
    if(!el) return;

    // 读取当前数据，重建series
    var newSeries = [];
    opt.series.forEach(function(s) {
        var ns = {name: s.name || ''};
        if(s.yAxisIndex !== undefined) ns.yAxisIndex = s.yAxisIndex;
        if(s.data) ns.data = s.data;
        if(type === 'bar') {
            ns.type = 'bar';
            if(s.barWidth) ns.barWidth = s.barWidth;
            ns.itemStyle = {borderRadius:[6,6,0,0]};
        } else if(type === 'line') {
            ns.type = 'line';
            ns.smooth = true;
            ns.symbol = 'circle';
            ns.symbolSize = 8;
            ns.lineStyle = {width:3};
        } else if(type === 'area') {
            ns.type = 'line';
            ns.smooth = true;
            ns.symbol = 'circle';
            ns.symbolSize = 8;
            ns.lineStyle = {width:3};
            ns.areaStyle = {opacity: 0.25};
        }
        newSeries.push(ns);
    });

    // dispose 旧实例，用新series重新init
    try { chart.dispose(); } catch(e) {}
    var newChart = echarts.init(el);
    var baseOpt = {
        tooltip: opt.tooltip ? opt.tooltip[0] || opt.tooltip : {trigger:'axis'},
        grid: opt.grid ? opt.grid[0] || opt.grid : {},
        legend: opt.legend ? opt.legend[0] || opt.legend : undefined,
        xAxis: opt.xAxis ? (opt.xAxis[0] || opt.xAxis) : undefined,
        yAxis: opt.yAxis ? (Array.isArray(opt.yAxis) ? opt.yAxis : [opt.yAxis]) : undefined,
        animationDuration: 800,
        animationEasing: 'cubicOut',
        series: newSeries
    };
    if(!baseOpt.xAxis) delete baseOpt.xAxis;
    if(!baseOpt.yAxis) delete baseOpt.yAxis;
    if(!baseOpt.legend) delete baseOpt.legend;
    newChart.setOption(baseOpt);

    window.chartInstances[chartId] = newChart;
    rendered[chartId] = newChart;

    // 重新绑定点击
    bindChartClick(chartId, newChart, el);
    showNoti('📊 已切换为' + ({bar:'柱状图',line:'折线图',area:'面积图'}[type]||type));
}

// 6. 锁边地图增强
function initSuobianEnhance() {
    const svg = document.getElementById('suobianSvg');
    if (!svg) return;
    
    // 创建tooltip
    let tooltip = document.getElementById('suobianTooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'suobianTooltip';
        tooltip.className = 'suobian-tooltip';
        document.body.appendChild(tooltip);
    }
    
    // 区域hover效果
    document.querySelectorAll('.suobian-zone').forEach(zone => {
        zone.addEventListener('mouseenter', function(e) {
            this.classList.add('suobian-zone-pulse');
            tooltip.innerHTML = '<strong>' + this.dataset.name + '</strong><br>锁边长度: ' + this.dataset.length + '<br>治理面积: ' + this.dataset.area;
            tooltip.classList.add('show');
        });
        
        zone.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        });
        
        zone.addEventListener('mouseleave', function() {
            this.classList.remove('suobian-zone-pulse');
            tooltip.classList.remove('show');
        });
    });
    
    // 流光锁边线
    document.querySelectorAll('.suobian-line').forEach(line => {
        line.classList.add('suobian-flow-line');
    });
}

// 7. section名称浮动指示器
function initSectionIndicator() {
    const indicator = document.getElementById('sectionIndicator');
    if (!indicator) return;
    
    const sections = document.querySelectorAll('.page');
    let lastSection = '';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const id = entry.target.id;
                const title = entry.target.querySelector('.page-title, h2, h1');
                if (title && id !== lastSection) {
                    lastSection = id;
                    indicator.textContent = title.textContent.trim();
                    indicator.classList.add('show');
                    clearTimeout(window.sectionIndicatorTimeout);
                    window.sectionIndicatorTimeout = setTimeout(() => {
                        indicator.classList.remove('show');
                    }, 2000);
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

// 8. 数字动画增强 (easeOutExpo + 闪光)
function animateNumEnhanced(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = Math.floor(start + (target - start) * eased);
        
        el.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
            el.classList.add('num-flash');
            setTimeout(() => el.classList.remove('num-flash'), 600);
        }
    }
    
    requestAnimationFrame(update);
}

function initNumAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.removeAttribute('data-animated');
                entry.target.textContent = '0';
                const target = parseInt(entry.target.dataset.target);
                if (target) animateNumEnhanced(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-card .num[data-target], .hero-stat .num[data-target]').forEach(el => {
        observer.observe(el);
    });
}

// ===== 初始化所有V3功能 =====

        // ===== 工具栏功能 =====
        let toolbarShowTimer;
        function showToolbar() {
            clearTimeout(toolbarShowTimer);
            const tb = document.getElementById('toolbarShare');
            if (tb) tb.classList.add('show');
            toolbarShowTimer = setTimeout(() => { const t = document.getElementById('toolbarShare'); if(t) t.classList.remove('show'); }, 8000);
        }
        // 滚动时显示工具栏
        let lastScrollY7 = 0;
        window.addEventListener('scroll', () => {
            if (Math.abs(window.scrollY - lastScrollY7) > 300) { showToolbar(); lastScrollY7 = window.scrollY; }
        }, { passive: true });
        // 初始显示
        setTimeout(showToolbar, 3000);
        
        function sharePage() {
            const url = location.href;
            const title = document.title;
            try {
                if (navigator.share) {
                    navigator.share({ title, url, text: '🌿 绿进沙退 — 中国西北荒漠化治理全景纪实' }).catch(function(){});
                } else if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(() => showNoti('📋 链接已复制！')).catch(function(e){ showNoti('❌ 复制失败'); });
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = url; ta.style.cssText = 'position:fixed;left:-9999px;opacity:0;';
                    document.body.appendChild(ta); ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showNoti('📋 链接已复制！');
                }
            } catch(e) { showNoti('📋 ' + url); }
        }
        
        function exportImage() {
            showNoti('🖼️ 正在生成页面截图...');
            try {
                if (typeof html2canvas === 'function') {
                    html2canvas(document.body, { backgroundColor: '#1a2538', scale: 2, useCORS: true, logging: false }).then(function(canvas) {
                        const link = document.createElement('a');
                        link.download = '西北荒漠化治理_全景纪实.png';
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                        showNoti('✅ 图片已导出！');
                    }).catch(function(err) {
                        showNoti('💡 截图生成失败，可使用浏览器截图工具');
                        console.warn('[exportImage]', err);
                    });
                } else {
                    showNoti('💡 提示：可使用浏览器截图工具或按 F12 进行截图');
                }
            } catch(e) { showNoti('💡 截图不可用'); }
        }
        
        function exportData() {
            const data = [
                ['指标', '数值'],
                ['荒漠化土地面积（1970年代）', '111.7万 km²'],
                ['荒漠化土地面积（2023年）', '93.6万 km²'],
                ['净减少面积', '18.1万 km²'],
                ['森林覆盖率（1949年）', '5.6%'],
                ['森林覆盖率（2023年）', '24.02%'],
                ['毛乌素沙漠治理率', '93.24%'],
                ['塞罕坝森林覆盖率', '82%'],
                ['三北工程区森林覆盖率（1978年）', '5.05%'],
                ['三北工程区森林覆盖率（2023年）', '13.57%']
            ];
            let csv = '﻿';
            data.forEach(row => { csv += row.join(',') + '\n'; });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            const link = document.createElement('a');
            link.download = '西北荒漠化治理_数据.csv';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            showNoti('📊 数据已导出为CSV！');
        }
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => showNoti('⚠️ 全屏模式不可用'));
            } else {
                document.exitFullscreen();
            }
        }

function initV3Features() {
    initParallax();
    init3DCards();
    initRipple();
    initChartSwitch();
    initSuobianEnhance();
    initSectionIndicator();
    initNumAnimation();
    initA11yFocus(); // V4: 无障碍焦点管理
    initContrastDetection(); // V4: 高对比度检测
}

// ===== V4: 独立初始化函数 =====
function initV4Features() {
    // initA11yFocus and initContrastDetection already called by initV3Features
}

/* === Script block 7 (from line ~7030) === */
(function(){
    var loadScreen = document.getElementById('loadingScreen');
    var loadBar = document.getElementById('loadBarInner');
    var loadText = document.getElementById('loadPercent');
    var steps = [
        { el: 'step1', label: '初始化渲染引擎', delay: 40 },
        { el: 'step2', label: '加载地理数据', delay: 80 },
        { el: 'step3', label: '渲染3D场景', delay: 120 },
        { el: 'step4', label: '生成数据图表', delay: 160 },
        { el: 'step5', label: '准备就绪', delay: 200 }
    ];
    var totalDuration = 400;
    var startTime = performance.now();

    function updateStep(idx) {
        steps.forEach(function(s, i) {
            var el = document.getElementById(s.el);
            if (!el) return;
            el.classList.remove('active', 'done');
            if (i < idx) el.classList.add('done');
            else if (i === idx) el.classList.add('active');
        });
    }

    function tick() {
        var elapsed = performance.now() - startTime;
        var pct = Math.min(100, Math.round(elapsed / totalDuration * 100));
        if (loadBar) loadBar.style.width = pct + '%';
        if (loadText) loadText.textContent = pct + '%';

        var stepIdx = Math.min(Math.floor(elapsed / (totalDuration / steps.length)), steps.length - 1);
        updateStep(stepIdx);

        if (elapsed < totalDuration) {
            requestAnimationFrame(tick);
        } else {
            updateStep(steps.length - 1);
            setTimeout(function() {
                if (loadScreen) {
                    loadScreen.classList.add('fade-out');
                    setTimeout(function() {
                        loadScreen.style.display = 'none';
                        loadScreen.setAttribute('aria-hidden', 'true');
                    }, 400);
                }
                forceReveal();
                forceNumbers();
                forceBars();
                if (typeof initSoilInteract === 'function') initSoilInteract();
                var live = document.getElementById('liveRegion');
                if (live) live.textContent = '页面已加载完成，共15个章节，滚动查看详细内容。';
            }, 80);
        }
    }
    tick();
    function forceReveal() {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item').forEach(function(el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }
    function forceNumbers() {
        document.querySelectorAll('[data-target]').forEach(function(el){
            if (el.dataset.animated) return;
            var t = parseInt(el.getAttribute('data-target'));
            if(t && !isNaN(t) && (el.textContent === '0' || el.textContent === '')) {
                el.dataset.animated = 'true';
                var start = null;
                function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/2000,1); el.textContent=Math.floor(p*t).toLocaleString(); if(p<1)requestAnimationFrame(step); }
                requestAnimationFrame(step);
            }
        });
    }
    function forceBars() { document.querySelectorAll(".fill[data-width], .bar-fill[data-width]").forEach(function(bar){ var rect=bar.getBoundingClientRect(); if(rect.top<window.innerHeight&&rect.bottom>0){ var w=bar.getAttribute("data-width"); bar.style.width="0%"; void bar.offsetWidth; bar.style.width=w+"%"; } }); }
    var scrollTick = false;
    window.addEventListener('scroll', function() {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function() {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item').forEach(function(el) {
                var rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
                    el.classList.add('visible');
                } else {
                    el.classList.remove('visible');
                }
            });
            scrollTick = false;
        });
    }, { passive: true });
    function initSoilInteract() {
        document.querySelectorAll('.soil-card').forEach(function(card) {
            card.addEventListener('click', function() {
                document.querySelectorAll('.soil-card').forEach(function(c){ c.style.transform=''; c.style.borderColor='rgba(255,255,255,0.08)'; });
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.borderColor = 'rgba(52,211,153,0.4)';
                var name = this.querySelector('h3') ? this.querySelector('h3').textContent : '';
                var notif = document.createElement('div');
                notif.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:rgba(10,54,34,0.95);color:white;padding:0.8rem 2rem;border-radius:30px;font-size:0.95rem;z-index:50000;border:1px solid rgba(52,211,153,0.3);backdrop-filter:blur(10px);animation:loaderBounce 0.3s ease;';
                notif.textContent = '🪨 查看' + name + '详细信息';
                document.body.appendChild(notif);
                setTimeout(function(){ notif.style.opacity='0'; notif.style.transition='opacity 0.3s'; setTimeout(function(){ notif.remove(); }, 300); }, 2500);
            });
            card.addEventListener('mouseenter', function() {
                var fills = this.querySelectorAll('.fill[data-width]');
                fills.forEach(function(f){ f.style.width = f.getAttribute('data-width') + '%'; });
            });
        });
    }
})();

/* === Script block 8 (from line ~7144) === */
// charts.js - 渲染 + 点击详情(动态洞察) + 美化饼图
(function(){
var rendered = {};

// ===== 动态洞察生成器 =====
var insightGenerators = {
    trendChart: function(d) {
        var tips = [];
        var maxD = Math.max.apply(null, d.desert), maxI = d.desert.indexOf(maxD);
        tips.push('荒漠化面积峰值出现在' + d.years[maxI] + '年，达' + maxD + d.unit);
        var first = d.desert[0], last = d.desert[d.desert.length-1];
        var drop = ((first - last) / first * 100).toFixed(1);
        tips.push('从' + d.years[0] + '到' + d.years[d.years.length-1] + '，荒漠化面积缩减' + drop + '%（' + first + '→' + last + d.unit + '）');
        var gFirst = d.green[0], gLast = d.green[d.green.length-1];
        tips.push('治理面积增长' + ((gLast - gFirst) / gFirst * 100).toFixed(0) + '%（' + gFirst + '→' + gLast + d.unit + '），年均增速' + ((gLast - gFirst) / (d.green.length - 1)).toFixed(1) + d.unit);
        var crossIdx = -1;
        for(var i = 0; i < d.desert.length; i++) { if(d.green[i] >= d.desert[i]) { crossIdx = i; break; } }
        if(crossIdx >= 0) tips.push(d.years[crossIdx] + '年治理面积首次超越荒漠化面积，实现历史性转折');
        else tips.push('按当前增速，预计' + d.years[d.years.length-1] + '年后治理面积将超越荒漠化面积');
        return tips;
    },
    forestChart: function(d) {
        var tips = [];
        var maxV = Math.max.apply(null, d.values), minV = Math.min.apply(null, d.values);
        var maxN = d.regions[d.values.indexOf(maxV)], minN = d.regions[d.values.indexOf(minV)];
        tips.push(maxN + '覆盖率最高达' + maxV + d.unit + '，' + minN + '最低仅' + minV + d.unit);
        var avg = (d.values.reduce(function(a,b){return a+b;},0) / d.values.length).toFixed(1);
        tips.push('六省平均覆盖率' + avg + d.unit + '，全国平均约24%，西北整体偏低');
        var above15 = d.regions.filter(function(_,i){return d.values[i] > 15;});
        tips.push('仅' + above15.length + '个省区超过15%，生态修复任重道远');
        return tips;
    },
    desertPieChart: function(d) {
        var tips = [];
        var maxV = Math.max.apply(null, d.values), maxN = d.names[d.values.indexOf(maxV)];
        tips.push(maxN + '面积最大，达' + maxV + d.unit);
        var total = d.values.reduce(function(a,b){return a+b;},0);
        tips.push('前三大沙漠合计' + (d.values[0]+d.values[1]+d.values[2]).toFixed(1) + d.unit + '，占总面积' + ((d.values[0]+d.values[1]+d.values[2])/total*100).toFixed(0) + '%');
        var smallest = Math.min.apply(null, d.values);
        tips.push('最小沙漠' + smallest + d.unit + '，与最大差' + (maxV/smallest).toFixed(1) + '倍');
        return tips;
    },
    treeEffectChart: function(d) {
        var tips = [];
        var maxS = Math.max.apply(null, d.sandFix), maxN = d.names[d.sandFix.indexOf(maxS)];
        var maxR = Math.max.apply(null, d.survival), maxRN = d.names[d.survival.indexOf(maxR)];
        tips.push(maxN + '固沙量最大达' + maxS + 'm²/株，' + maxRN + '成活率最高' + maxR + '%');
        var avgFix = (d.sandFix.reduce(function(a,b){return a+b;},0)/d.sandFix.length).toFixed(1);
        var avgSurv = (d.survival.reduce(function(a,b){return a+b;},0)/d.survival.length).toFixed(0);
        tips.push('五种树平均固沙' + avgFix + 'm²、成活率' + avgSurv + '%');
        var best = d.sandFix.map(function(s,i){return {n:d.names[i],s:s,r:d.survival[i],score:s*d.survival[i]/100};}).sort(function(a,b){return b.score-a.score;});
        tips.push('综合效益最优：' + best[0].n + '（固沙×成活率=' + best[0].score.toFixed(1) + '），推荐大面积种植');
        return tips;
    },
    rainChart: function(d) {
        var tips = [];
        var maxR = Math.max.apply(null, d.rain), maxRN = d.regions[d.rain.indexOf(maxR)];
        var minR = Math.min.apply(null, d.rain), minRN = d.regions[d.rain.indexOf(minR)];
        tips.push(maxRN + '降水最丰' + maxR + 'mm，' + minRN + '最旱仅' + minR + 'mm，差' + (maxR/minR).toFixed(0) + '倍');
        var ratios = d.rain.map(function(r,i){return (d.evap[i]/r).toFixed(1);});
        var maxRatio = Math.max.apply(null, ratios.map(Number)), maxRR = d.regions[ratios.indexOf(String(maxRatio))];
        tips.push(maxRR + '蒸发量是降水量的' + maxRatio + '倍，水分亏缺最严重');
        var avgRain = (d.rain.reduce(function(a,b){return a+b;},0)/d.rain.length).toFixed(0);
        tips.push('六地年均降水仅' + avgRain + 'mm，远低于400mm造林门槛');
        return tips;
    },
    climateChart1: function(d) {
        var tips = [];
        var maxR = Math.max.apply(null, d.rain), maxRI = d.rain.indexOf(maxR);
        var maxE = Math.max.apply(null, d.evap), maxEI = d.evap.indexOf(maxE);
        tips.push(d.months[maxRI] + '降水最丰' + maxR + 'mm，' + d.months[maxEI] + '蒸发最强' + maxE + 'mm');
        var totalRain = d.rain.reduce(function(a,b){return a+b;},0);
        var totalEvap = d.evap.reduce(function(a,b){return a+b;},0);
        tips.push('年降水总量' + totalRain + 'mm，年蒸发总量' + totalEvap + 'mm，亏缺' + (totalEvap - totalRain) + 'mm');
        var springEvap = d.evap[2]+d.evap[3]+d.evap[4];
        var yearEvap = totalEvap;
        tips.push('春季(3-5月)蒸发占全年' + (springEvap/yearEvap*100).toFixed(0) + '%，是沙尘暴高发期');
        return tips;
    },
    climateChart2: function(d) {
        var tips = [];
        var maxV = Math.max.apply(null, d.values), maxI = d.values.indexOf(maxV);
        var minV = Math.min.apply(null, d.values), minI = d.values.indexOf(minV);
        tips.push(d.years[maxI] + '年沙尘暴最频繁达' + maxV + '次，' + d.years[minI] + '年最少仅' + minV + '次');
        var first = d.values[0], last = d.values[d.values.length-1];
        tips.push('从' + first + '次降至' + last + '次，降幅' + ((first-last)/first*100).toFixed(0) + '%');
        var avg = (d.values.reduce(function(a,b){return a+b;},0)/d.values.length).toFixed(1);
        tips.push('年均' + avg + '次，整体呈显著下降趋势');
        return tips;
    },
    soilChart1: function(d) { return ['有机质仅0.3%，几乎无植被自然生长能力','pH值88强碱性，多数植物难以适应','保水能力极差，需客土改良+人工灌溉才能种植']; },
    soilChart2: function(d) { return ['有机质0.5-1%，比荒漠土略好但仍贫瘠','渗透率55中等，水分可部分保持','适合梭梭、花棒等耐旱先锋植物定植']; },
    soilChart3: function(d) { return ['有机质2-4%，有腐殖质层，肥力中等','pH值70-80接近中性，适宜多数树种','内蒙古高原主力土壤，草原恢复基础']; },
    soilChart4: function(d) { return ['有机质5-10%，腐殖质层深达30-80cm','渗透率80高，水肥协调性最佳','西北最优质土壤，农林业黄金区域']; }
};

// 动态洞察：从图表数据本身计算
function generateInsights(chartId, params) {
    var gen = insightGenerators[chartId];
    if(gen) {
        var meta = getChartData(chartId);
        if(meta) return gen(meta);
    }
    return ['点击图表中的数据点可查看详细分析'];
}

function getChartData(chartId) {
    var chart = rendered[chartId] || (window.chartInstances && window.chartInstances[chartId]);
    if(!chart) return null;
    var opt = chart.getOption();
    if(!opt) return null;
    var cat = opt.xAxis && opt.xAxis[0] ? opt.xAxis[0].data : [];
    var series = opt.series || [];
    var result = { categories: cat, series: series };
    if(chartId === 'trendChart') {
        result.years = cat;
        result.desert = series[0] ? series[0].data : [];
        result.green = series[1] ? series[1].data : [];
        result.unit = '万km²';
    } else if(chartId === 'forestChart') {
        result.regions = cat;
        result.values = series[0] ? (series[0].data.map(function(d){ return typeof d==='object'?d.value:d; })) : [];
        result.unit = '%';
    } else if(chartId === 'desertPieChart') {
        var pieData = series[0] ? series[0].data : [];
        result.names = pieData.map(function(d){return d.name;});
        result.values = pieData.map(function(d){return d.value;});
        result.unit = '万km²';
    } else if(chartId === 'treeEffectChart') {
        result.names = cat;
        result.sandFix = series[0] ? series[0].data : [];
        result.survival = series[1] ? series[1].data : [];
        result.unit = 'm²/%';
    } else if(chartId === 'rainChart') {
        result.regions = cat;
        result.rain = series[0] ? series[0].data : [];
        result.evap = series[1] ? series[1].data : [];
        result.unit = 'mm';
    } else if(chartId === 'climateChart1') {
        result.months = cat;
        result.rain = series[0] ? series[0].data : [];
        result.evap = series[1] ? series[1].data : [];
        result.unit = 'mm';
    } else if(chartId === 'climateChart2') {
        result.years = cat;
        result.values = series[0] ? series[0].data : [];
        result.unit = '次';
    }
    return result;
}

// ===== 详情弹窗 =====
function showChartDetail(chartId, params) {
    var popup = document.getElementById('chartDetailPopup');
    if(!popup) {
        popup = document.createElement('div');
        popup.id = 'chartDetailPopup';
        popup.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s;';
        popup.innerHTML = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);" id="chartDetailOverlay"></div><div id="chartDetailCard" style="position:relative;background:linear-gradient(135deg,rgba(10,54,34,0.98),rgba(8,12,16,0.98));border:1px solid rgba(52,211,153,0.25);border-radius:20px;padding:2rem;max-width:520px;width:92%;max-height:85vh;overflow-y:auto;transform:scale(0.9) translateY(20px);transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 30px 80px rgba(0,0,0,0.6);"></div>';
        document.body.appendChild(popup);
        popup.querySelector('#chartDetailOverlay').onclick = closeChartDetail;
    }
    var card = popup.querySelector('#chartDetailCard');
    var d = getChartData(chartId);
    var chartTitle = chartId.replace(/([A-Z])/g,' $1').replace('Chart','').replace('Trend','趋势').replace('Forest','森林').replace('DesertPie','沙漠占比').replace('TreeEffect','树种效果').replace('Rain','降水').replace('Soil','土壤').replace('Climate','气候');

    var html = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.2rem;">';
    html += '<h3 style="color:var(--accent);font-size:1.15rem;margin:0;">📊 数据详情</h3>';
    html += '<button onclick="closeChartDetail()" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:50%;width:32px;height:32px;color:#aaa;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;">✕</button></div>';

    // 点击项高亮
    if(params && params.name) {
        html += '<div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.15);border-radius:12px;padding:1rem;margin-bottom:1rem;">';
        html += '<div style="font-size:0.75rem;color:var(--text2);margin-bottom:0.2rem;">当前点击</div>';
        html += '<div style="font-size:1.3rem;font-weight:800;color:#fff;">' + params.name + '</div>';
        if(params.seriesName) html += '<div style="font-size:0.8rem;color:var(--text2);margin-top:0.15rem;">' + params.seriesName + '</div>';
        if(params.value !== undefined) {
            var val = Array.isArray(params.value) ? params.value.join(' / ') : params.value;
            html += '<div style="font-size:1.6rem;font-weight:900;color:var(--gold);margin-top:0.4rem;">' + val + (d && d.unit ? ' ' + d.unit.split('/')[0].trim() : '') + '</div>';
        }
        html += '</div>';
    }

    // 数据表格
    if(d && d.categories && d.categories.length) {
        html += '<div style="margin-bottom:1rem;overflow-x:auto;">';
        html += '<table style="width:100%;border-collapse:collapse;font-size:0.78rem;"><thead><tr style="border-bottom:1px solid rgba(255,255,255,0.1);">';
        html += '<th style="text-align:left;padding:0.4rem;color:var(--text2);">项目</th>';
        d.series.forEach(function(s){
            var color = s.lineStyle ? s.lineStyle.color : (s.itemStyle && s.itemStyle.color ? (typeof s.itemStyle.color === 'string' ? s.itemStyle.color : '#34d399') : '#34d399');
            html += '<th style="text-align:right;padding:0.4rem;color:' + color + ';">' + (s.name || '') + '</th>';
        });
        html += '</tr></thead><tbody>';
        for(var i = 0; i < d.categories.length; i++) {
            var hl = params && params.dataIndex === i;
            html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.04);' + (hl ? 'background:rgba(52,211,153,0.08);' : '') + '">';
            html += '<td style="padding:0.3rem 0.4rem;color:#ccc;font-weight:' + (hl?'700':'400') + ';">' + d.categories[i] + '</td>';
            d.series.forEach(function(s){
                var raw = s.data[i];
                var v = typeof raw === 'object' ? raw.value : raw;
                var c = s.lineStyle ? s.lineStyle.color : '#aaa';
                html += '<td style="text-align:right;padding:0.3rem 0.4rem;color:' + c + ';font-weight:' + (hl?'800':'400') + ';">' + v + '</td>';
            });
            html += '</tr>';
        }
        html += '</tbody></table></div>';
    }

    // 动态洞察
    var insights = generateInsights(chartId, params);
    if(insights && insights.length) {
        html += '<div style="background:rgba(255,215,64,0.05);border:1px solid rgba(255,215,64,0.12);border-radius:12px;padding:1rem;">';
        html += '<div style="font-size:0.8rem;color:var(--gold);font-weight:600;margin-bottom:0.5rem;">💡 数据洞察</div>';
        insights.forEach(function(tip){
            html += '<div style="font-size:0.78rem;color:var(--text2);line-height:1.7;padding:0.15rem 0;">• ' + tip + '</div>';
        });
        html += '</div>';
    }

    card.innerHTML = html;
    popup.style.opacity = '1';
    popup.style.pointerEvents = 'auto';
    setTimeout(function(){ card.style.transform = 'scale(1) translateY(0)'; }, 30);
}

window.closeChartDetail = function() {
    var popup = document.getElementById('chartDetailPopup');
    if(!popup) return;
    var card = popup.querySelector('#chartDetailCard');
    if(card) card.style.transform = 'scale(0.9) translateY(20px)';
    popup.style.opacity = '0';
    popup.style.pointerEvents = 'none';
};

document.addEventListener('keydown', function(e) { if(e.key === 'Escape') closeChartDetail(); });

// ===== 图表配置 =====
var allChartConfigs = [
    {id:'trendChart', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',borderColor:'#34d399',textStyle:{color:'#fff'},axisPointer:{type:'cross'}},
        legend:{data:['荒漠化面积','治理面积'],textStyle:{color:'#aaa'},top:10},
        grid:{left:60,right:30,top:60,bottom:40},
        animationDuration:1500,animationEasing:'elasticOut',
        xAxis:{type:'category',data:['1980','1990','1995','2000','2005','2010','2015','2020','2025'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'}},
        yAxis:{type:'value',axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.05)'}}},
        series:[
            {name:'荒漠化面积',type:'line',data:[280,320,335,340,330,310,285,270,261],smooth:true,lineStyle:{color:'#d4a574',width:3},itemStyle:{color:'#d4a574'},symbol:'circle',symbolSize:8,areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(212,165,116,0.25)'},{offset:1,color:'rgba(212,165,116,0.02)'}]}},emphasis:{focus:'series'}},
            {name:'治理面积',type:'line',data:[50,90,130,180,230,280,320,360,400],smooth:true,lineStyle:{color:'#34d399',width:3},itemStyle:{color:'#34d399'},symbol:'circle',symbolSize:8,areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(52,211,153,0.25)'},{offset:1,color:'rgba(52,211,153,0.02)'}]}},emphasis:{focus:'series'}}
        ]
    }}},
    {id:'forestChart', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},
        grid:{left:70,right:30,top:30,bottom:50},
        animationDuration:1200,animationEasing:'elasticOut',
        xAxis:{type:'category',data:['新疆','甘肃','青海','宁夏','陕西','内蒙古'],axisLine:{lineStyle:{color:'#444'}},axisLabel:{color:'#aaa',fontSize:12}},
        yAxis:{type:'value',name:'%',nameTextStyle:{color:'#666'},axisLine:{show:false},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.06)',type:'dashed'}}},
        series:[{type:'bar',data:[4.87,11.33,7.26,15.8,46.39,22.1],barWidth:'55%',
            itemStyle:{color:function(p){var colors=['#7ecf5a','#6abf4a','#72c755','#5ab840','#34d399','#4aad3a'];return new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:colors[p.dataIndex]},{offset:1,color:'#0a3622'}])},borderRadius:[6,6,0,0]},
            label:{show:true,position:'top',color:'rgba(255,255,255,0.7)',fontSize:11,formatter:function(p){return p.value+'%'}}}]
    }}},
    {id:'desertPieChart', opt:function(){return {
        tooltip:{trigger:'item',backgroundColor:'rgba(10,54,34,0.95)',borderColor:'rgba(52,211,153,0.3)',borderWidth:1,textStyle:{color:'#fff',fontSize:13},formatter:function(p){return '<b style="color:#fbbf24">'+p.name+'</b><br/>占比: <b>'+p.percent+'%</b><br/>面积: 约'+p.value.toFixed(1)+'万km²';}},
        legend:{show:false},
        color:['#e8c99b','#c4a265','#a07848','#7d6040','#5c4830','#3d3020'],
        series:[
            {type:'pie',radius:['48%','78%'],center:['38%','50%'],
            avoidLabelOverlap:true,
            padAngle:2,
            itemStyle:{borderColor:'rgba(8,12,16,0.9)',borderWidth:3,borderRadius:6,shadowBlur:15,shadowColor:'rgba(0,0,0,0.4)'},
            label:{show:true,position:'outside',color:'#ddd',fontSize:11,fontWeight:500,formatter:function(p){return p.name+'\n{val|'+p.percent+'%}';},rich:{val:{color:'#34d399',fontSize:13,fontWeight:'bold',padding:[4,0,0,0]}},lineHeight:18},
            labelLine:{length:18,length2:14,smooth:0.2,lineStyle:{color:'rgba(255,255,255,0.25)',width:1.5}},
            emphasis:{scaleSize:10,label:{fontSize:14,fontWeight:'bold',color:'#fff'},itemStyle:{shadowBlur:30,shadowColor:'rgba(212,165,116,0.5)'}},
            data:[{value:33.76,name:'塔克拉玛干',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#f0d9a8'},{offset:1,color:'#c4a265'}]}}},{value:4.43,name:'巴丹吉林',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#dbb878'},{offset:1,color:'#a07848'}]}}},{value:4.27,name:'腾格里',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#b89860'},{offset:1,color:'#7d6040'}]}}},{value:4.22,name:'毛乌素',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#9a7d50'},{offset:1,color:'#5c4830'}]}}},{value:1.86,name:'库布其',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#8a6d45'},{offset:1,color:'#3d3020'}]}}},{value:4.88,name:'古尔班通古特',itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:1,colorStops:[{offset:0,color:'#705838'},{offset:1,color:'#2a2018'}]}}}],
            animationType:'expansion',animationDuration:1800,animationEasing:'cubicOut',animationDelay:function(idx){return idx*150;}}
        ]
    }}},
    {id:'treeEffectChart', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'},axisPointer:{type:'cross'}},
        legend:{data:['固沙量','成活率(%)'],textStyle:{color:'#aaa'},top:10},
        grid:{left:70,right:40,top:55,bottom:40},
        animationDuration:1200,animationEasing:'elasticOut',
        xAxis:{type:'category',data:['梭梭','胡杨','沙棘','柠条','花棒'],axisLine:{lineStyle:{color:'#444'}},axisLabel:{color:'#aaa'}},
        yAxis:[{type:'value',name:'m²',nameTextStyle:{color:'#666'},axisLine:{show:false},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.06)',type:'dashed'}}},{type:'value',max:100,name:'%',nameTextStyle:{color:'#666'},axisLine:{show:false},axisLabel:{color:'#888'},splitLine:{show:false}}],
        series:[
            {name:'固沙量',type:'bar',data:[10,15,6,8,5],barWidth:'40%',itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34d399'},{offset:1,color:'#1a6d3a'}]),borderRadius:[8,8,0,0]},label:{show:true,position:'top',color:'rgba(52,211,153,0.8)',fontSize:12,formatter:function(p){return p.value+'m²'}}},
            {name:'成活率(%)',type:'line',yAxisIndex:1,data:[85,78,90,88,75],smooth:true,lineStyle:{color:'#fbbf24',width:3},itemStyle:{color:'#fbbf24'},symbol:'circle',symbolSize:10,areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(241,196,15,0.15)'},{offset:1,color:'rgba(241,196,15,0.01)'}]}}}
        ]
    }}},
    {id:'rainChart', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'},axisPointer:{type:'shadow'}},
        legend:{data:['降水量','蒸发量'],textStyle:{color:'#aaa'},top:10},
        grid:{left:70,right:30,top:55,bottom:45},
        animationDuration:1200,animationEasing:'elasticOut',
        xAxis:{type:'category',data:['塔城','哈密','敦煌','格尔木','中卫','榆林'],axisLine:{lineStyle:{color:'#444'}},axisLabel:{color:'#aaa',fontSize:11,rotate:15}},
        yAxis:{type:'value',axisLine:{show:false},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.06)',type:'dashed'}}},
        series:[
            {name:'降水量',type:'bar',data:[280,50,40,180,200,400],barWidth:'32%',itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#60b0f4'},{offset:1,color:'#1a6ba0'}]),borderRadius:[6,6,0,0]},label:{show:true,position:'top',color:'rgba(52,152,219,0.7)',fontSize:10,formatter:function(p){return p.value+'mm'}}},
            {name:'蒸发量',type:'bar',data:[1800,3200,2800,2200,2400,1600],barWidth:'32%',itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#f0a04b'},{offset:1,color:'#b85e1a'}]),borderRadius:[6,6,0,0]},label:{show:true,position:'top',color:'rgba(230,126,34,0.7)',fontSize:10,formatter:function(p){return p.value+'mm'}}}
        ]
    }}},
    {id:'soilChart1', opt:function(){return {tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},grid:{left:50,right:15,top:15,bottom:30},xAxis:{type:'category',data:['有机质%','渗透率','pH值'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888',fontSize:11}},yAxis:{type:'value',max:100,axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},series:[{type:'bar',data:[12,8,88],itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#34d399'},{offset:1,color:'#0a3622'}]),borderRadius:[6,6,0,0]},barWidth:'50%'}]}}},
    {id:'soilChart2', opt:function(){return {tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},grid:{left:50,right:15,top:15,bottom:30},xAxis:{type:'category',data:['有机质%','渗透率','pH值'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888',fontSize:11}},yAxis:{type:'value',max:100,axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},series:[{type:'bar',data:[18,55,78],itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#deb887'},{offset:1,color:'#8B7355'}]),borderRadius:[6,6,0,0]},barWidth:'50%'}]}}},
    {id:'soilChart3', opt:function(){return {tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},grid:{left:50,right:15,top:15,bottom:30},xAxis:{type:'category',data:['有机质%','渗透率','pH值'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888',fontSize:11}},yAxis:{type:'value',max:100,axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},series:[{type:'bar',data:[45,65,58],itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#9b59b6'},{offset:1,color:'#6c3483'}]),borderRadius:[6,6,0,0]},barWidth:'50%'}]}}},
    {id:'soilChart4', opt:function(){return {tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},grid:{left:50,right:15,top:15,bottom:30},xAxis:{type:'category',data:['有机质%','渗透率','pH值'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888',fontSize:11}},yAxis:{type:'value',max:100,axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},series:[{type:'bar',data:[78,80,48],itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#fbbf24'},{offset:1,color:'#d4a017'}]),borderRadius:[6,6,0,0]},barWidth:'50%'}]}}},
    {id:'climateChart1', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},
        grid:{left:50,right:15,top:15,bottom:30},
        legend:{data:['降水(mm)','蒸发(mm)'],textStyle:{color:'#aaa'},top:0},
        xAxis:{type:'category',data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888',fontSize:10,rotate:30}},
        yAxis:{type:'value',axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},
        series:[
            {name:'降水(mm)',type:'bar',data:[3,5,8,15,25,35,60,55,30,18,8,3],itemStyle:{color:'#3498db',borderRadius:[4,4,0,0]},barWidth:'35%'},
            {name:'蒸发(mm)',type:'line',data:[20,40,80,150,220,300,350,320,200,120,60,30],smooth:true,lineStyle:{color:'#e67e22',width:3},itemStyle:{color:'#e67e22'}}
        ]
    }}},
    {id:'climateChart2', opt:function(){return {
        tooltip:{trigger:'axis',backgroundColor:'rgba(10,54,34,0.95)',textStyle:{color:'#fff'}},
        grid:{left:50,right:15,top:15,bottom:30},
        xAxis:{type:'category',data:['2015','2017','2019','2021','2023','2025'],axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'}},
        yAxis:{type:'value',axisLine:{lineStyle:{color:'#333'}},axisLabel:{color:'#888'},splitLine:{lineStyle:{color:'rgba(255,255,255,0.04)'}}},
        series:[{type:'line',data:[12,10,9,18,7,5],smooth:true,
            areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(231,76,60,0.4)'},{offset:1,color:'rgba(231,76,60,0.05)'}])},
            lineStyle:{color:'#e74c3c',width:4},itemStyle:{color:'#e74c3c'},
            markPoint:{data:[{name:'黑风暴',value:18,xAxis:3,yAxis:18}],label:{color:'#fff',fontSize:11}}
        }]
    }}}
];

// ===== DOM级点击绑定 =====
function bindChartClick(chartId, chart, el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(e) {
        // 检测是否点击在图例区域，是则跳过弹窗
        try {
            var opt = chart.getOption();
            var legendTop = opt.legend && opt.legend[0] ? (opt.legend[0].top || 0) : 0;
            var gridOpt = opt.grid && opt.grid[0] ? opt.grid[0] : {};
            var gridTop = typeof gridOpt.top === 'number' ? gridOpt.top : 60;
            var rect = el.getBoundingClientRect();
            var clickY = e.clientY - rect.top;
            // 图例通常在图表上方0-gridTop的区域
            if(clickY < gridTop + 10) return;
        } catch(ignore) {}

        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var params = null;

        // 饼图
        var opt = chart.getOption();
        var isPie = opt.series && opt.series[0] && opt.series[0].type === 'pie';
        if(isPie) {
            try {
                var pieData = opt.series[0].data;
                var total = 0;
                pieData.forEach(function(d){total+=d.value;});
                var cx = rect.width * 0.38, cy = rect.height * 0.5;
                var angle = Math.atan2(y - cy, x - cx);
                if(angle < -Math.PI/2) angle += Math.PI*2;
                var cumAngle = -Math.PI/2;
                for(var i=0;i<pieData.length;i++){
                    var sweep = (pieData[i].value/total)*Math.PI*2;
                    if(angle >= cumAngle && angle < cumAngle+sweep){
                        params = {name:pieData[i].name, value:pieData[i].value, dataIndex:i, seriesName:'面积占比'};
                        break;
                    }
                    cumAngle += sweep;
                }
            } catch(ex) {}
        } else {
            // 柱状图/折线图
            try {
                var pointInGrid = chart.convertFromPixel({gridIndex:0}, [x, y]);
                if(pointInGrid) {
                    var catData = opt.xAxis && opt.xAxis[0] ? opt.xAxis[0].data : [];
                    var idx = Math.round(pointInGrid[0]);
                    if(idx >= 0 && idx < catData.length) {
                        var sName = '', sValue = null;
                        (opt.series || []).forEach(function(s){
                            var v = s.data[idx];
                            sValue = typeof v === 'object' ? v.value : v;
                            sName = s.name || '';
                        });
                        params = {name: catData[idx], value: sValue, dataIndex: idx, seriesName: sName};
                    }
                }
            } catch(ex) {}
        }
        if(params) showChartDetail(chartId, params);
    });
}

// ===== 渲染 =====
function tryRenderAll(){
    if(typeof echarts === 'undefined') return false;
    var anyRendered = false;
    allChartConfigs.forEach(function(cfg){
        if(rendered[cfg.id]) return;
        var el = document.getElementById(cfg.id);
        if(!el) return;
        if(el.offsetWidth === 0 || el.offsetHeight === 0) return;
        try {
            var chart = echarts.init(el);
            chart.setOption(cfg.opt());
            rendered[cfg.id] = chart;
            if(!window.chartInstances) window.chartInstances = {};
            window.chartInstances[cfg.id] = chart;
            bindChartClick(cfg.id, chart, el);
            anyRendered = true;
        } catch(e){console.error('[charts.js] '+cfg.id+':',e);}
    });
    return anyRendered;
}

function poll(){
    if(Object.keys(rendered).length >= allChartConfigs.length) return;
    tryRenderAll();
    if(Object.keys(rendered).length < allChartConfigs.length){
        setTimeout(poll, 800);
    }
}

window.addEventListener('resize', function(){
    Object.values(rendered).forEach(function(chart){
        try{chart.resize();}catch(e){}
    });
});

document.addEventListener('DOMContentLoaded', function(){ setTimeout(poll, 200); });
window.addEventListener('load', function(){ setTimeout(poll, 100); });
setTimeout(poll, 1000);
setTimeout(poll, 2000);
})();

/* === Script block 9 (from line ~7579) === */
// 强制设置背景色
document.documentElement.style.background = 'linear-gradient(180deg, #1a2538, #1a2538, #1a2538)';
document.body.style.background = 'linear-gradient(180deg, #1a2538, #1a2538, #1a2538)';
document.body.style.minHeight = '100vh';


// ===== V5 Features =====

// --- 1. 风沙时间轴（增强版）---
(function(){
    var canvas=document.getElementById('wtCanvas');
    if(!canvas)return;
    var box=document.getElementById('wtBox');
    var slider=document.getElementById('wtSlider');
    var windSlider=document.getElementById('wtWindSlider');
    var ctx=canvas.getContext('2d');
    var W,H,dpr,running=true;
    var progress=0,windMul=0.8;
    var particles=[],clouds=[],dunePoints=[];
    var time=0;

    function resize(){
        dpr=window.devicePixelRatio||1;
        var rect=box.getBoundingClientRect();
        W=rect.width;H=rect.height;
        canvas.width=W*dpr;canvas.height=H*dpr;
        canvas.style.width=W+'px';canvas.style.height=H+'px';
        initParticles();initClouds();initDunes();
    }

    function initParticles(){
        particles=[];
        for(var i=0;i<200;i++){
            particles.push({
                x:Math.random()*W*1.3,y:H*0.45+Math.random()*H*0.5,
                s:Math.random()*2.5+0.5,vx:Math.random()*4+1,
                vy:(Math.random()-0.5)*2,op:Math.random()*0.6+0.2,
                rot:Math.random()*360,rotV:Math.random()*4-2
            });
        }
    }

    function initClouds(){
        clouds=[];
        for(var i=0;i<5;i++){
            clouds.push({
                x:Math.random()*W*1.5-W*0.25,
                y:H*0.05+Math.random()*H*0.18,
                w:60+Math.random()*120,h:20+Math.random()*25,
                speed:0.2+Math.random()*0.4,op:0.3+Math.random()*0.3
            });
        }
    }

    function initDunes(){
        dunePoints=[];
        for(var i=0;i<8;i++){
            dunePoints.push({
                x:W*0.1+i*W*0.11,
                baseY:H*0.48+Math.sin(i*1.5)*15,
                w:50+Math.random()*60,h:15+Math.random()*20,
                phase:Math.random()*Math.PI*2
            });
        }
    }

    // 真实数据：国家林草局、中国荒漠化公报、三北工程报告
    var realData=[
        {year:1960,desert:170,veg:0.9,wind:5.0,rain:165,storms:35,gdp:800,note:'建国初期，沙漠化面积170万km²'},
        {year:1965,desert:176,veg:0.8,wind:5.1,rain:158,storms:38,gdp:750,note:'过度开垦加剧沙化'},
        {year:1970,desert:185,veg:0.7,wind:5.2,rain:152,storms:40,gdp:700,note:'农牧业扩张，沙化加速'},
        {year:1978,desert:198,veg:0.6,wind:5.0,rain:160,storms:36,gdp:820,note:'三北防护林工程启动'},
        {year:1980,desert:208,veg:1.2,wind:4.8,rain:168,storms:32,gdp:900,note:'三北一期，局部遏制'},
        {year:1985,desert:220,veg:2.5,wind:4.6,rain:175,storms:30,gdp:1100,note:'库布其治理开始'},
        {year:1990,desert:233,veg:4.8,wind:4.4,rain:185,storms:28,gdp:1500,note:'年均造林100万公顷'},
        {year:1995,desert:245,veg:7.5,wind:4.2,rain:195,storms:26,gdp:2200,note:'飞播造林突破'},
        {year:1999,desert:261,veg:10.2,wind:4.0,rain:200,storms:24,gdp:3000,note:'沙化峰值261万km²'},
        {year:2002,desert:258,veg:13.5,wind:3.8,rain:210,storms:21,gdp:4000,note:'退耕还林5000亿投入'},
        {year:2005,desert:254,veg:16.8,wind:3.5,rain:220,storms:18,gdp:5500,note:'首次沙化净减少'},
        {year:2010,desert:250,veg:21.5,wind:3.2,rain:240,storms:15,gdp:8000,note:'毛乌素15%覆盖率'},
        {year:2015,desert:261,veg:28.0,wind:2.8,rain:260,storms:12,gdp:12000,note:'年均减少1200km²'},
        {year:2019,desert:257,veg:30.5,wind:2.5,rain:275,storms:10,gdp:15000,note:'库布其获联合国认可'},
        {year:2020,desert:257,veg:33.0,wind:2.3,rain:280,storms:8,gdp:16000,note:'毛乌素33%覆盖率'},
        {year:2023,desert:255,veg:36.2,wind:2.1,rain:290,storms:6,gdp:18000,note:'智能治沙推广'},
        {year:2025,desert:253,veg:38.5,wind:2.0,rain:295,storms:5,gdp:20000,note:'三北八期推进'}
    ];

    function getStage(p){
        var idx=p*(realData.length-1);
        var i=Math.floor(idx);
        var t=idx-i;
        if(i>=realData.length-1)return Object.assign({},realData[realData.length-1],{duneH:3,gg:60,trees:50});
        var a=realData[i],b=realData[i+1];
        return{
            year:Math.round(a.year+(b.year-a.year)*t),
            desert:Math.round((a.desert+(b.desert-a.desert)*t)*10)/10,
            veg:Math.round((a.veg+(b.veg-a.veg)*t)*10)/10,
            wind:Math.round((a.wind+(b.wind-a.wind)*t)*10)/10,
            rain:Math.round(a.rain+(b.rain-a.rain)*t),
            storms:Math.round(a.storms+(b.storms-a.storms)*t),
            gdp:Math.round(a.gdp+(b.gdp-a.gdp)*t),
            duneH:Math.max(3,30-a.veg*0.7-(b.veg-a.veg)*t*0.7),
            gg:Math.min(60,a.veg*2+(b.veg-a.veg)*t*2),
            trees:Math.min(50,a.veg*1.5+(b.veg-a.veg)*t*1.5)
        };
    }

    function drawSky(st){
        var gn=st.veg/70;
        var topR=gn<0.3?42:26,topG=gn<0.3?21:48,topB=gn<0.3?80:80;
        var botR=gn<0.3?212:74,botG=gn<0.3?165:144,botB=gn<0.3?116:217;
        var sky=ctx.createLinearGradient(0,0,0,H*0.52);
        sky.addColorStop(0,'rgb('+topR+','+topG+','+topB+')');
        sky.addColorStop(0.6,'rgb('+Math.round((topR+botR)/2)+','+Math.round((topG+botG)/2)+','+Math.round((topB+botB)/2)+')');
        sky.addColorStop(1,'rgb('+botR+','+botG+','+botB+')');
        ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.52);

        // 太阳光晕
        var sunX=W*0.8,sunY=H*0.1;
        for(var i=4;i>0;i--){
            ctx.fillStyle='rgba(255,220,80,'+(0.03/i)+')';
            ctx.beginPath();ctx.arc(sunX,sunY,25+i*22,0,Math.PI*2);ctx.fill();
        }
        var sg=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,20);
        sg.addColorStop(0,'rgba(255,248,220,1)');sg.addColorStop(0.5,'rgba(255,220,100,0.6)');sg.addColorStop(1,'rgba(255,180,50,0)');
        ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sunX,sunY,20,0,Math.PI*2);ctx.fill();

        // 阳光射线
        ctx.save();ctx.translate(sunX,sunY);ctx.rotate(time*0.05);
        for(var i=0;i<8;i++){
            var a=i*Math.PI/4;
            ctx.strokeStyle='rgba(255,220,120,'+(0.06+Math.sin(time+i)*0.03)+')';
            ctx.lineWidth=1.5;
            ctx.beginPath();ctx.moveTo(Math.cos(a)*28,Math.sin(a)*28);
            ctx.lineTo(Math.cos(a)*(45+Math.sin(time*2+i)*8),Math.sin(a)*(45+Math.sin(time*2+i)*8));
            ctx.stroke();
        }
        ctx.restore();

        // 云
        var cOp=gn*0.5+0.15;
        clouds.forEach(function(c){
            c.x+=c.speed;
            if(c.x>W+c.w)c.x=-c.w*2;
            ctx.fillStyle='rgba(255,255,255,'+(cOp*c.op)+')';
            ctx.beginPath();ctx.ellipse(c.x,c.y,c.w*0.35,c.h*0.45,0,0,Math.PI*2);ctx.fill();
            ctx.beginPath();ctx.ellipse(c.x-c.w*0.22,c.y+c.h*0.1,c.w*0.28,c.h*0.38,0,0,Math.PI*2);ctx.fill();
            ctx.beginPath();ctx.ellipse(c.x+c.w*0.2,c.y+c.h*0.05,c.w*0.3,c.h*0.42,0,0,Math.PI*2);ctx.fill();
            ctx.beginPath();ctx.ellipse(c.x+c.w*0.05,c.y-c.h*0.15,c.w*0.22,c.h*0.35,0,0,Math.PI*2);ctx.fill();
        });
    }

    function drawGround(st){
        var gn=st.veg/70;
        var gY=H*0.52;

        // 远山
        ctx.fillStyle=gn>0.4?'rgba(50,120,60,0.35)':'rgba(140,120,90,0.3)';
        ctx.beginPath();ctx.moveTo(0,gY);
        ctx.quadraticCurveTo(W*0.15,H*0.36,W*0.3,H*0.44);
        ctx.quadraticCurveTo(W*0.45,H*0.34,W*0.6,H*0.42);
        ctx.quadraticCurveTo(W*0.75,H*0.32,W*0.85,H*0.4);
        ctx.quadraticCurveTo(W*0.92,H*0.36,W,H*0.42);
        ctx.lineTo(W,gY);ctx.lineTo(0,gY);ctx.closePath();ctx.fill();

        // 沙丘（随治理减弱）
        var duneH=st.duneH;
        dunePoints.forEach(function(d,i){
            var dy=d.baseY+Math.sin(time*0.5+d.phase)*2;
            var dh=d.h*(duneH/25);
            if(dh>2){
                ctx.fillStyle=gn>0.5?'rgba(100,140,60,0.4)':'rgba(180,150,90,0.5)';
                ctx.beginPath();ctx.moveTo(d.x-d.w,dy+dh);
                ctx.quadraticCurveTo(d.x,dy-dh*0.6,d.x+d.w,dy+dh);
                ctx.closePath();ctx.fill();
                // 沙丘纹理线
                if(gn<0.4){
                    ctx.strokeStyle='rgba(160,130,70,0.2)';ctx.lineWidth=0.8;
                    for(var li=0;li<3;li++){
                        ctx.beginPath();
                        ctx.moveTo(d.x-d.w*0.8,dy+dh*0.3+li*4);
                        ctx.quadraticCurveTo(d.x,dy-dh*0.3+li*4,d.x+d.w*0.8,dy+dh*0.3+li*4);
                        ctx.stroke();
                    }
                }
            }
        });

        // 主地面
        var gg=ctx.createLinearGradient(0,gY,0,H);
        if(gn<0.15){gg.addColorStop(0,'#D2B48C');gg.addColorStop(0.5,'#C19A6B');gg.addColorStop(1,'#8B6914');}
        else if(gn<0.35){gg.addColorStop(0,'#B8A070');gg.addColorStop(0.5,'#8B9A4A');gg.addColorStop(1,'#556B2F');}
        else if(gn<0.6){gg.addColorStop(0,'#6B8E23');gg.addColorStop(0.5,'#4a7c2e');gg.addColorStop(1,'#2e5a15');}
        else{gg.addColorStop(0,'#2E8B57');gg.addColorStop(0.5,'#1a6d3a');gg.addColorStop(1,'#0a4020');}
        ctx.fillStyle=gg;ctx.fillRect(0,gY,W,H-gY);

        // 地面沙纹（治理前有，治理后消失）
        if(gn<0.4){
            ctx.strokeStyle='rgba(160,130,80,'+(0.2*(1-gn/0.4))+')';ctx.lineWidth=0.8;
            for(var si=0;si<6;si++){
                var sy=gY+15+si*18;
                ctx.beginPath();
                for(var x=0;x<=W;x+=4)ctx.lineTo(x,sy+Math.sin(x*0.012+si*1.2+time*0.3)*4);
                ctx.stroke();
            }
        }

        // 草方格网格
        if(st.gg>0){
            var ggOp=Math.min(0.7,st.gg/50);
            var gs=45;
            ctx.strokeStyle='rgba(180,150,60,'+ggOp+')';
            ctx.lineWidth=gn>0.5?1.2:2;
            for(var gy=Math.ceil(gY/gs)*gs;gy<H;gy+=gs){
                ctx.beginPath();ctx.moveTo(0,gy);
                for(var x=0;x<=W;x+=15)ctx.lineTo(x,gy+Math.sin(x*0.006+gy*0.003)*1.5);
                ctx.stroke();
            }
            for(var gx=gs;gx<W;gx+=gs){
                ctx.beginPath();ctx.moveTo(gx,gY);
                for(var y=gY;y<=H;y+=15)ctx.lineTo(gx+Math.sin(y*0.006+gx*0.003)*1.5,y);
                ctx.stroke();
            }
            // 草方格内的小草芽
            if(gn>0.1&&gn<0.5){
                for(var gx2=gs/2;gx2<W;gx2+=gs){
                    for(var gy2=Math.ceil((gY+10)/gs)*gs+gs/2;gy2<H;gy2+=gs){
                        if(Math.random()>0.6)continue;
                        ctx.strokeStyle='rgba(100,160,50,'+ggOp*0.8+')';ctx.lineWidth=1;
                        var sway=Math.sin(time*1.5+gx2*0.01+gy2*0.01)*2;
                        ctx.beginPath();ctx.moveTo(gx2,gy2);ctx.quadraticCurveTo(gx2+sway,gy2-6,gx2+sway*0.5,gy2-10);ctx.stroke();
                    }
                }
            }
        }

        // 灌木丛
        if(gn>0.25){
            var bushCount=Math.floor((gn-0.25)*40);
            for(var bi=0;bi<bushCount;bi++){
                var bx=W*0.05+bi*(W*0.9/bushCount)+Math.sin(bi*2.3)*15;
                var by=gY+8+Math.sin(bi*1.7)*5;
                var bsw=Math.sin(time*0.8+bi)*1.5;
                var bSize=6+gn*8;
                ctx.fillStyle=bi%3===0?'#4a8c2a':bi%3===1?'#3a7a20':'#5a9a35';
                ctx.beginPath();ctx.ellipse(bx+bsw,by-bSize*0.4,bSize*0.7,bSize*0.5,0,0,Math.PI*2);ctx.fill();
                ctx.fillStyle=bi%2===0?'#3a7a20':'#4a8c2a';
                ctx.beginPath();ctx.ellipse(bx+bsw+3,by-bSize*0.3,bSize*0.5,bSize*0.4,0,0,Math.PI*2);ctx.fill();
            }
        }

        // 树木
        if(st.trees>0){
            var tc=Math.min(st.trees,35);
            for(var ti=0;ti<tc;ti++){
                var tx=W*0.06+(W*0.88/34)*ti;
                var ty=gY+3+Math.sin(ti*2.1)*3;
                var th=15+gn*20+Math.sin(ti)*5;
                // 树干
                ctx.fillStyle='#5C3317';ctx.fillRect(tx-2,ty-th,4,th);
                ctx.fillStyle='rgba(80,40,10,0.3)';ctx.fillRect(tx+2,ty-th+3,2,th-3);
                // 树冠
                var crownR=6+gn*8;
                var colors=['#1B6B1B','#228B22','#2E8B57','#32CD32'];
                [{dx:0,dy:-th-crownR*0.3,r:crownR},{dx:-crownR*0.4,dy:-th+crownR*0.2,r:crownR*0.7},{dx:crownR*0.4,dy:-th+crownR*0.3,r:crownR*0.65}].forEach(function(l,li){
                    ctx.fillStyle=colors[li];
                    ctx.beginPath();ctx.arc(tx+l.dx+bsw*0.3,ty+l.dy,l.r,0,Math.PI*2);ctx.fill();
                    ctx.fillStyle='rgba(255,255,200,0.06)';
                    ctx.beginPath();ctx.arc(tx+l.dx-l.r*0.2+bsw*0.3,ty+l.dy-l.r*0.2,l.r*0.4,0,Math.PI*2);ctx.fill();
                });
            }
        }

        // 地面雾气（治理后出现）
        if(gn>0.4){
            for(var fi=0;fi<3;fi++){
                var fx=W*0.2+fi*W*0.3;
                var fog=ctx.createRadialGradient(fx,gY+5,0,fx,gY+5,80+fi*30);
                fog.addColorStop(0,'rgba(150,255,180,'+(gn*0.08)+')');
                fog.addColorStop(1,'rgba(150,255,180,0)');
                ctx.fillStyle=fog;ctx.fillRect(0,0,W,H);
            }
        }
    }

    function drawParticles(st){
        var gn=st.veg/70;
        var spd=windMul*(1-gn*0.85)*1.5;
        var pa=st.sand/100;
        particles.forEach(function(p){
            p.x+=p.vx*spd;
            p.y+=p.vy*spd*0.2+Math.sin(time*1.8+p.x*0.008)*0.3;
            p.rot+=p.rotV*spd;
            if(p.x>W+15){p.x=-15;p.y=H*0.48+Math.random()*H*0.35;}
            if(p.y<H*0.45||p.y>H)p.y=H*0.48+Math.random()*H*0.35;
            if(pa>0.03){
                ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
                ctx.globalAlpha=p.op*pa*0.8;
                ctx.fillStyle='rgb('+(190+Math.random()*30)+','+(160+Math.random()*20)+','+(110+Math.random()*20)+')';
                ctx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);
                ctx.restore();
            }
        });
        ctx.globalAlpha=1;

        // 风线
        if(spd>0.15){
            for(var fi=0;fi<8;fi++){
                var fx=(time*35*spd+fi*W/7)%(W+100)-50;
                var fy=H*0.5+fi*25+Math.sin(fi*2.5)*10;
                ctx.strokeStyle='rgba(255,255,255,'+(spd*0.06)+')';ctx.lineWidth=1;
                ctx.beginPath();ctx.moveTo(fx,fy);
                ctx.quadraticCurveTo(fx+15,fy-3,fx+30,fy);
                ctx.stroke();
            }
        }

        // 飞鸟（治理后出现）
        if(gn>0.35){
            var bOp=Math.min(1,(gn-0.35)*3);
            for(var bi=0;bi<4;bi++){
                var bx=(time*12+bi*W*0.25)%(W+60)-30;
                var by=H*0.15+bi*18+Math.sin(time*0.8+bi*2)*8;
                ctx.strokeStyle='rgba(0,0,0,'+(bOp*0.4)+')';ctx.lineWidth=1.2;
                var wingA=Math.sin(time*3+bi)*4;
                ctx.beginPath();ctx.moveTo(bx-5,by-1);ctx.quadraticCurveTo(bx-2,by-wingA,bx,by);
                ctx.quadraticCurveTo(bx+2,by-wingA,bx+5,by-1);ctx.stroke();
            }
        }
    }

    function draw(){
        if(!running){requestAnimationFrame(draw);return;}
        time+=0.016;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
        var st=getStage(progress);
        drawSky(st);drawGround(st);drawParticles(st);

        document.getElementById('wtYear').textContent=st.year+'年';
        document.getElementById('wtChipWind').textContent='\u{1F32C}\uFE0F 风速: '+st.wind.toFixed(1)+'m/s';
        document.getElementById('wtChipSand').textContent='\u{1F3DC}\uFE0F 沙化: '+st.desert+'万km²';
        document.getElementById('wtChipVeg').textContent='\u{1F331} 覆盖率: '+st.veg.toFixed(1)+'%';
        document.getElementById('wtChipRain').textContent='\u{1F4A7} 降水: '+st.rain+'mm';
        document.getElementById('wtWindVal').textContent=st.wind.toFixed(1)+'m/s';windSlider.value=Math.round(st.wind/5*100);

        // ===== 治理进度条（增强版）=====
        var barX=15,barY=H-38,barW=W-30,barH=10;
        var prog=(st.veg/38.5)*100;

        // 进度条光晕
        ctx.shadowColor='rgba(34,197,94,0.3)';ctx.shadowBlur=8;
        ctx.fillStyle='rgba(255,255,255,0.06)';
        ctx.beginPath();ctx.roundRect(barX,barY,barW,barH,5);ctx.fill();
        ctx.shadowBlur=0;

        // 填充（带发光）
        if(prog>0){
            var barGrad=ctx.createLinearGradient(barX,0,barX+barW*prog/100,0);
            barGrad.addColorStop(0,'#16a34a');barGrad.addColorStop(0.5,'#22c55e');barGrad.addColorStop(1,'#86efac');
            ctx.shadowColor='rgba(34,197,94,0.4)';ctx.shadowBlur=10;
            ctx.fillStyle=barGrad;
            ctx.beginPath();ctx.roundRect(barX,barY,barW*prog/100,barH,5);ctx.fill();
            ctx.shadowBlur=0;
            // 末端高光
            var endX=barX+barW*prog/100;
            ctx.fillStyle='rgba(255,255,255,0.3)';
            ctx.beginPath();ctx.arc(endX,barY+barH/2,barH/2+2,0,Math.PI*2);ctx.fill();
        }

        // 百分比文字
        ctx.fillStyle='rgba(255,255,255,0.85)';ctx.font='bold 11px sans-serif';ctx.textAlign='left';
        ctx.fillText('治沙进度 '+Math.round(prog)+'%',barX,barY-6);

        // 右侧沙尘暴天数
        ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';ctx.textAlign='right';
        ctx.fillText('沙尘暴 '+st.storms+'天/年',barX+barW,barY-6);

        // 年份刻度
        ctx.fillStyle='rgba(255,255,255,0.25)';ctx.font='9px sans-serif';ctx.textAlign='center';
        [1960,1978,1999,2005,2020,2025].forEach(function(yr){
            var xp=barX+barW*((yr-1960)/65);
            ctx.fillText(yr,xp,barY+barH+14);
            ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillRect(xp,barY+barH+1,1,5);
            ctx.fillStyle='rgba(255,255,255,0.25)';
        });

        // 数据来源
        ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font='9px sans-serif';ctx.textAlign='left';
        ctx.fillText('数据来源：国家林草局·中国荒漠化公报·三北工程报告',barX,H-5);

        // ===== 历史事件弹窗（滑动到对应年份自动显示）=====
        var events=[
            {y:0.09,t:'1966',icon:'🏚️',title:'大规模开荒',desc:'"以粮为纲"政策下西北大规模开垦草原，沙化加速扩展',c:'#ef4444'},
            {y:0.24,t:'1978',icon:'🌲',title:'三北防护林启动',desc:'规划73年·横跨13省区·被誉为"绿色长城"',c:'#fbbf24'},
            {y:0.38,t:'1988',icon:'🧱',title:'库布其治理开始',desc:'草方格固沙技术首次大规模应用',c:'#f97316'},
            {y:0.47,t:'1999',icon:'🌾',title:'退耕还林还草',desc:'国家投入超5000亿元·3200万农户受益',c:'#f97316'},
            {y:0.53,t:'2002',icon:'📉',title:'首次净减少',desc:'荒漠化面积首次实现历史性转折',c:'#60a5fa'},
            {y:0.65,t:'2005',icon:'📊',title:'沙化逆转确认',desc:'年均减少1200km²·治沙进入快车道',c:'#60a5fa'},
            {y:0.76,t:'2017',icon:'🏆',title:'联合国认可',desc:'库布其模式被确定为"全球治沙样本"',c:'#fbbf24'},
            {y:0.82,t:'2020',icon:'🌳',title:'毛乌素33%覆盖',desc:'即将"消失"的沙漠·世界治沙奇迹',c:'#34d399'},
            {y:0.92,t:'2025',icon:'🤖',title:'智能治沙时代',desc:'AI种树准确率85%+·无人机日播600亩',c:'#a78bfa'}
        ];
        // 检测当前年份对应的事件
        var curYear=st.year;
        var matchedEvent=null;
        events.forEach(function(ev){
            var evYear=1960+ev.y*65;
            if(Math.abs(curYear-evYear)<2)matchedEvent=ev;
        });
        if(matchedEvent){
            var cardW=Math.min(W*0.7,320),cardH=65;
            var cardX=W/2-cardW/2,cardY=H*0.06;
            // 卡片背景
            ctx.fillStyle='rgba(10,20,10,0.85)';
            ctx.beginPath();ctx.roundRect(cardX,cardY,cardW,cardH,12);ctx.fill();
            ctx.strokeStyle=matchedEvent.c;ctx.lineWidth=1.5;
            ctx.beginPath();ctx.roundRect(cardX,cardY,cardW,cardH,12);ctx.stroke();
            // 左侧图标
            ctx.fillStyle=matchedEvent.c;ctx.font='24px sans-serif';ctx.textAlign='center';
            ctx.fillText(matchedEvent.icon,cardX+25,cardY+30);
            // 年份标签
            ctx.fillStyle=matchedEvent.c;ctx.font='bold 12px sans-serif';ctx.textAlign='left';
            ctx.fillText(matchedEvent.t+'年',cardX+50,cardY+18);
            // 标题
            ctx.fillStyle='#fff';ctx.font='bold 13px sans-serif';
            ctx.fillText(matchedEvent.title,cardX+50,cardY+35);
            // 描述
            ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='10px sans-serif';
            ctx.fillText(matchedEvent.desc.substring(0,30),cardX+50,cardY+52);
        }

        // ===== 迷你趋势图（左上角）=====
        var miniX=15,miniY=40,miniW=120,miniH=50;
        ctx.fillStyle='rgba(0,0,0,0.4)';
        ctx.beginPath();ctx.roundRect(miniX,miniY,miniW,miniH,8);ctx.fill();
        ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;
        ctx.beginPath();ctx.roundRect(miniX,miniY,miniW,miniH,8);ctx.stroke();
        // 标题
        ctx.fillStyle='rgba(255,255,255,0.4)';ctx.font='8px sans-serif';ctx.textAlign='left';
        ctx.fillText('趋势',miniX+5,miniY+10);
        // 沙化曲线（红色）
        ctx.strokeStyle='rgba(239,68,68,0.6)';ctx.lineWidth=1.5;
        ctx.beginPath();
        for(var ti=0;ti<realData.length;ti++){
            var tx=miniX+5+(miniW-10)*(ti/(realData.length-1));
            var ty=miniY+15+(miniH-20)*(1-realData[ti].desert/270);
            if(ti===0)ctx.moveTo(tx,ty);else ctx.lineTo(tx,ty);
        }
        ctx.stroke();
        // 植被曲线（绿色）
        ctx.strokeStyle='rgba(34,197,94,0.7)';ctx.lineWidth=1.5;
        ctx.beginPath();
        for(var ti2=0;ti2<realData.length;ti2++){
            var tx2=miniX+5+(miniW-10)*(ti2/(realData.length-1));
            var ty2=miniY+15+(miniH-20)*(1-realData[ti2].veg/45);
            if(ti2===0)ctx.moveTo(tx2,ty2);else ctx.lineTo(tx2,ty2);
        }
        ctx.stroke();
        // 当前位置标记（跟随植被曲线）
        var curIdx=progress*(realData.length-1);
        var curFloor=Math.floor(curIdx);
        var curFrac=curIdx-curFloor;
        var curVeg,curDesert;
        if(curFloor>=realData.length-1){curVeg=realData[realData.length-1].veg;curDesert=realData[realData.length-1].desert;}
        else{curVeg=realData[curFloor].veg+(realData[curFloor+1].veg-realData[curFloor].veg)*curFrac;curDesert=realData[curFloor].desert+(realData[curFloor+1].desert-realData[curFloor].desert)*curFrac;}
        var curX=miniX+5+(miniW-10)*progress;
        var curYVeg=miniY+15+(miniH-20)*(1-curVeg/45);
        var curYDesert=miniY+15+(miniH-20)*(1-curDesert/270);
        // 竖线
        ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(curX,miniY+12);ctx.lineTo(curX,miniY+miniH-5);ctx.stroke();
        // 植被点（绿色）
        ctx.fillStyle='rgba(34,197,94,0.9)';
        ctx.beginPath();ctx.arc(curX,curYVeg,3,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(34,197,94,0.3)';
        ctx.beginPath();ctx.arc(curX,curYVeg,5,0,Math.PI*2);ctx.fill();
        // 沙化点（红色）
        ctx.fillStyle='rgba(239,68,68,0.9)';
        ctx.beginPath();ctx.arc(curX,curYDesert,3,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(239,68,68,0.3)';
        ctx.beginPath();ctx.arc(curX,curYDesert,5,0,Math.PI*2);ctx.fill();
        // 图例
        ctx.fillStyle='rgba(239,68,68,0.6)';ctx.fillRect(miniX+5,miniY+miniH-3,8,2);
        ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='7px sans-serif';ctx.fillText('沙化',miniX+15,miniY+miniH-1);
        ctx.fillStyle='rgba(34,197,94,0.7)';ctx.fillRect(miniX+45,miniY+miniH-3,8,2);
        ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillText('植被',miniX+55,miniY+miniH-1);

        requestAnimationFrame(draw);
    }

    slider.addEventListener('input',function(){progress=this.value/100;});
    windSlider.addEventListener('input',function(){windMul=this.value/100;});
    var obs=new IntersectionObserver(function(e){running=e[0].isIntersecting;},{threshold:0});
    obs.observe(document.getElementById('page-wt'));
    resize();window.addEventListener('resize',resize);draw();
})();

// --- 2. 地形剖面 ---
(function(){
    var canvas=document.getElementById('csCanvas');
    if(!canvas)return;
    var box=document.getElementById('csBox');
    var ctx=canvas.getContext('2d');
    var W,H,dpr;var selStart=null,selEnd=null,isSelecting=false;var time=0;

    function resize(){
        dpr=window.devicePixelRatio||1;
        var rect=box.getBoundingClientRect();
        W=rect.width;H=rect.height;
        canvas.width=W*dpr;canvas.height=H*dpr;
        canvas.style.width=W+'px';canvas.style.height=H+'px';
    }

    function draw(){
        time+=0.016;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
        var sky=ctx.createLinearGradient(0,0,0,H*0.35);
        sky.addColorStop(0,'#1a3050');sky.addColorStop(1,'#4A90D9');
        ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.35);
        ctx.fillStyle='rgba(100,120,80,0.3)';
        ctx.beginPath();ctx.moveTo(0,H*0.35);
        for(var x=0;x<=W;x+=20)ctx.lineTo(x,H*0.35+Math.sin(x*0.005)*20+Math.sin(x*0.012)*10);
        ctx.lineTo(W,H*0.4);ctx.lineTo(0,H*0.4);ctx.closePath();ctx.fill();
        var layers=[
            {y:H*0.35,color:'#d4a574',name:'表层沙土'},
            {y:H*0.48,color:'#c19a6b',name:'细沙层'},
            {y:H*0.58,color:'#a0785a',name:'粉砂层'},
            {y:H*0.68,color:'#8B7355',name:'粘土层'},
            {y:H*0.78,color:'#6d5a45',name:'母质层'},
            {y:H*0.88,color:'#4a3018',name:'地下水层'},
            {y:H,color:'#2a1a0e',name:'基岩层'}
        ];
        for(var i=0;i<layers.length-1;i++){
            var l=layers[i];var next=layers[i+1];
            var grad=ctx.createLinearGradient(0,l.y,0,next.y);
            grad.addColorStop(0,l.color);grad.addColorStop(1,next.color);
            ctx.fillStyle=grad;ctx.fillRect(0,l.y,W,next.y-l.y);
            ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(0,next.y);ctx.lineTo(W,next.y);ctx.stroke();
            ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='11px sans-serif';
            ctx.textAlign='left';ctx.fillText(l.name,15,l.y+(next.y-l.y)/2+4);
        }
        ctx.strokeStyle='rgba(139,105,20,0.3)';ctx.lineWidth=1.5;
        for(var ri=0;ri<8;ri++){
            var rx=W*0.1+ri*W*0.1;
            ctx.beginPath();ctx.moveTo(rx,H*0.38);
            ctx.quadraticCurveTo(rx+Math.sin(ri)*20,H*0.55,rx+Math.sin(ri+1)*15,H*0.7);
            ctx.stroke();
        }
        ctx.strokeStyle='rgba(52,152,219,0.4)';ctx.lineWidth=2;ctx.setLineDash([8,4]);
        ctx.beginPath();ctx.moveTo(0,H*0.85);ctx.lineTo(W,H*0.85);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle='rgba(52,152,219,0.5)';ctx.font='bold 11px sans-serif';
        ctx.textAlign='right';ctx.fillText('~ 地下水位 ~',W-15,H*0.84);
        if(selStart&&selEnd){
            var sx=Math.min(selStart.x,selEnd.x),sy=Math.min(selStart.y,selEnd.y);
            var sw=Math.abs(selEnd.x-selStart.x),sh=Math.abs(selEnd.y-selStart.y);
            ctx.strokeStyle='rgba(52,211,153,0.8)';ctx.lineWidth=2;ctx.setLineDash([6,3]);ctx.strokeRect(sx,sy,sw,sh);ctx.setLineDash([]);
            ctx.fillStyle='rgba(52,211,153,0.08)';ctx.fillRect(sx,sy,sw,sh);
        }
        requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousedown',function(e){
        e.stopPropagation();
        var rect=canvas.getBoundingClientRect();
        selStart={x:e.clientX-rect.left,y:e.clientY-rect.top};selEnd=null;isSelecting=true;
    });
    canvas.addEventListener('mousemove',function(e){
        if(!isSelecting)return;
        var rect=canvas.getBoundingClientRect();
        selEnd={x:e.clientX-rect.left,y:e.clientY-rect.top};
    });
    canvas.addEventListener('mouseup',function(e){
        e.stopPropagation();
        if(!isSelecting)return;isSelecting=false;
        if(selStart&&selEnd){
            var dx=Math.abs(selEnd.x-selStart.x),dy=Math.abs(selEnd.y-selStart.y);
            if(dx>3&&dy>3){
                try{showCrossSection(selStart,selEnd);}catch(err){console.error('CrossSection error:',err);}
            }
        }
        selStart=null;selEnd=null;
    });
    canvas.addEventListener('mouseleave',function(){isSelecting=false;selStart=null;selEnd=null;});

    canvas.addEventListener('touchstart',function(e){
        e.stopPropagation();
        var t=e.touches[0],rect=canvas.getBoundingClientRect();
        selStart={x:t.clientX-rect.left,y:t.clientY-rect.top};selEnd=null;isSelecting=true;
    },{passive:false});
    canvas.addEventListener('touchmove',function(e){
        if(!isSelecting)return;
        var t=e.touches[0],rect=canvas.getBoundingClientRect();
        selEnd={x:t.clientX-rect.left,y:t.clientY-rect.top};
    },{passive:true});
    canvas.addEventListener('touchend',function(e){
        e.stopPropagation();
        if(!isSelecting)return;isSelecting=false;
        if(selStart&&selEnd){
            var dx=Math.abs(selEnd.x-selStart.x),dy=Math.abs(selEnd.y-selStart.y);
            if(dx>3&&dy>3){
                try{showCrossSection(selStart,selEnd);}catch(err){console.error('CrossSection error:',err);}
            }
        }
        selStart=null;selEnd=null;
    });

    function showCrossSection(start,end){
        var overlay=document.getElementById('csOverlay');
        var popup=document.getElementById('csPopup');
        var layersDiv=document.getElementById('csLayers');
        var sy=Math.min(start.y,end.y);var ey=Math.max(start.y,end.y);
        var groundY=H*0.35;
        if(ey<groundY){
            document.getElementById('csTitle').textContent='🌤️ 天空区域';
            layersDiv.innerHTML='<div style="text-align:center;padding:2rem;color:var(--text2)"><div style="font-size:3rem;margin-bottom:1rem">☁️</div><p style="font-size:1rem;color:var(--text);margin-bottom:.5rem">此区域为地表以上空间</p><p style="font-size:.85rem;line-height:1.6">请从地表向下框选以查看地质剖面。</p></div>';
            openCS();return;
        }
        var depthRatio=Math.min(1,(ey-groundY)/(H-groundY));
        var sxp=Math.min(start.x,end.x)/W*100;var sw=Math.abs(end.x-start.x)/W*100;
        document.getElementById('csTitle').textContent='纵向地质剖面 ('+Math.round(sxp)+'%~'+Math.round(sxp+sw)+'%  深度'+Math.round(depthRatio*100)+'%)';
        var allLayers=[
            {color:'#d4a574',name:'A层 表层沙土',desc:'干燥松散的风积沙，含水量仅3-5%，有机质<0.5%，风蚀严重。',chips:['含水3-5%','pH 8.5-9.5','有机质<0.5%','沙化成因：风蚀搬运']},
            {color:'#c19a6b',name:'B层 细砂层',desc:'中等粒径沙土，保水能力差。草方格铺设后截留降水，含水量可提升至10-15%。',chips:['含水5-10%','透水性中等','适合固沙植物扎根']},
            {color:'#a0785a',name:'C层 粉砂层',desc:'细砂与粉砂混合，有一定保水能力。梭梭、柠条根系主要分布层。',chips:['含水10-20%','根系主要分布区','沙化成因：过度放牧']},
            {color:'#8B7355',name:'D层 粘土层',desc:'粘性隔水层，阻隔水分下渗。改良技术：深松耕作打破犁底层。',chips:['含水20-35%','天然隔水层','改良：深松耕作']},
            {color:'#6d5a45',name:'E层 母质层',desc:'矿物质丰富的半固结层，地下水毛细管上升可达。',chips:['含水35-50%','矿质营养丰富','固沙土层改良关键']},
            {color:'#4a3018',name:'F层 地下水层',desc:'地下水储层，水位深度2-15米。胡杨根系可达20米深此处汲水。',chips:['含水>50%','水位2-15m','深根植物水源']}
        ];
        var maxLayers=Math.max(2,Math.ceil(allLayers.length*depthRatio));
        var layers=allLayers.slice(0,maxLayers);
        if(depthRatio>0.7)layers.push({color:'#2196F3',name:'💧 地下水位线',desc:'地下水储层上界。胡杨等深根树种可穿透上层直达此处汲水。',chips:['水位2-15m','毛细管上升','深根植物水源']});
        layersDiv.innerHTML='';
        layers.forEach(function(l,idx){
            var div=document.createElement('div');
            div.className='cs-layer';
            div.style.opacity='0';div.style.transform='translateX(-15px)';div.style.transition='all 0.35s cubic-bezier(0.34,1.56,0.64,1)';
            div.style.transitionDelay=(idx*0.08)+'s';
            div.innerHTML='<div class="cs-lbar" style="background:'+l.color+'"></div><div class="cs-li"><div class="cs-ln">'+l.name+'</div><div class="cs-ld">'+l.desc+'</div><div class="cs-lchips">'+l.chips.map(function(c){return '<span class="cs-lchip">'+c+'</span>';}).join('')+'</div></div>';
            layersDiv.appendChild(div);
            setTimeout(function(){div.style.opacity='1';div.style.transform='translateX(0)';},30);
        });
        openCS();
    }

    var popupOpenTime=0;
    function openCS(){
        popupOpenTime=Date.now();
        document.getElementById('csOverlay').classList.add('show');
        document.getElementById('csPopup').classList.add('show');
    }
    function closeCS(){
        document.getElementById('csOverlay').classList.remove('show');
        document.getElementById('csPopup').classList.remove('show');
    }
    document.getElementById('csClose').onclick=closeCS;
    document.getElementById('csOverlay').onclick=function(){if(Date.now()-popupOpenTime>300)closeCS();};
    document.getElementById('csPopup').onclick=function(e){e.stopPropagation();};
    var obs=new IntersectionObserver(function(e){if(e[0].isIntersecting)resize();},{threshold:0.1});
    obs.observe(document.getElementById('page-cs'));
    resize();window.addEventListener('resize',resize);draw();
})();

// --- 3. (区域缩放已移除) ---

// --- 4. 技术拆解弹窗（带动画）---
var techData={
    caofangge:{icon:'🧱',title:'草方格沙障',sub:'中国独创的治沙核心技术',steps:[
        {t:'麦草铺设',d:'将麦草均匀铺在沙丘表面，1m×1m方格，露出沙面10-15cm。'},
        {t:'机械压埋',d:'用铁锹将麦草中部压入沙层15-20cm，两端翘起形成地上防风屏障。'},
        {t:'风速降低',d:'草方格可降低近地面风速40-60%，有效阻止沙粒搬运。'},
        {t:'种子萌发',d:'格内播撒梭梭、花棒等种子，保水保肥使存活率提升至60%以上。'},
        {t:'自然腐解',d:'3-5年后麦草腐解转化为有机质，植被已扎根固定流沙。'}
    ]},
    guamu:{icon:'🌿',title:'灌木固沙技术',sub:'生物治沙的核心力量',steps:[
        {t:'选择树种',d:'根据气候土壤条件，选择梭梭、柠条、沙棘等耐旱灌木。'},
        {t:'整地准备',d:'在草方格内挖穴，穴深30-40cm，施入有机底肥。'},
        {t:'栽植灌木',d:'春季或秋季栽植，每穴1-2株，根系舒展，覆土踩实。'},
        {t:'根系扩展',d:'1年后根系深达2-5米，水平扩展6-12米，形成地下固沙网络。'},
        {t:'生态演替',d:'灌木改善微气候，吸引草本定居，形成草-灌-乔群落。'}
    ]},
    guangfu:{icon:'☀️',title:'光伏治沙模式',sub:'板上发电、板下固沙、农牧互补',steps:[
        {t:'光伏板铺设',d:'在沙地上安装太阳能板，板间距2-3米，形成遮阴区域。'},
        {t:'板下遮阴',d:'遮挡阳光减少蒸发50%以上，降温3-5°C，利于植物生长。'},
        {t:'板下种植',d:'板间种牧草药材（肉苁蓉），板下种耐阴灌木。'},
        {t:'固沙效果',d:'光伏板降风速30%，板下植被进一步固沙，发电收益反哺治沙。'},
        {t:'农牧互补',d:'牧草养畜，药材创收，发电盈利，年GDP超100亿元。'}
    ]},
    feibo:{icon:'🛩️',title:'飞播造林技术',sub:'智能无人机高效治沙',steps:[
        {t:'选种配比',d:'根据区域气候选配梭梭、沙蒿、花棒等种子混合。'},
        {t:'航线规划',d:'卫星遥感+AI分析最优播种区域，规划无人机航线。'},
        {t:'精准播种',d:'无人机搭载种子胶囊均匀撒播，日播面积可达600亩。'},
        {t:'智能监控',d:'卫星遥感监测发芽率，AI分析生长状态，精准补播。'},
        {t:'规模造林',d:'年均可完成10万亩飞播造林，效率是人工50倍。'}
    ]}
};

window.showTechDissect=function(key){
    var td=techData[key];if(!td)return;
    var ov=document.getElementById('tdOv');var md=document.getElementById('tdMd');var content=document.getElementById('tdContent');

    // 动画Canvas HTML
    var canvasHtml='<div id="techAnimBox" style="width:100%;height:220px;border-radius:12px;overflow:hidden;margin-bottom:1rem;position:relative;background:#0a1a0a;border:1px solid rgba(52,211,153,0.15)"><canvas id="techAnimCanvas" style="width:100%;height:100%"></canvas></div>';

    var stepsHtml=td.steps.map(function(s,i){return '<div class="td-step"><div class="td-sn">'+(i+1)+'</div><div class="td-sc"><div class="td-st2">'+s.t+'</div><div class="td-sd">'+s.d+'</div></div></div>';}).join('');
    content.innerHTML=canvasHtml+'<div class="td-icon">'+td.icon+'</div><h3>'+td.title+'</h3><div class="td-sub">'+td.sub+'</div><div class="td-steps">'+stepsHtml+'</div>';
    ov.classList.add('show');md.classList.add('show');
    ov.style.background='rgba(0,0,0,0.3)';ov.style.backdropFilter='none';
    md.style.background='linear-gradient(145deg,#1c3828 0%,#224030 50%,#264432 100%)';
    md.style.border='1px solid rgba(52,211,153,0.35)';
    md.style.boxShadow='0 25px 90px rgba(0,0,0,0.5),0 0 60px rgba(52,211,153,0.08)';
    md.style.backdropFilter='none';

    // 启动动画
    startTechAnimation(key);

    // 步骤入场
    var steps=content.querySelectorAll('.td-step');
    steps.forEach(function(el,i){
        el.style.opacity='0';el.style.transform='translateX(-25px) scale(0.95)';
        el.style.transition='all 0.7s cubic-bezier(0.34,1.56,0.64,1)';
        el.style.transitionDelay=(0.4+i*0.25)+'s';
        el.style.background='rgba(52,211,153,0.06)';
        el.style.border='1px solid rgba(52,211,153,0.12)';
        setTimeout(function(){el.style.opacity='1';el.style.transform='translateX(0) scale(1)';},50);
    });
    content.querySelectorAll('.td-sd').forEach(function(el){el.style.color='rgba(255,255,255,0.7)';});
    content.querySelectorAll('.td-st2').forEach(function(el){el.style.color='rgba(255,255,255,0.95)';el.style.fontWeight='700';});
};

var techAnimRunning=false,techAnimTime=0,techAnimKey='';

function startTechAnimation(key){
    techAnimRunning=true;techAnimTime=0;techAnimKey=key;
    var canvas=document.getElementById('techAnimCanvas');
    if(!canvas)return;
    var box=document.getElementById('techAnimBox');
    var dpr=window.devicePixelRatio||1;
    var W=box.clientWidth||380,H=box.clientHeight||220;
    canvas.width=W*dpr;canvas.height=H*dpr;
    canvas.style.width=W+'px';canvas.style.height=H+'px';
    var ctx=canvas.getContext('2d');
    ctx.scale(dpr,dpr);

    function draw(){
        if(!techAnimRunning)return;
        techAnimTime+=0.012;
        ctx.setTransform(dpr,0,0,dpr,0,0);
        ctx.clearRect(0,0,W,H);

        if(techAnimKey==='caofangge') drawCaofanggeAnim(ctx,W,H);
        else if(techAnimKey==='guamu') drawGuamuAnim(ctx,W,H);
        else if(techAnimKey==='guangfu') drawGuangfuAnim(ctx,W,H);
        else if(techAnimKey==='feibo') drawFeiboAnim(ctx,W,H);

        requestAnimationFrame(draw);
    }
    draw();
}

function stopTechAnim(){techAnimRunning=false;}

// 草方格动画：麦草从上方落下→压入沙中→形成网格→风速降低
// 草方格动画：增强版
// 草方格动画：优化版（平滑过渡+阶段进度条）
function drawCaofanggeAnim(ctx,W,H){
    var t=techAnimTime;
    var gY=H*0.52;
    // 天空
    var sky=ctx.createLinearGradient(0,0,0,gY);
    sky.addColorStop(0,'#1a2a40');sky.addColorStop(0.6,'#4a6a8a');sky.addColorStop(1,'#7aa0c0');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,gY);
    for(var ci=0;ci<3;ci++){
        var cx=(t*8+ci*W*0.4)%W;
        ctx.fillStyle='rgba(255,255,255,0.15)';
        ctx.beginPath();ctx.ellipse(cx,20+ci*15,40+ci*10,12,0,0,Math.PI*2);ctx.fill();
    }
    // 沙地
    var gg=ctx.createLinearGradient(0,gY,0,H);
    gg.addColorStop(0,'#e0c8a0');gg.addColorStop(0.3,'#d4b896');gg.addColorStop(0.7,'#b8960B');gg.addColorStop(1,'#8B6914');
    ctx.fillStyle=gg;ctx.fillRect(0,gY,W,H-gY);
    ctx.strokeStyle='rgba(160,130,80,0.15)';ctx.lineWidth=0.8;
    for(var i=0;i<5;i++){ctx.beginPath();for(var x=0;x<W;x+=3)ctx.lineTo(x,gY+8+i*18+Math.sin(x*0.008+i+t*0.2)*4);ctx.stroke();}
    ctx.fillStyle='rgba(200,170,120,0.15)';ctx.beginPath();ctx.moveTo(0,gY+5);
    ctx.quadraticCurveTo(W*0.2,gY-15,W*0.4,gY+3);ctx.quadraticCurveTo(W*0.6,gY+15,W*0.8,gY+5);ctx.quadraticCurveTo(W*0.9,gY-5,W,gY+8);
    ctx.lineTo(W,gY+20);ctx.lineTo(0,gY+20);ctx.closePath();ctx.fill();

    var phase=t%4.5;

    // 阶段1：工人铺设麦草
    if(phase<1.5){
        var workerX=W*0.5+Math.sin(phase*3)*20;
        var workerOp=Math.min(1,phase*2);
        ctx.fillStyle='rgba(60,40,20,'+workerOp*0.6+')';
        ctx.beginPath();ctx.arc(workerX,gY-25,5,0,Math.PI*2);ctx.fill();
        ctx.fillRect(workerX-3,gY-20,6,15);ctx.fillRect(workerX-6,gY-5,4,8);ctx.fillRect(workerX+2,gY-5,4,8);
        for(var si=0;si<8;si++){
            var sx=workerX+(si-3)*12;var sy=gY-15+Math.min(phase*50,50)+si*2;var op=Math.min(1,phase*2);
            ctx.strokeStyle='rgba(200,170,80,'+op*0.8+')';ctx.lineWidth=2;
            ctx.beginPath();ctx.moveTo(sx-10,sy);ctx.lineTo(sx+10,sy);ctx.stroke();
            ctx.fillStyle='rgba(220,190,80,'+op*0.7+')';ctx.beginPath();ctx.ellipse(sx+10,sy,4,2.5,0.2,0,Math.PI*2);ctx.fill();
            var sway=Math.sin(t*3+si)*1.5;
            ctx.strokeStyle='rgba(180,150,60,'+op*0.4+')';ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(sx+8,sy);ctx.quadraticCurveTo(sx+12+sway,sy-4,sx+14+sway,sy-6);ctx.stroke();
        }
    }
    // 阶段2：铁锹压埋
    if(phase>=1.5&&phase<2.5){
        var pp=(phase-1.5);var toolX=W*0.5+pp*80-40;
        ctx.save();ctx.translate(toolX,gY-30);ctx.rotate(-0.3+pp*0.2);
        ctx.fillStyle='rgba(120,100,80,0.7)';ctx.fillRect(-2,-25,4,25);
        ctx.fillStyle='rgba(100,80,60,0.8)';ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(8,0);ctx.lineTo(4,12);ctx.lineTo(-4,12);ctx.closePath();ctx.fill();
        ctx.restore();
        var pressOp=Math.min(1,pp*2);
        for(var pi2=0;pi2<6;pi2++){
            var px2=W*0.15+pi2*(W*0.7/5);
            ctx.strokeStyle='rgba(200,170,80,'+pressOp*0.8+')';ctx.lineWidth=2;
            ctx.beginPath();ctx.moveTo(px2-8,gY+2);ctx.lineTo(px2+8,gY+12);ctx.stroke();
            if(pp>0.3){ctx.fillStyle='rgba(200,170,120,'+(pressOp*0.3)+')';ctx.beginPath();ctx.arc(px2,gY+14,3+pp*2,0,Math.PI*2);ctx.fill();}
        }
    }
    // 阶段3：网格形成
    if(phase>=2.5&&phase<3.5){
        var gridOp=Math.min(1,(phase-2.5)*2);var gs=38;
        for(var gy=gY+12;gy<H-8;gy+=gs){var lp=Math.min(1,gridOp*3-((gy-gY-12)/gs)*0.3);if(lp<=0)continue;ctx.strokeStyle='rgba(180,150,60,'+lp*0.85+')';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(W*0.08,gy);ctx.lineTo(W*0.08+(W*0.84)*lp,gy);ctx.stroke();}
        for(var gx=W*0.08+gs;gx<W*0.92;gx+=gs){var lp2=Math.min(1,gridOp*3-((gx-W*0.08)/gs)*0.2);if(lp2<=0)continue;ctx.strokeStyle='rgba(180,150,60,'+lp2*0.85+')';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(gx,gY+12);ctx.lineTo(gx,gY+12+(H-gY-20)*lp2);ctx.stroke();}
        if(gridOp>0.5){for(var sx2=W*0.08+gs/2;sx2<W*0.92;sx2+=gs){for(var sy2=gY+18+gs/2;sy2<H-12;sy2+=gs){ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(sx2-gs/2+3,sy2-gs/2+3,gs-6,gs-6);}}}
    }
    // 阶段4：草芽萌发
    if(phase>=3.5){
        var germP=Math.min(1,(phase-3.5)*1.5);var gs2=38;
        for(var bx=W*0.08+gs2/2;bx<W*0.92;bx+=gs2){
            for(var by=gY+18+gs2/2;by<H-12;by+=gs2){
                var h=germP*(4+Math.sin(bx*0.1+by*0.1)*3);var sway2=Math.sin(t*1.5+bx*0.05)*2*germP;
                ctx.strokeStyle='rgba(80,140,40,'+germP*0.7+')';ctx.lineWidth=1.2;
                ctx.beginPath();ctx.moveTo(bx,by);ctx.quadraticCurveTo(bx+sway2,by-h*0.6,bx+sway2*0.7,by-h);ctx.stroke();
                if(h>4){ctx.fillStyle='rgba(50,130,30,'+germP*0.6+')';ctx.beginPath();ctx.ellipse(bx+sway2*0.7-3,by-h+2,3*germP,2,-0.3,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(bx+sway2*0.7+3,by-h+3,2.5*germP,1.8,0.3,0,Math.PI*2);ctx.fill();}
            }
        }
    }
    // 风沙粒子
    var pCount=phase<2?25:phase<3?12:4;
    for(var pi=0;pi<pCount;pi++){var px=(t*50+pi*47)%W;var py=gY+5+Math.sin(t*1.5+pi)*12;ctx.fillStyle='rgba(200,170,120,'+(0.3)+')';ctx.beginPath();ctx.arc(px,py,1.5,0,Math.PI*2);ctx.fill();}
    // 标签+进度条
    var labels=['① 铺设麦草','② 铁锹压埋','③ 形成网格','④ 草芽萌发'];
    var li=Math.min(3,Math.floor(phase));
    ctx.fillStyle='rgba(0,0,0,0.65)';ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.fill();
    ctx.strokeStyle='rgba(110,231,183,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.stroke();
    ctx.fillStyle='#6ee7b7';ctx.font='bold 12px sans-serif';ctx.textAlign='left';ctx.fillText(labels[li],20,30);
    // 阶段进度条
    var barY2=H-15;ctx.fillStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.roundRect(10,barY2,W-20,6,3);ctx.fill();
    ctx.fillStyle='rgba(110,231,183,0.6)';ctx.beginPath();ctx.roundRect(10,barY2,(W-20)*phase/4.5,6,3);ctx.fill();
}

// 灌木动画：增强版
// 灌木动画：优化版
function drawGuamuAnim(ctx,W,H){
    var t=techAnimTime;
    var gY=H*0.42;
    // 天空
    var sky=ctx.createLinearGradient(0,0,0,gY);
    sky.addColorStop(0,'#2a4a2a');sky.addColorStop(0.6,'#4a7a4a');sky.addColorStop(1,'#6aaa6a');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,gY);
    ctx.fillStyle='rgba(60,100,60,0.2)';ctx.beginPath();ctx.moveTo(0,gY);ctx.quadraticCurveTo(W*0.3,gY-25,W*0.5,gY-5);ctx.quadraticCurveTo(W*0.7,gY-20,W,gY);ctx.lineTo(W,gY+10);ctx.lineTo(0,gY+10);ctx.closePath();ctx.fill();
    // 地面
    var layerDefs=[{y:gY,c1:'#c4a882',c2:'#b8960B'},{y:gY+35,c1:'#a0785a',c2:'#8B7355'},{y:gY+70,c1:'#8B7355',c2:'#6d5a45'},{y:gY+100,c1:'#6d5a45',c2:'#4a3018'},{y:H,c1:'#4a3018',c2:'#2a1a0e'}];
    layerDefs.forEach(function(l,i){var next=layerDefs[i+1]||{y:H};var gg=ctx.createLinearGradient(0,l.y,0,next.y);gg.addColorStop(0,l.c1);gg.addColorStop(1,l.c2);ctx.fillStyle=gg;ctx.fillRect(0,l.y,W,next.y-l.y);});
    ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
    layerDefs.forEach(function(l){ctx.beginPath();ctx.moveTo(0,l.y);ctx.lineTo(W,l.y);ctx.stroke();});ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.15)';ctx.font='9px sans-serif';ctx.textAlign='left';
    ['表层沙土','细砂层','粉砂层','粘土层','母质层'].forEach(function(l,i){ctx.fillText(l,8,gY+i*35+20);});

    var plantX=W*0.5;var phase=t%5.5;

    // 阶段1：挖穴
    if(phase<1.2){
        var hp=Math.min(1,phase/1.2);
        ctx.fillStyle='rgba(100,80,50,'+hp*0.4+')';ctx.beginPath();ctx.ellipse(plantX,gY+3,12+hp*8,hp*15,0,0,Math.PI*2);ctx.fill();
        for(var di=0;di<5;di++){var da=di*Math.PI/5-0.5;var dist=hp*(15+di*5);ctx.fillStyle='rgba(160,130,80,'+hp*0.5+')';ctx.beginPath();ctx.arc(plantX+Math.cos(da)*dist,gY-5-Math.abs(Math.sin(da))*dist*0.5,2+di%2,0,Math.PI*2);ctx.fill();}
        ctx.fillStyle='rgba(52,211,153,'+hp*0.8+')';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('挖穴 30-40cm',plantX,gY-15);
    }
    // 阶段2：栽植
    if(phase>=1.2&&phase<2.2){
        var pp=(phase-1.2);
        ctx.fillStyle='#5C3317';ctx.fillRect(plantX-2.5,gY-pp*20,5,pp*20);
        ctx.fillStyle='#228B22';ctx.beginPath();ctx.arc(plantX,gY-pp*22,5+pp*3,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(34,139,34,0.5)';ctx.beginPath();ctx.arc(plantX-4,gY-pp*20,3+pp*2,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(100,80,50,'+(1-pp)*0.3+')';ctx.beginPath();ctx.ellipse(plantX,gY+3,12,6,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(52,211,153,0.8)';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('栽植灌木',plantX,gY-35);
    }
    // 阶段3：根系扩展
    if(phase>=2.2&&phase<3.8){
        var rp=Math.min(1,(phase-2.2)/1.6);
        ctx.strokeStyle='rgba(160,120,60,'+rp*0.7+')';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(plantX,gY+2);ctx.bezierCurveTo(plantX+2,gY+rp*30,plantX-1,gY+rp*60,plantX,gY+rp*90);ctx.stroke();
        for(var ri=0;ri<8;ri++){var rStart=ri*0.12;if(rp<rStart)continue;var rProg=Math.min(1,(rp-rStart)/0.7);var ra=ri*Math.PI/4+0.2;var rl=rProg*(25+ri*6);var ry=gY+8+ri*10;ctx.strokeStyle='rgba(140,100,50,'+rp*0.5+')';ctx.lineWidth=1.5-ri*0.1;ctx.beginPath();ctx.moveTo(plantX,ry);ctx.bezierCurveTo(plantX+Math.cos(ra)*rl*0.3,ry+5,plantX+Math.cos(ra)*rl*0.7,ry+Math.sin(ra)*8,plantX+Math.cos(ra)*rl,ry+12);ctx.stroke();}
        ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.setLineDash([2,2]);
        for(var di2=2;di2<=8;di2+=2){var dy=gY+di2*11;ctx.beginPath();ctx.moveTo(plantX+50,dy);ctx.lineTo(plantX+70,dy);ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(di2+'m',plantX+73,dy+3);}
        ctx.setLineDash([]);
        ctx.fillStyle='rgba(52,211,153,0.7)';ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.fillText('根系深达 '+Math.round(rp*8)+' 米',plantX,gY-15);
    }
    // 阶段4：地上生长
    if(phase>=3.8){
        var gp=Math.min(1,(phase-3.8)/1.7);
        ctx.fillStyle='#5C3317';ctx.fillRect(plantX-3,gY-gp*25,6,gp*25);
        var crownR=6+gp*18;
        [{dx:0,dy:-28-gp*5,r:crownR,c:'#1a6b1a'},{dx:-crownR*0.4,dy:-22,r:crownR*0.75,c:'#228B22'},{dx:crownR*0.4,dy:-20,r:crownR*0.7,c:'#2E8B57'},{dx:0,dy:-35-gp*3,r:crownR*0.6,c:'#32CD32'}].forEach(function(l){ctx.fillStyle=l.c;ctx.beginPath();ctx.arc(plantX+l.dx,gY+l.dy,l.r,0,Math.PI*2);ctx.fill();});
        var rangeR=gp*55;ctx.strokeStyle='rgba(52,211,153,'+(gp*0.25)+')';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);ctx.beginPath();ctx.ellipse(plantX,gY+5,rangeR,rangeR*0.3,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
        ctx.fillStyle='rgba(52,211,153,'+gp*0.6+')';ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText('固沙范围 '+Math.round(gp*10)+'m²',plantX,gY+rangeR*0.3+15);
    }
    // 标签+进度
    var labels=['① 挖穴整地','② 栽植灌木','③ 根系扩展','④ 生长固沙','⑤ 生态演替'];
    var li=Math.min(4,Math.floor(phase));
    ctx.fillStyle='rgba(0,0,0,0.65)';ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.fill();
    ctx.strokeStyle='rgba(110,231,183,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.stroke();
    ctx.fillStyle='#6ee7b7';ctx.font='bold 12px sans-serif';ctx.textAlign='left';ctx.fillText(labels[li],20,30);
    var barY2=H-15;ctx.fillStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.roundRect(10,barY2,W-20,6,3);ctx.fill();
    ctx.fillStyle='rgba(110,231,183,0.6)';ctx.beginPath();ctx.roundRect(10,barY2,(W-20)*phase/5.5,6,3);ctx.fill();
}

// 光伏动画：增强版
function drawGuangfuAnim(ctx,W,H){
    var t=techAnimTime;
    var gY=H*0.55;
    // 天空
    var sky=ctx.createLinearGradient(0,0,0,gY);
    sky.addColorStop(0,'#0a1a30');sky.addColorStop(0.5,'#2a5080');sky.addColorStop(1,'#5a90c0');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,gY);
    // 地面
    var gg=ctx.createLinearGradient(0,gY,0,H);
    gg.addColorStop(0,'#e0c8a0');gg.addColorStop(0.4,'#d4b896');gg.addColorStop(1,'#a0785a');
    ctx.fillStyle=gg;ctx.fillRect(0,gY,W,H-gY);

    // 太阳（带光芒）
    var sunX=W*0.85,sunY=H*0.1;
    // 光芒射线
    ctx.save();ctx.translate(sunX,sunY);ctx.rotate(t*0.1);
    for(var ri=0;ri<8;ri++){
        var ra=ri*Math.PI/4;
        ctx.strokeStyle='rgba(255,220,80,'+(0.04+Math.sin(t*2+ri)*0.02)+')';ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(Math.cos(ra)*18,Math.sin(ra)*18);
        ctx.lineTo(Math.cos(ra)*(35+Math.sin(t*3+ri)*5),Math.sin(ra)*(35+Math.sin(t*3+ri)*5));ctx.stroke();
    }
    ctx.restore();
    // 太阳光晕
    for(var si=3;si>0;si--){ctx.fillStyle='rgba(255,220,80,'+(0.03/si)+')';ctx.beginPath();ctx.arc(sunX,sunY,15+si*12,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#FFE082';ctx.beginPath();ctx.arc(sunX,sunY,12,0,Math.PI*2);ctx.fill();

    var phase=t%5;

    // 光伏板（带透视效果）
    var panelCount=5;
    var panelW=55,panelH=30;
    var panelGap=15;
    var startX=W*0.08;
    for(var pi=0;pi<panelCount;pi++){
        var px=startX+pi*(panelW+panelGap);
        var py=gY-18-pi*2;
        var pop=Math.min(1,phase>0?Math.min(1,(phase-pi*0.15)*1.5):0);
        if(pop<=0)continue;
        var popEased=1-Math.pow(1-pop,3);

        // 支架（金属质感）
        ctx.strokeStyle='rgba(120,120,130,'+popEased*0.8+')';ctx.lineWidth=2.5;
        ctx.beginPath();ctx.moveTo(px+8,py+panelH);ctx.lineTo(px+8,gY+2);ctx.stroke();
        ctx.beginPath();ctx.moveTo(px+panelW-8,py+panelH);ctx.lineTo(px+panelW-8,gY+2);ctx.stroke();
        // 横梁
        ctx.strokeStyle='rgba(100,100,110,'+popEased*0.6+')';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(px+5,py+panelH+5);ctx.lineTo(px+panelW-5,py+panelH+5);ctx.stroke();

        // 面板（蓝色渐变+反光）
        var pGrad=ctx.createLinearGradient(px,py,px+panelW,py+panelH);
        pGrad.addColorStop(0,'#1a3a6a');pGrad.addColorStop(0.3,'#2a5a9a');pGrad.addColorStop(0.7,'#3a7aba');pGrad.addColorStop(1,'#1a3a6a');
        ctx.fillStyle=pGrad;
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+panelW,py-3);ctx.lineTo(px+panelW,py+panelH-3);ctx.lineTo(px,py+panelH);ctx.closePath();ctx.fill();
        // 面板边框
        ctx.strokeStyle='rgba(80,130,200,'+popEased*0.5+')';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+panelW,py-3);ctx.lineTo(px+panelW,py+panelH-3);ctx.lineTo(px,py+panelH);ctx.closePath();ctx.stroke();
        // 格子线（3x2）
        ctx.strokeStyle='rgba(80,130,200,'+popEased*0.25+')';ctx.lineWidth=0.5;
        for(var gxi=1;gxi<3;gxi++){ctx.beginPath();ctx.moveTo(px+panelW*gxi/3,py+panelH*gxi/3*0.1);ctx.lineTo(px+panelW*gxi/3,py+panelH+panelH*gxi/3*0.1-3);ctx.stroke();}
        for(var gyi=1;gyi<2;gyi++){ctx.beginPath();ctx.moveTo(px,py+panelH*gyi/2);ctx.lineTo(px+panelW,py+panelH*gyi/2-3);ctx.stroke();}
        // 反光条
        ctx.strokeStyle='rgba(200,230,255,'+popEased*0.15+')';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(px+5,py+5);ctx.lineTo(px+panelW-10,py+2);ctx.stroke();

        // 阴影（随太阳位置偏移）
        if(phase>0.8){
            var shadowOp=Math.min(0.25,(phase-0.8)*0.12);
            ctx.fillStyle='rgba(0,0,0,'+shadowOp+')';
            ctx.beginPath();ctx.moveTo(px+10,gY+2);ctx.lineTo(px+panelW+5,gY+2);ctx.lineTo(px+panelW,gY+12);ctx.lineTo(px+5,gY+12);ctx.closePath();ctx.fill();
        }
    }

    // 阶段3：板下种植（多层植物）
    if(phase>1.8){
        var plantOp=Math.min(1,(phase-1.8)*0.6);
        // 牧草（矮小密集）
        for(var ppi=0;ppi<12;ppi++){
            var ppx=startX+ppi*(panelW+panelGap)*0.5+20;
            var ppy=gY+3+Math.sin(ppi*1.5)*2;
            var ph2=plantOp*(3+ppi%3*2);
            ctx.strokeStyle='rgba(60,130,40,'+plantOp*0.6+')';ctx.lineWidth=1;
            var sway3=Math.sin(t*1.5+ppi)*1.5;
            ctx.beginPath();ctx.moveTo(ppx,ppy);ctx.quadraticCurveTo(ppx+sway3,ppy-ph2*0.6,ppx+sway3*0.5,ppy-ph2);ctx.stroke();
        }
        // 灌木（较高）
        for(var bi=0;bi<4;bi++){
            var bx=startX+bi*(panelW+panelGap)+panelW/2;
            var by=gY+2;
            ctx.fillStyle='rgba(40,100,30,'+plantOp*0.5+')';
            ctx.beginPath();ctx.ellipse(bx,by-4*plantOp,6,4*plantOp,0,0,Math.PI*2);ctx.fill();
        }
        ctx.fillStyle='rgba(52,211,153,'+plantOp*0.5+')';ctx.font='10px sans-serif';ctx.textAlign='center';
        ctx.fillText('板下种植牧草+灌木',W/2,gY+22);
    }

    // 阶段4：发电效果
    if(phase>3){
        var eOp=Math.min(1,(phase-3)*0.6);
        // 电力线（从面板到汇流箱）
        ctx.strokeStyle='rgba(255,220,50,'+eOp*0.4+')';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(startX+panelW/2,gY-15);
        for(var epi=0;epi<panelCount;epi++){
            var epx=startX+epi*(panelW+panelGap)+panelW/2;
            ctx.lineTo(epx,gY-12+Math.sin(t*4+epi)*2);
        }
        ctx.lineTo(W-30,gY-10);ctx.stroke();
        // 电流动画（光点沿线路移动）
        var dotPos=(t*3)%1;
        var dotX=startX+dotPos*(W-30-startX);
        ctx.fillStyle='rgba(255,220,50,'+eOp*0.8+')';
        ctx.beginPath();ctx.arc(dotX,gY-12,3,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(255,220,50,'+eOp*0.3+')';
        ctx.beginPath();ctx.arc(dotX,gY-12,8,0,Math.PI*2);ctx.fill();
        // 闪电符号
        ctx.fillStyle='rgba(255,220,50,'+eOp*0.9+')';ctx.font='20px sans-serif';ctx.textAlign='center';
        ctx.fillText('⚡',W-25,gY-20);
        ctx.fillStyle='rgba(255,220,50,'+eOp*0.6+')';ctx.font='bold 10px sans-serif';
        ctx.fillText('年发电收益反哺治沙',W/2,gY-30);
    }

    // 标签
    var labels=['① 铺设光伏板','② 板下遮阴','③ 板下种植','④ 发电收益','⑤ 农牧互补'];
    var li=Math.min(4,Math.floor(phase));
    ctx.fillStyle='rgba(0,0,0,0.65)';ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.fill();
    ctx.strokeStyle='rgba(110,231,183,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.stroke();
    ctx.fillStyle='#6ee7b7';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
    ctx.fillText(labels[li],20,30);
    var barY2=H-15;ctx.fillStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.roundRect(10,barY2,W-20,6,3);ctx.fill();
    ctx.fillStyle='rgba(110,231,183,0.6)';ctx.beginPath();ctx.roundRect(10,barY2,(W-20)*phase/5,6,3);ctx.fill();
}

// 飞播动画：增强版
function drawFeiboAnim(ctx,W,H){
    var t=techAnimTime;
    var gY=H*0.62;
    // 天空（渐变+云）
    var sky=ctx.createLinearGradient(0,0,0,gY);
    sky.addColorStop(0,'#1a3050');sky.addColorStop(0.5,'#3a6a8a');sky.addColorStop(1,'#6aaa9a');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,gY);
    // 云
    for(var ci=0;ci<4;ci++){
        var cx=(t*10+ci*W*0.3)%(W+120)-60;
        ctx.fillStyle='rgba(255,255,255,0.12)';
        ctx.beginPath();ctx.ellipse(cx,15+ci*12,35+ci*8,10+ci*2,0,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.ellipse(cx+25,18+ci*12,25+ci*6,8+ci*1.5,0,0,Math.PI*2);ctx.fill();
    }
    // 远山
    ctx.fillStyle='rgba(80,120,80,0.15)';
    ctx.beginPath();ctx.moveTo(0,gY);ctx.quadraticCurveTo(W*0.25,gY-20,W*0.5,gY-8);ctx.quadraticCurveTo(W*0.75,gY-18,W,gY);ctx.lineTo(W,gY+5);ctx.lineTo(0,gY+5);ctx.closePath();ctx.fill();
    // 地面
    var gg=ctx.createLinearGradient(0,gY,0,H);
    gg.addColorStop(0,'#e0c8a0');gg.addColorStop(0.4,'#d4b896');gg.addColorStop(1,'#a0785a');
    ctx.fillStyle=gg;ctx.fillRect(0,gY,W,H-gY);

    var phase=t%5.5;

    // 无人机（详细模型）
    var dronePath=phase<2?((t*35)%(W+80)-40):W*0.5;
    var droneY=gY-75+Math.sin(t*2)*4;
    // 机身阴影
    ctx.fillStyle='rgba(0,0,0,0.1)';
    ctx.beginPath();ctx.ellipse(dronePath||W*0.5,gY+3,18,5,0,0,Math.PI*2);ctx.fill();
    // 机臂
    ctx.strokeStyle='rgba(80,80,80,0.8)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(dronePath-18,droneY);ctx.lineTo(dronePath-8,droneY+2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(dronePath+18,droneY);ctx.lineTo(dronePath+8,droneY+2);ctx.stroke();
    // 机身
    ctx.fillStyle='rgba(60,60,70,0.9)';
    ctx.beginPath();ctx.roundRect(dronePath-10,droneY-3,20,10,3);ctx.fill();
    // 旋翼（高速旋转模糊效果）
    var wingR=t*25;
    ctx.save();ctx.translate(dronePath-18,droneY-2);ctx.rotate(wingR);
    ctx.fillStyle='rgba(180,180,190,0.3)';
    ctx.beginPath();ctx.ellipse(0,0,14,3,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(200,200,210,0.5)';ctx.lineWidth=1;
    ctx.beginPath();ctx.ellipse(0,0,14,3,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    ctx.save();ctx.translate(dronePath+18,droneY-2);ctx.rotate(-wingR);
    ctx.fillStyle='rgba(180,180,190,0.3)';
    ctx.beginPath();ctx.ellipse(0,0,14,3,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(200,200,210,0.5)';ctx.lineWidth=1;
    ctx.beginPath();ctx.ellipse(0,0,14,3,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    // LED灯
    ctx.fillStyle='rgba(0,255,100,'+(0.5+Math.sin(t*8)*0.3)+')';
    ctx.beginPath();ctx.arc(dronePath-18,droneY+3,1.5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,50,50,'+(0.5+Math.sin(t*8+Math.PI)*0.3)+')';
    ctx.beginPath();ctx.arc(dronePath+18,droneY+3,1.5,0,Math.PI*2);ctx.fill();

    // 播撒种子（扇形散开）
    if(phase>0.3&&phase<3.5){
        var seedOp=Math.min(1,(phase-0.3)*0.6);
        for(var si=0;si<20;si++){
            var sa=(si/20-0.5)*0.8;
            var sd=10+((phase*40+si*5)%70);
            var sx=dronePath+Math.sin(sa)*sd*0.5;
            var sy=droneY+8+sd;
            ctx.fillStyle='rgba(160,120,50,'+seedOp*0.7+')';
            ctx.beginPath();ctx.ellipse(sx,sy,1.5,1,sa,0,Math.PI*2);ctx.fill();
            // 种子轨迹线
            ctx.strokeStyle='rgba(160,120,50,'+seedOp*0.15+')';ctx.lineWidth=0.5;
            ctx.beginPath();ctx.moveTo(dronePath,droneY+8);ctx.lineTo(sx,sy);ctx.stroke();
        }
    }

    // 种子落地发芽（逐渐生长）
    if(phase>2.5){
        var germP=Math.min(1,(phase-2.5)*0.7);
        for(var gi=0;gi<10;gi++){
            var gx=W*0.1+gi*(W*0.8/9);
            var gy=gY+3;
            var sproutH=germP*(4+gi%4*3+Math.sin(gi*2)*2);
            // 根（先于地上部分出现）
            if(germP>0.2){
                var rootOp=Math.min(1,(germP-0.2)*2);
                ctx.strokeStyle='rgba(140,100,50,'+rootOp*0.4+')';ctx.lineWidth=0.8;
                ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx+Math.sin(gi)*3,gy+rootOp*10);ctx.stroke();
            }
            // 茎
            var sway4=Math.sin(t*1.2+gi*1.5)*2*germP;
            ctx.strokeStyle='rgba(60,130,40,'+germP*0.7+')';ctx.lineWidth=1.5;
            ctx.beginPath();ctx.moveTo(gx,gy);
            ctx.bezierCurveTo(gx+sway4*0.3,gy-sproutH*0.4,gx+sway4*0.7,gy-sproutH*0.8,gx+sway4,gy-sproutH);ctx.stroke();
            // 叶子（双叶）
            if(sproutH>5){
                ctx.fillStyle='rgba(50,140,30,'+germP*0.6+')';
                ctx.beginPath();ctx.ellipse(gx+sway4-3,gy-sproutH+1,3*germP,1.8,-0.4,0,Math.PI*2);ctx.fill();
                ctx.beginPath();ctx.ellipse(gx+sway4+3,gy-sproutH+2,2.5*germP,1.5,0.4,0,Math.PI*2);ctx.fill();
                // 叶脉
                ctx.strokeStyle='rgba(30,100,20,'+germP*0.3+')';ctx.lineWidth=0.3;
                ctx.beginPath();ctx.moveTo(gx+sway4,gy-sproutH);ctx.lineTo(gx+sway4-3,gy-sproutH+1);ctx.stroke();
            }
        }
    }

    // 鸟群（规模造林后出现）
    if(phase>4){
        var birdOp=Math.min(1,(phase-4)*2);
        for(var bi=0;bi<4;bi++){
            var bx=(t*15+bi*80)%(W+40)-20;
            var by=gY-50+bi*10+Math.sin(t+bi)*5;
            var wingA=Math.sin(t*4+bi)*4;
            ctx.strokeStyle='rgba(0,0,0,'+birdOp*0.3+')';ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(bx-5,by-1);ctx.quadraticCurveTo(bx-2,by-wingA,bx,by);ctx.quadraticCurveTo(bx+2,by-wingA,bx+5,by-1);ctx.stroke();
        }
    }

    // 标签
    var labels=['① 航线规划','② 精准播种','③ 种子落地','④ 发芽生长','⑤ 规模造林'];
    var li=Math.min(4,Math.floor(phase));
    ctx.fillStyle='rgba(0,0,0,0.65)';ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.fill();
    ctx.strokeStyle='rgba(110,231,183,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(10,10,150,30,10);ctx.stroke();
    ctx.fillStyle='#6ee7b7';ctx.font='bold 12px sans-serif';ctx.textAlign='left';
    ctx.fillText(labels[li],20,30);
    var barY2=H-15;ctx.fillStyle='rgba(255,255,255,0.1)';ctx.beginPath();ctx.roundRect(10,barY2,W-20,6,3);ctx.fill();
    ctx.fillStyle='rgba(110,231,183,0.6)';ctx.beginPath();ctx.roundRect(10,barY2,(W-20)*phase/5.5,6,3);ctx.fill();
}
window.closeTechDissect=function(){
    stopTechAnim();
    document.getElementById('tdOv').classList.remove('show');
    document.getElementById('tdMd').classList.remove('show');
};
document.getElementById('tdOv').onclick=closeTechDissect;

// 强制触发技术拆解卡片的reveal动画
setTimeout(function(){
    var techSection=document.querySelector('[style*="治沙技术拆解"]')||document.querySelector('section:has(.sg-card[onclick*="showTechDissect"])');
    if(!techSection){
        // 查找包含showTechDissect的section
        var allSections=document.querySelectorAll('section');
        allSections.forEach(function(s){
            if(s.innerHTML.indexOf('showTechDissect')!==-1)techSection=s;
        });
    }
    if(techSection){
        var techObs=new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if(entry.isIntersecting){
                    var cards=techSection.querySelectorAll('.sg-card');
                    cards.forEach(function(card,i){
                        card.style.opacity='0';card.style.transform='translateY(30px) scale(0.95)';
                        card.style.transition='all 0.6s cubic-bezier(0.34,1.56,0.64,1)';
                        card.style.transitionDelay=(i*0.15)+'s';
                        setTimeout(function(){card.style.opacity='1';card.style.transform='translateY(0) scale(1)';},100);
                    });
                    techObs.unobserve(techSection);
                }
            });
        },{threshold:0.15});
        techObs.observe(techSection);
    }
},500);

// --- 5. 模拟沙盘（增强真实感）---
(function(){
    var canvas=document.getElementById('sbCanvas');
    if(!canvas)return;
    var box=document.getElementById('sbBox');
    var ctx=canvas.getContext('2d');
    var W,H,dpr;var tool='gg';var items=[];var time=0,running=true;var windLevel=4.5;
    var grassBlades=[],ripples=[];var disaster='none';

    function resize(){
        dpr=window.devicePixelRatio||1;
        var rect=box.getBoundingClientRect();
        W=rect.width;H=rect.height;
        canvas.width=W*dpr;canvas.height=H*dpr;
        canvas.style.width=W+'px';canvas.style.height=H+'px';
        initGrass();
    }

    function initGrass(){
        grassBlades=[];
        for(var i=0;i<60;i++){
            grassBlades.push({
                x:Math.random()*W,y:H*0.38+Math.random()*H*0.55,
                h:5+Math.random()*12,phase:Math.random()*Math.PI*2,
                color:'rgb('+(60+Math.random()*40)+','+(100+Math.random()*60)+','+(30+Math.random()*30)+')'
            });
        }
    }

    // 实时风速仪表盘
    function drawWindGauge(ctx,W,H){
        var gx=W-88,gy=55,gr=40;
        ctx.save();
        // 背景
        ctx.fillStyle='rgba(8,16,24,0.92)';
        ctx.beginPath();ctx.arc(gx,gy,gr+14,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle='rgba(52,211,153,0.2)';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.arc(gx,gy,gr+14,0,Math.PI*2);ctx.stroke();
        // 刻度弧背景
        var sA=Math.PI*0.75,eA=Math.PI*2.25;
        ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=4;ctx.lineCap='round';
        ctx.beginPath();ctx.arc(gx,gy,gr,sA,eA);ctx.stroke();
        // 刻度弧当前值
        var ratio=Math.min(1,windLevel/4.5);
        var cA=sA+(eA-sA)*ratio;
        var ag=ctx.createLinearGradient(gx-gr,gy,gx+gr,gy);
        if(ratio<0.35){ag.addColorStop(0,'#22c55e');ag.addColorStop(1,'#6ee7b7');}
        else if(ratio<0.7){ag.addColorStop(0,'#fbbf24');ag.addColorStop(1,'#f59e0b');}
        else{ag.addColorStop(0,'#ef4444');ag.addColorStop(1,'#f87171');}
        ctx.strokeStyle=ag;ctx.lineWidth=5;
        ctx.beginPath();ctx.arc(gx,gy,gr,sA,cA);ctx.stroke();
        // 指针
        ctx.save();ctx.translate(gx,gy);ctx.rotate(cA);
        ctx.fillStyle=ratio<0.35?'#6ee7b7':ratio<0.7?'#fbbf24':'#f87171';
        ctx.beginPath();ctx.moveTo(gr-6,0);ctx.lineTo(-5,-2.5);ctx.lineTo(-5,2.5);ctx.closePath();ctx.fill();
        ctx.restore();
        // 中心点
        ctx.fillStyle='rgba(255,255,255,0.85)';ctx.beginPath();ctx.arc(gx,gy,3.5,0,Math.PI*2);ctx.fill();
        // 数字（脉冲）
        var pulse=1+Math.sin(time*3)*0.03*ratio;
        ctx.save();ctx.translate(gx,gy+20);ctx.scale(pulse,pulse);
        ctx.fillStyle=ratio<0.35?'#6ee7b7':ratio<0.7?'#fbbf24':'#f87171';
        ctx.font='bold 15px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(windLevel.toFixed(1),0,0);ctx.restore();
        ctx.fillStyle='rgba(255,255,255,0.45)';ctx.font='9px sans-serif';ctx.textAlign='center';
        ctx.fillText('m/s',gx,gy+34);
        // 等级
        var lvl=ratio<0.15?'无风':ratio<0.35?'微风':ratio<0.55?'轻风':ratio<0.75?'和风':'强风';
        ctx.fillStyle=ratio<0.35?'rgba(110,231,183,0.7)':ratio<0.7?'rgba(251,191,36,0.7)':'rgba(248,113,113,0.7)';
        ctx.font='bold 10px sans-serif';ctx.fillText(lvl,gx,gy+48);
        // 刻度标签
        ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font='7px sans-serif';
        [{v:0,a:sA},{v:1.5,a:sA+(eA-sA)*0.33},{v:3,a:sA+(eA-sA)*0.66},{v:4.5,a:eA}].forEach(function(lb){
            ctx.fillText(lb.v.toFixed(1),gx+Math.cos(lb.a)*(gr+8),gy+Math.sin(lb.a)*(gr+8));
        });
        ctx.restore();
    }

    // 灾害效果渲染（增强版）
    function drawDisaster(ctx,W,H,gY){
        if(disaster==='none'){disasterIntensity=0;return;}
        if(disasterIntensity<1)disasterIntensity=Math.min(1,disasterIntensity+0.015);
        var I=disasterIntensity;

        // === 受损物品渲染（三种灾害共用）===
        function drawDamagedItems(){
            items.forEach(function(item){
                if(disaster==='sandstorm'){
                    // 风沙：树木倾斜、沙埋
                    if(item.type==='tree'){
                        var lean=I*8+Math.sin(time*2)*2*I;
                        ctx.save();ctx.translate(item.x,item.y);ctx.rotate(lean*Math.PI/180);
                        ctx.fillStyle='#5C3317';ctx.fillRect(-2.5,-28,5,28);
                        var crownColors=['#1B6B1B','#228B22','#2E8B57'];
                        [{dx:0,dy:-32,r:12},{dx:-7,dy:-27,r:9},{dx:7,dy:-26,r:8}].forEach(function(l,i){
                            ctx.fillStyle=crownColors[i];
                            ctx.beginPath();ctx.arc(l.dx,l.dy,l.r,0,Math.PI*2);ctx.fill();
                        });
                        // 沙尘覆盖
                        ctx.fillStyle='rgba(180,140,60,'+(0.2*I)+')';
                        ctx.beginPath();ctx.arc(0,-20,16,0,Math.PI*2);ctx.fill();
                        ctx.restore();
                    }else if(item.type==='shrub'){
                        var lean2=I*12+Math.sin(time*2.5)*3*I;
                        ctx.save();ctx.translate(item.x,item.y);ctx.rotate(lean2*Math.PI/180);
                        var shrubColors=['#4a8c2a','#3a7a20','#5a9a35'];
                        [{dx:0,dy:-8,r:10},{dx:8,dy:-6,r:7},{dx:-7,dy:-5,r:8}].forEach(function(l,i){
                            ctx.fillStyle=shrubColors[i];
                            ctx.beginPath();ctx.ellipse(l.dx,l.dy,l.r,l.r*0.7,0,0,Math.PI*2);ctx.fill();
                        });
                        ctx.fillStyle='rgba(180,140,60,'+(0.25*I)+')';
                        ctx.beginPath();ctx.arc(0,-6,12,0,Math.PI*2);ctx.fill();
                        ctx.restore();
                    }else if(item.type==='gg'){
                        // 草方格被沙覆盖
                        var gs=28;
                        ctx.strokeStyle='rgba(180,150,60,0.85)';ctx.lineWidth=2;
                        ctx.strokeRect(item.x-gs/2,item.y-gs/2,gs,gs);
                        ctx.fillStyle='rgba(180,140,60,'+(0.3*I)+')';
                        ctx.fillRect(item.x-gs/2,item.y-gs/2,gs,gs);
                    }
                }else if(disaster==='drought'){
                    // 干旱：植物枯黄、落叶
                    if(item.type==='tree'){
                        // 树冠变黄
                        ctx.fillStyle='#5C3317';ctx.fillRect(item.x-2.5,item.y-28,5,28);
                        var dryColors=['#8B7D3C','#9B8B2A','#7A6E20'];
                        [{dx:0,dy:-32,r:12},{dx:-7,dy:-27,r:9},{dx:7,dy:-26,r:8}].forEach(function(l,i){
                            ctx.fillStyle=dryColors[i];
                            ctx.beginPath();ctx.arc(item.x+l.dx,item.y+l.dy,l.r,0,Math.PI*2);ctx.fill();
                        });
                        // 枯黄光晕
                        ctx.fillStyle='rgba(200,170,40,'+(0.2*I)+')';
                        ctx.beginPath();ctx.arc(item.x,item.y-20,18,0,Math.PI*2);ctx.fill();
                        // 飘落枯叶
                        for(var li=0;li<3;li++){
                            var lx=item.x+Math.sin(time*1.5+li*2)*12;
                            var ly=item.y-25+((time*30+li*40)%40);
                            ctx.fillStyle='rgba(180,150,40,'+(0.4*I)+')';
                            ctx.beginPath();ctx.ellipse(lx,ly,2,1,time+li,0,Math.PI*2);ctx.fill();
                        }
                    }else if(item.type==='shrub'){
                        var dryColors2=['#7A6E30','#8B7D3C','#6B6225'];
                        [{dx:0,dy:-8,r:10},{dx:8,dy:-6,r:7},{dx:-7,dy:-5,r:8}].forEach(function(l,i){
                            ctx.fillStyle=dryColors2[i];
                            ctx.beginPath();ctx.ellipse(item.x+l.dx,item.y+l.dy,l.r,l.r*0.7,0,0,Math.PI*2);ctx.fill();
                        });
                        ctx.fillStyle='rgba(200,170,40,'+(0.2*I)+')';
                        ctx.beginPath();ctx.arc(item.x,item.y-6,14,0,Math.PI*2);ctx.fill();
                    }else if(item.type==='water'){
                        // 水渠干涸
                        ctx.fillStyle='rgba(180,160,100,'+(0.4*I)+')';
                        ctx.fillRect(item.x-28,item.y-3,56,6);
                        ctx.strokeStyle='rgba(139,115,85,'+(0.5*I)+')';ctx.lineWidth=1;
                        ctx.setLineDash([3,3]);
                        ctx.beginPath();ctx.moveTo(item.x-25,item.y);ctx.lineTo(item.x+25,item.y);ctx.stroke();
                        ctx.setLineDash([]);
                        // 干裂纹
                        ctx.strokeStyle='rgba(100,80,50,'+(0.3*I)+')';ctx.lineWidth=0.8;
                        for(var dgi=0;dgi<3;dgi++){
                            var dgx=item.x-15+dgi*15;
                            ctx.beginPath();ctx.moveTo(dgx,item.y-2);ctx.lineTo(dgx+4,item.y+2);ctx.lineTo(dgx-2,item.y+3);ctx.stroke();
                        }
                    }
                }else if(disaster==='flood'){
                    // 洪水：水位淹没物品
                    var floodLine=gY-(5+I*30);
                    if(item.y>floodLine-10){
                        // 被淹没的物品加水覆盖
                        ctx.fillStyle='rgba(40,120,200,'+(0.2*I)+')';
                        ctx.beginPath();ctx.ellipse(item.x,item.y,20,8,0,0,Math.PI*2);ctx.fill();
                        // 水流冲击线
                        ctx.strokeStyle='rgba(100,180,255,'+(0.3*I)+')';ctx.lineWidth=1;
                        ctx.beginPath();
                        ctx.moveTo(item.x-15,item.y-2);ctx.quadraticCurveTo(item.x,item.y+3,item.x+15,item.y-1);
                        ctx.stroke();
                        // 物品晃动
                        if(item.type==='tree'){
                            var sway=Math.sin(time*3)*3*I;
                            ctx.save();ctx.translate(item.x,item.y);ctx.rotate(sway*Math.PI/180);
                            ctx.fillStyle='#5C3317';ctx.fillRect(-2.5,-28,5,28);
                            var floodCrown=['#1a5a2a','#226B22','#1B5B1B'];
                            [{dx:0,dy:-32,r:12},{dx:-7,dy:-27,r:9}].forEach(function(l,i){
                                ctx.fillStyle=floodCrown[i];
                                ctx.beginPath();ctx.arc(l.dx,l.dy,l.r,0,Math.PI*2);ctx.fill();
                            });
                            ctx.restore();
                        }
                    }
                }
            });
        }

        // 执行受损物品渲染（在沙盘物品之前调用）
        // 实际在draw函数中物品绘制前插入

        if(disaster==='sandstorm'){
            var sandSky=ctx.createLinearGradient(0,0,0,H*0.52);
            sandSky.addColorStop(0,'rgba(140,100,30,'+(0.25*I)+')');
            sandSky.addColorStop(0.5,'rgba(180,130,50,'+(0.15*I)+')');
            sandSky.addColorStop(1,'rgba(200,150,60,'+(0.08*I)+')');
            ctx.fillStyle=sandSky;ctx.fillRect(0,0,W,H*0.52);
            ctx.fillStyle='rgba(160,120,50,'+(0.12*I)+')';ctx.fillRect(0,0,W,H);
            for(var si=0;si<Math.floor(50*I);si++){
                var sx=(time*80*I+si*67)%(W+100)-50;
                var sy=(time*15+si*41)%H;
                var sz=2+Math.random()*5*I;
                ctx.fillStyle='rgba('+(170+Math.random()*40)+','+(130+Math.random()*30)+','+(60+Math.random()*30)+','+(0.3+Math.random()*0.3)*I+')';
                ctx.fillRect(sx,sy,sz,sz*0.4);
            }
            var wallH=H*0.15*I;
            var wallG=ctx.createLinearGradient(0,gY-wallH,0,gY+10);
            wallG.addColorStop(0,'rgba(180,140,60,0)');wallG.addColorStop(0.3,'rgba(180,140,60,'+(0.2*I)+')');
            wallG.addColorStop(1,'rgba(180,140,60,'+(0.4*I)+')');
            ctx.fillStyle=wallG;ctx.fillRect(0,gY-wallH,W,wallH+10);
            for(var vi=0;vi<3;vi++){
                var vx=W*0.2+vi*W*0.3+Math.sin(time*0.5+vi)*50;
                var vy=gY-20+Math.sin(time*0.7+vi*2)*15;
                ctx.save();ctx.translate(vx,vy);ctx.rotate(time*2+vi);
                ctx.strokeStyle='rgba(200,160,80,'+(0.15*I)+')';ctx.lineWidth=2;
                ctx.beginPath();ctx.arc(0,0,15+I*10,0,Math.PI*1.5);ctx.stroke();
                ctx.restore();
            }
            var warnPulse=0.3+Math.sin(time*4)*0.2;
            ctx.fillStyle='rgba(239,68,68,'+(warnPulse*I)+')';ctx.fillRect(0,0,W,30);
            ctx.fillStyle='rgba(255,255,255,'+(0.9*I)+')';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
            ctx.fillText('🌪️ 沙尘暴 — 风速>8m/s · 能见度<500m · 请立即避险',W/2,20);
            if(I>0.5){ctx.translate((Math.random()-0.5)*3*I,(Math.random()-0.5)*2*I);}
            drawDamagedItems();
        }else if(disaster==='drought'){
            var heatG=ctx.createLinearGradient(0,0,0,H*0.4);
            heatG.addColorStop(0,'rgba(255,180,50,'+(0.12*I)+')');
            heatG.addColorStop(1,'rgba(255,150,30,'+(0.06*I)+')');
            ctx.fillStyle=heatG;ctx.fillRect(0,0,W,H*0.4);
            ctx.strokeStyle='rgba(120,90,50,'+(0.4*I)+')';ctx.lineWidth=1+I;
            for(var di=0;di<Math.floor(15*I);di++){
                var dx=W*0.05+di*(W*0.9/14);
                var dy=gY+15+Math.sin(di*1.7)*12;
                var crackLen=20+I*25;
                ctx.beginPath();ctx.moveTo(dx,dy);
                ctx.lineTo(dx+crackLen*0.3,dy+crackLen*0.4);
                ctx.lineTo(dx-crackLen*0.2,dy+crackLen*0.7);
                ctx.lineTo(dx+crackLen*0.1,dy+crackLen);ctx.stroke();
                if(I>0.4){ctx.beginPath();ctx.moveTo(dx+crackLen*0.3,dy+crackLen*0.4);ctx.lineTo(dx+crackLen*0.6,dy+crackLen*0.3);ctx.stroke();}
            }
            ctx.strokeStyle='rgba(255,200,100,'+(0.1*I)+')';ctx.lineWidth=1;
            for(var hi=0;hi<6;hi++){
                var hy=gY-5+hi*8;ctx.beginPath();
                for(var hx=0;hx<=W;hx+=5)ctx.lineTo(hx,hy+Math.sin(hx*0.02+time*3+hi)*3*I);
                ctx.stroke();
            }
            ctx.fillStyle='rgba(180,150,40,'+(0.1*I)+')';ctx.fillRect(0,gY,W,H-gY);
            var dPulse=0.3+Math.sin(time*3)*0.2;
            ctx.fillStyle='rgba(251,191,36,'+(dPulse*I)+')';ctx.fillRect(0,0,W,30);
            ctx.fillStyle='rgba(0,0,0,'+(0.8*I)+')';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
            ctx.fillText('☀️ 极端干旱 — 地表温度>50°C · 连续60天无降水 · 植被大面积枯死',W/2,20);
            drawDamagedItems();
        }else if(disaster==='flood'){
            var floodSky2=ctx.createLinearGradient(0,0,0,H*0.4);
            floodSky2.addColorStop(0,'rgba(40,60,80,'+(0.2*I)+')');
            floodSky2.addColorStop(1,'rgba(60,80,100,'+(0.1*I)+')');
            ctx.fillStyle=floodSky2;ctx.fillRect(0,0,W,H*0.4);
            ctx.strokeStyle='rgba(150,200,255,'+(0.4*I)+')';ctx.lineWidth=1.5;
            for(var rdi=0;rdi<Math.floor(40*I);rdi++){
                var rx=(time*30+rdi*53)%W;
                var ry=(time*200+rdi*67)%(H*0.5);
                ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(rx-1,ry+12+I*8);ctx.stroke();
            }
            var floodH=(5+I*30)+Math.sin(time*0.4)*3*I;
            var waterG2=ctx.createLinearGradient(0,gY-floodH,0,gY+5);
            waterG2.addColorStop(0,'rgba(40,120,200,'+(0.15*I)+')');
            waterG2.addColorStop(0.5,'rgba(50,140,220,'+(0.25*I)+')');
            waterG2.addColorStop(1,'rgba(30,100,180,'+(0.35*I)+')');
            ctx.fillStyle=waterG2;ctx.fillRect(0,gY-floodH,W,floodH+10);
            ctx.strokeStyle='rgba(120,190,255,'+(0.35*I)+')';ctx.lineWidth=2;
            for(var wvi=0;wvi<4;wvi++){
                var wvy=gY-floodH+wvi*6;ctx.beginPath();
                for(var wvx=0;wvx<=W;wvx+=4)ctx.lineTo(wvx,wvy+Math.sin(wvx*0.015+time*2.5+wvi)*4*I);
                ctx.stroke();
            }
            for(var spi=0;spi<Math.floor(8*I);spi++){
                var spx=(time*40+spi*89)%W;var spy=gY-floodH+Math.sin(time*3+spi)*5;
                ctx.fillStyle='rgba(180,220,255,'+(0.3*I)+')';
                ctx.beginPath();ctx.arc(spx,spy,2+Math.random()*2,0,Math.PI*2);ctx.fill();
            }
            for(var fi=0;fi<Math.floor(5*I);fi++){
                var fx=(time*35+fi*120)%(W+40)-20;var fy=gY-floodH+8+Math.sin(time+fi)*4;
                ctx.fillStyle='rgba(139,115,85,'+(0.3*I)+')';ctx.fillRect(fx,fy,6+fi%3*2,3);
            }
            var fPulse=0.3+Math.sin(time*3.5)*0.2;
            ctx.fillStyle='rgba(52,152,219,'+(fPulse*I)+')';ctx.fillRect(0,0,W,30);
            ctx.fillStyle='rgba(255,255,255,'+(0.9*I)+')';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
            ctx.fillText('🌊 山洪暴发 — 水位持续上升 · 低洼区已被淹 · 请立即转移',W/2,20);
            drawDamagedItems();
        }
    }

    function draw(){
        if(!running){requestAnimationFrame(draw);return;}
        time+=0.016;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);

        // 天空渐变
        var sky=ctx.createLinearGradient(0,0,0,H*0.38);
        sky.addColorStop(0,'#1a3050');sky.addColorStop(0.5,'#3a6a9a');sky.addColorStop(1,'#87CEEB');
        ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.38);

        // 太阳
        var sunG=ctx.createRadialGradient(W*0.82,H*0.08,0,W*0.82,H*0.08,35);
        sunG.addColorStop(0,'rgba(255,248,220,1)');sunG.addColorStop(0.4,'rgba(255,220,100,0.5)');sunG.addColorStop(1,'rgba(255,180,50,0)');
        ctx.fillStyle=sunG;ctx.beginPath();ctx.arc(W*0.82,H*0.08,35,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#FFE082';ctx.beginPath();ctx.arc(W*0.82,H*0.08,14,0,Math.PI*2);ctx.fill();
        ctx.save();ctx.translate(W*0.82,H*0.08);ctx.rotate(time*0.08);
        for(var i=0;i<6;i++){
            var a=i*Math.PI/3;
            ctx.strokeStyle='rgba(255,220,120,0.12)';ctx.lineWidth=1;
            ctx.beginPath();ctx.moveTo(Math.cos(a)*18,Math.sin(a)*18);
            ctx.lineTo(Math.cos(a)*(28+Math.sin(time*2+i)*5),Math.sin(a)*(28+Math.sin(time*2+i)*5));
            ctx.stroke();
        }
        ctx.restore();

        // 云
        for(var ci=0;ci<3;ci++){
            var cx=(W*0.2+ci*W*0.3+time*8)%(W+120)-60;
            ctx.fillStyle='rgba(255,255,255,0.3)';
            ctx.beginPath();ctx.ellipse(cx,H*0.06+ci*12,35+ci*8,10+ci*2,0,0,Math.PI*2);ctx.fill();
            ctx.beginPath();ctx.ellipse(cx+20,H*0.06+ci*12+2,25+ci*6,8+ci*1.5,0,0,Math.PI*2);ctx.fill();
        }

        // 远山
        ctx.fillStyle='rgba(80,110,70,0.25)';
        ctx.beginPath();ctx.moveTo(0,H*0.38);
        ctx.quadraticCurveTo(W*0.15,H*0.3,W*0.3,H*0.35);
        ctx.quadraticCurveTo(W*0.5,H*0.28,W*0.7,H*0.34);
        ctx.quadraticCurveTo(W*0.85,H*0.3,W,H*0.36);
        ctx.lineTo(W,H*0.38);ctx.lineTo(0,H*0.38);ctx.closePath();ctx.fill();

        // 主沙地
        var gY=H*0.38;
        var gG=ctx.createLinearGradient(0,gY,0,H);
        gG.addColorStop(0,'#D2B48C');gG.addColorStop(0.3,'#C4A882');gG.addColorStop(0.7,'#B8960B');gG.addColorStop(1,'#8B6914');
        ctx.fillStyle=gG;ctx.fillRect(0,gY,W,H-gY);

        // 沙地纹理
        ctx.strokeStyle='rgba(160,130,80,0.18)';ctx.lineWidth=0.8;
        for(var si=0;si<8;si++){
            var sy=gY+10+si*16;
            ctx.beginPath();
            for(var x=0;x<=W;x+=3)ctx.lineTo(x,sy+Math.sin(x*0.01+si*1.3+time*0.15)*3);
            ctx.stroke();
        }

        // 绘制已放置物品
        items.forEach(function(item){
            if(item.type==='gg'){
                var gs=28;
                ctx.strokeStyle='rgba(180,150,60,0.85)';ctx.lineWidth=2;
                ctx.strokeRect(item.x-gs/2,item.y-gs/2,gs,gs);
                for(var gi=0;gi<6;gi++){
                    var gx=item.x-gs/2+3+gi*(gs-6)/5;
                    ctx.strokeStyle='rgba(160,130,50,0.6)';ctx.lineWidth=1;
                    ctx.beginPath();ctx.moveTo(gx,item.y-gs/2+2);ctx.lineTo(gx,item.y-gs/2+6);ctx.stroke();
                }
                ctx.fillStyle='rgba(0,0,0,0.08)';ctx.fillRect(item.x-gs/2+2,item.y-gs/2+2,gs-4,gs-4);
            }else if(item.type==='tree'){
                // 灾害时跳过正常绘制（由drawDamagedItems处理）
                if(disaster!=='none')return;
                ctx.fillStyle='#5C3317';ctx.fillRect(item.x-2.5,item.y-28,5,28);
                ctx.fillStyle='rgba(80,40,10,0.3)';ctx.fillRect(item.x+2,item.y-25,2,22);
                var crownColors=['#1B6B1B','#228B22','#2E8B57'];
                [{dx:0,dy:-32,r:12},{dx:-7,dy:-27,r:9},{dx:7,dy:-26,r:8},{dx:0,dy:-38,r:8}].forEach(function(l,i){
                    ctx.fillStyle=crownColors[i%3];
                    ctx.beginPath();ctx.arc(item.x+l.dx,item.y+l.dy,l.r,0,Math.PI*2);ctx.fill();
                });
                ctx.fillStyle='rgba(255,255,200,0.08)';
                ctx.beginPath();ctx.arc(item.x-4,item.y-35,5,0,Math.PI*2);ctx.fill();
            }else if(item.type==='shrub'){
                if(disaster!=='none')return;
                var shrubColors=['#4a8c2a','#3a7a20','#5a9a35','#6B8E23'];
                [{dx:0,dy:-8,r:10},{dx:8,dy:-6,r:7},{dx:-7,dy:-5,r:8},{dx:3,dy:-14,r:6}].forEach(function(l,i){
                    ctx.fillStyle=shrubColors[i%4];
                    ctx.beginPath();ctx.ellipse(item.x+l.dx,item.y+l.dy,l.r,l.r*0.7,0,0,Math.PI*2);ctx.fill();
                });
            }else if(item.type==='water'){
                // 灾害时跳过正常绘制（由drawDamagedItems处理）
                if(disaster!=='none')return;
                var chW=32,chH=10;
                ctx.fillStyle='rgba(0,0,0,0.15)';
                ctx.beginPath();
                ctx.moveTo(item.x-chW-2,item.y-1);ctx.lineTo(item.x+chW+2,item.y-1);
                ctx.lineTo(item.x+chW-2,item.y+chH+3);ctx.lineTo(item.x-chW+2,item.y+chH+3);
                ctx.closePath();ctx.fill();
                ctx.fillStyle='rgba(60,45,25,0.6)';
                ctx.beginPath();
                ctx.moveTo(item.x-chW,item.y-chH/2);ctx.lineTo(item.x+chW,item.y-chH/2);
                ctx.lineTo(item.x+chW-4,item.y+chH/2);ctx.lineTo(item.x-chW+4,item.y+chH/2);
                ctx.closePath();ctx.fill();
                var wGrad=ctx.createLinearGradient(item.x-chW,item.y-chH/2,item.x+chW,item.y-chH/2);
                wGrad.addColorStop(0,'rgba(30,120,200,0.6)');wGrad.addColorStop(0.3,'rgba(60,160,240,0.75)');
                wGrad.addColorStop(0.5,'rgba(100,190,255,0.8)');wGrad.addColorStop(0.7,'rgba(60,160,240,0.75)');
                wGrad.addColorStop(1,'rgba(30,120,200,0.6)');
                ctx.fillStyle=wGrad;
                ctx.fillRect(item.x-chW+4,item.y-chH/2+1,(chW-4)*2,chH-2);
                for(var wi=0;wi<5;wi++){
                    var wPhase=time*25+wi*13;
                    var wx=item.x-chW+4+((wi*14+wPhase)%(chW*2-8));
                    ctx.strokeStyle='rgba(200,230,255,'+(0.35-wi*0.05)+')';
                    ctx.lineWidth=1-wi*0.1;
                    ctx.beginPath();
                    ctx.moveTo(wx-6,item.y-1);
                    ctx.quadraticCurveTo(wx-2,item.y+2+Math.sin(time*3+wi)*1.5,wx+2,item.y+1);
                    ctx.quadraticCurveTo(wx+5,item.y-1+Math.sin(time*3+wi+1)*1,wx+8,item.y+1);
                    ctx.stroke();
                }
                ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
                var hlX=item.x-chW+8+((time*30)%(chW*2-16));
                ctx.beginPath();ctx.moveTo(hlX,item.y-2);ctx.lineTo(hlX+12,item.y-2);ctx.stroke();
                ctx.strokeStyle='rgba(120,90,50,0.6)';ctx.lineWidth=1.5;
                ctx.beginPath();ctx.moveTo(item.x-chW,item.y-chH/2);ctx.lineTo(item.x+chW,item.y-chH/2);ctx.stroke();
                ctx.strokeStyle='rgba(80,60,30,0.5)';
                ctx.beginPath();ctx.moveTo(item.x-chW+4,item.y+chH/2);ctx.lineTo(item.x+chW-4,item.y+chH/2);ctx.stroke();
                var wetR=22+Math.sin(time*0.8)*3;
                var wetG=ctx.createRadialGradient(item.x,item.y+chH,0,item.x,item.y+chH,wetR);
                wetG.addColorStop(0,'rgba(52,152,219,0.12)');wetG.addColorStop(1,'rgba(52,152,219,0)');
                ctx.fillStyle=wetG;
                ctx.beginPath();ctx.ellipse(item.x,item.y+chH,wetR,6,0,0,Math.PI*2);ctx.fill();
                for(var ri=0;ri<2;ri++){
                    var rr=(time*8+ri*20)%30;
                    var ro=1-rr/30;
                    if(ro>0){
                        ctx.strokeStyle='rgba(150,210,255,'+(ro*0.2)+')';ctx.lineWidth=0.8;
                        ctx.beginPath();ctx.ellipse(item.x+Math.sin(ri*3)*10,item.y+chH/2,rr*0.8,rr*0.2,0,0,Math.PI*2);ctx.stroke();
                    }
                }
            }else if(item.type==='treeOnly'){
                ctx.fillStyle='#8B4513';ctx.fillRect(item.x-2,item.y-20,4,20);
                ctx.fillStyle='#9ACD32';ctx.beginPath();ctx.arc(item.x,item.y-24,7,0,Math.PI*2);ctx.fill();
                ctx.strokeStyle='rgba(239,68,68,0.6)';ctx.lineWidth=2;
                ctx.beginPath();ctx.moveTo(item.x-12,item.y-32);ctx.lineTo(item.x+12,item.y-14);ctx.stroke();
                ctx.beginPath();ctx.moveTo(item.x+12,item.y-32);ctx.lineTo(item.x-12,item.y-14);ctx.stroke();
                ctx.fillStyle='rgba(239,68,68,0.15)';ctx.beginPath();ctx.arc(item.x,item.y-24,14,0,Math.PI*2);ctx.fill();
            }
        });

        // 地面草丛
        grassBlades.forEach(function(g){
            var sway=Math.sin(time*1.2+g.phase)*2.5;
            ctx.strokeStyle=g.color;ctx.lineWidth=1.2;
            ctx.beginPath();ctx.moveTo(g.x,g.y);
            ctx.quadraticCurveTo(g.x+sway,g.y-g.h*0.6,g.x+sway*0.7,g.y-g.h);
            ctx.stroke();
        });

        // 沙尘粒子
        var extraP=disaster==='sandstorm'?40:0;
        var pCount=Math.max(0,Math.floor(windLevel*10))+extraP;
        for(var pi=0;pi<pCount;pi++){
            var px=(time*windLevel*18+pi*53)%W;
            var py=gY+8+Math.sin(time*1.5+pi)*15+pi*3;
            ctx.fillStyle='rgba(200,170,120,'+Math.min(0.4,windLevel*0.08)+')';
            ctx.beginPath();ctx.arc(px,py,1+Math.random(),0,Math.PI*2);ctx.fill();
        }

        // 水波纹
        ripples.forEach(function(r){
            r.r+=0.8;r.op-=0.02;
            if(r.op>0){
                ctx.strokeStyle='rgba(52,152,219,'+r.op+')';ctx.lineWidth=1;
                ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.stroke();
            }
        });
        ripples=ripples.filter(function(r){return r.op>0;});

        // 灾害效果
        drawDisaster(ctx,W,H,gY);

        // 风速仪表盘
        drawWindGauge(ctx,W,H);

        // 灾害持续时间管理
        if(disaster!=='none'){
            disasterDuration++;
            // 灾害结束
            if(disasterDuration>=disasterMaxDuration){
                applyDisasterDamage();
                disaster='none';disasterIntensity=0;disasterDuration=0;
                document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
            }
            // 灾害期间沙尘暴根据防护程度调整风力
            if(disaster==='sandstorm'){
                var _gg2=0,_tree2=0,_shrub2=0;
                items.forEach(function(i){if(i.type==='gg')_gg2++;else if(i.type==='tree')_tree2++;else if(i.type==='shrub')_shrub2++;});
                var _prot2=Math.min(1,(_gg2*3+_tree2*2+_shrub2*1.5)/60);
                windLevel=4.5*(1-_prot2*0.6);
            }
        }
        // 被动灾害检测
        if(disasterCooldown>0)disasterCooldown--;
        checkRandomDisaster();

        requestAnimationFrame(draw);
    }

    // 物种种植上限
    var SPECIES_LIMIT=30;
    var speciesCounts={}; // {tree:0,shrub:0}

    window.sbSelTool=function(t){
        tool=t;
        document.querySelectorAll('#sbToolbar .sb-tool[data-tool]').forEach(function(b){b.classList.toggle('active',b.dataset.tool===t);});
        var fb=document.getElementById('sbFeedback');
        fb.className='sb-fb';
        if(t==='gg')fb.textContent='点击沙地铺设1m×1m草方格，固沙基础步骤。';
        else if(t==='tree')fb.textContent='点击沙地种树，单一树种上限'+SPECIES_LIMIT+'棵，需搭配灌木和水渠。';
        else if(t==='shrub')fb.textContent='点击沙地栽种灌木，与乔木搭配形成多层防护。';
        else if(t==='water')fb.textContent='点击沙地开挖引水渠，灌溉是治沙必要步骤！';
        else if(t==='treeOnly')fb.textContent='⚠️ 直接种树无沙障保护，树苗会枯死！先铺草方格。';
    };

    canvas.addEventListener('click',function(e){
        var rect=canvas.getBoundingClientRect();
        var x=e.clientX-rect.left,y=e.clientY-rect.top;
        if(y<H*0.38+5)return;
        if(disaster!=='none'){
            document.getElementById('sbFeedback').className='sb-fb bad';
            document.getElementById('sbFeedback').textContent='\u26A0\uFE0F 灾害进行中，无法种植！请等待灾害结束。';
            return;
        }
        if(disasterWarning){
            document.getElementById('sbFeedback').className='sb-fb bad';
            document.getElementById('sbFeedback').textContent='\u26A0\uFE0F 灾害预警中，建议暂停操作。';
            return;
        }
        var fb=document.getElementById('sbFeedback');

        // 单一物种上限检查
        if(tool==='tree'&&speciesCounts.tree>=SPECIES_LIMIT){
            fb.className='sb-fb bad';
            fb.textContent='\u26A0\uFE0F 乔木已达上限'+SPECIES_LIMIT+'棵！请改种灌木和开挖水渠，多物种搭配才能有效固沙。';
            return;
        }
        if(tool==='shrub'&&speciesCounts.shrub>=SPECIES_LIMIT){
            fb.className='sb-fb bad';
            fb.textContent='\u26A0\uFE0F 灌木已达上限'+SPECIES_LIMIT+'棵！请搭配乔木和水渠。';
            return;
        }

        items.push({type:tool,x:x,y:y});
        if(tool==='tree')speciesCounts.tree++;
        else if(tool==='shrub')speciesCounts.shrub++;

        if(tool==='water'){
            for(var ri=0;ri<5;ri++){
                ripples.push({x:x+(Math.random()-0.5)*20,y:y+5,r:2+ri*3,op:0.7-ri*0.1});
            }
        }

        // 种植反馈
        var gg=0,tree=0,shrub=0,water=0;
        items.forEach(function(i){if(i.type==='gg')gg++;else if(i.type==='tree')tree++;else if(i.type==='shrub')shrub++;else if(i.type==='water')water++;});

        if(tool==='gg')fb.textContent='\u2705 草方格铺设'+gg+'个，继续加油！';
        else if(tool==='tree'){
            if(tree>=SPECIES_LIMIT)fb.textContent='\u26A0\uFE0F 乔木已达上限，请改种灌木和开挖水渠。';
            else if(tree>=15&&shrub===0)fb.textContent='\u26A0\uFE0F 已种'+tree+'棵乔木，建议搭配灌木形成多层防护。';
            else fb.textContent='\u2705 已种'+tree+'棵乔木'+(shrub>0?'，搭配'+shrub+'棵灌木，不错！':'。');
        }
        else if(tool==='shrub'){
            if(tree===0&&shrub>=5)fb.textContent='\u26A0\uFE0F 建议搭配乔木，乔灌结合固沙效果更好。';
            else fb.textContent='\u2705 已栽'+shrub+'棵灌木'+(tree>0?'，乔灌搭配中。':'。');
        }
        else if(tool==='water')fb.textContent='\u2705 引水渠开通！灌溉是治沙必要步骤，可保护植被免受干旱。';
        fb.className='sb-fb good';

        updateSbStats();
    });

    function updateSbStats(){
        var gg=0,tree=0,shrub=0,water=0,to=0;
        items.forEach(function(i){if(i.type==='gg')gg++;else if(i.type==='tree')tree++;else if(i.type==='shrub')shrub++;else if(i.type==='water')water++;else if(i.type==='treeOnly')to++;});
        document.getElementById('sbGG').textContent=gg;
        document.getElementById('sbTrees').textContent=tree;
        document.getElementById('sbShrubs').textContent=shrub;
        document.getElementById('sbWater').textContent=water;

        // 风速降低计算：水渠为必要条件，单一物种有上限
        var wr=0;
        if(gg>0)wr+=Math.min(25,gg*1.5);
        if(water>0){
            if(tree>0&&shrub>0){
                wr+=Math.min(30,tree*1.2);
                wr+=Math.min(20,shrub*1.5);
            }else if(tree>0){
                wr+=Math.min(15,tree*0.6);
            }else if(shrub>0){
                wr+=Math.min(14,shrub*1);
            }
        }else{
            if(tree>0)wr+=Math.min(8,tree*0.3);
            if(shrub>0)wr+=Math.min(6,shrub*0.4);
        }
        wr=Math.min(80,Math.round(wr));

        windLevel=4.5*(1-wr/100);
        document.getElementById('sbWind').textContent=wr+'%';

        // 治理进度：水渠只加2-15，且有灌溉强制要求
        var prog=0;
        prog+=Math.min(20,gg*1.2); // 草方格
        prog+=Math.min(25,tree*1.8); // 乔木
        prog+=Math.min(18,shrub*1.2); // 灌木
        // 水渠：每条增加2-15，总水渠贡献有限
        var waterBonus=0;
        for(var wi=0;wi<water;wi++){waterBonus+=2+Math.max(0,8-wi*0.5);}
        waterBonus=Math.min(15,waterBonus);
        prog+=waterBonus;

        // 灌溉强制检查：每15-36棵树必须有水渠
        var requiredWater=Math.floor(tree/25);
        if(tree>=15&&water<requiredWater){
            var deficit=requiredWater-water;
            fb.className='sb-fb bad';
            fb.textContent='\u26A0\uFE0F 已种'+tree+'棵乔木，需要至少'+requiredWater+'条水渠灌溉！当前仅'+water+'条，缺少'+deficit+'条。无灌溉植被将枯死！';
            prog=Math.max(prog,prog*0.5); // 进度减半惩罚
        }

        prog=Math.min(100,Math.round(prog));
        document.getElementById('sbProgFill').style.width=prog+'%';
        checkMilestone();
    }

    window.sbReset=function(){
        items=[];updateSbStats();ripples=[];disaster='none';
        document.getElementById('sbFeedback').textContent='沙盘已重置。选择工具开始新的治沙方案！';
        document.getElementById('sbFeedback').className='sb-fb';windLevel=4.5;
        document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
        disasterTimer=0;disasterWarning=false;disasterCount=0;disasterCooldown=0;disasterIntensity=0;
        speciesCounts={tree:0,shrub:0};milestoneReached={};
    };

    // 灾害系统
    var disasterTimer=0,disasterWarning=false,disasterCooldown=0;
    var disasterDuration=0,disasterMaxDuration=180;
    var disasterCount=0;
    var disasterPhases=[300,1500];
    var disasterInterval=7200;
    var disasters=['sandstorm','drought','flood'];
    var disasterWarnTexts={
        sandstorm:'⚠️ 气象预警：强沙尘暴即将过境，风力8-10级，请做好防护！',
        drought:'⚠️ 气象预警：未来15天无有效降水，干旱风险极高！',
        flood:'⚠️ 气象预警：上游暴雨，山洪将在数分钟内到达！'
    };
    var disasterActiveTexts={
        sandstorm:'🌪️ 沙尘暴来袭！风速暴增，能见度骤降。只有完善的草方格+灌木体系才能有效阻挡！',
        drought:'☀️ 干旱来袭！没有水渠灌溉的植被正在枯死。赶紧开挖引水渠！',
        flood:'🌊 暴雨洪水！低洼区域被淹，需要排水渠引导水流。'
    };
    var disasterIntensity=0;

    // 进度里程碑
    var milestoneReached={};
    var milestoneMsgs={
        30:'🌱 初见成效！植被开始扎根，风沙有所减弱。',
        50:'🌿 半程达标！绿色版图持续扩大，继续加油！',
        70:'🌳 大片绿洲！生态修复效果显著，沙尘暴频率明显下降。',
        85:'🏆 接近胜利！沙尘暴已不再侵袭，治沙体系坚固。',
        100:'🎉 治沙大功告成！荒漠变绿洲，你创造了奇迹！'
    };

    function getVegCoverage(){
        var gg=0,tree=0,shrub=0;
        items.forEach(function(i){if(i.type==='gg')gg++;else if(i.type==='tree')tree++;else if(i.type==='shrub')shrub++;});
        return Math.min(100,gg*1.5+tree*2+shrub*1.5);
    }

    function applyDisasterDamage(){
        var damagePct=25+Math.random()*50;
        var removed=0;
        items=items.filter(function(i){
            if(i.type==='tree'||i.type==='shrub'){
                if(Math.random()<damagePct/100){removed++;return false;}
            }
            if(i.type==='treeOnly'){removed++;return false;}
            return true;
        });
        var fb=document.getElementById('sbFeedback');
        if(removed>0){
            fb.className='sb-fb bad';fb.textContent='\u26A0\uFE0F '+{sandstorm:'沙尘暴',drought:'干旱',flood:'洪水'}[disaster]+'造成'+removed+'棵植被受损('+Math.round(damagePct)+'%)，请尽快补种！';
        }else{
            fb.className='sb-fb good';fb.textContent='\u2705 '+{sandstorm:'沙尘暴',drought:'干旱',flood:'洪水'}[disaster]+'未造成植被损失，治沙体系坚固！';
        }
        updateSbStats();
        checkMilestone();
    }

    function checkMilestone(){
        var prog=parseInt(document.getElementById('sbProgFill').style.width)||0;
        [30,50,70,85,100].forEach(function(m){
            if(prog>=m&&!milestoneReached[m]){
                milestoneReached[m]=true;
                showMilestoneToast(milestoneMsgs[m]);
            }
        });
    }

    function showMilestoneToast(msg){
        var toast=document.createElement('div');
        toast.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);background:rgba(10,40,30,0.95);border:2px solid rgba(52,211,153,0.5);border-radius:16px;padding:1.2rem 2rem;color:#6ee7b7;font-size:1rem;font-weight:700;text-align:center;z-index:20;white-space:nowrap;transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1);box-shadow:0 0 40px rgba(52,211,153,0.2);pointer-events:none;';
        toast.textContent=msg;
        var sbBox=document.getElementById('sbBox');
        sbBox.appendChild(toast);
        setTimeout(function(){toast.style.transform='translate(-50%,-50%) scale(1)';},50);
        setTimeout(function(){toast.style.opacity='0';toast.style.transform='translate(-50%,-50%) scale(0.9)';},3500);
        setTimeout(function(){toast.remove();},4000);
    }

    function checkRandomDisaster(){
        if(disaster!=='none'||disasterCooldown>0)return;
        if(items.length<3)return;
        disasterTimer++;

        var nextTrigger;
        if(disasterCount<2){nextTrigger=disasterPhases[disasterCount];}
        else{nextTrigger=disasterPhases[1]+(disasterCount-1)*disasterInterval;}

        if(disasterTimer>=nextTrigger){
            var vegCov=getVegCoverage();
            var pool=disasters.slice();
            // 60-75%：沙尘暴概率减半
            if(vegCov>=60&&vegCov<80){
                if(Math.random()<0.5)pool=pool.filter(function(d){return d!=='sandstorm';});
            }
            // 80%+：完全免疫沙尘暴
            if(vegCov>=80){
                pool=pool.filter(function(d){return d!=='sandstorm';});
                if(pool.length===0)return;
            }
            var type=pool[Math.floor(Math.random()*pool.length)];

            if(!disasterWarning){
                disasterWarning=true;
                document.getElementById('sbFeedback').className='sb-fb bad';
                document.getElementById('sbFeedback').textContent=disasterWarnTexts[type];
                var box=document.getElementById('sbBox');
                box.style.boxShadow='0 0 40px rgba(239,68,68,0.4)';
                setTimeout(function(){box.style.boxShadow='';},1500);
                setTimeout(function(){
                    if(!disasterWarning)return;
                    disaster=type;disasterWarning=false;
                    disasterIntensity=0;disasterDuration=0;disasterCount++;
                    disasterMaxDuration=150+Math.floor(Math.random()*90);
                    document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
                    var btn=document.querySelector('#sbToolbar [data-disaster="'+disaster+'"]');
                    if(btn)btn.classList.add('active');
                    document.getElementById('sbFeedback').className='sb-fb bad';
                    document.getElementById('sbFeedback').textContent=disasterActiveTexts[type];
                    disasterCooldown=300;
                },3000);
            }
        }
    }

    function applyDisasterDamage(){
        var vegCov=getVegCoverage();
        var damagePct=25+Math.random()*50; // 25-75%随机受损
        var removed=0;
        var beforeCount=items.length;

        if(disaster==='sandstorm'){
            items=items.filter(function(i){
                if(i.type==='tree'||i.type==='shrub'){
                    if(Math.random()<damagePct/100){removed++;return false;}
                }
                if(i.type==='treeOnly'){removed++;return false;}
                return true;
            });
        }else if(disaster==='drought'){
            items=items.filter(function(i){
                if(i.type==='tree'||i.type==='shrub'){
                    if(Math.random()<damagePct/100){removed++;return false;}
                }
                if(i.type==='treeOnly'){removed++;return false;}
                return true;
            });
        }else if(disaster==='flood'){
            items=items.filter(function(i){
                if(i.type==='tree'||i.type==='shrub'){
                    if(Math.random()<damagePct/100){removed++;return false;}
                }
                if(i.type==='treeOnly'){removed++;return false;}
                return true;
            });
        }

        var fb=document.getElementById('sbFeedback');
        if(vegCov>=65&&disaster==='sandstorm'){
            fb.className='sb-fb good';fb.textContent='\u{1F389} 植被覆盖率达标('+Math.round(vegCov)+'%\u226565%)，沙尘暴不再侵袭！治沙成功！';
        }else if(removed>0){
            fb.className='sb-fb bad';fb.textContent='\u26A0\uFE0F '+{sandstorm:'沙尘暴',drought:'干旱',flood:'洪水'}[disaster]+'造成'+removed+'棵植被受损('+Math.round(damagePct)+'%)，请尽快补种！';
        }else{
            fb.className='sb-fb good';fb.textContent='\u2705 '+{sandstorm:'沙尘暴',drought:'干旱',flood:'洪水'}[disaster]+'未造成植被损失，治沙体系坚固！';
        }
        updateSbStats();
    }

    function checkRandomDisaster(){
        if(disaster!=='none'||disasterCooldown>0)return;
        if(items.length<3)return; // 至少3个物品才触发
        disasterTimer++;

        // 计算下次触发时间
        var nextTrigger;
        if(disasterCount<2){
            nextTrigger=disasterPhases[disasterCount];
        }else{
            nextTrigger=disasterPhases[1]+(disasterCount-1)*disasterInterval;
        }

        if(disasterTimer>=nextTrigger){
            // 植被达65%后沙尘暴不触发
            var vegCov=getVegCoverage();
            var pool=disasters.slice();
            if(vegCov>=65){
                pool=pool.filter(function(d){return d!=='sandstorm';});
                if(pool.length===0)return; // 全部免疫
            }
            // 第一波到第五波都触发，之后同理
            var type=pool[Math.floor(Math.random()*pool.length)];

            if(!disasterWarning){
                disasterWarning=true;
                var fb=document.getElementById('sbFeedback');
                fb.className='sb-fb bad';fb.textContent=disasterWarnTexts[type];
                var box=document.getElementById('sbBox');
                box.style.boxShadow='0 0 40px rgba(239,68,68,0.4)';
                setTimeout(function(){box.style.boxShadow='';},1500);
                setTimeout(function(){
                    if(!disasterWarning)return;
                    disaster=type;disasterWarning=false;
                    disasterIntensity=0;disasterDuration=0;disasterCount++;
                    disasterMaxDuration=150+Math.floor(Math.random()*90); // 5-8秒随机
                    document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
                    var btn=document.querySelector('#sbToolbar [data-disaster="'+disaster+'"]');
                    if(btn)btn.classList.add('active');
                    fb.textContent=disasterActiveTexts[type];
                    fb.className='sb-fb bad';
                    disasterCooldown=300;
                },3000);
            }
        }
    }

    window.sbDisaster=function(type){
        if(disaster===type){
            // 取消灾害
            disaster='none';disasterIntensity=0;disasterDuration=0;disasterWarning=false;
            document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
            document.getElementById('sbFeedback').className='sb-fb';
            document.getElementById('sbFeedback').textContent='灾害已取消。继续治沙工作！';
            return;
        }
        disaster=type;disasterIntensity=0;disasterDuration=0;disasterWarning=false;
        disasterMaxDuration=150+Math.floor(Math.random()*90); // 5-8秒随机
        document.querySelectorAll('#sbToolbar .sb-disaster').forEach(function(b){b.classList.remove('active');});
        var btn=document.querySelector('#sbToolbar [data-disaster="'+disaster+'"]');
        if(btn)btn.classList.add('active');
        var fb=document.getElementById('sbFeedback');
        var msgs={
            sandstorm:'🌪️ 沙尘暴来袭！风速暴增，能见度骤降。只有完善的草方格+灌木体系才能有效阻挡！',
            drought:'☀️ 连续干旱！没有水渠灌溉的植被正在枯死。赶紧开挖引水渠！',
            flood:'🌊 暴雨洪水！低洼区域被淹，需要排水渠引导水流。'
        };
        fb.className='sb-fb bad';fb.textContent=msgs[disaster]||'';
    };

    var obs=new IntersectionObserver(function(e){running=e[0].isIntersecting;},{threshold:0});
    obs.observe(document.getElementById('page-sb'));
    resize();window.addEventListener('resize',resize);draw();
})();

// --- 6. 物种图鉴 ---
(function(){
    var species=[
        {emoji:'🌱',name:'梭梭',img:'images/img_028.jpg',latin:'Haloxylon ammodendron',type:'flora',typeName:'固沙植物',
         stats:[{l:'固沙面积',v:'10m²/棵'},{l:'根系深度',v:'15m'},{l:'年蒸腾量',v:'200mm'},{l:'耐旱能力',v:'极强'}],
         desc:'被称为"沙漠之王"，同化枝绿色可光合。种子可在极端干旱沙层中存活数年，遇水即萌发。一棵成年梭梭可固定10m²沙地，是荒漠生态系统基石物种。',
         tags:['极度耐旱','治沙先锋','肉苁蓉寄主'],popData:[{l:'治理前',b:'0棵',a:'—'},{l:'治理后',b:'—',a:'覆盖率33%'}]},
        {emoji:'🌲',name:'胡杨',img:'images/img_029.jpg',latin:'Populus euphratica',type:'flora',typeName:'乔木',
         stats:[{l:'根系深度',v:'20m'},{l:'树高',v:'15-30m'},{l:'寿命',v:'100-300年'},{l:'耐盐碱',v:'强'}],
         desc:'杨柳科落叶乔木，"沙漠英雄树"。根系可深达20米穿透干沙层汲取深层地下水，是唯一能在沙漠河流两岸形成森林的树种。',
         tags:['千年传奇','河岸林先锋','深根耐旱'],popData:[{l:'治理前',b:'2.5%',a:'33%'},{l:'沙尘暴',b:'30天/年',a:'8天/年'}]},
        {emoji:'🍊',name:'沙棘',img:'images/img_030.jpg',latin:'Hippophae rhamnoides',type:'flora',typeName:'灌木',
         stats:[{l:'维C含量',v:'1200mg/100g'},{l:'固氮能力',v:'强'},{l:'横向扩展',v:'10m'},{l:'耐温范围',v:'-40~+40°C'}],
         desc:'胡颓子科落叶灌木，根蘖萌发力极强。与放线菌共生形成根瘤，固氮能力是豆科植物的3倍。维C含量是猕猴桃的8倍、橙子的12倍。',
         tags:['生物固氮','高经济价值','耐寒耐热'],popData:[{l:'治理前',b:'稀少',a:'成片生长'},{l:'维C',b:'—',a:'橙子12倍'}]},
        {emoji:'🌿',name:'柠条',img:'images/img_031.jpg',latin:'Caragana korshinskii',type:'flora',typeName:'灌木',
         stats:[{l:'根系深度',v:'8m'},{l:'平茬周期',v:'3-5年'},{l:'使用寿命',v:'30年+'},{l:'抗性',v:'抗风沙'}],
         desc:'豆科锦鸡儿属灌木，根系盘结交错可有效固定流沙。耐平茬——每隔3-5年刈割一次，反促根蘖大量萌发，复壮后可再用30年。',
         tags:['豆科固氮','耐平茬复壮','饲料+燃料'],popData:[{l:'固沙量',b:'5m²/棵',a:'8m²/棵'},{l:'成活率',b:'低',a:'88%'}]},
        {emoji:'🌾',name:'花棒',img:'images/img_032.jpg',latin:'Hedysarum scoparium',type:'flora',typeName:'半灌木',
         stats:[{l:'水平根展',v:'12m'},{l:'耐沙埋',v:'强'},{l:'成活率',v:'90%+直播'},{l:'用途',v:'防风固沙'}],
         desc:'又名"沙漠姑娘"，根系水平扩展可达12米。最神奇的是耐沙埋——枝干被流沙覆盖后，可从埋入的茎节萌发不定根和新枝。',
         tags:['流沙先锋','耐沙埋萌发','豆科固氮'],popData:[{l:'直播成活',b:'低',a:'90%+'},{l:'固沙',b:'—',a:'先锋物种'}]},
        {emoji:'🦅',name:'胡兀鹫',img:'images/img_033.jpg',latin:'Gypaetus barbatus',type:'bird',typeName:'猛禽',
         stats:[{l:'翼展',v:'2.3-2.8m'},{l:'体长',v:'100-130cm'},{l:'飞行高度',v:'3000-4500m'},{l:'食性',v:'骨食性'}],
         desc:'国家一级保护动物，能消化其他猛禽无法利用的骨头。是荒漠生态系统健康度的重要指示物种。',
         tags:['国家一级保护','骨食性','高原猛禽'],popData:[{l:'治理前',b:'50只',a:'300只'},{l:'栖息地',b:'萎缩',a:'恢复'}]},
        {emoji:'🦎',name:'荒漠蜥蜴',img:'images/img_034.jpg',latin:'Phrynocephalus spp.',type:'fauna',typeName:'爬行动物',
         stats:[{l:'体长',v:'5-15cm'},{l:'耐温',v:'-10~50°C'},{l:'食性',v:'昆虫'},{l:'活动',v:'日行性'}],
         desc:'荒漠生态系统的重要组成部分。以昆虫为食，控制害虫数量。沙色体表可完美伪装，是食物链中不可或缺的一环。',
         tags:['沙地伪装','昆虫控制','生态指示'],popData:[{l:'种群',b:'减少40%',a:'恢复中'},{l:'种类',b:'12种',a:'18种'}]},
        {emoji:'🐦',name:'蒙古百灵',img:'images/img_035.jpg',latin:'Melanocorypha mongolica',type:'bird',typeName:'鸣禽',
         stats:[{l:'体长',v:'18-20cm'},{l:'鸣声',v:'悠扬婉转'},{l:'食性',v:'杂食'},{l:'栖息地',v:'草原荒漠'}],
         desc:'草原和荒漠边缘的标志性鸟类，歌声悠扬动听。种群数量随生态恢复稳步增长，是生态改善的重要标志。',
         tags:['草原指示种','歌声优美','杂食性'],popData:[{l:'种群',b:'下降35%',a:'回升20%'},{l:'分布',b:'缩小',a:'扩大'}]},
        {emoji:'🦊',name:'赤狐',img:'images/img_036.jpg',latin:'Vulpes vulpes',type:'fauna',typeName:'哺乳动物',
         stats:[{l:'体长',v:'50-90cm'},{l:'食性',v:'杂食'},{l:'活动',v:'夜行性'},{l:'栖息地',v:'多样'}],
         desc:'适应性极强的荒漠哺乳动物，以鼠类、鸟类、昆虫和浆果为食。对控制鼠害、维持生态平衡起重要作用。',
         tags:['中层捕食者','鼠害控制','夜行性'],popData:[{l:'栖息地',b:'碎片化',a:'连通恢复'},{l:'数量',b:'减少',a:'稳步增长'}]},
        {emoji:'🪲',name:'屎壳郎(蜣螂)',img:'images/img_037.png',latin:'Scarabaeidae',type:'fauna',typeName:'昆虫',
         stats:[{l:'体长',v:'1-6cm'},{l:'作用',v:'分解粪便'},{l:'翻土深度',v:'30cm'},{l:'种类',v:'200+种'}],
         desc:'荒漠生态系统的"清道夫"。将粪便滚成球埋入地下，既清理地表，又为土壤增添有机质和水分。',
         tags:['分解者','土壤改良','生态清洁工'],popData:[{l:'土壤有机质',b:'0.3%',a:'2%'},{l:'种群',b:'减少',a:'恢复'}]}
    ];

    var grid=document.getElementById('sgGrid');
    if(!grid)return;
    species.forEach(function(sp){
        var card=document.createElement('div');card.className='sg-card glass-bubble';
        card.innerHTML=(sp.img?'<img class="sg-card-img" src="'+sp.img+'" alt="'+sp.name+'" loading="lazy">':'<span class="sg-emoji">'+sp.emoji+'</span>')+'<div class="sg-name">'+sp.name+'</div><div class="sg-latin">'+sp.latin+'</div><div class="sg-type '+sp.type+'">'+sp.typeName+'</div>';
        card.onclick=function(){showSpeciesGuide(sp);};
        grid.appendChild(card);
    });

    var sgOpenTime=0;
    function showSpeciesGuide(sp){
        var statsHtml=sp.stats.map(function(s){return '<div class="sg-gst"><div class="sgs-l">'+s.l+'</div><div class="sgs-v">'+s.v+'</div></div>';}).join('');
        var tagsHtml=sp.tags.map(function(t){return '<span class="sg-gtag">'+t+'</span>';}).join('');
        var popHtml='';
        if(sp.popData&&sp.popData.length){
            popHtml='<div class="sg-pd">'+sp.popData.map(function(p){return '<div class="sg-pdi"><div class="spd-l">'+p.l+'</div><div class="spd-b">'+p.b+'</div><div style="font-size:.7rem;color:rgba(255,255,255,0.4)">→</div><div class="spd-a">'+p.a+'</div></div>';}).join('')+'</div>';
        }
        document.getElementById('sgGuideContent').innerHTML=(sp.img?'<img class="sg-gimg" src="'+sp.img+'" alt="'+sp.name+'">':'<div class="sg-gi">'+sp.emoji+'</div>')+'<h3>'+sp.name+'</h3><div class="sg-gl">'+sp.latin+'</div><div class="sg-gs">'+statsHtml+'</div><div class="sg-gd">'+sp.desc+'</div><div class="sg-gtags">'+tagsHtml+'</div>'+popHtml;
        sgOpenTime=Date.now();
        document.getElementById('sgOverlay').classList.add('show');document.getElementById('sgGuide').classList.add('show');
        // 设置弹窗样式（无模糊）
        var sgOv=document.getElementById('sgOverlay');
        sgOv.style.background='rgba(0,0,0,0.3)';sgOv.style.backdropFilter='none';
        var sgG=document.getElementById('sgGuide');
        sgG.style.background='linear-gradient(145deg,#1c3828,#224030,#264432)';
        sgG.style.border='1px solid rgba(52,211,153,0.35)';
        sgG.style.boxShadow='0 25px 90px rgba(0,0,0,0.5),0 0 60px rgba(52,211,153,0.08)';
        sgG.style.backdropFilter='none';
        // 提亮文字
        var c=document.getElementById('sgGuideContent');
        if(c){
            c.style.color='rgba(255,255,255,0.92)';
            c.querySelectorAll('.sg-gd').forEach(function(el){el.style.color='rgba(255,255,255,0.78)';el.style.lineHeight='1.9';});
            c.querySelectorAll('.sgs-l').forEach(function(el){el.style.color='rgba(255,255,255,0.65)';el.style.fontSize='0.75rem';el.style.textTransform='uppercase';el.style.letterSpacing='0.05rem';});
            c.querySelectorAll('.sgs-v').forEach(function(el){el.style.color='#6ee7b7';el.style.fontSize='1.1rem';el.style.fontWeight='800';});
            c.querySelectorAll('.sg-gst').forEach(function(el){el.style.background='rgba(52,211,153,0.1)';el.style.border='1px solid rgba(52,211,153,0.15)';el.style.borderRadius='10px';el.style.padding='0.7rem';});
            c.querySelectorAll('.sg-gtag').forEach(function(el){el.style.background='rgba(52,211,153,0.12)';el.style.borderColor='rgba(52,211,153,0.25)';el.style.color='#6ee7b7';el.style.fontSize='0.78rem';el.style.padding='0.25rem 0.7rem';});
            c.querySelectorAll('.spd-b').forEach(function(el){el.style.color='#f87171';el.style.fontWeight='800';});
            c.querySelectorAll('.spd-a').forEach(function(el){el.style.color='#6ee7b7';el.style.fontWeight='800';});
            c.querySelectorAll('.sg-pdi').forEach(function(el){el.style.background='rgba(52,211,153,0.08)';el.style.border='1px solid rgba(52,211,153,0.12)';el.style.borderRadius='10px';});
            c.querySelectorAll('.spd-l').forEach(function(el){el.style.color='rgba(255,255,255,0.7)';el.style.fontSize='0.7rem';el.style.textTransform='uppercase';});
        }
        // emoji放大
        var emojiEl=c.querySelector('.sg-gi');
        if(emojiEl){emojiEl.style.filter='drop-shadow(0 4px 12px rgba(0,0,0,0.4))';emojiEl.style.transform='scale(1.1)';emojiEl.style.transition='transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';}
    }

    window.closeSpeciesGuide=function(){
        document.getElementById('sgOverlay').classList.remove('show');
        document.getElementById('sgGuide').classList.remove('show');
    };
    document.getElementById('sgOverlay').onclick=function(){if(Date.now()-sgOpenTime>300)closeSpeciesGuide();};
    document.getElementById('sgGuide').onclick=function(e){e.stopPropagation();};
})();

// --- 灾害动画演示 ---
(function(){
    var time=0,dpr=window.devicePixelRatio||1;
    function setup(id){
        var c=document.getElementById(id);if(!c)return null;
        var r=c.getBoundingClientRect();var w=r.width||300,h=120;
        c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';
        return{ctx:c.getContext('2d'),w:w,h:h};
    }
    var W=setup('disasterWindCanvas');
    var Wa=setup('disasterWaterCanvas');
    var S=setup('disasterSalinCanvas');
    var B=setup('disasterBioCanvas');

    function drawWind(){
        if(!W)return;var c=W.ctx,x=W.w,y=W.h;
        c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,x,y);
        // 天空
        var sg=c.createLinearGradient(0,0,0,y*0.45);sg.addColorStop(0,'#1a0800');sg.addColorStop(0.3,'#3a2010');sg.addColorStop(0.7,'#6a4a20');sg.addColorStop(1,'#a08040');
        c.fillStyle=sg;c.fillRect(0,0,x,y*0.45);
        // 热浪
        for(var i=0;i<5;i++){c.strokeStyle='rgba(255,200,100,'+(0.05-i*0.009)+')';c.lineWidth=1;c.beginPath();for(var px=0;px<=x;px+=2)c.lineTo(px,y*0.1+i*8+Math.sin(px*0.01+time*2+i)*6);c.stroke();}
        // 远山
        c.fillStyle='rgba(80,50,20,0.25)';c.beginPath();c.moveTo(0,y*0.42);
        c.quadraticCurveTo(x*0.12,y*0.3,x*0.25,y*0.38);c.quadraticCurveTo(x*0.4,y*0.25,x*0.55,y*0.35);
        c.quadraticCurveTo(x*0.7,y*0.28,x*0.85,y*0.36);c.quadraticCurveTo(x*0.95,y*0.32,x,y*0.4);
        c.lineTo(x,y*0.45);c.lineTo(0,y*0.45);c.closePath();c.fill();
        // 地面
        var gg=c.createLinearGradient(0,y*0.4,0,y);gg.addColorStop(0,'#d4a574');gg.addColorStop(0.3,'#c49050');gg.addColorStop(0.6,'#8B7355');gg.addColorStop(1,'#4a3510');
        c.fillStyle=gg;c.fillRect(0,y*0.4,x,y*0.6);
        // 风蚀沟壑
        var er=Math.sin(time*0.3)*0.3+0.5;
        c.strokeStyle='rgba(80,50,20,'+er*0.4+')';c.lineWidth=1.2;
        for(var gi=0;gi<6;gi++){var gx=x*0.08+gi*x*0.17;c.beginPath();c.moveTo(gx,y*0.42);c.bezierCurveTo(gx+5,y*0.55,gx-3,y*0.65,gx+10,y*0.75);c.stroke();}
        // 沙粒3层
        for(var i=0;i<12;i++){var px=(time*30+i*43)%(x+40)-20;c.fillStyle='rgba(160,120,60,0.12)';c.fillRect(px,y*0.15+Math.sin(time+i)*6+i*6,10,1.5);}// 远
        for(var i=0;i<18;i++){var px=(time*60+i*29)%(x+50)-25;c.fillStyle='rgba(200,160,80,'+(0.2+Math.sin(time+i)*0.1)+')';c.fillRect(px,y*0.25+Math.sin(time*1.2+i)*12+i%5*8,12,2);}// 中
        for(var i=0;i<8;i++){var px=(time*90+i*53)%(x+60)-30;var sz=3+Math.random()*3;c.fillStyle='rgba(230,190,100,0.45)';c.fillRect(px,y*0.35+Math.sin(time*1.5+i)*10+i%3*14,sz*2,sz);c.fillStyle='rgba(200,160,80,0.08)';c.fillRect(px-sz*3,y*0.35+Math.sin(time*1.5+i)*10+i%3*14,sz*3,sz*0.4);}// 近+拖尾
        // 风线
        for(var fi=0;fi<10;fi++){var fx=(time*(45+fi*6)+fi*40)%(x+50)-25;var fy=y*0.15+fi*8;var fo=0.07-fi*0.006;c.strokeStyle='rgba(255,255,255,'+fo+')';c.lineWidth=0.7;c.beginPath();c.moveTo(fx,fy);c.bezierCurveTo(fx+12,fy-2,fx+28,fy+1,fx+42,fy-1);c.stroke();}
        // 沙墙
        var wg=c.createLinearGradient(0,y*0.35,0,y*0.5);wg.addColorStop(0,'rgba(180,140,60,0)');wg.addColorStop(0.5,'rgba(180,140,60,'+er*0.12+')');wg.addColorStop(1,'rgba(180,140,60,'+er*0.2+')');
        c.fillStyle=wg;c.fillRect(0,y*0.35,x,y*0.15);
        // 数据
        var loss=Math.round(3000+er*5000);
        c.fillStyle='rgba(0,0,0,0.65)';c.beginPath();c.roundRect(x-100,y-30,95,24,8);c.fill();
        c.fillStyle='#fbbf24';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText('风蚀 '+loss+'吨/km²',x-52,y-14);
    }

    function drawWater(){
        if(!Wa)return;var c=Wa.ctx,x=Wa.w,y=Wa.h;
        c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,x,y);
        // 天空
        var sg=c.createLinearGradient(0,0,0,y*0.3);sg.addColorStop(0,'#040c16');sg.addColorStop(0.5,'#0f2030');sg.addColorStop(1,'#1a3a50');
        c.fillStyle=sg;c.fillRect(0,0,x,y*0.3);
        // 闪电
        if(Math.sin(time*3.5)>0.93){c.save();c.shadowColor='rgba(255,255,200,0.4)';c.shadowBlur=8;c.strokeStyle='rgba(255,255,220,0.6)';c.lineWidth=1.5;var lx=x*0.3+Math.random()*x*0.4;c.beginPath();c.moveTo(lx,0);var ly=0;for(var i=0;i<6;i++){ly+=y*0.05;lx+=(Math.random()-0.5)*22;c.lineTo(lx,ly);}c.stroke();c.restore();
        c.fillStyle='rgba(255,255,200,0.02)';c.fillRect(0,0,x,y*0.3);}
        // 黄土坡
        var sg2=c.createLinearGradient(0,y*0.3,0,y);sg2.addColorStop(0,'#a08060');sg2.addColorStop(0.4,'#8B7355');sg2.addColorStop(1,'#6d5a45');
        c.fillStyle=sg2;c.beginPath();c.moveTo(0,y*0.3);
        c.bezierCurveTo(x*0.15,y*0.32,x*0.3,y*0.36,x*0.5,y*0.4);
        c.bezierCurveTo(x*0.7,y*0.38,x*0.85,y*0.42,x,y*0.45);
        c.lineTo(x,y);c.lineTo(0,y);c.closePath();c.fill();
        // 沟壑
        c.strokeStyle='rgba(60,40,15,0.3)';c.lineWidth=1.5;
        for(var gi=0;gi<5;gi++){var gx=x*0.12+gi*x*0.2;c.beginPath();c.moveTo(gx,y*0.38+gi*4);c.bezierCurveTo(gx+6,y*0.52,gx-4,y*0.65,gx+2,y*0.78);c.stroke();}
        // 雨滴
        c.strokeStyle='rgba(120,190,255,0.3)';c.lineWidth=1.2;
        for(var i=0;i<35;i++){var rx=(time*28+i*15)%x;var ry=(time*140+i*18)%(y*0.7);c.beginPath();c.moveTo(rx,ry);c.lineTo(rx-0.5,ry+7+i%3*3);c.stroke();}
        // 水流
        for(var wi=0;wi<7;wi++){var wx=(time*30+wi*50)%(x+60)-30;var wy=y*0.4+wi*9+Math.sin(time+wi)*4;c.strokeStyle='rgba(52,152,219,'+(0.32-wi*0.04)+')';c.lineWidth=2.2-wi*0.25;c.beginPath();c.moveTo(wx,wy);c.bezierCurveTo(wx+10,wy+7,wx+22,wy-5,wx+38,wy+3);c.bezierCurveTo(wx+52,wy+6,wx+68,wy-2,wx+82,wy+2);c.stroke();}
        // 泥沙
        for(var si=0;si<18;si++){var sx=(time*28+si*22)%(x+30)-15;var sy=y*0.44+si*4+Math.sin(time+si)*4;c.fillStyle='rgba(139,115,85,'+(0.35+Math.sin(time+si)*0.15)+')';c.beginPath();c.arc(sx,sy,1.2+si%2*0.5,0,Math.PI*2);c.fill();}
        // 数据
        var vol=(14+Math.sin(time*0.4)*4).toFixed(1);
        c.fillStyle='rgba(0,0,0,0.65)';c.beginPath();c.roundRect(x-100,y-30,95,24,8);c.fill();
        c.fillStyle='#60a5fa';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText('输沙 '+vol+'亿吨/年',x-52,y-14);
    }

    function drawSalin(){
        if(!S)return;var c=S.ctx,x=S.w,y=S.h;
        c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,x,y);
        // 地面
        var gg=c.createLinearGradient(0,0,0,y);gg.addColorStop(0,'#b09070');gg.addColorStop(0.3,'#9a8060');gg.addColorStop(0.6,'#8B7355');gg.addColorStop(1,'#6d5a45');
        c.fillStyle=gg;c.fillRect(0,0,x,y);
        // 龟裂
        c.strokeStyle='rgba(60,40,20,0.25)';c.lineWidth=1;
        for(var ci=0;ci<10;ci++){var cx=x*0.08+ci*x*0.1;var cy=y*0.22+Math.sin(ci*1.3)*10;var cl=10+Math.sin(ci)*4;c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+cl*0.5,cy+cl*0.6);c.lineTo(cx-cl*0.3,cy+cl);c.stroke();c.beginPath();c.moveTo(cx+cl*0.5,cy+cl*0.6);c.lineTo(cx+cl*0.8,cy+cl*0.3);c.stroke();}
        // 地下水
        var rh=28+Math.sin(time*0.3)*15;
        var wg=c.createLinearGradient(0,y-rh,0,y);wg.addColorStop(0,'rgba(52,152,219,0)');wg.addColorStop(0.4,'rgba(52,152,219,0.06)');wg.addColorStop(1,'rgba(52,152,219,0.15)');
        c.fillStyle=wg;c.fillRect(0,y-rh,x,rh);
        c.strokeStyle='rgba(52,152,219,0.2)';c.lineWidth=1;c.setLineDash([3,3]);c.beginPath();c.moveTo(0,y-rh);c.lineTo(x,y-rh);c.stroke();c.setLineDash([]);
        // 盐粒子
        for(var ai=0;ai<14;ai++){var ax=x*0.06+ai*(x*0.88/13);var ay=y-((time*18+ai*14)%(y*0.6));c.fillStyle='rgba(255,255,255,'+(ay>y*0.3?0.35:0.12)+')';c.beginPath();c.arc(ax,ay,1.2,0,Math.PI*2);c.fill();c.strokeStyle='rgba(255,255,255,'+(ay>y*0.3?0.15:0.06)+')';c.lineWidth=0.6;c.beginPath();c.moveTo(ax,ay+5);c.lineTo(ax,ay-2);c.stroke();}
        // 盐结晶
        for(var ci=0;ci<22;ci++){var cx=Math.sin(ci*1.8)*x*0.42+x*0.5;var cy=7+Math.cos(ci*1.4)*13+Math.sin(time*0.8+ci)*2;var cs=1.2+Math.sin(ci*0.7+time)*0.8;c.fillStyle='rgba(255,255,255,'+(0.18+Math.sin(ci+time*0.6)*0.12)+')';c.beginPath();c.arc(cx,cy,cs,0,Math.PI*2);c.fill();c.fillStyle='rgba(200,220,255,'+(0.06+Math.sin(ci+time*0.6)*0.04)+')';c.beginPath();c.arc(cx,cy,cs+2.5,0,Math.PI*2);c.fill();}
        // 盐碱斑
        for(var bi=0;bi<5;bi++){var bx=x*0.1+bi*x*0.18;var by=y*0.18+Math.sin(bi*2)*10;c.fillStyle='rgba(255,255,255,'+(0.04+Math.sin(time+bi)*0.02)+')';c.beginPath();c.ellipse(bx,by,10+Math.sin(time+bi)*2,5,0,0,Math.PI*2);c.fill();}
        // 数据
        var sal=(4+Math.sin(time*0.2)*2).toFixed(1);
        c.fillStyle='rgba(0,0,0,0.65)';c.beginPath();c.roundRect(x-100,y-30,95,24,8);c.fill();
        c.fillStyle='#c084fc';c.font='bold 10px sans-serif';c.textAlign='center';c.fillText('盐度 '+sal+'‰',x-52,y-14);
    }

    function drawBio(){
        if(!B)return;var c=B.ctx,x=B.w,y=B.h;
        c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,x,y);

        // 荒漠化程度随时间变化（周期性）
        var desertPct=Math.sin(time*0.15)*0.5+0.5; // 0-1 荒漠化程度

        // 天空（随荒漠化变暗）
        var skyDark=desertPct*0.15;
        var sg=c.createLinearGradient(0,0,0,y*0.4);
        sg.addColorStop(0,'rgba(10,42,26,'+(1-skyDark)+')');
        sg.addColorStop(0.5,'rgba(26,74,42,'+(1-skyDark*0.8)+')');
        sg.addColorStop(1,'rgba(42,106,58,'+(1-skyDark*0.5)+')');
        c.fillStyle=sg;c.fillRect(0,0,x,y*0.4);

        // 太阳（被沙尘遮蔽）
        c.fillStyle='rgba(255,220,80,'+(0.1-desertPct*0.08)+')';
        c.beginPath();c.arc(x*0.85,y*0.1,18,0,Math.PI*2);c.fill();

        // 远山
        c.fillStyle='rgba(30,80,40,'+(0.2-desertPct*0.1)+')';
        c.beginPath();c.moveTo(0,y*0.4);
        c.quadraticCurveTo(x*0.3,y*0.32,x*0.5,y*0.38);
        c.quadraticCurveTo(x*0.7,y*0.3,x*0.9,y*0.38);
        c.lineTo(x,y*0.42);c.lineTo(0,y*0.42);c.closePath();c.fill();

        // 草地（荒漠化时变黄）
        var greenR=Math.round(58-desertPct*30);
        var greenG=Math.round(122-desertPct*60);
        var greenB=Math.round(58-desertPct*30);
        var gg=c.createLinearGradient(0,y*0.38,0,y);
        gg.addColorStop(0,'rgb('+greenR+','+greenG+','+greenB+')');
        gg.addColorStop(0.4,'rgb('+(greenR-10)+','+(greenG-15)+','+(greenB-10)+')');
        gg.addColorStop(1,'rgb('+(greenR-30)+','+(greenG-40)+','+(greenB-20)+')');
        c.fillStyle=gg;c.fillRect(0,y*0.38,x,y*0.62);

        // 干裂纹理（荒漠化时出现）
        if(desertPct>0.3){
            var crackOp=(desertPct-0.3)*0.4;
            c.strokeStyle='rgba(60,40,20,'+crackOp+')';c.lineWidth=0.8;
            for(var ci=0;ci<Math.floor(desertPct*15);ci++){
                var cx2=x*0.08+ci*x*0.07;
                var cy2=y*0.5+Math.sin(ci*1.7)*15;
                c.beginPath();c.moveTo(cx2,cy2);c.lineTo(cx2+8,cy2+6);c.lineTo(cx2+3,cy2+12);c.stroke();
            }
        }

        // 草丛（荒漠化时减少）
        var grassCount=Math.floor(50*(1-desertPct*0.6));
        for(var gi=0;gi<grassCount;gi++){
            var gx=gi*(x/grassCount)+2;var gy=y-5;
            var gh=4+Math.sin(gi*1.2)*3;
            var sw=Math.sin(time*1+gi*0.6)*2.5*(1-desertPct*0.5);
            var gOp=0.22-desertPct*0.1;
            c.strokeStyle='rgba(50,120,30,'+gOp+')';c.lineWidth=1;
            c.beginPath();c.moveTo(gx,gy);c.quadraticCurveTo(gx+sw,gy-gh*0.5,gx+sw*0.6,gy-gh);c.stroke();
        }

        // 枯树（荒漠化时出现）
        if(desertPct>0.4){
            var treeOp=(desertPct-0.4)*0.6;
            for(var ti=0;ti<3;ti++){
                var tx=x*0.2+ti*x*0.3;
                var ty=y*0.5+Math.sin(ti*2)*8;
                c.strokeStyle='rgba(100,70,40,'+treeOp+')';c.lineWidth=2;
                c.beginPath();c.moveTo(tx,ty+15);c.lineTo(tx,ty-5);c.stroke();
                c.lineWidth=1;
                c.beginPath();c.moveTo(tx,ty);c.lineTo(tx-8,ty-10);c.stroke();
                c.beginPath();c.moveTo(tx,ty-3);c.lineTo(tx+6,ty-8);c.stroke();
                c.beginPath();c.moveTo(tx,ty+5);c.lineTo(tx+5,ty);c.stroke();
            }
        }

        // 动物（更丰富的种类+消失动画）
        function bird(x2,y2,s,op){
            c.fillStyle='rgba(70,70,70,'+op+')';
            var wing=Math.sin(time*3+x2)*s*0.3;
            c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-s,y2-wing);c.lineTo(x2,y2+s*0.15);c.lineTo(x2+s,y2-wing);c.closePath();c.fill();
        }
        function liz(x2,y2,s,op){
            c.fillStyle='rgba(120,100,60,'+op+')';
            c.beginPath();c.ellipse(x2,y2,s*0.8,s*0.3,0,0,Math.PI*2);c.fill();
            c.beginPath();c.arc(x2+s*0.6,y2-s*0.1,s*0.18,0,Math.PI*2);c.fill();
            // 腿
            c.strokeStyle='rgba(120,100,60,'+op*0.6+')';c.lineWidth=0.8;
            c.beginPath();c.moveTo(x2-s*0.3,y2+s*0.2);c.lineTo(x2-s*0.5,y2+s*0.5);c.stroke();
            c.beginPath();c.moveTo(x2+s*0.2,y2+s*0.2);c.lineTo(x2+s*0.4,y2+s*0.5);c.stroke();
        }
        function bug(x2,y2,s,op){
            c.fillStyle='rgba(60,80,40,'+op+')';
            c.beginPath();c.ellipse(x2,y2,s*0.5,s*0.25,0,0,Math.PI*2);c.fill();
            c.strokeStyle='rgba(60,80,40,'+op*0.6+')';c.lineWidth=0.5;
            c.beginPath();c.moveTo(x2-s*0.3,y2-s*0.15);c.lineTo(x2-s*0.5,y2-s*0.4);c.stroke();
            c.beginPath();c.moveTo(x2+s*0.3,y2-s*0.15);c.lineTo(x2+s*0.5,y2-s*0.4);c.stroke();
        }
        function fox(x2,y2,s,op){
            c.fillStyle='rgba(180,100,30,'+op+')';
            c.beginPath();c.ellipse(x2,y2,s*0.6,s*0.3,0,0,Math.PI*2);c.fill();
            c.beginPath();c.arc(x2+s*0.5,y2-s*0.08,s*0.18,0,Math.PI*2);c.fill();
            // 耳朵
            c.beginPath();c.moveTo(x2+s*0.45,y2-s*0.2);c.lineTo(x2+s*0.4,y2-s*0.35);c.lineTo(x2+s*0.55,y2-s*0.2);c.fill();
            // 眼睛
            c.fillStyle='rgba(0,0,0,'+op*0.5+')';
            c.beginPath();c.arc(x2+s*0.55,y2-s*0.12,s*0.04,0,Math.PI*2);c.fill();
        }
        function sq(x2,y2,s,op){
            c.fillStyle='rgba(140,100,50,'+op+')';
            c.beginPath();c.ellipse(x2,y2,s*0.4,s*0.25,0,0,Math.PI*2);c.fill();
            c.beginPath();c.arc(x2+s*0.3,y2-s*0.18,s*0.14,0,Math.PI*2);c.fill();
            // 大尾巴
            c.fillStyle='rgba(160,120,60,'+op*0.8+')';
            c.beginPath();c.ellipse(x2-s*0.3,y2-s*0.15,s*0.12,s*0.2,-0.3,0,Math.PI*2);c.fill();
        }
        function fish(x2,y2,s,op){
            c.fillStyle='rgba(100,150,180,'+op+')';
            c.beginPath();c.ellipse(x2,y2,s*0.6,s*0.2,0,0,Math.PI*2);c.fill();
            c.beginPath();c.moveTo(x2-s*0.5,y2);c.lineTo(x2-s*0.7,y2-s*0.15);c.lineTo(x2-s*0.7,y2+s*0.15);c.closePath();c.fill();
        }

        var animals=[
            {x:0.08,y:0.2,s:9,fn:bird,p:0,sp:0.5,name:'鸟'},
            {x:0.25,y:0.14,s:11,fn:bird,p:1,sp:0.35,name:'鹰'},
            {x:0.45,y:0.26,s:7,fn:liz,p:2,sp:0.6,name:'蜥蜴'},
            {x:0.65,y:0.18,s:10,fn:fox,p:0.6,sp:0.45,name:'狐狸'},
            {x:0.82,y:0.28,s:6,fn:sq,p:1.5,sp:0.7,name:'松鼠'},
            {x:0.15,y:0.33,s:4,fn:bug,p:2.5,sp:0.8,name:'甲虫'},
            {x:0.38,y:0.16,s:8,fn:bird,p:0.2,sp:0.6,name:'百灵'},
            {x:0.55,y:0.3,s:4,fn:bug,p:3,sp:0.85,name:'蚂蚁'},
            {x:0.72,y:0.35,s:7,fn:liz,p:1.6,sp:0.7,name:'蜥蜴'},
            {x:0.9,y:0.22,s:5,fn:bug,p:2.3,sp:0.5,name:'蝴蝶'},
            {x:0.32,y:0.32,s:5,fn:fish,p:0.8,sp:0.55,name:'鱼'},
            {x:0.6,y:0.12,s:9,fn:bird,p:1.8,sp:0.4,name:'鹤'}
        ];

        var alive=0;
        animals.forEach(function(a){
            var alive2=Math.sin(time*a.sp+a.p)>-0.1-desertPct*0.3;
            if(alive2){
                alive++;
                var aOp=0.4+Math.sin(time*0.6+a.p)*0.2;
                a.fn(a.x*x,a.y*y,a.s,aOp);
            }else{
                // 消失残影（X标记）
                var ghostOp=0.08+Math.sin(time*0.3+a.p)*0.04;
                c.strokeStyle='rgba(200,60,60,'+ghostOp+')';c.lineWidth=0.8;
                c.beginPath();c.moveTo(a.x*x-3,a.y*y-3);c.lineTo(a.x*x+3,a.y*y+3);c.stroke();
                c.beginPath();c.moveTo(a.x*x+3,a.y*y-3);c.lineTo(a.x*x-3,a.y*y+3);c.stroke();
            }
        });

        // 破碎效果（荒漠化严重时）
        if(desertPct>0.6){
            var fragOp=(desertPct-0.6)*0.3;
            c.fillStyle='rgba(200,180,140,'+fragOp*0.15+')';
            for(var fi=0;fi<Math.floor(desertPct*20);fi++){
                var fx=Math.sin(fi*2.7+time*0.2)*x*0.4+x*0.5;
                var fy=y*0.4+Math.cos(fi*1.9+time*0.15)*y*0.3;
                c.beginPath();c.arc(fx,fy,1+Math.sin(fi+time)*0.5,0,Math.PI*2);c.fill();
            }
        }

        // 数据面板
        var lost=Math.round(40-alive*3.5);
        var lostPct=Math.max(0,lost);
        c.fillStyle='rgba(0,0,0,0.7)';c.beginPath();c.roundRect(x-105,y-32,100,28,8);c.fill();
        c.strokeStyle='rgba(248,113,113,0.3)';c.lineWidth=1;c.beginPath();c.roundRect(x-105,y-32,100,28,8);c.stroke();
        // 进度条背景
        c.fillStyle='rgba(255,255,255,0.1)';c.beginPath();c.roundRect(x-100,y-18,90,6,3);c.fill();
        // 进度条填充
        var barW=lostPct/45*90;
        var barG=c.createLinearGradient(x-100,0,x-100+barW,0);
        barG.addColorStop(0,'#ef4444');barG.addColorStop(1,'#f87171');
        c.fillStyle=barG;c.beginPath();c.roundRect(x-100,y-18,barW,6,3);c.fill();
        // 文字
        c.fillStyle='#f87171';c.font='bold 11px sans-serif';c.textAlign='center';
        c.fillText('物种 -'+lostPct+'%',x-55,y-19);
        c.fillStyle='rgba(255,255,255,0.4)';c.font='9px sans-serif';
        c.fillText('存活 '+alive+'/'+animals.length,x-55,y-8);
    }

    // 主循环（缓速）
    function animate(){
        time+=0.006;
        drawWind();drawWater();drawSalin();drawBio();
        requestAnimationFrame(animate);
    }
    animate();
})();