import { ProductDTO } from "../products/productDTO"
import { Products } from "../products/product_models"
import { Cart } from "./cart_models"


class CartDTO
{
    product?: ProductDTO
    count?: number
    async init (model: Cart){
        this.product = new ProductDTO(await Products.findByPk(model.p_id))        
        this.count=model.count
    }

    async initArray(model: Array<Cart>){
        let products:Array<CartDTO> = new Array<CartDTO>()

        for(let product of model){
            let cartDTO = new CartDTO()
            await cartDTO.init(product)
            products.push(cartDTO)
        }
        return products
    }
}

export {CartDTO}