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
        heroIntro: "I am a research assistant in Chemistry at Ankara University. I try to see the same molecule on the screen and at the electrode: DFT, docking and short MD on one side; 3D-printed carbon surfaces and voltammetry on the other.",
        heroGreeting: "Hello, I'm",
        heroAffiliationShort: "Ankara University",
        bio: "I came to chemistry from the computational side. I wanted to see where a molecule sits, how it moves, and why a drug or a pollutant is reduced at a given potential. Docking, molecular dynamics and DFT are still most of my week. In the last few years the bench has caught up: 3D-printed and laser-carbonised electrodes, surface characterisation, and square-wave voltammetry of nitroaromatics. My MSc wrote that laboratory story; the PhD is an attempt to keep the two ends — prediction and measured current — on the same question. I am early in the path. The claim I am willing to make is a clean notebook, not a first discovery.",

        homeStats: {
            articles: 4,
            conferences: 16,
            citations: 14,
            hIndex: 2,
            focus: "Same molecule, two views: DFT / docking / MD, and voltammetry at printed carbon"
        },

        scholar: {
            authorId: "z6mdC6kAAAAJ",
            statsPath: "assets/data/scholar-stats.json"
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
            degreeLabel: "MSc Thesis",
            title: "Development of 3D-printed electrodes using polylactic acid-based conductive filament and their application in amperometric determination of nitro-polycyclic aromatic hydrocarbons",
            year: "2026",
            type: "MSc",
            language: "Turkish",
            subject: "Chemistry",
            institution: "Ankara University / Graduate School of Natural and Applied Sciences / Department of Chemistry / Chemistry Program"
        },

        portfolioIntro: "A structure I can turn in the browser — the same habit I use before a docking or MD run.",

        // Methods & Tools — visual work snapshots (add entries in both "en" and "tr")
        workGlimpsesIntro: "A few frames from the desk: a structure, a method, a voltammogram.",
        workGlimpses: [
            {
                type: "ngl",
                title: "Molecular structure exploration",
                caption: "Turning a protein in the browser before docking or a short MD run — the first check that the model is even the right one.",
                pdbCode: "1crn"
            }
        ],

        // Homepage — literature reading notes (add new entries at the top)
        literatureNotesIntro: "Notes I keep while reading: a method that worked, a claim I did not buy, a figure I wish I had drawn.",
        literatureNotes: [],

        // Section labels used by main.js (navbar, headings, toggles)
        sections: {
            home: "Home",
            about: "About",
            research: "Research",
            publications: "Publications",
            contact: "Contact",
            contactLinks: "Contact links",
            footerContactPrompt: "Questions? Send me an email!",
            news: "News",
            literatureNotes: "Reading Notes",
            literatureNotesEmpty: "No reading notes yet. Notes from my literature reading will appear here as I add them.",
            viewAllNotes: "View all Reading Notes →",
            homeDepartment: "Department of Chemistry",
            homeAt: "at",
            downloadCV: "Download CV",
            portfolioPdfGenerating: "Generating PDF…",
            education: "Education",
            workExperience: "Work Experience",
            teaching: "Teaching",
            workAndEducation: "Work Experience & Education",
            academicCompetency: "Academic & Technical Competency",
            researchAreas: "Research Areas",
            digitalIdeas: "Digital Ideas",
            digitalIdeasNote: "Concept-stage ideas for scientific workflows — early development, not released tools.",
            ideaStage: "Idea stage",
            conferencePapers: "Poster & Conference Presentations",
            peerReviewed: "Peer-Reviewed Articles",
            citationsBadge: "Citations",
            thesis: "MSc Thesis",
            thesisYear: "Year",
            thesisType: "Degree",
            thesisLanguage: "Language",
            thesisSubject: "Subject",
            molecularVisualization: "Molecular Visualization",
            workGlimpse: "A Glimpse from My Work",
            closePhoto: "Close",
            awards: "Awards & Recognition",
            researchFocus: "Research Focus",
            atAGlance: "At a Glance",
            publicationsCount: "Peer-reviewed articles",
            conferenceCount: "Poster & conference presentations",
            citationsCount: "Total citations",
            hIndexCount: "h-index",
            viewOnGoogleScholar: "View on Google Scholar →",
            scholarStatsNote: "Citation metrics sync from Google Scholar.",
            currentFocus: "Current focus",
            explorePublications: "Explore Publications",
            profilePhoto: "Profile Photo",
            nglAttribution: "Powered by NGL Viewer",
            visitorCount: "Visits",
            footerTagline: "Built with Computational Minimalism.",
            cornerShare: "share",
            cornerCopyLink: "copy",
            cornerCopied: "copied",
            cornerShareLinkedIn: "LinkedIn",
            cornerShareX: "X",
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
            about: "How Harun Nalçakan works: computational chemistry, 3D-printed electrodes, and an MSc on nitroaromatic voltammetry.",
            research: "Research areas, methods, and competencies in computational and experimental chemistry.",
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
                degree: "PhD in Chemistry",
                institution: "Ankara University",
                year: "2026–Ongoing",
                description: ""
            },
            {
                degree: "MSc in Chemistry",
                institution: "Ankara University",
                year: "2023–2026",
                description: "GPA: 3.93/4.00"
            },
            {
                degree: "BSc in Chemistry",
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
                description: "Teaching labs and problem sessions; research split between computational screening and electrochemical electrodes."
            }
        ],

        teaching: [
            { course: "Physical Chemistry Laboratory" },
            { course: "Basic Chemistry Laboratory" },
            { course: "Quantum Chemistry" }
        ],

        news: [],

        // Research areas (used by portfolio page)
        researchAreas: [
            {
                title: "Electrochemical Sensing Platforms",
                description: "Voltammetry of nitroaromatics and related phenols at 3D-printed and laser-carbonised carbon. The question is simple: when the surface changes, what does the wave do?",
                methodology: "Square-wave and cyclic voltammetry, electrode activation, and a cautious reading of peak current against electrode architecture."
            },
            {
                title: "Computational Drug Discovery",
                description: "I screen ligand–target poses with docking and short MD, then pass the shortlist through a rough ADME filter. Most of my conference posters live on this line.",
                methodology: "Cheminformatics, docking, MD, and basic ADME estimates — treated as a filter, not as a proof."
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
                title: "Experimental Expertise",
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
                    journal: "Journal of the Turkish Chemical Society Section A: Chemistry",
                    year: 2024,
                    citations: 0,
                    apa_citation: "Eşkin, D., Nalçakan, H., Kurtay, G., Akkan, Y., Türk, M., & Uras, B. (2024). Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics. Journal of the Turkish Chemical Society Section A: Chemistry, 11(4), 1425–1440.",
                    doi_link: "https://doi.org/10.18596/jotcsa.1465547"
                },
                {
                    title: "An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins",
                    journal: "Journal of Faculty of Pharmacy of Ankara University",
                    year: 2024,
                    citations: 3,
                    apa_citation: "Nalçakan, H., Kurtay, G., Özdil, D. T., & Yılmaz, Z. (2024). An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins. Journal of Faculty of Pharmacy of Ankara University, 48(1), 56–74.",
                    doi_link: "https://doi.org/10.33483/jfpau.1335047"
                },
                {
                    title: "Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA",
                    journal: "Journal of Advanced Research in Natural and Applied Sciences",
                    year: 2023,
                    citations: 1,
                    apa_citation: "Nalçakan, H., & Kurtay, G. (2023). Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA. Journal of Advanced Research in Natural and Applied Sciences, 9(3).",
                    doi_link: "https://doi.org/10.28979/jarnas.1186322"
                },
                {
                    title: "Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs",
                    journal: "Journal of Molecular Graphics and Modelling",
                    year: 2023,
                    citations: 10,
                    apa_citation: "Nalçakan, H., Kurtay, G., Sarıkavak, K., & Sevin, F. (2023). Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs. Journal of Molecular Graphics and Modelling, 120, 108485.",
                    doi_link: "https://doi.org/10.1016/j.jmgm.2023.108485"
                }
            ],
            conferences: [
                {
                    year: 2026,
                    title: "Computational Surface Modeling of Lunar Ilmenite for CO₂ Capture toward In-Situ Resource Utilization",
                    venue: "Poster presentation — 20th International Nanoscience and Nanotechnology Conference (NanoTR-20) (August 26–29, 2026, Izmir Institute of Technology, Gülbahçe–İYTE Campus, Urla, İzmir, Türkiye)"
                },
                {
                    year: 2026,
                    title: "Quantum Mechanical Assessment of Adsorption Dynamics in Lisinopril-Single Walled Carbon Nanotube Complexes as Drug Delivery System",
                    venue: "Poster presentation — 20th International Nanoscience and Nanotechnology Conference (NanoTR-20) (August 26–29, 2026, Izmir Institute of Technology, Gülbahçe–İYTE Campus, Urla, İzmir, Türkiye)"
                },
                {
                    year: 2025,
                    title: "Integrative In Silico Evaluation of Sulfonamide Derivatives as Dual Carbonic Anhydrase I and II Inhibitors via Molecular Docking and ADME/T Profiling",
                    venue: "Oral presentation — 2nd International Conference on Modern Problems of Theoretical & Experimental Chemistry (December 18–19, 2025, Baku State University, Baku, Azerbaijan)"
                },
                {
                    year: 2025,
                    title: "Rational Design and In Silico Profiling of Novel Bifunctional Scaffolds for Dual Integrin/PD-L1 Inhibition",
                    venue: "Oral presentation — 2nd International Conference on Modern Problems of Theoretical & Experimental Chemistry (December 18–19, 2025, Baku State University, Baku, Azerbaijan)"
                },
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
                    name: "ADViSOR",
                    description: "Concept for a molecular docking validation program.",
                    link: "#",
                    project_status: "Idea stage"
                },
                {
                    name: "SnapChem",
                    description: "Concept for a mobile molecule drawing app.",
                    link: "#",
                    project_status: "Idea stage"
                },
                {
                    name: "Chemify",
                    description: "Concept for a chemical calculation module and related tools.",
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
            researchgate: "https://www.researchgate.net/profile/Harun-Nalcakan",
            googleScholar: "https://scholar.google.com/citations?user=z6mdC6kAAAAJ&hl=en&oi=ao"
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
        heroIntro: "Ankara Üniversitesi Kimya Bölümü'nde araştırma görevlisiyim. Aynı molekülü hem ekranda hem elektrotta görmeye çalışıyorum: bir yanda DFT, kenetleme ve kısa moleküler dinamik; diğer yanda 3B baskılı karbon yüzeyler ve voltametri.",
        heroGreeting: "Merhaba, ben",
        heroAffiliationShort: "Ankara Üniversitesi",
        bio: "Kimyaya hesaplamalı taraftan girdim. Bir molekülün nereye oturduğunu, nasıl hareket ettiğini ve bir ilacın ya da kirleticinin neden o potansiyelde indirgendiğini görmek istedim. Kenetleme, moleküler dinamik ve DFT hâlâ haftamın büyük kısmı. Son yıllarda tezgâh yetişti: 3B baskılı ve lazerle karbonize elektrotlar, yüzey karakterizasyonu, nitroaromatiğin kare dalga voltametrisi. Yüksek lisans o laboratuvar hikâyesini yazdı; doktora, tahmin ile ölçülen akımı aynı soruya bakacak şekilde tutma denemesi. Yolun başındayım. Söylemeye razı olduğum şey bir ilk keşif değil, düzgün tutulmuş bir defter.",

        homeStats: {
            articles: 4,
            conferences: 16,
            citations: 14,
            hIndex: 2,
            focus: "Aynı molekül, iki bakış: DFT / kenetleme / MD ve baskılı karbonda voltametri"
        },

        scholar: {
            authorId: "z6mdC6kAAAAJ",
            statsPath: "assets/data/scholar-stats.json"
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
            institution: "Ankara Üniversitesi / Fen Bilimleri Enstitüsü / Kimya Anabilim Dalı / Kimya Bilim Dalı"
        },

        portfolioIntro: "Tarayıcıda çevirebildiğim bir yapı — kenetleme veya dinamik koşusundan önce yaptığım alışkanlığın ta kendisi.",

        workGlimpsesIntro: "Masadan birkaç kare: bir yapı, bir yöntem, bir voltammogram.",
        workGlimpses: [
            {
                type: "ngl",
                title: "Moleküler yapı incelemesi",
                caption: "Kenetleme veya kısa bir MD öncesi proteini tarayıcıda çevirmek — modelin doğru model olup olmadığına bakmanın ilk hali.",
                pdbCode: "1crn"
            }
        ],

        literatureNotesIntro: "Okurken tuttuğum notlar: işe yarayan bir yöntem, satın almadığım bir iddia, keşke benim çizdiğim bir şekil.",
        literatureNotes: [],

        sections: {
            home: "Ana Sayfa",
            about: "Hakkımda",
            research: "Araştırma",
            publications: "Yayınlar",
            contact: "İletişim",
            contactLinks: "İletişim bağlantıları",
            footerContactPrompt: "Bir sorunuz mu var? Bana e-posta gönderebilirsiniz.",
            news: "Haberler",
            literatureNotes: "Literatür Notları",
            literatureNotesEmpty: "Henüz not eklenmedi. Literatürden derlediğim notları zamanla burada paylaşacağım.",
            viewAllNotes: "Tüm Literatür Notları →",
            homeDepartment: "Kimya Bölümü",
            homeAt: "",
            downloadCV: "CV İndir",
            portfolioPdfGenerating: "PDF hazırlanıyor…",
            education: "Eğitim",
            workExperience: "İş Deneyimi",
            teaching: "Verdiğim Dersler",
            workAndEducation: "Eğitim ve İş Deneyimi",
            academicCompetency: "Bilimsel ve Teknik Yetkinlik",
            researchAreas: "Araştırma Alanları",
            digitalIdeas: "Dijital Fikirler",
            digitalIdeasNote: "Bilimsel iş akışları için fikir aşamasındaki projeler — henüz geliştirme sürecindeler, yayımlanmış yazılım değiller.",
            ideaStage: "Fikir aşaması",
            conferencePapers: "Poster ve Konferans Sunumları",
            peerReviewed: "Hakemli Makaleler",
            citationsBadge: "Atıf",
            thesis: "Yüksek Lisans Tezi",
            thesisYear: "Yıl",
            thesisType: "Tür",
            thesisLanguage: "Dil",
            thesisSubject: "Konu",
            molecularVisualization: "Moleküler Görselleştirme",
            workGlimpse: "Çalışmalarımdan Bir Kesit",
            closePhoto: "Kapat",
            awards: "Ödüller ve Başarılar",
            researchFocus: "Araştırma Odakları",
            atAGlance: "Genel Bakış",
            publicationsCount: "Hakemli makaleler",
            conferenceCount: "Poster ve konferans sunumları",
            citationsCount: "Toplam atıf",
            hIndexCount: "h-indeks",
            viewOnGoogleScholar: "Google Scholar profilim →",
            scholarStatsNote: "Atıf verileri Google Scholar üzerinden güncellenir.",
            currentFocus: "Güncel odak",
            explorePublications: "Yayınlara göz at",
            profilePhoto: "Profil fotoğrafı",
            nglAttribution: "NGL Viewer ile görselleştirildi",
            visitorCount: "Ziyaret",
            footerTagline: "Computational Minimalism ile tasarlandı.",
            cornerShare: "paylaş",
            cornerCopyLink: "kopyala",
            cornerCopied: "kopyalandı",
            cornerShareLinkedIn: "LinkedIn",
            cornerShareX: "X",
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
            index: "Harun Nalçakan — Ankara Üniversitesi Kimya Bölümü araştırma görevlisi. DFT, moleküler kenetleme, moleküler dinamik ve deneysel kimya.",
            about: "Harun Nalçakan nasıl çalışır: hesaplamalı kimya, 3B baskılı elektrotlar ve nitroaromatiğin voltametrisi üzerine bir yüksek lisans.",
            research: "Hesaplamalı ve deneysel kimyada araştırma alanları, yöntemler ve yetkinlikler.",
            notes: "Literatür okumalarından derlenen kısa notlar — hesaplamalı ve deneysel kimya.",
            publications: "Harun Nalçakan'ın hakemli makaleleri ve konferans sunumları.",
            contact: "Harun Nalçakan ile iletişim — e-posta, ORCID, Google Scholar, LinkedIn ve GitHub."
        },

        contactLabels: {
            email: "E-posta",
            academicLinks: "Akademik profiller",
            orcid: "ORCID profili",
            googleScholar: "Yayınlar ve atıflar",
            linkedin: "LinkedIn",
            github: "GitHub",
            researchgate: "ResearchGate"
        },

        education: [
            {
                degree: "Doktora, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2026–devam",
                description: ""
            },
            {
                degree: "Yüksek Lisans, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2023–2026",
                description: "GNO: 3.93/4.00"
            },
            {
                degree: "Lisans, Kimya",
                institution: "Ankara Üniversitesi",
                year: "2016–2021",
                description: "GNO: 3.34/4.00"
            }
        ],

        workExperience: [
            {
                role: "Araştırma Görevlisi",
                institution: "Ankara Üniversitesi, Kimya Bölümü",
                year: "2023–devam",
                description: "Laboratuvar ve problem saatleri; araştırma hattı hesaplamalı tarama ile elektrokimyasal elektrotlar arasında."
            }
        ],

        teaching: [
            { course: "Fizikokimya Laboratuvarı" },
            { course: "Temel Kimya Laboratuvarı" },
            { course: "Kuantum Kimyası" }
        ],

        news: [],

        researchAreas: [
            {
                title: "Elektrokimyasal Algılama Platformları",
                description: "3B baskılı ve lazerle karbonize karbon yüzeylerde nitroaromatiğin ve yakın fenollerin voltametrisi. Soru sade: yüzey değişince dalga ne yapıyor?",
                methodology: "Kare dalga ve dönüşümlü voltametri, elektrot aktivasyonu; pik akımını elektrot mimarisine karşı temkinli okumak."
            },
            {
                title: "Hesaplamalı İlaç Keşfi",
                description: "Ligand–hedef pozunu kenetleme ve kısa MD ile tarayıp kısa listeyi kaba bir ADME süzgecinden geçiriyorum. Kongre posterlerimin çoğu bu hatta.",
                methodology: "Kemoinformatik, kenetleme, MD ve temel ADME tahmini — kanıt değil, süzgeç."
            }
        ],

        skillMatrix: {
            computational: {
                title: "In Silico (Hesaplamalı) Çalışmalar",
                skills: [
                    "Kemoinformatik",
                    "Moleküler Kenetleme",
                    "MD Simülasyonları",
                    "DFT"
                ]
            },
            experimental: {
                title: "Deneysel Çalışmalar",
                skills: [
                    "Fizikokimya",
                    "Elektrokimya",
                    "Gelişmiş elektrokimyasal sensör platformları",
                    "Malzeme karakterizasyonu"
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
                    journal: "Journal of the Turkish Chemical Society Section A: Chemistry",
                    year: 2024,
                    citations: 0,
                    apa_citation: "Eşkin, D., Nalçakan, H., Kurtay, G., Akkan, Y., Türk, M., & Uras, B. (2024). Targeting LIMK1 in Alzheimer's Disease: A Multifaceted Computational Investigation Involving ADMET, Virtual Screening, Molecular Docking, and Molecular Dynamics. Journal of the Turkish Chemical Society Section A: Chemistry, 11(4), 1425–1440.",
                    doi_link: "https://doi.org/10.18596/jotcsa.1465547"
                },
                {
                    title: "An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins",
                    journal: "Journal of Faculty of Pharmacy of Ankara University",
                    year: 2024,
                    citations: 3,
                    apa_citation: "Nalçakan, H., Kurtay, G., Özdil, D. T., & Yılmaz, Z. (2024). An In Silico Pharmacokinetic Investigation of Organic Luminogens: Understanding the NIR AIEgens and Their Interactions with Serum Albumins. Journal of Faculty of Pharmacy of Ankara University, 48(1), 56–74.",
                    doi_link: "https://doi.org/10.33483/jfpau.1335047"
                },
                {
                    title: "Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA",
                    journal: "Journal of Advanced Research in Natural and Applied Sciences",
                    year: 2023,
                    citations: 1,
                    apa_citation: "Nalçakan, H., & Kurtay, G. (2023). Bridging Molecular Docking to Molecular Dynamics to Enlighten Recognition Processes of Tailored D-A/D-A-D Types' AIEgens with HSA/BSA. Journal of Advanced Research in Natural and Applied Sciences, 9(3).",
                    doi_link: "https://doi.org/10.28979/jarnas.1186322"
                },
                {
                    title: "Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs",
                    journal: "Journal of Molecular Graphics and Modelling",
                    year: 2023,
                    citations: 10,
                    apa_citation: "Nalçakan, H., Kurtay, G., Sarıkavak, K., & Sevin, F. (2023). Computational insights into bis-N,N-dimethylaniline based D-π-A photosensitizers bearing divergent-type of π-linkers for DSSCs. Journal of Molecular Graphics and Modelling, 120, 108485.",
                    doi_link: "https://doi.org/10.1016/j.jmgm.2023.108485"
                }
            ],
            conferences: [
                {
                    year: 2026,
                    title: "Computational Surface Modeling of Lunar Ilmenite for CO₂ Capture toward In-Situ Resource Utilization",
                    venue: "Poster presentation — 20th International Nanoscience and Nanotechnology Conference (NanoTR-20) (August 26–29, 2026, Izmir Institute of Technology, Gülbahçe–İYTE Campus, Urla, İzmir, Türkiye)"
                },
                {
                    year: 2026,
                    title: "Quantum Mechanical Assessment of Adsorption Dynamics in Lisinopril-Single Walled Carbon Nanotube Complexes as Drug Delivery System",
                    venue: "Poster presentation — 20th International Nanoscience and Nanotechnology Conference (NanoTR-20) (August 26–29, 2026, Izmir Institute of Technology, Gülbahçe–İYTE Campus, Urla, İzmir, Türkiye)"
                },
                {
                    year: 2025,
                    title: "Integrative In Silico Evaluation of Sulfonamide Derivatives as Dual Carbonic Anhydrase I and II Inhibitors via Molecular Docking and ADME/T Profiling",
                    venue: "Oral presentation — 2nd International Conference on Modern Problems of Theoretical & Experimental Chemistry (December 18–19, 2025, Baku State University, Baku, Azerbaijan)"
                },
                {
                    year: 2025,
                    title: "Rational Design and In Silico Profiling of Novel Bifunctional Scaffolds for Dual Integrin/PD-L1 Inhibition",
                    venue: "Oral presentation — 2nd International Conference on Modern Problems of Theoretical & Experimental Chemistry (December 18–19, 2025, Baku State University, Baku, Azerbaijan)"
                },
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
                    name: "ADViSOR",
                    description: "Moleküler kenetleme sonuçlarını değerlendirmeye yönelik bir program fikri.",
                    link: "#",
                    project_status: "Fikir aşaması"
                },
                {
                    name: "SnapChem",
                    description: "Mobil ortamda molekül çizmeye yönelik bir uygulama fikri.",
                    link: "#",
                    project_status: "Fikir aşaması"
                },
                {
                    name: "Chemify",
                    description: "Kimyasal hesaplamalar için modüler bir araç seti fikri.",
                    link: "#",
                    project_status: "Fikir aşaması"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3B yazıcılar",
                "Laboratuvar ekipmanı"
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
            researchgate: "https://www.researchgate.net/profile/Harun-Nalcakan",
            googleScholar: "https://scholar.google.com/citations?user=z6mdC6kAAAAJ&hl=en&oi=ao"
        }
    }
};

// Expose globally for main.js (non-module scripts)
if (typeof window !== "undefined") {
    window.data = data;
}
