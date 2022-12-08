import { Dialect, Sequelize } from "sequelize";
const dbConfig = require("../configs/db.config");

const sequelizeConnection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
).sync();

export default sequelizeConnection;
