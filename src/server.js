const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Importar conexión

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡API de Usuarios funcionando!',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios'
    }
  });
});

// Rutas de usuarios
const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 API disponible en http://localhost:${PORT}/api/usuarios`);
});