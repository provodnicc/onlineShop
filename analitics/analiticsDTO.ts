import { Purchases } from "../cart/cart_models"
import { Users } from "../users/user_models"

class AnaliticDTO
{
    id?:number
    email?: string
    init(model: Users){
        this.id=model.id
        this.email=model.email
    }

    initArray(userList: Array<Users>){
        let AnaliticDTOList: Array<AnaliticDTO> = new Array<AnaliticDTO>()

        for(let user of userList){
            let analiticDTO = new AnaliticDTO()
            analiticDTO.init(user)
            AnaliticDTOList.push(analiticDTO)
        }
        return AnaliticDTOList
    }
}

class PurchasesAnaliticDTO
{
    maxCheck?: number
    minSheck?: number
    mediumCheck?: number
    count?: number
    sum?: number
    prices?: Array<any>
    async init(purchases_list: Array<Purchases>){
        let max = purchases_list[0].price
        let min = purchases_list[0].price
        let sum = 0
        for(let purchase of  purchases_list){
            if(max<purchase.price){
                max = purchase.price
            }
            if(min>purchase.price){
                min=purchase.price
            }

            sum += Number(purchase.price)
            
            this.prices?.push({
                price: purchase.price,
                // date: purchase
            })
        }
        this.maxCheck = Number(max)
        this.minSheck = Number(min)

        this.count = purchases_list.length
        this.sum = sum

        this.mediumCheck = sum/this.count
        

    }
}

export {AnaliticDTO}