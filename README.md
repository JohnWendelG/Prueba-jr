# Prueba Técnica Jr - CRUD de Usuarios

Aplicación CRUD de usuarios con:

- **Backend:** Laravel (API REST)
- **Frontend:** React + Vite
- **Base de datos:** PostgreSQL
- **Base usada:** `PruebaGF`

---

## Contenido del repositorio

- `backend/` → Código fuente del backend (Laravel)
- `frontend/` → Código fuente del frontend (React)
- `README.md` → Instrucciones para ejecutar el proyecto
- `prueba_jr.sql` → Script SQL de la base de datos

---

## Requisitos

- PHP 8.1+  
- Composer  
- Node.js 18+ y npm  
- PostgreSQL  
- Git  

---

## 1 Configurar base de datos (PostgreSQL)

Crear la base:

```sql
CREATE DATABASE "PruebaGF";
2 Levantar Backend (Laravel)
2.1 Ir a la carpeta backend
cd backend

2.2 Instalar dependencias de PHP
composer install

2.3 Crear archivo de entorno .env desde el ejemplo
cp .env.example .env


En Windows PowerShell también puedes usar:

Copy-Item .env.example .env

2.4 Configurar conexión a PostgreSQL en backend/.env
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=PruebaGF
DB_USERNAME=postgres
DB_PASSWORD=TU_PASSWORD

2.5 Generar APP_KEY
php artisan key:generate

2.6 Ejecutar migraciones
php artisan migrate

2.7 Levantar servidor backend
php artisan serve


Backend disponible en:

http://127.0.0.1:8000

3 Levantar Frontend (React + Vite)
3.1 Ir a la carpeta frontend
cd frontend

3.2 Instalar dependencias de Node
npm install

3.3 Crear/editar archivo frontend/.env
VITE_API_URL=http://127.0.0.1:8000/api

3.4 Levantar servidor frontend
npm run dev


Frontend disponible en:

http://localhost:5173
(o el puerto que asigne Vite automáticamente)

4 Endpoints API expuestos (CRUD)

GET /api/usuarios → Consultar usuarios

POST /api/usuarios → Crear usuario

PUT /api/usuarios/{id} → Actualizar usuario

DELETE /api/usuarios/{id} → Eliminar usuario

5 Campos del formulario de usuario

identificación

nombre de usuario

apellidos

nombres

fecha de nacimiento

celular

teléfono

correo personal

estado civil

sexo

dirección / ubicación

6 Restaurar base desde script SQL (opcional)

Si quieres cargar la estructura/datos desde el archivo incluido:

psql -U postgres -d PruebaGF -f prueba_jr.sql

7 Ejecución rápida (resumen)
Terminal 1 (Backend)
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Terminal 2 (Frontend)
cd frontend
npm install
npm run dev

8 Verificación funcional mínima

Crear usuario desde el frontend ✅

Consultar usuarios (listado) ✅

Editar usuario ✅

Eliminar usuario ✅

9 Notas importantes

Si cambias variables en .env del frontend, reinicia npm run dev.

Si hay error de CORS, revisar backend/config/cors.php.

Asegúrate de tener backend y frontend corriendo al mismo tiempo.