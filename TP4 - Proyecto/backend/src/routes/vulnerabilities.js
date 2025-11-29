const express = require("express");
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
router.post("/ping", vulnerabilityController.ping);

// CSRF - Transferencia protegida
router.post('/transfer', validateOrigin, csrfProtection, vulnerabilityController.transfer);

// Local File Inclusion
router.get("/file", vulnerabilityController.readFile);

// File Upload seguro
router.post("/upload", upload, uploadFile);

// Handler de errores de Multer / Busboy
router.use((err, req, res, next) => {
  if (err && typeof err.message === "string" && err.message.includes("Malformed part header")) {
    return res.status(400).json({ error: "Invalid filename" });
  }

  if (err.message === "Invalid filename") {
    return res.status(400).json({ error: "Invalid filename" });
  }

  if (err.message === "File type not allowed") {
    return res.status(400).json({ error: "File type not allowed" });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large" });
  }

  return res.status(500).json({ error: "Unexpected upload error" });
});

// Middleware de manejo de errores CSRF
router.use(csrfErrorHandler);

module.exports = router;
