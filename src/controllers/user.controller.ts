import {Request, Response} from 'express'
import {createUser, getUser} from "../services/user.service"
import {omit} from 'lodash'
import { CreateUserInput } from '../schema/user.schema';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res:Response) {
    console.log(req.body);
    try {
        const user = await createUser(req.body);
        return res.send(user); 
    } catch (error:any) {
        console.log(error);
        return res.status(409).send(error.message);
    }
}

export async function getUserHandler(req:Request, res:Response) {
    try {
        const user = await getUser();
        return res.send(user);
    } catch (error:any) {
        return res.status(400).send(error.message);
    }
}