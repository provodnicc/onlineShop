import { Router } from "express";
import tokenController from './token_controller'
import {tokenMiddleware} from './token_middleware'
/**
 * Roures /token requests
 * @url /refresh update acess and refresh Tokens
 */
const tokenRouter = Router()

tokenRouter.get('/refresh', tokenController.refresh)

export default tokenRouter