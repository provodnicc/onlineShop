import { Users } from "../users/user_models";
import { AnaliticDTO } from "./analiticsDTO";
import status from 'http-errors'


class AnaliticsService
{
    async getData(){
        let users = await Users.findAll()
        let analiticDTO = new AnaliticDTO()

        analiticDTO.initArray(users)
        
        return analiticDTO
    }

    async getUserAnalitics(u_id: number){
        let user = await Users.findByPk(u_id)

        if(!user){
            throw status(400, 'user not found')
        }
    }
}

export default new AnaliticsService()
