import { Context, Next } from "hono";
import type { ContextWithEnv } from "../index";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../lib/utils/jwt";


const getTokenFromHeader = (c: ContextWithEnv): string | null => {
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '');
    }
    return getCookie(c, 'authToken') ?? null; // クッキーからトークンを取得
}

const middleware = async (c: ContextWithEnv, next: Next) => {
    const token = getTokenFromHeader(c);
    const isAuthed = token ? await verifyToken(token, c.env.JWR_SECRET ?? "DEFAULT_JWT_TOKEN") : null;
    c.set('isAuthed', isAuthed);

    await next();
}

export { middleware };