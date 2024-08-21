import ErrorResponse from "../utils/ErrorResponse";
import Joi from "joi";

const validateJOI = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    return error ? next(new ErrorResponse(error.message, 400)) : next();
  };

export default validateJOI;