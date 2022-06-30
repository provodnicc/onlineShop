import Router from 'express'

import cartController from './cart_controller'
import {tokenMiddleware} from '../tokens/token_middleware'
const cartRouter = Router()

cartRouter.post(
    '/add-product', 
    tokenMiddleware,
    cartController.addProductToCart
)

export default cartRouter