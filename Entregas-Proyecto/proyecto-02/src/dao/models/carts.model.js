import mongoose from "mongoose";

const collectionName = "carts";

const cartSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    products: {
      type:[
        {
          product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
          },
          quantity:{
            type: Number,
            default: 1
          }
        }
      ]
    }
    // products: {
    //   type: Array,
    //   required: true,
    // }
  });
  
const cartsModel = mongoose.model(collectionName, cartSchema);
export default cartsModel;