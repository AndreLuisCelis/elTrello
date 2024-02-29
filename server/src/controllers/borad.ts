import BoardModel from '../models/board';
import { Request, Response, NextFunction } from 'express';
import { ExpressRequestInterface } from '../types/expressRequest.interface';


export const getBoard = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            res.sendStatus(401);
        }
        const board = await  BoardModel.find({userId: req.user?.id });
        return res.send(board)
    } catch (error) {
        console.log('ERRR', error)
        next(error)
    }
}

export const createBoard = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
    try {

        if(!req.user){
            return res.sendStatus(401);
        }
        const newBoard = new BoardModel({
            title: req.body.title,
            userId: req.user?.id
        });
        const savedBoard = await newBoard.save();
        return res.send(savedBoard)
    } catch (error) {
        console.log('ERRR', error)
        next(error)
    }
}
