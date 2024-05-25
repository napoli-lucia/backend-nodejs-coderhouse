import mongoose from "mongoose";

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
    },
    age: {
        type: Number
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "usuario"],
        default: 'usuario'
    }
  });
  
const usersModel = mongoose.model(collectionName, userSchema);
export default usersModel;