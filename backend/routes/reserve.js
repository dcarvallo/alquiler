const express = require('express');
const reserveController = require('../controllers/reserveController');

const router = express.Router();

router.post('/', reserveController.reserve)

module.exports = router;