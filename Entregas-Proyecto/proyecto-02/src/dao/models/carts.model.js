import mongoose from "mongoose";

const collectionName = "carts";

const cartSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    products: {
      type:[
        {
          product:{
            //type: mongoose.Schema.Types.ObjectId,
            type: Number,
            ref: "products",
            required: true
          },
          quantity:{
            type: Number,
            required: true
            //default: 1
          }
        }
      ],
      default: []
    }
  });

// cartSchema.pre('find', function () {
//     this.populate('products.id')
// })
  
const cartsModel = mongoose.model(collectionName, cartSchema);
export default cartsModel;