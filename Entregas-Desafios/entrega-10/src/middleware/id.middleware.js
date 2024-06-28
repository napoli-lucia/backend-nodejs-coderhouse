import mongoose from "mongoose";

//Funcion para chequear errores en id's
function idErrors(req, res, next) {
    if (req.params.pid && !mongoose.Types.ObjectId.isValid(req.params.pid)) {
        console.log("Product id error");
        return res.status(400).json({
            status: 400,
            message: `Product id is not valid`,
        });
    }
    if (req.params.cid && !mongoose.Types.ObjectId.isValid(req.params.cid)) {
        console.log("Cart id error");
        return res.status(400).json({
            status: 400,
            message: `Cart id is not valid`,
        });
    }
    next();
};
export default idErrors;