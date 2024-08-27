import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const Game = sequelize.define(
  'Game',
  {
    igdb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true, // Da die Spalte `about` optional ist, kann sie NULL-Werte enthalten
    },
  },
  {
    timestamps: true,
  },
  {
    tableName: 'games',
  }
);

export default Game;
