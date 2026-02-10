# Prueba Técnica Jr - CRUD de Usuarios

## Tecnologías
- Backend: Laravel (API REST)
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Base usada: PruebaGF

## Estructura
- `backend/` Código fuente Laravel
- `frontend/` Código fuente React
- `README.md` Instrucciones de ejecución
- `prueba_jr.sql` Script SQL de la base de datos

## Requisitos
- PHP 8.1+ y Composer
- Node.js 18+ y npm
- PostgreSQL
- Git

## Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
