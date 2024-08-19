// ENVIRONMENTS VARS
const APP_PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const REDIS_URI = process.env.REDIS_URI;
const ENVIRONMENT = process.env.ENVIRONMENT;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN;
const JWT_SECRET = process.env.JWT_SECRET;


export {
    APP_PORT,
    DB_URI,
    ENVIRONMENT,
    REDIS_URI,
    ROOT_DOMAIN,
    JWT_SECRET
}