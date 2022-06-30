import {Cart} from './cart_models'

import { Products } from '../products/product_models'
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
}
export default new CartService()