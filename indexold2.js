const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); // Permite peticiones desde tu Frontend React

let db;

async function initDB() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL
    )
  `);

  console.log('Base de datos SQLite conectada correctamente');
}

initDB();

// 1. OBTENER TODOS LOS PRODUCTOS (READ)
app.get('/api/productos', async (req, res) => {
  const productos = await db.all('SELECT * FROM productos');
  res.json(productos);
});

// 2. CREAR UN PRODUCTO (CREATE)
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;
  const result = await db.run(
    'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
    [nombre, precio]
  );
  res.json({ id: result.lastID, nombre, precio });
});

// 3. ACTUALIZAR UN PRODUCTO (UPDATE)
app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  await db.run(
    'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
    [nombre, precio, id]
  );
  res.json({ mensaje: 'Producto actualizado con éxito' });
});

// 4. ELIMINAR UN PRODUCTO (DELETE)
app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM productos WHERE id = ?', [id]);
  res.json({ mensaje: 'Producto eliminado con éxito' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});