import { Users } from "../users/user_models";
import { AnaliticUserDTO, PurchasesAnaliticDTO } from "./analiticsDTO";
import status from 'http-errors'
import { Purchases } from "../cart/cart_models";

/**
 * @method getUsers
 * @method getUserAnalitics
 * @method getPurchasesInfo
 */
class AnaliticsService
{
    async getUsers(){
        let users = await Users.findAll()
        let analiticDTO = new AnaliticUserDTO()
        let data: Array<any> = new Array<any>()

        for(let user of analiticDTO.initArray(users)){

            let purchases = await Purchases.findAll({
                where:{
                    u_id: user.id
                }
            })
            if(!purchases.length){ //list purchases lenth == 0, user without purchases 
                continue
            }

            let purchasesAnaliticDTO = new PurchasesAnaliticDTO()
            
            await purchasesAnaliticDTO.init(purchases)
            data.push({...purchasesAnaliticDTO, email: user.email})
        }
        return data
    }

    async getUserAnalitics(u_id: number){
        let user = await Users.findByPk(u_id)

        if(!user){
            throw status(400, 'user not found')
        }

        let purchases = await Purchases.findAll({
            where:{
                u_id: u_id
            }
        })
        if(!purchases.length){ //list purchases lenth == 0, user without purchases 
            throw status(400, 'purchases not found')
        }
        let purchasesAnaliticDTO = new PurchasesAnaliticDTO()
        

        await purchasesAnaliticDTO.init(purchases)

        return purchasesAnaliticDTO
    }

    async getPurchasesInfo(){
        const purchases = await Purchases.findAll()
        if(!purchases.length){ //list purchases lenth == 0, user without purchases 
            throw status(400, 'purchases not found')
        }
        const purchasesAnaliticDTO = new PurchasesAnaliticDTO()
        await purchasesAnaliticDTO.init(purchases)
        return purchasesAnaliticDTO
    }
}

export default new AnaliticsService()
