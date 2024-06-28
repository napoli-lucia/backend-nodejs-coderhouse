import { StatusCodes } from "http-status-codes";

export const DictionaryErrors = {
  ROUTING_ERROR: `ROUTING_ERROR`, 
  INVALID_TYPES_ERROR: `INVALID_TYPES_ERROR`, //400
  CONTROLLER_ERROR: `CONTROLLER_ERROR`, //en la logica del controller
  SERVICE_ERROR: `SERVICE_ERROR`,
  DATABASE_ERROR: `DATABASE_ERROR`, //error en base a mongo
  INVALID_PARAMS_ERROR: `INVALID_PARAMS_ERROR`,
  INTERNAL_SERVER_ERROR: `INTERNAL_SERVER_ERROR`,
};

export class HttpResponse {
  OK(res, message, data) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      statusMessage: message,
      data,
    });
  } //200

  NotFound(res, message, data) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      statusMessage: message,
      data,
    });
  } //404

  Unauthorized(res, message, data) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      statusMessage: message,
      data,
    });
  } //401

  Forbbiden(res, message, data) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: StatusCodes.FORBIDDEN,
      statusMessage: message,
      data,
    });
  } //403

  BadRequest(res, message, data) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      statusMessage: message,
      data,
    });
  } //400

  Error(res, message, data, codeError) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: message,
      data,
      codeError,
    });
  } //500
}