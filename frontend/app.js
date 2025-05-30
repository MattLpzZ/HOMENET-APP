const tabla = document.querySelector('#productos-body');
const formulario = document.querySelector('#form-agregar');
const nombreInput = document.querySelector('#nombre');
const cantidadInput = document.querySelector('#cantidad');
const precioInput = document.querySelector('#precio');
const imagenInput = document.querySelector('#imagen');

const API_URL = 'http://localhost:5000/api/productos';

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  tabla.innerHTML = '';
  productos.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td><img src="${p.imagen}" width="60" /></td>
        <td>${p.nombre}</td>
        <td>${p.cantidad}</td>
        <td>${p.precio}</td>
        <td>
          <button onclick="eliminarProducto(${p.id})" class="btn eliminar">🗑️</button>
        </td>
      </tr>
    `;
  });
}

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevo = {
    nombre: nombreInput.value,
    cantidad: cantidadInput.value,
    precio: precioInput.value,
    imagen: imagenInput.value || './assets/placeholder.png'
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevo)
  });

  formulario.reset();
  cargarProductos();
});

async function eliminarProducto(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  cargarProductos();
}

cargarProductos();
