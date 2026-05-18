# stardew-guide

A Next.js 15 + TypeScript + Tailwind CSS static MVP for a beginner-friendly Stardew Valley guide.

## Project Directory

The official app lives in:

```text
stardew-guide
```

The older root-level prototype is not the active project.

## Data Directory

Canonical game data lives in:

```text
stardew-guide/data/stardew
```

All page data should flow through `lib/stardew/data.ts`. Pages should not import JSON files directly.

## Local Development

From the repository root:

```powershell
cd .\stardew-guide
npm install
npm run dev
```

## Build And Static Export

```powershell
cd .\stardew-guide
npm.cmd run build
```

The project uses `output: "export"` in `next.config.ts`, so `npm run build` generates a static site in:

```text
stardew-guide/out
```

## Cloudflare Pages

Recommended Cloudflare Pages settings:

```text
Root directory: stardew-guide
Build command: npm run build
Output directory: out
```

The `data/stardew` directory must be committed inside `stardew-guide` so static pages can be generated during build.

## File Boundaries

- Engineer 1: `app/**`, `components/**`, `lib/**`, `next.config.ts`
- Engineer 2: `data/stardew/**`, `data/stardew/sources.md`

Coordinate schema changes before editing pages or data in parallel.
