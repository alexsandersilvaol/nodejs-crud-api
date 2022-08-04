const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos-controller');

router.get('/', produtosController.get);

router.get('/:id', produtosController.getById);

router.put('/:id', produtosController.put);

router.post('/', produtosController.post);

router.delete('/:id', produtosController.delete);

module.exports = router;

