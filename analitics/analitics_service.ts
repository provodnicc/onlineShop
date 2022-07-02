import { Users } from "../users/user_models";
import { AnaliticUserDTO, PurchasesAnaliticDTO } from "./analiticsDTO";
import status from 'http-errors'
import { Purchases } from "../cart/cart_models";


class AnaliticsService
{
    async getUsers(){
        let users = await Users.findAll()
        let analiticDTO = new AnaliticUserDTO()

        analiticDTO.initArray(users)
        
        return analiticDTO
    }

    async getUserAnalitics(u_id: number){
        let user = await Users.findByPk(u_id)

        if(!user){
            throw status(400, 'user not found')
        }

        let purchase = await Purchases.findAll({
            where:{
                u_id: u_id
            }
        })

        let purchasesAnaliticDTO = new PurchasesAnaliticDTO()
        

        let config = await purchasesAnaliticDTO.init(purchase)

        return config
    }
}

export default new AnaliticsService()
