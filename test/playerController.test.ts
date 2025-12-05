import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as playerController from "../src/api/v1/controllers/playerController";
import * as playerService from "../src/api/v1/service/playerService";
import { player } from "../src/api/v1/models/playerModel";

jest.mock("../src/api/v1/service/playerService");

describe("Player Controller", () => {
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

    // GET ALL PLAYERS
    describe("getAllPlayers", () => {
        it("should handle successful retrieval", async () => {
            const mockPlayers: player[] = [
                {
                    id: "1",
                    name: "Jass",
                    position: "centreBack",
                    jerseyNumber: "2",
                    registrationId: new Date()
                },
            ];

            (playerService.getAllPlayers as jest.Mock).mockResolvedValue(mockPlayers);

            await playerController.getAllPlayers(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "players successfully retireved",
                data: mockPlayers,
            });
        });

        it("should handle errors", async () => {
            const mockError = new Error("Test error");
            (playerService.getAllPlayers as jest.Mock).mockRejectedValue(mockError);

            await playerController.getAllPlayers(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    // CREATE PLAYER
    describe("createPlayer", () => {
        it("should handle successful player creation", async () => {
            const mockBody = {
                name: "navraj",
                position: "Midfielder",
                jerseyNumber: "8",
            };

            const mockPlayer: player = {
                id: "55",
                ...mockBody,
                registrationId: new Date()
            };

            mockReq.body = mockBody;
            (playerService.createPlayer as jest.Mock).mockResolvedValue(mockPlayer);

            await playerController.createPlayer(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "player created successfully",
                data: mockPlayer,
            });
        });
    });

    // UPDATE PLAYER
    describe("updatePlayer", () => {
        it("should handle successful update", async () => {
            mockReq.params = { id: "1" };
            const body = {
                name: "harsh",
                position: "Forward",
                jerseyNumber: "11",
            };

            const mockPlayer: player = {
                id: "1",
                ...body,
                registrationId: new Date(),
            };

            mockReq.body = body;
            (playerService.updatePlayer as jest.Mock).mockResolvedValue(mockPlayer);

            await playerController.updatePlayer(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "player updated successfully",
                data: mockPlayer,
            });
        });
    });

    // DELETE PLAYER
    describe("deletePlayer", () => {
        it("should handle successful deletion", async () => {
            mockReq.params = { id: "222" };

            (playerService.deletePlayer as jest.Mock).mockResolvedValue(undefined);

            await playerController.deletePlayer(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                message: "Player successfully deleted",
                data: null
            });
        });
    });
});
