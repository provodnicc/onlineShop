import sequelize from "../pool"
import { DataTypes, Model as M} from "sequelize"
import config from '../config'

class Products extends M
{
    declare id: number
    declare name: string
    declare description: string 
    declare image_url: string 
    declare price: number
    declare count: number
}

Products.init(
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        }
    },{
        sequelize,
        modelName: 'products'
    }
)

if(config.DEBUG)
    Products.sync({force:true})
else
    Products.sync()

export {
    Products
}