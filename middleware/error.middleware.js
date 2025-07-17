exports.errorHandler = (err, req, res, next) => {
    console.error('[ERROR]', err.stack);
    res.status(err.statusCode || 500).json({
      error: err.message || 'Error interno del servidor'
    });
  };
  