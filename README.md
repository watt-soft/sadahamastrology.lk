# Sadaham Astrology - Bill Generator 🌙

This is a single-page, mobile-first web application built for generating printable astrology service bills. It is designed to be fast, easy to use on a phone, and prints receipts directly from the browser.

---

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Variables for theming)
- **Icons**: Lucide React
- **Hosting**: GitHub Pages

---

## 🛠️ Local Setup & Development

1. **Prerequisites**: Make sure you have Node.js installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   _The app will be available at `http://localhost:5173/`._

---

## 📂 Project Structure Overview

```text
sadahamastrology.lk/
├── src/
│   ├── components/         # React Components
│   │   ├── BillForm.tsx    # The form where you pick options and enter the name
│   │   ├── BillPreview.tsx # The printable receipt template
│   │   └── InstituteHeader.tsx # Header showing the institute name and details
│   ├── data/               # Hardcoded data (Edit these to change options!)
│   │   ├── instituteInfo.ts
│   │   └── serviceOptions.ts
│   ├── styles/
│   │   └── print.css       # CSS specific for paper printing (hides buttons, sets margins)
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces for our data
│   ├── App.tsx             # Main container, handles state and Dark/Light theme toggling
│   ├── index.css           # Global styles, Light/Dark mode CSS variables,UI
│   └── main.tsx            # React mounting point
├── vite.config.ts          # Vite configuration (important for GitHub Pages base path)
└── package.json            # Scripts and dependencies
```

---

## 📝 How to Modify Data (No coding required)

If the institute wants to change their prices, add a new service, or update their phone number, you **do not** need to edit the UI components.

### 1. Update Institute Details

Open `src/data/instituteInfo.ts`:

```typescript
export const instituteInfo: InstituteInfo = {
  name: "ආයතනයේ නම",
  address: "ලිපිනය, නගරය",
  phone: "+94 7X XXX XXXX",
};
```

### 2. Update Service Options & Prices

Open `src/data/serviceOptions.ts`:

```typescript
export const serviceOptions: ServiceOption[] = [
  { id: "opt-1", label: "කේන්දර පරීක්ෂාව", advance: 500, balance: 1000 },
  // Add or edit objects here. The form will automatically render them!
];
```

---

## 🎨 Styling & Theming Notes

- **UI**: The app uses a custom "Celestial/Astrology" theme with a star-field background, glassmorphism, and gold shimmer buttons.
- **Dark/Light Mode**: Controlled in `src/App.tsx` and `src/index.css`.
  - We save the user's preference to `localStorage`.
  - The CSS uses `[data-theme='dark']` applied to the `<html>` root to switch CSS variables (colors).
- **Print Styles**:
  - When the user presses `Ctrl+P` (or the Print button), `@media print` rules take over.
  - Anything with the `.no-print` class (like the toggle button or the 'Generate' button) is hidden.
  - The bill is optimized for **A6** sized paper. Check `src/styles/print.css`.

---

## 🌍 Deployment (GitHub Pages)

This project is configured to be deployed automatically to GitHub Pages using the `npm run deploy` script (via `gh-pages` package) or via GitHub Actions.

### Important: Vite Base Path

If the project folder/repository name changes, you **must** update the `base` property in `vite.config.ts`.

- If deploying to a sub-path (e.g., `https://username.github.io/sadahamastrology.lk/`), use:
  ```typescript
  base: "/sadahamastrology.lk/";
  ```
- If deploying to a **custom domain** (e.g., `https://www.sadahamastrology.lk`), use:
  ```typescript
  base: "/";
  ```

To manually deploy:

```bash
npm run deploy
```

_(This builds the app to the `/dist` folder and pushes it to the `gh-pages` branch)._

---

## 🤝 Handover Notes for the Next Intern

- **Adding new features**: The app uses standard React state (`view` toggles between `'form'` and `'preview'`). If you need to add multiple pages later, consider adding `react-router-dom`.
- **Translations**: The UI text (Sinhala) is currently hardcoded in the components (`BillForm.tsx`, `BillPreview.tsx`). If English support is requested, you should extract these strings into a translation dictionary or use `react-i18next`.
- **Styling Changes**: Try to stick to editing the CSS variables (`--color-primary`, `--color-accent`) at the top of `index.css` before modifying complex layout rules.
