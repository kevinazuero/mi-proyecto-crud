# API REST - Usuarios con Node.js y PostgreSQL

Sistema CRUD completo para gestión de usuarios desarrollado con Node.js, Express y PostgreSQL.

## 🚀 Tecnologías

- Node.js
- Express.js
- PostgreSQL
- CORS

## 📋 Requisitos previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## ⚙️ Instalación

1. Clonar el repositorio:

git clone https://github.com/kevinazuero/mi-proyecto-crud.git
```bash
cd mi-proyecto-crud
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar PostgreSQL:

Crear la siguiente base de datos en PgAdmin o psql:

usuarios_db

Dentro de la base de datos, ejecutar el siguiente script SQL para crear la tabla `usuarios`:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contraseña VARCHAR(100) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Configurar conexión en `src/config/db.js`:

Aqui se deben colocar las credenciales de su base de datos PostgreSQL:

```javascript
user: 'tu_usuario',
password: 'tu_contraseña',
```

## 🏃 Ejecución
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 📍 Endpoints

Puedes utilizar postman para probar los endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/usuarios | Listar todos los usuarios |
| GET | /api/usuarios/:id | Obtener usuario por ID |
| POST | /api/usuarios | Crear nuevo usuario |
| PUT | /api/usuarios/:id | Actualizar usuario |
| DELETE | /api/usuarios/:id | Eliminar usuario |

## 📦 Ejemplo de uso en Postman

### Crear usuario (POST):
```json
{
  "nombre": "María García",
  "correo": "maria@example.com",
  "contraseña": "password123"
}
```
