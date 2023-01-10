import mongoose from "mongoose";
import {UserDocumnent} from './user.model'

export interface SessionDocumnent extends mongoose.Document{
    user: UserDocumnent["_id"];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}
const SessionSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: "user" },
    valid: { type:Boolean, default: true},
    userAgent: { type: String }
},{
    timestamps: true
})

const SessionModel = mongoose.model<SessionDocumnent>("session", SessionSchema);
export default SessionModel