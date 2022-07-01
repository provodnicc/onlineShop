import sequelize from "../pool";
import { DataTypes, Model } from 'sequelize'
import config from '../config'
/**
 * ORM references to 'users' on database 
 * @field id
 * @field email
 * @field password
 * @field money
 * @field is_admin
*/
class Users extends Model{
    declare id: number
    declare email: string
    declare password: string
    declare money: number
    declare is_admin: boolean
}

Users.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false
        },
        money: {
            type:DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        sequelize,
        modelName: 'users'
    }
)


export {
    Users
}