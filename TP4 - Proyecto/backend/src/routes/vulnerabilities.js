// Implementar tokens CSRF
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const express = require('express');
const router = express.Router();
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

// Generar token
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Validar token en peticiones
app.post('/transfer', csrfProtection, (req, res) => {
   // El middleware csrf valida automáticamente el token
    transferMoney(req.body);
    res.json({ message: 'Transferencia exitosa' });
});

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;
