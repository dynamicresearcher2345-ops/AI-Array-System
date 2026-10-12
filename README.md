# AI Array System

An advanced AI data system built for voice-enabled conversations, image search, deep research, and specialized lab workflows.

## Overview

AI Array is designed as a modular AI operating environment with the following primary capabilities:

- Smart chatbot with voice interaction
- Image search and understanding workflows
- Deep research and synthesis engine
- Specialized labs for:
  - Science Lab
  - Stock Lab
  - Research Lab
  - Music Lab
- Structured AI data system with API-driven services

## Architecture

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express + TypeScript
- Data model: typed AI array config and lab modules
- API layer: REST endpoints for chat, research, analysis, stock monitoring, and music generation

## Quick start

1. Install backend dependencies:
   ```bash
   cd backend && npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend && npm install
   ```

3. Start backend:
   ```bash
   cd backend && npm run dev
   ```

4. Start frontend:
   ```bash
   cd frontend && npm run dev -- --host 0.0.0.0
   ```

5. Open the frontend in the browser and connect to the backend at `http://localhost:4000`.

## API endpoints

- `GET /api/health`
- `GET /api/array`
- `POST /api/chat`
- `POST /api/labs/science/search`
- `POST /api/labs/stock/track`
- `POST /api/labs/research/summarize`
- `POST /api/labs/music/create`

## Example environment

Use `.env.example` as a template for local configuration.

## License

MIT