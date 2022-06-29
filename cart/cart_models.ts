import sequelize from "../pool"
import { DataTypes, Model as M} from "sequelize"
import config from '../config'

import {Users} from '../users/user_models';
import {Products} from '../products/product_models'

class Cart extends M{
    declare u_id: number
    declare p_id: number
    declare count: number
}

Cart.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        u_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            unique:true,
            references:{
                key: 'id',
                model: Users
            }
        },
        p_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                key: 'id',
                model: Products
            }
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        sequelize,
        modelName:'cart'
    }
)


if(config.DEBUG)
    Cart.sync({force:true})
else
    Cart.sync()

export {
    Cart
}