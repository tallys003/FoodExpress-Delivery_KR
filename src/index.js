// carrega o .env e coloca cada variável em process.env
require('dotenv').config();
 
const express = require('express');
const produtosRouter = require('./routes/produtos');
const app = express();
app.use(express.json());
app.use('/produtos', produtosRouter);
 
// process.env.PORT lê a variável PORT do .env
// o valor após || é usado se a variável não existir
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});