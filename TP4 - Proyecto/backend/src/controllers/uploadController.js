// Configuración segura
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    // Generar nombre aleatorio
    const uniqueName = crypto.randomBytes(16).toString('hex');
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024  // Límite: 5MB
  },
  fileFilter: (req, file, cb) => {
    // Whitelist de extensiones
    const allowedExts = ['.jpg', '.jpeg', '.png', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExts.includes(ext)) {
      return cb(new Error('Tipo de archivo no permitido'));
    }

    // Validar MIME type
    const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('MIME type no permitido'));
    }

    cb(null, true);
  }
});

module.exports = {
  uploadFile,
  uploadMiddleware: upload.single('file')
};
