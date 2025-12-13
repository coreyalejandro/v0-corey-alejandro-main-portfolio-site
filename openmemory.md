# OpenMemory Guide — coreys-agentic-portfolio

## Overview
- **App**: Next.js App Router portfolio/design-system playground with demos + docs.
- **UI stack**: React + TypeScript, Tailwind CSS v4 (`app/globals.css` uses `@import "tailwindcss";`), shadcn/ui-style primitives in `components/ui/`.
- **Key experiences**: “Creative Chaos” visual system, animation + color theme contexts, and an audio experience layer.

## Architecture
- **Routing**: `app/` (Next.js App Router).
  - **Home route**: `app/(home)/page.tsx` (client orchestrator for sections + resume template).
  - **Global layout**: `app/layout.tsx` wraps the app with providers and renders `FloatingNav`.
- **Global providers** (root layout):
  - `ColorThemeProvider` (`contexts/ColorThemeContext.tsx`)
  - `AnimationProvider` (`contexts/AnimationContext.tsx`)
  - `AudioEngineProvider` (`components/audio-experience/audio-engine.tsx`)
- **Styling**:
  - `app/globals.css` defines CSS variables + Tailwind layer usage and some bespoke demo styles (e.g., “card path”).
  - `postcss.config.mjs` configures Tailwind via `@tailwindcss/postcss`.
- **Server/API** (Next.js route handlers in `app/api/`):
  - `app/api/contact/route.ts`: contact form POST with sanitization + rate limiting.
  - `app/api/playground/chat/route.ts`: LLM chat endpoint (uses `ai` SDK `generateText`).
  - `app/api/playground/projects/route.ts`: in-memory CRUD store for playground projects (resets on deploy).
- **Security**:
  - `middleware.ts` sets CSP + security headers and applies to non-API routes.

## Components (high-signal)
- **Audio Experience**
  - `components/audio-experience/audio-engine.tsx`: provider + audio API surface
  - `components/audio-experience/audio-toggle.tsx`, `audio-section.tsx`, `audio-button.tsx`: UI + narration hooks
- **Navigation**
  - `components/floating-nav.tsx`: global navigation rendered in `app/layout.tsx`
- **Demos / Experiments**
  - `app/playground/page.tsx`: experiment hub
  - `app/*-demo/page.tsx`: specific effect demos (card path, scroll card, table card, etc.)

## Patterns & Conventions
- **App Router + mixed client/server**: pages that need hooks/interactivity are marked `'use client'` (e.g., `app/(home)/page.tsx`).
- **Utilities live in `lib/`**: e.g., `lib/sanitize.ts`, `lib/rate-limiter.ts`.
- **Config/data in `config/`**: e.g., `config/projects.ts` powers portfolio content.

## User Defined Namespaces
- [Leave blank - user populates]

