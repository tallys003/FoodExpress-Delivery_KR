import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '', descricao: '', preco: '', estoque: '', imagem: ''
  });

  
  useEffect(() => {
    axios.get('http://localhost:3333/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  
  const handleCadastrar = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/produtos', novoProduto);
      alert('Produto cadastrado com sucesso!');
      window.location.reload(); // Recarrega a página para exibir o novo produto
    } catch (error) {
      alert('Erro ao cadastrar produto. Verifique o console.');
    }
  };

  
  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque <= 0) {
      alert('Produto sem estoque!');
      return;
    }

    const itemJaExiste = carrinho.find(item => item.id === produto.id);
    if (itemJaExiste) {

      setCarrinho(carrinho.map(item => 
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      ));
    } else {

      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#d32f2f', textAlign: 'center' }}>FoodExpress Delivery</h1>

      {/* ÁREA DO ADMINISTRADOR */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#333' }}>Área do Administrador: Cadastrar Produto (RF08)</h2>
        <form onSubmit={handleCadastrar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Nome da Comida (ex: Hambúrguer Duplo)" required onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})} />
          <input type="text" placeholder="Descrição (ex: Pão, duas carnes, queijo)" required onChange={e => setNovoProduto({...novoProduto, descricao: e.target.value})} />
          <input type="number" placeholder="Preço (ex: 25.50)" step="0.01" required onChange={e => setNovoProduto({...novoProduto, preco: e.target.value})} />
          <input type="number" placeholder="Quantidade em Estoque" required onChange={e => setNovoProduto({...novoProduto, estoque: e.target.value})} />
          <input type="text" placeholder="URL da Imagem" required onChange={e => setNovoProduto({...novoProduto, imagem: e.target.value})} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Cadastrar Produto</button>
        </form>
      </div>

      <hr />

      {/* ÁREA DO CLIENTE */}
      <h2 style={{ color: '#333' }}>Cardápio (RF03)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {produtos.map(p => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
            <img src={p.imagem} alt={p.nome} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3>{p.nome}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{p.descricao}</p>
            <h4 style={{ color: '#d32f2f' }}>R$ {p.preco}</h4>
            <p style={{ fontSize: '12px' }}>Estoque: {p.estoque}</p>
            <button onClick={() => adicionarAoCarrinho(p)} style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              Adicionar ao Carrinho (RF04)
            </button>
          </div>
        ))}
      </div>

      <hr />

      {/* RESUMO DO CARRINHO */}
      <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginTop: '30px' }}>
        <h2>Seu Carrinho de Compras</h2>
        {carrinho.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th>Produto</th>
                <th>Qtd.</th>
                <th>Valor Unitário</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 0' }}>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.preco}</td>
                  <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;