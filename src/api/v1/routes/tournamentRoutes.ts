import express, { Router } from "express";
import * as tournamentController from "../controllers/tournamentController";

const router: Router = express.Router();

// "/api/v1/tournaments" prefixes all below routes
/**
 * @openapi
 * /api/v1/tournaments:
 *   get:
 *     summary: Retrieve all tournaments
 *     tags: [Tournaments]
 *     responses:
 *       200:
 *         description: List of tournaments retrieved successfully
 */
router.get("/", tournamentController.getAllTournaments);
/**
 * @openapi
 * /api/v1/tournaments:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournaments]
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
 */
router.post("/", tournamentController.createTournament);
/**
 * @openapi
 * /api/v1/tournaments/{id}:
 *   put:
 *     summary: Update an existing tournament
 *     tags: [Tournaments]
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
router.put("/:id", tournamentController.updateTournament);
/**
 * @openapi
 * /api/v1/tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament
 *     tags: [Tournaments]
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
router.delete("/:id", tournamentController.deleteTournament);

export default router;
