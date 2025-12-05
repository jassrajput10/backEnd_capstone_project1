import Joi from "joi";
import { RequestSchema } from "../middleware/validate";


/**
 * @openapi
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - jerseyNumber
 *         - registrationId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the player
 *           example: "player_001"
 *         name:
 *           type: string
 *           description: Name of the player
 *           example: "Jas"
 *         position:
 *           type: string
 *           description: The role or field position the player plays
 *           example: "Forward"
 *         jerseyNumber:
 *           type: string
 *           description: Jersey number assigned to the player
 *           example: "10"
 *         registrationId:
 *           type: string
 *           format: date-time
 *           description: Date and time when the player was registered
 *           example: "2025-01-01T12:00:00.000Z"
 */

/**
 * Player schema organised by request type
 * This validation ensures that required fields are present and follow the given rules
 */
export const playerSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/players - Create new player
    create: {
        body: Joi.object({
            // Joi validation for player name
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),

            // Joi validation for position
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),

            // Joi validation for jerseyNumber
            jerseyNumber: Joi.string().required().messages({
                "any.required": "Jersey Number is required",
                "string.empty": "Jersey Number cannot be empty",
            }),

            
        }),
    },

    // PUT /api/v1/players/:id - Update player
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Player ID is required",
                "string.empty": "Player ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            jerseyNumber: Joi.string().optional().messages({
                "string.empty": "Jersey Number cannot be empty",
            }),
           
        }),
    },

    // DELETE /api/v1/players/:id - Delete player
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Player ID is required",
                "string.empty": "Player ID cannot be empty",
            }),
        }),
    },
};
