/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to microfrontend-one-backend!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'microfrontend-one-backend' });
});

app.get('/api/data', (req, res) => {
  res.json({
    items: [
      { id: 1, name: 'Item 1', description: 'Description for item 1' },
      { id: 2, name: 'Item 2', description: 'Description for item 2' },
      { id: 3, name: 'Item 3', description: 'Description for item 3' },
    ],
  });
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  res.status(201).json({ ...newItem, id: Date.now() });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
