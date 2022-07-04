import { ProductDTO } from "../products/productDTO"
import { Products } from "../products/product_models"
import { Cart } from "./cart_models"


class CartDTO
{
    id?: string
    name?: string
    description?: string 
    price?: number
    image_url?: string
    count?: number
    async init (model: Cart){
        const product = new ProductDTO(await Products.findByPk(model.p_id))

        this.id = product.id
        this.name = product.name
        this.description = product.description
        this.price = product.price
        this.image_url = product.image_url
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