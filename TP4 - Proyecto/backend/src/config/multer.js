const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Carpeta segura
const uploadDir = path.join(__dirname, "../../uploads");

// Lista blanca de extensiones
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.txt', '.pdf'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, unique + ext);
  }
});

function fileFilter(req, file, cb) {
  const rawName = file.originalname;

  // 1) Path traversal
  if (rawName.includes("..") || rawName.includes("/") || rawName.includes("\\")) {
    return cb(new Error("Invalid filename"));
  }

  // 2) Caracteres peligrosos
  const invalidNameRegex = /[%]|(;)|(\x00)|[<>:"|?*]/;
  if (invalidNameRegex.test(rawName)) {
    return cb(new Error("Invalid filename"));
  }

  // 3) Sin extensión => nombre inválido
  const ext = path.extname(rawName).toLowerCase();
  if (!ext) {
    return cb(new Error("Invalid filename"));
  }

  // 4) Lista blanca de extensiones
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error("File type not allowed"));
  }

  return cb(null, true);
}

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
}).single("file");
