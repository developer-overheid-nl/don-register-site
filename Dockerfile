# syntax=docker/dockerfile:1

# ---- Build Astro static site ----
FROM node:lts AS build

WORKDIR /opt/astro

# Install corepack and pnpm
RUN npm install -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@latest --activate

# Copy monorepo files for proper workspace install
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/api-register/package.json ./apps/api-register/
COPY packages/components/package.json ./packages/components/
COPY packages/layouts/package.json ./packages/layouts/
# Voeg extra packages toe indien nodig

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the project (for build)
COPY . .

# Build static output (alleen deze app)
RUN pnpm --filter @developer-overheid-nl/api-register build

# ---- Serve with Caddy ----
FROM caddy:2.9.1-alpine AS caddy

# Copy jouw Caddyfile (verwacht in project root!)
COPY Caddyfile /etc/caddy/Caddyfile

# Copy Astro static output naar /srv (let op: juiste dist map!)
COPY --from=build /opt/astro/apps/api-register/dist /srv

EXPOSE 4321

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
