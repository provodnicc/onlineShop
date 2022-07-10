import jwt from 'jsonwebtoken'
import status from 'http-errors'


import config from '../config'
import {Tokens} from './token_models'
import { UserDTO } from '../users/userDTO'
/**
 * service for token controller requests
 * @method generateTokens 
 * @method saveToken
 * @method validateToken 
 * @method refresh validate and update tokens
 */
class TokenService
{
    generateTokens(payload: any){
        return {
            refreshToken: jwt.sign(payload, config.JWT_KEY, {expiresIn: '1h'}),
            accessToken: jwt.sign(payload, config.JWT_KEY, {expiresIn: '15m'})
        }
    }

    async saveToken(refreshToken: string){
        if (!refreshToken){
            throw status(204)
        }
        await Tokens.create({
            refresh_token: refreshToken
        })
    }

    validateToken(refreshToken: string){
        let userDto = new UserDTO(jwt.verify(refreshToken, config.JWT_KEY))
        console.log(userDto)
        if(!userDto){
            throw status(401)
        }
        return userDto
    }
    async refresh(refreshToken: string){
        let user = this.validateToken(refreshToken)

        if (!user){
            throw status(401)
        }

        let tokens = this.generateTokens({...user})
        await this.saveToken(tokens.refreshToken)
        return {
            ...tokens
        }
    }
}

export default new TokenService()