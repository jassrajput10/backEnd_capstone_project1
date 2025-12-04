import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { tournamentSchemas } from "../src/api/v1/validation/tournamentValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";

describe("Tournament Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = { body: {}, params: {}, query: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should pass validation for valid tournament creation data", () => {
        mockReq.body = {
            tournamentName: "Champions League",
            tournamentPosition: "1st",
            upcomingTournamnet: "world cup",
            tournamentStart: new Date(),
        };

        const middleware: MiddlewareFunction = validateRequest(tournamentSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid tournament update data", () => {
        mockReq.params = { id: "001" };
        mockReq.body = {
            tournamentPosition: "2nd",
        };

        const middleware: MiddlewareFunction = validateRequest(tournamentSchemas.update);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid tournament delete request", () => {
        mockReq.params = { id: "001" };

        const middleware: MiddlewareFunction = validateRequest(tournamentSchemas.delete);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });
});
