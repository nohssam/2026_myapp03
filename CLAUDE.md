# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Start development server (port 3000)
npm test         # Run tests in watch mode
npm run build    # Production build
```

To run a single test file:
```bash
npm test -- --testPathPattern=App.test
```

Linting runs automatically via `react-scripts` (ESLint with `react-app` preset). No separate lint command.

## Architecture

This is a React 19 SPA frontend that connects to a Spring Boot backend at `http://localhost:8080`.

**Tech stack:** React 19, React Router v7, Zustand 5, Axios

**API base URL** is configured via environment variables:
- `.env.development`: `REACT_APP_API_BASE_URL=http://localhost:8080`
- `.env.production`: update with production server IP

## Code Organization

### `src/api/`
- `Http.jsx` — Axios instance configured with `baseURL` from env and `withCredentials: true`
- `Auth.jsx` — Auth API calls (`register`, `login`, `logout`) plus Axios request/response interceptors

**JWT auth flow:** Login response returns `{accessToken, refreshToken, membersVO}`, stored in localStorage under key `tokens`. The request interceptor in `Auth.jsx` reads from localStorage and injects `Authorization: Bearer <token>` for all requests except whitelisted paths.

### `src/store/`
Three Zustand stores:
- `useAuthStore.jsx` — `user`, `isLoggedIn` state; `zu_login()`, `zu_logout()` actions (no persistence)
- `useTodoStore.jsx` — Todo CRUD, persisted to localStorage key `todo-storage`
- `useMemoStroe.jsx` — Memo CRUD, persisted to localStorage key `memo-storage` (note: filename has typo "Stroe")

### `src/pages/`
Route-level components. `/todo`, `/memo`, and `/profile` routes are login-protected (checked inside each component, not via a router guard).

### `src/index.css`
Contains the global dark-theme styles and utility classes used throughout (`.row`, `.col`, `.card`, `.muted`, `.empty`).

## Known Issues / Incomplete Areas

- Session restoration on page reload is not implemented — the `useEffect` in `App.js` is empty
- Token refresh logic in the Axios response interceptor in `Auth.jsx` is incomplete
