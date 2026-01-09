# ---------- Builder stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Dummy DB url ONLY for prisma generate
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/dummy"

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS
RUN npm run build


# ---------- Runtime stage ----------
FROM node:22-alpine

WORKDIR /app

# Needed for pg_isready
RUN apk add --no-cache postgresql-client

# Copy runtime artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY package*.json ./

EXPOSE 4000

# Wait for DB → migrate → start app
CMD ["sh", "-c", "\
    until pg_isready -d \"$DATABASE_URL\"; do \
    echo 'Waiting for database...'; \
    sleep 2; \
    done && \
    npx prisma migrate deploy && \
    npm run start:prod \
    "]
