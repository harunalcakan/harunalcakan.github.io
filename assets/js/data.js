// THE CONTENT DATABASE - Harun Nalçakan Academic Portfolio
// Updated: 2026-01-24

const data = {
    "en": {
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Research Assistant",
        affiliation: "Ankara University, Faculty of Science, Chemistry Department",
        email: "hnalcakan@ankara.edu.tr",
        location: "Ankara, Türkiye",
        heroIntro: "Synthesizing Computational Precision with Experimental Validation.",
        aboutSummary: "I conduct research at Ankara University integrating both computational and experimental chemistry.",
        bio: "My research focuses on bridging the gap between theoretical modeling techniques and the development of advanced electrochemical sensors. I leverage in silico tools to predict and optimize molecular interactions, which are then validated through experimental electrochemical protocols.",
        
        // Skill Matrix - Plain Text Style
        skillMatrix: {
            computational: {
                title: "In Silico (Computational) Expertise",
                skills: [
                    "Cheminformatics",
                    "Molecular Docking",
                    "Molecular Dynamics (MD) Simulations",
                    "Density Functional Theory (DFT)"
                ]
            },
            experimental: {
                title: "In Vitro (Experimental) Expertise",
                skills: [
                    "Physical Chemistry",
                    "Electrochemistry",
                    "Electrochemical Sensors",
                    "Advanced Material Characterization"
                ]
            },
            software: {
                title: "Software & Technical Stack",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Scientific Data Visualization",
                    "In Silico Pharmacokinetics (ADMET)"
                ]
            }
        },

        // Publications - Divided and Chronological
        publications: {
            articles: [
                {
                    title: "Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation",
                    authors: "Defne Eşkin, Harun Nalçakan, Gülbin Kurtay et al.",
                    venue: "Journal of the Turkish Chemical Society Section A",
                    year: "2024",
                    link: "#"
                },
                {
                    title: "An in silico Pharmacokinetic Investigation of Organic Luminogens",
                    authors: "Harun Nalçakan, Gülbin Kurtay et al.",
                    venue: "Ankara Universitesi Eczacilik Fakultesi Dergisi",
                    year: "2024",
                    link: "#"
                },
                {
                    title: "Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes",
                    authors: "Harun Nalçakan, Gülbin Kurtay",
                    venue: "Journal of Advanced Research in Natural and Applied Sciences",
                    year: "2023",
                    link: "#"
                },
                {
                    title: "Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers",
                    authors: "Harun Nalçakan, Gülbin Kurtay et al.",
                    venue: "Journal of Molecular Graphics and Modelling",
                    year: "2023",
                    link: "#"
                }
            ],
            conferences: [
                { title: "Crafting Excellence in LIM Kinase 1 Inhibition", venue: "9th International BAU Drug Design Congress", year: "2023" },
                { title: "Guiding TRK Inhibition Strategies", venue: "9th International BAU Drug Design Congress", year: "2023" },
                { title: "Assessment of KRAS Inhibitors", venue: "9th International BAU Drug Design Congress", year: "2023" },
                { title: "Computational Evaluation of potent SGLT1 Inhibitors", venue: "9th International BAU Drug Design Congress", year: "2023" },
                { title: "Alzheimer's Alchemy: Dual-Inhibitory Potential", venue: "6th Int. Eurasian Conf. on Biological and Chemical Sciences", year: "2023" },
                { title: "Computational Modeling of Novel Filgotinib Derivatives", venue: "11. Int. Drug Chemistry Conference", year: "2023" },
                { title: "Molecular Docking of Novel Fedratinib Derivatives", venue: "8th International BAU Drug Design Congress", year: "2022" },
                { title: "Modeling Novel D-π-A Type Organic Dyes", venue: "34. Ulusal Kimya Kongresi", year: "2022" }
            ]
        },

        workExperience: [
            {
                role: "Research Assistant",
                institution: "Ankara University",
                year: "2023-Present",
                description: "Focusing on surface chemistry and computational modeling."
            }
        ],

        education: [
            {
                degree: "Ph.D. in Chemistry",
                institution: "Ankara University",
                year: "2026-Ongoing",
                description: "Starting advanced doctoral research phase."
            },
            {
                degree: "M.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2023-2026",
                description: "GPA: 3.93/4.00 | Thesis: Development of 3D-Printed Electrodes using PLA-based conductive filament for Nitro-PAH determination."
            },
            {
                degree: "B.Sc. in Chemistry",
                institution: "Ankara University",
                year: "2016-2021",
                description: "GPA: 3.34/4.00"
            }
        ],

        projects: {
            ongoing: "Ongoing research protocols involving advanced electrochemical sensing (Restricted Access).",
            tools: [
                { name: "ADVISOR", status: "Under Development", desc: "Advanced computational platform for scientific analysis." },
                { name: "SnapChem", status: "Under Development", desc: "Scientific tool for chemical data visualization." }
            ]
        },

        news: [{ date: "2026-01-24", title: "Website Update", content: "Academic portfolio and publication list updated." }],
        pdbCode: "1crn",
        
        contact: {
            email: "hnalcakan@ankara.edu.tr",
            orcid: "0000-0003-3821-8681",
            linkedin: "nalcakanharun",
            github: "harunalcakan",
            researchgate: "Harun-Nalcakan",
            collaboration_tag: "Open for Computational & Electrochemical Collaborations"
        }
    },

    "tr": {
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Araştırma Görevlisi",
        affiliation: "Ankara Üniversitesi Fen Fakültesi Kimya Bölümü",
        email: "hnalcakan@ankara.edu.tr",
        location: "Ankara, Türkiye",
        heroIntro: "Hesaplamalı Kimya ve Deneysel Doğrulamayı Sentezliyorum.",
        aboutSummary: "Ankara Üniversitesi'nde hesaplamalı ve deneysel kimya alanlarını birleştiren çalışmalar yürütmekteyim.",
        bio: "Araştırmalarım, teorik modelleme teknikleri ile ileri elektrokimyasal sensörlerin geliştirilmesi arasındaki köprüyü kurmaya odaklanmaktadır. Moleküler etkileşimleri öngörmek için in siliko araçlar kullanıyor ve bu sonuçları deneysel elektrokimyasal protokollerle doğruluyorum.",
        
        skillMatrix: {
            computational: {
                title: "Hesaplamalı Kimya (In Silico) Uzmanlık",
                skills: [
                    "Keminformatik",
                    "Moleküler Kenetleme (Docking)",
                    "Moleküler Dinamik (MD) Simülasyonları",
                    "Yoğunluk Fonksiyonel Teorisi (DFT)"
                ]
            },
            experimental: {
                title: "Deneysel Kimya (In Vitro) Uzmanlık",
                skills: [
                    "Fizikokimya",
                    "Elektrokimya",
                    "Elektrokimyasal Sensörler",
                    "İleri Malzeme Karakterizasyonu"
                ]
            },
            software: {
                title: "Yazılım ve Teknik Birikim",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Bilimsel Veri Görselleştirme",
                    "İn Siliko Farmakokinetik (ADMET)"
                ]
            }
        },

        education: [
            {
                degree: "Doktora, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2026-Devam Ediyor",
                description: "Doktora araştırma süreci başlangıcı."
            },
            {
                degree: "Yüksek Lisans, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2023-2026",
                description: "Ortalama: 3.93/4.00 | Tez: Polilaktik Asit Tabanlı İletken Filament Kullanılarak 3B Baskılı Elektrotların Geliştirilmesi ve Nitro-PAH Tayini."
            },
            {
                degree: "Lisans, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2016-2021",
                description: "Ortalama: 3.34/4.00"
            }
        ],

        workExperience: [
            {
                role: "Araştırma Görevlisi",
                institution: "Ankara Üniversitesi",
                year: "2023-Günümüz",
                description: "Yüzey kimyası ve hesaplamalı modelleme üzerine odaklanılmaktadır."
            }
        ],

        projects: {
            ongoing: "İleri elektrokimyasal algılama üzerine devam eden araştırma protokolleri (Gizli).",
            tools: [
                { name: "ADVISOR", status: "Geliştirme Aşamasında", desc: "Bilimsel analizler için ileri hesaplamalı platform." },
                { name: "SnapChem", status: "Geliştirme Aşamasında", desc: "Kimyasal veri görselleştirme aracı." }
            ]
        },
        news: [{ date: "24-01-2026", title: "Web Sitesi Güncellendi", content: "Akademik portfolyo ve yayın listesi güncellendi." }]
    }
};
