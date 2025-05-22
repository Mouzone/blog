# Personal Blog

## About This Project
This project is a personal blog focused on [Your Name/Blog's Focus Area]. It features articles on [Topic 1], [Topic 2], and [Topic 3], as well as occasional thoughts and reflections.

## Technology Stack
- **Astro** (^5.5.2): Main framework for building the static site.
- **Svelte** (^7.0.6): Used for state-based interactions and UI components.
- **MDX** (@astrojs/mdx ^4.2.0): For writing content in Markdown with JSX capabilities.
- **Obsidian**: Used as the primary editor for Markdown content.
- **Remark GFM** (^4.0.0): For GitHub Flavored Markdown support.
- **Remark SmartyPants** (^2.0.0): For smart typography.
- **Rehype External Links** (^3.0.0): To automatically add `target="_blank"` to external links.
- **Reading Time** (^1.5.0): To estimate article reading time.

## Usage/Development

### Prerequisites
- Node.js (version X.X.X or later recommended - *User to specify exact version if known, otherwise use this placeholder*)
- npm (comes with Node.js)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
To start the development server:
```bash
npm run dev
```
This will typically start the server on `http://localhost:4321`.

### Building for Production
To build the static site for production:
```bash
npm run build
```
The output files will be generated in the `dist/` directory (standard for Astro).

### Previewing the Production Build
To preview the production build locally:
```bash
npm run preview
```

## Deployment

This project is built as a static site, which can be deployed to various hosting platforms.
After running `npm run build`, the contents of the `dist/` directory are ready for deployment.

Common deployment platforms for Astro projects include:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

For platform-specific instructions, please refer to the Astro documentation on deployment: https://docs.astro.build/en/guides/deploy/

## Todo:
- add searching with tags
- update font

