const initDB = require('../config/db');

// OBTENER CLIENTES
const getClientes = async (req, res) => {
  try {
    const db = await initDB();
    const clientes = await db.all('SELECT * FROM clientes');
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
  }
};

// CREAR CLIENTE
const createCliente = async (req, res) => {
  try {
    const db = await initDB();
    const { identificacion, nombres, apellidos, telefono, direccion, email, usuario, pais } = req.body;
    
    const result = await db.run(
      `INSERT INTO clientes (identificacion, nombres, apellidos, telefono, direccion, email, usuario, pais) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [identificacion, nombres, apellidos, telefono, direccion, email, usuario, pais]
    );

    res.json({ id: result.lastID, identificacion, nombres, apellidos, email });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message });
  }
};

// ACTUALIZAR CLIENTE
const updateCliente = async (req, res) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    const { identificacion, nombres, apellidos, telefono, direccion, email, usuario, pais } = req.body;

    await db.run(
      `UPDATE clientes 
       SET identificacion = ?, nombres = ?, apellidos = ?, telefono = ?, direccion = ?, email = ?, usuario = ?, pais = ? 
       WHERE id = ?`,
      [identificacion, nombres, apellidos, telefono, direccion, email, usuario, pais, id]
    );

    res.json({ mensaje: 'Cliente actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error: error.message });
  }
};

// ELIMINAR CLIENTE
const deleteCliente = async (req, res) => {
  try {
    const db = await initDB();
    const { id } = req.params;
    await db.run('DELETE FROM clientes WHERE id = ?', [id]);
    res.json({ mensaje: 'Cliente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
  }
};

module.exports = {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente
};