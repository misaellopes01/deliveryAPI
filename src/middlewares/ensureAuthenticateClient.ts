import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        response.status(401).json({
            message: "Token missing!"
        })
    }
    // Bearer "token"
    // [0] - Bearer
    // [1] - "token"
    const [, token] = authHeader!.split(" ")

    try {
        const { sub } = verify(token, "316ab082b78a87b25ed939c26c3f8488") as IPayload

        request.id_client = sub

        return next()

    } catch (error) {
        response.status(401).json({
            message: "Invalid token!"
        })
    }
}