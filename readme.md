# Mandatory2

A full-stack project with a Svelte frontend and an Express backend.

## Setup

1. First install the depedencies for both frontend and backend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Make sure your environment variables are set... Frontend: (VITE_BASE_URL), Backend: (SESSION_SECRET)..

## Start the project

Run the backend first:

```bash
cd backend
node app.js
```

## Build

To create a production build for the frontend:

```bash
cd frontend
npm run build
```

## OR you can be even smarter, and use npm run start from the backend directory..

The frontend uses the images in the `public` folder, and the backend serves the API routes.
