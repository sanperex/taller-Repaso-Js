function verificarVocal(cadena) {
  return new Promise((resolve, reject) => {
    if (!cadena || cadena.length === 0) {
      reject("Cadena vacía");
      return;
    }

    let ultimoCaracter = cadena.charAt(cadena.length - 1);
    let vocales = "aeiouAEIOU";

    if (vocales.includes(ultimoCaracter)) {
      resolve(ultimoCaracter);
    } else {
      reject("El carácter no es una vocal");
    }
  });
}

function probarPromise() {
  const texto = document.getElementById("textoInput").value;
  const resultado = document.getElementById("resultado");

  verificarVocal(texto)
    .then(vocal => {
      resultado.textContent = "Termina en vocal: " + vocal;
      resultado.className = "text-success fw-bold fs-5";
    })
    .catch(error => {
      resultado.textContent = error;
      resultado.className = "text-danger fw-bold fs-5";
    });
}
