const baseDatos1 = [
  "Canadá", "EUA", "México", "Ecuador",
  "Brazil", "Argentina", "Uruguay"
];

const baseDatos2 = [
  "Japón", "Irán", "Corea del Sur",
  "Alemania", "Croacia", "España", "Inglaterra"
];

function normalizarTexto(texto) {
  return texto
    .toLowerCase() 
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, ""); 
}

function buscarPaisUI() {
  const paisInput = document.getElementById("paisInput").value.trim();
  const resultado = document.getElementById("resultadoPais");

  if (paisInput === "") {
    resultado.textContent = "Ingrese un país";
    resultado.className = "text-warning fw-bold fs-5";
    return;
  }

  const paisNormalizado = normalizarTexto(paisInput);

  function encontradoUI() {
    resultado.textContent = "País encontrado";
    resultado.className = "text-success fw-bold fs-5";
  }

  function noEncontradoUI() {
    resultado.textContent = "Dato no encontrado";
    resultado.className = "text-danger fw-bold fs-5";
  }

  // 🔥 Normalizamos también las bases de datos
  const encontradoEnBD1 = baseDatos1.some(pais =>
    normalizarTexto(pais) === paisNormalizado
  );

  const encontradoEnBD2 = baseDatos2.some(pais =>
    normalizarTexto(pais) === paisNormalizado
  );

  if (encontradoEnBD1 || encontradoEnBD2) {
    encontradoUI();
  } else {
    noEncontradoUI();
  }
}
