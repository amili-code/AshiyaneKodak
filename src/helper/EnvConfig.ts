import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT : process.env.PORT || 3000,
    HOST : process.env.HOST || 'localhost',
    DB_HOST : process.env.DB_HOST || 'localhost',
    DB_NAME : process.env.DB_NAME || 'your database name',
    DB_USER : process.env.DB_USER || 'username',
    DB_PASSWORD : process.env.DB_PASSWORD || '',
    secret : process.env.SECRET || 'your secret key',
}