<!-- PROJECT HEADER -->
<div align="center">
  <img src="https://img.shields.io/badge/status-production--ready-brightgreen?style=for-the-badge&logo=github&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-purple?style=for-the-badge&logo=github&logoColor=white" alt="PRs Welcome" />
  <br><br>
  <h1 style="font-size: 3.5rem; font-weight: 800; letter-spacing: -2px; background: linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6, #a855f7, #d946ef); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline;">MANIESTA</h1>
  <p style="font-size: 1.5rem; color: #9898b0; font-weight: 500; margin-top: -20px;">Digital Products & Interactive Experiences</p>
  <br>
  <p style="font-size: 1.1rem; color: #606070; max-width: 700px; margin: 0 auto;">
    A premium single-file web application showcasing a collection of modern digital products.
    Built with cutting-edge web technologies to deliver an immersive, interactive 3D experience.
  </p>
  <br><br>
  <a href="#demo">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Click_Here-22d3ee?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="#features">
    <img src="https://img.shields.io/badge/✨_Features-Explore-8b5cf6?style=for-the-badge&logo=awesome-lists&logoColor=white" alt="Features" />
  </a>
  <a href="#quick-start">
    <img src="https://img.shields.io/badge/⚡_Quick_Start-Get_Started-3b82f6?style=for-the-badge&logo=readthedocs&logoColor=white" alt="Quick Start" />
  </a>
  <br><br><br>
</div>

---

## ✨ **Overview**

MANIESTA is a **production-ready, single‑file web application** that transforms the way digital products are presented. It combines sophisticated 3D visualizations, smooth animations, and modern UI patterns to create an experience that feels alive and premium.

> **No build step. No dependencies to install. Just open and experience.**

The entire application is contained in one `index.html` file, making it incredibly easy to deploy, share, and customize.

---

## 🎯 **Why MANIESTA?**

| Feature | Description |
|---------|-------------|
| 🖥️ **Self-Contained** | Single HTML file — no bundlers, no npm install, no configuration |
| 🎨 **Premium Visuals** | Dark futuristic UI with glassmorphism, gradient accents, and glowing effects |
| 🌍 **3D Globe** | Real-time Three.js globe with animated arcs, points, and atmospheric glow |
| 📜 **Parallax Scrolling** | Project cards move in opposite directions, creating depth and immersion |
| 🖱️ **Interactive Text** | MANIESTA wordmark reveals a multicolor gradient that follows your cursor |
| ✨ **Tracing Beam** | Scroll-driven beam connects sections, guiding users through the narrative |
| 📱 **Fully Responsive** | Adapts seamlessly from mobile to desktop with performance optimization |
| ♿ **Accessible** | Semantic HTML, keyboard navigation, and reduced-motion support |

---

## 🔥 **Features**

### **Hero Section**
- Animated wavy background with cyan-blue-purple gradients
- Lamp glow effect illuminating the MANIESTA heading
- Mouse-tracking text hover with multicolor gradient reveal
- Floating sparkles that shimmer subtly
- Parallax mouse movement for depth

### **Project Showcase**
- 12+ digital products displayed as 3D tilt cards
- Hover effects with translateZ depth layering
- Category filtering with smooth animated pills
- Three-row parallax scroll (rows move in opposite directions)
- Dynamic project cards with gradient thumbnails

### **Global Section**
- Interactive Three.js globe with:
  - Auto-rotation
  - Glowing country points
  - Animated connection arcs
  - Atmospheric glow shader
  - Orbiting rings

### **Technology Stack**
- 15+ technologies displayed as floating cards
- Hover lift effects with purple glow
- Clean, modern grid layout

### **Performance & UX**
- Lazy-loaded animations (IntersectionObserver)
- `requestAnimationFrame` for smooth 60fps
- `prefers-reduced-motion` support
- Cleanup of all observers, listeners, and 3D resources
- Mobile optimization (reduced 3D intensity, smaller particles)

---

## 🚀 **Quick Start**

### **Option 1: Direct Open**
```bash
# Clone the repository
git clone https://github.com/your-username/maniesta.git

# Navigate to directory
cd maniesta

# Open in browser
open index.html   # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

### **Option 2: Python Server** (optional, for local hosting)
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

### **Option 3: Deploy to GitHub Pages**
1. Push to GitHub
2. Go to **Settings → Pages**
3. Select branch (`main`) and root folder
4. Visit `https://your-username.github.io/maniesta/`

---

## 🎨 **Customization**

### **Projects Data**
Edit the `PROJECTS` array inside the `<script>` tag:

```javascript
const PROJECTS = [
  {
    id: 'my-project',
    title: 'My Project',
    description: 'Description here...',
    category: 'AI',
    technologies: ['React', 'Three.js'],
    link: 'https://example.com',
    colors: ['#22d3ee', '#8b5cf6', '#d946ef']
  }
];
```

### **Categories**
Modify the `CATEGORIES` array:
```javascript
const CATEGORIES = ['All', 'AI', 'Productivity', 'Education', ...];
```

### **Technologies**
Update the `TECHNOLOGIES` array:
```javascript
const TECHNOLOGIES = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' }
];
```

### **Color Palette**
Change CSS variables in `:root`:
```css
:root {
  --cyan: #22d3ee;
  --blue: #3b82f6;
  --purple: #8b5cf6;
  --magenta: #d946ef;
}
```

### **Globe Parameters**
Adjust in the `GlobeComponent`:
- `pointsCount` – number of glowing dots
- `arcCount` – number of connection arcs
- `ringCount` – number of orbital rings
- Rotation speed values

---

## 🛠️ **Tech Stack**

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI |
| **htm** | JSX-like syntax without compilation |
| **Three.js** | 3D globe rendering |
| **Custom CSS** | Styling with modern features (glassmorphism, grid, flexbox) |
| **IntersectionObserver** | Scroll-triggered animations |
| **requestAnimationFrame** | Smooth 60fps animation loop |

---

## 📁 **Project Structure**

```
maniesta/
├── index.html          # Complete application (HTML + CSS + JS)
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

---

## 🔧 **Development**

This project uses **no build tools** — everything is vanilla HTML/CSS/JS with React loaded via UMD. This makes it extremely portable and easy to modify.

### **Edit directly:**
1. Open `index.html` in your preferred editor
2. Find the relevant section (data, styles, components)
3. Make changes and refresh the browser

### **Performance tips:**
- Keep `particleDensity` below 50 for mobile
- Reduce `arcCount` to 3 for low-power devices
- Enable `prefers-reduced-motion` for accessibility

---

## 📈 **Performance Optimizations**

| Technique | Benefit |
|-----------|---------|
| `IntersectionObserver` | Lazy-loads animations only when visible |
| `requestAnimationFrame` throttling | Prevents scroll jank |
| `prefers-reduced-motion` | Disables animations for users who prefer less motion |
| Resource cleanup | Proper disposal of Three.js geometries, materials, and event listeners |
| Mobile detection | Reduces 3D complexity on smaller screens |
| `window.devicePixelRatio` capping | Prevents GPU overload on high-DPI devices |

---

## 🔒 **Accessibility**

- Semantic HTML elements (`<nav>`, `<section>`, `<footer>`)
- Keyboard-navigable buttons and links
- Visible focus states
- `aria-label` on interactive elements
- Color contrast ratios maintained
- Reduced-motion support

---

## 📄 **License**

Distributed under the **MIT License** — free to use, modify, and distribute.

---

## 🙏 **Acknowledgments**

- [React](https://reactjs.org/) – UI library
- [htm](https://github.com/developit/htm) – JSX-like syntax
- [Three.js](https://threejs.org/) – 3D rendering
- [Unsplash](https://unsplash.com/) – Inspiration for color palettes

---

## 📞 **Contact**

**Mani** – Computer Science focused developer  
📧 Email: contact@maniesta.dev  
🔗 GitHub: [your-username](https://github.com/your-username)

---

<div align="center">
  <br>
  <p style="font-size: 1.2rem; font-weight: 600; color: #8b5cf6;">✨ Built with passion and modern technology ✨</p>
  <br>
  <img src="https://img.shields.io/badge/Made_with-❤️-red?style=flat-square" alt="Made with Love" />
  <br><br>
</div>