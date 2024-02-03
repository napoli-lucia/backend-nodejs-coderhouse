// CLIENTE

// INICIAMOS LA CONEXION POR PARTE DEL CLIENTE

const socket = io();

//socket.emit(<Etiqueta del evento>, <Dato a enviar>)
socket.emit("nuevo-msg", "¡Hola, me estoy comunicando desde el front!");

socket.on("nuevo-msg", (data) => {
    console.log("Nuevo mensaje desde el servidor");
    console.log(data)
});

socket.emit("otro-evento", "Esta es otra comunicacion");

socket.emit("clase-coder", {profesor: "Rabin"});

socket.emit("data-perdida", "HOLAA");