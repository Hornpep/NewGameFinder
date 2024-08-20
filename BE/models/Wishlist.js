import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';



const Wishlist = sequelize.define('Wishlist', {
  added_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});


export default Wishlist;