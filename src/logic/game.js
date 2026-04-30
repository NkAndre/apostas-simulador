let saldo = 100;
let jogadas = 0;
let historico = [];

function girar() {

  //  trava quando saldo acaba
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

  //  ganha só nas 3 primeiras
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
    return "Seu saldo acabou. Esse é o destino final em todos jogos de aposta.";
  }

  if (jogadas === 4) {
    return "Percebeu que você começou ganhando? Isso não é sorte, é estratégia.";
  }

    if (saldo < 100 && jogadas >= 4) {
    return "Você já está no prejuízo, mas a tendência é continuar jogando.";
  }

    if (jogadas >= 6 && saldo > 0) {
    return "Mesmo perdendo, você continua. É assim que esses jogos te prendem.";
  }

  //  padrão revelado
  if (jogadas >= 8) {
    return "Quanto mais você joga, mais perde. Isso não é coincidência.";
  }


  return null;
}

function reset() {
  saldo = 100;
  jogadas = 0;
  historico = [];
}

export { girar, getAlerta, reset };