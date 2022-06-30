import cartService from './cart_srevice'
class CartController
{
    async getCartProducts(req: any, res: any, next: any){
        try{
            const cart = await cartService.getCartProduct(req.user.id)
            res.json(cart).status(200)
        }catch(e){
            next(e)
        }
    }

    async addProductToCart(req: any, res: any, next: any){
        try{
            const {p_id, count} = req.body
            const cartData = await cartService.addProductToCart(p_id, req.user.id, count)
            res.json(cartData).status(200)
        }catch(e){
            next(e)
        }
    }

    async offerCart(req: any, res: any, next: any){
        try{
            await cartService.offerCart(1)
            res.json().status(200)
        }catch(e){
            next(e)
        }
    }
}

export default new CartController()