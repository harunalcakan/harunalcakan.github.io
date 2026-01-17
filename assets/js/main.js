// THE LOGIC - Multi-page render engine, Dynamic Navbar/Footer, Typewriter Effect

// State Management
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

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
        { href: 'publications.html', label: content.sections.publications, id: 'nav-publications' },
        { href: 'projects.html', label: content.sections.projects, id: 'nav-projects' }
    ];

    const activeClass = (link) => {
        const linkPage = link.href.replace('.html', '') || 'index';
        return (linkPage === currentPage || (currentPage === 'index' && linkPage === 'index')) ? 'nav-active' : '';
    };

    const navbarHTML = `
        <nav class="fixed top-0 w-full z-50 backdrop-blur-sm bg-opacity-90 border-b transition-colors duration-300 navbar-anthracite" id="navbar">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="font-mono text-base md:text-lg">
                        <a href="index.html" class="nav-brand-link" id="nav-brand">
                            <span class="nav-prompt">></span> <span id="typewriter-text" class="typewriter-nav"></span>
                        </a>
                    </div>
                    <div class="flex items-center gap-4 md:gap-6">
                        <div class="hidden md:flex gap-4">
                            ${navLinks.map(link => `
                                <a href="${link.href}" class="nav-link ${activeClass(link)}" id="${link.id}">
                                    ${link.label}
                                </a>
                            `).join('')}
                        </div>
                        <div class="language-toggle-container">
                            <input type="checkbox" id="language-toggle-switch" class="language-toggle-input" ${currentLanguage === 'tr' ? 'checked' : ''}>
                            <label for="language-toggle-switch" class="language-toggle-label">
                                <span class="language-toggle-slider">
                                    <span class="language-toggle-flag">${currentLanguage === 'en' ? '🇬🇧' : '🇹🇷'}</span>
                                </span>
                            </label>
                        </div>
                        <button id="theme-toggle" class="btn-toggle text-xs md:text-sm">${currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Start typewriter effect
    startTypewriter();
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

function updateThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
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
    updateLanguageToggle();
    setupLanguageToggle();
}

function setupLanguageToggle() {
    const toggleSwitch = document.getElementById('language-toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', () => {
            toggleLanguage();
        });
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
    localStorage.setItem('language', currentLanguage);
    // Reload page to re-render with new language
    window.location.reload();
}

function updateLanguageToggle() {
    const toggleSwitch = document.getElementById('language-toggle-switch');
    const flagElement = document.querySelector('.language-toggle-flag');
    
    if (toggleSwitch) {
        toggleSwitch.checked = currentLanguage === 'tr';
    }
    
    if (flagElement) {
        flagElement.textContent = currentLanguage === 'en' ? '🇬🇧' : '🇹🇷';
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
        case 'publications':
            renderPublicationsPage(content);
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

    // Hero Section with intro text
    const heroHTML = `
        <section class="container mx-auto px-6 py-20 min-h-[50vh] flex items-center">
            <div class="text-center w-full fade-in max-w-3xl mx-auto">
                <p class="text-2xl md:text-3xl leading-relaxed font-mono mb-8">${content.heroIntro || content.bio}</p>
            </div>
        </section>
    `;

    // Highlights Section (Latest News or Featured Project)
    const highlightsHTML = content.news && content.news.length > 0 ? `
        <section class="container mx-auto px-6 py-12 max-w-4xl">
            <h2 class="text-3xl font-bold mb-8 font-mono text-center">${content.sections.news}</h2>
            <div class="space-y-6">
                ${content.news.slice(0, 3).map((item, index) => `
                    <div class="fade-in highlight-card p-6 rounded-lg" style="animation-delay: ${index * 0.1}s">
                        <div class="flex items-start gap-4">
                            <div class="text-sm opacity-75 font-mono min-w-[100px]">${formatDate(item.date)}</div>
                            <div class="flex-1">
                                <h3 class="text-xl font-semibold mb-2 font-mono">${item.title}</h3>
                                <p class="text-base opacity-90 leading-relaxed">${item.content}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    ` : '';

    mainContent.innerHTML = heroHTML + highlightsHTML;
}

// About Page Render
function renderAboutPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const researchTags = content.researchInterests
        .map(interest => `<span class="research-tag">${interest}</span>`)
        .join('');

    const educationHTML = content.education
        .map((edu, index) => `
            <div class="mb-6 fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-xl font-semibold mb-1 font-mono">${edu.degree}</h3>
                <p class="text-lg mb-1">${edu.institution}</p>
                <p class="text-sm opacity-75 mb-1">${edu.year}</p>
                <p class="text-sm opacity-90">${edu.description}</p>
            </div>
        `)
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-4xl font-bold mb-8 font-mono">${content.sections.about}</h1>
                <div class="mb-12">
                    <p class="text-lg leading-relaxed mb-4">${content.bio}</p>
                    <p class="text-lg leading-relaxed">${content.about}</p>
                </div>
                
                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-6 font-mono">${content.sections.research}</h2>
                    <div class="flex flex-wrap">
                        ${researchTags}
                    </div>
                </div>

                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-6 font-mono">${content.sections.education}</h2>
                    <div>
                        ${educationHTML}
                    </div>
                </div>

                <div class="mb-12">
                    <h2 class="text-3xl font-bold mb-6 font-mono">${content.sections.contact}</h2>
                    <p class="text-lg mb-4">
                        <a href="mailto:${content.email}" class="underline">${content.email}</a>
                    </p>
                    <p class="text-base opacity-75">${content.location}</p>
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
        <section class="container mx-auto px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-4xl font-bold mb-8 font-mono">${content.sections.publications}</h1>
                <div>
                    ${publicationsHTML}
                </div>
            </div>
        </section>
    `;
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
        <section class="container mx-auto px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-4xl font-bold mb-8 font-mono">${content.sections.projects}</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${projectsHTML}
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
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language toggle is handled by setupLanguageToggle()
    setupLanguageToggle();

    // Observer for theme changes to update navbar
    const observer = new MutationObserver(() => {
        updateNavbarBackground();
    });
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}