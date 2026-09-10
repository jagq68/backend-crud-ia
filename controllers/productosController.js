const initDB = require('../config/db');

// OBTENER PRODUCTOS
const getProductos = async (req, res) => {
  try {
    const db = await initDB();
    const productos = await db.all('SELECT * FROM productos');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// CREAR PRODUCTO
const createProducto = async (req, res) => {
  try {
    const db = await initDB();
    const { nombre, precio } = req.body;
    const result = await db.run(
      'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
      [nombre, precio]
    );
    res.json({ id: result.lastID, nombre, precio });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

// ACTUALIZAR PRODUCTO
const updateProducto = async (req, res) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    const { nombre, precio } = req.body;
    await db.run(
      'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
      [nombre, precio, id]
    );
    res.json({ mensaje: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

// ELIMINAR PRODUCTO
const deleteProducto = async (req, res) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    await db.run('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
};