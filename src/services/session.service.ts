import { FilterQuery, UpdateQuery } from "mongoose";
import {get, omit} from 'lodash';
import SessionModel, { SessionDocumnent } from "../models/session.model"
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findOneUser } from "./user.service";


export async function createSession(userId:string, userAgent: string) {
    const session = await SessionModel.create({user: userId, userAgent});
    return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocumnent>) {
    return SessionModel.find(query).lean(); 
}

export async function updateSession(query: FilterQuery<SessionDocumnent>, update:UpdateQuery<SessionDocumnent>) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({refeshToken}:{refeshToken:string}){
    // const decoded = jwt.verify(refeshToken, String(process.env.PUBLIC_KEY))
    // console.log(decoded);
    const {decoded} = verifyJwt(refeshToken);
    if(!decoded || !get(decoded,'session')) return false;
    const session = await SessionModel.findById(get(decoded, 'session'));
    if(!session || !session.valid) return false;
    var user = await findOneUser({_id: session.user});
    const useromit = omit(user,"password");
    if(!user) return false;
    const accessToken = signJwt(
        {...useromit ,session: session._id},
        {expiresIn: "15m",algorithm: "RS256"} // PHUT 15 PHUT
    );
    return accessToken;
}