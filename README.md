# 🧪 Playwright BDD Automation Framework (UI + API)

This is a **modular, scalable**, and **maintainable** automation framework using:

- **Cucumber.js** for BDD
- **Playwright** for UI testing
- **Allure** for advanced reporting
- **TypeScript** for strong typing and cleaner code

---

## 📁 Project Structure

```
playwright-bdd-framework/
├── features/                # Gherkin feature files
│   ├── api/                 # API feature specifications
│   └── ui/                  # UI feature specifications
├── src/
│   ├── api/
│   │   ├── base-api.ts      # Base API client configuration
│   │   └── user-api.ts      # User-related API endpoints
│   ├── pages/
│   │   ├── base.page.ts     # Base page object model
│   │   └── checkout.page.ts # Checkout page interactions
│   ├── step-definitions/
│   │   ├── api/
│   │   │   └── user-api.steps.ts  # API step implementations
│   │   └── ui/
│   │       └── checkout.steps.ts  # UI step implementations
│   ├── hooks.ts             # Cucumber lifecycle hooks
│   └── support/
│       ├── config.ts        # Framework configuration
│       └── world.ts         # Custom World object for context sharing
├── cucumber.js              # Cucumber configuration
├── package.json             # Project dependencies
├── package-lock.json
├── playwright.config.ts     # Playwright configuration
└── tsconfig.json            # TypeScript configuration

```

---

## ✅ Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/) ≥ 20.x

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🚀 NPM Scripts

The following commands are available in `package.json`:

```
"scripts": {
  "test:ui": "cucumber-js features/ui/ --tags \"@ui\"",
    "test:ui:headless": "cross-env HEADLESS=true cucumber-js --tags \"@ui\"",
    "test:api": "cucumber-js features/api/ --tags \"@api\"",
    "test:all": "cucumber-js",
    "test:all:headless": "cross-env HEADLESS=true cucumber-js",
    "open:report": "allure generate allure-results --clean -o allure-report && allure open"
}
```

| Command                     | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `npm run test:ui`           | Run only UI tests tagged with `@ui`               |
| `npm run test:ui:headless`  | Run only UI with headless tests tagged with `@ui` |
| `npm run test:api`          | Run only API tests tagged with `@api`             |
| `npm run test:all`          | Run all tests (UI + API)                          |
| `npm run test:all:headless` | Run only UI headless tests tagged with `@ui`      |
| `npm run open:report`       | Generate and open Allure report                   |

---

## 🏷️ Tagging Feature Files

Add tags at the top of your `.feature` files to organize tests:

```gherkin
@ui
Feature: Checkout functionality
```

```gherkin
@api
Feature: User login API
```

---

## 📊 Allure Reports

To view a beautiful test report:

```bash
npm run open:report
```

---
## 🔍 Viewing Allure Report from Pipeline Artifacts

After downloading the report artifact from your CI/CD pipeline:

1. Unzip the downloaded artifact folder
2. Open terminal in the unzipped report directory
3. Run these commands:
```bash
npm install -g http-server  # Install HTTP server globally
http-server -p 8000        # Start server on port 8000
```
Open your browser at:
👉 http://localhost:8000

---

## ✅ Best Practices Followed

- 🔄 **Modular Design** – UI and API layers separated
- 🧱 **Page Object Model** for UI
- 🧪 **Reusable Hooks** for setup/teardown
- 📜 **Custom World** context sharing between steps
- 🔐 **Environment Config** centralized in `support/config.ts`
- 🔍 **Robust Error Handling & Logging**
- ✨ **SOLID & DRY principles** followed throughout

---
