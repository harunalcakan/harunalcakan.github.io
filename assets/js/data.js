// assets/js/data.js

export const data = { // 'export' kelimesi eklendi
    "en": {
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Research Assistant",
        affiliation: "Ankara University, Faculty of Science, Chemistry Department",
        email: "hnalcakan@ankara.edu.tr",
        location: "Ankara, Türkiye",
        heroIntro: "Synthesizing Computational Precision with Experimental Reality.",
        aboutSummary: "I conduct research at Ankara University integrating both computational and experimental chemistry.",
        bio: "My research focuses on bridging the gap between theoretical modeling techniques and the development of advanced electrochemical sensors. I leverage in silico tools to predict and optimize molecular interactions, which are then validated through experimental electrochemical protocols.",
        
        sections: { // 'sections' anahtarı main.js'in okuması için eklendi
            home: "Home",
            about: "About",
            portfolio: "Research Portfolio",
            publications: "Publications",
            contact: "Contact",
            news: "Latest News"
        },

        skillMatrix: {
            computational: {
                title: "In Silico (Computational) Expertise",
                skills: ["Cheminformatics", "Molecular Docking", "MD Simulations", "DFT"]
            },
            experimental: {
                title: "In Vitro (Experimental) Expertise",
                skills: ["Physical Chemistry", "Electrochemistry", "Advanced Electrochemical Sensing Platforms", "Material Characterization"] // LIG yerine genel terim
            },
            software: {
                title: "Software & Technical Stack",
                skills: ["Python, MATLAB, R", "Gaussian, AutoDock, VMD", "Scientific Computing"]
            }
        },

        publications: {
            articles: [
                { title: "Targeting LIMK1 in Alzheimer's Disease", authors: "Defne Eşkin, Harun Nalçakan et al.", venue: "J. Turk. Chem. Soc.", year: "2024", link: "#" },
                { title: "An in silico Pharmacokinetic Investigation", authors: "Harun Nalçakan et al.", venue: "Ankara Univ. Eczacilik Fak. Derg.", year: "2024", link: "#" }
            ],
            conferences: [
                { title: "Crafting Excellence in LIM Kinase 1 Inhibition", venue: "9th Int. BAU Drug Design Congress", year: "2023" },
                { title: "Computational Evaluation of potent SGLT1 Inhibitors", venue: "9th Int. BAU Drug Design Congress", year: "2023" }
            ]
        },

        education: [
            { degree: "Ph.D. in Chemistry", institution: "Ankara University", year: "2026-Ongoing", description: "Advanced doctoral research phase." },
            { degree: "M.Sc. in Chemistry", institution: "Ankara University", year: "2023-2026", description: "GPA: 3.93/4.00 | Thesis: 3D-Printed Electrodes for Nitro-PAH determination." }, //
            { degree: "B.Sc. in Chemistry", institution: "Ankara University", year: "2016-2021", description: "GPA: 3.34/4.00" }
        ],

        workExperience: [
            { role: "Research Assistant", institution: "Ankara University", year: "2023-Present", description: "Focusing on surface chemistry and computational modeling." }
        ],

        tools: {
            developed: [
                { name: "ADVISOR", status: "Under Development", desc: "Advanced computational platform." }, //
                { name: "SnapChem", status: "Under Development", desc: "Chemical data visualization tool." } //
            ]
        },
        pdbCode: "1crn",
        contact: {
            email: "hnalcakan@ankara.edu.tr",
            orcid: "0000-0003-3821-8681",
            linkedin: "nalcakanharun",
            github: "harunalcakan",
            researchgate: "Harun-Nalcakan"
        }
    },

    "tr": {
        name: "Harun Nalçakan",
        firstName: "Harun",
        lastName: "Nalçakan",
        title: "Araştırma Görevlisi",
        affiliation: "Ankara Üniversitesi Fen Fakültesi Kimya Bölümü",
        heroIntro: "Hesaplamalı Kimya ve Deneysel Doğrulamayı Sentezliyorum.",
        bio: "Araştırmalarım, teorik modelleme teknikleri ile ileri elektrokimyasal sensörlerin geliştirilmesi arasındaki köprüyü kurmaya odaklanmaktadır.",
        
        sections: {
            home: "Ana Sayfa",
            about: "Hakkımda",
            portfolio: "Araştırma Portföyü",
            publications: "Yayınlar",
            contact: "İletişim",
            news: "Haberler"
        }
    }
};

export default data; // Dosyanın en sonuna bunu eklediğinden emin ol
