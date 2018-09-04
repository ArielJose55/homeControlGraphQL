module.exports = {
    development: {
        host: "stampy.db.elephantsql.com",
        username: "bvpqslzp",
        password: "4ehHl9hHIdE9IHa1ZdHrmIYngV6qZM2e",
        database: "bvpqslzp",
        port: "5432",
        dialect: "postgres",
        schema: "public",
        mongo_url: 'mongodb://localhost:27017/homecontrol'
    },
    test: {
        dialect: "postgres"
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        mongo_url: 'mongodb://localhost:27017/homecontrol'
    }
};