import { MessageManager } from "../dao/db/messages.manager.js";

const manager = new MessageManager();

const socketChat = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);
        socketServer.emit("messageLogs", await manager.getMessages());

        // Emite a todos los clientes conectados menos al nuevo usuario
        socket.on("nuevousuario",(usuario)=>{
          socket.broadcast.emit("new-user",usuario);
        });

        // Emite el mensaje a todos los clientes conectados
        socket.on("mensaje", async (info) => {
          await manager.createMessage(info);
           socketServer.emit("messageLogs", await manager.getMessages());
        })        

    });
}

export default socketChat;