import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as tournamentService from "../service/tournamentService";
import { tournament } from "../models/tournamentModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all tournaments
 */
export const getAllTournaments = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const tournaments: tournament[] =
            await tournamentService.getAllTournaments();

        res.status(HTTP_STATUS.OK).json(
            successResponse(tournaments, "tournaments successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new tournament
 */
export const createTournament = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { tournamentName, tournamentPosition, upcomingTournamnet } =
            req.body;

        const newTournament: tournament =
            await tournamentService.createTournament({
                tournamentName,
                tournamentPosition,
                upcomingTournamnet,
            });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newTournament, "tournament created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates an existing tournament
 */
export const updateTournament = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { tournamentName, tournamentPosition, upcomingTournamnet } =
            req.body;

        const updatedTournament: tournament =
            await tournamentService.updateTournament(id, {
                tournamentName,
                tournamentPosition,
                upcomingTournamnet,
            });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedTournament, "tournament updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes a tournament
 */
export const deleteTournament = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        await tournamentService.deleteTournament(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse("Tournament successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
