module.exports = {
  HOST:
    process.env.DATABASE_HOST || "mysql-architecture-logicielle.alwaysdata.net",
  USER: process.env.DATABASE_USER || "250570",
  PASSWORD: process.env.DATABASE_PASSWORD || "tp_final_password",
  DB: process.env.DATABASE_TABLE || "architecture-logicielle_bdd-3",
  dialect: "mysql",
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: "+01:00",
};
