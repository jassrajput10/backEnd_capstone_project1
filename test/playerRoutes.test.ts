import request from "supertest";
import app from "../src/app";
import * as playerController from "../src/api/v1/controllers/playerController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/playerController", () => ({
    getAllPlayers: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createPlayer: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updatePlayer: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deletePlayer: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Player Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/players/", () => {
        it("should call getAllPlayers controller", async () => {
            await request(app).get("/api/v1/players/");
            expect(playerController.getAllPlayers).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/players/", () => {
        it("should call createPlayer controller with valid data", async () => {
            const mockPlayer = {
                name: "messi",
                position: "Forward",
                jerseyNumber: "10",
            }; 

            await request(app).post("/api/v1/players/").send(mockPlayer);
            expect(playerController.createPlayer).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/players/:id", () => {
        it("should call updatePlayer controller with valid data", async () => {
            const mockPlayer = {
                name: "hazard",
                position: "Midfielder",
                jerseyNumber: "7",
            }; 

            await request(app).put("/api/v1/players/testId").send(mockPlayer);
            expect(playerController.updatePlayer).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/players/:id", () => {
        it("should call deletePlayer controller with valid data", async () => {
            await request(app).delete("/api/v1/players/testId");
            expect(playerController.deletePlayer).toHaveBeenCalled();
        });
    });
})
