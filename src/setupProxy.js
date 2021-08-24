const { createProxyMiddleware } = require('http-proxy-middleware');
// CORS 수정해주는 부분

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_PATH,
      changeOrigin: true,
    })
  );
};
