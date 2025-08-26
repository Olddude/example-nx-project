import { createServer as createHttpServer } from 'http';
import { Server } from 'http';
import { RequestListener } from 'http';

export const createServer = (listener: RequestListener): Server => {
  return createHttpServer(listener);
};