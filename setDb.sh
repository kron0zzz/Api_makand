#!/bin/bash

clear
echo "=========================="
echo "CONFIGURACION de Database"
echo "=========================="
echo ""

# Pedir usuario (valor por defecto: postgres)
read -p "[+] Ingrese el usuario de PostgreSQL (enter para 'postgres'): " DB_USER
DB_USER=${DB_USER:-postgres}

# Pedir contraseña ocultando los caracteres por seguridad (-s)
read -s -p "[+] Ingrese la contraseña de PostgreSQL: " DB_PASSWORD
echo "" # Salto de línea después de la contraseña

# Pedir nombre de la base de datos
read -p "[+] Ingrese el nombre de la base de datos: " DB_NAME

# Puerto por defecto
DB_PORT=${DB_PORT:-5432}

echo ""

# Generar el archivo .env
cat <<EOF > .env
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}
PORT=3000
NODE_ENV=development
JWT_SECRET=cambiar_makand_secret_key
EOF

echo ""
echo "[+] Archivo .env creado correctamente."
echo ""

read -p "Presione Enter para continuar..."
