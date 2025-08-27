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

  app.get(`${config.api.prefix}/data`, (req, res) => {
    res.json({
      items: [
        { id: 1, name: 'Item 1', description: 'Description for item 1' },
        { id: 2, name: 'Item 2', description: 'Description for item 2' },
        { id: 3, name: 'Item 3', description: 'Description for item 3' },
      ],
    });
  });

  app.post(`${config.api.prefix}/data`, (req, res) => {
    const newItem = req.body;
    res.status(201).json({ ...newItem, id: Date.now() });
  });

  // Serve the frontend app for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith(config.api.prefix)) {
      res.sendFile(path.join(__dirname, config.static.browserPath, 'index.html'));
    }
  });

  return app;
};