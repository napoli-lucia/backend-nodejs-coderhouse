# Práctica de integración sobre el ecommerce

✓ Realizar un sistema de recuperación de
contraseña, la cual envíe por medio de un
correo un botón que redireccione a una página
para restablecer la contraseña (no
recuperarla)
- link del correo debe expirar después de 1 hora de enviado.
- Si se trata de restablecer la contraseña
con la misma contraseña del usuario,
debe impedirlo e indicarle que no se
puede colocar la misma contraseña
- Si el link expiró, debe redirigir a una vista
que le permita generar nuevamente el
correo de restablecimiento, el cual
contará con una nueva duración de 1
hora.

✓ Establecer un nuevo rol para el schema del
usuario llamado “premium” el cual estará
habilitado también para crear productos

✓ Modificar el schema de producto para contar
con un campo “owner”, el cual haga referencia
a la persona que creó el producto
- Si un producto se crea sin owner, se
debe colocar por defecto “admin”.
- El campo owner deberá guardar sólo el
correo electrónico (o _id, lo dejamos a
tu conveniencia) del usuario que lo haya
creado (Sólo podrá recibir usuarios
premium)

✓ Modificar los permisos de modificación y
eliminación de productos para que:
- Un usuario premium sólo pueda borrar
los productos que le pertenecen.
- El admin pueda borrar cualquier
producto, aún si es de un owner.

✓ Además, modificar la lógica de carrito para que
un usuario premium NO pueda agregar a su
carrito un producto que le pertenece.

✓ Implementar una nueva ruta en el router de
api/users, la cual será
/api/users/premium/:uid la cual permitirá
cambiar el rol de un usuario, de “user” a
“premium” y viceversa.

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
