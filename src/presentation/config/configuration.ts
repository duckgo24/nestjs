export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USER  || "root",
        password: process.env.DB_PASS || '123',
        name: process.env.DB_NAME,
    },
    redis: {},
    jwt: {
        access_secret_key: process.env.JWT_ACCESS_SECRET_KEY || 'default-secret',
        access_expires_in: process.env.JWT_ACCESS_EXPIRATION_TIME || 3600,
        refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY,
        refresh_expires_in: 36000,
    },
});