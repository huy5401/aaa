import {Express, Request, Response, NextFunction} from 'express'
import validateResource from './middleware/validateResource'
import {createUserHandler, getUserHandler} from './controllers/user.controller'
import {createUserSchema} from './schema/user.schema'
import { createSessionSchema } from './schema/session.schema';
import { createSessionHandler, deleteSessionHandler, getUserSessionHandler } from './controllers/session.controller';
import requireUser from './middleware/requiredUser';

function routes(app:Express){
    app.get("/", (req:Request, res:Response, next:NextFunction) => {
        console.log(req);
        res.send("hello");
    });
    app.get("/api/users/list", getUserHandler);
    app.post("/api/users",validateResource(createUserSchema),createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);
    app.get("/api/usersessions", requireUser, getUserSessionHandler)
    app.delete("/api/delsessions", requireUser, deleteSessionHandler);
}

export default routes;