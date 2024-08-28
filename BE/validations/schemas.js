import Joi from 'joi';

// Schema zur Validierung von Benutzerregistrierungsdaten
export const signupSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// Schema zur Validierung von Anmeldedaten
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

// Games Schema
export const gameSchema = Joi.object({
    igdb_id: Joi.number().integer().required(),
    name: Joi.string().max(255).required(),
    cover_url: Joi.string().uri().required(),
    genre: Joi.string().max(255).required(),
    release_date: Joi.date().required(),
    platform: Joi.string().max(255).required(),
    developer: Joi.string().max(255).required(),
    publisher: Joi.string().max(255).optional(),  // Optional, falls nicht immer verfügbar
    about: Joi.string().max(1000).optional(),     // Optional, Beschreibung des Spiels
});

// Wishlists Schema
export const wishlistSchema = Joi.object({
    games_id: Joi.number().integer().required(),  // ID des Spiels in der DB
    users_id: Joi.number().integer().required(),  // ID des Nutzers in der DB
    // added_at: Joi.date().default(() => new Date(), 'current date').optional(), // Optional, standardmäßig aktuelle Zeit
});

// User Schema
export const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    image: Joi.string().optional(),
    // wishlist: Joi.array().items(Joi.number().integer()).optional(), passt das?
});