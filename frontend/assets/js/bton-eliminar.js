// Eliminar seleccionados
document.getElementById("eliminarSeleccionadosBtn").addEventListener("click", () => {
    const checks = document.querySelectorAll(".seleccion-item:checked");
    const indices = Array.from(checks).map(chk => parseInt(chk.dataset.index));
    inventario = inventario.filter((_, i) => !indices.includes(i));
    mostrarResultados(inputBox.value);
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const id = e.target.dataset.id; // Asegúrate que pasas el ID en los botones
    await window.electronAPI.eliminarInventario(id);
    // Recarga
    let resultados = await window.electronAPI.obtenerInventario();
    inventario = resultados;
    mostrarResultados();
  });
});
