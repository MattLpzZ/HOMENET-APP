const inputBox = document.getElementById("busqueda-input");
inputBox.addEventListener("input", async () => {
  const valorBusqueda = inputBox.value;
  let resultados = await window.electronAPI.buscarInventario(valorBusqueda);
  inventario = resultados; // actualiza la tabla con los resultados filtrados
  mostrarResultados();
});
