import cartService from './cart_srevice'
class CartController
{
    async getCartProducts(req: any, res: any, next: any){
        try{
            
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
}

export default new CartController()