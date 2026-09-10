const express = require('express');
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // <-- Importar rutas de clientes

const app = express();
app.use(express.json());

// Rutas de la API
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes); // <-- Registrar endpoint /api/clientes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});