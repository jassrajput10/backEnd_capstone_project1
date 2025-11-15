import express, { Router } from "express";
import * as playerController from "../controllers/playerController";

const router: Router = express.Router();

//"/api/v1/players" prefixes all below rotes
router.get("/", playerController.getAllPlayers);
router.post("/", playerController.createPlayer);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

export default router;