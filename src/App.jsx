import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import './App.css';



function App() {
  const [carregando, setCarregandoFat] = useState();
  const [tabelaFaturamento, setTabelaFaturamento] = useState(null);
  const [dadosFaturamento, setDadosFat] = useState([]);

  const criarTabelaFaturamento = (dados) => {
    if (!dados || dados.length === 0) {
      return <p>Nenhum dado encontrado</p>;
    }
    
    const dadosFormatados = dados.flatMap((item) => ({}));
    
    return (
      <div className='tabela'>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((pedido) => (
          pedido.itens.map((item) => (
            <tr key={`${pedido.idPedido}-${item.idProduto}`}>
              <td>{pedido.idPedido}</td>           
              <td>{pedido.data}</td>              
              <td>{item.nomeProduto}</td>         
              <td>{item.quantidadeVendida}</td>  
              <td>R$ {item.valorProduto}</td>     
              <td>R$ {item.quantidadeVendida * item.valorProduto}</td>
            </tr>
          ))
        ))}
        </tbody>
        </table>
      </div>
    );
  
  }


  const carregarFaturamento = async () => {
    setCarregandoFat(true);
    try {
      const response = await fetch('https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/vendas');
      const data = await response.json();
      setDadosFat(data);
      console.log(dadosFaturamento);
      const tabela = criarTabelaFaturamento(dadosFaturamento);
      setTabelaFaturamento(tabela);
  
      if (!response || !response.ok) {
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar o faturamento');
    } finally {
      setCarregandoFat(false);
    }
  };

  const carregarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response || !response.ok) {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao carregar os produtos');
    }
  };

  const cadastrarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: 'Produto Exemplo',
          preco: 100.00,
          quantidade: 10
        })
      });
      if (!response || !response.ok) {
        throw new Error(error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar o produto');
    }
  };

  return (
    <div className="App">

      <h1 className="logo">
        <img src="/logo.svg" alt="Logo" style={{ height: '120px' }} />
      </h1>

      <div className='botoes'>
      <button className="btn" id='produtos' onClick={carregarProdutos}>
        Produtos Cadastrados</button>

      <button className="btn" id='faturamento' onClick={carregarFaturamento}> 
        Faturamento</button>
      
      <button className="btn" id='cadastrar-produtos' onClick={cadastrarProdutos}>Cadastrar Produtos</button>
      </div>

      <div className='retangulo'>
        {tabelaFaturamento}
      </div>

      <Toaster />
    </div>
  )
}

export default App