# syntax=docker/dockerfile:1

# ---- Base image with Node.js and pnpm ----
FROM node:lts AS base
ENV FORCE_COLOR=0

RUN npm install -g corepack@latest && \
    corepack enable && \
    corepack prepare pnpm@latest --activate

WORKDIR /opt/astro

# ---- Dependencies cache stage ----
FROM base AS deps

WORKDIR /opt/astro

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY apps/api-register/package.json ./apps/api-register/
COPY packages/components/package.json ./packages/components/
COPY packages/layouts/package.json ./packages/layouts/

# Kopieer evt. meer subpackage package.json als je die hebt

RUN pnpm install --frozen-lockfile

# ---- Build app ----
FROM base AS build

WORKDIR /opt/astro

COPY . .
COPY --from=deps /opt/astro/node_modules ./node_modules
COPY --from=deps /opt/astro/apps/api-register/node_modules ./apps/api-register/node_modules
COPY --from=deps /opt/astro/packages/components/node_modules ./packages/components/node_modules
COPY --from=deps /opt/astro/packages/layouts/node_modules ./packages/layouts/node_modules

RUN pnpm --filter @developer-overheid-nl/api-register build

# ---- Serve production build ----
FROM base AS prod

WORKDIR /opt/astro

ENV NODE_ENV=production

COPY --from=build /opt/astro/apps/api-register/dist ./apps/api-register/dist
COPY --from=build /opt/astro/node_modules ./node_modules
COPY --from=build /opt/astro/apps/api-register/node_modules ./apps/api-register/node_modules
COPY --from=build /opt/astro/packages/components/node_modules ./packages/components/node_modules
COPY --from=build /opt/astro/packages/layouts/node_modules ./packages/layouts/node_modules

# Public folder als nodig voor preview-server (optioneel, afhankelijk van Astro-config)
COPY --from=build /opt/astro /opt/astro


EXPOSE 4321

CMD ["pnpm", "--filter", "@developer-overheid-nl/api-register", "preview", "--host"]