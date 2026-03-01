import { Context, Next } from "hono";
import type { Env } from "../index";
import { verifyToken } from "../lib/utils/jwt";

const middleware = async (c: Context<Env>, next: Next) => {
    const token = c.req.header()['Authorization']?.replace('Bearer ', '');
    const isAuthed = token ? await verifyToken(token, c.env.JWR_SECRET ?? "DEFAULT_JWT_TOKEN") : null;
    c.set('isAuthed', isAuthed);

    await next();
}

export { middleware };