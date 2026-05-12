import { useState, useEffect } from "react";
import Header from "./components/header";
import ProdutoCard from "./components/produtoCard";
import CarrinhoResumo from "./components/carrinhoResumo";
import { produtos } from "./data/produtos";
import "./styles/global.css";

function App() {
  const [carrinho, setCarrinho] = useState({});

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");

    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionar = (nome) => {
    setCarrinho((prev) => ({
      ...prev,
      [nome]: (prev[nome] || 0) + 1,
    }));
  };

  const remover = (nome) => {
    setCarrinho((prev) => ({
      ...prev,
      [nome]: Math.max((prev[nome] || 0) - 1, 0),
    }));
  };

  const limparCarrinho = () => {
    setCarrinho({});
    localStorage.removeItem("carrinho");
  };

  const finalizarCompra = () => {
    alert("Compra finalizada com sucesso!");

    setCarrinho({});
    localStorage.removeItem("carrinho");
  };

  const totalItens = Object.values(carrinho).reduce(
    (acc, item) => acc + item,
    0
  );

  const totalCompra = produtos.reduce((acc, produto) => {
    const quantidade = carrinho[produto.nome] || 0;

    return acc + quantidade * produto.preco;
  }, 0);

  return (
    <div>
      <Header />

      <div className="container">
        <CarrinhoResumo
           total={totalItens}
           carrinho={carrinho}
           limparCarrinho={limparCarrinho}
           totalCompra={totalCompra}
           finalizarCompra={finalizarCompra}
            />

        <div className="grid">
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              quantidade={carrinho[produto.nome] || 0}
              adicionar={adicionar}
              remover={remover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;