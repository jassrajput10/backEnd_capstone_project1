import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Tournament:
 *       type: object
 *       required:
 *         - id
 *         - tournamentName
 *         - tournamentPosition
 *         - upcomingTournamnet
 *         - tournamentStart
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the tournament
 *           example: "tournament_001"
 *         tournamentName:
 *           type: string
 *           description: Name of the tournament
 *           example: "Champions Cup"
 *         tournamentPosition:
 *           type: string
 *           description: Tournament ranking or position
 *           example: "Semi-Final"
 *         upcomingTournamnet:
 *           type: string
 *           description: The next scheduled tournament
 *           example: "Winter Cup"
 *         tournamentStart:
 *           type: string
 *           format: date-time
 *           description: Date and time when the tournament begins
 *           example: "2025-02-10T10:00:00.000Z"
 */


/**
 * Tournament schema organised by request type
 * This validation ensures that required fields are present and follow the given rules
 */
export const tournamentSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/tournaments - Create new tournament
    create: {
        body: Joi.object({
            // Joi validation for tournamentName
            tournamentName: Joi.string().required().messages({
                "any.required": "Tournament Name is required",
                "string.empty": "Tournament Name cannot be empty",
            }),

            // Joi validation for tournamentPosition
            tournamentPosition: Joi.string().required().messages({
                "any.required": "Tournament Position is required",
                "string.empty": "Tournament Position cannot be empty",
            }),

            // Joi validation for upcomingTournament
            upcomingTournamnet: Joi.string().required().messages({
                "any.required": "Upcoming Tournament is required",
                "string.empty": "Upcoming Tournament cannot be empty",
            }),

            
        }),
    },

    // PUT /api/v1/tournaments/:id - Update tournament
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Tournament ID is required",
                "string.empty": "Tournament ID cannot be empty",
            }),
        }),
        body: Joi.object({
            tournamentName: Joi.string().optional().messages({
                "string.empty": "Tournament Name cannot be empty",
            }),
            tournamentPosition: Joi.string().optional().messages({
                "string.empty": "Tournament Position cannot be empty",
            }),
            upcomingTournamnet: Joi.string().optional().messages({
                "string.empty": "Upcoming Tournament cannot be empty",
            }),
           
        }),
    },

    // DELETE /api/v1/tournaments/:id - Delete tournament
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Tournament ID is required",
                "string.empty": "Tournament ID cannot be empty",
            }),
        }),
    },
};
