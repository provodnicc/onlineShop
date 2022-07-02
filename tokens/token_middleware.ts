import tokenService from "./token_service"
import status from 'http-errors'
/**
 * request validate session for user
 * @param req 
 * @param res 
 * @param next 
 * @returns req.user {id, is_admin}
 */
const tokenMiddleware = (req: any, res: any, next: any)=>{
    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return next(status(401, 'header did not found'))
        }

        const accesstoken = authHeader.split(' ')[1]
        if(!accesstoken){
            return next(status(401,  'token did not found'))
        }

        const userData = tokenService.validateToken(accesstoken)
        if(!userData){
            return next(status(401, 'validation error'))
        }

        req.user = userData
        next()
    }catch(e){
        return next(e)
    }
}
/**
 * request validate session for administrator
 * @param req 
 * @param res 
 * @param next 
 * @returns req.user {id, is_admin}
 */
const adminMiddleware = (req:any, res:any, next:any)=>{
    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return next(status(401, 'header did not found'))
        }

        const accesstoken = authHeader.split(' ')[1]
        if(!accesstoken){
            return next(status(401, 'token did not found'))
        }

        const userData = tokenService.validateToken(accesstoken)
        if(!userData){
            return next(status(401, 'validation error'))
        }
        if(!userData.is_admin){
            throw next(status(403, 'no admin'))
        }
        req.user = userData
        next()
    }catch(e){
        next(e)
    }
} 
export {
    tokenMiddleware,
    adminMiddleware
}
