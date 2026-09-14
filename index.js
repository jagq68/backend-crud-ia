// 1. Importar los módulos requeridos
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// 2. INICIALIZAR LA APLICACIÓN (Esto falta o está más abajo en tu archivo)
const app = express();

// 3. Aplicar middlewares (Helmet, CORS, Express JSON)
app.use(helmet());

// Configuración dinámica de CORS para localhost
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

// 4. Tus rutas (rutas de productos, clientes, etc.)
// app.use('/api/productos', rutasProductos);

// 5. Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});