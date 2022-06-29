import Router from 'express'
const userRouter = Router()

import UserController from './user_controller'
import {body} from 'express-validator'
import { tokenMiddleware } from '../tokens/token_middleware'

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


export default userRouter