import Joi from "joi";

/**
 * Tournament schema organised by request type
 * This validation ensures that required fields are present and follow the given rules
 */
export const tournamentSchemas = {
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

            // Joi validation for tournamentStart
            tournamentStart: Joi.date().required().messages({
                "any.required": "Tournament Start Date is required",
                "date.base": "Tournament Start Date must be a valid date",
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
            tournamentStart: Joi.date().optional().messages({
                "date.base": "Tournament Start Date must be a valid date",
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
