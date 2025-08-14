// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error('🔥 Erreur détectée :', err);

  // Si l'erreur a déjà un status, on le prend, sinon 500
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Une erreur interne est survenue',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

module.exports = {errorHandler};
