import bcrypt from 'bcrypt'
import status from 'http-errors'

import {Users} from './user_models'
import { Tokens } from '../tokens/token_models'
import tokenService from '../tokens/token_service'
import { UserDTO } from './userDTO'
import { Cart } from '../cart/cart_models'

/**
 * Service for user controller requests
 * @method signUp
 * @method logIn
 * @method logOut
 * @method addMoney
 */
class UserServ
{
    async signUp(email: string, password: string){
        if(!email){
            throw status(204, 'email does not found')
        }
        
        let finded_user = await Users.findOne({
            where:{
                email: email
            }
        })
        if(finded_user){
            throw status(400, `user with email: ${email} already exist`)
        }
        let user = await Users.create({
            email: email,
            password: bcrypt.hashSync(password, 7)
        })
        Cart.create({
            u_id:user.id
        })
        return user
    }

    async logIn(email: string, password: string){
        if(!email){
            throw status(204, 'email does not found')
        }
        
        let finded_user = await Users.findOne({
            where:{
                email: email
            }
        })

        let passEquals = await bcrypt.compare(password, finded_user!.password)
        if (!passEquals){
            throw status(400, 'invalid password')
        }

        let tokens = tokenService.generateTokens({...new UserDTO(finded_user)})
        await tokenService.saveToken(tokens.refreshToken)

        return {
            finded_user,
            ...tokens
        }
    }

   async logout(refreshToken: string) {
        let token = await Tokens.findOne({
            where:{
                refresh_token: refreshToken
            }
        })
        if (!token){
            throw status(401)
        }
        await token!.destroy()
   }

   async addMoney(userDATA:any, money: any){

        if(!userDATA){
            throw status(401)
        }
        if(!money){
            throw status(203)
        }

        let user = await Users.findOne({
            where: {
                id: userDATA.id
            }
        })
        if(!user){
            throw status(401)
        }
        user!.money += money
        user.save()
        
        let userDto = new UserDTO(user)

        return {
            userDto,
        }
   }
}

export default new UserServ()