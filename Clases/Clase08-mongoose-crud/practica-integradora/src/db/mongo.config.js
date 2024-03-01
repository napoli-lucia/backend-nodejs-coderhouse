const mongoose = require("mongoose");

const DB_HOST = "localhost";
const DB_NAME = "mongoStudentDB";
const DB_PORT = 27017;

const configConnection = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
};


//El método de conexion tiene que ser asincrono
//Porque mongo se conecta con mongoose a través de promesas
const mongoDBconnection = async () => {
    try {
      await mongoose.connect(configConnection.url, configConnection.options);
      console.log(`=================================`);
      console.log(
        `======= URL: ${configConnection.url.substring(0, 20)} =======`
        //con substring solo vemos una parte de la url
      );
      console.log(`==== DB: ${DB_NAME}`);
      console.log(`=================================`);
    } catch (error) {
      console.log(
        "🚀 ~ file: mongo.config.js ~ mongoDBconnection ~ error:",
        error
      );
  
      throw new Error(error);
    }
  };
  
  module.exports = {
    configConnection,
    mongoDBconnection,
  };