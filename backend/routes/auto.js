const express = require('express');
const autoController = require('../controllers/autoController');

const router = express.Router();

router.get('/', autoController.listall)
      .post('/', autoController.create)
      .get('/:id', autoController.find, autoController.show)
      .put('/:key/:value', autoController.find, autoController.update)
      .delete('/:key/:value', autoController.find, autoController.deleted)

module.exports = router;