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
                github: "#"
            },
            {
                title: "Project Title 2",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                technologies: ["Technology D", "Technology E"],
                link: "#",
                github: "#"
            },
            {
                title: "Project Title 3",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                technologies: ["Technology F", "Technology G", "Technology H"],
                link: "#",
                github: "#"
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
            research: "Research",
            tools: "Tools & Software",
            publications: "Publications",
            projects: "Projects",
            education: "Education",
            contact: "Contact",
            news: "Latest News",
            home: "Home",
            downloadCV: "Download CV"
        },
        researchIntro: "My research focuses on computational chemistry and material science, exploring novel methodologies for sensor design and molecular interactions.",
        researchAreas: [
            {
                title: "LIG Sensor Design",
                description: "Development of Laser-Induced Graphene (LIG) sensors for various applications.",
                methodology: "Computational modeling and experimental validation"
            },
            {
                title: "Molecular Docking",
                description: "Computational studies of molecular interactions and binding mechanisms.",
                methodology: "Structure-based drug design and virtual screening"
            }
        ],
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
                    link: "#"
                },
                {
                    name: "SnapChem",
                    description: "Molecular visualization and analysis software.",
                    link: "#"
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
        cvLink: "#"
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
                github: "#"
            },
            {
                title: "Proje Başlığı 2",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                technologies: ["Teknoloji D", "Teknoloji E"],
                link: "#",
                github: "#"
            },
            {
                title: "Proje Başlığı 3",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                technologies: ["Teknoloji F", "Teknoloji G", "Teknoloji H"],
                link: "#",
                github: "#"
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
            research: "Araştırma",
            tools: "Araçlar ve Yazılım",
            publications: "Yayınlar",
            projects: "Projeler",
            education: "Eğitim",
            contact: "İletişim",
            news: "Son Haberler",
            home: "Ana Sayfa",
            downloadCV: "CV İndir"
        },
        researchIntro: "Araştırmalarım hesaplamalı kimya ve malzeme bilimi üzerine odaklanmakta, sensör tasarımı ve moleküler etkileşimler için yeni metodolojiler keşfetmektedir.",
        researchAreas: [
            {
                title: "LIG Sensör Tasarımı",
                description: "Çeşitli uygulamalar için Lazer İndüklemeli Grafen (LIG) sensörlerinin geliştirilmesi.",
                methodology: "Hesaplamalı modelleme ve deneysel doğrulama"
            },
            {
                title: "Moleküler Docking",
                description: "Moleküler etkileşimler ve bağlanma mekanizmalarının hesaplamalı çalışmaları.",
                methodology: "Yapı tabanlı ilaç tasarımı ve sanal tarama"
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
        cvLink: "#"
    }
};
