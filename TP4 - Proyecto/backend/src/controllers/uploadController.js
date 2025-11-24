const fs = require("fs");
const fileType = require("file-type");

exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const buffer = fs.readFileSync(req.file.path);
    const detected = await fileType.fromBuffer(buffer);

    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
      "application/pdf"
    ];

    if (!detected || !allowedMimes.includes(detected.mime)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Invalid file content" });
    }

    fs.chmodSync(req.file.path, 0o644);

    return res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename
    });
  } catch (err) {
    return res.status(500).json({ error: "Unexpected upload error" });
  }
};
