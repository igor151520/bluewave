function ProdutoCard({ produto, quantidade, adicionar, remover }) {
  return (
    <div className="card">
      <img src={produto.imagem} alt={produto.nome} />

      <h3>{produto.nome}</h3>

      <div className="controls">
        <button onClick={() => remover(produto.nome)}>-</button>
        <span>{quantidade}</span>
        <button onClick={() => adicionar(produto.nome)}>+</button>
      </div>
    </div>
  );
}

export default ProdutoCard;