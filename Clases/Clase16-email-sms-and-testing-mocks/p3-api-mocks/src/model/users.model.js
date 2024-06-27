import mongoose from "mongoose";

const collectionName = "Users";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    
  },
  lastname: {
    type: String,
    
  },
  role: {
    type: String,
    enum: ["CLIENT", "VENDOR"],
  },
  premiun: {
    type: Boolean,
    
  },
  gender: {
    type: String,
    
  },
  birthdate: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
  products: {
    type: Array,
    
  },
  image: {
    type: String,
    
  },
  id: {
    type: String,
    
  },
  email: {
    type: Array,
    
  },
  
});

const usersModel = mongoose.model(collectionName, userSchema);

export default usersModel;