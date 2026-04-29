let saldo = 100; // define o saldo inicial do jogador 

// aq o contador para registrar quantas vezes o botão foi clicado
let jogadas = 0;

// criei um arraay para listar os detalhes de cada rodada 
let historico = [];



function girar() {

  //incrementar o contador de jogadqas toda vez que a funçao é ativada
  jogadas++;

  let ganhou;


  // aqui comeca a manipulaçao do APP

  // isca/; se forem as duas primeiras jogadas iniciais, o jogador sempre vai vencer(ilusao)
  if (jogadas <= 2) {
    ganhou = true;
  } else {
    ganhou = Math.random() < 0.3; //  a partir da 3 rodada , a chance de vencer é de apns 30 %
  }
  //// se ganhou, recebe 20. se perdeu, retira 10 do saldo
  let valor = ganhou ? 20 : -10;
  saldo += valor;

  // cria um objeto com os dados desta rodada 
  const resultado = {
    jogada: jogadas,
    resultado: ganhou ? "ganhou" : "perdeu",
    valor,
    saldo
  };


  // salva o resultado no array de histórico
  historico.push(resultado);

  // retorna os dados da rodada para quem chamou a função
  return resultado;
}

function getAlerta() {
  if (jogadas >= 3 && saldo < 100) {
    return "Você está perdendo dinheiro. Esses jogos são feitos pra te prender.";
  }

  if (jogadas >= 6) {
    return "Percebeu o padrão? Quanto mais joga, mais perde.";
  }

  return null;
}

// reinicia todas as variáveis para o estado original (limpa o jogo) famosin buffer
function reset() {
  saldo = 100;
  jogadas = 0;
  historico = [];
}

// exporta as funções para serem usadas em outros arquivos do projeto
export { girar, getAlerta, reset };


