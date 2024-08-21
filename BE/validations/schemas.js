import Joi from 'joi';

// Schema zur Validierung von Benutzerregistrierungsdaten
export const signinSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// Schema zur Validierung von Anmeldedaten
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// export const gameSchema = Joi.object({

// });