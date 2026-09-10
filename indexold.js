const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Mi servidor backend en Node.js está funcionando! Hola Alberto Guatume falta el console.log');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el proyecto de Alberto Guatume http://localhost:${PORT}`);
});