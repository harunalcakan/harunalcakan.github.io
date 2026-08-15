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
let profileLightboxHandler = null;
let profileLightboxKeyHandler = null;
let nglResizeHandler = null;

// Utility helpers
function isValidLink(link) {
    return Boolean(link && link !== '#' && !String(link).endsWith('#'));
}

function buildResearchGateSearchLink(title, authorName) {
    const query = encodeURIComponent(`${title} ${authorName || ''}`.trim());
    return `https://www.researchgate.net/search/publication?q=${query}`;
}

function resolvePublicationLink(item, content) {
    if (isValidLink(item.link)) return item.link;
    if (isValidLink(item.doi_link)) return item.doi_link;
    if (isValidLink(item.researchgate_link)) return item.researchgate_link;
    const profile = content.contact?.researchgate;
    if (item.title && isValidLink(profile)) {
        return buildResearchGateSearchLink(item.title, content.name);
    }
    return profile || '#';
}

function getPagePath(page) {
    return page === 'index' ? '' : `${page}.html`;
}

function getProfileInitials(content) {
    const first = (content.firstName || content.name?.split(' ')[0] || '').charAt(0);
    const last = (content.lastName || content.name?.split(' ').slice(1).join(' ') || '').charAt(0);
    return (first + last).toUpperCase() || 'HN';
}

function getFlagSVG(lang) {
    if (lang === 'tr') {
        return `<svg class="lang-flag-icon" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="3" height="2" fill="#E30A17"/><circle cx="1.15" cy="1" r="0.4" fill="#fff"/><circle cx="1.28" cy="1" r="0.32" fill="#E30A17"/><polygon fill="#fff" points="1.7,0.78 1.77,0.97 1.97,0.97 1.81,1.09 1.88,1.28 1.7,1.16 1.52,1.28 1.59,1.09 1.43,0.97 1.63,0.97"/></svg>`;
    }
    return `<svg class="lang-flag-icon" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="gb-t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z"/></clipPath><g clip-path="url(#gb-s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#gb-t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>`;
}

function buildNavAvatarHTML(content) {
    const initials = getProfileInitials(content);
    const imageSrc = content.profileImage || '';
    const label = content.sections?.profilePhoto || 'Profile photo';

    if (imageSrc) {
        return `
            <button type="button" id="nav-profile-avatar" class="nav-profile-avatar" aria-label="${label}">
                <img src="${imageSrc}" alt="" class="nav-profile-img" onerror="this.remove(); this.parentElement.classList.add('nav-profile-avatar-fallback-only');">
                <span class="nav-profile-fallback">${initials}</span>
            </button>
        `;
    }

    return `
        <button type="button" id="nav-profile-avatar" class="nav-profile-avatar nav-profile-avatar-fallback-only" aria-label="${label}">
            <span class="nav-profile-fallback">${initials}</span>
        </button>
    `;
}

function closeProfileLightbox() {
    const lightbox = document.getElementById('profile-lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.classList.remove('lightbox-open');
    }
}

function setupProfileLightbox(content) {
    const avatar = document.getElementById('nav-profile-avatar');
    const imageSrc = content.profileImage;
    if (!avatar) return;

    if (profileLightboxHandler) {
        avatar.removeEventListener('click', profileLightboxHandler);
    }

    profileLightboxHandler = () => {
        if (!imageSrc) return;

        let lightbox = document.getElementById('profile-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'profile-lightbox';
            lightbox.className = 'profile-lightbox hidden';
            lightbox.innerHTML = `
                <div class="profile-lightbox-backdrop" data-close-lightbox></div>
                <figure class="profile-lightbox-content">
                    <button type="button" class="profile-lightbox-close" data-close-lightbox aria-label="${content.sections.closePhoto || 'Close'}">&times;</button>
                    <img id="profile-lightbox-img" src="" alt="${content.name}" class="profile-lightbox-img">
                </figure>
            `;
            document.body.appendChild(lightbox);
            lightbox.querySelectorAll('[data-close-lightbox]').forEach(el => {
                el.addEventListener('click', closeProfileLightbox);
            });
            profileLightboxKeyHandler = (e) => {
                if (e.key === 'Escape') closeProfileLightbox();
            };
            document.addEventListener('keydown', profileLightboxKeyHandler);
        }

        const img = document.getElementById('profile-lightbox-img');
        if (img) img.src = imageSrc;
        lightbox.classList.remove('hidden');
        document.body.classList.add('lightbox-open');
    };

    avatar.addEventListener('click', profileLightboxHandler);
}

function sortTimelineByYear(items) {
    return [...items].sort((a, b) => {
        const yearA = parseInt(String(a.year).split(/[–-]/)[0], 10) || 0;
        const yearB = parseInt(String(b.year).split(/[–-]/)[0], 10) || 0;
        return yearB - yearA;
    });
}

function buildHomeTitleLine(content) {
    if (currentLanguage === 'tr') {
        return `${content.title}, ${content.heroAffiliationShort} ${content.sections.homeDepartment}`;
    }
    const at = content.sections.homeAt ? ` ${content.sections.homeAt} ` : ' at ';
    return `${content.title}${at}${content.sections.homeDepartment}, @${content.heroAffiliationShort}`;
}

function buildHomeProfileSidebarHTML(content) {
    const initials = getProfileInitials(content);
    const imageSrc = content.profileImage || '';
    const contact = content.contact || {};

    const photoHTML = imageSrc
        ? `<img src="${imageSrc}" alt="${content.name}" class="home-profile-large-img" onerror="this.remove(); this.parentElement.classList.add('home-profile-large-fallback');">`
        : '';

    return `
        <aside class="home-hero-sidebar fade-in">
            <div class="home-profile-large ${imageSrc ? '' : 'home-profile-large-fallback'}">
                ${photoHTML}
                <span class="home-profile-large-initials">${initials}</span>
            </div>
            <div class="home-sidebar-info">
                <p>${content.sections.homeDepartment}</p>
                <p>${content.heroAffiliationShort || contact.affiliation || content.affiliation}</p>
                <p>${contact.location || content.location}</p>
            </div>
        </aside>
    `;
}

function buildHomeWorkGlimpseCompactHTML(item, content) {
    if (!item || item.type !== 'ngl') return '';
    return `
        <div class="home-work-glimpse fade-in">
            <p class="home-work-glimpse-label font-mono text-sm mb-3">${content.sections.workGlimpse || ''}</p>
            <div id="ngl-viewer-container-home" class="ngl-viewer-container ngl-viewer-home mx-auto" data-pdb="${item.pdbCode || '1crn'}"></div>
            <p class="ngl-attribution text-right mt-2">${content.sections.nglAttribution || ''}</p>
        </div>
    `;
}

function buildLiteratureNotesListHTML(notes, startDelay = 0) {
    return notes.map((item, index) => `
        <article class="literature-note-card p-5 md:p-6 rounded-lg fade-in" style="animation-delay: ${startDelay + index * 0.08}s">
            <div class="flex flex-col md:flex-row items-start gap-3 md:gap-4">
                <time class="literature-note-date text-xs md:text-sm font-mono md:min-w-[110px] shrink-0">${formatDate(item.date)}</time>
                <div class="flex-1 min-w-0">
                    ${item.title ? `<h3 class="literature-note-title text-base md:text-lg font-semibold mb-2 font-mono">${item.title}</h3>` : ''}
                    <p class="literature-note-summary leading-relaxed">${item.summary || item.content || ''}</p>
                    ${item.tags && item.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-2 mt-3">
                            ${item.tags.map(tag => `<span class="literature-note-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

function buildWorkGlimpseHTML(item, index, content) {
    if (item.type === 'ngl') {
        return `
            <article class="work-glimpse-item fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="work-glimpse-title text-lg md:text-xl font-semibold mb-2 font-mono">${item.title}</h3>
                ${item.caption ? `<p class="work-glimpse-caption text-sm md:text-base mb-4 max-w-3xl">${item.caption}</p>` : ''}
                <div id="ngl-viewer-container-${index}" class="ngl-viewer-container ngl-viewer-portfolio mx-auto" data-pdb="${item.pdbCode || '1crn'}"></div>
                <p class="ngl-attribution text-center md:text-right mt-3">${content.sections.nglAttribution || ''}</p>
            </article>
        `;
    }

    if (item.type === 'image' && item.image) {
        return `
            <article class="work-glimpse-item fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="work-glimpse-title text-lg md:text-xl font-semibold mb-2 font-mono">${item.title}</h3>
                ${item.caption ? `<p class="work-glimpse-caption text-sm md:text-base mb-4 max-w-3xl">${item.caption}</p>` : ''}
                <figure class="work-glimpse-figure mx-auto">
                    <img src="${item.image}" alt="${item.title}" class="work-glimpse-image" loading="lazy">
                </figure>
            </article>
        `;
    }

    return '';
}

function initNGLViewers() {
    if (typeof NGL === 'undefined') return;

    const containers = document.querySelectorAll('[id^="ngl-viewer-container"]');
    if (!containers.length) return;

    if (nglResizeHandler) {
        window.removeEventListener('resize', nglResizeHandler);
        nglResizeHandler = null;
    }

    const stages = [];

    containers.forEach(container => {
        container.innerHTML = '';
        try {
            const stage = new NGL.Stage(container, { backgroundColor: 'transparent' });
            stages.push(stage);
            const pdbCode = container.dataset.pdb || data[currentLanguage]?.pdbCode || '1crn';
            stage.loadFile(`rcsb://${pdbCode}`).then(component => {
                component.addRepresentation('cartoon', { colorScheme: 'chainid' });
                component.autoView();
                stage.setSpin(true);
            });
        } catch (e) {
            console.error('NGL viewer initialization failed:', e);
        }
    });

    if (stages.length) {
        nglResizeHandler = () => stages.forEach(stage => stage.handleResize());
        window.addEventListener('resize', nglResizeHandler);
    }
}

function buildTimelineHTML(items, baseDelay = 0) {
    return items.map((item, index) => `
        <div class="timeline-item fade-in" style="animation-delay: ${baseDelay + index * 0.1}s">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-badge">${item.year}</div>
                <h3 class="timeline-title font-mono font-bold text-lg md:text-xl mb-1">${item.title}</h3>
                <p class="timeline-institution text-base md:text-lg mb-2 font-semibold">${item.institution}</p>
                ${item.description ? `<p class="timeline-description text-sm md:text-base opacity-90">${item.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function getAbsolutePageUrl(content, page) {
    const baseUrl = (content.site?.baseUrl || window.location.origin).replace(/\/$/, '');
    const path = getPagePath(page);
    return path ? `${baseUrl}/${path}` : `${baseUrl}/`;
}

function getAbsoluteAssetUrl(content, assetPath) {
    const baseUrl = (content.site?.baseUrl || window.location.origin).replace(/\/$/, '');
    const normalized = String(assetPath || '').replace(/^\//, '');
    return `${baseUrl}/${normalized}`;
}

function upsertMetaTag(selector, attributes) {
    const key = Object.entries(attributes).map(([k, v]) => `${k}=${v}`).join(';');
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement('meta');
        Object.entries(attributes).forEach(([name, value]) => el.setAttribute(name, value));
        el.dataset.seoKey = key;
        document.head.appendChild(el);
    }
    if (attributes.content !== undefined) {
        el.setAttribute('content', attributes.content);
    }
}

function upsertLinkTag(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

function extractConferenceYear(conf) {
    if (conf.year) return Number(conf.year);
    const match = String(conf.venue || '').match(/\b(20\d{2})\b/);
    return match ? parseInt(match[1], 10) : 0;
}

function groupConferencesByYear(conferences) {
    const groups = new Map();
    conferences.forEach(conf => {
        const year = extractConferenceYear(conf);
        if (!groups.has(year)) groups.set(year, []);
        groups.get(year).push(conf);
    });
    return Array.from(groups.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([year, items]) => ({ year, items }));
}

function buildPersonSchema(content) {
    const contact = content.contact || {};
    const sameAs = [
        contact.orcid,
        contact.researchgate,
        contact.linkedin,
        contact.github,
        contact.googleScholar
    ].filter(isValidLink);

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: content.name,
        jobTitle: content.title,
        email: `mailto:${contact.email || content.email}`,
        url: getAbsolutePageUrl(content, 'index'),
        image: getAbsoluteAssetUrl(content, content.site?.ogImage),
        affiliation: {
            '@type': 'Organization',
            name: content.heroAffiliationShort || content.affiliation
        },
        sameAs
    };
}

function buildPageSchema(content, page) {
    const pageUrl = getAbsolutePageUrl(content, page);
    const descriptions = content.metaDescriptions || {};
    const titles = content.pageTitles || {};

    const graph = [
        buildPersonSchema(content),
        {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: titles[page] || titles.index,
            description: descriptions[page] || descriptions.index,
            inLanguage: currentLanguage === 'tr' ? 'tr-TR' : 'en-US',
            isPartOf: {
                '@type': 'WebSite',
                name: content.name,
                url: getAbsolutePageUrl(content, 'index')
            }
        }
    ];

    if (page === 'publications') {
        const articles = content.publications?.articles || [];
        articles.forEach((article, index) => {
            if (!isValidLink(article.doi_link)) return;
            graph.push({
                '@type': 'ScholarlyArticle',
                '@id': `${pageUrl}#article-${index + 1}`,
                headline: article.title,
                url: article.doi_link,
                author: { '@type': 'Person', name: content.name },
                isPartOf: { '@id': `${pageUrl}#webpage` }
            });
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

function updateJsonLd(content, page) {
    let script = document.getElementById('jsonld-schema');
    if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'jsonld-schema';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(buildPageSchema(content, page));
}

function updatePageMeta() {
    const content = data[currentLanguage];
    if (!content) return;

    const page = getCurrentPage();
    const titles = content.pageTitles || {};
    const descriptions = content.metaDescriptions || {};
    const title = titles[page] || titles.index || content.name;
    const description = descriptions[page] || descriptions.index || content.heroIntro;
    const pageUrl = getAbsolutePageUrl(content, page);
    const imageUrl = getAbsoluteAssetUrl(content, content.site?.ogImage);
    const locale = currentLanguage === 'tr' ? 'tr_TR' : 'en_US';
    const altLocale = currentLanguage === 'tr' ? 'en_US' : 'tr_TR';

    document.title = title;
    document.documentElement.lang = currentLanguage;

    upsertMetaTag('meta[name="description"]', { name: 'description', content: description });

    upsertMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: content.name });
    upsertMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMetaTag('meta[property="og:url"]', { property: 'og:url', content: pageUrl });
    upsertMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: locale });
    upsertMetaTag('meta[property="og:locale:alternate"]', { property: 'og:locale:alternate', content: altLocale });

    upsertMetaTag('meta[name="twitter:card"]', {
        name: 'twitter:card',
        content: content.site?.twitterCard || 'summary_large_image'
    });
    upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    upsertLinkTag('canonical', pageUrl);
    updateJsonLd(content, page);
}

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
    updatePageMeta();
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
        { href: 'research.html', label: content.sections.research, id: 'nav-research' },
        { href: 'publications.html', label: content.sections.publications, id: 'nav-publications' },
        { href: 'notes.html', label: content.sections.literatureNotes, id: 'nav-notes' },
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
                    <div class="flex items-center gap-2 md:gap-3 min-w-0">
                        ${buildNavAvatarHTML(content)}
                        <div class="font-mono text-sm md:text-base lg:text-lg min-w-0">
                            <a href="index.html" class="nav-brand-link" id="nav-brand">
                                <span class="nav-prompt">></span> <span id="typewriter-text" class="typewriter-nav"></span>
                            </a>
                        </div>
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
                                <span class="language-flag-slot language-flag-en-slot">${getFlagSVG('en')}</span>
                                <span class="language-flag-slot language-flag-tr-slot">${getFlagSVG('tr')}</span>
                                <span class="language-toggle-slider"></span>
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

    setupProfileLightbox(content);
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
            <p>&copy; <span id="current-year"></span> ${content.name}. ${content.sections.footerTagline}</p>
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
    const isDark = currentTheme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode', !isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    updateThemeToggle();
    updateNavbarBackground();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    initializeTheme();
    renderCurrentPage();
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
    updatePageMeta();
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
            if (window.innerWidth >= 1024) {
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
        case 'research':
        case 'portfolio':
            renderResearchPage(content);
            break;
        case 'publications':
            renderPublicationsPage(content);
            break;
        case 'notes':
            renderLiteratureNotesPage(content);
            break;
        case 'contact':
            renderContactPage(content);
            break;
        default:
            renderHomePage(content);
    }
}

// Home Page Render
function renderHomePage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const firstGlimpse = (content.workGlimpses || [])[0];
    const workGlimpseHTML = buildHomeWorkGlimpseCompactHTML(firstGlimpse, content);

    const heroHTML = `
        <section class="container mx-auto px-4 md:px-6 pt-28 pb-10 max-w-6xl">
            <div class="home-hero-grid fade-in">
                <div class="home-hero-main">
                    <h1 class="home-hero-name text-3xl md:text-4xl lg:text-5xl font-bold mb-3">${content.name}</h1>
                    <p class="home-hero-title text-base md:text-lg mb-5 opacity-90">${buildHomeTitleLine(content)}</p>
                    <p class="home-hero-bio text-base md:text-lg leading-relaxed">${content.heroIntro}</p>
                    ${workGlimpseHTML}
                </div>
                ${buildHomeProfileSidebarHTML(content)}
            </div>
        </section>
    `;

    const notes = content.literatureNotes || [];
    const homeNotes = notes.slice(0, 3);
    const literatureHTML = homeNotes.length > 0 ? `
        <section class="container mx-auto px-4 md:px-6 py-10 max-w-5xl home-literature-section">
            <h2 class="text-2xl md:text-3xl font-bold mb-3 font-mono lowercase">${content.sections.literatureNotes || ''}</h2>
            ${content.literatureNotesIntro ? `<p class="literature-section-intro mb-6 max-w-3xl">${content.literatureNotesIntro}</p>` : ''}
            <div class="space-y-4">
                ${buildLiteratureNotesListHTML(homeNotes)}
            </div>
            ${notes.length > 0 ? `
                <p class="mt-6">
                    <a href="notes.html" class="publication-title-link text-sm font-mono">${content.sections.viewAllNotes || ''}</a>
                </p>
            ` : ''}
        </section>
    ` : '';

    mainContent.innerHTML = heroHTML + literatureHTML;

    initNGLViewers();
}

// Literature Notes Page Render
function renderLiteratureNotesPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const notes = content.literatureNotes || [];
    const listHTML = notes.length > 0
        ? `<div class="space-y-4">${buildLiteratureNotesListHTML(notes)}</div>`
        : `<p class="literature-empty-state text-base md:text-lg leading-relaxed opacity-80">${content.sections.literatureNotesEmpty || ''}</p>`;

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 font-mono lowercase">${content.sections.literatureNotes || ''}</h1>
                ${content.literatureNotesIntro ? `<p class="literature-section-intro mb-8 max-w-3xl">${content.literatureNotesIntro}</p>` : ''}
                ${listHTML}
            </div>
        </section>
    `;
}

// About Page Render
function renderAboutPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const cvButtonHTML = content.cvLink && isValidLink(content.cvLink) ? `
        <div class="mb-10">
            <a href="${content.cvLink}" target="_blank" rel="noopener" download class="inline-block btn-toggle">
                ${content.sections.downloadCV}
            </a>
        </div>
    ` : '';

    const workItems = sortTimelineByYear(
        (content.workExperience || []).map(item => ({
            title: item.role,
            institution: item.institution,
            year: item.year,
            description: item.description
        }))
    );

    const educationItems = sortTimelineByYear(
        (content.education || []).map(item => ({
            title: item.degree,
            institution: item.institution,
            year: item.year,
            description: item.description
        }))
    );

    const workTimelineHTML = workItems.length > 0 ? `
        <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-8 font-mono">${content.sections.workExperience}</h2>
            <div class="timeline-container">
                ${buildTimelineHTML(workItems)}
            </div>
        </div>
    ` : '';

    const educationTimelineHTML = educationItems.length > 0 ? `
        <div class="mb-16">
            <h2 class="text-2xl md:text-3xl font-bold mb-8 font-mono">${content.sections.education}</h2>
            <div class="timeline-container">
                ${buildTimelineHTML(educationItems, 0.05)}
            </div>
        </div>
    ` : '';

    const thesis = content.thesis || {};
    const thesisHTML = thesis.title ? `
        <div class="thesis-card p-6 rounded-lg mb-12 fade-in">
            <h2 class="text-xl md:text-2xl font-bold mb-4 font-mono">${content.sections.thesis || ''}</h2>
            <div class="space-y-2 text-sm md:text-base">
                <h3 class="text-base md:text-lg font-semibold leading-snug">${thesis.title}</h3>
                <p class="opacity-90">${thesis.institution || ''}</p>
                ${thesis.year ? `<p class="opacity-80">${content.sections.thesisYear || ''}: ${thesis.year}</p>` : ''}
                ${thesis.type ? `<p class="opacity-80">${content.sections.thesisType || ''}: ${thesis.type}</p>` : ''}
                ${thesis.language ? `<p class="opacity-80">${content.sections.thesisLanguage || ''}: ${thesis.language}</p>` : ''}
                ${thesis.subject ? `<p class="opacity-80">${content.sections.thesisSubject || ''}: ${thesis.subject}</p>` : ''}
                ${thesis.advisors ? `<p class="opacity-80">${content.sections.thesisAdvisor || ''}: ${thesis.advisors}</p>` : ''}
                ${thesis.coAdvisor ? `<p class="opacity-80">${content.sections.thesisCoAdvisor || ''}: ${thesis.coAdvisor}</p>` : ''}
                ${thesis.gpa ? `<p class="opacity-80">${content.sections.thesisGpa || ''}: ${thesis.gpa}</p>` : ''}
            </div>
            ${isValidLink(thesis.link) ? `
                <a href="${thesis.link}" target="_blank" rel="noopener" class="inline-block mt-4 text-sm font-mono publication-title-link">
                    ${content.sections.viewOnResearchGate || 'ResearchGate'} →
                </a>
            ` : ''}
        </div>
    ` : '';

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.about}</h1>
                <div class="mb-10">
                    <p class="text-base md:text-lg leading-relaxed">${content.bio}</p>
                </div>

                ${cvButtonHTML}
                ${thesisHTML}
                ${workTimelineHTML}
                ${educationTimelineHTML}
            </div>
        </section>
    `;
}

// Publications Page Render
function renderPublicationsPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Support both new structure (publications.articles) and legacy flat array
    const publicationsData = content.publications || {};

    const articles = Array.isArray(publicationsData.articles)
        ? publicationsData.articles
        : (Array.isArray(content.publications) ? content.publications : []);

    const conferences = Array.isArray(publicationsData.conferences)
        ? publicationsData.conferences
        : [];

    const publicationsHTML = articles
        .map((pub, index) => {
            const doiLink = pub.doi_link || pub.link || '#';
            const apaCitation = pub.apa_citation || [
                pub.authors,
                pub.year ? `(${pub.year}).` : '',
                pub.title,
                pub.venue
            ].filter(Boolean).join(' ');

            return `
            <div class="publication-item mb-6 fade-in" style="animation-delay: ${index * 0.1}s">
                <h3 class="text-xl font-semibold mb-2">
                    <a href="${doiLink}" target="_blank" rel="noopener" class="publication-title-link">${pub.title}</a>
                </h3>
                <p class="publication-citation">
                    ${apaCitation}
                </p>
            </div>
            `;
        })
        .join('');

    const conferencesHTML = groupConferencesByYear(conferences)
        .map((group, groupIndex) => {
            const itemsHTML = group.items.map((conf, index) => {
                const confLink = resolvePublicationLink(conf, content);
                const titleMarkup = isValidLink(confLink) && confLink !== '#'
                    ? `<a href="${confLink}" target="_blank" rel="noopener" class="publication-title-link">${conf.title}</a>`
                    : `<span class="publication-title-link">${conf.title}</span>`;

                return `
                <div class="publication-item mb-5 fade-in" style="animation-delay: ${((groupIndex * 0.15) + (index * 0.08))}s">
                    <h3 class="text-lg font-semibold mb-1">
                        ${titleMarkup}
                    </h3>
                    <p class="publication-citation">${conf.venue}</p>
                </div>
            `;
            }).join('');

            return `
                <div class="conference-year-group mb-8">
                    <h3 class="conference-year-heading text-xl md:text-2xl font-bold mb-4 font-mono">${group.year}</h3>
                    ${itemsHTML}
                </div>
            `;
        })
        .join('');

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.publications}</h1>
                <div class="mb-10">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.peerReviewed}</h2>
                    ${publicationsHTML}
                </div>
                ${conferencesHTML ? `
                <div class="mt-10">
                    <h2 class="text-2xl md:text-3xl font-bold mb-2 font-mono">${content.sections.conferencePapers}</h2>
                    ${content.sections.conferencePapersNote ? `<p class="text-sm opacity-75 mb-6">${content.sections.conferencePapersNote}</p>` : ''}
                    ${conferencesHTML}
                </div>
                ` : ''}
            </div>
        </section>
    `;
}

// Research Page Render
function renderResearchPage(content) {
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
                ${isValidLink(tool.link) ? `<a href="${tool.link}" target="_blank" rel="noopener" class="underline">${content.tools.viewProject}</a>` : ''}
                ${!isValidLink(tool.link) && tool.project_status ? `<p class="text-sm opacity-75 italic">${tool.project_status}</p>` : ''}
            </div>
        `)
        .join('');

    // Technical Modules section (In Silico / In Vitro + Software & Tools)
    const skillMatrix = content.skillMatrix || {};
    const computationalSkills = skillMatrix.computational?.skills || [];
    const experimentalSkills = skillMatrix.experimental?.skills || [];
    const computationalTitle = skillMatrix.computational?.title || content.sections.academicCompetency;
    const experimentalTitle = skillMatrix.experimental?.title || content.sections.academicCompetency;
    const softwareTitle = skillMatrix.software?.title || content.tools.software;

    const inSilicoListHTML = computationalSkills
        .map(skill => `
            <li class="flex items-start">
                <span class="about-skill-bullet mr-2">•</span>
                <span>${skill}</span>
            </li>
        `)
        .join('');

    const inVitroListHTML = experimentalSkills
        .map(skill => `
            <li class="flex items-start">
                <span class="about-skill-bullet mr-2">•</span>
                <span>${skill}</span>
            </li>
        `)
        .join('');

    const techTagsBase = (content.tools && Array.isArray(content.tools.softwareItems))
        ? [...content.tools.softwareItems]
        : [];

    const locale = currentLanguage === 'tr' ? 'tr' : 'en';
    techTagsBase.sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }));

    const techTagsHTML = techTagsBase
        .map(tag => `<span class="tech-badge">${tag}</span>`)
        .join('');

    const technicalModulesHTML = `
        <div class="mb-16">
            <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.academicCompetency}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="research-area-card p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-3 module-heading">${computationalTitle}</h3>
                    <ul class="space-y-2 text-sm md:text-base">
                        ${inSilicoListHTML}
                    </ul>
                </div>
                <div class="research-area-card p-6 rounded-lg">
                    <h3 class="text-xl font-semibold mb-3 module-heading">${experimentalTitle}</h3>
                    <ul class="space-y-2 text-sm md:text-base">
                        ${inVitroListHTML}
                    </ul>
                </div>
            </div>
            <div>
                <h3 class="text-xl font-semibold mb-3 module-heading">${softwareTitle}</h3>
                <div class="flex flex-wrap gap-2">
                    ${techTagsHTML}
                </div>
            </div>
        </div>
    `;

    const workGlimpses = content.workGlimpses || [];
    const workGlimpsesHTML = workGlimpses.length > 0 ? `
        <div class="mb-16 work-glimpses-section">
            <h2 class="text-2xl md:text-3xl font-bold mb-3 font-mono">${content.sections.workGlimpse || ''}</h2>
            ${content.workGlimpsesIntro ? `<p class="work-glimpses-intro text-sm md:text-base mb-8 max-w-3xl">${content.workGlimpsesIntro}</p>` : ''}
            <div class="space-y-12">
                ${workGlimpses.map((item, index) => buildWorkGlimpseHTML(item, index, content)).join('')}
            </div>
        </div>
    ` : '';

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 font-mono">${content.sections.research}</h1>
                ${content.researchInterests && content.researchInterests.length > 0 ? `
                    <div class="flex flex-wrap gap-2 mb-10">
                        ${[...content.researchInterests]
                            .sort((a, b) => a.localeCompare(b, currentLanguage === 'tr' ? 'tr' : 'en', { sensitivity: 'base' }))
                            .map(tag => `<span class="research-tag">${tag}</span>`)
                            .join('')}
                    </div>
                ` : ''}

                ${workGlimpsesHTML}
                
                <div class="mb-16">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.researchAreas}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${researchAreasHTML}
                    </div>
                </div>
                ${technicalModulesHTML}

                ${content.tools?.developed?.length ? `
                <div class="mb-12">
                    <h2 class="text-2xl md:text-3xl font-bold mb-2 font-mono">${content.sections.digitalIdeas || content.tools.developedTitle}</h2>
                    ${content.sections.digitalIdeasNote ? `<p class="text-sm md:text-base opacity-80 mb-6 max-w-3xl">${content.sections.digitalIdeasNote}</p>` : ''}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${scientificToolsHTML}
                    </div>
                </div>
                ` : ''}
            </div>
        </section>
    `;

    initNGLViewers();
}

// Contact Page Render
function renderContactPage(content) {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const contact = content.contact || {};
    const labels = content.contactLabels || {};
    
    const academicLinksHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            ${contact.orcid ? `
                <a href="${contact.orcid}" target="_blank" rel="noopener" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">🔬</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">ORCID</h3>
                            <p class="text-sm opacity-75">${labels.orcid}</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.googleScholar && isValidLink(contact.googleScholar) ? `
                <a href="${contact.googleScholar}" target="_blank" rel="noopener" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">📚</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">Google Scholar</h3>
                            <p class="text-sm opacity-75">${labels.googleScholar}</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.researchgate && isValidLink(contact.researchgate) ? `
                <a href="${contact.researchgate}" target="_blank" rel="noopener" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">📖</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">ResearchGate</h3>
                            <p class="text-sm opacity-75">${labels.researchgate}</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.linkedin && isValidLink(contact.linkedin) ? `
                <a href="${contact.linkedin}" target="_blank" rel="noopener" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">💼</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">LinkedIn</h3>
                            <p class="text-sm opacity-75">${labels.linkedin}</p>
                        </div>
                    </div>
                </a>
            ` : ''}
            ${contact.github && isValidLink(contact.github) ? `
                <a href="${contact.github}" target="_blank" rel="noopener" class="contact-link-card p-6 rounded-lg fade-in">
                    <div class="flex items-center gap-4">
                        <span class="text-3xl">💻</span>
                        <div>
                            <h3 class="text-lg font-bold font-mono">GitHub</h3>
                            <p class="text-sm opacity-75">${labels.github}</p>
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
                
                <div class="mb-10 text-center contact-intro">
                    <h2 class="text-xl md:text-2xl font-bold mb-3 font-mono">${contact.affiliation || content.affiliation}</h2>
                    <p class="text-sm md:text-base opacity-90">${contact.location || content.location}</p>
                </div>

                <div class="mb-12">
                    <div class="contact-info-card p-6 md:p-8 rounded-lg text-center">
                        <h3 class="text-lg font-bold mb-3 font-mono">${labels.email}</h3>
                        <a href="mailto:${contact.email || content.email}" class="text-base md:text-lg underline break-all contact-email-link">
                            ${contact.email || content.email}
                        </a>
                    </div>
                </div>

                <div class="mb-8">
                    <h2 class="text-xl font-bold mb-6 font-mono text-center">${labels.academicLinks}</h2>
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