# PRISM Dupe Finder - Full-Stack Edition

A luxury-inspired beauty dupe finder built with a Node.js/Express backend and a React/Vite frontend.

## Project Structure
- `/app`: Frontend React application (Vite, TypeScript, Tailwind CSS)
- `/server`: Backend Express server (Node.js, SQLite3, Express)

## Getting Started

### 1. Set up the Backend
```bash
cd server
npm install
npm run seed  # Seed the SQLite database with initial product data
npm start     # Starts server on http://localhost:5000
```

### 3. Quick Start with Docker (Recommended)
```bash
docker-compose up --build
```
This will start both the frontend (on port 80) and the backend (on port 5000) automatically, with all networking pre-configured.

## Features
- **Smart Search**: Real-time product search powered by a high-performance backend.
- **Dynamic Categories**: Skincare, Haircare, and Bodycare pages with 100% live data.
- **Dupe Discovery**: AI-inspired matching logic with similarity scores and savings analysis.
- **Ingredient Transparency**: Dynamic ingredient checker with scientific summaries and benefits.
- **Order Tracking**: Persistent order management with real-time status updates and Order IDs.
- **Contact System**: Fully functional contact form with backend persistence.
- **Dark Mode**: Luxury "Lunar Pink" theme integrated across all dynamic components.

## Tech Stack
- **Frontend**: React, TypeScript, Framer Motion, Lucide, Tailwind CSS
- **Backend**: Node.js, Express.js, SQLite3, CORS, UUID, Dotenv
- **Deployment**: Docker, Docker Compose, Nginx (Production Config)

## Initial Data
The project includes a robust sample dataset of **170+ beauty products**, complete with ingredients, benefits, and price points, migrated from the original static version to the new SQLite architecture.
