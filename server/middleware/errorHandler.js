// server/middleware/errorHandler.js
function notFoundHandler(req, res, next) {
  res.status(404);
  res.render('error', {
    title: '404 Not Found',
    message: 'The page you are looking for does not exist.',
    error: {}
  });
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  console.error(err.stack);

  res.status(err.status || 500);
  res.render('error', {
    title: 'Server Error',
    message: err.message || 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
}

module.exports = { notFoundHandler, errorHandler };
