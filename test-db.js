const pool = require('./src/config/db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa. Hora del servidor:', result.rows[0]);
    
    const usuarios = await pool.query('SELECT * FROM usuarios');
    console.log('Usuarios en la BD:', usuarios.rows);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testConnection();