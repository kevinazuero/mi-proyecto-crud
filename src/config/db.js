const { Pool } = require('pg');

// Configuración de conexión
const pool = new Pool({
  user: 'postgres',          // tu usuario de PostgreSQL
  host: 'localhost',
  database: 'usuarios_db',
  password: '1234', // CAMBIA ESTO por tu contraseña
  port: 5432,
});

// Probar conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos:', err.stack);
  }
  console.log('✅ Conexión exitosa a PostgreSQL');
  release();
});

module.exports = pool;