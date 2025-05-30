const pool = require('../db');

exports.getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};

exports.agregarProducto = async (req, res) => {
  const { nombre, cantidad, precio, imagen } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, cantidad, precio, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, cantidad, precio, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto.' });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
};
