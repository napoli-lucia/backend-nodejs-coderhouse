const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const collection = "notes";

const noteSchema = new mongoose.Schema({})


const noteModel = mongoose.model(collection, notechema);
module.exports = noteModel;