export const config = {
  port: process.env.SHELL_PORT || 3333,
  serviceName: 'shell-backend',
  cors: {
    enabled: true,
    options: {
      origin: process.env.SHELL_CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
  static: {
    assetsPath: '/assets',
    browserPath: 'public',
  },
  api: {
    prefix: '/api',
  },
};