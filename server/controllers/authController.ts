import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const AUTH_USER = {
    id: "u-001",
    name: process.env.AUTH_NAME || "Admin",
    email: process.env.AUTH_EMAIL || "admin@example.com",
    password: process.env.AUTH_PASSWORD || "admin123",
};

const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me";
const JWT_EXPIRES_IN = "15d";
const AUTH_COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE_MS = 15 * 24 * 60 * 60 * 1000;

type JwtPayload = {
    sub: string;
    name: string;
    email: string;
};

const getCookieToken = (req: Request) => {
    const cookies = req.cookies as Record<string, string> | undefined;
    return cookies?.[AUTH_COOKIE_NAME] || "";
};

const getBearerToken = (authHeader: string) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return "";
    return authHeader.slice("Bearer ".length).trim();
};

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login with dummy credential
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login success and set auth_token cookie
 *       401:
 *         description: Invalid credential
 */
export const login = (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    if (email !== AUTH_USER.email || password !== AUTH_USER.password) {
        return res.status(401).json({ message: "Email atau password salah" });
    }

    const token = jwt.sign(
        {
            sub: AUTH_USER.id,
            name: AUTH_USER.name,
            email: AUTH_USER.email,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
    );

    res.cookie(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: COOKIE_MAX_AGE_MS,
        path: "/",
    });

    return res.json({
        message: "Login berhasil",
        user: {
            id: AUTH_USER.id,
            name: AUTH_USER.name,
            email: AUTH_USER.email,
        },
    });
};

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user from JWT
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *       401:
 *         description: Unauthorized
 */
export const me = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || "";
    const token = getCookieToken(req) || getBearerToken(authHeader);

    if (!token) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

        return res.json({
            user: {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
            },
        });
    } catch {
        return res.status(401).json({ message: "Token tidak valid atau expired" });
    }
};

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout and clear auth cookie
 *     responses:
 *       200:
 *         description: Logout success
 */
export const logout = (req: Request, res: Response) => {
    res.clearCookie(AUTH_COOKIE_NAME, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    return res.json({ message: "Logout berhasil" });
};
