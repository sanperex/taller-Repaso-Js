
function duplicarNumero(numero) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numero * 2);
    }, 2000);
  });
}


async function calcularDoble(numero) {
  const resultado = await duplicarNumero(numero);
  return resultado;
}


async function mostrarDoble() {
  const input = document.getElementById("numeroInput").value;
  const resultadoTexto = document.getElementById("resultado");

  if (input === "") {
    resultadoTexto.textContent = "Ingrese un número";
    resultadoTexto.className = "text-danger fw-bold";
    return;
  }

  resultadoTexto.textContent = "Calculando...";
  resultadoTexto.className = "text-primary fw-bold";

  const resultado = await calcularDoble(Number(input));

  resultadoTexto.textContent = "El doble es: " + resultado;
  resultadoTexto.className = "text-success fw-bold";
}
