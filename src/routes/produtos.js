const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtos-controller');
const authService = require('../services/auth');

router.get('/', produtosController.get);

router.get('/:id', produtosController.getById);

router.put('/:id', authService.authorize, produtosController.put);

router.post('/', authService.authorize, produtosController.post);

router.delete('/:id', authService.authorize, produtosController.delete);

module.exports = router;

