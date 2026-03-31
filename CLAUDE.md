# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

```bash
npm run dev   # Start dev server with hot reload (nodemon + ts-node)
```

No build, test, or lint scripts are configured yet.

## Architecture

Administrador de productos construido con el stack PERN (PostgreSQL, Express, React, Node.js) usando TypeScript. Early-stage REST API project.

- **`src/index.ts`** — entry point
- **`src/server.ts`** — server utilities

**Module system:** ESM (`"type": "module"` in package.json), so imports must use `.js` extensions when referencing local files (ts-node handles the TypeScript resolution).

**TypeScript:** No `tsconfig.json` — relies on ts-node defaults with TypeScript 6.x.
