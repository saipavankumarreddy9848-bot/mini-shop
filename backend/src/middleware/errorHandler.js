// Central error handler. Keeps stack traces out of API responses in
// production (important once this sits behind CloudWatch/X-Ray logging).
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
}

module.exports = errorHandler;
