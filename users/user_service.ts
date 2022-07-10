import bcrypt from 'bcrypt'
import status from 'http-errors'

import {Users} from './user_models'
import { Tokens } from '../tokens/token_models'
import tokenService from '../tokens/token_service'
import { UserDTO } from './userDTO'
import { Cart, Purchases } from '../cart/cart_models'
import config from '../config'
import { AnaliticUserDTO } from '../analitics/analiticsDTO'

/**
 * Service for user controller requests
 * @method signUp
 * @method logIn
 * @method logOut
 * @method addMoney
 * @method createAdmin
 * @method getInfo
 * @method showPurchases
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
       
        return new UserDTO(user)
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
        let userDto = new UserDTO(finded_user)
        let tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(tokens.refreshToken)

        return {
            ...tokens,
            userDto
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

   async addMoney(userDATA:any, money: number){

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

        user!.money = Number(user!.money) + Number(money)
        user.save()
        
        let analiticUserDTO = new AnaliticUserDTO()
        analiticUserDTO.init(user)
        return {
            ...analiticUserDTO
        }
   }

    async createAdmin(){
        
        const admin = await Users.findAll({
            where:{
                is_admin: true
            }
        })
        if(admin.length == 0){
            await Users.create({
                email: config.ADMIN_EMAIL,
                password: bcrypt.hashSync(config.ADMIN_PASSWORD, 7),
                is_admin: true
            })
        }
        else{
            throw status(400, 'admin is created, check this')
        }
    }

    async getInfo(u_id: number){
        let user = await Users.findByPk(u_id)
        if(!user){
            throw status(401)
        }
        let info = {
            email: user?.email,
            money: user?.money
        }
        return info
    }

    async showPurchases(){
        let purchase = await Purchases.findAll()
        let user_count = await Users.count() - 1
        return {
            purchase,
            user_count
        }
    }
}

export default new UserServ()