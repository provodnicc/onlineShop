import sequelize from "../pool";
import { DataTypes, Model } from 'sequelize'
import config from '../config'
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
            type:DataTypes.INTEGER,
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


if (config.DEBUG)
    Users.sync({ force: true })
else
    Users.sync()

export {
    Users
}