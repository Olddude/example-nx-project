import request from 'supertest';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createApp } from '../src/app';
import express from 'express';

describe('Shell Backend API', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /api', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Welcome to shell-backend!'
      });
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'healthy',
        service: 'shell-backend'
      });
    });
  });

  describe('GET /api/user', () => {
    it('should return user information', async () => {
      const response = await request(app).get('/api/user');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin'
      });
    });
  });

  describe('GET /api/microfrontends', () => {
    it('should return list of microfrontends', async () => {
      const response = await request(app).get('/api/microfrontends');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual({
        name: 'microfrontend-one',
        url: 'http://localhost:4201',
        status: 'active'
      });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate user with valid credentials', async () => {
      const credentials = { username: 'testuser', password: 'testpass' };
      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);
      
      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mock-jwt-token');
      expect(response.body.user.username).toBe('testuser');
    });

    it('should reject invalid credentials', async () => {
      const credentials = { username: '', password: '' };
      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });
});