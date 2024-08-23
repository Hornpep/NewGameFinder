import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';




const Wishlist = sequelize.define('Wishlist', {
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});


export default Wishlist;