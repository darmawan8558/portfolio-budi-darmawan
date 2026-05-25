/* ==========================================================================
   PORTFOLIO INTERACTIVE SCRIPTS - BUDI DARMAWAN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard features
    initThemeToggle();
    initMobileMenu();
    initHeaderScroll();
    initHeroTyping();
    initActiveNavObserver();
    initCareerTabs();
    initSkillBarsAnimation();
    initContactFormAndCopy();
    initAuditSimulator();
    
    // Set dynamic copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. LIGHT & DARK THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun';
    } else if (savedTheme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        // Fallback to system preference (default dark if dark theme preferred, otherwise keep html class)
        if (systemPrefersDark) {
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-moon';
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
        }
    }
    
    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('portfolio-theme', 'dark');
        }
    });
}

/* ==========================================================================
   2. MOBILE NAV MENU
   ========================================================================== */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const toggleIcon = mobileToggle.querySelector('i');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        const isActive = navbar.classList.contains('mobile-active');
        toggleIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('mobile-active')) {
                navbar.classList.remove('mobile-active');
                toggleIcon.className = 'fas fa-bars';
            }
        });
    });
}

/* ==========================================================================
   3. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   4. HERO SECTON TYPING EFFECT
   ========================================================================== */
function initHeroTyping() {
    const typingTextElement = document.getElementById('typing-text');
    const words = [
        "IT Auditor.", 
        "Cybersecurity Analyst.", 
        "Banking Compliance Specialist.",
        "Certified Professional Internal Auditor."
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // Logic for transitioning states
        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing the word, pause before deleting
            isDeleting = true;
            typingSpeed = 2000; // Wait 2s before starting to delete
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to the next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Small pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing loop
    setTimeout(type, 1000);
}

/* ==========================================================================
   5. NAVIGATION SCROLL SPY (ACTIVE NAV OBSERVER)
   ========================================================================== */
function initActiveNavObserver() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/* ==========================================================================
   6. CAREER EXPERIENCE TABS INTERACTION
   ========================================================================== */
function initCareerTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPanelId = button.getAttribute('aria-controls');
            
            // Update active states for buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Update active states for panels with fade effect
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === targetPanelId) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/* ==========================================================================
   7. SKILLS PROGRESS BARS ANIMATION ON SCROLL
   ========================================================================== */
function initSkillBarsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const options = {
        root: null,
        threshold: 0.1
    };
    
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate bars
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-progress');
                    bar.style.width = width;
                });
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

/* ==========================================================================
   8. CONTACT FORM SUBMISSION & COPY TO CLIPBOARD
   ========================================================================== */
function initContactFormAndCopy() {
    // Quick-copy Email & Phone
    setupClipboardBtn('copy-email-btn', 'budi76521@gmail.com', 'Email disalin!');
    setupClipboardBtn('copy-phone-btn', '+6281219776561', 'Nomor telepon disalin!');
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;
            
            // Set loading state
            formSubmitBtn.disabled = true;
            formSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim Pesan...';
            
            // Simulate API Call
            setTimeout(() => {
                // Show success feedback
                formFeedback.textContent = `Terima kasih, ${name}! Pesan Anda mengenai "${subject}" telah berhasil disimulasikan terkirim ke Budi Darmawan.`;
                formFeedback.className = 'form-feedback success';
                formFeedback.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
                
                // Hide feedback after 8 seconds
                setTimeout(() => {
                    formFeedback.classList.add('hidden');
                }, 8000);
            }, 1500);
        });
    }
}

// Clipboard copying utility
function setupClipboardBtn(btnId, copyText, successMsg) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyText).then(() => {
            // Show temporary success banner using a small DOM tooltip
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `${copyText} <span style="color: var(--color-success); font-size: 0.75rem; margin-left: 0.5rem;"><i class="fas fa-check"></i> ${successMsg}</span>`;
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2500);
        }).catch(err => {
            console.error('Gagal menyalin teks: ', err);
        });
    });
}

/* ==========================================================================
   9. INTERACTIVE IT AUDIT RISK SIMULATOR (FEATURE WOW FACTOR)
   ========================================================================== */
function initAuditSimulator() {
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const runBtn = document.getElementById('run-audit-btn');
    const terminalScreen = document.getElementById('terminal-screen');
    
    let activeScenario = 'drc';
    let isRunning = false;
    
    // Map of scenarios log scripts
    const scenarioScripts = {
        drc: [
            { text: "guest@budi-portfolio:~$ python budi-audit-engine.py --scenario kelayakan-drc", type: "input" },
            { text: "[*] Inisialisasi Audit Kelayakan Data Center (DC) & Disaster Recovery Center (DRC)...", type: "system" },
            { text: "[*] Mengambil data SOP BCP (Business Continuity Plan) Bank SBI Indonesia...", type: "system" },
            { text: "[+] SOP ditemukan: BCP-POL-V3.4 (Terakhir diperbarui: Maret 2022). OK.", type: "output" },
            { text: "[*] Menganalisis parameter pemulihan teknis:", type: "system" },
            { text: "    - Target RPO (Recovery Point Objective): < 4 Jam", type: "output" },
            { text: "    - Target RTO (Recovery Time Objective): < 2 Jam", type: "output" },
            { text: "[*] Memeriksa data historis DRC Drill...", type: "system" },
            { text: "    - DRC Drill Tahunan: Terakhir dilaksanakan tanggal 12 November 2021", type: "output" },
            { text: "    - Status Keberhasilan Failover Database: 99.8% (Durasi: 1 jam 15 menit)", type: "output" },
            { text: "[!] MEMERIKSA INFRASRUKTUR DC UTAMA & DRC CADANGAN...", type: "alert" },
            { text: "    - Catu Daya Listrik Ganda (Dual Grid Grid): COMPLIANT", type: "output" },
            { text: "    - Sistem Pemadam Kebakaran Aerosol FM200: COMPLIANT", type: "output" },
            { text: "    - Kontrol Akses Biometrik DC & DRC: COMPLIANT", type: "output" },
            { text: "[+] Seluruh Infrastruktur DC / DRC memenuhi standar kepatuhan fisik.", type: "success" },
            { text: "=================== HASIL AUDIT IT (DRC) ===================", type: "system" },
            { text: "STATUS KEPATUHAN: COMPLIANT (MEMENUHI SYARAT)", type: "success" },
            { text: "REKOMENDASI AUDIT BUDI DARMAWAN:", type: "alert" },
            { text: "1. Segera lakukan pengujian DRC Drill semesteran (bukan hanya tahunan) untuk mematangkan kesiapan tim operasional.", type: "output" },
            { text: "2. Tingkatkan kapasitas link replikasi data DC-DRC dari 1Gbps ke 10Gbps untuk mengantisipasi lonjakan volume transaksi.", type: "output" }
        ],
        iso27001: [
            { text: "guest@budi-portfolio:~$ python budi-audit-engine.py --scenario iso-27001", type: "input" },
            { text: "[*] Menjalankan Kepatuhan Sistem Manajemen Keamanan Informasi (ISMS - ISO 27001)...", type: "system" },
            { text: "[*] Memeriksa klausul utama dari Lampiran A (Annex A) Kontrol ISO 27001...", type: "system" },
            { text: "[*] Memeriksa Kontrol A.9 - Kontrol Akses Pengguna:", type: "system" },
            { text: "    - Kebijakan Sandi Kompleks: AKTIF (Minimum 12 karakter + MFA)", type: "output" },
            { text: "    - Review Hak Akses Pengguna Semesteran: AKTIF. OK.", type: "output" },
            { text: "[*] Memeriksa Kontrol A.12 - Keamanan Operasi:", type: "system" },
            { text: "    - Proteksi Terhadap Malware & Antivirus Sentral: COMPLIANT", type: "output" },
            { text: "    - Pencadangan Log Keamanan (SIEM Log Analytics): COMPLIANT", type: "output" },
            { text: "[*] Memeriksa Kontrol A.15 - Hubungan Pemasok (Vendor/Pihak Ketiga)...", type: "system" },
            { text: "[!] DETEKSI TEMUAN AUDIT (MINOR FINDINGS):", type: "critical" },
            { text: "    - Ditemukan 2 Vendor IT Outsource yang memiliki akses VPN permanen (tanpa batasan waktu/expired).", type: "critical" },
            { text: "    - Dokumen Due Diligence Keamanan Informasi Vendor belum diperbarui untuk periode 2023.", type: "critical" },
            { text: "================ HASIL AUDIT IT (ISO 27001) ================", type: "system" },
            { text: "STATUS KEPATUHAN: MINOR FINDINGS (DENGAN TEMUAN MINOR)", type: "critical" },
            { text: "REKOMENDASI AUDIT BUDI DARMAWAN:", type: "alert" },
            { text: "1. Terapkan prinsip Zero-Trust Network Access (ZTNA). Hak akses VPN vendor harus dibatasi secara dinamis dan diatur otomatis nonaktif setelah 8 jam kerja.", type: "output" },
            { text: "2. Wajibkan pembaruan dokumen kuesioner risiko keamanan informasi (Due Diligence) pihak ketiga setiap tahun sebelum perpanjangan kontrak.", type: "output" }
        ],
        lhpk: [
            { text: "guest@budi-portfolio:~$ python budi-audit-engine.py --scenario lhpk-sistem-pembayaran", type: "input" },
            { text: "[*] Inisialisasi Audit Kepatuhan Regulasi Sistem Pembayaran Bank Indonesia...", type: "system" },
            { text: "[*] Mengakses data parameter transaksi Mobile Banking & Internet Banking...", type: "system" },
            { text: "[*] Mengevaluasi Batas Limit Harian Transaksi QRIS & Transfer Dana:", type: "system" },
            { text: "    - Limit QRIS Harian: Rp 10.000.000 (Sesuai ketentuan BI). OK.", type: "output" },
            { text: "    - Kecepatan Transfer BI-FAST: Rata-rata < 15 detik (SLA BI terpenuhi). OK.", type: "output" },
            { text: "[*] Memeriksa Penanganan Pengaduan Nasabah (Customer Complaint Handling):", type: "system" },
            { text: "    - Rata-rata penyelesaian sengketa transaksi: 3 hari kerja (Target regulator: maks 20 hari). EXCELLENT.", type: "output" },
            { text: "[*] Mengevaluasi LHPK Terkait Sistem Pembayaran:", type: "system" },
            { text: "    - Format berkas LHPK & Single Customer View (SCV) untuk LPS: COMPLIANT", type: "output" },
            { text: "    - Integritas data enkripsi pengiriman data regulator (BI-RTGS): COMPLIANT", type: "output" },
            { text: "[+] Semua indikator kepatuhan regulator sistem pembayaran terpenuhi 100%.", type: "success" },
            { text: "=================== HASIL AUDIT IT (LHPK) ===================", type: "system" },
            { text: "STATUS KEPATUHAN: EXCELLENT (SANGAT BAIK)", type: "success" },
            { text: "REKOMENDASI AUDIT BUDI DARMAWAN:", type: "alert" },
            { text: "1. Lanjutkan tata kelola pelaporan sistem pembayaran saat ini karena sudah sangat solid dan patuh terhadap regulasi BI, OJK, dan LPS.", type: "output" },
            { text: "2. Disarankan melakukan stress-testing pada load balancer sistem pembayaran mobile banking menjelang periode high-traffic (misal: THR Lebaran/Tahun Baru).", type: "output" }
        ]
    };
    
    // Choose active scenario
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isRunning) return; // Block clicking while audit script is running
            
            scenarioBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeScenario = btn.getAttribute('data-scenario');
            
            // Clean up terminal and show initial prompt for chosen scenario
            terminalScreen.innerHTML = `
                <div class="terminal-line"><span class="t-prompt">guest@budi-portfolio:~$</span> select-scenario ${activeScenario}</div>
                <div class="terminal-line t-output">Scenario set to: <strong>${activeScenario.toUpperCase()} COMPLIANCE CHECK</strong>.</div>
                <div class="terminal-line t-output">Klik "JALANKAN AUDIT SCAN" di panel kiri untuk memulai analisis audit...</div>
            `;
        });
    });
    
    // Run Simulator Output typing
    runBtn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        runBtn.disabled = true;
        runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> MEMINDAI SISTEM...';
        
        terminalScreen.innerHTML = '';
        const script = scenarioScripts[activeScenario];
        let lineIdx = 0;
        
        function printNextLine() {
            if (lineIdx < script.length) {
                const lineData = script[lineIdx];
                const lineDiv = document.createElement('div');
                
                // Add classes based on line type
                lineDiv.className = 'terminal-line';
                if (lineData.type === 'system') {
                    lineDiv.classList.add('t-system');
                } else if (lineData.type === 'output') {
                    lineDiv.classList.add('t-output');
                } else if (lineData.type === 'alert') {
                    lineDiv.classList.add('t-alert');
                } else if (lineData.type === 'critical') {
                    lineDiv.classList.add('t-critical');
                } else if (lineData.type === 'success') {
                    lineDiv.classList.add('t-success-msg');
                }
                
                // Structure for prompt line
                if (lineData.type === 'input') {
                    lineDiv.innerHTML = `<span class="t-prompt">guest@budi-portfolio:~$</span> ${lineData.text.replace('guest@budi-portfolio:~$ ', '')}`;
                } else {
                    lineDiv.innerHTML = lineData.text;
                }
                
                // Highlight box styling for the results block
                if (lineData.text.startsWith('STATUS KEPATUHAN') || lineData.text.startsWith('REKOMENDASI AUDIT')) {
                    lineDiv.classList.add('t-highlight-box');
                }
                
                terminalScreen.appendChild(lineDiv);
                
                // Scroll to bottom of terminal
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
                
                lineIdx++;
                
                // Dynamic speed (input line and result box lines are printed slower, standard logs faster)
                let delay = 150;
                if (lineData.type === 'input') delay = 500;
                if (lineData.type === 'critical' || lineData.type === 'alert') delay = 350;
                if (lineData.text.includes('=====')) delay = 400;
                
                setTimeout(printNextLine, delay);
            } else {
                // Done running simulation
                isRunning = false;
                runBtn.disabled = false;
                runBtn.innerHTML = '<i class="fas fa-play"></i> JALANKAN AUDIT SCAN';
            }
        }
        
        // Start printing
        printNextLine();
    });
}
