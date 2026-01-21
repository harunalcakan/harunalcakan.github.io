// THE LOGIC - Multi-page render engine, Dynamic Navbar/Footer, Typewriter Effect

// State Management
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Event listener references for cleanup
let languageToggleHandler = null;
let themeToggleHandler = null;
let mobileMenuClickHandler = null;
let mobileMenuOutsideClickHandler = null;
let mobileMenuResizeHandler = null;

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '') || 'index';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initializeTheme();
    initializeLanguage();
    renderCurrentPage();
    setupEventListeners();
    updateNavbarBackground();
});

// Dynamic Navbar Injection
function injectNavbar() {
    const content = data[currentLanguage];
    if (!content) return;

    const currentPage = getCurrentPage();
    const navLinks = [
        { href: 'index.html', label: content.sections.home, id: 'nav-home' },
        { href: 'about.html', label: content.sections.about, id: 'nav-about' },
        { href: 'portfolio.html', label: content.sections.portfolio, id: 'nav-portfolio' },
        { href: 'publications.html', label: content.sections.publications, id: 'nav-publications' },
        { href: 'contact.html', label: content.sections.contact, id: 'nav-contact' }
    ];

    const activeClass = (link) => {
        const linkPage = link.href.replace('.html', '') || 'index';
        return (linkPage === currentPage || (currentPage === 'index' && linkPage === 'index')) ? 'nav-active' : '';
    };

    const navbarHTML = `
        <nav class="fixed top-0 w-full z-50 backdrop-blur-sm bg-opacity-90 border-b transition-colors duration-300 navbar-anthracite" id="navbar">
            <div class="container mx-auto px-4 md:px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="font-mono text-sm md:text-base lg:text-lg">
                        <a href="index.html" class="nav-brand-link" id="nav-brand">
                            <span class="nav-prompt">></span> <span id="typewriter-text" class="typewriter-nav"></span>
                        </a>
                    </div>
                    <div class="flex items-center gap-2 md:gap-4 lg:gap-6 relative">
                        <!-- Desktop Navigation -->
                        <div class="hidden lg:flex gap-4">
                            ${navLinks.map(link => `
                                <a href="${link.href}" class="nav-link ${activeClass(link)}" id="${link.id}">
                                    ${link.label}
                                </a>
                            `).join('')}
                        </div>
                        <!-- Mobile/Tablet Hamburger Menu -->
                        <button id="mobile-menu-toggle" class="lg:hidden text-white p-2 focus:outline-none z-50" aria-label="Toggle menu">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <!-- Mobile/Tablet Menu -->
                        <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-700 shadow-lg z-40">
                            <div class="container mx-auto px-4 py-4 space-y-2">
                                ${navLinks.map(link => `
                                    <a href="${link.href}" class="block nav-link ${activeClass(link)} py-2 px-4 hover:bg-slate-800 rounded" id="${link.id}-mobile">
                                        ${link.label}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                        <!-- Language Toggle Pill Button -->
                        <button id="language-toggle-btn" class="language-toggle-pill ${currentLanguage === 'tr' ? 'language-toggle-active' : ''}" aria-label="Toggle language">
                            <span class="language-toggle-track">
                                <span class="language-toggle-slider">
                                    <span class="language-toggle-flag language-flag-en">🇬🇧</span>
                                    <span class="language-toggle-flag language-flag-tr">🇹🇷</span>
                                </span>
                            </span>
                        </button>
                        <button id="theme-toggle" class="btn-toggle text-xs md:text-sm">${currentTheme === 'dark' ? `☀️ ${content.sections.theme_light}` : `🌙 ${content.sections.theme_dark}`}</button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Start typewriter effect
    startTypewriter();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Setup language toggle
    setupLanguageToggle();
    updateLanguageToggle();
    
    // Setup theme toggle
    setupThemeToggle();
    updateThemeToggle();
}

// Typewriter Effect for Navbar Brand (Infinite Loop)
function startTypewriter() {
    const content = data[currentLanguage];
    if (!content) return;

    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const firstName = content.firstName || content.name.split(' ')[0];
    const lastName = content.lastName || content.name.split(' ').slice(1).join(' ') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const fullNameLength = fullName.length;
    
    let index = 0;
    let isDeleting = false;
    typewriterElement.innerHTML = '';

    function animate() {
        if (!isDeleting && index < fullNameLength) {
            // Typing forward
            const currentChar = fullName[index];
            const currentPos = index;
            
            if (currentPos < firstName.length) {
                // Typing first name
                const typedFirstName = firstName.substring(0, currentPos + 1);
                typewriterElement.innerHTML = `<span class="name-first">${typedFirstName}</span>`;
            } else if (currentPos === firstName.length) {
                // Adding space after first name
                typewriterElement.innerHTML = `<span class="name-first">${firstName}</span> `;
            } else {
                // Typing last name
                const typedLastName = lastName.substring(0, currentPos - firstName.length - 1);
                typewriterElement.innerHTML = `<span class="name-first">${firstName}</span> <span class="name-last">${typedLastName}</span>`;
            }
            
            index++;
            setTimeout(animate, 100); // Typing speed
        } else if (!isDeleting && index >= fullNameLength) {
            // Finished typing, wait 2 seconds
            typewriterElement.innerHTML = `<span class="name-first">${firstName}</span> <span class="name-last">${lastName}</span>`;
            setTimeout(() => {
                isDeleting = true;
                animate();
            }, 2000);
        } else if (isDeleting && index > 0) {
            // Deleting backward
            index--;
            const currentPos = index;
            
            if (currentPos <= firstName.length) {
                // Deleting first name
                const remainingFirstName = firstName.substring(0, currentPos);
                typewriterElement.innerHTML = remainingFirstName ? `<span class="name-first">${remainingFirstName}</span>` : '';
            } else {
                // Deleting last name
                const remainingLastName = lastName.substring(0, currentPos - firstName.length - 1);
                typewriterElement.innerHTML = `<span class="name-first">${firstName}</span> <span class="name-last">${remainingLastName}</span>`;
            }
            
            setTimeout(animate, 50); // Deleting speed (faster)
        } else if (isDeleting && index === 0) {
            // Finished deleting, wait 0.5 seconds and restart
            typewriterElement.innerHTML = '';
            isDeleting = false;
            setTimeout(() => {
                animate();
            }, 500);
        }
    }

    // Start typing after a short delay
    setTimeout(animate, 500);
}

// Dynamic Footer Injection
function injectFooter() {
    const content = data[currentLanguage];
    if (!content) return;

    const footerHTML = `
        <footer class="container mx-auto px-6 py-8 text-center opacity-75 text-sm mt-12">
            <p>&copy; <span id="current-year"></span> ${content.name}. Built with Computational Minimalism.</p>
        </footer>
    `;

    // Insert footer before closing body tag
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Update year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Theme Management
function initializeTheme() {
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    updateThemeToggle();
    updateNavbarBackground();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    initializeTheme();
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Remove old listener if it exists
        if (themeToggleHandler) {
            themeToggle.removeEventListener('click', themeToggleHandler);
        }
        
        // Create new handler and store reference
        themeToggleHandler = () => {
            toggleTheme();
        };
        
        themeToggle.addEventListener('click', themeToggleHandler);
    }
}

function updateThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const content = data[currentLanguage];
        if (content && content.sections) {
            const lightLabel = content.sections.theme_light || 'Light';
            const darkLabel = content.sections.theme_dark || 'Dark';
            themeBtn.textContent = currentTheme === 'dark' ? `☀️ ${lightLabel}` : `🌙 ${darkLabel}`;
        } else {
            // Fallback if translations not available
            themeBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }
}

function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Navbar always uses anthracite background
    navbar.classList.add('bg-slate-900');
    navbar.classList.remove('bg-white', 'bg-gray-900');
    navbar.classList.add('border-slate-700');
    navbar.classList.remove('border-gray-200', 'border-gray-800');
}

// Language Management
function initializeLanguage() {
    // Set language class and data-lang attribute on body
    document.body.classList.remove('lang-en', 'lang-tr');
    document.body.classList.add(`lang-${currentLanguage}`);
    document.body.setAttribute('data-lang', currentLanguage);
    
    updateLanguageToggle();
    // Don't call setupLanguageToggle() here - it's called in injectNavbar() and setupEventListeners()
}

function setupLanguageToggle() {
    const toggleBtn = document.getElementById('language-toggle-btn');
    if (toggleBtn) {
        // Remove old listener if it exists
        if (languageToggleHandler) {
            toggleBtn.removeEventListener('click', languageToggleHandler);
        }
        
        // Create new handler and store reference
        languageToggleHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLanguage();
        };
        
        toggleBtn.addEventListener('click', languageToggleHandler);
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    localStorage.setItem('language', currentLanguage);
    
    // Update body class and data-lang attribute
    document.body.classList.remove('lang-en', 'lang-tr');
    document.body.classList.add(`lang-${currentLanguage}`);
    document.body.setAttribute('data-lang', currentLanguage);
    
    // Clean up mobile menu listeners before removing navbar
    cleanupMobileMenu();
    
    // Remove old navbar and footer before re-injecting
    const oldNavbar = document.getElementById('navbar');
    const oldFooter = document.querySelector('footer');
    if (oldNavbar) oldNavbar.remove();
    if (oldFooter) oldFooter.remove();
    
    // Re-render navbar and content without full page reload
    injectNavbar();
    renderCurrentPage();
    injectFooter();
}

function updateLanguageToggle() {
    const toggleBtn = document.getElementById('language-toggle-btn');
    if (toggleBtn) {
        if (currentLanguage === 'tr') {
            toggleBtn.classList.add('language-toggle-active');
        } else {
            toggleBtn.classList.remove('language-toggle-active');
        }
    }
}

// Mobile Menu Management
function cleanupMobileMenu() {
    // Remove old event listeners if they exist
    if (mobileMenuClickHandler) {
        document.removeEventListener('click', mobileMenuOutsideClickHandler);
        window.removeEventListener('resize', mobileMenuResizeHandler);
        mobileMenuClickHandler = null;
        mobileMenuOutsideClickHandler = null;
        mobileMenuResizeHandler = null;
    }
}

function setupMobileMenu() {
    // Clean up old listeners first
    cleanupMobileMenu();
    
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (menuToggle && mobileMenu && menuIcon && closeIcon) {
        // Toggle menu on button click
        mobileMenuClickHandler = (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        };
        
        menuToggle.addEventListener('click', mobileMenuClickHandler);
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
        
        // Close menu when clicking outside
        mobileMenuOutsideClickHandler = (e) => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            }
        };
        
        document.addEventListener('click', mobileMenuOutsideClickHandler);
        
        // Close menu on window resize if it becomes desktop size
        mobileMenuResizeHandler = () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        };
        
        window.addEventListener('resize', mobileMenuResizeHandler);
    }
}

// Page-Specific Rendering
function renderCurrentPage() {
    const currentPage = getCurrentPage();
    const content = data[currentLanguage];
    if (!content) return;

    switch(currentPage) {
        case 'index':
            renderHomePage(content);
            break;
        case 'about':
            renderAboutPage(content);
            break;
        case 'portfolio':
            renderPortfolioPage(content);
            break;
        case 'publications':
            renderPublicationsPage(content);
            break;
        case 'contact':
            renderContactPage(content);
            break;
        // Legacy support for old URLs
        case 'research':
            renderPortfolioPage(content);
            break;
        case 'tools':
            renderPortfolioPage(content);
            break;
        case 'projects':
            renderProjectsPage(content);
            break;
        default:
            renderHomePage(content);
    }
}

// Home Page Render
function renderHomePage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Compute full name for greeting (aligned with typewriter data)
    const firstName = content.firstName || (content.name ? content.name.split(' ')[0] : '');
    const lastName = content.lastName || (content.name ? content.name.split(' ').slice(1).join(' ') : '');
    const fullName = `${firstName} ${lastName}`.trim();

    // Hero Section: two-column layout (intro text + circular profile placeholder)
    const heroHTML = `
        <section class="container mx-auto px-4 md:px-6 pt-24 pb-16 min-h-[60vh] flex items-center">
            <div class="w-full flex flex-col-reverse md:flex-row items-center md:items-start gap-10 fade-in max-w-5xl mx-auto">
                <!-- Left: Intro text -->
                <div class="w-full md:w-1/2 text-center md:text-left space-y-4">
                    <p class="text-sm md:text-base uppercase tracking-wide text-orange-400 font-mono">Hello, I'm</p>
                    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight hero-heading">
                        <span class="name-first">${firstName}</span>
                        ${lastName ? `<span class=\"\"> </span><span class=\"name-last\">${lastName}</span>` : ''}
                    </h1>
                    <p class="text-sm md:text-base font-mono hero-subtitle">
                        Research Assistant · Ankara University
                    </p>
                    <p class="text-base md:text-lg leading-relaxed mt-4 max-w-xl mx-auto md:mx-0">
                        ${content.heroIntro || 'I explore the synergy between in silico molecular modeling and electrochemical sensing platforms to design, optimize, and understand next-generation analytical systems.'}
                    </p>
                </div>

                <!-- Right: Circular profile image placeholder + 3D viewer on desktop -->
                <div class="w-full md:w-1/2 flex flex-col items-center md:items-end gap-4">
                    <div class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-slate-500 flex items-center justify-center overflow-hidden bg-slate-800/60 home-profile-circle">
                        <!-- Replace this span with an <img> tag when a real profile photo is available -->
                        <span class="text-xs md:text-sm text-slate-300 font-mono opacity-70">Profile Photo</span>
                    </div>
                    <div class="w-full flex justify-center md:justify-end">
                        <div id="ngl-viewer-container" class="ngl-viewer-container"></div>
                    </div>
                    <p class="ngl-attribution w-full md:text-right">Powered by NGL Viewer</p>
                </div>
            </div>
        </section>
    `;

    // Highlights Section (Latest News)
    const highlightsHTML = content.news && content.news.length > 0 ? `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <h2 class="text-2xl md:text-3xl font-bold mb-8 font-mono text-center">${content.sections.news}</h2>
            <div class="space-y-4">
                ${content.news.slice(0, 3).map((item, index) => `
                    <article class="fade-in highlight-card p-4 md:p-5 rounded-lg" style="animation-delay: ${index * 0.1}s">
                        <div class="flex flex-col md:flex-row items-start gap-3">
                            <div class="text-xs md:text-sm opacity-75 font-mono md:min-w-[110px]">${formatDate(item.date)}</div>
                            <div class="flex-1">
                                <h3 class="text-base md:text-lg font-semibold mb-1 font-mono">${item.title}</h3>
                                <p class="text-sm md:text-base opacity-90 leading-relaxed">${item.content}</p>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    ` : '';

    mainContent.innerHTML = heroHTML + highlightsHTML;

    // Initialize NGL viewer after DOM is updated
    initNGLViewer();
}

// NGL Viewer Initialization (homepage)
function initNGLViewer() {
    // NGL library is only loaded on index.html
    if (typeof NGL === 'undefined') return;

    const container = document.getElementById('ngl-viewer-container');
    if (!container) return;

    try {
        const stage = new NGL.Stage(container, { backgroundColor: 'transparent' });

        // Handle responsive resize
        window.addEventListener('resize', () => {
            stage.handleResize();
        });

        // Load sample protein (PDB ID 1crn - Crambin)
        stage.loadFile('rcsb://1crn').then(component => {
            component.addRepresentation('cartoon', {
                colorScheme: 'chainid'
            });
            component.autoView();
            stage.setSpin(true);
        });
    } catch (e) {
        console.error('NGL viewer initialization failed:', e);
    }
}

// About Page Render
function renderAboutPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const cvButtonHTML = content.cvLink ? `
        <div class="mb-8">
            <a href="${content.cvLink}" target="_blank" class="inline-block btn-toggle">
                ${content.sections.downloadCV || 'Download CV'}
            </a>
        </div>
    ` : '';

    // Timeline: Combine work experience and education, sorted by year (most recent first)
    const timelineItems = [];
    
    // Add work experience
    if (content.workExperience && content.workExperience.length > 0) {
        content.workExperience.forEach(item => {
            timelineItems.push({
                type: 'work',
                title: item.role,
                institution: item.institution,
                year: item.year,
                description: item.description
            });
        });
    }
    
    // Add education
    if (content.education && content.education.length > 0) {
        content.education.forEach(item => {
            timelineItems.push({
                type: 'education',
                title: item.degree,
                institution: item.institution,
                year: item.year,
                description: item.description
            });
        });
    }

    // Sort by year (extract start year for sorting)
    timelineItems.sort((a, b) => {
        const yearA = parseInt(a.year.split('-')[0]) || 0;
        const yearB = parseInt(b.year.split('-')[0]) || 0;
        return yearB - yearA; // Most recent first
    });

    const timelineHTML = timelineItems
        .map((item, index) => `
            <div class="timeline-item fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-badge">${item.year}</div>
                    <h3 class="timeline-title font-mono font-bold text-lg md:text-xl mb-1">${item.title}</h3>
                    <p class="timeline-institution text-base md:text-lg mb-2 font-semibold">${item.institution}</p>
                    <p class="timeline-description text-sm md:text-base opacity-90">${item.description}</p>
                </div>
            </div>
        `)
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.about}</h1>
                <div class="mb-12">
                    <p class="text-base md:text-lg leading-relaxed mb-4">${content.bio}</p>
                    <p class="text-base md:text-lg leading-relaxed">${content.about}</p>
                </div>
                
                ${cvButtonHTML}
                
                <!-- Work & Education Timeline -->
                <div class="mb-16">
                    <h2 class="text-2xl md:text-3xl font-bold mb-8 font-mono">${content.sections.workExperience} & ${content.sections.education}</h2>
                    <div class="timeline-container">
                        ${timelineHTML}
                    </div>
                </div>
                
                <!-- Academic & Technical Competency -->
                <div class="mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.academicCompetency}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 about-skills-grid">
                        <div class="about-skills-column">
                            <h3 class="text-xl font-semibold mb-4">Research Methodologies</h3>
                            <ul class="space-y-2 text-sm md:text-base">
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>Computational: Molecular Docking, In Silico Drug Design, Molecular Dynamics</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>Experimental: Laser-Induced Graphene (LIG), 3D Printing for Sensors, Electrochemical Analysis</span>
                                </li>
                            </ul>
                        </div>
                        <div class="about-skills-column">
                            <h3 class="text-xl font-semibold mb-4">Software & Tools</h3>
                            <ul class="space-y-2 text-sm md:text-base">
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>Gaussian</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>AutoDock</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>VMD</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>Python</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="about-skill-bullet mr-2">•</span>
                                    <span>MATLAB</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Publications Page Render
function renderPublicationsPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const publicationsHTML = content.publications
        .map((pub, index) => `
            <div class="publication-item mb-6 fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-xl font-semibold mb-2">
                    <a href="${pub.link}" target="_blank" class="hover:underline">${pub.title}</a>
                </h3>
                <p class="text-base mb-2 opacity-90">${pub.authors}</p>
                <p class="text-sm mb-2 italic">${pub.venue}, ${pub.year}</p>
                <p class="text-sm opacity-75">${pub.abstract}</p>
            </div>
        `)
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.publications}</h1>
                <div>
                    ${publicationsHTML}
                </div>
            </div>
        </section>
    `;
}

// Portfolio Page Render
function renderPortfolioPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const researchAreasHTML = content.researchAreas
        .map((area, index) => `
            <div class="research-area-card p-6 rounded-lg fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-2xl font-bold mb-3 font-mono">${area.title}</h3>
                <p class="text-base mb-4 leading-relaxed">${area.description}</p>
                ${area.methodology ? `<p class="text-sm opacity-75 italic">${area.methodology}</p>` : ''}
            </div>
        `)
        .join('');

    const scientificToolsHTML = content.tools.developed
        .map((tool, index) => `
            <div class="tool-card p-6 rounded-lg fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-2xl font-bold mb-3 font-mono">${tool.name}</h3>
                <p class="text-base mb-4 leading-relaxed">${tool.description}</p>
                ${tool.link !== '#' ? `<a href="${tool.link}" target="_blank" class="underline">${content.tools.viewProject || 'View Project'}</a>` : ''}
            </div>
        `)
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono text-center">${content.sections.portfolio}</h1>
                
                <div class="mb-16">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.researchAreas}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${researchAreasHTML}
                    </div>
                </div>

                <div class="mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.scientificTools}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${scientificToolsHTML}
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Research Page Render (Legacy support)
function renderResearchPage(content) {
    renderPortfolioPage(content);
}

// Projects Page Render
function renderProjectsPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const projectsHTML = content.projects
        .map((project, index) => {
            const techTags = project.technologies
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');

            return `
                <div class="project-card p-6 rounded-lg fade-in" style="animation-delay: ${index * 0.1}s">
                    <h3 class="text-2xl font-bold mb-3 font-mono">${project.title}</h3>
                    <p class="text-base mb-4 leading-relaxed">${project.description}</p>
                    <div class="mb-4 flex flex-wrap">
                        ${techTags}
                    </div>
                    <div class="flex gap-4">
                        ${project.link !== '#' ? `<a href="${project.link}" target="_blank" class="underline">View Project</a>` : ''}
                        ${project.github !== '#' ? `<a href="${project.github}" target="_blank" class="underline">GitHub</a>` : ''}
                    </div>
                </div>
            `;
        })
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.projects}</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${projectsHTML}
                </div>
            </div>
        </section>
    `;
}

// Tools Page Render
function renderToolsPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const developedToolsHTML = content.tools.developed
        .map((tool, index) => `
            <div class="tool-card p-6 rounded-lg fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-2xl font-bold mb-3 font-mono">${tool.name}</h3>
                <p class="text-base mb-4 leading-relaxed">${tool.description}</p>
                ${tool.link !== '#' ? `<a href="${tool.link}" target="_blank" class="underline">${content.tools.viewProject || 'View Project'}</a>` : ''}
            </div>
        `)
        .join('');

    const techStackHTML = `
        <div class="tech-stack-section fade-in">
            <h3 class="text-2xl font-bold mb-4 font-mono">${content.tools.hardware || 'Hardware'}</h3>
            <div class="flex flex-wrap gap-2 mb-6">
                ${content.tools.hardwareItems.map(item => `<span class="tech-badge">${item}</span>`).join('')}
            </div>
            <h3 class="text-2xl font-bold mb-4 font-mono">${content.tools.software || 'Software'}</h3>
            <div class="flex flex-wrap gap-2">
                ${content.tools.softwareItems.map(item => `<span class="tech-badge">${item}</span>`).join('')}
            </div>
        </div>
    `;

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-4xl font-bold mb-8 font-mono">${content.sections.tools}</h1>
                
                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-6 font-mono">${content.tools.developedTitle || 'Developed Tools'}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${developedToolsHTML}
                    </div>
                </div>

                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-6 font-mono">${content.tools.techStackTitle || 'Tech Stack'}</h2>
                    ${techStackHTML}
                </div>
            </div>
        </section>
    `;
}

// Contact Page Render
function renderContactPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const contact = content.contact || {};
    
    const academicLinksHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            ${contact.orcid ? `
                <a href="${contact.orcid}" target="_blank" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">🔬</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">ORCID</h3>
                            <p class="text-sm opacity-75">Academic Profile</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.googleScholar ? `
                <a href="${contact.googleScholar}" target="_blank" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">📚</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">Google Scholar</h3>
                            <p class="text-sm opacity-75">Publications & Citations</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.linkedin ? `
                <a href="${contact.linkedin}" target="_blank" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">💼</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">LinkedIn</h3>
                            <p class="text-sm opacity-75">Professional Network</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.github ? `
                <a href="${contact.github}" target="_blank" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">💻</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">GitHub</h3>
                            <p class="text-sm opacity-75">Code & Projects</p>
                        </div>
                    </div>
                </a>
            ` : ''}
        </div>
    `;

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono text-center">${content.sections.contact}</h1>
                
                <div class="mb-12 text-center">
                    <h2 class="text-2xl md:text-3xl font-bold mb-4 font-mono">${contact.affiliation || content.affiliation || '[University Name]'}</h2>
                    <p class="text-lg mb-2 opacity-90">${contact.location || content.location || '[City, Country]'}</p>
                </div>

                <div class="mb-12">
                    <div class="contact-info-card p-6 md:p-8 rounded-lg text-center">
                        <h3 class="text-xl font-bold mb-4 font-mono">Email</h3>
                        <a href="mailto:${contact.email || content.email}" class="text-lg md:text-xl underline break-all">
                            ${contact.email || content.email}
                        </a>
                    </div>
                </div>

                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-6 font-mono text-center">Academic Links</h2>
                    ${academicLinksHTML}
                </div>
            </div>
        </section>
    `;
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'tr-TR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Event Listeners
function setupEventListeners() {
    // Theme toggle is handled by setupThemeToggle() which is called in injectNavbar()
    // Language toggle is handled by setupLanguageToggle() which is called in injectNavbar()
    
    // Observer for theme changes to update navbar
    const observer = new MutationObserver(() => {
        updateNavbarBackground();
    });
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}