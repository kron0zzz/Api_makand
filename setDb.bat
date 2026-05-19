@echo off

echo ==========================
echo CONFIGURACION de Database
echo ==========================

echo.

set /p DB_USER=Ingrese el usuario de PostgreSQL (enter para "postgres"): 
set /p DB_PASSWORD=Ingrese la contraseña de PostgreSQL: 
set /p DB_NAME=Ingrese el nombre de la base de datos: 

if "%DB_PORT%"=="" set DB_PORT=5432
if "%DB_USER%"=="" set DB_USER=postgres

echo.
echo Creando archivo .env...

(
echo DATABASE_URL=postgresql://%DB_USER%:%DB_PASSWORD%@localhost:5432/%DB_NAME%
echo PORT=3000
echo NODE_ENV=development
) > .env

echo.
echo Archivo .env creado correctamente.
echo.

type .env

echo.
echo Configuracion finalizada.

pause