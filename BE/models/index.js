import sequelize from '../db/index.js';
// import User from './User.js';
import Game from './Game.js';
import Wishlist from './Wishlist.js';

// Beziehungen zwischen Tabellen definieren

// Ein User hat genau eine Wishlist
User.hasOne(Wishlist);
Wishlist.belongsTo(User);

// Ein Game kann in vielen Wishlists enthalten sein
Game.hasMany(Wishlist);
Wishlist.belongsTo(Game);

