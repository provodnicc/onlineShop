import Router from 'express'
const userRouter = Router()

import UserController from './user_controller'
import {body} from 'express-validator'

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


export default userRouter