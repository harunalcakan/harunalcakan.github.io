// THE CONTENT DATABASE - Harun Nalçakan
// This file defines the multilingual content structure consumed by main.js.

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

        // Hero / About
        heroIntro: "Synthesizing Computational Precision with Experimental Reality.",
        aboutSummary: "I conduct research at Ankara University integrating both computational and experimental chemistry.",
        bio: "My research focuses on bridging the gap between theoretical modeling techniques and the development of advanced electrochemical sensors. I leverage in silico tools to predict and optimize molecular interactions, which are then validated through experimental electrochemical protocols.",
        about: "I conduct research at Ankara University integrating both computational and experimental chemistry, with a focus on electrochemical sensing platforms and computational drug discovery.",

        // Section labels used by main.js (navbar, headings, toggles)
        sections: {
            home: "Home",
            about: "About",
            portfolio: "Research Portfolio",
            publications: "Publications",
            contact: "Contact",
            news: "Latest News",
            downloadCV: "Download CV",
            education: "Education",
            workExperience: "Work Experience",
            academicCompetency: "Academic & Technical Competency",
            researchAreas: "Research Areas",
            scientificTools: "Scientific Tools",
            tools: "Tools & Software",
            projects: "Projects",
            theme_light: "Light",
            theme_dark: "Dark"
        },

        // Education
        education: [
            {
                degree: "Ph.D. in Chemistry",
                institution: "Ankara University",
                year: "2026-Ongoing",
                description: "Advanced doctoral research phase."
            },
            {
                degree: "M.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2023-2026",
                description: "GPA: 3.93/4.00 | Thesis: 3D-Printed Electrodes for Nitro-PAH determination."
            },
            {
                degree: "B.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2016-2021",
                description: "GPA: 3.34/4.00"
            }
        ],

        // Work Experience
        workExperience: [
            {
                role: "Research Assistant",
                institution: "Ankara University",
                year: "2023-Present",
                description: "Focusing on surface chemistry and computational modeling."
            }
        ],

        // News (used by home page "Latest News" section)
        news: [
            {
                date: "2024-09-01",
                title: "Targeting LIMK1 in Alzheimer's Disease",
                content: "Targeting LIMK1 in Alzheimer's Disease (J. Turk. Chem. Soc. Sect. A, Sept 2024)."
            },
            {
                date: "2024-01-15",
                title: "An in silico Pharmacokinetic Investigation",
                content: "An in silico Pharmacokinetic Investigation of Organic Luminogens (Ankara Univ. Eczacilik Fak. Derg., Jan 2024)."
            },
            {
                date: "2023-09-01",
                title: "Bridging Molecular Docking to Molecular Dynamics",
                content: "Bridging Molecular Docking to Molecular Dynamics (J. Adv. Res. Nat. Appl. Sci., Sept 2023)."
            },
            {
                date: "2023-04-01",
                title: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems",
                content: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems (J. Mol. Graph. Model., April 2023)."
            }
        ],

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
                title: "Software & Technical Stack",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Scientific Computing"
                ]
            }
        },

        // Publications page (main.js expects a flat array)
        publications: [
            {
                title: "Targeting LIMK1 in Alzheimer's Disease",
                authors: "Defne Eşkin, Harun Nalçakan et al.",
                venue: "J. Turk. Chem. Soc. Sect. A",
                year: "2024",
                link: "#",
                abstract: ""
            },
            {
                title: "An in silico Pharmacokinetic Investigation of Organic Luminogens",
                authors: "Harun Nalçakan et al.",
                venue: "Ankara Univ. Eczacilik Fak. Derg.",
                year: "2024",
                link: "#",
                abstract: ""
            },
            {
                title: "Bridging Molecular Docking to Molecular Dynamics",
                authors: "Harun Nalçakan et al.",
                venue: "J. Adv. Res. Nat. Appl. Sci.",
                year: "2023",
                link: "#",
                abstract: ""
            },
            {
                title: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems",
                authors: "Harun Nalçakan et al.",
                venue: "J. Mol. Graph. Model.",
                year: "2023",
                link: "#",
                abstract: ""
            }
        ],

        // Tools / software (used by portfolio and tools views)
        tools: {
            developedTitle: "Developed Tools",
            techStackTitle: "Tech Stack",
            viewProject: "View Project",
            hardware: "Hardware",
            software: "Software",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Advanced computational platform.",
                    link: "#",
                    project_status: "Under Development"
                },
                {
                    name: "SnapChem",
                    description: "Chemical data visualization tool.",
                    link: "#",
                    project_status: "Under Development"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3D printers",
                "Laboratory equipment"
            ],
            softwareItems: [
                "Gaussian",
                "AutoDock",
                "Python",
                "MATLAB"
            ]
        },

        // Optional explicit projects list (for /projects legacy route)
        projects: [
            {
                title: "ADVISOR",
                description: "Advanced computational platform for sensor and molecular design.",
                technologies: ["Python", "Gaussian", "Cheminformatics"],
                link: "#",
                github: "#",
                project_status: "Under Development"
            },
            {
                title: "SnapChem",
                description: "Chemical data visualization and analysis tool.",
                technologies: ["Python", "Data Visualization"],
                link: "#",
                github: "#",
                project_status: "Under Development"
            }
        ],

        // Structure support
        pdbCode: "1crn",

        contact: {
            email: "hnalcakan@ankara.edu.tr",
            location: "Ankara, Türkiye",
            affiliation: "Ankara University, Faculty of Science, Chemistry Department",
            orcid: "0000-0003-3821-8681",
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

        // Hero / Hakkımda
        heroIntro: "Hesaplamalı Kimya ve Deneysel Doğrulamayı Sentezliyorum.",
        aboutSummary: "Ankara Üniversitesi'nde hesaplamalı ve deneysel kimyayı birlikte ele alan araştırmalar yürütüyorum.",
        bio: "Araştırmalarım, teorik modelleme teknikleri ile ileri elektrokimyasal sensörlerin geliştirilmesi arasındaki köprüyü kurmaya odaklanmaktadır. In silico araçları moleküler etkileşimleri öngörmek ve optimize etmek için kullanıyor, bu öngörüleri deneysel elektrokimyasal protokollerle doğruluyorum.",
        about: "Ankara Üniversitesi'nde, elektrokimyasal algılama platformları ve hesaplamalı ilaç keşfi odaklı hesaplamalı ve deneysel kimya araştırmaları yürütmekteyim.",

        sections: {
            home: "Ana Sayfa",
            about: "Hakkımda",
            portfolio: "Araştırma Portföyü",
            publications: "Yayınlar",
            contact: "İletişim",
            news: "Haberler",
            downloadCV: "CV İndir",
            education: "Eğitim",
            workExperience: "İş Deneyimi",
            academicCompetency: "Akademik ve Teknik Yeterlilik",
            researchAreas: "Araştırma Alanları",
            scientificTools: "Bilimsel Araçlar",
            tools: "Araçlar ve Yazılım",
            projects: "Projeler",
            theme_light: "Açık",
            theme_dark: "Koyu"
        },

        education: [
            {
                degree: "Kimya Doktora",
                institution: "Ankara Üniversitesi",
                year: "2026-Devam ediyor",
                description: "İleri doktora araştırma aşaması."
            },
            {
                degree: "Kimya Yüksek Lisans",
                institution: "Ankara Üniversitesi",
                year: "2023-2026",
                description: "GNO: 3.93/4.00 | Tez: Nitro-PAH tayini için 3B baskılı elektrotların geliştirilmesi."
            },
            {
                degree: "Kimya Lisans",
                institution: "Ankara Üniversitesi",
                year: "2016-2021",
                description: "GNO: 3.34/4.00"
            }
        ],

        workExperience: [
            {
                role: "Araştırma Görevlisi",
                institution: "Ankara Üniversitesi",
                year: "2023-Günümüz",
                description: "Yüzey kimyası ve hesaplamalı modelleme üzerine odaklanmaktadır."
            }
        ],

        news: [
            {
                date: "2024-09-01",
                title: "Targeting LIMK1 in Alzheimer's Disease",
                content: "Targeting LIMK1 in Alzheimer's Disease (J. Turk. Chem. Soc. Sect. A, Eylül 2024)."
            },
            {
                date: "2024-01-15",
                title: "An in silico Pharmacokinetic Investigation",
                content: "An in silico Pharmacokinetic Investigation of Organic Luminogens (Ankara Univ. Eczacilik Fak. Derg., Ocak 2024)."
            },
            {
                date: "2023-09-01",
                title: "Bridging Molecular Docking to Molecular Dynamics",
                content: "Bridging Molecular Docking to Molecular Dynamics (J. Adv. Res. Nat. Appl. Sci., Eylül 2023)."
            },
            {
                date: "2023-04-01",
                title: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems",
                content: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems (J. Mol. Graph. Model., Nisan 2023)."
            }
        ],

        researchAreas: [
            {
                title: "Elektrokimyasal Algılama Platformları",
                description: "Hem deneysel protokoller hem de hesaplamalı modelleme ile ileri elektrokimyasal sensörlerin tasarımı ve optimizasyonu.",
                methodology: "Yüzey kimyası, elektrokimyasal analiz ve yapı–özellik ilişkileri."
            },
            {
                title: "Hesaplamalı İlaç Keşfi",
                description: "Moleküler etkileşimlerin in silico olarak incelenmesi ve ligand tasarımına destek sağlanması.",
                methodology: "Kemoinformatik, moleküler yerleştirme ve temel ADME incelemeleri."
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
                title: "Yazılım ve Teknik Altyapı",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Bilimsel Hesaplama"
                ]
            }
        },

        publications: [
            {
                title: "Targeting LIMK1 in Alzheimer's Disease",
                authors: "Defne Eşkin, Harun Nalçakan ve diğerleri",
                venue: "J. Turk. Chem. Soc. Sect. A",
                year: "2024",
                link: "#",
                abstract: ""
            },
            {
                title: "An in silico Pharmacokinetic Investigation of Organic Luminogens",
                authors: "Harun Nalçakan ve diğerleri",
                venue: "Ankara Univ. Eczacilik Fak. Derg.",
                year: "2024",
                link: "#",
                abstract: ""
            },
            {
                title: "Bridging Molecular Docking to Molecular Dynamics",
                authors: "Harun Nalçakan ve diğerleri",
                venue: "J. Adv. Res. Nat. Appl. Sci.",
                year: "2023",
                link: "#",
                abstract: ""
            },
            {
                title: "Computational insights into bis-N,N-dimethylaniline based D-π-A systems",
                authors: "Harun Nalçakan ve diğerleri",
                venue: "J. Mol. Graph. Model.",
                year: "2023",
                link: "#",
                abstract: ""
            }
        ],

        tools: {
            developedTitle: "Geliştirilen Araçlar",
            techStackTitle: "Teknoloji Yığını",
            viewProject: "Projeyi Görüntüle",
            hardware: "Donanım",
            software: "Yazılım",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Gelişmiş hesaplamalı platform.",
                    link: "#",
                    project_status: "Geliştirme Aşamasında"
                },
                {
                    name: "SnapChem",
                    description: "Kimyasal veri görselleştirme aracı.",
                    link: "#",
                    project_status: "Geliştirme Aşamasında"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3B yazıcılar",
                "Laboratuvar ekipmanları"
            ],
            softwareItems: [
                "Gaussian",
                "AutoDock",
                "Python",
                "MATLAB"
            ]
        },

        projects: [
            {
                title: "ADVISOR",
                description: "Sensör ve moleküler tasarım için gelişmiş hesaplamalı platform.",
                technologies: ["Python", "Gaussian", "Kemoinformatik"],
                link: "#",
                github: "#",
                project_status: "Geliştirme Aşamasında"
            },
            {
                title: "SnapChem",
                description: "Kimyasal veri görselleştirme ve analiz aracı.",
                technologies: ["Python", "Veri Görselleştirme"],
                link: "#",
                github: "#",
                project_status: "Geliştirme Aşamasında"
            }
        ],

        pdbCode: "1crn",

        contact: {
            email: "hnalcakan@ankara.edu.tr",
            location: "Ankara, Türkiye",
            affiliation: "Ankara Üniversitesi Fen Fakültesi Kimya Bölümü",
            orcid: "0000-0003-3821-8681",
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
