# API Makand

API backend del sistema Makand desarrollada con Node.js, Express y PostgreSQL siguiendo principios de Clean Architecture.

---

# Tecnologías utilizadas

- Node.js v22.18.0
- Express.js
- PostgreSQL
- pg
- dotenv

---

# Arquitectura del proyecto

La API está estructurada utilizando Clean Architecture para mantener separación de responsabilidades y facilitar el mantenimiento del proyecto.

---

# Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js v22.18.0 (no he probado con otra versión)
- PostgreSQL
- Git

---

# Instalación del proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/kron0zzz/Api_makand.git
```

---

## 2. Instalar dependencias

```bash
- npm install
```

---
## 3. Base de datos

Se debe crear la base de datos en PgAdmin con todas sus tablas y estructura (En este repositorio hay un script con la estructura de la DB). 

**Como aclaración, cuando entras a PgAdmin e ingresas la contraseña, automáticamente se levanta el servicio de postgres**


### Variables de entorno

Se debe ejecutar el siguiente archivo desde cmd e ingresar los datos para crear el .env:

```bash
setDb.bat
```




---

# Ejecutar la API

```bash
npm run dev
```

Si todo funciona correctamente deberá aparecer:

```txt
Servidor corriendo en puerto 3000
```

Y si pones en el navegador "localhost:3000" debería aparecer:

```txt
API Makand funcionando
```

---

# Endpoint de prueba  (postman)

## Obtener proveedores

```http
GET    localhost:3000/api/suppliers
```


---

# Herramientas recomendadas

## Cliente API

Se recomienda usar:

- Postman
- Thunder Client (instalado en las extensiones de VS Code)