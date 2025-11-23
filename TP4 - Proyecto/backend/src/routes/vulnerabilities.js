const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');
const { forceSameSiteCookie, csrfErrorHandler } = require('../middleware/csrf');

// Middleware para forzar SameSite en cookies de sesión
router.use(forceSameSiteCookie);

// Configurar CSRF protection
const csrfProtection = csrf({ cookie: false, sessionKey: 'session' });

// Middleware para validar Origin
const validateOrigin = (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
  const origin = req.get('origin') || req.get('referer');
  
  if (origin && !allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ error: 'Invalid Origin' });
  }
  next();
};

// Endpoint para obtener token CSRF
router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia protegida
router.post('/transfer', validateOrigin, csrfProtection, vulnerabilityController.transfer);

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

// Middleware de manejo de errores CSRF
router.use(csrfErrorHandler);

module.exports = router;
