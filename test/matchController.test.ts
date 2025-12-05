import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

import * as matchController from "../src/api/v1/controllers/matchcontroller";
import * as matchService from "../src/api/v1/service/matchService";
import { matches } from "../src/api/v1/models/matchModel";

jest.mock("../src/api/v1/service/matchService");

describe("Match Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    //
    // GET ALL MATCHES
    //
    describe("getAllMatches", () => {
        it("should return all matches successfully", async () => {
            const mockMatches: matches[] = [
                {
                    id: "1",
                    currentGame: "realMadrid",
                    upcomingMatch: "juventus",
                    location: "bernabeu",
                    formation: "4-4-2",
                    matchDate: new Date(),
                },
            ];

            (matchService.getAllMatches as jest.Mock).mockResolvedValue(
                mockMatches
            );

            await matchController.getAllMatches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "matches successfully retrieved",
                data: mockMatches,
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Database error");
            (matchService.getAllMatches as jest.Mock).mockRejectedValue(
                mockError
            );

            await matchController.getAllMatches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    //
    // CREATE MATCH
    //
    describe("createMatch", () => {
        it("should handle successful match creation", async () => {
            const mockBody = {
                currentGame: "liverpool",
                upcomingMatch: "chelsea",
                location: "anfield",
                formation: "4-3-3",
            };

            const mockMatch: matches = {
                id: "10",
                ...mockBody,
                matchDate: new Date(),
            };

            mockReq.body = mockBody;
            (matchService.createMatch as jest.Mock).mockResolvedValue(
                mockMatch
            );

            await matchController.createMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "match created successfully",
                data: mockMatch,
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Create failed");
            (matchService.createMatch as jest.Mock).mockRejectedValue(
                mockError
            );

            await matchController.createMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    //
    // UPDATE MATCH
    //
    describe("updateMatch", () => {
        it("should update match successfully", async () => {
            mockReq.params = { id: "5" };

            const body = {
                currentGame: "newcastle",
                upcomingMatch: "tottenham",
                location: "stJamesPark",
                formation: "4-4-2",
            };

            const mockMatch: matches = {
                id: "5",
                ...body,
                matchDate: new Date(),
            };

            mockReq.body = body;
            (matchService.updateMatch as jest.Mock).mockResolvedValue(
                mockMatch
            );

            await matchController.updateMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "match updated successfully",
                data: mockMatch,
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Update failed");
            (matchService.updateMatch as jest.Mock).mockRejectedValue(
                mockError
            );

            await matchController.updateMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    //
    // DELETE MATCH
    //
    describe("deleteMatch", () => {
        it("should delete a match successfully", async () => {
            mockReq.params = { id: "20" };

            (matchService.deleteMatch as jest.Mock).mockResolvedValue(
                undefined
            );

            await matchController.deleteMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: undefined,
                data: "Match successfully deleted",
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Delete failed");
            (matchService.deleteMatch as jest.Mock).mockRejectedValue(
                mockError
            );

            await matchController.deleteMatch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});
