# Backend API CRUD - Gestión de Productos

API RESTful desarrollada en Node.js y Express con persistencia de datos en SQLite. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una tabla de productos.

## 🚀 Tecnologías utilizadas

* **Node.js** - Entorno de ejecución para JavaScript.
* **Express.js** - Framework web para las rutas y controlador de peticiones HTTP.
* **SQLite / SQLite3** - Base de datos relacional ligera basada en archivo local.
* **CORS** - Middleware para permitir peticiones desde el frontend (React).

## 📁 Estructura del Proyecto

```text
├── config/        # Configuración y conexión a la base de datos
├── controllers/   # Lógica de negocio de la API
├── routes/        # Definición de las rutas/endpoints
├── index.js       # Punto de entrada de la aplicación
└── .gitignore     # Archivos excluidos del repositorio
Clonar Repositorio
1.- git clone [https://github.com/jagq68/backend-crud-ia.git](https://github.com/jagq68/backend-crud-ia.git)
cd backend-crud-ia
Instalar Dependencias
1.- npm install
Inicar Servidor
1.-npm start
📌 Endpoints de la API
Método,Ruta,Descripción
GET,/api/productos,Obtiene la lista completa de productos
GET,/api/productos/:id,Obtiene un producto por su ID
POST,/api/productos,Crea un nuevo producto
PUT,/api/productos/:id,Actualiza un producto existente
DELETE,/api/productos/:id,Elimina un producto por su ID
