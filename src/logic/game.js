let saldo = 100;
let jogadas = 0;
let historico = [];

function girar() {

  // 🚫 trava quando saldo acaba
  if (saldo <= 0) {
    return {
      jogada: jogadas,
      resultado: "sem_saldo",
      valor: 0,
      saldo
    };
  }

  jogadas++;

  let ganhou;

  // 🎯 ganha só nas 3 primeiras
  if (jogadas <= 3) {
    ganhou = true;
  } else {
    ganhou = false; // depois só perde
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

  if (saldo <= 0) {
    return "Seu saldo acabou. O jogo foi encerrado.";
  }

  if (jogadas >= 4 && saldo < 100) {
    return "Agora você só perde. Percebeu o padrão?";
  }

  return null;
}

function reset() {
  saldo = 100;
  jogadas = 0;
  historico = [];
}

export { girar, getAlerta, reset };