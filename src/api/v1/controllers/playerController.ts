import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as playerService from "../service/playerService";
import { player } from "../models/playerModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and reponses to retrieve all players
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllPlayers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const players: player[] = await playerService.getAllPlayers();
        res.status(HTTP_STATUS.OK).json(
            successResponse(players, "players successfully retireved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create an Player
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract only the fields we want (destructuring)
        // const name: string = req.body.name;
        // const description: string = req.body.description;
        const { name, position, jerseyNumber } = req.body;

        const newPlayer: player = await playerService.createPlayer({
            name,
            position,
            jerseyNumber,
        });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newPlayer, "player created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to update player
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updatePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // const id: string = req.params.id;
        const { id } = req.params;

        // Extract update fields
        const { name, position, jerseyNumber } = req.body;

        // create the update item object with the fields to be updated
        const updatePlayer: player = await playerService.updatePlayer(id, {
            name,
            position,
            jerseyNumber,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatePlayer, "player updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to delete player
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deletePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await playerService.deletePlayer(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Player successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};

