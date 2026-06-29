const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, imagem } = req.body;

    // Salva o novo produto no MySQL
    const novoProduto = await prisma.produto.create({
      data: { nome, descricao, preco, estoque, imagem }
    });

    res.status(201).json({ mensagem: "Produto cadastrado com sucesso!", novoProduto });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao cadastrar o produto" });
  }
});



app.get('/produtos', async (req, res) => {
  try {
    // Busca todos os produtos para exibir na página inicial
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar produtos" });
  }
});



app.post('/carrinho', async (req, res) => {
  try {
    const { produto_id, quantidade, valor } = req.body;

    // Salva o item selecionado no carrinho junto com quantidade e valor
    const itemCarrinho = await prisma.itemCarrinho.create({
      data: { produto_id, quantidade, valor },
      include: { produto: true } // Mostra os dados do produto junto no carrinho
    });

    res.status(201).json({ mensagem: "Produto adicionado ao carrinho!", itemCarrinho });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao adicionar ao carrinho" });
  }
});


app.listen(3000, () => {
  console.log('FoodExpress API pronta para avaliação na porta 3000!');
});

