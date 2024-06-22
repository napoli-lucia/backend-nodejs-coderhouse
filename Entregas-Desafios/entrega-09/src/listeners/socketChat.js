import { MessageManager } from "../dao/db/messages.manager.js";

const messageManager = new MessageManager();

const socketChat = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("Cliente conectado: ", socket.id);
        socketServer.emit("messageLogs", await messageManager.getMessages());

        // Emite a todos los clientes conectados menos al nuevo usuario
        socket.on("nuevousuario",(usuario)=>{
          socket.broadcast.emit("new-user",usuario);
        });

        // Emite el mensaje a todos los clientes conectados
        socket.on("mensaje", async (info) => {
          await messageManager.createMessage(info);
           socketServer.emit("messageLogs", await messageManager.getMessages());
        })        

    });
}

export default socketChat;