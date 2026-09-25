# M324 Exercises

This repository contains the setup and exercises for module M324.

## Docker setup

Start the container:

```bash
docker compose up -d --build
```

Open a shell inside the container:

```bash
docker compose exec node bash
```

Check the versions inside the container:

```bash
node -v
npm -v
```

The project uses `node:22-slim`. Depending on the current Node 22 image patch level, npm may be npm 10 or newer.

All npm commands for the exercise should be run inside the Docker container.

## Exercise1

Install dependencies inside the container:

```bash
cd Exercise1
npm install
```

Run the app:

```bash
npm run start
```

Expected output:

```text
Hello, World!
```

Check available package updates with a cooldown window:

```bash
npm run check-updates
```

Update package versions after the cooldown check:

```bash
npm run update-packages
npm install
```

Demonstrate npx:

```bash
npm run npx-demo
```

## npm vs npx

`npm` is the Node package manager. It installs packages, updates dependencies, and runs scripts from `package.json`, for example `npm install` or `npm run start`.

`npx` executes a package binary. It first looks for the binary in the local project dependencies. If the binary is not installed locally and a package is requested explicitly, it can download and run it. In this project, `npm run npx-demo` uses `npx` to run the locally installed `npm-check-updates` binary.
