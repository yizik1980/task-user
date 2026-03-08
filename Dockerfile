# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# bcrypt requires native build tools
RUN apk add --no-cache python3 make g++

# Copy workspace manifests first (layer cache)
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY data-layer/package.json ./data-layer/

# Install all workspace dependencies
RUN npm ci --workspaces --include-workspace-root

# Copy source
COPY data-layer/ ./data-layer/
COPY backend/ ./backend/

# Build data-layer, then backend
RUN npm run build --workspace=data-layer
RUN npm run build --workspace=backend

# ── Stage 2: Production ───────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Copy resolved node_modules (includes native bcrypt binaries built above)
COPY --from=builder /app/node_modules ./node_modules

# Copy built artifacts
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/data-layer/dist ./data-layer/dist
COPY --from=builder /app/data-layer/package.json ./data-layer/package.json
COPY --from=builder /app/package.json ./package.json

WORKDIR /app/backend

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
