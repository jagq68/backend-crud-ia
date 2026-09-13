const express = require('express');
const cors = require('cors'); // <-- 1. Importar cors
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // <-- Importar rutas de clientes

const app = express();
app.use(cors()); // <-- 2. Habilitar CORS para permitir peticiones desde React
app.use(express.json());

// Rutas de la API
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes); // <-- Registrar endpoint /api/clientes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});