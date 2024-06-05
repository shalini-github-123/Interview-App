const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: 'https://interview-app-m1lr.onrender.com',
      // target: "http://localhost:5555/",
      changeOrigin: true,
    })
  );
};
