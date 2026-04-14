import { useState } from "react";
import Header from "./components/header";
import ProdutoCard from "./components/produtoCard";
import CarrinhoResumo from "./components/carrinhoResumo";
import { produtos } from "./data/produtos";
import "./styles/global.css";

function App() {
  const [carrinho, setCarrinho] = useState({});

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

  const totalItens = Object.values(carrinho).reduce(
    (acc, item) => acc + item,
    0
  );

  return (
    <div>
      <Header />

      <div className="container">
        <CarrinhoResumo total={totalItens} />

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