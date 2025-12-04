import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as tournamentController from "../src/api/v1/controllers/tournamentController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

// Mock the entire tournamentController module
jest.mock("../src/api/v1/controllers/tournamentController", () => ({
    getAllTournaments: jest.fn((req, res) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    createTournament: jest.fn((req, res) =>
        res.status(HTTP_STATUS.CREATED).send()
    ),
    updateTournament: jest.fn((req, res) =>
        res.status(HTTP_STATUS.OK).send()
    ),
    deleteTournament: jest.fn((req, res) =>
        res.status(HTTP_STATUS.OK).send()
    ),
}));

// Mocking authentication, essentially bypassing the actual authentication process by calling next()
jest.mock("../src/api/v1/middleware/authenticate", () => {
    return jest.fn((_req: Request, _res: Response, next: NextFunction) =>
        next()
    );
});

// Mocking authorization, essentially bypassing the actual authentication process by calling next() and passing empty _options
jest.mock("../src/api/v1/middleware/authorize", () => {
    return jest.fn(
        (_mockOptions) => (_req: Request, _res: Response, next: NextFunction) =>
            next()
    );
});

describe("Tournament Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // GET /api/v1/tournaments/
    describe("GET /api/v1/tournaments/", () => {
        it("should call getAllTournaments controller", async () => {
            await request(app).get("/api/v1/tournaments/");
            expect(tournamentController.getAllTournaments).toHaveBeenCalled();
        });
    });

    // POST /api/v1/tournaments/
    describe("POST /api/v1/tournaments/", () => {
        it("should call createTournament controller with valid data", async () => {
            const mockTournament = {
                tournamentName: "Champions League",
                tournamentPosition: "Group Stage",
                upcomingTournamnet: "Yes",
            };

            await request(app)
                .post("/api/v1/tournaments/")
                .send(mockTournament);

            expect(tournamentController.createTournament).toHaveBeenCalled();
        });
    });

    // PUT /api/v1/tournaments/:id
    describe("PUT /api/v1/tournaments/:id", () => {
        it("should call updateTournament controller with valid data", async () => {
            const updateData = {
                tournamentName: "Europa League",
                tournamentPosition: "Quarter Finals",
                upcomingTournamnet: "No",
            };

            await request(app)
                .put("/api/v1/tournaments/testId")
                .send(updateData);

            expect(tournamentController.updateTournament).toHaveBeenCalled();
        });
    });

    // DELETE /api/v1/tournaments/:id
    describe("DELETE /api/v1/tournaments/:id", () => {
        it("should call deleteTournament controller", async () => {
            await request(app).delete("/api/v1/tournaments/testId");
            expect(tournamentController.deleteTournament).toHaveBeenCalled();
        });
    });
});
