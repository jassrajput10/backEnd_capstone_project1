import express, { Router } from "express";
import * as matchController from "../controllers/matchcontroller";
import authenticate  from "../middleware/authenticate";
import { matchSchemas } from "../validation/matchValidation";
import { validateRequest } from "../middleware/validate";

const router: Router = express.Router();

// "/api/v1/matches" prefixes all below routes
/**
 * @openapi
 * /api/v1/matches:
 *   get:
 *     summary: Retrieve all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: List of all matches retrieved successfully
 */
router.get("/", matchController.getAllMatches);
/**
 * @openapi
 * /api/v1/matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
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
 *               upcomingMatch:
 *                 type: string
 *               location:
 *                 type: string
 *               formation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Match created successfully
 */
router.post(
    "/", 
    authenticate,
    validateRequest(matchSchemas.create),
    matchController.createMatch
);
/**
 * @openapi
 * /api/v1/matches/{id}:
 *   put:
 *     summary: Update an existing match
 *     tags: [Matches]
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
    validateRequest(matchSchemas.update),
    matchController.updateMatch
);
/**
 * @openapi
 * /api/v1/matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
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
    matchController.deleteMatch);

export default router;