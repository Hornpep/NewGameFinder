import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Erstelle eine neue Sequelize-Instanz mit der Datenbankverbindung
const sequelize = new Sequelize(process.env.PG_URI, { dialect: 'postgres' });

// Verbindung zur Datenbank prüfen
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
