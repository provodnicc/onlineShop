import sequelize from "../pool"
import { DataTypes, Model as M} from "sequelize"
import config from '../config'

/**
 * ORM references to 'products' on database
 * @field id
 * @field name
 * @field description
 * @field image_url
 * @field price
 * @field count
 */
class Products extends M
{
    declare id: number
    declare name: string
    declare description: string
    declare image_url: string
    declare price: number
    declare count: number
    declare count_sales: number
}

Products.init(
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique:true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT
        },
        image_url:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        count:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        count_sales: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },{
        sequelize,
        modelName: 'products'
    }
)

export {
    Products
}