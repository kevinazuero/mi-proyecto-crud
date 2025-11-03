const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, correo, fecha_registro FROM usuarios ORDER BY id DESC'
    );
    res.json({
      success: true,
      data: result.rows,
      total: result.rowCount
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
});

// GET - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, nombre, correo, fecha_registro FROM usuarios WHERE id = $1',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener usuario',
      error: error.message
    });
  }
});

// POST - Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    
    // Validaciones básicas
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({
        success: false,
        mensaje: 'Todos los campos son obligatorios'
      });
    }
    
    // Insertar usuario
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING id, nombre, correo, fecha_registro',
      [nombre, correo, contraseña]
    );
    
    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    
    // Error de correo duplicado
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        mensaje: 'El correo ya está registrado'
      });
    }
    
    res.status(500).json({
      success: false,
      mensaje: 'Error al registrar usuario',
      error: error.message
    });
  }
});

// PUT - Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING id, nombre, correo',
      [nombre, correo, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Usuario actualizado',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar usuario',
      error: error.message
    });
  }
});

// DELETE - Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        mensaje: 'Usuario no encontrado'
      });
    }
    
    res.json({
      success: true,
      mensaje: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar usuario',
      error: error.message
    });
  }
});

module.exports = router;