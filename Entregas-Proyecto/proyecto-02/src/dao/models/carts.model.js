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
//     console.log("EJECUTO EL PRE MDW DE MONGOOSE");
//     this.populate('products.product');
// })

cartSchema.virtual('cartList', {
  ref: 'products', // The model to use
  localField: 'product', // The field in cartsSchema
  foreignField: 'id', // The field on productsSchema. This can be whatever you want.
});
  
const cartsModel = mongoose.model(collectionName, cartSchema);
export default cartsModel;