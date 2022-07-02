import Router from 'express'

import cartController from './cart_controller'
import {tokenMiddleware} from '../tokens/token_middleware'
const cartRouter = Router()

cartRouter.post(
    '/add-product', 
    tokenMiddleware,
    cartController.addProductToCart
)

cartRouter.get(
    '',
    tokenMiddleware,
    cartController.getCartProducts
)

cartRouter.get(
    '/offer',
    tokenMiddleware,
    cartController.offerCart
)

cartRouter.get(
    '/remove-item',
    tokenMiddleware,
    cartController.removeProductInCart
)

export default cartRouter