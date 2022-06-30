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
            return next(status(401))
        }

        const accesstoken = authHeader.split(' ')[1]
        if(!accesstoken){
            return next(status(401))
        }

        const userData = tokenService.validateToken(accesstoken)
        if(!userData){
            return next(status(401))
        }

        req.user = userData
        next()
    }catch(e){
        return next(status(401))
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
            return next(status(401))
        }

        const accesstoken = authHeader.split(' ')[1]
        if(!accesstoken){
            return next(status(401))
        }

        const userData = tokenService.validateToken(accesstoken)
        if(!userData){
            return next(status(401))
        }
        if(!userData.is_admin){
            throw next(status(403))
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
