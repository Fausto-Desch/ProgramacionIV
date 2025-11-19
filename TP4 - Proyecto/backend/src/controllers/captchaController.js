// CAPTCHA con expiración y uso único
const crypto = require('crypto');

let captchaStore = new Map();

const generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true
  });

  // ID impredecible
  const captchaId = crypto.randomBytes(32).toString('hex');

  captchaStore.set(captchaId, {
    text: captcha.text,
    createdAt: Date.now(),
    used: false  // Tracking de uso
  });

  // Limpiar CAPTCHAs viejos
  cleanExpiredCaptchas();

  res.json({
    captchaId,
    captchaImage: captcha.data
  });
};

const verifyCaptcha = (req, res) => {
  const { captchaId, captchaText } = req.body;

  const stored = captchaStore.get(captchaId);

  if (!stored) {
    return res.json({ valid: false, error: 'captcha no encontrado' });
  }

  // Verificar expiración (5 minutos)
  const age = Date.now() - stored.createdAt;
  if (age > 5 * 60 * 1000) {
    captchaStore.delete(captchaId);
    return res.json({ valid: false, error: 'captcha expirado' });
  }

  // Verificar que no se haya usado
  if (stored.used) {
    return res.json({ valid: false, error: 'captcha ya utilizado' });
  }

  // Marcar como usado
  stored.used = true;

  // Validar
  const isValid = stored.text === captchaText;

  // Eliminar después de validar
  setTimeout(() => captchaStore.delete(captchaId), 1000);

  res.json({ valid: isValid });
};

// Mejor: usar Google reCAPTCHA v3
module.exports = {
  verifyCaptcha,
  generateCaptcha
};
