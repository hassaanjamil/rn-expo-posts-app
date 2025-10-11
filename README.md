# Clean Expo Posts App

Modern Expo project that consumes the [Posts Rest API respository](https://github.com/hassaanjamil/node-posts-rest-api), showcases Clean Architecture on React Native, and provides a production-ready navigation, data, and presentation stack. The expo app includes a lightweight auth gate, file-based navigation, and post detail views with user metadata and theme. Clone it, run it, and ⭐️ star it if it inspires your next app!

> For this app, please have a look at my open source [Posts Rest API respository](https://github.com/hassaanjamil/node-posts-rest-api):
Configure it, by following the instructions and run the local server to make this app works for you, and check if you are running your server using the same port number (3000) or different.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Navigation Flows](#navigation-flows)
- [Testing](#testing)
- [Utilities](#utilities)

## Features

- Login screen with persistent authentication using AsyncStorage.
- Expo Router stack + tab navigation:
  - Home tab lists posts and allows deep navigation to post details.
  - Favorite and Settings tabs show modular feature screens.
  - Settings screen supports logout; profile screen opens from header action.
- Post detail view combines post content, author details, and comment data fetched via cached repositories.
- Clean architecture boundaries with domain use cases, repository interfaces, and data sources (remote + local cache).
- Theming-ready presentation layer with shared UI primitives (themed text, view, button, loader, error state).

## Tech Stack

- **Framework:** Expo (React Native) with TypeScript
- **State & Data:** Custom Clean Architecture with data sources, repository implementations, and domain use cases
- **Networking:** Axios via configurable API service
- **Storage:** AsyncStorage for auth persistence and local caches
- **Navigation:** File-based Expo Router (stack + tabs)
- **Internationalization:** i18next (pre-wired in `src/main/localization`)
- **Tooling:** ESLint, TypeScript strict mode

## Architecture

```
src
├── domain        // Business entities, repository contracts, use cases
├── data          // DTOs, mappers, remote/local data sources, repository impls
├── presentation  // Feature-first UI: screens, hooks, components, styles
├── main          // App wiring: dependency container, auth context, constants, shared hooks
└── app           // File-based Expo Router entry points import component from presentation/features (auth stack, tabs, modals)
```
## Tech Stack
- Expo 53.0.23, React 19.0.0, React Native 0.79.5
- Typescript 5.8.3, VS Code 1.104.3
- Node.js: 22.18.0
- Expo Router 5.1.7
- Expo Localization 16.1.6
- i18n 25.2.1
- Expo Font 13.3.2

## Key principles
- **Domain layer** exposes pure business logic through use cases (`GetPostsUseCase`, `GetPostUseCase`, `GetUserUseCase`, `GetCommentUseCase`).
- **Data layer** handles infrastructure concerns (API service, cache), maps raw DTOs to domain-safe entities and vice versa and repository implementations.
- **Presentation layer** stays framework-centric (React components, hooks) and only depends on domain interfaces via `useCases`.
- **Main layer** keeps shared components like auth Context, hooks, constants and most importantly dependencies to wire app the application layers.

## Project Structure

```
src/
  app/                 Expo Router route files (auth, tabs, post detail, profile)
  main/
    auth/              Auth context with AsyncStorage persistence
    constants/         BASE_URL resolution, storage keys
    dependencies.ts    IoC: wires data sources, repositories, and use cases
  domain/
    entity/               Shared DTO contracts
    repository/        Repository interfaces
    usecase/           Domain use cases (exported via index.ts)
  data/
    source/            remote (API) + local (in-memory) data sources
    repository/        Repository implementations
    mapper/            DTO-to-entity mapping helpers
    dto/            Data entities mirroring API contracts
  presentation/
    components/        Shared themed UI primitives
    features/
      auth/            Auth screen + styles
      posts/           Home list components/hooks/styles
      postDetail/      Detail screen, hooks, styles
      favorite/        Placeholder feature
      settings/        Settings screen with logout
      profile/         Profile placeholder
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env` file (example below) to define platform-specific base URLs.

3. **Run the app**

   ```bash
   npx expo start
   ```

   Use the Expo CLI prompts to launch on iOS simulator, Android emulator, or Expo Go.

4. **First-time login**

   - Launch app → Auth screen.
   - Tap **Login** to persist a session (stored under `auth:isLoggedIn`).
   - Tabs become available; logout resides in the Settings tab.

## Available Scripts

| Script                | Description                                      |
| --------------------- | ------------------------------------------------ |
| `npm start`           | Starts Expo development server                   |
| `npm run android`     | Builds and launches the native Android app       |
| `npm run ios`         | Builds and launches the native iOS app           |
| `npm run web`         | Starts Expo in web mode                          |
| `npm run lint`        | Runs Expo's lint command                         |

## Environment Variables

`.env` (root):

```
ENV=DEV
API_URL_IOS=http://127.0.0.1:3000
API_URL_ANDROID=http://10.0.2.2:3000
```

- `API_URL_IOS`: loopback address for iOS simulator.
- `API_URL_ANDROID`: `10.0.2.2` points to host machine when using Android emulator.
- For Android physical devices, the app automatically rewrites the host using Expo's debugger info so your device can hit the same API without manual changes.

## Navigation Flows

- `/auth` → Provided by Expo Router; renders the login screen.
- `/ (tabs)` → Tab navigator with:
  - `Home` (`/(tabs)/index.tsx`) → Post list.
  - `Favorite` (`/(tabs)/favorite.tsx`) → Placeholder screen.
  - `Settings` (`/(tabs)/settings.tsx`) → Logout button.
- `/post-detail` → Full-screen view with top back button to return to tabs.
- `/profile` → Accessible via header profile icon in tabs.

Route guarding occurs in `src/app/_layout.tsx` using the auth context.

## Testing

- **TypeScript:** `npm run lint` or `npx tsc --noEmit` (ensure DTO/entity types align, especially around `userMapper` definitions).
- **Manual:** Launch the Expo app and walk through auth → tabs → post detail to validate networking and navigation.

## Utilities

- `transformData.js`: helper script at repository root; run with `node transformData.js` to view transformation output.

---

Happy hacking! Feel free to adapt the architecture or add new features—Clean Architecture boundaries make extending the app straightforward. Additions typically involve:
1. Defining DTO/entity types.
2. Implementing repository interfaces.
3. Creating a use case.
4. Wiring the use case in `dependencies.ts`.
5. Consuming via presentation hooks/screens.
6. ⭐️ **Star the repo** to support continued development.
7. Share it with fellow Mobile developers exploring modern toolchains.
