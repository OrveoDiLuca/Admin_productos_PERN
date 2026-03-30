# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

```bash
npm run dev   # Start dev server with hot reload (nodemon + ts-node)
```

No build, test, or lint scripts are configured yet.

## Architecture

Early-stage Node.js + TypeScript REST API project. Currently a skeleton — no web framework, routes, or database layer implemented yet.

- **`src/index.ts`** — entry point
- **`src/server.ts`** — server utilities

**Module system:** ESM (`"type": "module"` in package.json), so imports must use `.js` extensions when referencing local files (ts-node handles the TypeScript resolution).

**TypeScript:** No `tsconfig.json` — relies on ts-node defaults with TypeScript 6.x.
