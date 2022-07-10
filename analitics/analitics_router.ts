import Router from 'express'
import { adminMiddleware } from '../tokens/token_middleware'
import analiticsController from  './analitics_controller'

/**
 * @url /users-list   GET  returns list users
 * @url /user-detail  GET  returns detail info about user
 * @url /purchases    GET  returns purchases analitics
 */
const analiticsRouter = Router()

analiticsRouter.get(
    '/users-list',
    adminMiddleware,
    analiticsController.getUsers
)

analiticsRouter.get(
    '/user-detail',
    adminMiddleware,
    analiticsController.getUserAnalitics
)

analiticsRouter.get(
    '/purchases',
    adminMiddleware,
    analiticsController.getPurchasesInfo
)

export default analiticsRouter