import express, { Router } from "express";
import * as tournamentController from "../controllers/tournamentController";

const router: Router = express.Router();

// "/api/v1/tournaments" prefixes all below routes
router.get("/", tournamentController.getAllTournaments);
router.post("/", tournamentController.createTournament);
router.put("/:id", tournamentController.updateTournament);
router.delete("/:id", tournamentController.deleteTournament);

export default router;
