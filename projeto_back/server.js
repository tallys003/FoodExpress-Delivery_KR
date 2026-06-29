const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());


const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FoodExpress',
    password: 'senai',
    port: 5432,
});

db.connect((err) => {
    if (err) console.error('Erro ao conectar ao banco:', err);
    else console.log('Conectado ao PostgreSQL com sucesso!');
});


app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco, estoque, imagem } = req.body;
    const sql = 'INSERT INTO "Produto" (nome, descricao, preco, estoque, imagem) VALUES ($1, $2, $3, $4, $5)';
    
    try {
        await db.query(sql, [nome, descricao, preco, estoque, imagem]);
        res.status(201).send('Produto cadastrado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao cadastrar produto.');
    }
});


app.get('/produtos', async (req, res) => {
    const sql = 'SELECT * FROM "Produto"';
    try {
        const result = await db.query(sql);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

app.listen(3333, () => {
    console.log('Servidor back-end rodando na porta 3333');
});