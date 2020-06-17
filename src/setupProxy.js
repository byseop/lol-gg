const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/.netlify/functions/stats', {
      target: 'http://localhost:9000/stats',
      changeOrigin: true
    }),
  );
};
