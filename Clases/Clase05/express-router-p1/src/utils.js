const multer = require('multer') 
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cd) {

    }
})