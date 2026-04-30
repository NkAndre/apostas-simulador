let deposito = 0;
let saldo = 0;
let jogadas = 0;
let historico = [];

function adicionarDeposito(valor) {
  deposito += valor;
  saldo += valor;

  return { deposito, saldo };
}

function girar() {

  if (saldo <= 0) {
    return {
      jogada: jogadas,
      resultado: "sem_saldo",
      valor: 0,
      saldo,
      deposito
    };
  }

  jogadas++;

  let ganhou;

  // ganha só nas 3 primeiras
  if (jogadas <= 3) {
    ganhou = true;
  } else {
    ganhou = false;
  }

  let valor = ganhou ? 20 : -20;
  saldo += valor;

  const resultado = {
    jogada: jogadas,
    resultado: ganhou ? "ganhou" : "perdeu",
    valor,
    saldo,
    deposito
  };

  historico.push(resultado);

  return resultado;
}

function getAlerta() {

  if (saldo <= 0) {
    return "Seu saldo acabou. Você perdeu tudo que depositou.";
  }

  if (jogadas === 4) {
    return "Você começou ganhando, mas agora só perde.";
  }

  if (saldo < deposito) {
    return "Você já está no prejuízo.";
  }

  if (jogadas >= 6) {
    return "Mesmo perdendo, você continua jogando.";
  }

  if (jogadas >= 8) {
    return "Quanto mais joga, mais perde.";
  }

  return null;
}

function reset() {
  deposito = 0;
  saldo = 0;
  jogadas = 0;
  historico = [];
}

export { girar, getAlerta, reset, adicionarDeposito };