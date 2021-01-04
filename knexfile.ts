import dotenv from 'dotenv'
dotenv.config();

module.exports = async () => {
  return {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }
  }
};