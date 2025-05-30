const agregarBtn = document.getElementById("agregarBtn");
const formularioAgregar = document.getElementById("formularioAgregar");
const formAgregar = document.getElementById("formAgregar");

// Usa la variable global si ya existe
window.inventario = window.inventario || [];

// Mostrar/ocultar el formulario al pulsar el botón
agregarBtn.addEventListener("click", () => {
  formularioAgregar.style.display = formularioAgregar.style.display === "none" ? "block" : "none";
});

// Guardar nuevo artículo
formAgregar.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevo = {
    codigo: document.getElementById("nuevoCodigo").value,
    imagen: document.getElementById("nuevaImagen").value,
    ubicacion: document.getElementById("nuevaUbicacion").value,
    potencia: document.getElementById("nuevaPotencia").value,
    notas: document.getElementById("nuevasNotas").value
  };

  if (!nuevo.codigo || !nuevo.imagen) {
    alert("El código y la imagen son obligatorios.");
    return;
  }

  window.inventario.unshift(nuevo);
  formAgregar.reset();
  formularioAgregar.style.display = "none";

  if (typeof mostrarResultados === "function") {
    const inputBox = document.getElementById("search");
    mostrarResultados(inputBox ? inputBox.value : "");
  }
});

// Borrar los campos del formulario
document.getElementById("btnBorrarFormulario").addEventListener("click", () => {
  formAgregar.reset();
});

  document.addEventListener("DOMContentLoaded", function () {
    const btnCancelar = document.getElementById("btnCancelarFormulario");
    const formularioAgregar = document.getElementById("formularioAgregar");

    if (btnCancelar && formularioAgregar) {
      btnCancelar.addEventListener("click", function () {
        formularioAgregar.style.display = "none";
      });
    }
  });

  async function buscarInventario(busqueda) {
  const res = await pool.query(
    "SELECT * FROM datos_homenet WHERE codigo ILIKE $1 ORDER BY id DESC",
    [`%${busqueda}%`]
  );
  return res.rows;
}
