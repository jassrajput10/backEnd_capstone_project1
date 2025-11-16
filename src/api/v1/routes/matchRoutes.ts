import express, { Router } from "express";
import * as matchController from "../controllers/matchcontroller";

const router: Router = express.Router();

// "/api/v1/matches" prefixes all below routes
router.get("/", matchController.getAllMatches);
router.post("/", matchController.createMatch);
router.put("/:id", matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);

export default router;