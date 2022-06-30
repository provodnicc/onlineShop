import {Cart, Purchases} from './cart_models'

import { Products } from '../products/product_models'
import { Users } from '../users/user_models'
import { CartDTO } from './cartDTO'
import status from 'http-errors'
/**
 * 
 */
class CartService
{
    async getCartProduct(u_id: number){
         const cart = await Cart.findAll({
            where:{
                u_id: u_id
            }
        })
        let cartDTO = new CartDTO()
        return await cartDTO.initArray(cart)
    }

    async addProductToCart(p_id: string, u_id: number, count: number){
        
        const product_in_cart = await Cart.findOne({
            where:{
                p_id: p_id,
                u_id: u_id
            },
        })
        if(!product_in_cart){
            let cart = await Cart.create({
                u_id: u_id,
                p_id: p_id,
                count: count
            })
            return {
                cart
            }
        }else{
            product_in_cart.count += Number(count)
            product_in_cart.save()
            return product_in_cart
        }

        
    }

    async offerCart(u_id: number){

        const cart = await Cart.findAll({
            where: {
                u_id:u_id
            }
        })
        if(!cart.length){
            throw status(400, 'there is nothing in the cart')
        }

        let cartDTO = new CartDTO()
        let products: Array<CartDTO> = new Array<CartDTO>()
        products = await cartDTO.initArray(cart)
        
        let price: number = 0
        for(let product of products){
        
            price +=product.count!*product.product?.price!
            let prod = await Products.findByPk(product.product?.id)
            if(!prod){
                throw status(400, 'in the cart nothing to offer')
            }
            prod!.count -= product.count!
        }

        let user =await Users.findByPk(u_id)
        let money =user!.money
        if((money-price)<0){
            throw status(400, 'too less money, you need '+price)
        }

        user!.money -= price
        user?.save()

        let purchase = await Purchases.create({
            u_id: u_id,
            price: price
        })

        for(let product of cart){
            product.destroy()
        }
        
        return purchase
    }

    async showPurchases(){
        return await Purchases.findAll()
    }
}
export default new CartService()