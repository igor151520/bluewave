function CarrinhoResumo({
  total,
  carrinho,
  limparCarrinho,
  totalCompra,
  finalizarCompra,
}) {
  const carrinhoVazio = total === 0;

  return (
    <div className="resumo">
      <h2>Carrinho</h2>

      <p>Total de itens: {total}</p>

      {carrinhoVazio ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="lista-carrinho">
            {Object.entries(carrinho).map(([nome, quantidade]) => {
              if (quantidade <= 0) return null;

              let preco = 0;

              if (nome === "Camiseta") preco = 79.9;
              if (nome === "Boné") preco = 59.9;
              if (nome === "Moletom") preco = 149.9;

              return (
                <p key={nome}>
                  {nome}: {quantidade} — R$ {(preco * quantidade).toFixed(2)}
                </p>
              );
            })}
          </div>

          <h3>Total da compra: R$ {totalCompra.toFixed(2)}</h3>

          <button onClick={limparCarrinho}>
            Limpar carrinho
          </button>

          <button onClick={finalizarCompra}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}

export default CarrinhoResumo;