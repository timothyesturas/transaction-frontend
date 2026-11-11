# Transaction Frontend

An Angular web application for viewing and adding financial transactions. It displays summary counts (total, settled, pending, failed), a transactions table, and an "Add Transaction" form. Data comes from the [Transaction Backend](../transaction-backend/README.md).

- **App URL:** `http://localhost:4200`
- **Stack:** Angular 21, TypeScript 5.9, Bootstrap 5.3, RxJS, Vitest

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Installation](#2-installation)
3. [Configuration](#3-configuration)
4. [Running the Application](#4-running-the-application)
5. [Using the Application](#5-using-the-application)
6. [API Documentation](#6-api-documentation)
7. [Testing](#7-testing)
8. [Troubleshooting](#8-troubleshooting)
9. [Project Structure](#9-project-structure)

---

## 1. Prerequisites

| Software | Version | Purpose | Verify with |
|---|---|---|---|
| Git | Any recent version | Clone the repository | `git --version` |
| Node.js | **20.19+**, 22.12+, or 24+ (required by Angular 21) | JavaScript runtime | `node --version` |
| npm | 10+ (project pins 11.12.1; bundled with recent Node) | Package manager | `npm --version` |
| Transaction Backend | Running on port 8081 | Provides the data | See the [backend README](../transaction-backend/README.md) |
| Web browser | Current Chrome, Edge, Firefox, or Safari | Open the app | |

The Angular CLI is installed locally with `npm install`; no global install is needed (use `npx ng ...`).

---

## 2. Installation

1. **Clone the repository** (replace the URL with your own):

   ```bash
   git clone <FRONTEND_REPOSITORY_URL>
   cd transaction-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

## 3. Configuration

There are no environment variables or `.env` files. The one setting you may need to change is the backend URL.

| Setting | Location | Default |
|---|---|---|
| Backend API URL | `src/app/services/transaction.ts` (`apiUrl`) | `http://localhost:8081/transactions` |
| Dev server port | `--port` flag on `ng serve` | `4200` |

**Pointing at a different backend:** edit `apiUrl` in `src/app/services/transaction.ts`:

```ts
private readonly apiUrl = 'http://localhost:8081/transactions';
```

**Ports and CORS:** the backend only allows requests from `http://localhost:4200` and `http://localhost:4201`. If you run the frontend on another port, also update the backend's `@CrossOrigin` list.

Other config files: `angular.json` (build and serve settings, Bootstrap stylesheet), `tsconfig*.json` (TypeScript), `.prettierrc` and `.editorconfig` (formatting).

---

## 4. Running the Application

Run **both** parts, each in its own terminal. Start the backend first.

**Terminal 1: Backend**

```bash
cd transaction-backend
mvn spring-boot:run
```

Backend runs at `http://localhost:8081`.

**Terminal 2: Frontend**

```bash
cd transaction-frontend
npm start
```

(`npx ng serve` does the same thing.) Wait for Angular to finish compiling, then open **http://localhost:4200**.

**Use a different port** (4201 is also allowed by the backend):

```bash
npx ng serve --port 4201
```

**Stop:** press `CTRL + C` in each terminal.

**Production build** (output goes to `dist/`):

```bash
npm run build
```

---

## 5. Using the Application

- **View transactions:** the page loads all transactions into a table, with summary cards for total, settled, pending, and failed counts.
- **Add a transaction:** click **Add Transaction**, fill in the form, and save.

  | Field | Rules |
  |---|---|
  | Transaction Date | Required; defaults to today |
  | Account Number | Required |
  | Account Holder Name | Required |
  | Amount | Required; minimum `0.01` |

  The status is not entered by the user. The backend assigns `Pending`, `Settled`, or `Failed` at random. After saving, a success message appears and the table refreshes.
- **Errors:** if the backend is unreachable, the page shows "Unable to retrieve transactions" with a **Try Again** button. A failed save shows an error in the form.

---

## 6. API Documentation

The frontend uses two backend endpoints (full details in the [backend README](../transaction-backend/README.md)).

### `GET http://localhost:8081/transactions`

Returns all transactions.

```json
[
  {
    "transactionDate": "2025-03-01",
    "accountNumber": "7289-3445-1121",
    "accountHolderName": "Maria Johnson",
    "amount": 150,
    "status": "Settled"
  }
]
```

### `POST http://localhost:8081/transactions`

Creates a transaction. Returns `201 Created` with the saved record, including the server-assigned `status`.

**Request body** (sent by the form):

```json
{
  "transactionDate": "2025-03-11",
  "accountNumber": "1111-2222-3333",
  "accountHolderName": "Test User",
  "amount": 42.5
}
```

**Response:**

```json
{
  "transactionDate": "2025-03-11",
  "accountNumber": "1111-2222-3333",
  "accountHolderName": "Test User",
  "amount": 42.5,
  "status": "Pending"
}
```

### TypeScript models (`src/app/models/transaction.ts`)

```ts
export interface Transaction {
  transactionDate: string;
  accountNumber: string;
  accountHolderName: string;
  amount: number;
  status: 'Pending' | 'Settled' | 'Failed';
}

export type TransactionRequest = Omit<Transaction, 'status'>;
```

---

## 7. Testing

### Automated tests

```bash
npm test
```

This runs the unit tests with Angular's test runner and Vitest.

> **Known issue:** the tests that came with the project scaffold are out of date and will fail until updated:
> - `src/app/app.spec.ts` expects the text "Hello, transaction-frontend", which the app no longer renders.
> - `src/app/services/transaction.spec.ts` imports a class named `Transaction` from `./transaction`; the service is actually `TransactionService`.
> - `src/app/pages/transactions/transactions.spec.ts` needs `provideHttpClient()` (or a mocked `TransactionService`) in its test setup.

### Manual end-to-end testing

1. Start the backend and frontend (see [Running the Application](#4-running-the-application)) and open `http://localhost:4200`.
2. **Load:** confirm the table shows the records from the backend's `data/transactions.csv` and the summary counts match.
3. **Validation:** click **Add Transaction**, clear a required field, and confirm the form will not submit and shows a required message. Try an amount of `0` and confirm it is rejected.
4. **Add:** enter valid values and save. Confirm the success message appears, fades after a few seconds, and the new row appears in the table with a status.
5. **Persistence:** refresh the browser. The new transaction should still be listed. Check the bottom of `data/transactions.csv` in the backend to see the new row.
6. **Error handling:** stop the backend and refresh the page. Confirm the error message and **Try Again** button appear. Restart the backend and click **Try Again**; the data should load.

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| `ng: command not found` | Use `npx ng serve` or `npm start` instead of `ng serve`. |
| Angular or Node version errors during install or build | Upgrade Node.js to 20.19+, 22.12+, or 24+. |
| "Unable to retrieve transactions" | Make sure the backend is running on port 8081 and `apiUrl` matches. |
| CORS error in the browser console | Open the app on `localhost:4200` or `localhost:4201`, not another port or host. |
| `Port 4200 is already in use` | Run `npx ng serve --port 4201`. |
| Backend `GET` returns 500 | See the backend README's troubleshooting section (usually blank rows in the CSV). |

---

## 9. Project Structure

```
transaction-frontend/
├── angular.json
├── package.json
├── public/                                   # Static assets (favicon)
└── src/
    ├── index.html, main.ts, styles.css
    └── app/
        ├── app.ts, app.html, app.config.ts, app.routes.ts
        ├── models/transaction.ts             # Transaction types
        ├── services/transaction.ts           # HTTP calls to the backend
        └── pages/transactions/               # Main page (table, summary cards, add form)
```
