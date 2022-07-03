import sequelize from "../pool"
import { DataTypes, Model as M} from "sequelize"
import config from '../config'

import {Users} from '../users/user_models';
import {Products} from '../products/product_models'
/**
 * ORM references to 'cart' on database
 * @field id
 * @field u_id
 * @field p_id
 * @field count
 */
class Cart extends M{
    declare id: number
    declare u_id: number
    declare p_id: string
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
            references:{
                key: 'id',
                model: Users
            }
        },
        p_id:{
            type:DataTypes.UUID,
            references:{
                key: 'id',
                model: Products
            },
            defaultValue: null
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        sequelize,
        modelName:'cart'
    }
)



/**
 * ORM for model 'purchases' on database
 * @field id
 * @field u_id
 * @field price
 */
class Purchases extends M{
    declare id: number
    declare u_id: number
    declare price: number
    declare createdAt: Date
}

Purchases.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        u_id: {
            type:DataTypes.INTEGER,
            references:{
                key:'id',
                model: Users
            }
        },
        price: DataTypes.DECIMAL(12,2)
    },{
        sequelize,
        modelName: 'purshases',
        timestamps: false,
        createdAt:true
    }
)
export {
    Cart,
    Purchases
}