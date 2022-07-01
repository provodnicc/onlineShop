import Router from 'express'
import { adminMiddleware } from '../tokens/token_middleware'
import analiticsController from  './analitics_controller'
const analiticsRouter = Router()

analiticsRouter.get(
    '/users-list',
    adminMiddleware,
    analiticsController.getData
)

analiticsRouter.get(
    '/user-detail',
    adminMiddleware,
    analiticsController.getUserAnalitics
)

export default analiticsRouter