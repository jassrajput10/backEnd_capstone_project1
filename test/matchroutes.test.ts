import request from "supertest";
import app from "../src/app";
import * as matchController from "../src/api/v1/controllers/matchcontroller";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock matchController functions
jest.mock("../src/api/v1/controllers/matchcontroller", () => ({
    getAllMatches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createMatch: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateMatch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteMatch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Match Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // GET ALL MATCHES
    describe("GET /api/v1/matches/", () => {
        it("should call getAllMatches controller", async () => {
            await request(app).get("/api/v1/matches/");
            expect(matchController.getAllMatches).toHaveBeenCalled();
        });
    });

    // CREATE MATCH
    describe("POST /api/v1/matches/", () => {
        it("should call createMatch controller", async () => {
            const mockMatch = {
                currentGame: "chelsea",
                upcomingMatch: "arsenal",
                location: "stamfordBridge",
                formation: "4-3-3",
            };

            await request(app).post("/api/v1/matches/").send(mockMatch);
            expect(matchController.createMatch).toHaveBeenCalled();
        });
    });

    // UPDATE MATCH
    describe("PUT /api/v1/matches/:id", () => {
        it("should call updateMatch controller", async () => {
            const updateData = {
                currentGame: "barcelona",
                location: "campNou",
            };

            await request(app).put("/api/v1/matches/testId").send(updateData);
            expect(matchController.updateMatch).toHaveBeenCalled();
        });
    });

    // DELETE MATCH
    describe("DELETE /api/v1/matches/:id", () => {
        it("should call deleteMatch controller", async () => {
            await request(app).delete("/api/v1/matches/testId");
            expect(matchController.deleteMatch).toHaveBeenCalled();
        });
    });
});
