import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const Wishlist = sequelize.define('Wishlist', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  igdb_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false
  },
  involved_companies: {
    type: DataTypes.STRING,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
});

export default Wishlist;