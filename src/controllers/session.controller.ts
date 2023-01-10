import { Request, Response, NextFunction } from "express";
import { createSession, findSession, updateSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createSessionHandler(req: Request, res: Response) {
    // Validate user password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create an access token
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: "5m", algorithm: "RS256" } // PHUT 15 PHUT
    );
    // create a refesh token
    const refeshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: String(process.env.REFESHTOKENTTL), algorithm: "RS256" } // PHUT 1 NAM
    );
    // res.cookie("authorization",accessToken, {
    //     httpOnly: true,
    //   });

    // return access and refesh token
    return res.send({ accessToken, refeshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const session = await findSession({ user: userId, valid: true });
    return res.send(session);
}

export async function deleteSessionHandler(req: Request, res: Response, next: NextFunction) {
    console.log(res.locals.user)
    const sessionId = res.locals.user.session;
    if (!sessionId) {
        return next();
    }
    await updateSession({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refeshToken: null,
    })

}