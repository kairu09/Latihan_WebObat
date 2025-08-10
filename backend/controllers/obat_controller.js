const db = require('../config/dbconfig');

exports.getAllObat = (req, res) => {
    db.query('SELECT * FROM obat', (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
};

exports.getObatById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM obat WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Obat not found' });
        }
        res.json(results[0]);
    });
};