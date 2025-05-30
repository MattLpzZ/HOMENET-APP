// Exportar a CSV
document.getElementById("exportarBtn").addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8," + ["Código,Imagen,Ubicación,Potencia,Notas"]
      .concat(inventario.map(i => `${i.codigo},${i.imagen},${i.ubicacion},${i.potencia},${i.notas}`))
      .join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventario.csv");
    document.body.appendChild(link);
    link.click();npm start

    document.body.removeChild(link);
  });