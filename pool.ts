import { Sequelize } from 'sequelize'
import config from './config'
/**
 * connected api ORM to postgres
 */
const sequelize = new Sequelize(
    config.DB_NAME, 
    config.DB_USER, 
    config.DB_PASSWORD, 
    {
        host: config.DB_HOST,
        dialect: 'postgres'
    }
);

if(config.DEBUG){
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.sync({force:true})
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}else{
    sequelize.sync()

}

export default sequelize