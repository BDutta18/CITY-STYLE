# Contributing to CITY-STYLE

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to CITY-STYLE. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document.

## Tech Stack Migration

This project has been migrated from a static HTML/CSS/JS site to a **React** application built with **Vite**.

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS (Global styles in `index.css`, component-specific styles preferred)

## Getting Started

To contribute to this project, you'll need Node.js installed on your machine.

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/<your-username>/CITY-STYLE.git
    cd CITY-STYLE
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## How Can I Contribute?

### Reporting Bugs

- **Use a clear and descriptive title** for the issue.
- **Describe the steps to reproduce the problem** detailedly.
- **Describe what you expected to happen**.
- **Provide screenshots** if it's a visual issue.

### Suggesting Enhancements

- **Use a clear and descriptive title**.
- **Provide a step-by-step description** of the suggested enhancement.
- **Explain why** this enhancement would be useful.

### Pull Requests

1.  Create your branch from `main`:
    ```bash
    git checkout -b feature/amazing-feature
    ```
2.  Add the upstream remote to keep your local repository up-to-date:
    ```bash
    git remote add upstream https://github.com/BDutta18/CITY-STYLE.git
    ```
3.  **Migration Tasks**: If you are helping migrate old pages (from `legacy_source`):
    - Create a new component in `src/pages/`.
    - Add a route in `src/App.jsx`.
    - Ensure styling is correctly applied using `className` instead of `class`.
    - Move any specific assets to `public/assets/` if they aren't there already.
4.  **Linting**: Ensure your code follows the project's styling rules:
    ```bash
    npm run lint
    ```
5.  Push to your fork and submit a Pull Request!

## Development Guidelines

### React Styleguide

- **Functional Components**: Use functional components with Hooks.
- **File Naming**: Use `.jsx` for components containing JSX. PascalCase for component filenames (e.g., `Shop.jsx`).
- **Structure**:
    - `src/pages/`: For full page components.
    - `src/components/`: For reusable UI components (buttons, navbars, etc.).
- **Images**: Reference images from the public folder (e.g., `/assets/image.png`).

### Git Conventions

- Write clear, concise commit messages.

## Community

- Join the discussion on our community channels.
