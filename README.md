# Smart Drafting Room

Digital Twin-based Facility Management prototype for two university drafting rooms.

The MVP is a presentation-ready front-end application built with Next.js, TypeScript, React, and Tailwind CSS. It uses mock data only, so it can be deployed publicly without a database. Future API keys should be added through environment variables rather than hard-coded in the app.

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open the local URL printed by Next.js in your browser.

## Production Build

Run:

```bash
pnpm build
```

Then, for a local production preview:

```bash
pnpm start
```

The build uses Next.js with webpack mode for stable production compilation.

## Vercel Deployment

1. Push this project to a Git repository.
2. Import the repository in Vercel.
3. Use the detected framework preset: `Next.js`.
4. Confirm these commands:
   - Install Command: `pnpm install --frozen-lockfile=false`
   - Build Command: `pnpm build`
5. Add environment variables in Vercel Project Settings if future services are connected:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy.

The current prototype does not require any runtime secrets or machine-specific resources. All routes are handled by Next.js and are ready for public access on desktop, tablet, and mobile browsers.
