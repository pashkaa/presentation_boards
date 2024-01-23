import {lengthIdMiddleware} from "../middleware/length-id-middleware";
import {Router, Request, Response} from "express";
import {boardsService} from "../domain/boards-service";
import {ObjectId} from "mongodb";

export const boardsRouter = Router()

// BOARDS

boardsRouter.get('/boards', async (req: Request, res: Response) => {
        const allboards = await boardsService.getAllBoards()
        return res.status(200).send(allboards)
    }
)

boardsRouter.get('/boards/:id', lengthIdMiddleware,async (req: RequestWithParamsType<{ id: string }>, res: Response) => {
    const boardsId = req.params.id
    if (!boardsId) return res.sendStatus(404)
    const result = await boardsService.getBoardById(boardsId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

boardsRouter.post('/boards/create', async (req: RequestWithParamsAndBodyType<{}, RequestBodyType>, res: Response) => {
    const boardId = new ObjectId()
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.createBoard(boardId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

// TASKS

boardsRouter.get('/tasks/:id/:taskId', lengthIdMiddleware,async (req: RequestWithParamsType<{ id: string, taskId: string }>, res: Response) => {
    const boardsId = req.params.id
    const taskId = req.params.taskId
    if (!boardsId) return res.sendStatus(404)
    const result = await boardsService.getTaskdById(taskId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

boardsRouter.post('/tasks/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, title: string, description:string, order: string, arrayName: string }, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {title, description, order, arrayName} = req.body
    const taskId = new ObjectId().toString()
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.createTaskById(title, description, taskId, boardId, order, arrayName)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(taskId)
})

boardsRouter.post('/tasks-id/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, title: string, description:string, taskId: string, order: string,  arrayName: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {title, description, taskId, order, arrayName} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.createTaskById(title, description, taskId, boardId, order, arrayName)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(taskId)
})

boardsRouter.delete('/tasks/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{id: string, taskId: string}, RequestBodyType>, res: Response) => {
    const {taskId} = req.body
    if (!taskId) return res.sendStatus(404)
    const result = await boardsService.deleteTaskById(taskId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(taskId)
})

boardsRouter.put('/tasks/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, title: string, description:string, taskId: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {title, description, taskId} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.updateTaskById(title, description, taskId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

boardsRouter.delete('/all-tasks/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.deleteAllTasksByBoardId(boardId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

// SUB-ARRAY

boardsRouter.patch('/sub-array/add/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, taskId: string, arrayName: string }, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {taskId, arrayName} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.addTaskInArrayByIdAndName(taskId, boardId, arrayName)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(taskId)
})

boardsRouter.patch('/sub-array/remove/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, taskId: string, arrayName: string }, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {taskId, arrayName} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.removeTaskFromnArrayByIdAndName(taskId, boardId, arrayName)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(boardId)
})

boardsRouter.delete('/sub-array/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.deleteArrayById(boardId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

boardsRouter.patch('/sub-array/decrease/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, arrayName: string, order: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {arrayName, order} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.decreaseOrderOfRest(boardId, arrayName, order)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

boardsRouter.patch('/sub-array/increase/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string, arrayName: string, order: string}, RequestBodyType>, res: Response) => {
    const boardId = req.params.id
    const {arrayName, order} = req.body
    if (!boardId) return res.sendStatus(404)
    const result = await boardsService.increaseOrderOfBigger(boardId, arrayName, order)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})

type RequestWithParamsType<P> = Request<P, {}, {}, {}>
type RequestWithBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyType = {
    _id: string
    title: string
    description: string
    taskId: string
    arrayName: string
    order: string
}
type RequestWithParamsAndBodyType<P,B> = Request<P, {}, B, {}>