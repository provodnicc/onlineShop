import { Router } from "express";
import tokenController from './token_controller'
import {tokenMiddleware} from './token_middleware'

const tokenRouter = Router()

tokenRouter.get('/refresh', tokenController.refresh)

export default tokenRouter