import UserModel from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../types/user.interface';
import { Error } from 'mongoose';
import jwt from 'jsonwebtoken';
import { secret } from '../config/config'
import { ExpressRequestInterface } from '../types/expressRequest.interface';

const normalizeUser = (user: UserDocument) => {
    const token = jwt.sign({ email: user.email, id: user.id }, secret)
    return {
        email: user.email,
        username: user.username,
        id: user.id,
        token: `Bearer ${token}`
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = new UserModel({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        console.log('newUser', newUser);
        const savedUser = await newUser.save();
        console.log('savedUser', savedUser);
        return res.send(normalizeUser(savedUser))
    } catch (error) {
        console.log('ERRR', error)
        if (error instanceof Error.ValidationError) {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(422).json(messages);
        }
        next(error)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email }).select("+password");
        if (!user) {
            return res.status(422).json({ emailOrPassword: 'Email or password invalid' })
        }
        const isSamePassword = await user.validatePassword(req.body.password);

        if (!isSamePassword) {
            return res.status(422).json({ emailOrPassword: 'Email or password invalid' })
        }
        res.send(normalizeUser(user))
    } catch (error) {
        next(error)
    }
}

export const currentUser = (
    req: ExpressRequestInterface,
    res: Response
) => {
    if(!req.user){
        return res.sendStatus(401)
    }
 res.send(normalizeUser(req.user))
}