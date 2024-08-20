import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URI);

export default sequelize;