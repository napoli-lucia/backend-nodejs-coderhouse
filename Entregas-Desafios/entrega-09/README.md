# Reestructura de servidor

### Consigna
Con base en las clases previamente
vistas, realizar los cambios necesarios
en tu proyecto para que se base en un
modelo de capas.

### Aspectos a incluir
✓ El proyecto debe contar con capas de
routing, controlador, dao, con nuestras
vistas bien separadas y con las
responsabilidades correctamente
delegadas.

✓ Además, mover del proyecto todas las
partes importantes y
comprometedoras en un archivo .env
para poder leerlo bajo variables de
entorno en un archivo config.js

## Variables de entorno
Antes de instalar y correr el programa se debe configurar las variables de entorno.
Realizar una copia del archivo `.env template`, cambiandole el nombre a `.env`
- `PORT`= El puerto que usará el frontend. Recomendado: `8080`
- `API_PREFIX` = El prefijo para las rutas de la API. Recomendado: `api`
- `DB_NAME` = El nombre de la base de datos. Recomendado: `ecommerce`
- `DB_HOST` = El host donde se encuentra la base de datos. Recomendado: `localhost`
- `DB_PORT` = El puerto donde se encuentra la base de datos. Recomendado: `27017`
- `MONGO_URI` = La URI completa de conexión a MongoDB. Ejemplo: `mongodb+srv://user:password@codercluster.2ms9a6h.mongodb.net/`
- `SECRET_SESSION` = La clave secreta para las sesiones de usuario. Ejemplo: `your_secret_session_key`
- `GITHUB_CLIENT_ID` = El ID del cliente de GitHub para autenticación OAuth. Ejemplo: `your_github_client_id`
- `GITHUB_CLIENT_SECRET` = El secreto del cliente de GitHub para autenticación OAuth. Ejemplo: `your_github_client_secret`
- `SECRET_JWT` = La clave secreta para la generación de tokens JWT. Ejemplo: `your_jwt_secret_key`