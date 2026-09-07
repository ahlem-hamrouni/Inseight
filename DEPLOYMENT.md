# Deployment Guide

This repository contains a Node/Express backend (`Inseight/`) and a Vite React frontend (`inseight-frontent/`). Quick steps to deploy:

- Backend (Render):
  - Push this repo to GitHub.
  - In Render, create a new Web Service, connect the repo and point the root to the `Inseight/` folder (or use monorepo settings).
  - Build command: `npm install` (or leave default). Start command: `npm start`.
  - Add environment variables (e.g. `MONGODB_URI`, `JWT_SECRET`, any third-party keys) in Render dashboard.
  - Optional: use `render.yaml` (present in repo) for IaC deployment.

- Frontend (Vercel):
  - Create a new project on Vercel and point it at the repo.
  - Set the Project Root to `inseight-frontent` when importing.
  - Vercel will use `npm run build` (from `inseight-frontent/package.json`) and publish the `dist` folder.
  - Set any environment variables needed by the frontend (e.g. `VITE_API_BASE_URL`) in the Vercel project settings.

Notes and tips:
- `Inseight/server.js` listens on `process.env.PORT` already and a `Procfile` is included for Render.
- Ensure `uploads/` is writable and persisted if you need user-uploaded files; consider using S3 or a managed storage service for production.
- Configure CORS origin to allow your frontend URL in production.
