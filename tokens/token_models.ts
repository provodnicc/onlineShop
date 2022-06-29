import sequelize from "../pool";
import config from '../config'

import { DataTypes, Model as M } from "sequelize";

class Tokens extends M{
    declare id: number
    declare refresh_token: string
}

Tokens.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        refresh_token:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'tokens'
    }
)

if (config.DEBUG)
    Tokens.sync({ force: true })
else
    Tokens.sync()

export {
    Tokens
}