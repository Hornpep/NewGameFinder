import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const Wishlist = sequelize.define(
  'Wishlist',
  {
    /*     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    }, */
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
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    involved_companies: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name der referenzierten Tabelle
        key: 'id', // Name der referenzierten Spalte in der Users-Tabelle
      },
    },
    similar_games: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    /*     about: {
      type: DataTypes.TEXT,
      allowNull: true,
    }, */
  },
  {
    timestamps: true,
  }
);

export default Wishlist;
