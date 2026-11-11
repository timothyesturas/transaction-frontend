TRANSACTION MANAGEMENT SYSTEM – FRONTEND

A web-based transaction management application built with Angular. It
provides an interface for creating, viewing, and monitoring financial
transactions through a responsive and user-friendly dashboard.

TECHNOLOGY STACK

-   Angular
-   TypeScript
-   HTML5
-   CSS3
-   Bootstrap

PREREQUISITES

Before setting up the project, make sure the following tools are
installed:

-   Git: https://git-scm.com/
-   Node.js and npm: https://nodejs.org/
-   Angular CLI: https://angular.dev/tools/cli

Verify your installations by opening a terminal and executing:

    git --version
    node --version
    npm --version

Install Angular CLI globally if it is not yet installed:

    npm install -g @angular/cli

Verify the Angular CLI installation:

    ng version

INSTALLATION AND SETUP

STEP 1. CLONE THE REPOSITORY

Open a terminal and execute:

    git clone <FRONTEND_REPOSITORY_URL>

Navigate into the cloned project directory:

    cd transaction-frontend

STEP 2. INSTALL DEPENDENCIES

Install the required project dependencies using npm:

    npm install

This command downloads and installs the packages specified in
package.json.

STEP 3. CONFIGURE THE APPLICATION

Check the application’s environment configuration or API service
configuration.

Make sure the API base URL is set to the appropriate backend address.

For example:

    http://localhost:8080

Replace this example with the actual API URL configured for your
environment.

STEP 4. RUN THE DEVELOPMENT SERVER

Start the Angular development server:

    ng serve

Wait until the application finishes compiling successfully.

STEP 5. ACCESS THE APPLICATION

Open your browser and navigate to:

    http://localhost:4200

The Transaction Management System frontend should now be accessible.

AVAILABLE COMMANDS

npm install Install project dependencies.

ng serve Start the development server.

ng build Build the application for production.

ng test Execute unit tests.

TROUBLESHOOTING

Angular CLI is not recognized

Install Angular CLI globally:

    npm install -g @angular/cli

Dependencies are missing

Run the following command inside the project directory:

    npm install

Application cannot connect to the API

-   Verify the configured API base URL.
-   Check that the API endpoint is accessible.
-   Verify the browser’s network console for request errors.

Port 4200 is already in use

Run Angular on another port:

    ng serve --port 4201

Then access the application at:

    http://localhost:4201

LICENSE

This project is available for educational and portfolio purposes.
