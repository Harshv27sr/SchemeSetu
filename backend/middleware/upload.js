import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists locally
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up disk storage engine configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File extensions and mime validation filter
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|pdf/;
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  const ext = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedMimeTypes.includes(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, and PNG are allowed!'), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB Max
  fileFilter: fileFilter
});

export default upload;
