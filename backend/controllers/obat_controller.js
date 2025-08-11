const { Obat } = require('../models');
const path = require('path');
const fs = require('fs');

// READ - Get all obat
exports.getAllObat = async (req, res) => {
    try {
        const obat = await Obat.findAll();
        res.json(obat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ - Get obat by ID
exports.getObatById = async (req, res) => {
    try {
        const obat = await Obat.findByPk(req.params.id);
        if (!obat) {
            return res.status(404).json({ error: 'Obat tidak ditemukan' });
        }
        res.json(obat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE - Add new obat
exports.createObat = async (req, res) => {
    try {
        const { nama, harga, deskripsi, stok, kategori } = req.body;
        let gambar = null;

        if (req.file) {
            gambar = req.file.filename;
        }

        const obat = await Obat.create({
            nama,
            harga,
            deskripsi,
            stok,
            kategori,
            gambar
        });

        res.status(201).json(obat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE - Update obat
exports.updateObat = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, harga, deskripsi, stok, kategori } = req.body;
        
        const obat = await Obat.findByPk(id);
        if (!obat) {
            return res.status(404).json({ error: 'Obat tidak ditemukan' });
        }

        let gambar = obat.gambar;
        if (req.file) {
            // Delete old image if exists
            if (obat.gambar) {
                const oldImagePath = path.join(__dirname, '../images', obat.gambar);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            gambar = req.file.filename;
        }

        await obat.update({
            nama,
            harga,
            deskripsi,
            stok,
            kategori,
            gambar
        });

        res.json(obat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Delete obat
exports.deleteObat = async (req, res) => {
    try {
        const { id } = req.params;
        const obat = await Obat.findByPk(id);
        
        if (!obat) {
            return res.status(404).json({ error: 'Obat tidak ditemukan' });
        }

        // Delete image file if exists
        if (obat.gambar) {
            const imagePath = path.join(__dirname, '../images', obat.gambar);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await obat.destroy();
        res.json({ message: 'Obat berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};