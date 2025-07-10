# syntax=docker/dockerfile:1

# Stage 1: Base image with Node.js and pnpm support
FROM node:lts AS base

# Set environment variables
ENV FORCE_COLOR=0

# Install latest corepack (which includes pnpm)
RUN npm install -g corepack@latest
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /opt/astro

# Stage 2a: Development mode
FROM base AS dev

WORKDIR /opt/astro

# Expose default Astro dev port
EXPOSE 4321

# Install dependencies and run the dev server
CMD [ "sh", "-c", "pnpm install && pnpm dev --host" ]

# Stage 2b: Production build
FROM base AS prod

WORKDIR /opt/astro

# Copy project files
COPY . .

# Install dependencies (locked)
RUN pnpm install --frozen-lockfile

# Build Astro site
RUN pnpm build

# Stage 3: Serve using Astro's preview server
FROM base AS preview

WORKDIR /opt/astro

# Copy built site and node_modules (for preview server)
COPY --from=prod /opt/astro /opt/astro

EXPOSE 4321

CMD [ "pnpm", "preview", "--host" ]
