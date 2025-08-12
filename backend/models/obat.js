const db = require('../config/dbconfig');

class Obat {
  constructor(data) {
    this.id = data.id;
    this.nama_obat = data.nama_obat;
    this.harga = data.harga;
    this.deskripsi = data.deskripsi;
    this.kategori = data.kategori;
    this.gambar = data.gambar;
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM obat', (err, results) => {
        if (err) reject(err);
        else resolve(results.map(row => new Obat(row)));
      });
    });
  }

  static findByPk(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM obat WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] ? new Obat(results[0]) : null);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const { nama_obat, harga, deskripsi, kategori, gambar } = data;
      db.query(
        'INSERT INTO obat (nama_obat, harga, deskripsi, kategori, gambar) VALUES (?, ?, ?, ?, ?)',
        [nama_obat, harga, deskripsi, kategori, gambar],
        (err, results) => {
          if (err) reject(err);
          else {
            const newObat = new Obat({ id: results.insertId, ...data });
            resolve(newObat);
          }
        }
      );
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      const { nama_obat, harga, deskripsi, kategori, gambar } = data;
      db.query(
        'UPDATE obat SET nama_obat = ?, harga = ?, deskripsi = ?, kategori = ?, gambar = ? WHERE id = ?',
        [nama_obat, harga, deskripsi, kategori, gambar, this.id],
        (err, results) => {
          if (err) reject(err);
          else {
            Object.assign(this, data);
            resolve(this);
          }
        }
      );
    });
  }

  destroy() {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM obat WHERE id = ?', [this.id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Obat;
