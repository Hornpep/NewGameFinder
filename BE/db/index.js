import { Sequelize } from 'sequelize';
// import Game from '../models/Game.js';
// import Wishlist from '../models/Wishlist.js';
// import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, { dialect: 'postgres' });

// Verbindung zur Datenbank prüfen
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Datenbank und Tabellen synchronisieren
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });
export default sequelize;