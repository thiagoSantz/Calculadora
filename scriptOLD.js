//Para usar o display da calculadora no html
const calculadoraDisplay = document.getElementById("display");

let numeroAnterior = "0";
let numeroAtual = "0";
let operacao = null;
let resultado = "0";
let novoNumeroDigitado = false;

let acabouDeCalcular = false; // ⬅️ NOVA VARIÁVEL

/* //#region Botões de Numeros anterior
//Para usar os botões de numero da calculadora
const botoesNumeros = document.querySelectorAll(
  ".Calculadora__conteudo__botoes--numero"
);

//E adicionar um "ouvinte" para cada um
botoesNumeros.forEach((botao) => {
  botao.addEventListener("click", function () {
   
    const displayAtual = calculadoraDisplay.textContent;
    const temOperadores = ["+", "-", "×", "/"].includes(displayAtual);
      
    if (displayAtual === "0" || temOperadores) {
      // Se for zero OU um operador, SUBSTITUI
      if (botao.textContent === ".") {
        calculadoraDisplay.textContent = "0.";
        numeroAtual = calculadoraDisplay.textContent;
        novoNumeroDigitado = true;

        console.log("=== Setou . quando é 0 ou operador ===");
        console.log("Display:", calculadoraDisplay.textContent);
        console.log("numeroAnterior:", numeroAnterior);
        console.log("numeroAtual:", numeroAtual);
        console.log("operacao:", operacao);
      } else {
        calculadoraDisplay.textContent = botao.textContent;
        numeroAtual = calculadoraDisplay.textContent;
        novoNumeroDigitado = true;

        console.log("=== Setou n quando é zero ou operador ===");
        console.log("Display:", calculadoraDisplay.textContent);
        console.log("numeroAnterior:", numeroAnterior);
        console.log("numeroAtual:", numeroAtual);
        console.log("operacao:", operacao);
      }
    } else {
      if (botao.textContent === ".") {
        // Só adiciona ponto se NÃO tiver ponto ainda
        if (!calculadoraDisplay.textContent.includes(".")) {
          calculadoraDisplay.textContent += botao.textContent;
          numeroAtual = calculadoraDisplay.textContent;
          novoNumeroDigitado = true;

          console.log("=== Setou . quando não havia ===");
          console.log("Display:", calculadoraDisplay.textContent);
          console.log("numeroAnterior:", numeroAnterior);
          console.log("numeroAtual:", numeroAtual);
          console.log("operacao:", operacao);
        }
        // Se já tem ponto, não faz nada (já está correto!)
      } else {
        // Para números normais, sempre adiciona
        calculadoraDisplay.textContent += botao.textContent;
        numeroAtual = calculadoraDisplay.textContent;
        novoNumeroDigitado = true;

        console.log("=== Setou numero que não é . ===");
        console.log("Display:", calculadoraDisplay.textContent);
        console.log("numeroAnterior:", numeroAnterior);
        console.log("numeroAtual:", numeroAtual);
        console.log("operacao:", operacao);
      }
    }
  });
});
//#endregion */

//#region Botões de Numeros
const botoesNumeros = document.querySelectorAll(".Calculadora__conteudo__botoes--numero");

botoesNumeros.forEach((botao) => {
  botao.addEventListener("click", function () {
    const displayAtual = calculadoraDisplay.textContent;

    // DEBUG DETALHADO
    console.log("=== DEBUG OPERADOR ===");
    console.log("Display atual:", displayAtual);
    console.log("Tipo do display:", typeof displayAtual);
    console.log("Caracteres no display:", Array.from(displayAtual).map(c => c.charCodeAt(0)));
    console.log("Array de operadores:", ["+", "-", "×", "/"].map(op => Array.from(op).map(c => c.charCodeAt(0))));
    
    const ehOperador = ["+", "-", "×", "/"].includes(displayAtual);
    console.log("É operador?", ehOperador);

    const deveSubstituir = displayAtual === "0" || ehOperador || acabouDeCalcular;

    console.log("=== Clique número ===");
    console.log("Display atual:", displayAtual);
    console.log("Deve substituir?", deveSubstituir);
    console.log("acabouDeCalcular:", acabouDeCalcular);
    console.log("Botão clicado:", botao.textContent);

    // ... resto do código
  });
});
//#endregion

/* //#region Botoes de operação anterior
const botoesOperadores = document.querySelectorAll(
  ".Calculadora__conteudo__botoes--operador"
);

botoesOperadores.forEach((operador) => {
  operador.addEventListener("click", function () {
    console.log("=== Entrou Operador ===");

    // CASO 1: Não digitou novo número - só atualiza operação
    if (operacao && !novoNumeroDigitado) {
      operacao = operador.textContent;
      calculadoraDisplay.textContent = operador.textContent; // ⬅️ MOSTRA OPERADOR

      console.log("=== Não digitou novo número ===");
      console.log("Display:", calculadoraDisplay.textContent);
      console.log("numeroAnterior:", numeroAnterior);
      console.log("numeroAtual:", numeroAtual);
      console.log("operacao:", operacao);

      return;
    }

    // CASO 2: Digitou novo número - cálculo normal
    numeroAtual = calculadoraDisplay.textContent;

    console.log("=== Digitou novo numero ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);

    let houveCalculo = false;

    //Se tem operação faz o calculo antes
    if (operacao) {
      resultado = calcularResultado();
      calculadoraDisplay.textContent = resultado;
      numeroAnterior = resultado.toString();
      houveCalculo = true;

      console.log("=== Tem operação anterior ===");
      console.log("Display:", calculadoraDisplay.textContent);
      console.log("numeroAnterior:", numeroAnterior);
      console.log("numeroAtual:", numeroAtual);
      console.log("operacao:", operacao);
    } else {
      numeroAnterior = calculadoraDisplay.textContent;
      console.log("=== Não tem operação anterior ===");
      console.log("Display:", calculadoraDisplay.textContent);
      console.log("numeroAnterior:", numeroAnterior);
      console.log("numeroAtual:", numeroAtual);
      console.log("operacao:", operacao);
    }

    operacao = operador.textContent;

    // Só mostra operador se NÃO houve cálculo
    if (!houveCalculo) {
      calculadoraDisplay.textContent = operador.textContent; // ⬅️ MOSTRA OPERADOR
    }

    novoNumeroDigitado = false;
  });
});

/* botoesOperadores.forEach((operador) => {
  operador.addEventListener("click", function () {
    console.log("=== Apertei Operador ===");

    // Se JÁ EXISTE uma operação em andamento, calcula primeiro
    if (operacao && numeroAnterior !== 0) {
      console.log("ANTES de calcularResultado - operacao:", operacao);
      resultado = calcularResultado();
      console.log("DEPOIS de calcularResultado - operacao:", operacao); // ⬅️ O que aparece aqui?

      calculadoraDisplay.textContent = resultado;

      console.log("=== Já existe operação ===");
      console.log("numeroAnterior:", numeroAnterior);
      console.log("numeroAtual:", numeroAtual);
      console.log("operacao:", operacao);

      numeroAnterior = resultado.toString();
      // Sempre atualiza a operação para a nova
      operacao = operador.textContent;
    } else {
      // Primeira operação - só salva o número
      numeroAnterior = calculadoraDisplay.textContent;

      console.log("=== Não tem operação anterior ===");
      console.log("numeroAnterior:", numeroAnterior);
      console.log("numeroAtual:", numeroAtual);
      console.log("operacao:", operacao);

      // Sempre atualiza a operação para a nova
      operacao = operador.textContent;
      // Prepara para próximo número
      calculadoraDisplay.textContent = operador.textContent;
    }
    numeroAtual = calculadoraDisplay.textContent;
  });
}); */

//#endregion */

//#region Botoes de operação
const botoesOperadores = document.querySelectorAll(
  ".Calculadora__conteudo__botoes--operador"
);

botoesOperadores.forEach((operador) => {
  operador.addEventListener("click", function () {
    // ⬅️ CORREÇÃO: NO INÍCIO
    novoNumeroDigitado = false;

    console.log("=== Entrou Operador ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);
    console.log("novoNumeroDigitado:", novoNumeroDigitado);

    // CASO 1: Não digitou novo número
    if (operacao && !novoNumeroDigitado) {
      // ⬅️ SÓ ATUALIZA OPERAÇÃO, NÃO CALCULA
      console.log("=== Só atualiza operação ===");
      operacao = operador.textContent;
      calculadoraDisplay.textContent = operador.textContent;
      return;
    }

    // CASO 2: Digitou novo número - cálculo normal
    console.log("=== Digitou novo numero ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);

    numeroAtual = calculadoraDisplay.textContent;

    if (operacao) {
      resultado = calcularResultado();
      calculadoraDisplay.textContent = resultado;
      numeroAnterior = resultado.toString();
      console.log("=== Tem operação anterior ===");
    } else {
      numeroAnterior = calculadoraDisplay.textContent;
      console.log("=== Não tem operação anterior ===");
    }

    operacao = operador.textContent;
    calculadoraDisplay.textContent = operador.textContent;

    console.log("=== DEPOIS do operador ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);
  });
});
//#endregion

//#region Botão de inverter
const botaoInverter = document.querySelector(
  ".Calculadora__conteudo__botoes--inverter"
);

botaoInverter.addEventListener("click", function () {
  let numeroParaInverter = calculadoraDisplay.textContent;
  //diferente de 0 converte o número
  if (numeroParaInverter !== "0") {
    calculadoraDisplay.textContent = numeroParaInverter * -1;
  }
});
//#endregion

//#region Botao de Igual
const botaoIgual = document.querySelector(
  ".Calculadora__conteudo__botoes--igual"
);

botaoIgual.addEventListener("click", function () {
  console.log("=== Apertei Igual ===");

  resultado = calcularResultado();
  calculadoraDisplay.textContent = resultado;
  novoNumeroDigitado = false;
});
//#endregion

//FUNÇÕES

//#region Logica do limpar
const botaolimpar = document.querySelector(
  ".Calculadora__conteudo__botoes--limpar"
);

botaolimpar.addEventListener("click", function () {
  calculadoraDisplay.textContent = 0;
  resetParametros();
});
//#endregion

//#region Reset
function resetParametros() {
  numeroAnterior = 0;
  numeroAtual = 0;
  operacao = 0;
  resultado = 0;
  novoNumeroDigitado = false;
  acabouDeCalcular = false; // ⬅️ ADICIONAR AQUI TAMBÉM

  console.log("=== Apertei Limpar ===");
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);
}
//#endregion

//#region Calcular resultado
function calcularResultado() {
  console.log("=== Calcular Resultado ===");

  numeroAtual = calculadoraDisplay.textContent;

  const num1 = Number(numeroAnterior) || 0;
  const num2 = Number(numeroAtual) || 0;

  if (operacao === "+") resultado = somar(num1, num2);
  else if (operacao === "-") resultado = subtrair(num1, num2);
  else if (operacao === "x") resultado = multiplicar(num1, num2);
  else if (operacao === "/") resultado = dividir(num1, num2);
  else resultado = num2;

  calculadoraDisplay.textContent = resultado;
  numeroAnterior = resultado.toString();

  acabouDeCalcular = true; // ⬅️ MARCA QUE ACABOU DE CALCULAR

  console.log("=== terminou calculo ===");
  console.log("Display:", calculadoraDisplay.textContent);
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("acabouDeCalcular:", acabouDeCalcular);
  operacao = 0;
  console.log("operacao:", operacao);

  return resultado;
}
//#endregion

//#region Operações
function somar(a, b) {
  let resultLocal = a + b;
  //Corrige floating point
  return Number(resultLocal.toFixed(12));
}

function subtrair(a, b) {
  let resultLocal = a - b;
  return Number(resultLocal.toFixed(12));
}

function multiplicar(a, b) {
  let resultLocal = a * b;
  return Number(resultLocal.toFixed(12));
}

function dividir(a, b) {
  if (b === 0) {
    return "Erro: Divisão por zero";
  }
  let resultLocal = a / b;
  return Number(resultLocal.toFixed(12));
}

function potencia(base, expoente) {
  return Math.pow(base, expoente);
}

function media3Numeros(a, b, c) {
  return (a + b + c) / 3;
}
//#endregion
