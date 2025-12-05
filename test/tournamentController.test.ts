import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as tournamentController from "../src/api/v1/controllers/tournamentController";
import * as tournamentService from "../src/api/v1/service/tournamentService";
import { tournament } from "../src/api/v1/models/tournamentModel";

jest.mock("../src/api/v1/service/tournamentService");

describe("Tournament Controller", () => {
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

    // 🔹 GET ALL TOURNAMENTS
    describe("getAllTournaments", () => {
        it("should handle successful retrieval", async () => {
            const mockTournaments: tournament[] = [
                {
                    id: "t1",
                    tournamentName: "Champions Cup",
                    tournamentPosition: "Group Stage",
                    upcomingTournamnet: "Semi Finals",
                    tournamentStart: new Date(),
                },
            ];

            (tournamentService.getAllTournaments as jest.Mock)
                .mockResolvedValue(mockTournaments);

            await tournamentController.getAllTournaments(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "tournaments successfully retrieved",
                data: mockTournaments,
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Error fetching tournaments");

            (tournamentService.getAllTournaments as jest.Mock)
                .mockRejectedValue(mockError);

            await tournamentController.getAllTournaments(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    // 🔹 CREATE TOURNAMENT
    describe("createTournament", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                tournamentName: "Champions League",
                tournamentPosition: "Quarter Final",
                upcomingTournamnet: "Semi Final",
            };

            const mockTournament: tournament = {
                id: "t55",
                ...mockBody,
                tournamentStart: new Date(),
            };

            mockReq.body = mockBody;

            (tournamentService.createTournament as jest.Mock)
                .mockResolvedValue(mockTournament);

            await tournamentController.createTournament(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "tournament created successfully",
                data: mockTournament,
            });
        });
    });

    // 🔹 UPDATE TOURNAMENT
    describe("updateTournament", () => {
        it("should handle successful update", async () => {
            mockReq.params = { id: "t1" };

            const body = {
                tournamentName: "New Tournament",
                tournamentPosition: "Final",
                upcomingTournamnet: "None",
            };

            const mockTournament: tournament = {
                id: "t1",
                ...body,
                tournamentStart: new Date(),
            };

            mockReq.body = body;

            (tournamentService.updateTournament as jest.Mock)
                .mockResolvedValue(mockTournament);

            await tournamentController.updateTournament(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "tournament updated successfully",
                data: mockTournament,
            });
        });
    });

    // 🔹 DELETE TOURNAMENT
    describe("deleteTournament", () => {
        it("should handle successful deletion", async () => {
            mockReq.params = { id: "t200" };

            (tournamentService.deleteTournament as jest.Mock)
                .mockResolvedValue(undefined);

            await tournamentController.deleteTournament(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: undefined,
                data: "Tournament successfully deleted",
            });
        });
    });
});
