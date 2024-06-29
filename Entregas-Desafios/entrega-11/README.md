# Implementación de logger

✓ Primero, definir un sistema de niveles
que tenga la siguiente prioridad (de
menor a mayor):
debug, http, info, warning, error, fatal

✓ Después implementar un logger para
desarrollo y un logger para producción,
el logger de desarrollo deberá loggear a
partir del nivel debug, sólo en consola. Sin embargo, el logger del entorno
productivo debería loggear sólo a partir
de nivel info.

✓ Además, el logger deberá enviar en un
transporte de archivos a partir del nivel
de error en un nombre “errors.log”

✓ Agregar logs de valor alto en los puntos
importantes de tu servidor (errores,
advertencias, etc) y modificar los
console.log() habituales que tenemos
para que muestren todo a partir de
winston.

✓ Crear un endpoint /loggerTest que
permita probar todos los logs.

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

## Comandos
#### Para instalar las dependencias:
```
npm install
```

#### Para correr el proyecto:
```
npm run start:dev
```
```
npm run start:prod
```

#### Para correr las pruebas:
```
npm run test
```
