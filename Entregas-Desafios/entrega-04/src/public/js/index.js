const socket = io();

const form = document.getElementById("create-product");
const realProducts = document.getElementById("real-products");

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let code = form.elements.code.value;
    let stock = form.elements.stock.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;

    socket.emit("create-prod", {
        title,
        description,
        code,
        stock,
        category,
        price
    })

    //form.reset();
  })
