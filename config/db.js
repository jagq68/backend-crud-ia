const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

let db;

async function initDB() {
  if (!db) {
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
  return db;
}

module.exports = initDB;