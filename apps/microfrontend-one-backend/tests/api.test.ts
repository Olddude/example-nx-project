import request from 'supertest';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createApp } from '../src/app.js';
import express from 'express';

describe('Microfrontend One Backend API', () => {
  let app: express.Application;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /api', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Welcome to microfrontend-one-backend!'
      });
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'healthy',
        service: 'microfrontend-one-backend'
      });
    });
  });

  describe('GET /api/data', () => {
    it('should return list of items', async () => {
      const response = await request(app).get('/api/data');
      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(3);
      expect(response.body.items[0]).toEqual({
        id: 1,
        name: 'Item 1',
        description: 'Description for item 1'
      });
    });
  });

  describe('POST /api/data', () => {
    it('should create new item', async () => {
      const newItem = { name: 'Test Item', description: 'Test Description' };
      const response = await request(app)
        .post('/api/data')
        .send(newItem);
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Item');
      expect(response.body.description).toBe('Test Description');
      expect(response.body.id).toBeDefined();
    });
  });
});