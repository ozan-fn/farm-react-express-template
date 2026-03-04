import { Request, Response } from "express";

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *       - General
 *     summary: Health check hello endpoint
 *     responses:
 *       200:
 *         description: Success
 */
export const getHello = (req: Request, res: Response) => {
    res.json({ message: "Hello from simple Farm server!" });
};
