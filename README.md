# SaaS Admin Dashboard

A production-ready, modern admin dashboard built with React, TypeScript, Material-UI, and Echarts. This project showcases best practices in frontend development, including state management, responsive design, data visualization, and performance optimization.

## 🚀 Features

### Core Functionality
- **Dashboard Page**: Interactive widgets with draggable/resizable layouts, multiple chart types (line, bar, doughnut), and animated metrics
- **Users & Roles Management**: Full-featured data grid with sorting, filtering, pagination, and inline editing
- **Analytics Page**: Comprehensive analytics with multiple chart visualizations and AI insights panel
- **Activity/Audit Log**: Timeline-based activity tracking with filtering capabilities
- **Settings Page**: Tabbed interface for general settings, notifications, integrations, and preferences

### UI/UX Features
- **Dark/Light Mode**: Seamless theme switching with persistent storage
- **Customizable Themes**: Switch between primary colors (blue, green, purple, orange) and typography scales
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Skeleton Loaders**: Smooth loading states for better UX
- **Toast Notifications**: User-friendly feedback for all actions
- **Micro-interactions**: Smooth animations using Framer Motion

### Technical Features
- **State Management**: Zustand for global state with persistence
- **Routing**: React Router v6+ with lazy loading for optimal performance
- **Data Visualization**: Echarts integration for beautiful, interactive charts
- **Type Safety**: Full TypeScript implementation
- **Code Quality**: ESLint + Prettier for consistent code style
- **Performance**: Memoization, lazy loading, and optimized re-renders

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Webpack 5
- **UI Library**: Material-UI (MUI) v7
- **State Management**: Zustand
- **Routing**: React Router v7
- **Charts**: D3.js (responsive charts)
- **Animations**: Framer Motion
- **Code Quality**: ESLint + Prettier

## 📦 Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── MetricCard.tsx
│   ├── ChartCard.tsx
│   ├── SkeletonLoader.tsx
│   └── NotificationSnackbar.tsx
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── Analytics.tsx
│   ├── ActivityLog.tsx
│   └── Settings.tsx
├── layouts/         # Layout components
│   └── MainLayout.tsx
├── store/           # Zustand stores
│   ├── themeStore.ts
│   ├── sidebarStore.ts
│   ├── filterStore.ts
│   └── widgetStore.ts
├── hooks/           # Custom React hooks
│   ├── useThemeMode.ts
│   ├── useUserFilters.ts
│   └── useChartData.ts
├── theme/           # Theme configuration
│   └── theme.ts
├── utils/           # Utility functions
│   ├── formatNumber.ts
│   └── notifications.ts
└── data/            # Mock data
    └── mockData.ts
```

## 🎨 Customization

### Changing Theme Colors

Edit `src/theme/theme.ts` to modify the color palettes:

```typescript
const colorPalettes: Record<PrimaryColor, { main: string; light: string; dark: string }> = {
  blue: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
  // Add your custom colors
};
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add navigation item in `src/components/Sidebar.tsx`

## 🚀 Deployment

The project is ready for deployment to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Configure in `webpack.config.js`

## 📝 Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Best Practices Implemented

- ✅ Component reusability and composition
- ✅ Type-safe state management
- ✅ Performance optimization (memoization, lazy loading)
- ✅ Responsive design patterns
- ✅ Accessibility considerations
- ✅ Clean code architecture
- ✅ Error boundaries (ready for implementation)
- ✅ Loading states and error handling

## 📄 License

MIT

## 👤 Author

Built as a portfolio project showcasing modern React development practices.
