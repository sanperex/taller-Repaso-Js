document.getElementById("btnMostrar").addEventListener("click", () => {
  const person = {
    name: 'Luna',
    age: 19,
    city: 'Medellin',
    profession: 'Desarrollador'
  };


  const { name, age, profession } = person;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <div class="alert alert-info">
      <strong>Nombre:</strong> ${name} <br>
      <strong>Edad:</strong> ${age} <br>
      <strong>Profesión:</strong> ${profession}
    </div>
  `;
});
