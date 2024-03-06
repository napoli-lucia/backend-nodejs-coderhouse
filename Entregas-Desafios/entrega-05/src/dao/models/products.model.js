import mongoose from "mongoose";

const collectionName = "products";

const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: false,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
  });
  
const productsModel = mongoose.model(collectionName, productSchema);
export default productsModel;