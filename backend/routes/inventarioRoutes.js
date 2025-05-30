const express = require('express');
const router = express.Router();
const inventario = require('../controllers/inventarioController');

router.get('/productos', inventario.getProductos);
router.post('/productos', inventario.agregarProducto);
router.delete('/productos/:id', inventario.eliminarProducto);

module.exports = router;
