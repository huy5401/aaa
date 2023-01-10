import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import createHttpError from 'http-errors';
import connect from "./utils/connect"
import dotenv from 'dotenv'
import routes from './routes';
import deserializeUser from './middleware/deserializeUser'

dotenv.config();
const port:number = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// deserialize user
app.use(deserializeUser);

// app.use((req:Request, res:Response, next:NextFunction)=>{
//     next(new createHttpError.NotFound());
// });
// const errorHandle:ErrorRequestHandler = (err, req, res, next) => {
//     res.status(err.status || 500)
//     res.send({
//         status: err.status || 500,
//         message: err.message
//     });
// };
// app.use(errorHandle);




app.listen(port,async () => {
    console.log(`app listen on port: http://localhost:${port}`);
    // connect db
    await connect();
    // Route
    routes(app);
    
})