const socket = io();

const input = document.getElementById("input");
const msg = document.getElementById("msg");

input.addEventListener("keydown", (e) => {
  //socket.emit("char", e.key)
  const {key} = e;
  if(key.length === 1 || key === "Backspace"){
    socket.emit("char", key)
  }
})


socket.on("msg", (data) => {
  if(data === "") msg.innerText = "..."
  else msg.innerText = data
})