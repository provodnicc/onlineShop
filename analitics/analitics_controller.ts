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
            res.json(await analiticService.getData()).status(200)
        }catch(e){
            next(e)
        }
    }

    async getUserAnalitics(req:any, res:any, next: any){
        try{
            const {u_id} = req.query

            await analiticService.getUserAnalitics(u_id)
        }catch(e){
            next(e)
        }
    }
}

export default new AnaliticsController()