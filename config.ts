

export default{
    DEBUG: true,
    API_SERVER :String(process.env.API_SERVER),
    API_PORT : Number(process.env.API_PORT),
    CLIENT_SERVER :String( process.env.CLIENT_SERVER),
    DB_USER: String(process.env.DB_USERNAME),
    DB_PASSWORD:String( process.env.DB_PASSWORD),
    DB_HOST: String(process.env.DB_HOST),
    DB_NAME: String(process.env.DB_NAME),
    JWT_KEY: String(process.env.JWT_KEY)
}