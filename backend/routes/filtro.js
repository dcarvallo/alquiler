const express = require('express');
const filterController = require('../controllers/filtroController');

const router = express.Router();

router.get('/', filterController.list)

module.exports = router;