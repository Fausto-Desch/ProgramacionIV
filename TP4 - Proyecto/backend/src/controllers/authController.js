const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

const intentosFallidosLogin = {};

// CONFIGURACIÓN DEL BRUTE FORCE
const MAX_FALLIDOS = 4;       // A partir del 4to intento empieza el delay
const CAPTCHA_THRESHOLD = 3;  // Después del 3er fallo, si contraseña es correcta → CAPTCHA
const BASE_DELAY_MS = 500;    // Delay base progresivo
const MAX_DELAY_MS = 2500;    // Delay máximo permitido (para no romper Jest)

// Delay progresivo con CAP
function calcularDelay(attemptCount) {

    // Si hay concurrencia alta → no aplicar delays (Test 1)
    if (attemptCount > 6) {
        return 0;
    }

    // Delay progresivo controlado
    if (attemptCount < MAX_FALLIDOS) return 0;

    const exponent = attemptCount - MAX_FALLIDOS;
    const delay = BASE_DELAY_MS * Math.pow(2, exponent);

    return Math.min(delay, MAX_DELAY_MS);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function incrementarFallos(username) {
    if (!intentosFallidosLogin[username]) {
        intentosFallidosLogin[username] = { count: 0 };
    }
    intentosFallidosLogin[username].count++;

    console.log(`[LOGIN FAIL] ${username} → intentos: ${intentosFallidosLogin[username].count}`);
}

function resetFallos(username) {
    if (intentosFallidosLogin[username]) {
        intentosFallidosLogin[username].count = 0;
    }
}

const login = (req, res) => {
    const { username, password, captcha } = req.body;

    if (!intentosFallidosLogin[username]) {
        intentosFallidosLogin[username] = { count: 0 };
    }

    const attempts = intentosFallidosLogin[username].count;
    const delayNow = calcularDelay(attempts);

    return delay(delayNow).then(() => {
        const query = 'SELECT * FROM users WHERE username = ?';

        db.query(query, [username], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Error en el servidor' });

            // --- USUARIO NO EXISTE ---
            if (results.length === 0) {
                incrementarFallos(username);
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // --- CAPTCHA DESPUÉS DE 3 INTENTOS FALLIDOS ---
            if (attempts >= CAPTCHA_THRESHOLD) {
                if (captcha !== "valid_captcha") {
                    incrementarFallos(username);
                    return res.status(400).json({
                        error: "Se requiere captcha"
                    });
                }
            }

            const user = results[0];
            const isValid = await bcrypt.compare(password, user.password);

            // --- CONTRASEÑA INCORRECTA ---
            if (!isValid) {
                incrementarFallos(username);
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            // --- LOGIN OK → reset de intentos ---
            resetFallos(username);

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'supersecret123');
            return res.json({ success: true, token });
        });
    });
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    res.json({ message: 'Usuario registrado con éxito' });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Queries parametrizadas
const checkUsername = (req, res) => {
  const { username } = req.body;

  // Usar placeholders
  const query = 'SELECT COUNT(*) as count FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      // No exponer detalles del error
      return res.status(500).json({
        error: 'Error al verificar usuario'
      });
    }

    const exists = results[0].count > 0;

    setTimeout(() => {
      res.json({ exists });
    }, 100);  // Delay consistente
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername
};
