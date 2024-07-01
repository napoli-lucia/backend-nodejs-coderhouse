# Práctica de integración sobre el ecommerce

✓ Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse
cada vez que el usuario realice un proceso de login y logout

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
- `GOOGLE_EMAIL` = El email con el que se registran las credenciales de Google. Ejemplo: `your_google_email`
- `GOOGLE_PSW` = La contraseña con la que se registran las credenciales de Google. Ejemplo: `your_google_credential_psw`
- `TIME_EXPIRE_JWT_SESSION` = Tiempo de expiración del token JWT para la sesión. Ejemplo: `30m`
- `TIME_EXPIRE_JWT_CHANGE_PSW` = Tiempo de expiración del token JWT para el cambio de contraseña. Ejemplo: `60m`


## Comandos
#### Para correr docker:
```
docker-compose up
```
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
