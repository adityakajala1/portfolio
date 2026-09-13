# Aditya Kajala - Portfolio Website

A premium, Apple-inspired portfolio website showcasing projects, skills, and experience in AI & Machine Learning.

## 🎨 Features

- **Apple-Inspired Design**: Clean, minimal light theme with smooth animations
- **Fully Responsive**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: 60fps scroll reveals and micro-interactions
- **Custom Cursor**: Elegant cursor effect on desktop
- **Form Validation**: Client-side validation with user feedback
- **SEO Optimized**: Meta tags and semantic HTML
- **Accessible**: WCAG-compliant with keyboard navigation
- **Fast Loading**: Optimized assets and minimal dependencies

## 📁 Project Structure

```
portfolio/
├── index.html           # Home page
├── about.html           # About page
├── projects.html        # Projects showcase
├── contact.html         # Contact form
├── css/
│   ├── style.css       # Main styles
│   └── animations.css  # Animation definitions
├── js/
│   └── main.js         # Core functionality
└── assets/
    ├── logo.svg        # Custom logo
    ├── images/         # Image assets
    └── icons/          # Icon assets
```

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. That's it! No build process needed.

### Using a Local Server (Recommended)

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000` in your browser.

## 🌐 Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to Settings → Pages
4. Select `main` branch as source
5. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO`

### Netlify

1. Drag and drop the `portfolio` folder onto [Netlify Drop](https://app.netlify.com/drop)
2. Your site will be live instantly

### Vercel

```bash
npm i -g vercel
cd portfolio
vercel
```

## 🎯 Customization

### Update Personal Information

1. **Name & Role**: Edit text in all HTML files
2. **Email**: Replace `adityakajala@example.com` with your email
3. **Social Links**: Update GitHub, LinkedIn URLs in footer
4. **Projects**: Edit project cards in `projects.html`
5. **Skills**: Modify skills and percentages in `about.html`

### Change Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --accent-blue: #0071e3;        /* Primary color */
  --accent-blue-hover: #0077ed;  /* Hover state */
  --accent-blue-light: rgba(0, 113, 227, 0.1); /* Light accent */
}
```

### Add Your Photo

1. Add your image to `assets/images/`
2. Update the About page with an `<img>` tag

### Customize Logo

Replace `assets/logo.svg` with your own SVG logo, or use a PNG/JPG:

```html
<img src="./assets/logo.png" alt="Logo" width="32" height="32">
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Design Philosophy

This portfolio follows Apple's design principles:

- **Clarity**: Clear typography and generous whitespace
- **Deference**: Content is king, design supports it
- **Depth**: Layering and motion provide hierarchy
- **Simplicity**: Every element serves a purpose

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Credits

- Design: Inspired by Apple's design language
- Icons: Inline SVGs for performance
- Fonts: System fonts for native feel (-apple-system, SF Pro)

## 📧 Contact

**Aditya Kajala**
- Email: adityakajala@example.com
- LinkedIn: [linkedin.com/in/adityakajala](https://linkedin.com/in/adityakajala)
- GitHub: [github.com/adityakajala1](https://github.com/adityakajala1)

---

Built with ❤️ using HTML, CSS, and JavaScript
