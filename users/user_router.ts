import Router from 'express'

import UserController from './user_controller'
import {body} from 'express-validator'
import { tokenMiddleware } from '../tokens/token_middleware'
import config from '../config'
/**
 * Routes /user requests
 * @url /sign-up POST
 * @url /log-in POST
 * @url /log-out GET
 * @url /payment POST
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

if(config.DEBUG)
    userRouter.get('/create-admin')


export default userRouter