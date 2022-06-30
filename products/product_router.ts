import { Router } from "express";
import productController from './product_controller'
import { adminMiddleware } from "../tokens/token_middleware";

const productRouter = Router()

productRouter.post(
    '/add',
    adminMiddleware,
    productController.addProduct
)

productRouter.get('/all', productController.getAllProducts)
productRouter.get('/', productController.getOneProduct)
productRouter.get('/media', productController.getMedia)

export default productRouter