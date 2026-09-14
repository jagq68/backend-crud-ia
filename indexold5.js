require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('rate-limit');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// CAPAS DE SEGURIDAD EN EL BACKEND
// ==========================================

// 1. HELMET: Protege las cabeceras HTTP y oculta que usas Express
app.use(helmet());

// 2. CORS RESTRICTIVO: Permite acceso solo a tu frontend (en desarrollo o producción)
const dominiosPermitidos = [
  'http://localhost:5173', // Puerto por defecto de Vite/React
  'http://localhost:5174', // Puerto por defecto de Vite/React
  'http://localhost:3000', // Puerto alternativo de React
  'http://localhost:5000'  // Puerto alternativo de React
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como llamadas internas o herramientas de prueba en desarrollo)
    if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por la política de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. RATE LIMITING: Previene ataques de fuerza bruta y saturación del servidor
const limitadorGeneral = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo de 15 minutos
  max: 100, // Límite de 100 peticiones por IP en esos 15 minutos
  message: { error: 'Demasiadas peticiones desde esta IP. Por favor intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Aplicar el limitador a todas las rutas de la API
app.use('/api/', limitadorGeneral);

// 4. LIMITAR EL TAMAÑO DE LOS JSON: Previene ataques de denegación de servicio por archivos gigantes
app.use(express.json({ limit: '10kb' })); 

// ==========================================
// CONEXIÓN A BASE DE DATOS Y RUTAS
// ==========================================

let db;

async function inicializarBaseDeDatos() {
  try {
    db = await open({
      filename: './database.db',
      driver: sqlite3.Database
    });

    console.log('✅ Base de datos SQLite conectada de forma segura.');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL
      )
    `);
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

inicializarBaseDeDatos();

// Endpoint GET (Seguro contra SQL Injection usando parámetros de SQLite)
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await db.all('SELECT id, nombre, precio FROM productos');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar datos.' });
  }
});

// Endpoint POST (Sanitización implícita con parámetros en la consulta)
app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;

  // Validación básica de entrada de datos
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es obligatorio y debe ser texto.' });
  }

  if (!precio || typeof precio !== 'number' || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número mayor a cero.' });
  }

  try {
    // PREVENCIÓN DE INYECCIÓN SQL: Uso de parámetros con '?'
    const resultado = await db.run(
      'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
      [nombre.trim(), precio]
    );

    res.status(201).json({ id: resultado.lastID, nombre, precio });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el producto.' });
  }
});

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🛡️ Servidor seguro ejecutándose en http://localhost:${PORT}`);
});