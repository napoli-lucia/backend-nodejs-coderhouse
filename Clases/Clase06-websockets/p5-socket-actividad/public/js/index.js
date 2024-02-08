const socket = io();

const form = document.getElementById("form-msg");
const allMessages = document.getElementById("all-messages");

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = form[0].value;
  console.log("🚀 ~ form.addEventListener ~ message:", message)
  socket.emit("new-msg", message)
})

socket.on("all-msgs", (data) => {
  allMessages.innerHTML = updateMessages(data)
})

function updateMessages(messages) {
  let newMessages = ""
  messages.forEach((msg) => {
    newMessages += (`<p> socketid: ${msg.socketid}, mensaje: ${msg.message} </p>`)
  })
  return newMessages
}