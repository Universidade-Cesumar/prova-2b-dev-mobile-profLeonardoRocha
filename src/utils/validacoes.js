// export function validarRetirada(estoqueAtual, quantidadeRetirada) {
//   return false; // Gabarito incompleto, só para o arquivo existir
// }

export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  // Bloqueia se a quantidade for negativa ou zero
  if (quantidadeRetirada <= 0) {
    return false;
  }
  // Bloqueia se tentar retirar mais do que tem no estoque
  if (quantidadeRetirada > estoqueAtual) {
    return false;
  }
  // Permite a retirada se estiver dentro do limite
  return true;
}