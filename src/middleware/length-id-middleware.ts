import {NextFunction,Request,Response} from "express";

export const lengthIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    if (id.length !== 24) return res.sendStatus(404)
    return next()
}