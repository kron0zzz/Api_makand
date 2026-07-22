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



# CORREO Y RECUPERACIÓN DE CONTRASEÑA
ejecutar en la consola:

npm install nodemailer


###  Configuración de .env
añadir debajo de lo que tenemos en el .env del backend las siguientes variables:

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-correo-personal@gmail.com
EMAIL_PASS=aqui-pegas-la-contrasena-de-16-caracteres-sin-espacios
FRONTEND_URL=http://localhost:5173


### PARA EL EMAIL_PASS
# Paso 1: Activar la Verificación en dos pasos (si no la tienes activa)
Entra a tu cuenta de Google en myaccount.google.com.

En el menú de la izquierda, haz clic en Seguridad.

Busca la sección "Cómo inicias sesión en Google" y asegúrate de que la Verificación en dos pasos esté Activa. (Si no lo está, actívala siguiendo los pasos que te indica Google).

# Paso 2: Generar la Contraseña de Aplicación
Una vez activada la verificación en dos pasos, haz lo siguiente:

Abre una pestaña nueva en tu navegador y entra directamente a este enlace oficial:
👉 https://myaccount.google.com/apppasswords

En el recuadro que dice "Nombre de la aplicación", escribe un nombre para identificarla (Makand).

Haz clic en el botón Crear.

Te aparecerá una ventana emergente con una contraseña de 16 caracteres (separada por espacios). Copia esa contraseña (es única y solo se muestra esa vez). 

# Esta contraseña es la que se pega en el campo EMAIL_PASS