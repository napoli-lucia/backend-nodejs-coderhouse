export default class ProductDTO {
    constructor(product) {
        this.title = product.title ?? "";
        this.description = product.description ?? "";
        this.price = product.price;
        this.thumbnails = product.thumbnails ?? [];
        this.code = product.code ?? "";
        this.status = product.status ?? true;
        this.stock = product.stock ?? 0;
        this.category = product.category ?? "";
    }
}