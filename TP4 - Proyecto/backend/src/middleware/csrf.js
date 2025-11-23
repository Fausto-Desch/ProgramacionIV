// Middleware para forzar las cookies
const forceSameSiteCookie = (req, res, next) => {
  const originalSetHeader = res.setHeader;
  res.setHeader = function(name, value) {
    if (name.toLowerCase() === 'set-cookie') {
      if (Array.isArray(value)) {
        value = value.map(cookie => {
          if (cookie && !cookie.includes('SameSite')) {
            return cookie + '; SameSite=Strict';
          }
          return cookie;
        });
      } else if (value && !value.includes('SameSite')) {
        value = value + '; SameSite=Strict';
      }
    }
    return originalSetHeader.call(this, name, value);
  };
  next();
};

// Middleware de manejo de errores CSRF
const csrfErrorHandler = (err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ 
      error: 'Fallo en validacion de token CSRF',
      message: 'Token CSRF inválido'
    });
  }
  next(err);
};

module.exports = {
  forceSameSiteCookie,
  csrfErrorHandler
};
