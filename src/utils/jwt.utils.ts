import jwt from "jsonwebtoken";


export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const private_key = String(process.env.PRIVATE_KEY);
    return jwt.sign(object, private_key,{
        ...(options && options),
    });
}
export function verifyJwt(token:string){
    const public_key = String(process.env.PUBLIC_KEY);
    try {
        const decoded = jwt.verify(token, public_key)
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (error:any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}

