# Academic Portfolio Template

A generic, high-performance academic personal website template with a "Computational Minimalism" design system.

## 🎨 Design Philosophy

**Computational Minimalism**: A clean, rigorous academic look with subtle high-tech/terminal undertones.

### Features
- ✨ Typewriter effect for the hero name
- 🌓 Dark/Light mode toggle (persists in localStorage)
- 🌍 English/Turkish language support (easily extensible)
- 📱 Fully responsive design
- ⚡ No build tools required - pure HTML, CSS, and JavaScript
- 🎯 Data-driven architecture - all content in `data.js`

## 📁 File Structure

```
/root
├── index.html              # Main entry point (Semantic HTML5)
├── README.md               # This file
└── assets
    ├── css
    │   └── style.css       # Custom animations (Typewriter, Glow effects)
    ├── js
    │   ├── data.js         # THE CONTENT DATABASE (All text goes here)
    │   └── main.js         # THE LOGIC (Render engine, Event listeners)
    └── images
        └── placeholder.jpg # (Optional: logic to handle missing images)
```

## 🚀 Quick Start

1. **Clone or download** this template
2. **Open `assets/js/data.js`** and replace all placeholders with your information
3. **Open `index.html`** in your browser or deploy to a web server

## 📝 Customization Guide

### Step 1: Update Your Personal Information

Edit `assets/js/data.js` and replace the following placeholders:

#### Basic Information
- `name`: Your full name
- `title`: Your academic title (e.g., "Ph.D. Candidate", "Assistant Professor")
- `affiliation`: Your university or institution
- `email`: Your email address
- `location`: Your location (e.g., "Istanbul, Turkey")

#### Bio & About
- `bio`: A short bio (appears in hero section)
- `about`: A longer about section

#### Research Interests
Replace the array in `researchInterests` with your actual research areas:
```javascript
researchInterests: [
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision"
]
```

#### Publications
Update the `publications` array with your publications:
```javascript
publications: [
    {
        title: "Your Publication Title",
        authors: "Author 1, Author 2, Your Name",
        venue: "Conference/Journal Name 2024",
        year: "2024",
        link: "https://your-link.com",
        abstract: "Publication abstract..."
    }
]
```

#### Projects
Update the `projects` array:
```javascript
projects: [
    {
        title: "Project Name",
        description: "Project description...",
        technologies: ["Python", "TensorFlow", "React"],
        link: "https://project-demo.com",
        github: "https://github.com/username/project"
    }
]
```

#### Education
Update the `education` array with your academic background:
```javascript
education: [
    {
        degree: "Ph.D. in Computer Science",
        institution: "University Name",
        year: "2020-2024",
        description: "Thesis: Your thesis title"
    }
]
```

### Step 2: Update Navigation

In `index.html`, find the navigation section and update:
```html
<a href="#hero">[Your Name]</a>
```

### Step 3: Update Footer

In `index.html`, find the footer and update:
```html
<p>&copy; ${new Date().getFullYear()} [Your Name Here]. Built with Computational Minimalism.</p>
```

### Step 4: Update Meta Tags

In `index.html` `<head>`, update:
```html
<meta name="description" content="Your description">
<title>[Your Name Here] - Academic Portfolio</title>
```

### Step 5: Add Your Image (Optional)

1. Add your profile image to `assets/images/`
2. Update the hero section in `main.js` if you want to include an image

## 🎨 Theme Customization

### Color Scheme

Edit `assets/css/style.css` to customize colors:

**Light Mode:**
- Background: `--bg-light: #ffffff`
- Text: `--text-light: #000000`

**Dark Mode:**
- Background: `--bg-dark: #0a0a0a`
- Text: `--text-dark: #e0e0e0`
- Accent: `--accent-dark: #00ff41` (Terminal Green)

### Fonts

The template uses:
- **Inter** for body text
- **Fira Code** for headers and monospace elements

To change fonts, update the `@import` statements in `style.css`.

## 🌍 Adding New Languages

To add a new language (e.g., French):

1. In `data.js`, add a new key to the `data` object:
```javascript
const data = {
    "en": { ... },
    "tr": { ... },
    "fr": {
        name: "[Votre Nom]",
        // ... rest of the content
    }
};
```

2. In `main.js`, update the language toggle to cycle through all languages.

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select your branch and folder
4. Your site will be live at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your folder to Netlify
2. Your site will be live instantly

### Vercel
1. Import your repository to Vercel
2. Deploy with default settings

## 📦 Dependencies

- **Tailwind CSS** (via CDN) - Utility-first CSS framework
- **Google Fonts** - Inter and Fira Code fonts

No build tools or package managers required!

## 🎯 Features Explained

### Typewriter Effect
The hero name animates with a typewriter effect. This is achieved through CSS animations in `style.css`.

### Theme Persistence
Your theme preference (light/dark) is saved in `localStorage` and persists across sessions.

### Language Persistence
Your language preference (EN/TR) is saved in `localStorage` and persists across sessions.

### Smooth Animations
All sections fade in on load with staggered delays for a polished feel.

## 🐛 Troubleshooting

### Content Not Showing
- Make sure `data.js` is loaded before `main.js` in `index.html`
- Check browser console for JavaScript errors

### Theme Not Persisting
- Check that `localStorage` is enabled in your browser
- Clear browser cache and try again

### Fonts Not Loading
- Check your internet connection (fonts load from Google Fonts CDN)
- Verify the `@import` URLs in `style.css`

## 📄 License

This template is provided as-is. Feel free to modify and use for your academic portfolio.

## 🤝 Contributing

This is a template, but if you have suggestions for improvements:
1. Fork the repository
2. Make your changes
3. Submit a pull request

## 📧 Support

For questions or issues, please open an issue on the repository.

---

**Built with Computational Minimalism** 🧬
