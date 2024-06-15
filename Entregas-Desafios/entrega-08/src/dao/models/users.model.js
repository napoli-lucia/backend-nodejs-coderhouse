import mongoose from "mongoose";
import ROLES from "../../constants/role.js";

const collectionName = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        //required: true, //lo saque por registro con github
    },
    role: {
        type: String,
        enum: ROLES,
        default: 'user'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true},
    
});

userSchema.pre('find', function () {
    this.populate("carts.cart")
})

const usersModel = mongoose.model(collectionName, userSchema);
export default usersModel;