import {DocumentDefinition, FilterQuery} from 'mongoose'
import UserModel, { UserDocumnent } from '../models/user.model';
import {omit} from 'lodash'

export async function createUser(
    input: DocumentDefinition<Omit<UserDocumnent, "createdAt"| "updatedAt" | "comparePassword">>){
    try {
        const user =  UserModel.create(input);
        return user;
    } catch (e:any) {
        throw new Error(e)
    }
}

export async function validatePassword({username, password}:{
    username:string;
    password:string;
}) {
    const user = await UserModel.findOne({username});
    if (!user){
        return false;
    }
    const isValid = await user.comparePassword(password);
    if(!isValid){
        return false
    }
    return omit(user.toJSON(),"password");
}

export async function getUser() {
    try {
        const user = await UserModel.find({});
        if(!user){
            return false;
        }
        return user;
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function findOneUser(query: FilterQuery<UserDocumnent>) {
    return UserModel.findOne(query).lean();
}