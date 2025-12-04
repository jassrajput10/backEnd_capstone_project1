import express, { Router } from "express";
import * as tournamentController from "../controllers/tournamentController";
import authenticate  from "../middleware/authenticate";
import { tournamentSchemas } from "../validation/tournamentValidation";
import { validateRequest } from "../middleware/validate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/tournaments" prefixes all below routes
/**
 * @openapi
 * /api/v1/tournaments:
 *   get:
 *     summary: Retrieves a list of tournaments
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tournaments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tournament'
 */
router.get("/", tournamentController.getAllTournaments);

/**
 * @openapi
 * /api/v1/tournaments:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentName
 *               - tournamentPosition
 *               - upcomingTournamnet
 *             properties:
 *               tournamentName:
 *                 type: string
 *                 example: "Champions Cup"
 *               tournamentPosition:
 *                 type: string
 *                 example: "Final"
 *               upcomingTournamnet:
 *                 type: string
 *                 example: "2025-06-10"
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    validateRequest(tournamentSchemas.create),
    tournamentController.createTournament
);

/**
 * @openapi
 * /api/v1/tournaments/{id}:
 *   put:
 *     summary: Update an existing tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentName:
 *                 type: string
 *               tournamentPosition:
 *                 type: string
 *               upcomingTournamnet:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *       404:
 *         description: Tournament not found
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    validateRequest(tournamentSchemas.update),
    tournamentController.updateTournament);
    
/**
 * @openapi
 * /api/v1/tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID to delete
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *       404:
 *         description: Tournament not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    tournamentController.deleteTournament
);

export default router;
