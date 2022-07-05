
export default {
        DEBUG: true,
        API_SERVER: process.env.API_SERVER || 'http://localhost:9000' ,
        API_PORT: process.env.API_PORT || 9000,
        CLIENT_SERVER:  process.env.CLIENT_SERVER || 'http://localhost:8080',
        DB_USER: process.env.DB_USERNAME || 'shop',
        DB_PASSWORD:  process.env.DB_PASSWORD || 'shop',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_NAME: process.env.DB_NAME || 'shop_db',
        JWT_KEY:  process.env.JWT_KEY || 'veryshortkey',
        ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'test@mail.ru',
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'administrator'
    }