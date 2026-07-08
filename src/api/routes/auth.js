import { Router } from "express";
import crypto from "node:crypto";
import { users } from "../data/users.js";

export const authRouter = Router();

// In-memory only — tokens reset whenever the API restarts.
const tokens = new Map();

function getBearerToken(req) {
  const [scheme, token] = (req.get("authorization") || "").split(" ");
  return scheme === "Bearer" ? token : undefined;
}

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required: [username, password]
 *       properties:
 *         username:
 *           type: string
 *           example: admin
 *         password:
 *           type: string
 *           example: password123
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in with a username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login succeeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */
authRouter.post("/login", (req, res) => {
  const { username, password } = req.body ?? {};
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const token = crypto.randomBytes(24).toString("hex");
  tokens.set(token, user.username);
  res.json({ token, user: { username: user.username } });
});

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get the currently logged-in user for a session token
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: The logged-in user
 *       401:
 *         description: Missing or invalid token
 */
authRouter.get("/me", (req, res) => {
  const username = tokens.get(getBearerToken(req));
  if (!username) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ username });
});

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: Invalidate the current session token
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       204:
 *         description: Logged out
 */
authRouter.post("/logout", (req, res) => {
  tokens.delete(getBearerToken(req));
  res.status(204).end();
});
