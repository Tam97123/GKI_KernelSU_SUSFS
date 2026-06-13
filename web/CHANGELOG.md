# Web Frontend Modernization Changelog

## [2.0.0] - 2026-06-12

### 🎉 Major Rewrite

Complete modernization of the GKI Kernel Versions dashboard frontend.

### ✨ Added

- **TypeScript** - Full type safety with TypeScript 5.7
- **Vite** - Modern build tool replacing Webpack
- **System Theme Mode** - Auto-follow OS dark/light preference
- **404 Page** - Custom-designed error page
- **ESLint + Prettier** - Code quality and formatting tools
- **Deployment Script** - Automated build and deploy workflow
- **Comprehensive Documentation** - README and modernization summary

### 🔄 Changed

- Migrated from Webpack to Vite build system
- Converted all JavaScript to TypeScript
- Reorganized code into `src/` directory with modular architecture
- Enhanced theme system (Light → Dark → System cycle)
- Improved animations and transitions throughout
- Better mobile responsiveness
- Enhanced accessibility with ARIA labels
- Optimized bundle sizes with code splitting

### 🐛 Fixed

- Theme preference now persists correctly across sessions
- Search functionality more responsive with debouncing
- Better error handling for failed data loads
- Modal dialogs properly handle keyboard events
- Improved focus management throughout the app

### 🚀 Performance

- **Build size**: 164KB total (with data)
- **Main JS**: 6.28 KB gzipped
- **Main CSS**: 4.30 KB gzipped
- **Build time**: ~1.5 seconds
- Code splitting for better caching

### 🎨 Design

- Modern card-based UI with smooth hover effects
- Improved typography and spacing
- Better color contrast ratios
- Professional shadows and borders
- Consistent design tokens via CSS custom properties

### 📦 Dependencies

**New:**
- vite: ^6.0.5
- typescript: ^5.7.2
- sass: ^1.97.3
- eslint: ^9.17.0
- prettier: ^3.4.2
- @typescript-eslint: ^8.18.1
- globals: ^15.14.0
- clsx: ^2.1.1

**Removed:**
- webpack: ^5
- webpack-cli: ^6
- css-loader: ^7.1.4
- sass-loader: ^16.0.7
- mini-css-extract-plugin: ^2.10.0

### 📝 Files

**Added:**
- `src/` directory with 15 TypeScript modules
- `src/styles/` directory with 18 SCSS modules
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `eslint.config.js` - ESLint rules
- `.prettierrc` - Prettier formatting
- `404.html` - Custom 404 page
- `deploy.sh` - Deployment script
- `README.md` - Documentation
- `.gitignore` - Git ignore rules

**Removed:**
- `js/` directory (moved to `src/`)
- `scss/` directory (moved to `src/styles/`)
- `webpack.config.js`
- Old build artifacts

**Modified:**
- `index.html` - Updated for Vite
- `guide.html` - Updated for Vite
- `package.json` - New scripts and dependencies
- `package-lock.json` - Updated lock file

### ⚠️ Breaking Changes

**None** - The frontend maintains full backward compatibility with:
- Existing data JSON structure
- GitHub Pages deployment
- All user-facing functionality
- Bilingual support (EN/ZH)

### 🔧 Migration

To use the new frontend:

```bash
cd web
npm install
npm run build
./deploy.sh
```

For development:
```bash
npm run dev
```

### 📊 Statistics

- **Total Lines**: ~3,157 (1,299 TS + 1,858 SCSS)
- **Files**: 33 source files
- **Build Output**: 6 files + data
- **Zero Linting Errors**: ✓
- **Type Safety**: 100%

### 🎯 Future Enhancements

Potential improvements for future versions:
- Unit tests with Vitest
- E2E tests with Playwright
- PWA support for offline usage
- Performance monitoring
- Analytics integration
