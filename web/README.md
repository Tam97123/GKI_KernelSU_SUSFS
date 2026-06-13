# Modern GKI Kernel Versions Dashboard

This is the modernized frontend for the GKI (Generic Kernel Image) kernel versions tracking dashboard.

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **SCSS** - Modern CSS with variables and nesting
- **Vanilla JS** - No framework overhead, just clean modular code

## Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🌓 **Advanced Theme System** - Light, Dark, and System preference modes
- 🌍 **Bilingual** - Full English/Chinese support
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Fast** - Optimized bundle with code splitting
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🔍 **Search** - Quick filtering with Ctrl+K shortcut
- 🧩 **Modular Architecture** - Clean separation of concerns

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
web/
├── src/
│   ├── styles/          # SCSS modules
│   ├── main.ts          # Main app entry
│   ├── guide.ts         # Guide page entry
│   ├── types.ts         # TypeScript definitions
│   ├── config.ts        # Configuration constants
│   ├── i18n.ts          # Internationalization
│   ├── theme.ts         # Theme management
│   ├── utils.ts         # Utility functions
│   ├── data-loader.ts   # Data fetching
│   ├── render.ts        # UI rendering
│   ├── modal.ts         # Modal dialogs
│   ├── announcement.ts  # Announcements
│   ├── search.ts        # Search functionality
│   ├── time-converter.ts # Unix timestamp converter
│   ├── toast.ts         # Toast notifications
│   └── back-to-top.ts   # Scroll to top button
├── public/              # Static assets
├── index.html           # Main page
├── guide.html           # Build guide page
├── 404.html             # 404 error page
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── eslint.config.js     # ESLint config
```

## Building for Production

The build process:

1. TypeScript compilation with type checking
2. SCSS compilation and optimization
3. JavaScript bundling and minification
4. Asset optimization and fingerprinting
5. Code splitting for better performance

Build output goes to `dist/` directory, ready for deployment to GitHub Pages.

## Theme System

The app supports three theme modes:

- **Light** - Bright theme for daytime
- **Dark** - Dark theme for nighttime (default)
- **System** - Follows OS preference

Theme preference is persisted in localStorage and syncs with system changes in System mode.

## Data Contract

The app expects JSON data files in `data/` directory with this structure:

```json
{
  "android_version": "android15",
  "kernel_version": "6.6",
  "lts": "6.6.139",
  "entries": [
    {
      "date": "2024-10",
      "kernel": "6.6.50"
    }
  ]
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## License

Same as parent project.
