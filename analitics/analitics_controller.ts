import analiticService from "./analitics_service"

/**
 * this controller used for administrator requests
 * @method getData GET request
 * @method getUserAnalitics GET request
 */
class AnaliticsController
{
    async getData(req:any, res:any, next: any){
        try{
            const config = await analiticService.getData()
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
}

export default new AnaliticsController()