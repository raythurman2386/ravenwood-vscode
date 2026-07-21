# Dockerfile sample — comprehensive feature coverage.
# Highlights: package-manager functions (orange), flags (yellow), strings (green),
# escapes (aqua), base images (purple).

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --production=false

COPY . .
RUN npm run compile

FROM node:22-alpine
LABEL maintainer="support@raythurman.dev"

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O- http://localhost:8080/health || exit 1

CMD ["node", "dist/index-client.js"]