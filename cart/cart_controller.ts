import cartService from './cart_service'
class CartController
{
    async getCartProducts(req: any, res: any, next: any){
        try{
            const cart = await cartService.getCartProduct(1)
            res.json(cart).status(200)
        }catch(e){
            next(e)
        }
    }

    async addProductToCart(req: any, res: any, next: any){
        try{
            const {p_id, count} = req.body
            const cartData = await cartService.addProductToCart(p_id, 1, count)
            res.json(cartData).status(200)
        }catch(e){
            next(e)
        }
    }

    async offerCart(req: any, res: any, next: any){
        try{
            let purchase = await cartService.offerCart(1)
            res.json(purchase).status(200)
        }catch(e){
            next(e)
        }
    }

    
}

export default new CartController()