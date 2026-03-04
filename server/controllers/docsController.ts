import { Request, Response } from "express";

/**
 * @openapi
 * /api/docs-json:
 *   get:
 *     tags:
 *       - Docs
 *     summary: OpenAPI spec JSON
 *     responses:
 *       200:
 *         description: OpenAPI specification object
 */
export const getDocsJson = (swaggerSpec: unknown) => {
    return (_req: Request, res: Response) => {
        return res.json(swaggerSpec);
    };
};
