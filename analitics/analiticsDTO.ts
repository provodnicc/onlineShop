import { Purchases } from "../cart/cart_models"
import { Users } from "../users/user_models"

class AnaliticUserDTO
{
    id?:number
    email?: string
    money?: number
    is_admin?: boolean
    init(model: Users){
        this.id=model.id
        this.email=model.email
        this.money=model.money
    }

    initArray(userList: Array<Users>){
        let AnaliticDTOList: Array<AnaliticUserDTO> = new Array<AnaliticUserDTO>()

        for(let user of userList){
            if(user.is_admin){
                continue
            }
            let analiticDTO = new AnaliticUserDTO()
            analiticDTO.init(user)
            AnaliticDTOList.push(analiticDTO)
        }
        return AnaliticDTOList
    }
}

class PurchasesAnaliticDTO
{
    maxCheck?: number
    minCheck?: number
    mediumCheck?: number
    count?: number
    sum?: number
    prices?: Array<any>

    async init(purchases_list: Array<Purchases>){
        let max = purchases_list[0].price
        let min = purchases_list[0].price
        console.log(purchases_list)
        let sum = 0
        for(let purchase of  purchases_list){
            if(Number(max)<Number(purchase.price)){
                console.log('max',max, purchase.u_id)
                max = purchase.price
                console.log('max',max, purchase.u_id)
            }

            if(Number(min)>Number(purchase.price)){
                console.log('min',min, purchase.u_id)
                min=purchase.price
                console.log('min',min, purchase.u_id)
            }
            console.log('\n')
            sum += Number(purchase.price)

            this.prices?.push({
                price: purchase.price,
                date: purchase.createdAt
            })
        }
        this.maxCheck = Number(max)
        this.minCheck = Number(min)
        
        this.count = purchases_list.length
        this.sum = sum

        this.mediumCheck = sum/this.count
        

    }
}

export {AnaliticUserDTO, PurchasesAnaliticDTO}