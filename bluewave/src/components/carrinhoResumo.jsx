import { useState } from "react";

function CarrinhoResumo({
  total,
  carrinho,
  limparCarrinho,
  totalCompra,
  finalizarCompra,
}) {
  const carrinhoVazio = total === 0;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  function enviarCheckout(evento) {
    evento.preventDefault();

    if (nome.trim() === "" || email.trim() === "" || endereco.trim() === "") {
      setMensagem("Preencha todos os campos antes de finalizar a compra.");
      setTipoMensagem("erro");
      return;
    }

    setMensagem("Compra finalizada com sucesso!");
    setTipoMensagem("sucesso");

    finalizarCompra();

    setNome("");
    setEmail("");
    setEndereco("");
  }

  return (
    <div className="resumo">
      <h2>Carrinho</h2>

      <p>Total de itens: {total}</p>

      {carrinhoVazio ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="lista-carrinho">
            {Object.entries(carrinho).map(([nomeProduto, quantidade]) => {
              if (quantidade <= 0) return null;

              let preco = 0;

              if (nomeProduto === "Camiseta") preco = 79.9;
              if (nomeProduto === "Boné") preco = 59.9;
              if (nomeProduto === "Moletom") preco = 149.9;

              return (
                <p key={nomeProduto}>
                  {nomeProduto}: {quantidade} — R${" "}
                  {(preco * quantidade).toFixed(2)}
                </p>
              );
            })}
          </div>

          <h3>Total da compra: R$ {totalCompra.toFixed(2)}</h3>

          <form className="checkout" onSubmit={enviarCheckout}>
            <h2>Checkout</h2>

            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
            />

            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
            />

            <input
              type="text"
              placeholder="Digite seu endereço"
              value={endereco}
              onChange={(evento) => setEndereco(evento.target.value)}
            />

            <div className="dados-checkout">
              <h3>Dados do cliente</h3>
              <p>Nome: {nome || "Não informado"}</p>
              <p>Email: {email || "Não informado"}</p>
              <p>Endereço: {endereco || "Não informado"}</p>
            </div>

            <button type="submit">Finalizar compra</button>

            {mensagem && (
              <p className={`mensagem-checkout ${tipoMensagem}`}>
                {mensagem}
              </p>
            )}
          </form>

          <button onClick={limparCarrinho}>Limpar carrinho</button>
        </>
      )}
    </div>
  );
}

export default CarrinhoResumo;