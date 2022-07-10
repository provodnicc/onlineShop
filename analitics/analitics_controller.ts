import analiticService from "./analitics_service"

/**
 * this controller used for administrator requests
 * @method getUsers         GET request
 * @method getData          GET request
 * @method getUserAnalitics GET request
 */
class AnaliticsController
{
    async getUsers(req:any, res:any, next: any){
        try{
            const config = await analiticService.getUsers()
            console.log(config)
            res.json(config).status(200)
        }catch(e){
            next(e)
        }
    }

    async getUserAnalitics(req:any, res:any, next: any){
        try{
            const {u_id} = req.query

            const config = await analiticService.getUserAnalitics(u_id)
            res.json(config).status(200)
        }catch(e){
            next(e)
        }
    }

    async getPurchasesInfo(req:any, res:any, next: any){
        try{
            const analitics = await analiticService.getPurchasesInfo()
            res.json(analitics).status(200)
        }catch(e){
            next(e)
        }
    }
}

export default new AnaliticsController()