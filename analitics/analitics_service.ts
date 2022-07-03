import { Users } from "../users/user_models";
import { AnaliticUserDTO, PurchasesAnaliticDTO } from "./analiticsDTO";
import status from 'http-errors'
import { Purchases } from "../cart/cart_models";


class AnaliticsService
{
    async getUsers(){
        let users = await Users.findAll()
        let analiticDTO = new AnaliticUserDTO()
        let data: Array<PurchasesAnaliticDTO> = new Array<PurchasesAnaliticDTO>()
        for(let user of analiticDTO.initArray(users)){

            let purchase = await Purchases.findAll({
                where:{
                    u_id: user.id
                }
            })

            let purchasesAnaliticDTO = new PurchasesAnaliticDTO()
            

            await purchasesAnaliticDTO.init(purchase)
            data.push(purchasesAnaliticDTO)
        }
        return data
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
        

        await purchasesAnaliticDTO.init(purchase)

        return purchasesAnaliticDTO
    }

    async getPurchasesInfo(){
        const purchases = await Purchases.findAll()
        const purchasesAnaliticDTO = new PurchasesAnaliticDTO()
        await purchasesAnaliticDTO.init(purchases)
        return purchasesAnaliticDTO
    }
}

export default new AnaliticsService()
