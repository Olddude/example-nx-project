# Build stage
FROM node:20-alpine AS builder

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
COPY apps/microfrontend-one ./apps/microfrontend-one
COPY libs ./libs

# Build the microfrontend-one app using webpack for module federation
RUN npx nx run microfrontend-one:build:development --skip-nx-cache

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install dependencies for serving
RUN npm install express compression cors

# Copy built application
COPY --from=builder /app/dist/apps/microfrontend-one ./dist/apps/microfrontend-one

# Create a simple express server for the microfrontend
RUN echo 'const express = require("express");' > server.js && \
    echo 'const compression = require("compression");' >> server.js && \
    echo 'const cors = require("cors");' >> server.js && \
    echo 'const path = require("path");' >> server.js && \
    echo 'const app = express();' >> server.js && \
    echo 'app.use(cors());' >> server.js && \
    echo 'app.use(compression());' >> server.js && \
    echo 'app.use(express.static(path.join(__dirname, "dist/apps/microfrontend-one/browser")));' >> server.js && \
    echo 'app.get("/*", (req, res) => {' >> server.js && \
    echo '  res.sendFile(path.join(__dirname, "dist/apps/microfrontend-one/browser/index.html"));' >> server.js && \
    echo '});' >> server.js && \
    echo 'const PORT = process.env.PORT || 4201;' >> server.js && \
    echo 'app.listen(PORT, () => {' >> server.js && \
    echo '  console.log(`Microfrontend-one app listening on port ${PORT}`);' >> server.js && \
    echo '});' >> server.js

# Expose port
EXPOSE 4201

# Start the application
CMD ["node", "server.js"]
