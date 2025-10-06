# 🚀 Deployment Guide - Mol_Art Portfolio

## Overview

This guide documents the **working deployment process** for deploying the Mol_Art pottery portfolio to GitHub Pages. The site is live at:

**🌐 [https://nice-and-precise.github.io/mol-art-portfolio/](https://nice-and-precise.github.io/mol-art-portfolio/)**

---

## Critical Deployment Issues & Fixes

### Issue #1: URL Concatenation Bug

**Problem**: Links were missing slashes between base URL and paths.

```astro
❌ BROKEN:
href={`${import.meta.env.BASE_URL}gallery/${piece.slug}`}
// Result: /mol-art-portfoliogallery/piece-01 (missing slash!)

✅ FIXED:
href={`${import.meta.env.BASE_URL}/gallery/${piece.slug}`}
// Result: /mol-art-portfolio/gallery/piece-01
```

**Root Cause**: `import.meta.env.BASE_URL` is `/mol-art-portfolio` without a trailing slash.

**Files Fixed**:
- `src/pages/index.astro:24` - Homepage gallery card links
- `src/pages/gallery/[slug].astro:38` - Breadcrumb "Back to Gallery" link

---

### Issue #2: Theme Toggle Not Working

**Problem**: Dark mode toggle button had no effect in production.

**Root Cause**: Theme functions weren't exposed to the window object in the production build.

**Fix**: Changed theme script to use `is:inline` directive in `src/layouts/BaseLayout.astro`:

```astro
<!-- Theme script -->
<script is:inline>
  window.getTheme = function() {
    if (typeof localStorage === 'undefined') return 'light';
    return localStorage.getItem('pottery-theme') || 'light';
  };

  window.setTheme = function(theme) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('pottery-theme', theme);
    }
    document.documentElement.setAttribute('data-theme', theme);
  };

  window.toggleTheme = function() {
    const current = window.getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    window.setTheme(next);
  };

  // Apply theme immediately on load to prevent FOUC
  window.setTheme(window.getTheme());
</script>
```

---

### Issue #3: gh-pages NPM Tool Failure

**Problem**: The `gh-pages` npm package deployed files incorrectly:
- Created a `dist/` subfolder on the gh-pages branch instead of deploying dist **contents** to root
- Mixed source files with built files
- Resulted in wrong asset paths: `dist/_astro/gallery.css` instead of `_astro/gallery.css`

**Attempted Fixes (All Failed)**:
```bash
❌ gh-pages -d dist --add       # Still created dist/ subfolder
❌ gh-pages -d dist -f          # Still broken
❌ git subtree push             # Deleted branch entirely
```

**Working Solution**: Manual git deployment from dist folder.

---

### Issue #4: Jekyll Processing

**Problem**: GitHub Pages uses Jekyll by default, which ignores folders starting with `_` (like `_astro/`).

**Fix**: Added `.nojekyll` file to prevent Jekyll processing.

**Location**: `public/.nojekyll` (gets copied to `dist/.nojekyll` during build)

---

## ✅ Working Deployment Process

### Step 1: Build for Production

```bash
cd C:\Users\Owner\Desktop\mol-art-portfolio
npm run build
```

This creates the `dist/` folder with all static files.

---

### Step 2: Ensure .nojekyll Exists

The `.nojekyll` file should already be in `public/` and will be copied to `dist/` during build.

Verify it exists:

```bash
# Windows
if exist dist\.nojekyll (echo .nojekyll exists) else (echo WARNING: .nojekyll missing!)

# Unix/Mac/Git Bash
ls dist/.nojekyll
```

If missing, create it:

```bash
# Windows
type nul > dist\.nojekyll

# Unix/Mac/Git Bash
touch dist/.nojekyll
```

---

### Step 3: Deploy to gh-pages Branch

**Manual deployment** (gh-pages npm tool is broken):

```bash
cd dist
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f https://github.com/nice-and-precise/mol-art-portfolio.git HEAD:gh-pages
cd ..
```

**What this does**:
1. Initializes a new git repo inside `dist/`
2. Adds all built files
3. Commits with deployment message
4. Force-pushes to the `gh-pages` branch on GitHub
5. Returns to project root

---

### Step 4: Configure GitHub Pages Settings

1. Go to your repository on GitHub: [https://github.com/nice-and-precise/mol-art-portfolio](https://github.com/nice-and-precise/mol-art-portfolio)
2. Navigate to **Settings** → **Pages**
3. Configure:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**

GitHub will deploy within 1-2 minutes.

---

### Step 5: Verify Deployment

Visit the live site: [https://nice-and-precise.github.io/mol-art-portfolio/](https://nice-and-precise.github.io/mol-art-portfolio/)

**Checklist**:
- ✅ Homepage loads with pottery images
- ✅ Dark mode toggle works (top-right button)
- ✅ Gallery card links navigate to detail pages
- ✅ Detail page "Back to Gallery" breadcrumb works
- ✅ Browser console shows no 404 errors
- ✅ CSS and JS files load correctly

---

## 🔄 Redeployment (After Making Changes)

When you make changes and want to redeploy:

```bash
# 1. Build
npm run build

# 2. Deploy to gh-pages
cd dist
git init
git add -A
git commit -m "Deploy: Updated [describe changes]"
git push -f https://github.com/nice-and-precise/mol-art-portfolio.git HEAD:gh-pages
cd ..
```

GitHub Pages will automatically rebuild within 1-2 minutes.

---

## 🚫 DO NOT Use

**DO NOT** use the `npm run deploy` command (defined in `package.json`):

```json
// ❌ BROKEN - Do not use!
"deploy": "npm run build && gh-pages -d dist"
```

**Why**: The `gh-pages` npm package has a critical bug that deploys files to a `dist/` subdirectory on the gh-pages branch instead of deploying the **contents** of dist to the root. This causes all asset paths to break.

**Status**: This command should be removed or updated in `package.json` to use the manual deployment method.

---

## 📋 Deployment Checklist

Before deploying:

- [ ] All tests passing (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Preview build locally (`npm run preview`)
- [ ] `.nojekyll` file exists in `public/`
- [ ] All URL concatenations include explicit `/` slash
- [ ] Theme toggle uses `is:inline` directive
- [ ] No console errors in local preview

After deploying:

- [ ] Site loads at GitHub Pages URL
- [ ] Homepage displays correctly
- [ ] Navigation works (gallery cards → detail pages)
- [ ] Breadcrumb "Back to Gallery" works
- [ ] Dark mode toggle functional
- [ ] No 404 errors in browser console
- [ ] CSS and JS files load

---

## 🛠️ Troubleshooting

### CSS/JS Files Show 404

**Symptom**: Browser console shows 404 for files like `_astro/gallery.css`

**Causes**:
1. Missing `.nojekyll` file (Jekyll is processing and hiding `_astro/`)
2. Files deployed to `dist/` subdirectory instead of root

**Fix**:
1. Ensure `.nojekyll` exists in `public/` folder
2. Rebuild and redeploy using manual deployment method
3. Verify gh-pages branch has files at root, not in `dist/` subfolder

---

### Navigation Links Return 404

**Symptom**: Clicking gallery cards or breadcrumbs returns 404

**Cause**: Missing slash in URL concatenation

**Fix**: Check that all links use explicit `/`:

```astro
✅ Correct:
href={`${import.meta.env.BASE_URL}/gallery/${piece.slug}`}

❌ Wrong:
href={`${import.meta.env.BASE_URL}gallery/${piece.slug}`}
```

**Files to check**:
- `src/pages/index.astro` (gallery card links)
- `src/pages/gallery/[slug].astro` (breadcrumb links)

---

### Dark Mode Not Working

**Symptom**: Theme toggle button doesn't change theme

**Cause**: Theme functions not exposed to window object

**Fix**: Ensure theme script in `src/layouts/BaseLayout.astro` uses `is:inline`:

```astro
<script is:inline>
  window.getTheme = function() { /* ... */ };
  window.setTheme = function(theme) { /* ... */ };
  window.toggleTheme = function() { /* ... */ };
</script>
```

---

### Site Deploys but Shows Old Version

**Symptom**: Changes aren't visible on live site

**Causes**:
1. Browser cache
2. GitHub Pages hasn't rebuilt yet

**Fix**:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait 1-2 minutes for GitHub Pages to rebuild
3. Check GitHub Actions tab for build status

---

## 🎯 Key Learnings

1. **BASE_URL has no trailing slash** - Always add `/` explicitly when concatenating paths
2. **gh-pages npm tool is broken** - Use manual git deployment instead
3. **Jekyll processing must be disabled** - Always include `.nojekyll` file
4. **Theme scripts need `is:inline`** - Required for window object exposure in production
5. **Deploy from dist root, not dist folder** - Files must be at gh-pages root, not in subdirectory

---

## 📚 Additional Resources

- **Project Status**: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- **Repository**: [https://github.com/nice-and-precise/mol-art-portfolio](https://github.com/nice-and-precise/mol-art-portfolio)
- **Live Site**: [https://nice-and-precise.github.io/mol-art-portfolio/](https://nice-and-precise.github.io/mol-art-portfolio/)
- **GitHub Pages Docs**: [https://docs.github.com/en/pages](https://docs.github.com/en/pages)
- **Astro Deployment Guide**: [https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/)

---

**Last Updated**: 2025-10-05
**Status**: ✅ Production deployment working and verified
**Deployment Method**: Manual git deployment from dist folder
