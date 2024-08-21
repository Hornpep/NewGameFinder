import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URI, { dialect: 'postgres' });

// Verbindung zur Datenbank prüfen
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Modelle importieren
const User = require('./models/User.js');
const Game = require('./models/Game.js');
const Wishlist = require('./models/Wishlist.js');

// Datenbank und Tabellen synchronisieren
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated!');
  })
  .catch(err => {
    console.error('Error synchronizing the database:', err);
  });
export default sequelize;