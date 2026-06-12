// src/routes/produtos.js
const express = require('express');
const router = express.Router();
 
// importa o objeto exportado pelo controller
// '../controllers/produtosController' sobe um nível (routes → src)
// e entra em controllers/produtosController.js
const ctrl = require('../controllers/produtosController');
 
// método + URL → função do controller
router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscarPorId);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.remover);
 
module.exports = router;