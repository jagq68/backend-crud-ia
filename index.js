// 1. Importar los módulos requeridos
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// 2. Importar las rutas con los nombres exactos de tus archivos
const rutasProductos = require('./routes/productoRoutes'); 
const rutasClientes = require('./routes/clienteRoutes');

// 3. Inicializar la aplicación
const app = express();

// 4. Middlewares de Seguridad y Lectura de JSON
app.use(helmet());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const esLocalhost = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
    const esProduccion = process.env.CLIENT_URL && origin === process.env.CLIENT_URL;

    if (esLocalhost.test(origin) || esProduccion) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 5. Configuración de Endpoints
app.use('/api/productos', rutasProductos);
app.use('/api/clientes', rutasClientes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ status: 'OK', mensaje: 'API Backend activa' });
});

// 6. Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose correctamente en http://localhost:${PORT}`);
});