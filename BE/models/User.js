import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    image: { type: DataTypes.STRING, defaultValue: 'no-photo.jpg' },
    preferences: { type: DataTypes.STRING },
    wishlist: { type: DataTypes.STRING },
}); 

export default User;