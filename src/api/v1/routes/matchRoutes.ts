import express, { Router } from "express";
import * as matchController from "../controllers/matchcontroller";
import authenticate  from "../middleware/authenticate";
import { matchSchemas } from "../validation/matchValidation";
import { validateRequest } from "../middleware/validate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/matches" prefixes all below routes
/**
 * @openapi
 * /api/v1/matches:
 *   get:
 *     summary: Retrieves a list of matches
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get("/", matchController.getAllMatches);

/**
 * @openapi
 * /api/v1/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentGame
 *               - upcomingMatch
 *               - location
 *               - formation
 *             properties:
 *               currentGame:
 *                 type: string
 *                 example: "Game A"
 *               upcomingMatch:
 *                 type: string
 *                 example: "Game B"
 *               location:
 *                 type: string
 *                 example: "Stadium 1"
 *               formation:
 *                 type: string
 *                 example: "4-3-3"
 *     responses:
 *       201:
 *         description: Match created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       400:
 *         description: Invalid input data
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    validateRequest(matchSchemas.create),
    matchController.createMatch
);

/**
 * @openapi
 * /api/v1/matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentGame:
 *                 type: string
 *               upcomingMatch:
 *                 type: string
 *               location:
 *                 type: string
 *               formation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       404:
 *         description: Match not found
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    validateRequest(matchSchemas.update),
    matchController.updateMatch
);

/**
 * @openapi
 * /api/v1/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Match ID to delete
 *     responses:
 *       200:
 *         description: Match deleted successfully
 *       404:
 *         description: Match not found
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    matchController.deleteMatch);

export default router;