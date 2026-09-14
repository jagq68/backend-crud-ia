const cors = require('cors');

// CORS dinámico: autoriza cualquier puerto de localhost en desarrollo
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