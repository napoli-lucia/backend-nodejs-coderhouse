const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "Users";

const userSchema = new mongoose.Schema({})

userSchema.plugin(mongoosePaginate);

userSchema.pre('find', function () {
    this.populate("notes.note")
}) 

const usersModel = mongoose.model(collection, userschema);
module.exports = usersModel;