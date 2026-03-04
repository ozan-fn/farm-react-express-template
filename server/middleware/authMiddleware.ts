import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    sub: string;
    name: string;
    email: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me";
const AUTH_COOKIE_NAME = "auth_token";

const getCookieToken = (req: Request) => {
    const cookies = req.cookies as Record<string, string> | undefined;
    return cookies?.[AUTH_COOKIE_NAME] || "";
};

const getBearerToken = (authHeader: string) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return "";
    return authHeader.slice("Bearer ".length).trim();
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || "";
    const token = getCookieToken(req) || getBearerToken(authHeader);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: token not found" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        res.locals.user = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
        };
        return next();
    } catch {
        return res.status(401).json({ message: "Unauthorized: invalid or expired token" });
    }
};
