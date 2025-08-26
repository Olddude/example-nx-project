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
  res.send({ message: 'Welcome to shell-backend!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'shell-backend' });
});

app.get('/api/user', (req, res) => {
  res.json({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  });
});

app.get('/api/microfrontends', (req, res) => {
  res.json([
    {
      name: 'microfrontend-one',
      url: 'http://localhost:4201',
      status: 'active',
    },
  ]);
});

app.post('/api/auth/login', (req, res) => {
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

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
