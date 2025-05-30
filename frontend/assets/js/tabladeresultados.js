// Variables globales para ordenar
let columnaOrden = "";
let ordenAscendente = true;

function mostrarResultados(busqueda = "") {
  const tbody = document.querySelector("#resultados tbody");
  tbody.innerHTML = "";

  // Copiar inventario y filtrarlo si hay búsqueda
  let resultados = [...inventario];
  if (busqueda.trim() !== "") {
    resultados = resultados.filter(item =>
      item.codigo.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Ordenar si hay columna seleccionada
  if (columnaOrden) {
    resultados.sort((a, b) => {
      let valorA = a[columnaOrden].toLowerCase ? a[columnaOrden].toLowerCase() : a[columnaOrden];
      let valorB = b[columnaOrden].toLowerCase ? b[columnaOrden].toLowerCase() : b[columnaOrden];
      if (!isNaN(valorA) && !isNaN(valorB)) {
        // Si es numérico
        return ordenAscendente ? valorA - valorB : valorB - valorA;
      } else {
        // Si es alfabético
        if (valorA < valorB) return ordenAscendente ? -1 : 1;
        if (valorA > valorB) return ordenAscendente ? 1 : -1;
        return 0;
      }
    });
  } else {
    // Si no se ordena por columna, mostrar del más reciente al más viejo
    resultados.reverse();
  }

  resultados.forEach((item, index) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td><input type="checkbox" class="seleccion-item" data-index="${index}"></td>
      <td>${item.codigo}</td>
      <td><img src="${item.imagen}" width="50"></td>
      <td>${item.ubicacion}</td>
      <td>${item.potencia}</td>
      <td>${item.notas}</td>
      <td><button class="editar-btn" data-index="${index}">✏️</button></td>
    `;
    tbody.appendChild(fila);

    let formFila = document.createElement("tr");
    formFila.classList.add("fila-formulario");
    formFila.style.display = "none";
    formFila.innerHTML = `
      <td colspan="7">
        <form class="editar-form formulario">
          <div class="imagen-wrapper">
            <div class="imagen-inputs">
              <input type="file" class="imagen-file" accept="image/*" />
              <input type="text" class="imagen-url" placeholder="Enlace de imagen" value="${item.imagen}" />
            </div>
            <div class="imagen-preview-container">
              <img class="preview-imagen" src="${item.imagen}" alt="Vista previa" />
            </div>
          </div>
          <input type="text" value="${item.codigo}" placeholder="Código">
          <input type="text" value="${item.ubicacion}" placeholder="Ubicación">
          <input type="text" value="${item.potencia}" placeholder="Potencia">
          <input type="text" value="${item.notas}" placeholder="Notas">
          <div>
            <button class="btn-guardar">Guardar</button>
            <button class="btn-eliminar">Borrar</button>
            <button type="button" class="btn-cancelar">Cancelar</button>
          </div>
        </form>
      </td>
    `;
    tbody.appendChild(formFila);

    const editarBtn = fila.querySelector(".editar-btn");
    const imagenFileInput = formFila.querySelector(".imagen-file");
    const imagenUrlInput = formFila.querySelector(".imagen-url");
    const imagenPreview = formFila.querySelector(".preview-imagen");

    editarBtn.addEventListener("click", () => {
      formFila.style.display = formFila.style.display === "none" ? "table-row" : "none";
    });

    imagenFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          imagenPreview.src = event.target.result;
          imagenUrlInput.value = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    imagenUrlInput.addEventListener("input", () => {
      imagenPreview.src = imagenUrlInput.value;
    });

    formFila.querySelector(".btn-guardar").addEventListener("click", (e) => {
      e.preventDefault();
      const codigoInput = formFila.querySelector('input[placeholder="Código"]');
      const imagenInput = formFila.querySelector('.imagen-url');
      const ubicacionInput = formFila.querySelector('input[placeholder="Ubicación"]');
      const potenciaInput = formFila.querySelector('input[placeholder="Potencia"]');
      const notasInput = formFila.querySelector('input[placeholder="Notas"]');
      // Ajustar índice real (por el orden inverso)
      let realIndex = inventario.findIndex(inv => inv.codigo === item.codigo);
      inventario[realIndex] = {
        codigo: codigoInput.value,
        imagen: imagenInput.value,
        ubicacion: ubicacionInput.value,
        potencia: potenciaInput.value,
        notas: notasInput.value
      };
      mostrarResultados(inputBox.value);
    });

    formFila.querySelector(".btn-eliminar").addEventListener("click", (e) => {
      e.preventDefault();
      let realIndex = inventario.findIndex(inv => inv.codigo === item.codigo);
      inventario.splice(realIndex, 1);
      mostrarResultados(inputBox.value);
    });

    formFila.querySelector(".btn-cancelar").addEventListener("click", (e) => {
      e.preventDefault();
      formFila.style.display = "none";
    });
  });
}

// Lógica de ordenamiento al hacer clic en los encabezados
document.querySelectorAll("#resultados th").forEach(th => {
  th.addEventListener("click", () => {
    let columna = th.textContent.trim().toLowerCase();
    // Mapear nombres visibles a claves reales del objeto
    switch (columna) {
      case "código": columnaOrden = "codigo"; break;
      case "ubicación": columnaOrden = "ubicacion"; break;
      case "potencia": columnaOrden = "potencia"; break;
      case "notas": columnaOrden = "notas"; break;
      default: return; // no ordenar para el checkbox o "Editar"
    }
    // Alternar orden ascendente/descendente
    ordenAscendente = !ordenAscendente;
    mostrarResultados(inputBox.value);
  });
});
