import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { config } from './config';

export const createApp = () => {
  const app = express();

  // Middleware
  if (config.cors.enabled) {
    app.use(cors(config.cors.options));
  }
  app.use(express.json());

  // Static files
  app.use(config.static.assetsPath, express.static(path.join(__dirname, config.static.browserPath)));
  app.use(express.static(path.join(__dirname, config.static.browserPath)));

  // API Routes
  app.get(`${config.api.prefix}`, (req, res) => {
    res.send({ message: `Welcome to ${config.serviceName}!` });
  });

  app.get(`${config.api.prefix}/health`, (req, res) => {
    res.json({ status: 'healthy', service: config.serviceName });
  });

  app.get(`${config.api.prefix}/user`, (req, res) => {
    res.json({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    });
  });

  app.get(`${config.api.prefix}/microfrontends`, (req, res) => {
    res.json([
      {
        name: 'microfrontend-one',
        url: 'http://localhost:4201',
        status: 'active',
      },
    ]);
  });

  app.post(`${config.api.prefix}/auth/login`, (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      res.json({
        token: 'mock-jwt-token',
        user: { id: 1, username },
      });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });

  // Serve the frontend app for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith(config.api.prefix)) {
      res.sendFile(path.join(__dirname, config.static.browserPath, 'index.html'));
    }
  });

  return app;
};