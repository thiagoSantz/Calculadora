//#region Inicialização
// Para usar o display da calculadora no html
const calculadoraDisplay = document.getElementById("display");
const displayOperacao = document.getElementById("displayOperacao");

let numeroAnterior = "0";
let numeroAtual = "0";
let operacao = null;
let resultado = "0";
let novoNumeroDigitado = false;
let acabouDeCalcular = false;

let valorReal = "0";        // Número COMPLETO durante digitação
let valorDisplay = "0";     // Número formatado para mostrar

console.log("=== Calculadora Iniciada ===");
//#endregion

//BOTOES

//#region Numerais
//Para usar os botões de numero da calculadora
const botoesNumeros = document.querySelectorAll(
  ".Calculadora__conteudo__botoes--numero"
);

//E adicionar um "ouvinte" para cada um
botoesNumeros.forEach((botao) => {
  botao.addEventListener("click", function () {
    //Qualquer botão clicado se for numerico
    logicaNumerais(botao.textContent);
  });
});

//Uso das teclas do teclado.
document.addEventListener("keydown", function (event) {
  if (event.key >= "0" && event.key <= "9") {
    //numeros de 0 a 9 para tratar;
    logicaNumerais(event.key);
  } else if (event.key === "." || event.key === ",") {
    // Trata ponto decimal (ambos . e ,)
    logicaNumerais(".");
  }
});
//#endregion

//#region Operações
const botoesOperadores = document.querySelectorAll(
  ".Calculadora__conteudo__botoes--operador"
);
//---------------------------------------------
botoesOperadores.forEach((operador) => {
  operador.addEventListener("click", function () {
    //Botoes da calculadora operador
    logicaOperadores(operador.textContent);
  });
});

//Uso das teclas do teclado.
document.addEventListener("keydown", function (event) {
  if (event.key === "x" || event.key === "*") {
    logicaOperadores("x");
  } else if (event.key === "/") {
    logicaOperadores("/");
  } else if (event.key === "-") {
    logicaOperadores("-");
  } else if (event.key === "+") {
    logicaOperadores("+");
  }
});
//#endregion

//#region Inverter
const botaoInverter = document.querySelector(
  ".Calculadora__conteudo__botoes--inverter"
);

botaoInverter.addEventListener("click", function () {
  console.log("=== Apertei Inverter ===");

  let numeroParaInverter = calculadoraDisplay.textContent;

  // Diferente de 0 converte o número
  if (numeroParaInverter !== "0") {
    calculadoraDisplay.textContent = (
      Number(numeroParaInverter) * -1
    ).toString();
    valorReal = calculadoraDisplay.textContent; // ← FALTAVA
    numeroAtual = calculadoraDisplay.textContent;
    novoNumeroDigitado = true;

    console.log("=== Número invertido ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);
  }
});
//#endregion

//#region Botão de Igual
//botao da calculadora
const botaoIgual = document.querySelector(
  ".Calculadora__conteudo__botoes--igual"
);
//---------------------------------------------
botaoIgual.addEventListener("click", function () {
  console.log("=== Apertei Igual ===");
  apertarIgual();
});

//botao de teclado
document.addEventListener("keydown", function (event) {
  if (event.key === "=" || event.key === "Enter") {
    apertarIgual();
  }
});
//#endregion

//#region Botão Limpar
const botaolimpar = document.querySelector(
  ".Calculadora__conteudo__botoes--limpar"
);
//--------------------------------------
botaolimpar.addEventListener("click", function () {
  console.log("=== Apertei Limpar ===");
  calculadoraDisplay.textContent = "0";
  displayOperacao.textContent = "";
  resetParametros();
});

//botao de teclado
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Delete") {
    console.log("=== Apertei Limpar ===");
    calculadoraDisplay.textContent = "0";
    displayOperacao.textContent = "";
    resetParametros();
  }
});
//#endregion

//#region Botão Backspace
//botao da calculadora
const botaoBackspace = document.querySelector(
  ".Calculadora__conteudo__botoes--backspace"
);
//---------------------------------------------
botaoBackspace.addEventListener("click", function () {
  console.log("=== Apertei Backspace ===");
  apagarUltimoDigito();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    apagarUltimoDigito();
  }
});

//#endregion

//FUNÇÕES

//#region LogicaNumerais
function logicaNumerais(botaoDigitado) {
  const displayAtual = calculadoraDisplay.textContent;

  // VERIFICA SE DEVE SUBSTITUIR
  const deveSubstituir =
    displayAtual === "0" ||
    ["+", "-", "x", "/"].includes(displayAtual) ||
    acabouDeCalcular;

  console.log("=== Clique número ===");
  console.log("Display atual:", displayAtual);
  console.log("Numero anterior:", numeroAnterior);
  console.log("Deve substituir?", deveSubstituir);
  console.log("acabouDeCalcular:", acabouDeCalcular);
  console.log("Botão clicado:", botaoDigitado);

  if (acabouDeCalcular) {
    console.log("=== Resetou acabouDeCalcular ===");
    acabouDeCalcular = false;
    displayOperacao.textContent = ""; // Limpa operação anterior
  }

  if (deveSubstituir) {
    if (botaoDigitado === ".") {
      calculadoraDisplay.textContent = "0.";
      console.log("=== SUBSTITUIU por 0. ===");
    } else {
      //calculadoraDisplay.textContent = botaoDigitado;
      valorReal = botaoDigitado;
      calculadoraDisplay.textContent = gerenciarNumeroGrande(valorReal);
      console.log("=== SUBSTITUIU por número ===");
    }
  } else {
    if (botaoDigitado === ".") {
      if (!calculadoraDisplay.textContent.includes(".")) {
        //calculadoraDisplay.textContent += botaoDigitado;
        valorReal += botaoDigitado;
        calculadoraDisplay.textContent = gerenciarNumeroGrande(valorReal);
        console.log("=== CONCATENOU ponto ===");
      } else {
        console.log("=== Já tem ponto, ignorou ===");
      }
    } else {
      //calculadoraDisplay.textContent += botaoDigitado;
      valorReal += botaoDigitado;
      calculadoraDisplay.textContent = gerenciarNumeroGrande(valorReal);
      console.log("=== CONCATENOU número ===");
    }
  }
  
 // No final, antes de atualizar:
  //const numeroGerenciado = gerenciarNumeroGrande(calculadoraDisplay.textContent);

  //console.log("numeroGerenciado:", numeroGerenciado); // ← Veja o que retorna
  //console.log("valorDisplay:", numeroGerenciado.valorDisplay); // ← Veja isso

  //numeroAtual = numeroGerenciado.valorDisplay;
  //numeroAtual = calculadoraDisplay.textContent;
  numeroAtual = valorReal;
  novoNumeroDigitado = true;
  ajustarTamanhoFonte();

  console.log("=== DEPOIS do número ===");
  console.log("Display:", calculadoraDisplay.textContent);
  console.log("Display Operação:", displayOperacao.textContent);
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);
  console.log("novoNumeroDigitado:", novoNumeroDigitado);
  console.log("acabouDeCalcular:", acabouDeCalcular);
}
//#endregion

//#region Tamanho
function ajustarTamanhoFonte() {
  const display = calculadoraDisplay;
  const displayOp = displayOperacao;
  const comprimento = display.textContent.length;
  const comprimentoOP = displayOp.textContent.length;

  // Remove classes anteriores
  display.classList.remove("longo", "muito-longo", "medio");
  displayOp.classList.remove("longo", "muito-longo", "medio");

  // Adiciona classe baseada no comprimento
  if (comprimento > 16) {
    display.classList.add("muito-longo");
  } else if (comprimento > 12) {
    display.classList.add("longo");
  } else if (comprimento > 8) {
    display.classList.add("medio");
  }

    if (comprimentoOP > 16) {
    displayOp.classList.add("muito-longo");
  } else if (comprimentoOP > 12) {
    displayOp.classList.add("longo");
  } else if (comprimentoOP > 8) {
    displayOp.classList.add("medio");
  }
}

function formatarParaDisplay(valor) {
  const num = Number(valor);
  // Opção 1 - Notação científica
  return num.toExponential(2);
}

function gerenciarNumeroGrande(valor) {
  const num = Number(valor);
  // Detecta pelo VALOR, não pelo length da string
  if (!isNaN(num) && Math.abs(num) >= 1e15) {
    return num.toExponential(2); // Formata números >= 1.000.000.000.000.000
  }
  
  return valor; // Mantém original para números menores
}
//#endregion

//#region LogicaOperadores
function logicaOperadores(botaoOperador) {

  numeroAnterior = valorReal;

  console.log("=== Entrou Operador ===");
  console.log("Display:", calculadoraDisplay.textContent);
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);
  console.log("novoNumeroDigitado ANTES:", novoNumeroDigitado);
  console.log("acabouDeCalcular:", acabouDeCalcular);

  // Só calcula se digitou novo número
  if (operacao && novoNumeroDigitado) {
    console.log("=== Digitou novo número - VAI CALCULAR ===");
    resultado = calcularResultado();

    // MOSTRA OPERAÇÃO COMPLETA (ANTES de zerar a operacao)
    //displayOperacao.textContent =
    //numeroAnterior + " " + operacao + " " + numeroAtual;
    
    displayOperacao.textContent = 
    gerenciarNumeroGrande(numeroAnterior) + " " + operacao + " " + 
    gerenciarNumeroGrande(numeroAtual);
    
    //calculadoraDisplay.textContent = resultado;
    calculadoraDisplay.textContent = gerenciarNumeroGrande(resultado);
    ajustarTamanhoFonte();

    // ⬇️ AGORA ZERAR a operação DEPOIS de mostrar
    operacao = null;

    numeroAnterior = resultado.toString();
    console.log("=== Resultado do cálculo ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("Display Operação:", displayOperacao.textContent);
    console.log("numeroAnterior:", numeroAnterior);

  } else if (!operacao) {
    // Primeira operação
    console.log("=== Primeira operação - só salva número ===");
    numeroAnterior = calculadoraDisplay.textContent;

    // MOSTRA PRIMEIRA OPERAÇÃO
    //displayOperacao.textContent = numeroAnterior + " " + botaoOperador;

    displayOperacao.textContent = gerenciarNumeroGrande(numeroAnterior) + " " + botaoOperador;
    
    calculadoraDisplay.textContent = botaoOperador;
    ajustarTamanhoFonte();

    console.log("numeroAnterior salvo:", numeroAnterior);
    console.log("Display Operação:", displayOperacao.textContent);
  } else {
    console.log("=== Só atualiza operação ===");

    // ATUALIZA OPERAÇÃO
    //displayOperacao.textContent = numeroAnterior + " " + botaoOperador;

    displayOperacao.textContent = gerenciarNumeroGrande(numeroAnterior) + " " + botaoOperador;

    calculadoraDisplay.textContent = botaoOperador;
    ajustarTamanhoFonte();
    
    console.log("Display Operação:", displayOperacao.textContent);
  }

  novoNumeroDigitado = false;
  valorReal = "0";

  // ⬇️ Só atualiza a operação se não for um cálculo
  if (!(operacao && novoNumeroDigitado)) {
    operacao = botaoOperador;
  }
  console.log("=== DEPOIS do operador ===");
  console.log("Display:", calculadoraDisplay.textContent);
  console.log("Display Operação:", displayOperacao.textContent);
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);
  console.log("novoNumeroDigitado:", novoNumeroDigitado);
}

//#endregion

//#region Reset
function resetParametros() {
  numeroAnterior = "0";
  numeroAtual = "0";
  operacao = null;
  resultado = "0";
  novoNumeroDigitado = false;
  acabouDeCalcular = false;

  valorReal = "0";

  ajustarTamanhoFonte();

  console.log("=== Reset completo ===");
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);
  console.log("novoNumeroDigitado:", novoNumeroDigitado);
  console.log("acabouDeCalcular:", acabouDeCalcular);
}

function removeClassList() {

}
//#endregion

//#region ApertarIgual
function apertarIgual() {
  //---------------------------------------------
  if (operacao) {
    resultado = calcularResultado();
    // MOSTRA OPERAÇÃO FINAL
    //displayOperacao.textContent =
      //numeroAnterior + " " + operacao + " " + numeroAtual + " =";
    
    displayOperacao.textContent = 
    gerenciarNumeroGrande(numeroAnterior) + " " + operacao + " " + 
    gerenciarNumeroGrande(numeroAtual) + " =";
    
    //calculadoraDisplay.textContent = resultado;
    calculadoraDisplay.textContent = gerenciarNumeroGrande(resultado);

    //ADICIONADO RECENTE
    operacao = null;
    novoNumeroDigitado = false;

    //---------------------------------------------
    console.log("=== DEPOIS do igual ===");
    console.log("Display:", calculadoraDisplay.textContent);
    console.log("Display Operação:", displayOperacao.textContent);
    console.log("numeroAnterior:", numeroAnterior);
    console.log("numeroAtual:", numeroAtual);
    console.log("operacao:", operacao);
  }
  //---------------------------------------------
  novoNumeroDigitado = false;
  ajustarTamanhoFonte();
}
//#endregion

//#region Calcular resultado
function calcularResultado() {
  console.log("=== Calcular Resultado ===");
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("operacao:", operacao);

  const num1 = Number(numeroAnterior) || 0;
  const num2 = Number(numeroAtual) || 0;

  console.log("num1:", num1, "num2:", num2);

  if (operacao === "+") resultado = somar(num1, num2);
  else if (operacao === "-") resultado = subtrair(num1, num2);
  else if (operacao === "x") resultado = multiplicar(num1, num2);
  else if (operacao === "/") resultado = dividir(num1, num2);
  else resultado = num2;

  console.log("Resultado calculado:", resultado);

  numeroAnterior = resultado.toString();
  acabouDeCalcular = true;

  console.log("=== terminou calculo ===");
  console.log("numeroAnterior:", numeroAnterior);
  console.log("numeroAtual:", numeroAtual);
  console.log("acabouDeCalcular:", acabouDeCalcular);
  console.log("operacao:", operacao);

  return resultado;
}
//#endregion

//#region Apagar Ultimo Digito
function apagarUltimoDigito() {
  let displayAtual = calculadoraDisplay.textContent;
  // Se for operador - tratamento especial
  if (["+", "-", "x", "/"].includes(displayAtual)) {
    // O que fazer? Talvez voltar para o numeroAnterior?
    calculadoraDisplay.textContent = numeroAnterior;
    operacao = null; // Limpa a operação
    displayOperacao.textContent = ""; // Limpa display de operação
  }
  // Se for número - apaga último dígito normalmente
  else if (displayAtual.length > 1) {
    calculadoraDisplay.textContent = displayAtual.slice(0, -1);
    valorReal = calculadoraDisplay.textContent; // ← FALTAVA
  } else if (displayAtual.length === 1 && displayAtual !== "0") {
    calculadoraDisplay.textContent = "0";
    valorReal = "0"; // ← FALTAVA
  }
  // Atualiza numeroAtual em qualquer caso
  numeroAtual = calculadoraDisplay.textContent;
}
//#endregion

//#region Matemática
function somar(a, b) {
  let result = Number((a + b).toFixed(12));
  console.log("Somar:", a, "+", b, "=", result);
  return result;
}

function subtrair(a, b) {
  let result = Number((a - b).toFixed(12));
  console.log("Subtrair:", a, "-", b, "=", result);
  return result;
}

function multiplicar(a, b) {
  let result = Number((a * b).toFixed(12));
  console.log("Multiplicar:", a, "x", b, "=", result);
  return result;
}

function dividir(a, b) {
  if (b === 0) {
    console.log("Divisão por zero!");
    return "Erro: Divisão por zero";
  }
  let result = Number((a / b).toFixed(12));
  console.log("Dividir:", a, "/", b, "=", result);
  return result;
}
//#endregion
