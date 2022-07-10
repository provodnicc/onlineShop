import Router from 'express'

import UserController from './user_controller'
import {body} from 'express-validator'
import { adminMiddleware, tokenMiddleware } from '../tokens/token_middleware'
import config from '../config'
/**
 * Routes /user requests
 * @url /sign-up       POST
 * @url /log-in        POST
 * @url /log-out       GET
 * @url /payment       POST
 * @url /profile       GET
 * @url /create-admin  GET if DEBUG=true
 * @url /analitics     GET 
*/
const userRouter = Router()

userRouter.post(
    '/sign-up', 
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 100}),
    UserController.signUp
)

userRouter.post(
    '/log-in', 
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 100}),
    UserController.logIn
)

userRouter.get(
    '/log-out',
    UserController.logOut
)

userRouter.post(
    '/payment',
    tokenMiddleware,
    UserController.addMoney
)
// admin's routers

userRouter.get(
    '/profile',
    tokenMiddleware,
    UserController.getInfo
)

if(config.DEBUG)
    userRouter.get('/create-admin', UserController.createAdmin)

userRouter.get(
    '/analitics',
    adminMiddleware,
    UserController.showPurchases
)

export default userRouter