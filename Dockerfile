# Multi-stage build for Chalkboard
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
COPY yarn.lock ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm install
RUN cd client && npm install
RUN cd server && npm install

# Copy source code
COPY . .

# Build client
RUN cd client && npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app/server

# Copy server package files and install production dependencies
COPY --from=builder /app/server/package.json ./
RUN npm install --only=production

# Copy server source and client build
COPY --from=builder /app/server .
COPY --from=builder /app/client/build ../client/build

EXPOSE 3000

CMD ["node", "index.js"]
