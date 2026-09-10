const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDB() {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  // 1. Estructura inicial de la tabla productos
  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio REAL NOT NULL
    );
  `);

  // 2. Creación de la tabla clientes
  await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identificacion TEXT UNIQUE NOT NULL,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      telefono TEXT,
      direccion TEXT,
      email TEXT UNIQUE NOT NULL,
      usuario TEXT UNIQUE NOT NULL,
      pais TEXT
    );
  `);

  // 3. Alteración de la tabla productos para agregar campos nuevos
  const alterQueries = [
    'ALTER TABLE productos ADD COLUMN cantidad INTEGER DEFAULT 0;',
    'ALTER TABLE productos ADD COLUMN imagen TEXT;',
    'ALTER TABLE productos ADD COLUMN descripcion TEXT;',
    'ALTER TABLE productos ADD COLUMN cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL;'
  ];

  for (const query of alterQueries) {
    try {
      await db.exec(query);
    } catch (error) {
      // Se ignora el error si las columnas ya existen
    }
  }

  return db;
}

module.exports = initDB;