import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  // states
  const [carregando, setCarregandoFat] = useState(false);
  const [tabelaFaturamento, setTabelaFaturamento] = useState(null);
  const [pagAtual, setPagAtual] = useState(1);
  const [itensPorPag, setItensPorPag] = useState(10);
  const [totalItens, setTotalItens] = useState(0);
  const [dadosCompletos, setDadosCompletos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [dadosOriginais, setDadosOriginais] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);
  const [tabelaEstoque, setTabelaEstoque] = useState(null);
  const [carregandoProdutos, setCarregandoProdutos] = useState(false);
  const [tabelaAtiva, setTabelaAtiva] = useState("faturamento");
  const [formProduto, setFormProduto] = useState({
    id: "",
    nome: "",
    idGrupo: "",
    precoVenda: "",
    quantidadeEstoque: "",
  });
  const [mostrarForm, setMostrarForm] = useState(false);

  // visualizar faturamento
  useEffect(() => {
    if (tabelaAtiva === "faturamento" && dadosCompletos.length > 0) {
      atualizarTabela();
    }
  }, [pagAtual, dadosCompletos, menuAberto, tabelaAtiva]);
  const formataItensPorLinha = (dados) => {
    const itensFormatados = [];
    for (let i = 0; i < dados.length; i++) {
      for (let j = 0; j < dados[i].itens.length; j++) {
        itensFormatados.push({
          idPedido: dados[i].idPedido,
          data: dados[i].data,
          nomeProduto: dados[i].itens[j].nomeProduto,
          quantidadeVendida: dados[i].itens[j].quantidadeVendida,
          valorProduto: dados[i].itens[j].valorProduto,
        });
      }
    }
    setTotalItens(itensFormatados.length);
    return itensFormatados;
  };
  const filtraTabela = (filtro) => {
    const dados = [...dadosCompletos];

    switch (filtro) {
      case "buscar":
        const texto = filtroTexto.toLowerCase();

        const dadosFiltrados = dadosOriginais.filter((item) => {
          return (
            item.idPedido.toString().includes(texto) ||
            item.nomeProduto.toLowerCase().includes(texto) ||
            item.data.includes(texto)
          );
        });

        setDadosCompletos(dadosFiltrados);
        setPagAtual(1);
        break;

      case "A-Z":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].nomeProduto > dados[j + 1].nomeProduto) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "Z-A":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].nomeProduto < dados[j + 1].nomeProduto) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "data-asc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            const data1 = new Date(dados[j].data);
            const data2 = new Date(dados[j + 1].data);
            if (data1 > data2) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "data-desc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            const data1 = new Date(dados[j].data);
            const data2 = new Date(dados[j + 1].data);
            if (data1 < data2) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "valor-asc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].valorProduto > dados[j + 1].valorProduto) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "valor-desc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].valorProduto < dados[j + 1].valorProduto) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "quantidade-asc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].quantidadeVendida > dados[j + 1].quantidadeVendida) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "quantidade-desc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].quantidadeVendida < dados[j + 1].quantidadeVendida) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      default:
        break;
    }
  };
  const atualizarTabela = () => {
    if (dadosCompletos.length === 0) return;

    const inicio = (pagAtual - 1) * itensPorPag;
    const dadosPaginados = dadosCompletos.slice(inicio, inicio + itensPorPag);

    const tabela = (
      <div className="tabela">
        <button id="nav" onClick={() => mudaPag(1)}>
          Próximo
        </button>
        <button id="nav" onClick={() => mudaPag(-1)}>
          Anterior
        </button>

        <div style={{ position: "relative", display: "inline-block" }}>
          <button id="nav" onClick={() => setMenuAberto(!menuAberto)}>
            <img
              src="/Sifat-junior-test/filter.svg"
              style={{ height: "10px", width: "10px" }}
              alt="filter"
            />
          </button>

          {menuAberto && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "5px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
                minWidth: "150px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                id="search"
                type="text"
                placeholder="pesquisar..."
                style={{ color: "black" }}
                value={filtroTexto}
                onChange={(e) => {
                  setFiltroTexto(e.target.value);
                  if (e.target.value === "") {
                    setDadosCompletos(dadosOriginais);
                  } else {
                    filtraTabela("buscar");
                  }
                }}
              ></input>
              <button
                id="nav"
                onClick={() => {
                  setFiltroTexto("");
                  setDadosCompletos(dadosOriginais);
                  setPagAtual(1);
                }}
              >
                Limpar
              </button>
              <button
                onClick={() => {
                  filtraTabela("A-Z");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Ordenar A-Z
              </button>
              <button
                onClick={() => {
                  filtraTabela("Z-A");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Ordenar Z-A
              </button>
              <button
                onClick={() => {
                  filtraTabela("data-asc");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Data (antiga → nova)
              </button>
              <button
                onClick={() => {
                  filtraTabela("data-desc");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Data (nova → antiga)
              </button>
            </div>
          )}
        </div>

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
            {dadosPaginados.map((item, index) => (
              <tr key={index}>
                <td>{item.idPedido}</td>
                <td>{item.data}</td>
                <td>{item.nomeProduto}</td>
                <td>{item.quantidadeVendida}</td>
                <td>R$ {item.valorProduto}</td>
                <td>R$ {item.quantidadeVendida * item.valorProduto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    setTabelaFaturamento(tabela);
  };
  const carregarFaturamento = async () => {
    setCarregandoFat(true);
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/vendas",
      );
      const data = await response.json();

      const itensFormatados = formataItensPorLinha(data);
      setDadosOriginais(itensFormatados);
      setDadosCompletos(itensFormatados);
      setPagAtual(1);

      atualizarTabela();

      if (!response || !response.ok) {
        throw new Error("Erro na requisição");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar o faturamento");
    } finally {
      setCarregandoFat(false);
    }
  };

  // visualizar produtos cadastrados
  useEffect(() => {
    if (tabelaAtiva === "estoque" && dadosCompletos.length > 0) {
      atualizarTabelaEstoque();
    }
  }, [pagAtual, dadosCompletos, menuAberto, tabelaAtiva]);
  const filtraTabelaEstoque = (filtro) => {
    const dados = [...dadosCompletos];

    switch (filtro) {
      case "buscar":
        const texto = filtroTexto.toLowerCase();
        const dadosFiltrados = dadosOriginais.filter((item) => {
          return (
            item.id.toString().includes(texto) ||
            item.nome.toLowerCase().includes(texto)
          );
        });
        setDadosCompletos(dadosFiltrados);
        setPagAtual(1);
        break;

      case "A-Z":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].nome > dados[j + 1].nome) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "Z-A":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].nome < dados[j + 1].nome) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "valor-asc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].precoVenda > dados[j + 1].precoVenda) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      case "valor-desc":
        for (let i = 0; i < dados.length - 1; i++) {
          for (let j = 0; j < dados.length - i - 1; j++) {
            if (dados[j].precoVenda < dados[j + 1].precoVenda) {
              const temp = dados[j];
              dados[j] = dados[j + 1];
              dados[j + 1] = temp;
            }
          }
        }
        setDadosCompletos(dados);
        setPagAtual(1);
        break;

      default:
        break;
    }
  };
  const atualizarTabelaEstoque = () => {
    if (dadosCompletos.length === 0) return;

    const inicio = (pagAtual - 1) * itensPorPag;
    const dadosPaginados = dadosCompletos.slice(inicio, inicio + itensPorPag);

    const tabela = (
      <div id="tb2" className="tabela">
        <button id="nav" onClick={() => mudaPag(1)}>
          Próximo
        </button>
        <button id="nav" onClick={() => mudaPag(-1)}>
          Anterior
        </button>

        <div style={{ position: "relative", display: "inline-block" }}>
          <button id="nav" onClick={() => setMenuAberto(!menuAberto)}>
            <img
              src="/Sifat-junior-test/filter.svg"
              style={{ height: "10px", width: "10px" }}
              alt="filter"
            />
          </button>

          {menuAberto && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "5px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 1000,
                minWidth: "150px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                id="search"
                type="text"
                placeholder="pesquisar..."
                style={{ color: "black" }}
                value={filtroTexto}
                onChange={(e) => {
                  setFiltroTexto(e.target.value);
                  if (e.target.value === "") {
                    setDadosCompletos(dadosOriginais);
                  } else {
                    if (tabelaEstoque !== null) {
                      filtraTabelaEstoque("buscar");
                    } else {
                      filtraTabela("buscar");
                    }
                  }
                }}
              />
              <button
                id="nav"
                onClick={() => {
                  setFiltroTexto("");
                  setDadosCompletos(dadosOriginais);
                  setPagAtual(1);
                }}
              >
                Limpar
              </button>
              <button
                onClick={() => {
                  filtraTabelaEstoque("A-Z");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Ordenar A-Z
              </button>
              <button
                onClick={() => {
                  filtraTabelaEstoque("Z-A");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Ordenar Z-A
              </button>
              <button
                onClick={() => {
                  filtraTabelaEstoque("valor-asc");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Menor valor
              </button>
              <button
                onClick={() => {
                  filtraTabelaEstoque("valor-desc");
                  setMenuAberto(false);
                }}
                style={{
                  padding: "8px 12px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Maior valor
              </button>
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
            </tr>
          </thead>
          <tbody id="tb2tr">
            {dadosPaginados.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.quantidadeEstoque}</td>
                <td>R$ {item.precoVenda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    setTabelaEstoque(tabela);
  };
  const formataProdutosPorLinha = (dados) => {
    const itensFormatados = [];
    for (let i = 0; i < dados.length; i++) {
      itensFormatados.push({
        id: dados[i].id,
        nome: dados[i].nome,
        quantidadeEstoque: dados[i].quantidadeEstoque,
        precoVenda: dados[i].precoVenda,
      });
    }
    setTotalItens(itensFormatados.length);
    return itensFormatados;
  };
  const carregarProdutos = async () => {
    setCarregandoProdutos(true);
    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/produtos_cadastrados",
      );
      const data = await response.json();

      const itensFormatados = formataProdutosPorLinha(data);
      setDadosOriginais(itensFormatados);
      setDadosCompletos(itensFormatados);
      setPagAtual(1);

      atualizarTabelaEstoque();

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar os produtos");
    } finally {
      setCarregandoProdutos(false);
    }
  };

  //cadastrar produtos
  const cadastrarProdutos = async (id, nome, idGrupo, preco, quantidade) => {
    if (!nome || !preco || !quantidade) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/Sifat-devs/db-desafio-frontend/produtos_cadastrados",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id || Date.now(),
            nome: nome,
            idGrupo: idGrupo || 1,
            precoVenda: parseFloat(preco),
            quantidadeEstoque: parseInt(quantidade),
          }),
        },
      );

      if (response.ok) {
        toast.success("Produto cadastrado com sucesso!");
        // Limpa o formulário
        setFormProduto({
          id: "",
          nome: "",
          idGrupo: "",
          precoVenda: "",
          quantidadeEstoque: "",
        });
        // Volta para a tabela de estoque
        setTabelaAtiva("estoque");
        // Recarrega os produtos
        carregarProdutos();
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar o produto");
    }
  };
  const formsCadastro = (
    <div className="form-cadastro">
      <h2>Cadastrar Novo Produto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarProdutos(
            formProduto.id,
            formProduto.nome,
            formProduto.idGrupo,
            formProduto.precoVenda,
            formProduto.quantidadeEstoque,
          );
        }}
      >
        <div className="form-group">
          <label>ID (opcional):</label>
          <input
            type="number"
            name="id"
            placeholder="Auto incrementado"
            value={formProduto.id}
            onChange={(e) =>
              setFormProduto({ ...formProduto, id: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Nome do Produto:*</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome do produto"
            value={formProduto.nome}
            onChange={(e) =>
              setFormProduto({ ...formProduto, nome: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>ID do Grupo:</label>
          <input
            type="number"
            name="idGrupo"
            placeholder="Digite o ID do grupo"
            value={formProduto.idGrupo}
            onChange={(e) =>
              setFormProduto({ ...formProduto, idGrupo: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Preço de Venda:*</label>
          <input
            type="number"
            step="0.01"
            name="precoVenda"
            placeholder="Digite o preço"
            value={formProduto.precoVenda}
            onChange={(e) =>
              setFormProduto({ ...formProduto, precoVenda: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Quantidade em Estoque:*</label>
          <input
            type="number"
            name="quantidadeEstoque"
            placeholder="Digite a quantidade"
            value={formProduto.quantidadeEstoque}
            onChange={(e) =>
              setFormProduto({
                ...formProduto,
                quantidadeEstoque: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Cadastrar
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setTabelaAtiva("estoque")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );

  // funções gerais
  const mudaPag = (sentido) => {
    const totalPaginas = Math.ceil(totalItens / itensPorPag);

    if (sentido > 0 && pagAtual < totalPaginas) {
      setPagAtual(pagAtual + 1);
    } else if (sentido < 0 && pagAtual > 1) {
      setPagAtual(pagAtual - 1);
    }
  };

  // elemnentos visuais
  return (
    <div className="App">
      <h1 className="logo">
        <img src="/Sifat-junior-test/logo.svg" alt="Logo" style={{ height: "120px" }} />
      </h1>
      <div className="botoes">
        <button
          className="btn"
          id="produtos"
          onClick={() => {
            carregarProdutos();
            setTabelaAtiva("estoque");
          }}
        >
          Produtos Cadastrados
        </button>

        <button
          className="btn"
          id="faturamento"
          onClick={() => {
            carregarFaturamento();
            setTabelaAtiva("faturamento");
          }}
        >
          Faturamento
        </button>

        <button
          className="btn"
          id="cadastrar-produtos"
          onClick={() => {
            setTabelaAtiva("cadastro");
            setTabelaFaturamento(null);
            setTabelaEstoque(null);
          }}
        >
          Cadastrar Produtos
        </button>
      </div>

      <div className="retangulo">
        {tabelaAtiva === "faturamento" && tabelaFaturamento}
        {tabelaAtiva === "estoque" && tabelaEstoque}
        {tabelaAtiva === "cadastro" && formsCadastro}
      </div>

      <Toaster />
    </div>
  );
}

export default App;
