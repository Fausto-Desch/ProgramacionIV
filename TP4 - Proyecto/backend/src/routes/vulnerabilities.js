const express = require("express");
const router = express.Router();

const vulnerabilityController = require("../controllers/vulnerabilityController");
const upload = require("../config/multer");
const { uploadFile } = require("../controllers/uploadController");

// Command Injection
router.post("/ping", vulnerabilityController.ping);

// CSRF - Transferencia
router.post("/transfer", vulnerabilityController.transfer);

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

module.exports = router;
