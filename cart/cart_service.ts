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
        if(!p_id || !count){
            throw status(400)
        }

        const product = await Products.findByPk(p_id)
        if(!product){
            throw status(400, 'product not found')
        }
        const product_in_cart = await Cart.findOne({
            where:{
                p_id: p_id,
                u_id: u_id
            },
        })
        if((product?.count-count)<0){
            throw status(400, 'no items left in stock')
        }
        if(!product_in_cart && (count>0)){
            let cart = await Cart.create({
                u_id: u_id,
                p_id: p_id,
                count: count
            })

            const cartDTO = new CartDTO()
            await cartDTO.init(cart)
            return {
                ...cartDTO
            }
        }else if(product_in_cart) {
            product_in_cart.count += Number(count)
            product_in_cart.save()
            const cartDTO = new CartDTO()
            await cartDTO.init(product_in_cart)
            return {
                ...cartDTO
            }
        }else{
            throw status(400, 'product not in the cart and count<0')
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
        let productsInCart: Array<CartDTO> = new Array<CartDTO>()
        productsInCart = await cartDTO.initArray(cart)
        
        let price: number = 0
        for(let productInCart of productsInCart){
        
            price +=productInCart.count!*productInCart.price!
            let finded_prod = await Products.findByPk(productInCart.id)
            if(!finded_prod){
                throw status(400, 'in the cart nothing to offer')
            }
            if((finded_prod!.count - productInCart.count!)<0){
                throw status(400, 'no items left in stock')
            }
            finded_prod.count -= Number(productInCart.count)
            finded_prod.count_sales = Number(finded_prod.count_sales) + Number(productInCart.count)
            finded_prod.save()
        }

        let user =await Users.findByPk(u_id)
        let money =user!.money
        if((money-price)<0){
            throw status(400, 'too less money, you need '+price)
        }

        user!.money -= Number(price)
        user?.save()

        let purchase = await Purchases.create({
            u_id: u_id,
            price: price
        })

        for(let productCart of cart){
            productCart.destroy()
        }

        return purchase
    }
    
    async showPurchases(){
        return await Purchases.findAll()
    }

    async removeProductInCart(u_id: number, p_id: number){
        const productInCart = await Cart.findOne({
            where:{
                u_id: u_id,
                p_id: p_id
            }
        })
        if(!productInCart){
            throw status(400, 'product undefined')
        }
        productInCart?.destroy()
    }
}
export default new CartService()