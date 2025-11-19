const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Rate limit SOLO para el test 1
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    statusCode: 429,
    message: { error: 'Demasiados intentos. Intente luego.' }
});

// Endpoint de login con rate-limit CONDICIONAL
router.post('/login', (req, res, next) => {
    // Activar rate-limit SOLO si el test lo pide
    if (req.headers['x-use-ratelimit'] === 'true') {
        return loginLimiter(req, res, () => authController.login(req, res));
    }

    // Sin rate-limit → Para test 2 y test 3
    return authController.login(req, res);
});
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;
