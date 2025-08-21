# Build stage
FROM node:20-alpine AS builder

# Accept build args
ARG PRODUCTION=false

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY .swcrc ./
COPY eslint.config.mjs ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY apps/shell ./apps/shell
COPY libs ./libs

# Set environment variable for build
ENV PRODUCTION=${PRODUCTION}

# Build the shell app using webpack for module federation
RUN PRODUCTION=${PRODUCTION} npx nx run shell:build-webpack:development --skip-nx-cache

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dependencies for serving
RUN npm install express compression

# Copy built application
COPY --from=builder /app/dist/apps/shell ./dist/apps/shell

# Create a simple express server for the shell
RUN echo 'const express = require("express");' > server.js && \
    echo 'const compression = require("compression");' >> server.js && \
    echo 'const path = require("path");' >> server.js && \
    echo 'const app = express();' >> server.js && \
    echo 'app.use(compression());' >> server.js && \
    echo 'app.use(express.static(path.join(__dirname, "dist/apps/shell/browser")));' >> server.js && \
    echo 'app.get("/*", (req, res) => {' >> server.js && \
    echo '  res.sendFile(path.join(__dirname, "dist/apps/shell/browser/index.html"));' >> server.js && \
    echo '});' >> server.js && \
    echo 'const PORT = process.env.PORT || 4200;' >> server.js && \
    echo 'app.listen(PORT, () => {' >> server.js && \
    echo '  console.log(`Shell app listening on port ${PORT}`);' >> server.js && \
    echo '});' >> server.js

# Expose port
EXPOSE 4200

# Start the application
CMD ["node", "server.js"]
