import { productService } from "../src/repository/index.js";

describe("create product", () => {
  // it("should log a success message if the product data is correct", async () => {
  //   const product = {
  //     "title": "Queso",
  //     "description": "Queso crema",
  //     "price": 45,
  //     "thumbnails": [
  //       "./images/queso-crema.jpg"
  //     ],
  //     "code": "ABC0120",
  //     "status": true,
  //     "stock": 25,
  //     "category": "Lacteos"
  //   };
  //   const result = await productService.addProduct(product);
  //   expect(result).toEqual({ message: "Producto agregado!" });
  // },20000);

  // it("should log an error message if no title is provided", async () => {
  //   const product = {
  //     "description": "Queso crema",
  //     "price": 45,
  //     "thumbnails": [
  //       "./images/queso-crema.jpg"
  //     ],
  //     "code": "ABC120",
  //     "status": true,
  //     "stock": 25,
  //     "category": "Lacteos"
  //   };
  //   const result = await productService.addProduct(product);
  //   // expect(result).toEqual({error: `Producto no agregado. Datos erróneos: El título es requerido y debe ser un String.`});
  //   expect(result).toThrow(new UniqueError(`Producto no agregado. Datos erróneos: El título es requerido y debe ser un String.`));
  // });

  it("should log an error message if no price is provided", async () => {
    const product = {
      "title": "Queso",
      "description": "Queso crema",
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    const result = await productService.addProduct(product);
    expect(result).toEqual({ error: `Producto no agregado. Datos erróneos: El precio es requerido y debe ser un número.` });
  });

  it("should log an error message if price type is not a number", async () => {
    const product = {
      "title": "Queso",
      "description": "Queso crema",
      "price": "A",
      "thumbnails": [
        "./images/queso-crema.jpg"
      ],
      "code": "ABC120",
      "status": true,
      "stock": 25,
      "category": "Lacteos"
    };
    const result = await productService.addProduct(product);
    expect(result).toEqual({ error: `Producto no agregado. Datos erróneos: El precio es requerido y debe ser un número.` });
  });
});