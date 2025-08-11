const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const obatController = require('../controllers/obat_controller');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Routes
router.get('/obat', obatController.getAllObat);
router.get('/obat/:id', obatController.getObatById);
router.post('/obat', upload.single('gambar'), obatController.createObat);
router.put('/obat/:id', upload.single('gambar'), obatController.updateObat);
router.delete('/obat/:id', obatController.deleteObat);

module.exports = router;