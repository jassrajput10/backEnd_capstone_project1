import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { matchSchemas } from "../src/api/v1/validation/matchValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";

describe("Match Validation Middleware", () => {
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

    it("should pass validation for valid match creation data", () => {
        mockReq.body = {
            currentGame: "barca vs madrid",
            upcomingMatch: "barca vs bayern",
            location: "camp nou",
            formation: "4-3-3",
            matchDate: new Date(),
        };

        const middleware: MiddlewareFunction = validateRequest(matchSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid match update data", () => {
        mockReq.params = { id: "match1" };
        mockReq.body = {
            location: "bernabeu",
        };

        const middleware: MiddlewareFunction = validateRequest(matchSchemas.update);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid match delete request", () => {
        mockReq.params = { id: "match1" };

        const middleware: MiddlewareFunction = validateRequest(matchSchemas.delete);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });
});
