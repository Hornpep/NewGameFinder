import { Sequelize } from 'sequelize';

// Erstelle eine neue Sequelize-Instanz mit der Datenbankverbindung
const sequelize = new Sequelize(process.env.PG_URI, { dialect: 'postgres' });

// Verbindung zur Datenbank prüfen
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Beende den Prozess bei Verbindungsfehler
  }
};

authenticateDatabase();

export default sequelize;