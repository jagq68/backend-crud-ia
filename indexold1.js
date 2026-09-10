const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = 3000;

app.use(express.json());

let db;

// Conexión e inicialización de la Base de Datos
async function initDB() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // Crear una tabla de prueba si no existe
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

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor y SQLite listos');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});