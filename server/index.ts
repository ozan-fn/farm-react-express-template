import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { getHello } from "./controllers/helloController";
import { login, logout, me } from "./controllers/authController";
import { authMiddleware } from "./middleware/authMiddleware";
import { getProtected } from "./controllers/protectedController";
import { getDocsJson } from "./controllers/docsController";

const app = express();
const PORT = process.env.PORT || 5000;

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Farm Express API",
            version: "1.0.0",
            description: "API docs generated from JSDoc using swagger-jsdoc",
        },
        servers: [{ url: `/` }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "auth_token",
                },
            },
        },
    },
    apis: [path.join(__dirname, "./controllers/*.ts"), path.join(__dirname, "./controllers/*.js")],
});

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/api", getHello);
app.post("/api/auth/login", login);
app.get("/api/auth/me", me);
app.post("/api/auth/logout", logout);
app.get("/api/protected", authMiddleware, getProtected);
app.get("/api/docs-json", getDocsJson(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
