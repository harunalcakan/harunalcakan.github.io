// THE CONTENT DATABASE - Harun Nalçakan
// Edit "en" and "tr" blocks in parallel. Literature notes: literatureNotes array + notes.html page.

const data = {
    "en": {
        // Identity
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Research Assistant",
        affiliation: "Ankara University, Faculty of Science, Chemistry Department",
        email: "hnalcakan@ankara.edu.tr",
        location: "Ankara, Türkiye",
        cvLink: "assets/cv/harun-nalcakan-cv.pdf",
        profileImage: "assets/images/profile.jpg",

        site: {
            baseUrl: "https://harunalcakan.github.io",
            ogImage: "assets/images/og-card.png",
            twitterCard: "summary_large_image"
        },

        // Hero / About
        heroIntro: "Research Assistant in the Department of Chemistry at Ankara University. In computational chemistry, I work on DFT, molecular docking, and molecular dynamics; I am also building experience in electrochemistry, materials characterization, and experimental physical chemistry.",
        heroGreeting: "Hello, I'm",
        heroAffiliationShort: "Ankara University",
        bio: "Research Assistant in the Department of Chemistry at Ankara University. My main focus is computational chemistry — DFT, molecular docking, and molecular dynamics — while I continue to develop my skills in electrochemistry, materials characterization, and laboratory-based physical chemistry.",

        homeStats: {
            articles: 4,
            conferences: 12,
            focus: "DFT, molecular docking & MD; growing experimental work in electrochemistry and materials"
        },

        researchInterests: [
            "ADME / ADMET Profiling",
            "Cheminformatics",
            "DFT",
            "Electrochemistry",
            "Materials Characterization",
            "Molecular Docking",
            "Molecular Dynamics"
        ],

        thesis: {
            degreeLabel: "Master's Thesis",
            title: "Development of 3D-printed electrodes using polylactic acid-based conductive filament and their application in amperometric determination of nitro-polycyclic aromatic hydrocarbons",
            year: "2026",
            type: "M.Sc.",
            language: "Turkish",
            subject: "Chemistry",
            institution: "Ankara University / Graduate School of Natural and Applied Sciences / Department of Chemistry / Chemistry Program",
            advisors: "Prof. Dr. Müşerref Önal",
            coAdvisor: "Dr. Gülbin Kurtay",
            gpa: "3.93/4.00",
            link: "https://www.researchgate.net/profile/Harun-Nalcakan"
        },

        portfolioIntro: "Interactive molecular visualization — a glimpse into the structural models that inform my computational work.",

        // Methods & Tools — visual work snapshots (add entries in both "en" and "tr")
        workGlimpsesIntro: "A glimpse from my work — visual snapshots of the models, methods, and experiments behind my research.",
        workGlimpses: [
            {
                type: "ngl",
                title: "Molecular structure exploration",
                caption: "Interactive visualization of protein structures — part of my docking and molecular dynamics workflows.",
                pdbCode: "1crn"
            }
        ],

        // Homepage — literature reading notes (add new entries at the top)
        literatureNotesIntro: "Short notes from my literature reading — methods, ideas, and takeaways I find worth sharing.",
        literatureNotes: [],

        // Section labels used by main.js (navbar, headings, toggles)
        sections: {
            home: "Home",
            about: "About",
            research: "Research",
            publications: "Publications",
            contact: "Contact",
            news: "News",
            literatureNotes: "Reading notes",
            literatureNotesEmpty: "No reading notes yet. New notes from my literature reviews will appear here.",
            viewAllNotes: "View all reading notes →",
            homeDepartment: "Department of Chemistry",
            homeAt: "at",
            downloadCV: "Download CV",
            education: "Education",
            workExperience: "Work Experience",
            workAndEducation: "Work Experience & Education",
            academicCompetency: "Academic & Technical Competency",
            researchAreas: "Research Areas",
            digitalIdeas: "Digital Ideas",
            digitalIdeasNote: "Concept-stage ideas for scientific workflows — early development, not released tools.",
            ideaStage: "Idea stage",
            conferencePapers: "Poster & Conference Presentations",
            conferencePapersNote: "Click any title to view on ResearchGate.",
            peerReviewed: "Peer-Reviewed Articles",
            thesis: "Master's Thesis",
            thesisAdvisor: "Advisor",
            thesisCoAdvisor: "Co-advisor",
            thesisYear: "Year",
            thesisType: "Degree",
            thesisLanguage: "Language",
            thesisSubject: "Subject",
            thesisGpa: "GPA",
            molecularVisualization: "Molecular Visualization",
            workGlimpse: "A Glimpse from My Work",
            closePhoto: "Close",
            awards: "Awards & Recognition",
            researchFocus: "Research Focus",
            atAGlance: "At a Glance",
            publicationsCount: "Peer-reviewed articles",
            conferenceCount: "Poster & conference presentations",
            currentFocus: "Current focus",
            explorePublications: "Explore Publications",
            viewOnResearchGate: "View on ResearchGate",
            profilePhoto: "Profile Photo",
            nglAttribution: "Powered by NGL Viewer",
            footerTagline: "Built with Computational Minimalism.",
            theme_light: "Light",
            theme_dark: "Dark"
        },

        pageTitles: {
            index: "Harun Nalçakan — Academic Portfolio",
            about: "About — Harun Nalçakan",
            research: "Research — Harun Nalçakan",
            notes: "Reading Notes — Harun Nalçakan",
            publications: "Publications — Harun Nalçakan",
            contact: "Contact — Harun Nalçakan"
        },

        metaDescriptions: {
            index: "Harun Nalçakan — Research Assistant at Ankara University. DFT, molecular docking, molecular dynamics, and experimental chemistry.",
            about: "Biography, education, and work experience of Harun Nalçakan, Research Assistant in Chemistry at Ankara University.",
            research: "Research areas, methods, competencies, and visual snapshots from computational and experimental chemistry work.",
            notes: "Reading notes and short takeaways from literature reviews in computational and experimental chemistry.",
            publications: "Peer-reviewed articles and conference presentations by Harun Nalçakan in computational chemistry and drug discovery.",
            contact: "Contact Harun Nalçakan — email, ORCID, ResearchGate, LinkedIn, and GitHub."
        },

        contactLabels: {
            email: "Email",
            academicLinks: "Academic Links",
            orcid: "Academic Profile",
            googleScholar: "Publications & Citations",
            linkedin: "Professional Network",
            github: "Code & Projects",
            researchgate: "Research Network"
        },

        // Education
        education: [
            {
                degree: "Ph.D. in Chemistry",
                institution: "Ankara University",
                year: "2026–Ongoing",
                description: ""
            },
            {
                degree: "M.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2023–2026",
                description: "GPA: 3.93/4.00"
            },
            {
                degree: "B.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2016–2021",
                description: "GPA: 3.34/4.00"
            }
        ],

        workExperience: [
            {
                role: "Research Assistant",
                institution: "Ankara University, Department of Chemistry",
                year: "2023–Present",
                description: ""
            }
        ],

        news: [],

        // Research areas (used by portfolio page)
        researchAreas: [
            {
                title: "Electrochemical Sensing Platforms",
                description: "Design and optimization of advanced electrochemical sensors using both experimental protocols and computational modeling.",
                methodology: "Surface chemistry, electrochemical analysis, molecular modeling, and structure–function correlation."
            },
            {
                title: "Computational Drug Discovery",
                description: "In silico exploration of molecular interactions to support ligand design and mechanism-of-action studies.",
                methodology: "Cheminformatics, molecular docking, MD simulations, and basic ADME profiling."
            }
        ],

        // Competency (not directly rendered, but kept for completeness)
        skillMatrix: {
            computational: {
                title: "In Silico (Computational) Expertise",
                skills: [
                    "Cheminformatics",
                    "Molecular Docking",
                    "MD Simulations",
                    "DFT"
                ]
            },
            experimental: {
                title: "In Vitro (Experimental) Expertise",
                skills: [
                    "Physical Chemistry",
                    "Electrochemistry",
                    "Advanced Electrochemical Sensing Platforms",
                    "Material Characterization"
                ]
            },
            software: {
                title: "Software & Technical Stack"
            }
        },

        // Publications page: APA 7 citations + conference papers
        publications: {
            articles: [
                {
                    title: "Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics",
                    apa_citation: "Eşkin, D., Nalçakan, H., Kurtay, G., Akkan, Y., Türk, M., & Uras, B. (2024). Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics. Journal of the Turkish Chemical Society Section A: Chemistry, 11(4), 1425–1440.",
                    doi_link: "https://doi.org/10.18596/jotcsa.1465547"
                },
                {
                    title: "An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins",
                    apa_citation: "Nalçakan, H., Kurtay, G., Özdil, D. T., & Yılmaz, Z. (2024). An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins. Journal of Faculty of Pharmacy of Ankara University, 48(1), 56–74.",
                    doi_link: "https://doi.org/10.33483/jfpau.1335047"
                },
                {
                    title: "Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA",
                    apa_citation: "Nalçakan, H., & Kurtay, G. (2023). Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA. Journal of Advanced Research in Natural and Applied Sciences, 9(3).",
                    doi_link: "https://doi.org/10.28979/jarnas.1186322"
                },
                {
                    title: "Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs",
                    apa_citation: "Nalçakan, H., Kurtay, G., Sarıkavak, K., & Sevin, F. (2023). Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs. Journal of Molecular Graphics and Modelling, 120, 108485.",
                    doi_link: "https://doi.org/10.1016/j.jmgm.2023.108485"
                }
            ],
            conferences: [
                {
                    year: 2023,
                    title: "Crafting Excellence in LIM Kinase 1 Inhibition: Pharmacophore-Based Virtual Screening and AI-Boosted ADMET Insight",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Guiding TRK Inhibition Strategies: Revelations from Pharmacophore-Based Virtual Screening and AI-Facilitated In Silico ADMET Profiling",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Assessment of KRAS Inhibitors through Pharmacophore-Based Virtual Screening and AI-Enhanced ADMET Profiling via the Pharmit Server",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Computational Evaluation of potent SGLT1 Inhibitors: Sotagliflozin Derivatives Explored with AI-Guided ADMET Assessment",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Alzheimer's Alchemy: Unveiling the Dual-Inhibitory Potential of Tacrine-Donepezil Hybrids",
                    venue: "6th International Eurasian Conference on Biological and Chemical Sciences (October 2023)"
                },
                {
                    year: 2023,
                    title: "Computational Modeling of Novel Filgotinib Derivatives as Potent Janus Kinase (JAK1/JAK2) Inhibitors",
                    venue: "11. International Drug Chemistry Conference (March 2023)"
                },
                {
                    year: 2023,
                    title: "Molecular Docking and in-silico ADMET Studies of Newly Designed Pyrrolo[2,3-d]pyrimidine Derivatives to Inhibit Janus Kinases",
                    venue: "11. International Drug Chemistry Conference (March 2023)"
                },
                {
                    year: 2022,
                    title: "Molecular Docking, in silico ADMET Analyses and Computational Approach of Novel Fedratinib Derivatives as Potent JAK2 Inhibitors",
                    venue: "8th International BAU Drug Design Congress (December 2022)"
                },
                {
                    year: 2022,
                    title: "Computational Modelling of Abrocitinib Derivatives/Metabolites and Unveiling their Janus Kinase (JAK) Inhibitory Activities",
                    venue: "5th International Eurasian Conference on Biological and Chemical Sciences (November 2022)"
                },
                {
                    year: 2022,
                    title: "Boyaya Duyarlı Güneş Hücrelerine Yönelik Yeni D-π-A Tipi Organik Boyarmaddelerin Teorik Olarak Modellenmesi ve İncelenmesi",
                    venue: "34. Ulusal Kimya Kongresi (Eylül 2022)"
                },
                {
                    year: 2022,
                    title: "Molecular Docking Approach to Enlighten Photodynamic Therapy Applicability of the Tailored D-A or D-A-D Types' AIEgens",
                    venue: "2. Computer-Aided Drug Design Symposium and Workshop (Mayıs 2022)"
                },
                {
                    year: 2021,
                    title: "Molecular Design and Theoretical Investigation of bis-N,N-dimethylaniline-based Novel D-π-a Photosensitizers",
                    venue: "5th International Organic Chemistry Congress (October 2021)"
                }
            ]
        },

        // Tools / software (used by portfolio and tools views)
        tools: {
            developedTitle: "Digital Ideas",
            techStackTitle: "Software & Technical Stack",
            viewProject: "View Project",
            hardware: "Hardware",
            software: "Software",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Concept for a computational workflow platform.",
                    link: "#",
                    project_status: "Idea stage"
                },
                {
                    name: "SnapChem",
                    description: "Concept for chemical data visualization.",
                    link: "#",
                    project_status: "Idea stage"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3D printers",
                "Laboratory equipment"
            ],
            softwareItems: [
                "AutoDock Vina",
                "Gaussian",
                "GROMACS",
                "Quantum ESPRESSO",
                "VESTA",
                "VMD"
            ]
        },

        pdbCode: "1crn",

        contact: {
            email: "hnalcakan@ankara.edu.tr",
            location: "Ankara, Türkiye",
            affiliation: "Ankara University, Faculty of Science, Chemistry Department",
            orcid: "https://orcid.org/0000-0003-3821-8681",
            linkedin: "https://linkedin.com/in/nalcakanharun",
            github: "https://github.com/harunalcakan",
            researchgate: "https://www.researchgate.net/profile/Harun-Nalcakan"
        }
    },

    "tr": {
        // Kimlik
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Araştırma Görevlisi",
        affiliation: "Ankara Üniversitesi Fen Fakültesi Kimya Bölümü",
        email: "hnalcakan@ankara.edu.tr",
        location: "Ankara, Türkiye",
        cvLink: "assets/cv/harun-nalcakan-cv.pdf",
        profileImage: "assets/images/profile.jpg",

        site: {
            baseUrl: "https://harunalcakan.github.io",
            ogImage: "assets/images/og-card.png",
            twitterCard: "summary_large_image"
        },

        // Hero / Hakkımda
        heroIntro: "Ankara Üniversitesi Kimya Bölümü'nde araştırma görevlisiyim. Hesaplamalı kimyada DFT, moleküler kenetleme ve moleküler dinamik konularına odaklanıyor; elektrokimya, malzeme karakterizasyonu ve deneysel fizikokimya alanlarında da deneyim kazanmaya devam ediyorum.",
        heroGreeting: "Merhaba, ben",
        heroAffiliationShort: "Ankara Üniversitesi",
        bio: "Ankara Üniversitesi Kimya Bölümü'nde araştırma görevlisiyim. Ana odağım hesaplamalı kimya — DFT, moleküler kenetleme ve moleküler dinamik —; elektrokimya, malzeme karakterizasyonu ve deneysel fizikokimya konularında da kendimi geliştirmeye devam ediyorum.",

        homeStats: {
            articles: 4,
            conferences: 12,
            focus: "DFT, moleküler kenetleme ve MD; elektrokimya ve malzeme karakterizasyonunda gelişen deneysel çalışmalar"
        },

        researchInterests: [
            "ADME / ADMET Profilleme",
            "DFT",
            "Elektrokimya",
            "Kemoinformatik",
            "Malzeme Karakterizasyonu",
            "Moleküler Dinamik",
            "Moleküler Kenetleme"
        ],

        thesis: {
            degreeLabel: "Yüksek Lisans Tezi",
            title: "Polilaktik asit tabanlı iletken filament kullanılarak 3b baskılı elektrotların geliştirilmesi ve nitro-polisiklik aromatik hidrokarbonların amperometrik tayininde uygulanması",
            year: "2026",
            type: "Yüksek Lisans",
            language: "Türkçe",
            subject: "Kimya",
            institution: "Ankara Üniversitesi / Fen Bilimleri Enstitüsü / Kimya Anabilim Dalı / Kimya Bilim Dalı",
            advisors: "Prof. Dr. Müşerref Önal",
            coAdvisor: "Dr. Öğr. Üyesi Gülbin Kurtay",
            gpa: "3.93/4.00",
            link: "https://www.researchgate.net/profile/Harun-Nalcakan"
        },

        portfolioIntro: "Etkileşimli moleküler görselleştirme — hesaplamalı çalışmalarıma yön veren yapısal modellere kısa bir bakış.",

        // Yöntemler ve Araçlar — çalışma görselleri (her iki dilde de ekleyin)
        workGlimpsesIntro: "Çalışmalarımdan bir kesit — araştırmalarıma yön veren modeller, yöntemler ve deneysel çalışmalardan görsel notlar.",
        workGlimpses: [
            {
                type: "ngl",
                title: "Moleküler yapı incelemesi",
                caption: "Protein yapılarının etkileşimli görselleştirmesi — moleküler kenetleme ve dinamik çalışmalarımın parçası.",
                pdbCode: "1crn"
            }
        ],

        // Ana sayfa — literatür okuma notları (yeni notları en üste ekleyin)
        literatureNotesIntro: "Literatür taramalarımdan derlediğim kısa notlar: yöntemler, fikirler ve paylaşmaya değer bulduğum çıkarımlar.",
        literatureNotes: [],

        sections: {
            home: "Ana Sayfa",
            about: "Hakkımda",
            research: "Araştırma",
            publications: "Yayınlar",
            contact: "İletişim",
            news: "Haberler",
            literatureNotes: "Literatür notları",
            literatureNotesEmpty: "Henüz literatür notu yok. Literatür taramalarımdan derlediğim notlar burada paylaşılacak.",
            viewAllNotes: "Tüm literatür notları →",
            homeDepartment: "Kimya Bölümü",
            homeAt: "",
            downloadCV: "CV İndir",
            education: "Eğitim",
            workExperience: "İş Deneyimi",
            workAndEducation: "İş Deneyimi ve Eğitim",
            academicCompetency: "Akademik ve Teknik Yeterlilik",
            researchAreas: "Araştırma Alanları",
            digitalIdeas: "Dijital Fikirler",
            digitalIdeasNote: "Bilimsel iş akışlarına yönelik fikir aşamasındaki konseptler — erken geliştirme, yayımlanmış araçlar değil.",
            ideaStage: "Fikir aşamasında",
            conferencePapers: "Poster ve Konferans Sunumları",
            conferencePapersNote: "Başlıklara tıklayarak ResearchGate'te görüntüleyebilirsiniz.",
            peerReviewed: "Hakemli Makaleler",
            thesis: "Yüksek Lisans Tezi",
            thesisAdvisor: "Danışman",
            thesisCoAdvisor: "Eş danışman",
            thesisYear: "Yıl",
            thesisType: "Tür",
            thesisLanguage: "Dil",
            thesisSubject: "Konu",
            thesisGpa: "GNO",
            molecularVisualization: "Moleküler Görselleştirme",
            workGlimpse: "Çalışmalarımdan Bir Kesit",
            closePhoto: "Kapat",
            awards: "Ödüller ve Başarılar",
            researchFocus: "Araştırma Odakları",
            atAGlance: "Genel Bakış",
            publicationsCount: "Hakemli makale",
            conferenceCount: "Poster ve konferans sunumu",
            currentFocus: "Güncel odak alanı",
            explorePublications: "Yayınları İncele",
            viewOnResearchGate: "ResearchGate'te Görüntüle",
            profilePhoto: "Profil Fotoğrafı",
            nglAttribution: "NGL Viewer ile desteklenmektedir",
            footerTagline: "Computational Minimalism ile geliştirildi.",
            theme_light: "Açık",
            theme_dark: "Koyu"
        },

        pageTitles: {
            index: "Harun Nalçakan — Akademik Portföy",
            about: "Hakkımda — Harun Nalçakan",
            research: "Araştırma — Harun Nalçakan",
            notes: "Literatür Notları — Harun Nalçakan",
            publications: "Yayınlar — Harun Nalçakan",
            contact: "İletişim — Harun Nalçakan"
        },

        metaDescriptions: {
            index: "Harun Nalçakan — Ankara Üniversitesi Kimya Bölümü Araştırma Görevlisi. DFT, moleküler kenetleme, moleküler dinamik ve deneysel kimya.",
            about: "Ankara Üniversitesi Kimya Bölümü Araştırma Görevlisi Harun Nalçakan'ın özgeçmişi, eğitim geçmişi ve iş deneyimi.",
            research: "Hesaplamalı ve deneysel kimyada araştırma alanları, yöntemler, yeterlilikler ve çalışma görselleri.",
            notes: "Literatür taramalarından derlenen kısa notlar ve çıkarımlar — hesaplamalı ve deneysel kimya.",
            publications: "Harun Nalçakan'ın hesaplamalı kimya ve ilaç keşfi alanındaki hakemli makaleleri ve konferans bildirileri.",
            contact: "Harun Nalçakan ile iletişim — e-posta, ORCID, ResearchGate, LinkedIn ve GitHub."
        },

        contactLabels: {
            email: "E-posta",
            academicLinks: "Akademik Bağlantılar",
            orcid: "Akademik Profil",
            googleScholar: "Yayınlar ve Atıflar",
            linkedin: "Profesyonel Ağ",
            github: "Kod ve Projeler",
            researchgate: "Araştırma Ağı"
        },

        education: [
            {
                degree: "Kimya Doktora",
                institution: "Ankara Üniversitesi",
                year: "2026–Devam ediyor",
                description: ""
            },
            {
                degree: "Kimya Yüksek Lisans",
                institution: "Ankara Üniversitesi",
                year: "2023–2026",
                description: "GNO: 3.93/4.00"
            },
            {
                degree: "Kimya Lisans",
                institution: "Ankara Üniversitesi",
                year: "2016–2021",
                description: "GNO: 3.34/4.00"
            }
        ],

        workExperience: [
            {
                role: "Araştırma Görevlisi",
                institution: "Ankara Üniversitesi, Kimya Bölümü",
                year: "2023–Günümüz",
                description: ""
            }
        ],

        news: [],

        researchAreas: [
            {
                title: "Elektrokimyasal Algılama Platformları",
                description: "Deneysel protokoller ile hesaplamalı modellemeyi bir arada kullanarak gelişmiş elektrokimyasal sensörlerin tasarımı ve optimizasyonu üzerine çalışıyorum.",
                methodology: "Yüzey kimyası, elektrokimyasal analiz, moleküler modelleme ve yapı–işlev ilişkileri."
            },
            {
                title: "Hesaplamalı İlaç Keşfi",
                description: "Moleküler etkileşimlerin in silico düzeyde incelenmesi; ligand tasarımı ve etki mekanizması çalışmalarına metodolojik destek.",
                methodology: "Kemoinformatik, moleküler yerleştirme, MD simülasyonları ve ADME profilleme."
            }
        ],

        skillMatrix: {
            computational: {
                title: "In Silico (Hesaplamalı) Yetkinlik",
                skills: [
                    "Kemoinformatik",
                    "Moleküler Yerleştirme (Docking)",
                    "MD Simülasyonları",
                    "DFT"
                ]
            },
            experimental: {
                title: "In Vitro (Deneysel) Yetkinlik",
                skills: [
                    "Fizikokimya",
                    "Elektrokimya",
                    "İleri Elektrokimyasal Algılama Platformları",
                    "Malzeme Karakterizasyonu"
                ]
            },
            software: {
                title: "Yazılım ve Teknik Altyapı"
            }
        },

        publications: {
            articles: [
                {
                    title: "Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics",
                    apa_citation: "Eşkin, D., Nalçakan, H., Kurtay, G., Akkan, Y., Türk, M., & Uras, B. (2024). Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics. Journal of the Turkish Chemical Society Section A: Chemistry, 11(4), 1425–1440.",
                    doi_link: "https://doi.org/10.18596/jotcsa.1465547"
                },
                {
                    title: "An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins",
                    apa_citation: "Nalçakan, H., Kurtay, G., Özdil, D. T., & Yılmaz, Z. (2024). An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins. Journal of Faculty of Pharmacy of Ankara University, 48(1), 56–74.",
                    doi_link: "https://doi.org/10.33483/jfpau.1335047"
                },
                {
                    title: "Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA",
                    apa_citation: "Nalçakan, H., & Kurtay, G. (2023). Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA. Journal of Advanced Research in Natural and Applied Sciences, 9(3).",
                    doi_link: "https://doi.org/10.28979/jarnas.1186322"
                },
                {
                    title: "Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs",
                    apa_citation: "Nalçakan, H., Kurtay, G., Sarıkavak, K., & Sevin, F. (2023). Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs. Journal of Molecular Graphics and Modelling, 120, 108485.",
                    doi_link: "https://doi.org/10.1016/j.jmgm.2023.108485"
                }
            ],
            conferences: [
                {
                    year: 2023,
                    title: "Crafting Excellence in LIM Kinase 1 Inhibition: Pharmacophore-Based Virtual Screening and AI-Boosted ADMET Insight",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Guiding TRK Inhibition Strategies: Revelations from Pharmacophore-Based Virtual Screening and AI-Facilitated In Silico ADMET Profiling",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Assessment of KRAS Inhibitors through Pharmacophore-Based Virtual Screening and AI-Enhanced ADMET Profiling via the Pharmit Server",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Computational Evaluation of potent SGLT1 Inhibitors: Sotagliflozin Derivatives Explored with AI-Guided ADMET Assessment",
                    venue: "9th International BAU Drug Design Congress (November 2023)"
                },
                {
                    year: 2023,
                    title: "Alzheimer's Alchemy: Unveiling the Dual-Inhibitory Potential of Tacrine-Donepezil Hybrids",
                    venue: "6th International Eurasian Conference on Biological and Chemical Sciences (October 2023)"
                },
                {
                    year: 2023,
                    title: "Computational Modeling of Novel Filgotinib Derivatives as Potent Janus Kinase (JAK1/JAK2) Inhibitors",
                    venue: "11. International Drug Chemistry Conference (March 2023)"
                },
                {
                    year: 2023,
                    title: "Molecular Docking and in-silico ADMET Studies of Newly Designed Pyrrolo[2,3-d]pyrimidine Derivatives to Inhibit Janus Kinases",
                    venue: "11. International Drug Chemistry Conference (March 2023)"
                },
                {
                    year: 2022,
                    title: "Molecular Docking, in silico ADMET Analyses and Computational Approach of Novel Fedratinib Derivatives as Potent JAK2 Inhibitors",
                    venue: "8th International BAU Drug Design Congress (December 2022)"
                },
                {
                    year: 2022,
                    title: "Computational Modelling of Abrocitinib Derivatives/Metabolites and Unveiling their Janus Kinase (JAK) Inhibitory Activities",
                    venue: "5th International Eurasian Conference on Biological and Chemical Sciences (November 2022)"
                },
                {
                    year: 2022,
                    title: "Boyaya Duyarlı Güneş Hücrelerine Yönelik Yeni D-π-A Tipi Organik Boyarmaddelerin Teorik Olarak Modellenmesi ve İncelenmesi",
                    venue: "34. Ulusal Kimya Kongresi (Eylül 2022)"
                },
                {
                    year: 2022,
                    title: "Molecular Docking Approach to Enlighten Photodynamic Therapy Applicability of the Tailored D-A or D-A-D Types' AIEgens",
                    venue: "2. Computer-Aided Drug Design Symposium and Workshop (Mayıs 2022)"
                },
                {
                    year: 2021,
                    title: "Molecular Design and Theoretical Investigation of bis-N,N-dimethylaniline-based Novel D-π-a Photosensitizers",
                    venue: "5th International Organic Chemistry Congress (October 2021)"
                }
            ]
        },

        tools: {
            developedTitle: "Dijital Fikirler",
            techStackTitle: "Yazılım ve Teknik Altyapı",
            viewProject: "Projeyi Görüntüle",
            hardware: "Donanım",
            software: "Yazılım",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Hesaplamalı iş akışı platformu konsepti.",
                    link: "#",
                    project_status: "Fikir aşamasında"
                },
                {
                    name: "SnapChem",
                    description: "Kimyasal veri görselleştirme konsepti.",
                    link: "#",
                    project_status: "Fikir aşamasında"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3B yazıcılar",
                "Laboratuvar ekipmanları"
            ],
            softwareItems: [
                "AutoDock Vina",
                "Gaussian",
                "GROMACS",
                "Quantum ESPRESSO",
                "VESTA",
                "VMD"
            ]
        },

        pdbCode: "1crn",

        contact: {
            email: "hnalcakan@ankara.edu.tr",
            location: "Ankara, Türkiye",
            affiliation: "Ankara Üniversitesi Fen Fakültesi Kimya Bölümü",
            orcid: "https://orcid.org/0000-0003-3821-8681",
            linkedin: "https://linkedin.com/in/nalcakanharun",
            github: "https://github.com/harunalcakan",
            researchgate: "https://www.researchgate.net/profile/Harun-Nalcakan"
        }
    }
};

// Expose globally for main.js (non-module scripts)
if (typeof window !== "undefined") {
    window.data = data;
}
