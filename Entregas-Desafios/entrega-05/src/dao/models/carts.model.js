import mongoose from "mongoose";

const collectionName = "carts";

const cartSchema = new mongoose.Schema({
    cartId: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    }
  });
  
const cartsModel = mongoose.model(collectionName, cartSchema);
export default cartsModel;