import Joi from "joi";
import { RequestSchema } from "../middleware/validate";


/**
 * @openapi
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       required:
 *         - id
 *         - currentGame
 *         - upcomingMatch
 *         - location
 *         - formation
 *         - matchDate
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the match
 *           example: "match1"
 *         currentGame:
 *           type: string
 *           description: The currently active or ongoing game
 *           example: "barca vs madrid"
 *         upcomingMatch:
 *           type: string
 *           description: The next scheduled match
 *           example: "barca vs bayern"
 *         location:
 *           type: string
 *           description: Venue where the match will take place
 *           example: "camp nou"
 *         formation:
 *           type: string
 *           description: Team formation strategy or lineup
 *           example: "4-3-3"
 *         matchDate:
 *           type: string
 *           format: date-time
 *           description: Date and time when the match is scheduled
 *           example: "2025-01-15T18:30:00.000Z"
 */

/**
 * Matches schema organised by request type
 * This validation ensures that required fields are present and follow the given rules
 */
export const matchSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/matches - Create new match
    create: {
        body: Joi.object({
            // Joi validation for currentGame
            currentGame: Joi.string().required().messages({
                "any.required": "Current Game is required",
                "string.empty": "Current Game cannot be empty",
            }),

            // Joi validation for upcomingMatch
            upcomingMatch: Joi.string().required().messages({
                "any.required": "Upcoming Match is required",
                "string.empty": "Upcoming Match cannot be empty",
            }),

            // Joi validation for location
            location: Joi.string().required().messages({
                "any.required": "Location is required",
                "string.empty": "Location cannot be empty",
            }),

            // Joi validation for formation
            formation: Joi.string().required().messages({
                "any.required": "Formation is required",
                "string.empty": "Formation cannot be empty",
            }),

            
        }),
    },

    // PUT /api/v1/matches/:id - Update match
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Match ID is required",
                "string.empty": "Match ID cannot be empty",
            }),
        }),
        body: Joi.object({
            currentGame: Joi.string().optional().messages({
                "string.empty": "Current Game cannot be empty",
            }),
            upcomingMatch: Joi.string().optional().messages({
                "string.empty": "Upcoming Match cannot be empty",
            }),
            location: Joi.string().optional().messages({
                "string.empty": "Location cannot be empty",
            }),
            formation: Joi.string().optional().messages({
                "string.empty": "Formation cannot be empty",
            }),
           
        }),
    },

    // DELETE /api/v1/matches/:id - Delete match
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Match ID is required",
                "string.empty": "Match ID cannot be empty",
            }),
        }),
    },
};
