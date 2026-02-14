
const studentForm = document.getElementById("studentForm");
const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const email = document.getElementById("email");
const studentId = document.getElementById("studentId");

const btnAdd = document.getElementById("btnAdd");
const btnUpdate = document.getElementById("btnUpdate");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");
const btnExportar = document.getElementById("btnExportar");

const tbody = document.querySelector("tbody");


btnUpdate.classList.add("d-none");
document.addEventListener("DOMContentLoaded", renderTable);


function camposVacios() {
  if (
    nombre.value.trim() === "" ||
    documento.value.trim() === "" ||
    email.value.trim() === ""
  ) {
    alert("Todos los campos son obligatorios.");
    return true;
  }
  return false;
}

function addData() {
  if (camposVacios()) return;

  const data = JSON.parse(localStorage.getItem("students")) || [];

  
  const existe = data.some(student =>
    student.email === email.value || student.documento === documento.value
  );

  if (existe) {
    alert("Error: El correo electrónico o el número de documento ya existen.");
    return;
  }

  const newStudent = {
    nombre: nombre.value,
    documento: documento.value,
    email: email.value
  };

  data.push(newStudent);
  localStorage.setItem("students", JSON.stringify(data));

  resetForm();
  renderTable();
}


function renderTable() {
  const data = JSON.parse(localStorage.getItem("students")) || [];
  tbody.innerHTML = "";

  if (data.length === 0) return;

  data.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.email}</td>
        <td>${item.nombre}</td>
        <td>${item.documento}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editData(${index})">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteData(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}


function deleteData(index) {
  const data = JSON.parse(localStorage.getItem("students")) || [];

  if (!confirm("¿Seguro que deseas eliminar este registro?")) return;

  data.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(data));
  renderTable();
}


function editData(index) {
  const data = JSON.parse(localStorage.getItem("students")) || [];
  const student = data[index];

  studentId.value = index;
  nombre.value = student.nombre;
  documento.value = student.documento;
  email.value = student.email;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}


btnUpdate.addEventListener("click", () => {
  if (camposVacios()) return;

  const data = JSON.parse(localStorage.getItem("students")) || [];
  const index = studentId.value;

  
  const existe = data.some((student, i) =>
    i != index &&
    (student.email === email.value || student.documento === documento.value)
  );

  if (existe) {
    alert("Error: El correo electrónico o el número de documento ya existen.");
    return;
  }

  data[index] = {
    nombre: nombre.value,
    documento: documento.value,
    email: email.value
  };

  localStorage.setItem("students", JSON.stringify(data));
  resetForm();
  renderTable();
});


btnBorrarTodo.addEventListener("click", () => {
  if (!confirm("¿Deseas eliminar TODOS los registros?")) return;
  localStorage.removeItem("students");
  renderTable();
});


btnExportar.addEventListener("click", () => {
  const data = localStorage.getItem("students");

  if (!data) {
    alert("No hay datos para exportar");
    return;
  }

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "students.json";
  a.click();

  URL.revokeObjectURL(url);
});


function resetForm() {
  studentForm.reset();
  studentId.value = "";
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}




//Actividad 1: Agregar una función para eliminar y editar registros de la tabla. Cada fila de la tabla debe tener un botón "Eliminar" que, al hacer clic, elimine el registro correspondiente tanto de la tabla como del almacenamiento local.
//Actividad 2: Validar que el correo electrónico y el número de documento sean únicos antes de agregar un nuevo registro. Si ya existe un registro con el mismo correo electrónico o número de documento, mostrar un mensaje de error y no agregar el nuevo registro.

/* Actividad 3: 
1. Dado los siquientes arrays:  
baseDatos1=[‘Canada’, ‘EUA’, ‘Mexico’,‘Ecuador, ‘Brazil’, ‘Argentina’, ‘Uruguay’]
baseDatos2 =[‘Japón’, ‘Irán’, ‘Corea del Sur’, ‘Alemania’, ‘Croacia’, ‘España’, ‘Inglaterra’]

Implementar una función busquedaBaseDatos1 que busque en baseDatos1 un país, y si lo encuentra retorne con un call back a la función encontrado la cual debe imprimir el mensaje ‘pais encontrado’.
Si el dato NO se encontró en baseDatos1 deberá retornar con un callback a la función busquedaBaseDatos2, y si lo encuentra retornar con un callback a la función encontrado la cual debe imprimir el mensaje ‘Pais encontrado’.
Si el dato NO se encontró en baseDatos2 deberá mostrar el mensaje ‘Dato no encontrado’
*/
