import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocumnent extends mongoose.Document{
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword:string):Promise<Boolean>;
}
const UserSchema = new mongoose.Schema({
    username: {type:String, require: true},
    password: {type:String, require:true}
},{
    timestamps: true
})

UserSchema.pre("save",async function(next){
    var user = this as UserDocumnent;
    if(!user.isModified('password')){
        return next();
    }
    console.log(Number(process.env.SALT_BCRYT))
    user.password = await bcrypt.hashSync(user.password, Number(process.env.SALT_BCRYT));
    console.log("password is hashed");
    return next();
})

UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<Boolean> {
    const user = this as UserDocumnent;
    return bcrypt.compare(candidatePassword, user.password);
}
const UserModel = mongoose.model<UserDocumnent>("user", UserSchema);
export default UserModel