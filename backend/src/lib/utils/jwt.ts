import { sign, verify } from "hono/jwt";

type value = string | number | Record<string, string | number | boolean>;
export type Object = Record<string, value>;

const ALGORITHM = "RS256";

export const createToken = async (payload: Object, secret: string) => {
    return await sign(payload, secret, ALGORITHM);
}

export const verifyToken = async (token: string, secret: string) => {
    try {
        return await verify(token, secret, ALGORITHM) as Object;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}