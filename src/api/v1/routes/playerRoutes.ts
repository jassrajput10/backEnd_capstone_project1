import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { playerSchemas } from "../validation/playerValidation";
import * as playerController from "../controllers/playerController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/players" prefixes all below routes

/**
 * @openapi
 * /api/v1/players:
 *   get:
 *     summary: Retrieves a list of players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of Players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get("/", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] } as AuthorizationOptions), playerController.getAllPlayers);

/**
 * @openapi
 * /api/v1/players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - jerseyNumber
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Lionel Messi"
 *               position:
 *                 type: string
 *                 example: "Forward"
 *               jerseyNumber:
 *                 type: string
 *                 example: "10"
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
  validateRequest(playerSchemas.create),
  playerController.createPlayer
);

/**
 * @openapi
 * /api/v1/players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               jerseyNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 */
router.put(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
  validateRequest(playerSchemas.update),
  playerController.updatePlayer
);

/**
 * @openapi
 * /api/v1/players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Player ID to delete
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
router.delete(
  "/:id",
  authenticate,
  isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
  playerController.deletePlayer
);

export default router;
