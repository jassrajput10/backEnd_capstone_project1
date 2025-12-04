import Joi from "joi";

/**
 * Matches schema organised by request type
 * This validation ensures that required fields are present and follow the given rules
 */
export const matchSchemas = {
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

            // Joi validation for matchDate
            matchDate: Joi.date().required().messages({
                "any.required": "Match Date is required",
                "date.base": "Match Date must be a valid date",
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
            matchDate: Joi.date().optional().messages({
                "date.base": "Match Date must be a valid date",
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
