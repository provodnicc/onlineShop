import userService from './user_service'
// import file from './1xx.json'
/**
 * controoler for /user requests
 * @method signUp 
 * @method logIn
 * @method logOut
 * @method addMoney - method to /user/payment requests
 */
class UserController
{
    async signUp(req: any, res: any, next: any){
        try{
            const {email, password} = req.body
            const user = await userService.signUp(email, password)
            // console.log(user.password)
            // tokenService.generateToken(user.get(id))
            res.json(user).status(200)
        }catch(e){
            next(e)
        }
    }
    async logIn(req: any, res: any, next: any){
        try{
            const {email, password} = req.body
            const userData = await userService.logIn(email, password)
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {
                    maxAge: 20*24*60*60*1000, 
                    httpOnly: true
                }
            )
            res.json(userData).status(200)
        }catch(e){
            next(e)
        }
    }

    async logOut(req: any, res: any, next: any){
        try{
            const {refreshToken} = req.cookies
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.status(200)
        }catch(e){
            next(e)
        }
    }

    async addMoney(req: any, res: any, next: any){
        try{
            const {money} = req.body
            let userData = await userService.addMoney(req.user, money)
            res.json(userData).status(200)
        }catch(e){

        }
    }

    createAdmin(req: any, res: any, next: any){
        try{

        }catch(e){
            next(e)
        }
    }
}

export default new UserController()