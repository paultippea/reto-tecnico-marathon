export default () => ({
    application: {
        port: parseInt(process.env.APPLICATION_PORT, 10) || 3000,
    },
    database: {
        uri: process.env.DATABASE_URI,
        user: process.env.DATABASE_USERNAME,
        pass: process.env.DATABASE_PASSWORD,
        dbName: process.env.DATABASE_DATABASE
    },
    apiperson: {
        uri: process.env.API_PERSON_URI,
        token: process.env.API_PERSON_TOKEN
    },
    security: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpired: process.env.JWT_EXPIRED
    },
    apiSwagger: {
        apiTitle: process.env.API_TITLE,
        apiDescription: process.env.API_DESCRIPTION,
        apiVersion: process.env.API_VERSION
    }
});
