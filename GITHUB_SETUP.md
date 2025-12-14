# GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `zenfinity-battery-dashboard` (or your preferred name)
   - **Description**: "Battery Analytics Dashboard for Zenfinity Energy - Frontend Intern Assignment"
   - **Visibility**: Select **Public** (required for assignment)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see setup instructions. Use these commands:

```bash
# Make sure you're in the dashboard directory
cd dashboard

# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. The README.md should display on the repository homepage

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo create zenfinity-battery-dashboard --public --source=. --remote=origin --push
```

## Repository Structure

Your repository should contain:
- ✅ Source code in `src/` directory
- ✅ `README.md` with project description and setup instructions
- ✅ `SETUP.md` with detailed setup guide
- ✅ `package.json` with all dependencies
- ✅ `.gitignore` to exclude node_modules and build files
- ✅ Configuration files (vite.config.ts, tsconfig.json)

## What's Excluded (via .gitignore)

- `node_modules/` - Dependencies (install with `npm install`)
- `dist/` - Build output (generated with `npm run build`)
- Editor files (.vscode, .idea, etc.)
- Log files

## Next Steps After Pushing

1. **Add a description** to your GitHub repository
2. **Add topics/tags** like: `react`, `typescript`, `vite`, `battery-analytics`, `dashboard`
3. **Create a release** if needed
4. **Deploy to Vercel/Netlify** for live demo

## Making Changes

After making changes to your code:

```bash
git add .
git commit -m "Description of your changes"
git push
```

