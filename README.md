# Pohlim Monorepo

A monorepo setup with Angular client and Express backend.

## Project Structure

```
pohlim-test/
├── client/          # Angular application
│   ├── src/
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
├── backend/         # Express.js server
│   ├── src/
│   │   └── index.ts
│   ├── tsconfig.json
│   ├── .env
│   └── package.json
└── package.json     # Root monorepo config
```

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies for all workspaces:
```bash
npm install
```

### Running the Project

#### Option 1: Run both client and backend separately

Run the backend in one terminal:
```bash
npm run backend:dev
```

Run the client in another terminal:
```bash
npm run client:start
```

#### Option 2: Run individual workspaces

**Backend:**
```bash
npm start --workspace=backend   # Production mode
npm run dev --workspace=backend # Development mode
```

**Client:**
```bash
npm start --workspace=client
```

## Development

The backend server runs on `http://localhost:3000`
The client application runs on `http://localhost:4200`

### Backend API Routes

- `GET /api/health` - Health check
- `GET /api/data` - Fetch sample data

### Features

- Full TypeScript support for both client and backend
- CORS enabled for client-backend communication
- Hot reload for development (backend with ts-node-dev, client with Angular CLI)
- Monorepo structure with shared workspaces

## Building for Production

### Build Backend
```bash
npm run backend:build
node dist/index.js
```

### Build Client
```bash
npm run client:build
# Output will be in client/dist/client
```

## Environment Variables

Create a `.env` file in the backend directory:
```
PORT=3000
NODE_ENV=development
```

## Scripts

### Root Level
- `npm run dev` - Run dev mode for all workspaces
- `npm run build` - Build all workspaces
- `npm run client:start` - Start Angular dev server
- `npm run client:build` - Build Angular for production
- `npm run backend:start` - Start Express server (production)
- `npm run backend:dev` - Start Express in dev mode

## License

ISC
