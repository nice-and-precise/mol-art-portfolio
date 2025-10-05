# Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git configured

## Initial Setup

```bash
# Clone or navigate to project
cd mol-art-portfolio

# Install dependencies
npm install

# Copy environment template
cp .env.template .env

# Add your Anthropic API key to .env
ANTHROPIC_API_KEY=your_key_here
```

## Development

```bash
# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
```

## Troubleshooting

### Port already in use
If port 4321 is in use:
```bash
# Kill process on port 4321
npx kill-port 4321
```

### Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
# Check for content validation errors
npm run type-check
```
