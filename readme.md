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

2. Make sure your environment variables are set... Frontend: (VITE_BASE_URL), Backend: (SESSION_SECRET, testUsername, testPassword, testEmail and PORT) 


3. After this you 

## Start the project

First you need to build the frontend:

```bash
cd frontend
npm run build
```

After this, you run the backend

```bash
cd ../backend
node app.js
```


## But wait.. There's a better way??


```bash
cd backend
npm start
```
This runs the custom script inside the package.json, which first builds the frontend and starts the backend afterwards...

The frontend uses the images in the `public` folder, and the backend serves the API routes.
