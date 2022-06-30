import {Cart} from './cart_models'

import { Products } from '../products/product_models'
import { Users } from '../users/user_models'
class CartService
{
    async getCartProduct(u_id: number){
        return await Cart.findAll({
            where:{
                u_id: u_id
            },
            include:Products

        })
        
    }

    async addProductToCart(p_id: string, u_id: number, count: number){
        const product_in_cart = await Cart.findOne({
            where:{
                u_id: u_id,
                p_id: p_id
            }
        })
        let cart
        if(!product_in_cart){
            cart = await Cart.create({
                U_id: u_id,
                p_id: p_id,
                count: count
            })
        }else{
            product_in_cart.count += count
        }

        return {
            cart
        }
    }

    async offerCart(u_id: number){
        const cart = await Cart.findAll({
            where: {
                u_id:u_id || 1
            },
            include: [Products, Users]
        })
        // for(let product of cart){
            // product
        // }
        console.log(cart)
    }
}
export default new CartService()