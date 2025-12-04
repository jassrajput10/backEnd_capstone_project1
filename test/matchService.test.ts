import * as matchService from "../src/api/v1/service/matchService";
import * as firestoreRepository from "../src/api/v1/repositories/firebaseRepository";
import { matches } from "../src/api/v1/models/matchModel";

// Mock the repository
jest.mock("../src/api/v1/repositories/firebaseRepository");

describe("Match Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a match successfully", async () => {
        // Arrange
        const mockMatchData = {
            currentGame: "realMadrid",
            upcomingMatch: "juventus",
            location: "bernabeu",
            formation: "4-3-3",
        };

        const mockDocumentId = "match-1";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: matches = await matchService.createMatch(mockMatchData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "matches",
            expect.objectContaining({
                currentGame: mockMatchData.currentGame,
                upcomingMatch: mockMatchData.upcomingMatch,
                location: mockMatchData.location,
                formation: mockMatchData.formation,
                matchDate: expect.any(Date),
            })
        );

        expect(result.id).toBe(mockDocumentId);
        expect(result.currentGame).toBe(mockMatchData.currentGame);
    });

    it("should retrieve all matches successfully", async () => {
        // Arrange
        const docs = [
            {
                id: "m1",
                data: () => ({
                    currentGame: "realMadrid",
                    upcomingMatch: "juventus",
                    location: "bernabeu",
                    formation: "4-4-2",
                    matchDate: { toDate: () => new Date("2025-01-01") },
                }),
            },
            {
                id: "m2",
                data: () => ({
                    currentGame: "liverpool",
                    upcomingMatch: "interMilan",
                    location: "anfield",
                    formation: "4-3-3",
                    matchDate: { toDate: () => new Date("2025-02-01") },
                }),
            },
        ];

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs,
        });

        // Act
        const result: matches[] = await matchService.getAllMatches();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
            "matches"
        );

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            id: "m1",
            currentGame: "realMadrid",
            upcomingMatch: "juventus",
            location: "bernabeu",
            formation: "4-4-2",
            matchDate: new Date("2025-01-01"),
        });
    });

    it("should get match by ID successfully", async () => {
        const mockId = "m123";

        const mockDoc = {
            id: mockId,
            data: () => ({
                currentGame: "bayern",
                upcomingMatch: "dortmund",
                location: "BayArena",
                formation: "4-3-3",
                matchDate: new Date("2025-03-01"),
            }),
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
            mockDoc
        );

        const result = await matchService.getMatchById(mockId);

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
            "matches",
            mockId
        );

        expect(result.id).toBe(mockId);
        expect(result.location).toBe("BayArena");
    });

    it("should update match successfully", async () => {
        const mockId = "m-update";

        const existingMatch: matches = {
            id: mockId,
            currentGame: "bayern",
            upcomingMatch: "dortmund",
            location: "villaPark",
            formation: "4-4-2",
            matchDate: new Date("2025-01-01"),
        };

        jest.spyOn(matchService, "getMatchById").mockResolvedValue(existingMatch);

        const updateData = {
            currentGame: "newcastle",
            location: "kingsPark",
        };

        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        const result = await matchService.updateMatch(mockId, updateData);

        expect(matchService.getMatchById).toHaveBeenCalledWith(mockId);

        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "matches",
            mockId,
            expect.objectContaining({
                currentGame: "newcastle",
                location: "kingsPark",
            })
        );

        expect(result.currentGame).toBe("newcastle");
    });

    it("should delete a match successfully", async () => {
        const mockId = "m4";

        const mockMatch: matches = {
            id: mockId,
            currentGame: "arsenal",
            upcomingMatch: "manCity",
            location: "emirates",
            formation: "4-4-2",
            matchDate: new Date(),
        };

        jest.spyOn(matchService, "getMatchById").mockResolvedValue(mockMatch);

        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        await matchService.deleteMatch(mockId);

        expect(matchService.getMatchById).toHaveBeenCalledWith(mockId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "matches",
            mockId
        );
    });
});
