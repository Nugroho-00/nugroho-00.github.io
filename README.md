# Portfolio Website - Satrio Nugroho

Modern, responsive portfolio website untuk Fullstack Developer dengan fokus pada backend development dan system integration.

## 📁 Struktur Project

```text
My_Portofolio/
├── index.html              # Halaman utama
├── css/
│   └── styles.css         # Styling utama
├── js/
│   ├── script.js          # JavaScript interaktif
│   └── translations.js    # Multi-language (EN/ID)
├── assets/
│   ├── images/
│   │   ├── photo.png      # Foto profil
│   │   └── projects/      # Screenshot projects
│   └── documents/
│       └── Satrio-Nugroho-CV.pdf
└── README.md
```

## 🚀 Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Multi-language** - Support English/Indonesian
- ✅ **Interactive Slider** - Service cards dengan drag & auto-play
- ✅ **Project Gallery** - Showcase dengan multiple images
- ✅ **Smooth Animations** - Scroll reveal & transitions
- ✅ **Contact Form** - Integrated mailto functionality
- ✅ **SEO Optimized** - Meta tags & Open Graph
- ✅ **Performance** - Vanilla JS, no dependencies

## 🛠️ Tech Stack

### Frontend

- **HTML5** - Semantic markup, accessibility
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript ES6+** - Vanilla JS, IntersectionObserver API

### Design

- **Fonts** - Google Fonts (Outfit, JetBrains Mono)
- **Icons** - Inline SVG
- **Colors** - Dark theme dengan accent colors

## 📋 Sections

1. **Hero Section** - Introduction with CTA buttons
2. **About Me** - Professional background (2-column magazine layout)
3. **Services** - Interactive slider dengan 4 service cards
4. **Projects** - 5 major projects dengan full-screen screenshots
5. **Contact** - Multi-method contact information

## 🎨 Design System

### Color Palette

```css
--bg: #0a0e17           /* Deep Navy Background */
--bg-alt: #0f1420       /* Alternative Background */
--surface: #141b2b      /* Card Surface */
--text: #e2e8f0         /* Primary Text */
--text-muted: #94a3b8   /* Secondary Text */
--accent: #38bdf8       /* Sky Blue Accent */
--accent-hover: #7dd3fc /* Hover State */
--border: #1e293b       /* Border Color */
```

### Typography

- **Headings** - Outfit (Sans-serif)
- **Body** - Outfit (Sans-serif)
- **Code/Numbers** - JetBrains Mono (Monospace)

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px (Single column, stacked layout)
- **Tablet**: 768px - 1024px (2-column services)
- **Desktop**: > 1024px (Full grid layout)

### Features per Device

- Mobile: Touch gestures, hamburger menu
- Tablet: 2-column layout, touch & mouse
- Desktop: Full sidebar, hover effects, keyboard navigation

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📝 Installation & Usage

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-username/My_Portofolio.git

# Navigate to folder
cd My_Portofolio

# Open in browser
# Double-click index.html atau gunakan live server
```

### Local Development

```bash
# Menggunakan Python HTTP Server
python -m http.server 8000

# Atau menggunakan Node.js http-server
npx http-server -p 8000

# Buka browser: http://localhost:8000
```

### Deployment

1. **GitHub Pages**: Push ke repository, enable GitHub Pages
2. **Netlify**: Drag & drop folder atau connect git
3. **Vercel**: Import project dari GitHub
4. **Traditional Hosting**: Upload via FTP/cPanel

## ✏️ Customization Guide

### 1. Menambah Project Baru

**HTML** (`index.html`):

```html
<article class="gallery-item">
  <div class="gallery-image">
    <img src="assets/images/projects/your-project.png" alt="Project Name">
    <div class="gallery-overlay">
      <h3 class="gallery-title" data-i18n="projectXTitle">Project Name</h3>
      <p class="gallery-category">Category • Role</p>
    </div>
  </div>
</article>
```

**Translations** (`js/translations.js`):

```javascript
// English
projectXTitle: "Project Name",

// Indonesian
projectXTitle: "Nama Project",
```

### 2. Mengubah Warna Theme

Edit `css/styles.css`:

```css
:root {
  --accent: #your-color;     /* Primary accent */
  --bg: #your-bg-color;      /* Background color */
}
```

### 3. Menambah Service Card

Edit `index.html` di section services dan tambahkan dot indicator.

### 4. Update Contact Info

Edit semua instance di:

- `index.html` - Contact section
- `js/translations.js` - Contact translations
- `README.md` - Contact information

## 🎯 Performance Optimization

- ✅ Lazy loading images
- ✅ CSS custom properties untuk theming
- ✅ Minimal JavaScript dependencies
- ✅ Optimized animations dengan `will-change`
- ✅ Efficient selectors dan event delegation

## 🔧 Troubleshooting

### Slider tidak berfungsi

1. Buka browser console (F12)
2. Check error messages
3. Pastikan semua file JS loaded
4. Refresh dengan Ctrl+F5 (hard refresh)

### Gambar tidak muncul

1. Verify path: `assets/images/projects/filename.png`
2. Check file extension (case-sensitive)
3. Ensure images are in correct folder

### Translation tidak update

1. Clear browser cache
2. Check `translations.js` syntax
3. Verify `data-i18n` attribute di HTML

## 📄 License

© 2026 Satrio Nugroho. All rights reserved.

## 📧 Contact

- Email: <snugroho211@gmail.com>
- Phone: +62 852-2916-0403
- LinkedIn: [nugroho-satrio](https://www.linkedin.com/in/nugroho-satrio/)
- GitHub: [Nugroho-00](https://github.com/Nugroho-00)

---

**Built with** ❤️ **using Vanilla HTML, CSS, and JavaScript**

