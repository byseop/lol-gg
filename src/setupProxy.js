const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/.netlify/functions/stats', {
      target: 'http://localhost:9000/stats',
      changeOrigin: true
    }),
    createProxyMiddleware('/.netlify/functions/data', {
      target: 'http://localhost:9000/data',
      changeOrigin: true
    }),
    createProxyMiddleware('/.netlify/functions/league', {
      target: 'http://localhost:9000/league',
      changeOrigin: true
    }),
    createProxyMiddleware('/.netlify/functions/match', {
      target: 'http://localhost:9000/match',
      changeOrigin: true
    })
  );
};
