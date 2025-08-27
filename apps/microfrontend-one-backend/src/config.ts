export const config = {
  port: process.env.MICROFRONTEND_ONE_PORT || 3334,
  serviceName: 'microfrontend-one-backend',
  cors: {
    enabled: true,
    options: {
      origin: process.env.MICROFRONTEND_ONE_CORS_ORIGIN || '*',
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