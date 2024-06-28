import ProductDTO from "../dto/products.dto.js";

export default class ProductRepositoryDao {
  constructor(dao) {
    this.dao = dao;
  }

  insertProducts = async () => {
    return this.dao.insertProducts();
  }

  insertMockingProducts = async (products) => {
    return this.dao.insertMockingProducts(products);
  }

  getAllProducts = async () => {
    return this.dao.getAllProducts();
  };

  getProducts = async (page, limit, query, sort) => {
    return this.dao.getProducts(page, limit, query, sort);
  };

  getProductById = async (pid) => {
    return this.dao.getProductById(pid);
  };

  addProduct = async (product) => {
    const productDTO = new ProductDTO(product);
    return this.dao.addProduct(productDTO);
  };

  updateProduct = async (pid, newData) => {
    return this.dao.updateProduct(pid, newData);
  };

  deleteProduct = async (product) => {
    return this.dao.deleteProduct(pid);
  };
}