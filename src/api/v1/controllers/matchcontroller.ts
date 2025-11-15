import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as matchService from "../service/matchService";
import { matches } from "../models/matchModel";
import { successResponse } from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all matches
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */

export const getAllMatches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const allMatches: matches[] = await matchService.getAllMatches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(allMatches, "matches successfully retrieved")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, responses, and validation to create a match
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { currentGame, upcomingMatch, location, formation } = req.body;

        const newMatch: matches = await matchService.createMatch({
            currentGame,
            upcomingMatch,
            location,
            formation,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newMatch, "match created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to update match data
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const { currentGame, upcomingMatch, location, formation } = req.body;

        const updatedMatch: matches = await matchService.updateMatch(id, {
            currentGame,
            upcomingMatch,
            location,
            formation,
        });

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedMatch, "match updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to delete a match
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteMatch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await matchService.deleteMatch(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse("Match successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};