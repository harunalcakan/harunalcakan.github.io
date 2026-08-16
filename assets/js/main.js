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

function resolveConferenceLink(item) {
    if (isValidLink(item.link)) return item.link;
    if (isValidLink(item.doi_link)) return item.doi_link;
    if (isValidLink(item.researchgate_link)) return item.researchgate_link;
    return null;
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

function extractDoiId(link) {
    if (!link) return null;
    const match = String(link).match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
    return match ? match[0] : null;
}

function buildPublicationMetaBadgesHTML(pub, content) {
    const journalLabel = pub.journal
        ? `${pub.journal}${pub.year ? `, ${pub.year}` : ''}`
        : '';
    const citationCount = pub.citations ?? 0;
    const doiId = extractDoiId(pub.doi_link || pub.link);
    const citationsLabel = content.sections.citationsBadge || 'Citations';

    if (!journalLabel && citationCount == null) return '';

    return `
        <div class="publication-meta-badges">
            ${journalLabel ? `<span class="pub-meta-badge pub-meta-journal">${journalLabel}</span>` : ''}
            <span class="pub-meta-badge pub-meta-citations">
                <span class="pub-meta-citations-label">${citationsLabel}</span>
                <span class="pub-meta-citations-value"${doiId ? ` data-citation-doi="${doiId}"` : ''}>${citationCount}</span>
            </span>
        </div>
    `;
}

async function hydratePublicationCitations() {
    const elements = document.querySelectorAll('[data-citation-doi]');
    if (elements.length === 0) return;

    await Promise.all(Array.from(elements).map(async (element) => {
        const doi = element.getAttribute('data-citation-doi');
        if (!doi) return;

        try {
            const response = await fetch(
                `https://api.semanticscholar.org/graph/v1/paper/DOI:${encodeURIComponent(doi)}?fields=citationCount`
            );
            if (!response.ok) return;

            const payload = await response.json();
            if (typeof payload.citationCount === 'number') {
                element.textContent = payload.citationCount;
            }
        } catch {
            // Keep fallback citation count from data.js.
        }
    }));
}

function getThemeIconSvg(showSun) {
    if (showSun) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 14.5A7.5 7.5 0 0 1 9.5 3 6.5 6.5 0 1 0 14.5 21 7.5 7.5 0 0 1 21 14.5Z"></path></svg>`;
}

function buildNavAvatarHTML(content) {
    const initials = getProfileInitials(content);
    const imageSrc = content.profileImage || '';
    const label = content.sections?.profilePhoto || 'Profile photo';
    const homeLabel = content.sections?.home || 'Home';

    if (imageSrc) {
        return `
            <button type="button" id="nav-profile-avatar" class="nav-profile-avatar" aria-label="${label}">
                <img src="${imageSrc}" alt="" class="nav-profile-img" onerror="this.remove(); this.parentElement.classList.add('nav-profile-avatar-fallback-only');">
                <span class="nav-profile-fallback">${initials}</span>
            </button>
        `;
    }

    return `
        <a href="index.html" id="nav-profile-avatar" class="nav-profile-avatar nav-profile-avatar-fallback-only nav-profile-home-link" aria-label="${homeLabel}">
            <span class="nav-profile-fallback">${initials}</span>
        </a>
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
    if (!avatar || !imageSrc) return;

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

function buildHomeStatsHTML(content) {
    const stats = content.homeStats;
    if (!stats) return '';

    const scholarLink = content.contact?.googleScholar;
    const cards = [
        { key: 'articles', value: stats.articles, label: content.sections.publicationsCount },
        { key: 'conferences', value: stats.conferences, label: content.sections.conferenceCount },
        { key: 'citations', value: stats.citations, label: content.sections.citationsCount },
        { key: 'hIndex', value: stats.hIndex, label: content.sections.hIndexCount }
    ].filter(card => card.value != null && card.label);

    if (cards.length === 0) return '';

    return `
        <section class="container mx-auto px-4 md:px-6 py-10 max-w-5xl home-stats-section">
            <h2 class="text-2xl md:text-3xl font-bold mb-6 font-mono">${content.sections.atAGlance || ''}</h2>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                ${cards.map((card, index) => `
                    <div class="home-stat-card p-5 md:p-6 rounded-lg text-center fade-in" style="animation-delay: ${index * 0.08}s">
                        <p class="home-stat-value text-3xl md:text-4xl font-bold font-mono mb-2" data-stat="${card.key}">${card.value}</p>
                        <p class="home-stat-label text-sm opacity-80">${card.label}</p>
                    </div>
                `).join('')}
            </div>
            <div class="mt-5 text-sm space-y-1">
                ${isValidLink(scholarLink) ? `
                    <p>
                        <a href="${scholarLink}" target="_blank" rel="noopener" class="publication-title-link font-mono">${content.sections.viewOnGoogleScholar || ''}</a>
                    </p>
                ` : ''}
                ${content.sections.scholarStatsNote ? `<p class="home-scholar-note opacity-70 text-xs md:text-sm" data-scholar-updated></p>` : ''}
            </div>
        </section>
    `;
}

function getContactIconSvg(name) {
    const icons = {
        email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>`,
        orcid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 4.2h2.4v9.6h-2.4V6.2Zm5.8 0c1.32 0 2.4 1.08 2.4 2.4s-1.08 2.4-2.4 2.4-2.4-1.08-2.4-2.4 1.08-2.4 2.4-2.4Z"></path></svg>`,
        scholar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l4 2.18V17l7 3.82 7-3.82v-5.64L23 9 12 3Zm0 2.18 6.9 3.76-2.4 1.3L12 7.78 7.5 10.24l-2.4-1.3L12 5.18ZM5 12.82 12 16.6l7-3.78V17l-7 3.82L5 17v-4.18Z"></path></svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.55 1.04 1.55 1.04.9 1.55 2.36 1.1 2.94.84.09-.66.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 12 2Z"></path></svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.01h4.52V23H.24V8.01zM8.09 8.01h4.33v2.05h.06c.6-1.14 2.08-2.35 4.28-2.35 4.58 0 5.43 3.01 5.43 6.93V23h-4.52v-6.98c0-1.66-.03-3.79-2.31-3.79-2.31 0-2.66 1.8-2.66 3.66V23H8.09V8.01z"></path></svg>`
    };
    return icons[name] || '';
}

function buildContactIconsHTML(content) {
    const contact = content.contact || {};
    const labels = content.contactLabels || {};
    const links = [
        { href: `mailto:${contact.email || content.email}`, label: labels.email || 'Email', icon: 'email', external: false },
        { href: contact.orcid, label: 'ORCID', icon: 'orcid', external: true },
        { href: contact.googleScholar, label: 'Google Scholar', icon: 'scholar', external: true },
        { href: contact.github, label: 'GitHub', icon: 'github', external: true },
        { href: contact.linkedin, label: 'LinkedIn', icon: 'linkedin', external: true }
    ].filter(link => link.icon === 'email' || isValidLink(link.href));

    if (links.length === 0) return '';

    return `
        <nav class="contact-icons" aria-label="${content.sections.contactLinks || 'Contact'}">
            ${links.map(link => `
                <a href="${link.href}"
                   class="contact-icon-link"
                   ${link.external ? 'target="_blank" rel="noopener"' : ''}
                   aria-label="${link.label}"
                   title="${link.label}">
                    ${getContactIconSvg(link.icon)}
                </a>
            `).join('')}
        </nav>
    `;
}

function buildHomeContactSectionHTML(content) {
    const iconsHTML = buildContactIconsHTML(content);
    if (!iconsHTML) return '';

    return `
        <section id="contact" class="container mx-auto px-4 md:px-6 py-10 max-w-5xl home-contact-section">
            ${content.sections.footerContactPrompt ? `<p class="home-contact-prompt text-center text-sm md:text-base mb-5">${content.sections.footerContactPrompt}</p>` : ''}
            <div class="flex justify-center">
                ${iconsHTML}
            </div>
        </section>
    `;
}

async function hydrateHomeStats(content) {
    const section = document.querySelector('.home-stats-section');
    if (!section) return;

    const statsPath = content.scholar?.statsPath || 'assets/data/scholar-stats.json';

    try {
        const response = await fetch(`${statsPath}?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) return;

        const live = await response.json();
        const liveValues = {
            articles: live.articles,
            citations: live.citations,
            hIndex: live.hIndex
        };

        Object.entries(liveValues).forEach(([key, value]) => {
            if (value == null) return;
            const element = section.querySelector(`[data-stat="${key}"]`);
            if (element) element.textContent = value;
        });

        const updatedElement = section.querySelector('[data-scholar-updated]');
        if (updatedElement && live.updatedAt && content.sections.scholarStatsNote) {
            const updatedDate = new Date(live.updatedAt);
            const locale = currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
            const formattedDate = Number.isNaN(updatedDate.getTime())
                ? live.updatedAt
                : updatedDate.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
            updatedElement.textContent = `${content.sections.scholarStatsNote} (${formattedDate})`;
        }
    } catch {
        // Keep fallback values from data.js when live stats are unavailable.
    }
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
                ${item.year ? `<div class="timeline-badge">${item.year}</div>` : ''}
                <h3 class="timeline-title font-mono font-bold text-lg md:text-xl mb-1">${item.title}</h3>
                ${item.institution ? `<p class="timeline-institution text-base md:text-lg mb-2 font-semibold">${item.institution}</p>` : ''}
                ${item.description ? `<p class="timeline-description text-sm md:text-base opacity-90">${item.description}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function buildTeachingListHTML(items, baseDelay = 0) {
    return items.map((item, index) => `
        <div class="timeline-item teaching-item fade-in" style="animation-delay: ${baseDelay + index * 0.1}s">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3 class="timeline-title font-mono font-bold text-lg md:text-xl mb-0">${item.course}</h3>
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

function isHomePage() {
    const page = getCurrentPage();
    return page === 'index' || page === '';
}

let typewriterTimeoutId = null;
let navBrandClickHandler = null;

function cleanupTypewriter() {
    if (typewriterTimeoutId !== null) {
        clearTimeout(typewriterTimeoutId);
        typewriterTimeoutId = null;
    }
}

function closeMobileMenuIfOpen() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;

    mobileMenu.classList.add('hidden');
    if (menuIcon) menuIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
}

function setupNavBrandLink() {
    const brand = document.getElementById('nav-brand');
    if (!brand) return;

    if (navBrandClickHandler) {
        brand.removeEventListener('click', navBrandClickHandler);
    }

    navBrandClickHandler = (event) => {
        closeMobileMenuIfOpen();

        if (isHomePage()) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    brand.addEventListener('click', navBrandClickHandler);
}

function setupNavHomeLinks() {
    setupNavBrandLink();

    const avatarHomeLink = document.querySelector('.nav-profile-home-link');
    if (!avatarHomeLink) return;

    avatarHomeLink.addEventListener('click', (event) => {
        closeMobileMenuIfOpen();

        if (isHomePage()) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
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
        { href: 'notes.html', label: content.sections.literatureNotes, id: 'nav-notes' }
    ];

    const activeClass = (link) => {
        const linkPage = link.href.replace('.html', '') || 'index';
        return (linkPage === currentPage || (currentPage === 'index' && linkPage === 'index')) ? 'nav-active' : '';
    };

    const navbarHTML = `
        <nav class="fixed top-0 w-full z-50 backdrop-blur-sm bg-opacity-90 border-b transition-colors duration-300 navbar-anthracite" id="navbar">
            <div class="container mx-auto px-4 md:px-6 py-2.5">
                <div class="flex justify-between items-center gap-3">
                    <div class="flex items-center gap-2 min-w-0">
                        ${buildNavAvatarHTML(content)}
                        <div class="font-mono text-sm md:text-base min-w-0">
                            <a href="index.html" class="nav-brand-link" id="nav-brand">
                                <span class="nav-prompt">></span> <span id="typewriter-text" class="typewriter-nav"></span>
                            </a>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 lg:gap-2 relative shrink-0">
                        <!-- Desktop Navigation -->
                        <div class="hidden lg:flex items-center gap-0.5 xl:gap-1 nav-links-desktop">
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
                        <div class="navbar-controls flex items-center gap-1.5">
                        <button id="language-toggle-btn" class="language-toggle-pill ${currentLanguage === 'tr' ? 'language-toggle-active' : ''}" aria-label="Toggle language">
                            <span class="language-toggle-track">
                                <span class="language-flag-slot language-flag-en-slot">${getFlagSVG('en')}</span>
                                <span class="language-flag-slot language-flag-tr-slot">${getFlagSVG('tr')}</span>
                                <span class="language-toggle-slider"></span>
                            </span>
                        </button>
                        <button id="theme-toggle" class="theme-toggle-btn" aria-label="${currentTheme === 'dark' ? content.sections.theme_light : content.sections.theme_dark}">${getThemeIconSvg(currentTheme === 'dark')}</button>
                        </div>
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
    setupNavHomeLinks();
}

// Typewriter Effect for Navbar Brand (Infinite Loop)
function startTypewriter() {
    cleanupTypewriter();

    const content = data[currentLanguage];
    if (!content) return;

    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const firstName = content.firstName || content.name.split(' ')[0];
    const lastName = content.lastName || content.name.split(' ').slice(1).join(' ') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const fullNameLength = fullName.length;

    typewriterElement.style.minWidth = `${Math.max(fullNameLength, 1) + 1}ch`;
    
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
            typewriterTimeoutId = setTimeout(animate, 100); // Typing speed
        } else if (!isDeleting && index >= fullNameLength) {
            // Finished typing, wait 2 seconds
            typewriterElement.innerHTML = `<span class="name-first">${firstName}</span> <span class="name-last">${lastName}</span>`;
            typewriterTimeoutId = setTimeout(() => {
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
            
            typewriterTimeoutId = setTimeout(animate, 50); // Deleting speed (faster)
        } else if (isDeleting && index === 0) {
            // Finished deleting, wait 0.5 seconds and restart
            typewriterElement.innerHTML = '';
            isDeleting = false;
            typewriterTimeoutId = setTimeout(() => {
                animate();
            }, 500);
        }
    }

    // Start typing after a short delay
    typewriterTimeoutId = setTimeout(animate, 500);
}

// Dynamic Footer Injection
function injectFooter() {
    const content = data[currentLanguage];
    if (!content) return;

    const isHome = getCurrentPage() === 'index';
    const iconsHTML = isHome ? '' : buildContactIconsHTML(content);

    const footerHTML = `
        <footer class="site-footer container mx-auto px-6 py-8 text-center text-sm mt-12">
            ${iconsHTML ? `<div class="site-footer-icons mb-5 flex justify-center">${iconsHTML}</div>` : ''}
            <p class="site-footer-copy opacity-75">&copy; <span id="current-year"></span> ${content.name}. ${content.sections.footerTagline}</p>
            ${content.sections.visitorCount ? `
                <p class="visitor-count-line opacity-55 text-xs mt-2 font-mono">
                    ${content.sections.visitorCount}: <span id="visitor-count">—</span>
                </p>
            ` : ''}
        </footer>
    `;

    // Insert footer before closing body tag
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Update year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    hydrateVisitorCount();
}

async function hydrateVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;

    const namespace = 'harunalcakan-github-io';
    const key = 'visits';
    const sessionKey = 'harunalcakan-visit-counted';

    try {
        if (!sessionStorage.getItem(sessionKey)) {
            await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            sessionStorage.setItem(sessionKey, '1');
        }

        const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
        if (!response.ok) return;

        const payload = await response.json();
        if (payload.value == null) return;

        const locale = currentLanguage === 'tr' ? 'tr-TR' : 'en-US';
        countElement.textContent = Number(payload.value).toLocaleString(locale);
    } catch {
        countElement.closest('.visitor-count-line')?.remove();
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
    if (!themeBtn) return;

    const content = data[currentLanguage];
    const lightLabel = content?.sections?.theme_light || 'Light mode';
    const darkLabel = content?.sections?.theme_dark || 'Dark mode';
    const label = currentTheme === 'dark' ? lightLabel : darkLabel;

    themeBtn.setAttribute('aria-label', label);
    themeBtn.innerHTML = getThemeIconSvg(currentTheme === 'dark');
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
    cleanupTypewriter();
    
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
            <h2 class="text-2xl md:text-3xl font-bold mb-3 font-mono">${content.sections.literatureNotes || ''}</h2>
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

    const statsHTML = buildHomeStatsHTML(content);
    const contactHTML = buildHomeContactSectionHTML(content);

    mainContent.innerHTML = heroHTML + statsHTML + literatureHTML + contactHTML;

    initNGLViewers();
    hydrateHomeStats(content);
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
                <h1 class="text-3xl md:text-4xl font-bold mb-4 font-mono">${content.sections.literatureNotes || ''}</h1>
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

    const teachingItems = content.teaching || [];

    const teachingTimelineHTML = teachingItems.length > 0 ? `
        <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-8 font-mono">${content.sections.teaching}</h2>
            <div class="timeline-container teaching-list">
                ${buildTeachingListHTML(teachingItems, 0.05)}
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
            </div>
        </div>
    ` : '';

    mainContent.innerHTML = `
        <section class="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
            <div class="fade-in">
                <h1 class="text-3xl md:text-4xl font-bold mb-8 font-mono">${content.sections.about}</h1>

                ${cvButtonHTML}
                ${thesisHTML}
                ${workTimelineHTML}
                ${teachingTimelineHTML}
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
                ${buildPublicationMetaBadgesHTML(pub, content)}
            </div>
            `;
        })
        .join('');

    const conferencesHTML = groupConferencesByYear(conferences)
        .map((group, groupIndex) => {
            const itemsHTML = group.items.map((conf, index) => {
                const confLink = resolveConferenceLink(conf);
                const titleMarkup = confLink
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

    hydratePublicationCitations();
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

    // Technical Modules section (computational / experimental + software)
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