# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/)

## Getting Started
1. Clone repository ```git clone https://github.com/vgorodkov/nodejs2024Q1-service```
2. Cd to cloned repository and checkout to correct branch. ```git checkout task-2```
3. Install dependencies. ```npm install```
4. Create .env file based on .env.example
5. Run application using ```npm run start:docker```

## Swagger Docs
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Vulnerabilities scanning
``npm run scan``

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
