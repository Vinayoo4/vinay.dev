# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what is needed to run
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/scripts ./scripts

# SQLite database lives in /data so it can be persisted via a volume.
# Mount it with: docker run -v /host/path/data:/data ...
# Pass environment variables at runtime with -e or --env-file .env
RUN mkdir -p /data
ENV DATA_DIR=/data

EXPOSE 3000
CMD ["npm", "run", "start"]
