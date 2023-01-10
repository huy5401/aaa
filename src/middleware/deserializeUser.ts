import {get} from 'lodash'
import {Request, Response, NextFunction} from 'express'
import {verifyJwt} from '../utils/jwt.utils'
import { reIssueAccessToken } from '../services/session.service';


const deserializeUser = async (req:Request, res:Response, next:NextFunction) => {
    const accessToken = get(req,"headers.authorization","").replace(/^Bearer\s/,"");
    //var Token = req.headers.cookie;
    //const accessToken = Token?.split("=")[1];
    const refeshToken = get(req, "headers.x-refesh");
    if(!accessToken){
        return next();
    }
    const {decoded, expired} = verifyJwt(accessToken);
    console.log("expired: ",expired)
    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    if(expired && refeshToken){
        const newAccessToken = await reIssueAccessToken({refeshToken});
        console.log("new access token: ",newAccessToken)
        if(newAccessToken){
            res.setHeader("x-access-token",newAccessToken);
        }
        const result = verifyJwt(String(newAccessToken));
        if(!result) return next();
        console.log("verify after refesh: ",result);
        res.locals.user = result.decoded;
        return next();
    }
    return next();
}

export default deserializeUser;