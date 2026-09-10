const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Utilizar las rutas modulares
app.use('/api/productos', productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});