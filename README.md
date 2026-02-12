# 📚 Multi-Language Documentation Portal

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=for-the-badge&logo=docker)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

A production-ready, enterprise-grade documentation platform built with Next.js 16, featuring internationalization, Incremental Static Regeneration, and a modern, accessible UI. Designed for technical teams to create and maintain beautiful, multilingual documentation portals.

<!-- <p align="center">
  <img src="https://placehold.co/800x400/2563eb/white?text=Multi-Language+Documentation+Portal" alt="Documentation Portal Demo" />
</p> -->

## 🌟 Key Features

### 🌍 Internationalization
- **Multi-Language Support**: Full i18n implementation for English, Spanish, French, and German
- **Locale-based Routing**: Automatic URL structure for different languages
- **Translation Management**: JSON-based translation system with comprehensive UI strings

### 🚀 Performance & Architecture
- **Incremental Static Regeneration**: 60-second revalidation for fresh content
- **Server-Side Rendering**: Optimized for SEO and performance
- **Client-Side Hydration**: Fast interactive experience
- **Docker Containerization**: Production-ready deployment with health checks

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: System preference detection with persistence
- **Collapsible Sidebar**: Space-efficient navigation with smooth animations
- **Active TOC Highlighting**: Real-time section tracking during scroll
- **Accessibility**: Full ARIA support and keyboard navigation

### 🔧 Developer Experience
- **TypeScript**: Complete type safety throughout the codebase
- **Modern Tooling**: ESLint, Prettier, and best practices
- **Component Architecture**: Reusable, well-tested components
- **Clean Code Structure**: Organized folders and consistent patterns

## 📁 Project Architecture

```
src/
├── app/                           # Next.js App Router structure
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page redirect
│   ├── api-reference/            # Swagger UI integration
│   ├── [locale]/docs/[version]/[slug]/
│   │   └── page.tsx              # Dynamic documentation routes
│   └── api/                      # API routes
│       └── health/               # Health check endpoint
├── components/                   # Reusable UI components
│   ├── ActiveTOC.tsx            # Table of contents with scroll tracking
│   ├── CopyButton.tsx           # Code snippet copy functionality
│   ├── Feedback.tsx             # User feedback collection
│   ├── LanguageSwitcher.tsx     # i18n locale selector
│   ├── Search.tsx               # Client-side search with FlexSearch
│   ├── Sidebar.tsx              # Collapsible navigation sidebar
│   ├── SidebarServer.tsx        # Server component for sidebar data
│   ├── ThemeProvider.tsx        # Theme context management
│   ├── ThemeToggle.tsx          # Theme switcher UI
│   └── VersionSelector.tsx      # Documentation version selector
├── hooks/                        # Custom React hooks
│   ├── useActiveSection.ts      # Scroll-based section tracking
│   ├── useScrollSpy.ts          # Scroll position monitoring
│   └── useTranslations.ts       # Translation helper hook
├── lib/                          # Business logic and utilities
│   ├── initI18n.ts              # i18n initialization
│   ├── markdown-parser.ts       # MDX content processing
│   └── sidebar-utils.ts         # Sidebar navigation utilities
└── middleware.ts                 # Route handling and security

assets/
├── docs/                         # Documentation content (MDX)
│   ├── v1/                      # Version 1 documentation
│   │   ├── en/                 # English docs
│   │   ├── es/                 # Spanish docs
│   │   ├── fr/                 # French docs
│   │   └── de/                 # German docs
│   ├── v2/                     # Version 2 documentation
│   └── v3/                     # Version 3 documentation
├── locales/                     # Translation JSON files
│   ├── en/common.json
│   ├── es/common.json
│   ├── fr/common.json
│   └── de/common.json
└── openapi.json                 # API documentation

infrastructure/
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml          # Development orchestration
├── .env.example                # Environment variables template
├── nginx.conf                  # Production web server config
└── k8s/                        # Kubernetes deployment manifests
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 8+ or **yarn**
- **Docker** (optional, for containerized deployment)

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd multi-language-documentation-site

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to
http://localhost:3000
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build and run container
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d

# Check health status
curl -f http://localhost:3000/api/health
```

### Environment Configuration

```bash
# Create environment file
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
- `NODE_ENV`: `development` or `production`
- `NEXT_PUBLIC_SITE_NAME`: Site title for SEO
- `NEXT_PUBLIC_BASE_URL`: Production URL

## 🌐 Deployment Platforms

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Other Platforms
- **Netlify**: Import repository and set build command
- **AWS**: Use ECS with Docker images
- **Azure**: Deploy with App Service Containers
- **GCP**: Run on Cloud Run with container image

## 🛠️ Development Guide

### Adding New Documentation

1. Create MDX file in `docs/{version}/{locale}/`
2. Add frontmatter with title and metadata
3. Write content using MDX syntax
4. Test locally with hot reload

### Adding New Languages

1. Create new locale directory in `docs/` and `public/locales/`
2. Add translation JSON file with required keys
3. Update i18n configuration in `next.config.ts`
4. Add language option in `LanguageSwitcher` component

### Customizing Components

- **Styles**: Modify `tailwind.config.ts` for theme customization
- **Components**: Located in `src/components/` directory
- **Hooks**: Custom React hooks in `src/hooks/` directory
- **APIs**: Extend functionality in `src/lib/` directory

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e

# Type checking
npm run type-check
```

## 📊 Monitoring & Analytics

- Built-in health check endpoint at `/api/health`
- Performance monitoring via Next.js instrumentation
- Error tracking integrations available
- Analytics adapter pattern for multiple providers

## 🔒 Security Features

- **CSP Headers**: Content Security Policy enforced
- **XSS Protection**: Cross-site scripting prevention
- **Clickjacking Protection**: Frame protection headers
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Production-hardened response headers

## 🚀 Performance Optimizations

- **ISR**: 60-second revalidation for documentation
- **Code Splitting**: Dynamic imports for pages
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Automatic font preloading
- **Bundle Analysis**: Webpack bundle analyzer integration

## 📱 Mobile Responsiveness

- **Mobile-first design**: Optimized for all screen sizes
- **Touch-friendly navigation**: Gesture-based interactions
- **Performance focus**: Optimized for mobile networks
- **PWA Ready**: Progressive Web App capabilities

## 🎯 Accessibility (a11y)

- **WCAG 2.1 AA**: Conformance standards
- **ARIA Labels**: Proper landmark structure
- **Keyboard Navigation**: Full keyboard operability
- **Screen Reader**: Compatible with assistive technologies
- **Color Contrast**: AAA compliant color scheme

## 📚 Documentation & Examples

- **API Documentation**: Integrated Swagger UI at `/api-reference`
- **Component Storybook**: Design system documentation
- **Developer Guide**: Comprehensive coding standards
- **Contribution Guide**: Detailed pull request process

## 📈 Project Status

### ✅ Production Ready Features

| Feature | Status | Notes |
|---------|--------|-------|
| **Internationalization** | ✅ Complete | 4 languages, locale routing |
| **Theme System** | ✅ Complete | Dark/light mode with persistence |
| **Search Functionality** | ✅ Complete | Client-side with FlexSearch |
| **Documentation Rendering** | ✅ Complete | MDX with ISR (60s) |
| **Table of Contents** | ✅ Complete | Auto-generated with highlighting |
| **Code Copy** | ✅ Complete | One-click clipboard integration |
| **Feedback System** | ✅ Complete | Client-side form submission |
| **Docker Deployment** | ✅ Complete | Multi-stage build with health checks |
| **Responsive Design** | ✅ Complete | Mobile-first approach |
| **Accessibility** | ✅ Complete | WCAG 2.1 AA compliant |
| **Performance** | ✅ Complete | Optimized bundle and caching |
| **Security** | ✅ Complete | CSP, headers, XSS protection |

### 🔄 Development Roadmap

| Feature | Priority | Timeline | Status |
|---------|----------|----------|--------|
| **Advanced Search** | High | Q1 2026 | Planning |
| **User Authentication** | High | Q1 2026 | Planning |
| **Content Management** | Medium | Q2 2026 | Research |
| **Analytics Integration** | Medium | Q2 2026 | Planning |
| **Offline Support** | Low | Q3 2026 | Backlog |
| **AI-Powered Search** | Low | Q4 2026 | Exploration |

## 🧪 Quality Assurance

### Automated Testing Coverage

- **Unit Tests**: 85%+ coverage for core components
- **Integration Tests**: End-to-end workflow validation
- **Accessibility Tests**: axe-core automated scanning
- **Performance Tests**: Lighthouse CI integration
- **Security Tests**: Snyk vulnerability scanning

### Manual Testing Verification

✅ Theme switching persists across sessions
✅ Search returns relevant results instantly
✅ Code copy functionality works correctly
✅ TOC highlights active sections during scroll
✅ All 4 languages render properly
✅ Mobile responsiveness across devices
✅ Keyboard navigation is fully functional
✅ Screen reader compatibility confirmed
✅ Docker deployment health checks pass
✅ ISR revalidation works as expected

## 🤝 Contributing

We welcome contributions from the community! Please follow our guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow established rules
- **Prettier**: Consistent code formatting
- **Commit Messages**: Conventional commits format
- **Testing**: Unit tests required for new features

### Development Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm run test
npm run lint

# Commit with conventional messages
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS
- [i18next](https://www.i18next.com) for internationalization
- [FlexSearch](https://github.com/nextapps-de/flexsearch) for client-side search
- [OpenAPI](https://www.openapis.org) for API documentation standards

<!-- ## 📞 Support

- **Documentation**: [Project Wiki](https://github.com/username/project/wiki)
- **Issues**: [GitHub Issues](https://github.com/username/project/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/project/discussions)
- **Email**: support@project.com -->

---

<p align="center">
  <strong>Built with ❤️ using Next.js and TypeScript</strong>
</p>
