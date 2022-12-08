module.exports = {
  HOST: process.env.DATABASE_HOST || 'mysql-lilian-projects.alwaysdata.net',
  USER: process.env.DATABASE_USER || '292277_quizzme',
  PASSWORD: process.env.DATABASE_PASSWORD || 'quizzme_mdp',
  DB: process.env.DATABASE_TABLE || 'lilian-projects_web-service-quizzme',
  dialect: 'mysql',
  pool: {
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: '+01:00',
};
