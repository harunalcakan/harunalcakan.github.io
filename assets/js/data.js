// THE CONTENT DATABASE - All text content goes here
// Replace placeholders with your actual information

const data = {
    "en": {
        name: "[Your Name Here]",
        firstName: "[Your First Name]",
        lastName: "[Your Last Name]",
        title: "[Your Academic Title]",
        affiliation: "[University Name]",
        email: "[your.email@university.edu]",
        location: "[City, Country]",
        heroIntro: "Exploring the intersection of Computational Chemistry and Material Science.",
        aboutSummary: "Exploring the intersection of Computational Chemistry and Material Science.",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        researchInterests: [
            "Research Area 1",
            "Research Area 2",
            "Research Area 3"
        ],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        publications: [
            {
                title: "Publication Title 1",
                authors: "Author A, Author B, [Your Name]",
                venue: "Conference/Journal Name 2024",
                year: "2024",
                link: "#",
                abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                title: "Publication Title 2",
                authors: "[Your Name], Author C",
                venue: "Journal Name 2023",
                year: "2023",
                link: "#",
                abstract: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                title: "Publication Title 3",
                authors: "Author D, [Your Name], Author E",
                venue: "Workshop Name 2023",
                year: "2023",
                link: "#",
                abstract: "Ut enim ad minim veniam, quis nostrud exercitation."
            }
        ],
        projects: [
            {
                title: "Project Title 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                technologies: ["Technology A", "Technology B", "Technology C"],
                link: "#",
                github: "#",
                project_status: "Research Phase",
                collaboration_tag: "Open for Computational Partnerships",
                molecule_path: "#"
            },
            {
                title: "Project Title 2",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                technologies: ["Technology D", "Technology E"],
                link: "#",
                github: "#",
                project_status: "Stable",
                collaboration_tag: "Collaborations by request",
                molecule_path: "#"
            },
            {
                title: "Project Title 3",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                technologies: ["Technology F", "Technology G", "Technology H"],
                link: "#",
                github: "#",
                project_status: "Beta",
                collaboration_tag: "Open for Experimental Validation",
                molecule_path: "#"
            }
        ],
        workExperience: [
            {
                role: "Research Assistant",
                institution: "[University/Institution Name]",
                year: "2020-Present",
                description: "Conducting research in computational chemistry and material science."
            },
            {
                role: "Teaching Assistant",
                institution: "[University Name]",
                year: "2018-2020",
                description: "Assisted in undergraduate courses and laboratory sessions."
            }
        ],
        education: [
            {
                degree: "Ph.D. in [Field]",
                institution: "[University Name]",
                year: "2020-2024",
                description: "Thesis: Lorem ipsum dolor sit amet"
            },
            {
                degree: "M.Sc. in [Field]",
                institution: "[University Name]",
                year: "2018-2020",
                description: "Thesis: Consectetur adipiscing elit"
            },
            {
                degree: "B.Sc. in [Field]",
                institution: "[University Name]",
                year: "2014-2018",
                description: "Graduated with honors"
            }
        ],
        news: [
            {
                date: "2024-01-15",
                title: "New Publication Accepted",
                content: "Our latest paper on machine learning has been accepted to Conference Name 2024."
            },
            {
                date: "2023-12-10",
                title: "Project Update",
                content: "Released new version of research project with improved features."
            },
            {
                date: "2023-11-05",
                title: "Conference Presentation",
                content: "Presented research findings at International Conference 2023."
            }
        ],
        sections: {
            about: "About",
            portfolio: "Research Portfolio",
            publications: "Publications",
            contact: "Contact",
            news: "Latest News",
            home: "Home",
            downloadCV: "Download CV",
            education: "Education",
            academicCompetency: "Academic & Technical Competency",
            researchAreas: "Research Areas",
            scientificTools: "Scientific Tools",
            theme_light: "Light",
            theme_dark: "Dark",
            projects: "Projects",
            tools: "Tools & Software",
            workExperience: "Work Experience"
        },
        researchIntro: "My research focuses on computational chemistry and material science, exploring novel methodologies for sensor design and molecular interactions.",
        pdbCode: "1crn",
        researchAreas: [
            {
                title: "Advanced Electrochemical Sensing Platforms",
                description: "Computational and experimental strategies for optimizing carbon-based electrochemical interfaces and sensor performance.",
                methodology: "DFT calculations, molecular dynamics simulations, and experimental validation"
            },
            {
                title: "In Silico Drug Design",
                description: "Computational approaches to drug discovery and molecular interaction studies.",
                methodology: "Structure-based drug design, virtual screening, and binding affinity prediction"
            },
            {
                title: "Computational Material Science",
                description: "Modeling and simulation of material properties for sensor applications.",
                methodology: "Quantum mechanical calculations, machine learning, and experimental correlation"
            }
        ],
        skillMatrix: {
            computational: {
                title: "Computational Chemistry",
                skills: [
                    "Density Functional Theory (DFT)",
                    "Molecular Dynamics (MD) Simulations",
                    "Quantum Chemistry Calculations",
                    "Structure-Based Drug Design",
                    "Virtual Screening"
                ]
            },
            experimental: {
                title: "Experimental Techniques",
                skills: [
                    "Carbon-Based Material Synthesis",
                    "Advanced Electrochemical Sensing Platforms",
                    "Electrochemical Analysis",
                    "Material Synthesis",
                    "Spectroscopic Methods"
                ]
            },
            software: {
                title: "Software & Programming",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Machine Learning (TensorFlow, PyTorch)",
                    "Data Analysis & Visualization",
                    "Scientific Computing"
                ]
            },
            academic: {
                title: "Academic & Soft Skills",
                skills: [
                    "Scientific Writing & Communication",
                    "Grant Writing & Proposal Development",
                    "Collaborative Research",
                    "Mentoring & Teaching",
                    "Project Management"
                ]
            }
        },
        tools: {
            developedTitle: "Developed Tools",
            techStackTitle: "Tech Stack",
            viewProject: "View Project",
            hardware: "Hardware",
            software: "Software",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Advanced computational tool for sensor design and analysis.",
                    link: "#",
                    project_status: "Beta",
                    collaboration_tag: "Open for Computational Partnerships",
                    molecule_path: "https://3Dmol.csb.pitt.edu/tests/auto/data/1crn.pdb"
                },
                {
                    name: "SnapChem",
                    description: "Molecular visualization and analysis software.",
                    link: "#",
                    project_status: "Beta",
                    collaboration_tag: "Open for Visualization Collaborations",
                    molecule_path: "https://3Dmol.csb.pitt.edu/tests/auto/data/ligand.pdb"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3D Printers",
                "Laboratory Equipment"
            ],
            softwareItems: [
                "Gaussian",
                "AutoDock",
                "Python",
                "MATLAB"
            ]
        },
        cvLink: "#",
        contact: {
            email: "[your.email@university.edu]",
            location: "[City, Country]",
            affiliation: "[University Name]",
            orcid: "https://orcid.org/0000-0000-0000-0000",
            linkedin: "https://linkedin.com/in/yourprofile",
            googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
            github: "https://github.com/yourusername",
            collaboration_tag: "Open for computational and electrochemical collaborations"
        }
    },
    "tr": {
        name: "[Adınız Buraya]",
        firstName: "[Adınız]",
        lastName: "[Soyadınız]",
        title: "[Akademik Unvanınız]",
        affiliation: "[Üniversite Adı]",
        email: "[email@universite.edu]",
        location: "[Şehir, Ülke]",
        heroIntro: "Hesaplamalı Kimya ve Malzeme Bilimi kesişimini keşfediyorum.",
        aboutSummary: "Hesaplamalı Kimya ve Malzeme Bilimi kesişimini keşfediyorum.",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        researchInterests: [
            "Araştırma Alanı 1",
            "Araştırma Alanı 2",
            "Araştırma Alanı 3"
        ],
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        publications: [
            {
                title: "Yayın Başlığı 1",
                authors: "Yazar A, Yazar B, [Adınız]",
                venue: "Konferans/Dergi Adı 2024",
                year: "2024",
                link: "#",
                abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                title: "Yayın Başlığı 2",
                authors: "[Adınız], Yazar C",
                venue: "Dergi Adı 2023",
                year: "2023",
                link: "#",
                abstract: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                title: "Yayın Başlığı 3",
                authors: "Yazar D, [Adınız], Yazar E",
                venue: "Çalıştay Adı 2023",
                year: "2023",
                link: "#",
                abstract: "Ut enim ad minim veniam, quis nostrud exercitation."
            }
        ],
        projects: [
            {
                title: "Proje Başlığı 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                technologies: ["Teknoloji A", "Teknoloji B", "Teknoloji C"],
                link: "#",
                github: "#",
                project_status: "Araştırma Aşaması",
                collaboration_tag: "Hesaplamalı işbirliklerine açık",
                molecule_path: "#"
            },
            {
                title: "Proje Başlığı 2",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                technologies: ["Teknoloji D", "Teknoloji E"],
                link: "#",
                github: "#",
                project_status: "Kararlı",
                collaboration_tag: "İşbirlikleri talep üzerine",
                molecule_path: "#"
            },
            {
                title: "Proje Başlığı 3",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                technologies: ["Teknoloji F", "Teknoloji G", "Teknoloji H"],
                link: "#",
                github: "#",
                project_status: "Beta",
                collaboration_tag: "Deneysel doğrulama için açık",
                molecule_path: "#"
            }
        ],
        workExperience: [
            {
                role: "Araştırma Görevlisi",
                institution: "[Üniversite/Kurum Adı]",
                year: "2020-Günümüz",
                description: "Hesaplamalı kimya ve malzeme bilimi alanında araştırma yürütülmektedir."
            },
            {
                role: "Öğretim Görevlisi",
                institution: "[Üniversite Adı]",
                year: "2018-2020",
                description: "Lisans dersleri ve laboratuvar oturumlarında asistanlık yapılmıştır."
            }
        ],
        education: [
            {
                degree: "[Alan] Doktora",
                institution: "[Üniversite Adı]",
                year: "2020-2024",
                description: "Tez: Lorem ipsum dolor sit amet"
            },
            {
                degree: "[Alan] Yüksek Lisans",
                institution: "[Üniversite Adı]",
                year: "2018-2020",
                description: "Tez: Consectetur adipiscing elit"
            },
            {
                degree: "[Alan] Lisans",
                institution: "[Üniversite Adı]",
                year: "2014-2018",
                description: "Onur derecesi ile mezun"
            }
        ],
        news: [
            {
                date: "2024-01-15",
                title: "Yeni Yayın Kabul Edildi",
                content: "Makine öğrenmesi üzerine son makalemiz Conference Name 2024'e kabul edildi."
            },
            {
                date: "2023-12-10",
                title: "Proje Güncellemesi",
                content: "Geliştirilmiş özelliklerle araştırma projesinin yeni versiyonu yayınlandı."
            },
            {
                date: "2023-11-05",
                title: "Konferans Sunumu",
                content: "Araştırma bulguları International Conference 2023'te sunuldu."
            }
        ],
        sections: {
            about: "Hakkımda",
            portfolio: "Araştırma Portföyü",
            publications: "Yayınlar",
            contact: "İletişim",
            news: "Son Haberler",
            home: "Ana Sayfa",
            downloadCV: "CV İndir",
            education: "Eğitim",
            academicCompetency: "Akademik ve Teknik Yeterlilik",
            researchAreas: "Araştırma Alanları",
            scientificTools: "Bilimsel Araçlar",
            theme_light: "Açık",
            theme_dark: "Koyu",
            projects: "Projeler",
            tools: "Araçlar ve Yazılım",
            workExperience: "İş Deneyimi"
        },
        researchIntro: "Araştırmalarım hesaplamalı kimya ve malzeme bilimi üzerine odaklanmakta, sensör tasarımı ve moleküler etkileşimler için yeni metodolojiler keşfetmektedir.",
        pdbCode: "1crn",
        researchAreas: [
            {
                title: "İleri Elektrokimyasal Algılama Platformları",
                description: "Karbon bazlı elektrokimyasal arayüzleri ve sensör performansını optimize etmek için hesaplamalı ve deneysel stratejiler.",
                methodology: "DFT hesaplamaları, moleküler dinamik simülasyonları ve deneysel doğrulama"
            },
            {
                title: "In Silico İlaç Tasarımı",
                description: "İlaç keşfi ve moleküler etkileşim çalışmaları için hesaplamalı yaklaşımlar.",
                methodology: "Yapı tabanlı ilaç tasarımı, sanal tarama ve bağlanma afinitesi tahmini"
            },
            {
                title: "Hesaplamalı Malzeme Bilimi",
                description: "Sensör uygulamaları için malzeme özelliklerinin modellenmesi ve simülasyonu.",
                methodology: "Kuantum mekanik hesaplamalar, makine öğrenmesi ve deneysel korelasyon"
            }
        ],
        skillMatrix: {
            computational: {
                title: "Hesaplamalı Kimya",
                skills: [
                    "Yoğunluk Fonksiyonel Teorisi (DFT)",
                    "Moleküler Dinamik (MD) Simülasyonları",
                    "Kuantum Kimyası Hesaplamaları",
                    "Yapı Tabanlı İlaç Tasarımı",
                    "Sanal Tarama"
                ]
            },
            experimental: {
                title: "Deneysel Teknikler",
                skills: [
                    "Karbon Bazlı Malzeme Sentezi",
                    "İleri Elektrokimyasal Algılama Platformları",
                    "Elektrokimyasal Analiz",
                    "Malzeme Sentezi",
                    "Spektroskopik Yöntemler"
                ]
            },
            software: {
                title: "Yazılım ve Programlama",
                skills: [
                    "Python, MATLAB, R",
                    "Gaussian, AutoDock, VMD",
                    "Makine Öğrenmesi (TensorFlow, PyTorch)",
                    "Veri Analizi ve Görselleştirme",
                    "Bilimsel Hesaplama"
                ]
            },
            academic: {
                title: "Akademik ve Yumuşak Beceriler",
                skills: [
                    "Bilimsel Yazma ve İletişim",
                    "Proje Yazma ve Geliştirme",
                    "İşbirlikçi Araştırma",
                    "Mentorluk ve Öğretim",
                    "Proje Yönetimi"
                ]
            }
        },
        tools: {
            developedTitle: "Geliştirilen Araçlar",
            techStackTitle: "Teknoloji Yığını",
            viewProject: "Projeyi Görüntüle",
            hardware: "Donanım",
            software: "Yazılım",
            developed: [
                {
                    name: "ADVISOR",
                    description: "Sensör tasarımı ve analizi için gelişmiş hesaplamalı araç.",
                    link: "#"
                },
                {
                    name: "SnapChem",
                    description: "Moleküler görselleştirme ve analiz yazılımı.",
                    link: "#"
                }
            ],
            hardwareItems: [
                "Creality Falcon 2",
                "3D Yazıcılar",
                "Laboratuvar Ekipmanları"
            ],
            softwareItems: [
                "Gaussian",
                "AutoDock",
                "Python",
                "MATLAB"
            ]
        },
        cvLink: "#",
        contact: {
            email: "[email@universite.edu]",
            location: "[Şehir, Ülke]",
            affiliation: "[Üniversite Adı]",
            orcid: "https://orcid.org/0000-0000-0000-0000",
            linkedin: "https://linkedin.com/in/yourprofile",
            googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
            github: "https://github.com/yourusername",
            collaboration_tag: "Hesaplamalı ve elektrokimyasal işbirliklerine açık"
        }
    }
};
