const socket = io();

const form = document.getElementById("create-product");
const realProducts = document.getElementById("real-products");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const prod = form[0].value;
    console.log("🚀 ~ form.addEventListener ~ prod:", prod)
    socket.emit("new-prod", prod)
  })

/*
let title = document.getElementById("title")
let description = document.getElementById("description")
let code = document.getElementById("code")
let stock = document.getElementById("stock")
let category = document.getElementById("category")
let price = document.getElementById("price")

btn.addEventListener("click", function(){
    socket.emit("products", {
        title: title.value,
        description: description.value,
        code: code.value,
        stock: stock.value,
        category: category.value,
        price: price.value,
    });
});

socket.on("products", function (data) {
    output.innerHTML += `
    <ul>
        <li>ID: ${data.id}</li>
        <li>Titulo: ${data.title}</li>
        <li>Descripcion: ${data.description}</li>
        <li>Codigo: ${data.code}</li>
        <li>Stock: ${data.stock}</li>
        <li>Categoria: ${data.category}</li>
        <li>Precio: ${data.price}</li>
    </ul>
    `
})*/