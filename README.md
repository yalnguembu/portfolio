# Yal Nguembu Portfolio - nguembu.cloud

A premium, lightweight freelance portfolio built with pure HTML5, CSS3, and vanilla JavaScript. Zero dependencies, fully responsive, PWA-ready, and bilingual (EN/FR).

## Project Structure

```
src/
├── index.html              # Homepage with all sections
├── projects.html           # Projects listing page
├── project-detail.html     # Single project template
├── offline.html            # Offline fallback page
├── style.css              # Main CSS entry point
├── manifest.webmanifest   # PWA manifest
├── sw.js                  # Service Worker
├── favicon.svg            # Site favicon
├── styles/
│   ├── reset.css          # CSS reset
│   ├── variables.css      # Design tokens & CSS variables
│   ├── themes.css         # Light/dark theme overrides
│   ├── global.css         # Global typography & layout
│   ├── components.css     # Reusable component styles
│   ├── animations.css     # Keyframes & animations
│   ├── responsive.css     # Mobile-first media queries
│   └── accessibility.css  # Accessibility utilities
├── js/
│   ├── main.js            # Page initialization & reveal animations
│   ├── theme.js           # Light/dark/system theme management
│   ├── i18n.js            # Bilingual (FR/EN) support
│   ├── projects.js        # Project data & rendering
│   └── pwa.js             # PWA & Service Worker registration
└── images/
    ├── project-1.jpg      # Project images
    ├── project-2.jpg
    ├── project-3.jpg
    ├── project-4.jpg
    └── project-5.jpg
```

## Features

- **Pure HTML/CSS/JS** - No external UI libraries or frameworks
- **Vite Bundler** - Fast development and optimized production builds
- **Light/Dark/System Theme** - CSS variables with localStorage persistence
- **Bilingual Support** - FR/EN using data attributes
- **Responsive Design** - Mobile-first approach with 7 breakpoints
- **PWA Capabilities** - Service Worker, manifest, offline support
- **Animations** - CSS-based reveal animations with Intersection Observer
- **Accessibility** - WCAG 2.1 AA compliant with skip links and ARIA
- **SVG Icons** - 8 animated service icons with CSS hover effects
- **SEO Optimized** - Meta tags, canonical URLs, semantic HTML

## Getting Started

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

4. Preview production build:

```bash
pnpm preview
```

## Design System

### Colors (CSS Variables)

- **Primary**: #fbbf24 (Gold/Yellow)
- **Accent**: #10b981 (Green)
- **Neutral**: Blue-based palette (light to dark)
- **Light Theme**: Light backgrounds with dark text
- **Dark Theme**: Dark backgrounds with light text

### Typography

- **Display Font**: Syne (bold, characteristic)
- **Body Font**: DM Sans (readable, modern)
- **Responsive Sizing**: Uses `clamp()` for fluid typography

### Spacing Scale

- `--space-xs`: 0.5rem
- `--space-sm`: 1rem
- `--space-md`: 1.5rem
- `--space-lg`: 2rem
- `--space-xl`: 3rem
- `--space-2xl`: 4rem
- `--space-3xl`: 6rem

### Breakpoints (Mobile-First)

- xs: 0px (default)
- sm: 375px
- md: 640px
- lg: 768px
- xl: 1024px
- 2xl: 1280px
- 3xl: 1536px

## Key Files

### theme.js

Manages light/dark/system theme switching with:

- localStorage persistence
- System preference detection
- Smooth transitions without FOUC
- Theme toggle functionality

### i18n.js

Bilingual support with:

- FR/EN translation via data attributes
- localStorage language persistence
- Dynamic content updates
- Language toggle buttons

### projects.js

Project data and rendering with:

- 5 sample projects with full details
- Featured projects filtering
- Dynamic project grid rendering
- Project detail pages with navigation

### main.js

Page initialization with:

- Reveal animations via Intersection Observer
- Mobile hamburger menu
- Navigation effects
- Skip link management

### pwa.js

Progressive Web App features with:

- Service Worker registration
- Online/offline detection
- Cache management
- Offline fallback handling

## Customization

### Adding Projects

Edit `src/js/projects.js` and add to the `PROJECTS` array:

```javascript
{
  id: 6,
  slug: 'your-project-slug',
  title: 'Your Project Title',
  category: 'Category',
  year: 2026,
  description: 'Long description...',
  shortDescription: 'Short description',
  problem: 'Problem statement',
  solution: 'Solution provided',
  image: '/images/project-6.jpg',
  imageAlt: 'Alt text for image',
  stack: ['Tech 1', 'Tech 2'],
  impact: 'Impact statement',
  testimonial: 'Client testimonial',
  testimonialAuthor: 'Name',
  testimonialRole: 'Role',
  featured: true,
  color: '#fbbf24'
}
```

### Changing Colors

Edit `src/styles/variables.css`:

```css
:root {
  --color-primary: #your-color;
  --color-accent: #your-accent;
  /* etc. */
}
```

### Modifying Typography

Edit `src/styles/global.css` to adjust font sizes, weights, and line heights.

### Adding Languages

Edit `src/js/i18n.js` to add support for additional languages beyond FR/EN.

## Performance

- **No external dependencies** - Zero npm packages required
- **Minimal CSS** - ~1.5KB gzipped
- **Minimal JS** - ~3KB gzipped
- **Fast animations** - GPU-accelerated CSS transforms
- **Image optimization** - Use responsive images or WebP
- **Service Worker** - Offline caching and stale-while-revalidate

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Reduced motion support
- Focus visible indicators
- Skip links for navigation

## Deployment

### Vercel

```bash
vercel deploy
```

### Netlify

Connect your GitHub repo and deploy automatically.

### Traditional Hosting

Build with `pnpm build` and deploy the `dist/` folder.

## License

© 2026 Yal Nguembu. All rights reserved.
