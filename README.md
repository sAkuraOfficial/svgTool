# SVG Tool 🎨
A modern, web-based SVG manipulation and icon management toolkit built with **React**, **Vite**, **Tailwind CSS**, and **Shadcn UI**.

## Features ✨

- **SVG Workspace**: Upload, edit, and instantly preview custom SVG files in your browser.
- **Icon Library Integration**: Quick-search and one-click add directly from the massive `lucide-react` icon library.
- **Color Manipulation Engine**: Use the built-in color picker or our curated Tailwind CSS color scale dropdown to universally alter active icons seamlessly.
- **Dynamic Visio-Spatial Syncing**: Icons automatically and smoothly scale into the layout space mirroring your active export-size parameters.
- **Save to Directory (Save As)**: Leverage the modern File System Access API to pick a destination folder and push all uniquely styled icons straight into it—bypassing the clutter of your default "Downloads" root.
- **Export As ZIP**: Package your entire workspace with a single click.
- **Export History Tracker**: Locally caches your recent parameter configurations (Size, Background, Target Color) for 1-click redeployment.
- **Responsive Layout**: Designed utilizing declarative Shadcn UI tabs that automatically reconfigure layout grids across wide-screen desktops, tablets, and mobile phones natively.

## Getting Started 🚀

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm or yarn

### Installation
1. Clone the repository
2. Run `npm install` inside the project root folder.
3. Start the Vite dev server with `npm run dev`

## Deployment 🛠️
### GitHub Pages
This project includes a built-in Github Actions Workflow!
Whenever you push to the `main` or `master` branch, the `.github/workflows/deploy.yml` file will automatically compile and deploy the site directly to **GitHub Pages**.

Make sure you go into your GitHub repository settings:
`Settings` -> `Pages` -> Set **Source** dropdown to `GitHub Actions`.

### Docker & GitHub Packages (GHCR)
A separate workflow `.github/workflows/docker-publish.yml` is included to automatically construct a lightweight standalone `NGINX` container showcasing the static app on port **1999**.

**Trigger:** Publish a semver-compliant git tag (e.g., `v1.2.0`).
1. `git tag v1.0.0`
2. `git push origin v1.0.0`
The container will be automatically built and exported into **GitHub Packages** (`ghcr.io/username/svgTool`).

## Technologies Used
- React 18
- Vite
- Tailwind CSS v4
- Shadcn UI (Radix Primitives)
- Lucide React
- react-i18next (Internationalization)
- JSZip (File bundling)
- @tanstack/react-virtual (High performance DOM mapping)
