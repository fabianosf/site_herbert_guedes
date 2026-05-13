# syntax=docker/dockerfile:1.6
# =======================================================================
# Multi-stage build for Herbert Studio
# Stage 1: deps  -> install npm deps with cache
# Stage 2: build -> typecheck + vite build
# Stage 3: dev   -> hot-reload dev server (used by docker-compose dev)
# Stage 4: prod  -> static assets served by hardened nginx
# =======================================================================

ARG NODE_VERSION=20-alpine
ARG NGINX_VERSION=1.27-alpine

# ---------- Stage 1: deps ----------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
ENV CI=true
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- Stage 2: build ----------
FROM node:${NODE_VERSION} AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Stage 3: dev (hot reload) ----------
FROM node:${NODE_VERSION} AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ---------- Stage 4: prod (nginx) ----------
FROM nginx:${NGINX_VERSION} AS prod
RUN apk add --no-cache curl tini \
    && rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Drop privileges: nginx already runs worker as 'nginx' user
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://127.0.0.1:8080/ || exit 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]
