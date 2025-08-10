const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obat_controller');

router.get('/', obatController.getAllObat);
router.get('/:id', obatController.getObatById);

module.exports = router;