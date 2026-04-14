import { useState } from "react";
import "./index.css";

import camiseta from "./assets/camiseta.jpeg";
import bone from "./assets/bone.jpeg";
import moletom from "./assets/moletom.jpeg";

function App() {
  const [carrinho, setCarrinho] = useState({});

  const produtos = [
    {
      id: 1,
      nome: "Camiseta",
      imagem: camiseta,
    },
    {
      id: 2,
      nome: "Boné",
      imagem: bone,
    },
    {
      id: 3,
      nome: "Moletom",
      imagem: moletom,
    },
  ];

  const adicionar = (nome) => {
    setCarrinho((prev) => ({
      ...prev,
      [nome]: (prev[nome] || 0) + 1,
    }));
  };

  const remover = (nome) => {
    setCarrinho((prev) => {
      if (!prev[nome]) return prev;

      return {
        ...prev,
        [nome]: prev[nome] - 1,
      };
    });
  };

  const totalItens = Object.values(carrinho).reduce(
    (acc, item) => acc + item,
    0
  );

  return (
    <div>
      <header className="header">
        <h1 className="logo">BlueWave 🌊</h1>
      </header>

      <div className="container">
        <h2>Total no carrinho: {totalItens}</h2>

        <div className="grid">
          {produtos.map((produto) => (
            <div className="card" key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />

              <h3>{produto.nome}</h3>

              <div className="controls">
                <button onClick={() => remover(produto.nome)}>-</button>
                <span>{carrinho[produto.nome] || 0}</span>
                <button onClick={() => adicionar(produto.nome)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;