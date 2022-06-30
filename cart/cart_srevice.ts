import {Cart} from './cart_models'

import tokenService from '../tokens/token_service'
import {UserDTO} from '../users/userDTO'
import { Users } from '../users/user_models'
class CartService
{
    async getCartProduct(){

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

        const user = await Users.findOne({
            where:{
                id:u_id
            }
        })

        return {
            cart
        }
    }
}
export default new CartService()