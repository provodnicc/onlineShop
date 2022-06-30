
export default {
        DEBUG: true ,
        API_SERVER: String(process.env.API_SERVER) || 'http://localhost:9000' ,
        API_PORT: Number(process.env.API_PORT)|| 9000,
        CLIENT_SERVER: String( process.env.CLIENT_SERVER) || 'http://localhost:8080',
        DB_USER: String(process.env.DB_USERNAME) || 'shop',
        DB_PASSWORD: String( process.env.DB_PASSWORD) || 'shop',
        DB_HOST: String(process.env.DB_HOST) || 'localhost',
        DB_NAME: String(process.env.DB_NAME) || 'shop_db',
        JWT_KEY:  String(process.env.JWT_KEY) || 'veryshortkey',
        ADMIN_EMAIL: String(process.env.ADMIN_EMAIL) || 'test@mail.ru',
        ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD) || 'administrator'
    }