let saldo = 100;
let jogadas = 0;
let historico = [];

function girar() {
  jogadas++;

  let ganhou;

  if (jogadas <= 2) {
    ganhou = true; // ilusão inicial
  } else {
    ganhou = Math.random() < 0.3;
  }

  let valor = ganhou ? 20 : -10;
  saldo += valor;

  const resultado = {
    jogada: jogadas,
    resultado: ganhou ? "ganhou" : "perdeu",
    valor,
    saldo
  };

  historico.push(resultado);
  return resultado;
}

function getAlerta() {
  if (jogadas >= 5 && saldo < 100) {
    return "Você está perdendo dinheiro. Esses jogos são feitos pra te prender.";
  }

  if (jogadas >= 10) {
    return "Percebeu o padrão? Quanto mais joga, mais perde.";
  }

  return null;
}

function reset() {
  saldo = 100;
  jogadas = 0;
  historico = [];
}

export { girar, getAlerta, reset };