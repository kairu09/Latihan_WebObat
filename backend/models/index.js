const db = require('../config/dbconfig');

const Obat = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM obat', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  findByPk: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM obat WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  },

  create: (data) => {
    return new Promise((resolve, reject) => {
      const { nama_obat, harga, deskripsi, kategori, gambar } = data;
      db.query(
        'INSERT INTO obat (nama_obat, harga, deskripsi, kategori, gambar) VALUES (?, ?, ?, ?, ?)',
        [nama_obat, harga, deskripsi, kategori, gambar],
        (err, results) => {
          if (err) reject(err);
          else {
            // Return the created object with the new ID
            const newObat = { id: results.insertId, ...data };
            resolve(newObat);
          }
        }
      );
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const { nama_obat, harga, deskripsi, kategori, gambar } = data;
      db.query(
        'UPDATE obat SET nama_obat = ?, harga = ?, deskripsi = ?, kategori = ?, gambar = ? WHERE id = ?',
        [nama_obat, harga, deskripsi, kategori, gambar, id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results.affectedRows > 0);
        }
      );
    });
  },

  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM obat WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  }
};

module.exports = { Obat };
