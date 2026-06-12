// src/routes/produtos.js
const express = require('express');
const router = express.Router();// cria roteador independente
 
const produtos = [
{ id: 1, nome: 'X-Burguer', preco: 18.50 },
{ id: 2, nome: 'Fritas', preco: 9.00 },
];
 
router.get('/', (req, res) => res.json(produtos));
 
router.get('/:id', (req, res) => {
const produto = produtos.find(p => p.id === Number(req.params.id));
if (!produto) return res.status(404).json({ erro: 'Não encontrado' });
res.json(produto);
});
 
router.post('/', (req, res) => {
const { nome, preco } = req.body;
if (!nome || !preco) return res.status(400).json({ erro: 'Campos obrigatórios' });
const novo = { id: produtos.length + 1, nome, preco };
produtos.push(novo);
res.status(201).json(novo);
});
 
// exporta o router para ser usado no index.js
module.exports = router;