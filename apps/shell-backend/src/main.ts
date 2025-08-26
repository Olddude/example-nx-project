/**
 * Main entry point for shell-backend
 */

import { createApp } from './app.js';
import { createServer } from './server.js';
import { config } from './config.js';

const main = (): void => {
  const app = createApp();
  const server = createServer(app);
  
  server.on('error', (error: Error) => {
    console.error(`Server error: ${error.message}`);
    process.exit(1);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  });

  server.listen(config.port, () => {
    console.log(`${config.serviceName} listening at http://localhost:${config.port}${config.api.prefix}`);
  });
};

// Start the application
main();
