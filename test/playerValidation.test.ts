import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { playerSchemas } from "../src/api/v1/validation/playerValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";

describe("Player Validation Middleware", () => {
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

    it("should pass validation for valid player creation data", () => {
        mockReq.body = {
            name: "messi",
            position: "Forward",
            jerseyNumber: "10",
            registrationId: new Date(),
        };

        const middleware: MiddlewareFunction = validateRequest(playerSchemas.create);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid player update data", () => {
        mockReq.params = { id: "123" };
        mockReq.body = {
            name: "lionel messi",
        };

        const middleware: MiddlewareFunction = validateRequest(playerSchemas.update);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should pass validation for valid player delete request", () => {
        mockReq.params = { id: "123" };

        const middleware: MiddlewareFunction = validateRequest(playerSchemas.delete);
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });
});
