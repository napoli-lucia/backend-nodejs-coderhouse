# Tercera entrega del Proyecto final

✓ Modificar nuestra capa de persistencia
para aplicar los conceptos de Factory
(opcional), DAO y DTO.

✓ El DAO seleccionado (por un parámetro
en línea de comandos como lo hicimos
anteriormente) será devuelto por una
Factory para que la capa de negocio
opere con él. (Factory puede ser
opcional)

✓ Implementar el patrón Repository para
trabajar con el DAO en la lógica de
negocio.

✓ Modificar la ruta /current Para evitar
enviar información sensible, enviar un
DTO del usuario sólo con la información
necesaria

✓ Realizar un middleware que pueda
trabajar en conjunto con la estrategia
“current” para hacer un sistema de
autorización y delimitar el acceso a
dichos endpoints:
- Sólo el administrador puede crear, actualizar y eliminar productos.
- Sólo el usuario puede enviar mensajes al chat.
- Sólo el usuario puede agregar productos a su carrito.

✓ Crear un modelo Ticket el cual contará
con todas las formalizaciones de la
compra. Éste contará con los campos
- Id (autogenerado por mongo)
- code: String debe autogenerarse y ser único
- purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
- amount: Number, total de la compra.
- purchaser: String, contendrá el correo del usuario asociado al carrito

✓ Implementar, en el router de carts, la ruta
/:cid/purchase, la cual permitirá finalizar el
proceso de compra de dicho carrito.
- La compra debe corroborar el stock del
producto al momento de finalizarse
* Si el producto tiene suficiente stock
para la cantidad indicada en el
producto del carrito, entonces
restarlo del stock del producto y
continuar.
* Si el producto no tiene suficiente
stock para la cantidad indicada en el
producto del carrito, entonces no
agregar el producto al proceso de
compra.
- Al final, utilizar el servicio de Tickets
para poder generar un ticket con los
datos de la compra.
- En caso de existir una compra no
completada, devolver el arreglo con los
ids de los productos que no pudieron
procesarse.

Una vez finalizada la compra, el carrito asociado
al usuario que compró deberá contener sólo los
productos que no pudieron comprarse. Es decir,
se filtran los que sí se compraron y se quedan
aquellos que no tenían disponibilidad.

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