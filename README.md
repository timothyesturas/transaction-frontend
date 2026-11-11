# Transaction Management System - Frontend

Follow these instructions to download, install, and run the frontend application on your computer.

## 1. Install the Required Tools

Before cloning the project, install the following:

### Git
1. Open https://git-scm.com/downloads.
2. Download Git for your operating system.
3. Run the installer and follow the installation instructions.

### Node.js and npm
1. Open https://nodejs.org/.
2. Download and install a Node.js version compatible with this project's Angular version.
3. npm is included with the Node.js installation.

### Verify the Installations

Open a terminal (Command Prompt, PowerShell, or Git Bash) and run these commands one at a time:

```bash
git --version
node --version
npm --version
```

Each command should display an installed version. If a command is not recognized, install the corresponding tool and reopen the terminal.

## 2. Clone the Frontend Repository

1. Open a terminal.
2. Go to the folder where you want to keep the project. For example:

```bash
cd C:\Angular
```

3. Clone the repository. Replace the placeholder with the actual Git repository URL:

```bash
git clone <FRONTEND_REPOSITORY_URL>
```

4. Enter the project folder:

```bash
cd transaction-frontend
```

## 3. Install Project Dependencies

Make sure the terminal is inside the `transaction-frontend` folder. Run:

```bash
npm install
```

This downloads the packages required by the project. Wait until the command finishes.

## 4. Start the Frontend Application

In the same terminal and project folder, run:

```bash
npx ng serve
```

Wait for Angular to finish compiling. Keep this terminal open while using the application.

## 5. Open the Application

Open a web browser and visit:

```text
http://localhost:4200
```

The frontend application should now appear in your browser.

## 6. Stop the Application

1. Return to the terminal where the application is running.
2. Press `CTRL + C`.
3. If prompted to terminate the process, enter `Y` and press Enter.

The development server will stop.

## 7. Run the Application Again

After the initial setup, you do not need to clone the repository or run `npm install` again unless the project dependencies change.

To start the application another time:

1. Open a terminal.
2. Navigate to the project folder:

```bash
cd C:\Angular\transaction-frontend
```

3. Start the development server:

```bash
npx ng serve
```

4. Open http://localhost:4200 in your browser.

## Optional: Use a Different Port

If port `4200` is already being used, start the application on port `4201`:

```bash
npx ng serve --port 4201
```

Then open:

```text
http://localhost:4201
```
