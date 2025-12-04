import express, { Router } from "express";
import * as playerController from "../controllers/playerController";
import authenticate  from "../middleware/authenticate";
import { playerSchemas } from "../validation/playerValidation";
import { validateRequest } from "../middleware/validate";


const router: Router = express.Router();

//"/api/v1/players" prefixes all below rotes
/**
 * @openapi
 * /api/v1/players:
 *   get:
 *     summary: Retrieve all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: List of players retrieved successfully
 */
router.get("/", playerController.getAllPlayers);
/**
 * @openapi
 * /api/v1/players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
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
 */

router.post(
    "/",
    authenticate,
    validateRequest(playerSchemas.create),
    playerController.createPlayer
);
/**
 * @openapi
 * /api/v1/players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
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
    validateRequest(playerSchemas.update),
    playerController.updatePlayer
);
/**
 * @openapi
 * /api/v1/players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
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
    playerController.deletePlayer);

export default router;