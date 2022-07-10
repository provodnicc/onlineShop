import tokenService from './token_service'

/**
 * controller for token requests
 * @method refresh 
 */
class TokenController
{
    async refresh(req: any, res: any, next: any){
        try{
            const {refreshToken} = req.cookies
            const userData = await tokenService.refresh(refreshToken)
                
            res.cookie(
                'refreshToken',
                userData.refreshToken, 
                {
                    maxAge: 20*24*60*60*1000, 
                    httpOnly: true
                }
            )

            res.status(201).json(
                userData
            )
        }catch(e){
            next(e)
        }
    }
}

export default new TokenController