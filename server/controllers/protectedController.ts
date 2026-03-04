import { Request, Response } from "express";

/**
 * @openapi
 * /api/protected:
 *   get:
 *     tags:
 *       - Protected
 *     summary: Protected endpoint requiring valid JWT
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected payload
 *       401:
 *         description: Unauthorized
 */
export const getProtected = (_req: Request, res: Response) => {
    return res.json({
        message: "Protected data accessed",
        user: res.locals.user,
    });
};
